import React, { useState, createRef, useRef, useEffect } from 'react'
import { Button, ButtonGroup, Divider, Flex, Input, Text } from '@chakra-ui/react'
import axios from 'axios'
import { v4 as uuidv4 } from 'uuid'
import { parseUrls, stickers } from '../../utils'
import { FightStats } from './chat-sidebar-components/fight-stats'
import { DividerWithText } from '../../chakra'
import { useScorecardStore } from '../../stores'

export const ChatSidebar = ({ 
    chatScorecard,
    fightStatus,
    scoredRounds,
    accessTokenConfig, 
    chatKey, 
    displayName, 
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
    const [round, setRound] = useState('')
    const [update, setUpdate] = useState(null);
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
    const setScorecardsStore = useScorecardStore(state => state.setScorecards)

    useEffect(() => {
        if(scoredRounds){
            if(scoredRounds === 1) return;
            if(fightStatus === 'COMPLETED') return setRound(scoredRounds)
            setRound(scoredRounds)
        }
    },[scoredRounds])
    
    useEffect(() => {
        if(chatKey){
            handleRequestToken()
        }
    },[chatKey])
    
    useEffect(() => {
        if(chatScorecard?.scorecardId){
            handleSendMessage('UPDATE')
        }
    },[chatScorecard])

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
    
        axios.post(`${process.env.REACT_APP_CHAT_TOKEN_SERVICE}`, data, accessTokenConfig)
            .then( res => {
                // console.log('res, 58: ', res)
                setChatToken(res.data);
                initConnection(res.data);
            })
            .catch( err => {
                setChatToken(null);
                console.log(err);
            }).finally(() => setIsSubmitting(false));
        // Focus the input field UI
        // chatRef.current.focus();
    };

    const handleReceiveMessage = (data) => {
        const { Attributes, Content, Sender, Type } = data;
        const { UserId } = Sender;
        const message = JSON.parse(Attributes[Content]);
        console.log('data: ', data);
        if(Content === 'CHAT'){
            setChatMessages(prev => [{ message, displayName: UserId, type: Type }, ...prev ]);
        } else if(Content === 'PREDICTION'){
            setNotifications(prev => [ ...prev, {notification: message, displayName: UserId} ]);
            setNotificationTimeout(prev => !prev);
            setChatMessages(prev => [{ message, displayName: UserId, type: Type }, ...prev ]);
        } else if(Content === 'UPDATE'){
            const update = JSON.parse(Attributes.UPDATE);
            console.log('UPDATE: ', update)
            setScorecardsStore(update)
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
                break;
            case "ERROR":
                console.info("Received error:", data);
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
    
    const handleChatChange = e => {
        setChatMessage(e.target.value);
    };
    const handleChatKeydown = e => {
        if (e.key === "Enter") {
            if (chatMessage) {
                handleSendMessage('CHAT');
                setChatMessage("");
            }
        }
    };

    const handleSendMessage = messageType => {
        const sanitizedMessage = chatMessage.replace(/\\/g, "\\\\").replace(/"/g, '\\"');
        const uuid = uuidv4();
        const data = JSON.stringify({
            requestId: uuid,
            action: 'SEND_MESSAGE',
            content: messageType,
            Attributes: {
                [messageType]: JSON.stringify(messageType === 'UPDATE' ? chatScorecard : sanitizedMessage)
            }
        });
        connection.send(data);
        setChatMessage('');
        if(messageType === 'PREDICTION'){
            setPowerShotDisabled(true);
            setTimeout(() => {
                setPowerShotDisabled(false)
            },10000)
        }
    };

    const socketActive = () => {
        return connection?.readyState === 1;
    };
    
    const handleRequestToken = () => {
        requestToken(displayName, true);
    };
    // Renderers
    const renderErrorMessage = (errorMessage) => {
        return (
        <div className="error-line" key={errorMessage.timestamp}>
            <p>{errorMessage.message}</p>
        </div>
        );
    };

    const renderMessage = (message, i) => {
        const { displayName } = message;
        const formattedMessage = parseUrls(message.message);
        return (
            <Flex key={i} display="flex" m="2" mb="0" mt="1">
                <Text key={i}>{`${displayName}: ${formattedMessage}`}</Text>
            </Flex>
        );
    };
    
    const renderMessages = () => {
        return chatMessages.map( (message, i) => {
            switch (message.type) {
                case "ERROR":
                    // const errorMessage = renderErrorMessage(message);
                    // return errorMessage;
                    return;
                case "SUCCESS":
                    return;
                case "STICKER":
                // const stickerMessage = renderStickerMessage(message);
                // return stickerMessage;
                    return;
                case "MESSAGE":
                    return renderMessage(message, i);
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
            maxH={["35vh","40vh","80vh"]} 
            minH={["35vh", "40vh", "80vh"]} 
            p="2" 
            bg="gray.900" 
            borderRadius="md" 
            overflowY="scroll"
        >
            <DividerWithText text={`Round ${round} Results`} />
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
                            onClick={() => handleSendMessage('CHAT')} 
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
                    onClick={() => handleSendMessage('PREDICTION')} 
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