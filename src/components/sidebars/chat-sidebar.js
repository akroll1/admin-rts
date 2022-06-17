import React, { useState, createRef, useRef, useEffect } from 'react'
import { Button, ButtonGroup, Divider, Flex, Input, Text } from '@chakra-ui/react'
import axios from 'axios'
import { v4 as uuidv4 } from 'uuid'
import { parseUrls, stickers } from '../../utils'
import { FightStats } from './chat-sidebar-components/fight-stats'
import { DividerWithText } from '../../chakra'

// import { StickerPicker } from './chat-sidebar-components'
// import { FaRProject } from 'react-icons/fa'
// import { sanitize } from '../../utils'
// import { IoNotifications } from 'react-icons/io'

export const ChatSidebar = ({ 
    accessTokenConfig, 
    chatKey, 
    displayName, 
    notifications, 
    setNotifications, 
    setNotificationTimeout 
}) => {
    // chatKey is room key for room ARN, required for chat metadata.
    const [moderator, setModerator] = useState(false);
    const [avatar, setAvatar] = useState({});
    const [chatToken, setChatToken] = useState(null);
    const [refreshTimer, setRefreshTimer] = useState({});
    const [chatMessage, setChatMessage] = useState("");
    const [chatMessages, setChatMessages] = useState([]);
    //////////////////////////////
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [powerShotDisabled, setPowerShotDisabled] = useState(false);
    const [prediction, setPrediction] = useState('');
    // refs
    const chatRef = createRef();
    const predictionRef = createRef();
    const messagesEndRef = createRef();
    
    const [connection, setConnection] = useState(null);
    const connectionRef = useRef(connection);
    connectionRef.current = connection;
    

    const requestToken = (selectedUsername, isModerator, selectedAvatar) => {
        // Set application state
        setIsSubmitting(true);
        setModerator(isModerator);
        // setAvatar(selectedAvatar);
    
        const uuid = uuidv4();

        const permissions = isModerator
            ? ["SEND_MESSAGE", "DELETE_MESSAGE", "DISCONNECT_USER"]
            : ["SEND_MESSAGE"];
    
        const data = {
            chatKey,
            attributes: {
                username: `${displayName}`,
                // avatar: `${selectedAvatar.src}`,
            },
            capabilities: permissions,
            sessionDurationInMinutes: process.env.REACT_APP_TOKEN_REFRESH_IN_MINUTES,
            userId: `${displayName}`,
        };
    
        axios.post(`${process.env.REACT_APP_CHAT_SERVICE}`, data, accessTokenConfig)
            .then( res => {
                // console.log('res, 58: ', res)
                setChatToken(res.data);
                initConnection(res.data);
            })
            .catch( err => {
                setChatToken(null);
                console.log(err);
            }).finally(() => setIsSubmitting(false));
    
        // setShowSignIn(false);
        // Focus the input field UI
        chatRef.current.focus();
    };
    
    const handleReceiveMessage = (data) => {
        const { Attributes, Content, Sender, Type } = data;
        const { UserId } = Sender;
        const message = Content === 'CHAT' ? Attributes.chat : Attributes.prediction;
        if(Content === 'CHAT'){
            setChatMessages(prev => [{ message, displayName: UserId, type: Type }, ...prev ]);
        } else {
            setNotifications(prev => [ ...prev, {notification: message, displayName: UserId} ]);
            setNotificationTimeout(prev => !prev);
        }
    };
 
    const initConnection = async (token) => {
        const connectionInit = new WebSocket(process.env.REACT_APP_CHAT_WEBSOCKET_URL, token);
        setConnection(connectionInit);
    
        connectionInit.onopen = (event) => {
            console.info("Connected to the chat room.");
            renderConnect();
        };
    
        connectionInit.onclose = (event) => {
            // If the websocket closes, remove the current chat token
            setChatToken(null);
            renderDisconnect(event.reason);
        };
    
        connectionInit.onerror = (event) => {
            console.error("Chat room websocket error observed:", event);
        };
    
        connectionInit.onmessage = (event) => {
            const data = JSON.parse(event.data);
            const eventType = data["Type"];
    
            switch (eventType) {
            case "EVENT":
                console.info("Received event:", data);
                // handleEvent(data);
                break;
            case "ERROR":
                console.info("Received error:", data);
                // handleError(data);
                // implement the error message.
                break;
            case "MESSAGE":
                handleReceiveMessage(data)
                break;
            default:
                console.error("Unknown message received:", event);
            }
        };
    };
    // useEffect(() => {
    //     const scrollToBottom = () => {
    //         messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    //     };
    //     scrollToBottom();
    // });

    useEffect(() => {
        // if (chatToken === null) return;
        // If there's a timer that was running previously, clear it
        if (refreshTimer) {
            clearTimeout(refreshTimer);
        }
    // Request a new token after the refresh timeout has passed
        const timer = setTimeout(() => {
            connectionRef.current.close();
            requestToken(displayName, moderator, avatar);
        }, process.env.REACT_APP_TOKEN_REFRESH_IN_MINUTES * 60 * 1000);

        setRefreshTimer(timer);
        return () => clearTimeout(timer);
    }, [chatToken]); 
    
    const handleChatChange = e => {
        setChatMessage(e.target.value);
    };
    const handleChatKeydown = e => {
        if (e.key === "Enter") {
            if (chatMessage) {
                sendChatMessage(chatMessage);
                setChatMessage("");
            }
        }
    };
    
    const sendChatMessage = () => {
        const sanitizedMessage = chatMessage.replace(/\\/g, "\\\\").replace(/"/g, '\\"');
        const uuid = uuidv4();
        const data = JSON.stringify({
            requestId: uuid,
            action: 'SEND_MESSAGE',
            content: 'CHAT',
            Attributes: {
                chat: sanitizedMessage
            }
        });
        connection.send(data);
        setChatMessage('');
    };

    const handleSendPredictionMessage = () => {
        const sanitizedPrediction = chatMessage.replace(/\\/g, "\\\\").replace(/"/g, '\\"');
        const uuid = uuidv4();
        const data = JSON.stringify({
            requestId: uuid,
            action: 'SEND_MESSAGE',
            content: 'PREDICTION',
            Attributes: {
                prediction: sanitizedPrediction
            }
        });
        connection.send(data);
        sendChatMessage();
        setPowerShotDisabled(true);
        setTimeout(() => {
            setPowerShotDisabled(false)
        },30000)
    };

    const socketActive = () => {
        return connection?.readyState === 1;
    };
    
    const handleRequestToken = () => {
        requestToken(displayName, true);
    };
    const handleSendChatMessage = () => {
        if(chatMessage){
            sendChatMessage(chatMessage)
        } 
        return;
    }
    // Renderers
    const renderErrorMessage = (errorMessage) => {
        return (
        <div className="error-line" key={errorMessage.timestamp}>
            <p>{errorMessage.message}</p>
        </div>
        );
    };

    const renderChatMessage = (message, i) => {
        // const sender = message.message.userId;
        const { displayName } = message;
        const formattedMessage = parseUrls(message.message);
        return (
            <Flex key={i} display="flex" m="2" mb="0" mt="1">
                <Text key={i}>{`${displayName}: ${formattedMessage}`}</Text>
            </Flex>
        );
    };
    
    const renderPredictionMessage = message => {
        console.log('renderPredictionMessage: ', message);
        const notification = {
            displayName,
            notification: message
        };
        setNotifications({...notifications, notification})
    }
    const renderMessages = () => {
        // console.log()
        return chatMessages.map( (message, i) => {
            switch (message.type) {
                case "ERROR":
                    const errorMessage = renderErrorMessage(message);
                    return errorMessage;
                case "SUCCESS":
                    return;
                case "STICKER":
                // const stickerMessage = renderStickerMessage(message);
                // return stickerMessage;
                return;
                case 'PREDICTION':
                    renderChatMessage(message, i)
                    return renderPredictionMessage(message, i);
                case "MESSAGE":
                    return renderChatMessage(message, i);
                default:
                    return console.info("Received unsupported message:", message);
            }
        });
    };
    
    const renderDisconnect = (reason) => {
        // The reason for a disconnect can be a string (if kicked), or a
        // JSON string (if token is timed out)
        let parsedReason;
        try {
            // If reason is a JSON string, parse it
            parsedReason = JSON.parse(reason);
        } catch (e) {
            // If reason is not a JSON string, don't parse it
            parsedReason = reason;
        }
    
        let message = parsedReason;
        if (typeof parsedReason === "object") {
            message = parsedReason.ErrorMessage;
        }
    
        const error = {
            type: "ERROR",
            timestamp: `${Date.now()}`,
            username: "",
            userId: "",
            avatar: "",
            message: `Connection closed.`,
        };
        setChatMessages((prevState) => {
            return [...prevState, error];
        });
    };
    
    const renderConnect = () => {
        const status = {
            type: "SUCCESS",
            timestamp: `${Date.now()}`,
            username: "",
            userId: "",
            avatar: "",
            message: `Connected!`,
        };
        setChatMessages(prevState => [...prevState, status]);
    };

    return (
        <Flex 
            id="chat-sidebar"
            flexDir="column" 
            flex="1 0 20%" 
            w="100%" 
            maxH={["25vh","25vh","80vh"]} 
            minH={["12rem", "20rem", "80vh"]} 
            p="2" 
            bg="gray.900" 
            borderRadius="md" 
            overflowY="scroll"
        >
            <DividerWithText text="Last Round Poll" />
            <FightStats />
            <DividerWithText text="FightSync Chat" />
            <Input
                as="input"
                m="1"
                p="2"
                size="sm"
                ref={chatRef}
                type="text"
                color="whiteAlpha.800"
                _placeholder={{color: 'whiteAlpha.400'}}
                placeholder={socketActive() ? "Connected!" : "Waiting to connect..."}
                isDisabled={!socketActive()}
                value={chatMessage}
                maxLength={150}
                onChange={handleChatChange}
                onKeyDown={handleChatKeydown}
            />
            <ButtonGroup p="2" pt="0" pb="0">
                { socketActive() 
                    ?
                        <Button     
                            w="100%"
                            minH="1.5rem"
                            m="1"
                            p="1"
                            size="sm"
                            isLoading={isSubmitting} 
                            loadingText="Joining..." 
                            onClick={handleSendChatMessage} 
                            variant="solid"
                            colorScheme="teal"
                        >
                            Send
                        </Button>
                    :
                        <Button     
                            w="100%"
                            minH="1.5rem"
                            m="1"
                            p="1"
                            size="sm"
                            isLoading={isSubmitting} 
                            loadingText="Joining..." 
                            onClick={handleRequestToken} 
                            variant="solid"
                            colorScheme="teal"
                        >
                            Join Chat
                        </Button>
                }
                <Button     
                    w="100%"
                    minH="1.5rem"
                    m="1"
                    p="1"
                    size="sm"
                    disabled={!socketActive() || powerShotDisabled}
                    loadingText="Joining..." 
                    onClick={handleSendPredictionMessage} 
                    variant="outline"
                    colorScheme="red"
                >
                    PowerShot
                </Button>
            </ButtonGroup>
            <Divider p="1" w="50%" marginX="auto"/>

            { chatMessages && 
                <Flex
                    maxW="100%"
                    flexDir="column" 
                    borderRadius="md"
                    bg="gray.900" 
                    p="4"
                    color="white" 
                    fontSize="sm"
                    overflow="scroll"
                    wordBreak="break-all"
                >    
                    {renderMessages()}                    
                </Flex>
            }
        </Flex>
    )
}