import React, { createRef, useEffect, useState, useRef,} from 'react'
import { Button, ButtonGroup, Divider, Flex, Input, Text } from '@chakra-ui/react'
import { DividerWithText } from '../../../chakra'
import { useStateStore } from '../../../stores'
import axios from 'axios'
import { v4 as uuidv4 } from 'uuid'

export const ChatSidebar = ({
    chatKey, 
    username, 
    setNotifications, 
    setNotificationTimeout,
    setIncomingScore,
    tabs,
}) => {

    // chatKey is room key for room ARN, required for chat metadata.

    const { chatScorecard, setChatScorecard, tokenConfig } = useStateStore.getState();
    const [moderator, setModerator] = useState(false);
    const [avatar, setAvatar] = useState({});
    const [chatToken, setChatToken] = useState(null);
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
    
    useEffect(() => {
        if(chatKey){
            handleRequestToken()
        }
    },[chatKey])
    
    useEffect(() => {
        if(chatScorecard?.scorecardId && socketActive()){
            console.log('handleSendMesage')
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
                username: `${username}`,
                // avatar: `${selectedAvatar.src}`,
            },
            capabilities: permissions,
            sessionDurationInMinutes: process.env.REACT_APP_TOKEN_REFRESH_IN_MINUTES,
            userId: `${username}`,
        };
    
        axios.post(`${process.env.REACT_APP_CHAT_TOKEN_SERVICE}`, data, tokenConfig)
            .then( res => {
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

    const initConnection = async (token) => {
        const connectionInit = new WebSocket(process.env.REACT_APP_CHAT_WEBSOCKET_URL, token);
        setConnection(connectionInit);
    
        connectionInit.onopen = (event) => {
            console.info("Connected to the chat room.");
            setChatMessages(prevState => [...prevState]);
        };
    
        connectionInit.onclose = (event) => {
            // If the websocket closes, remove the current chat token
            setChatToken(null);
            handleRequestToken(username)
        };
    
        connectionInit.onerror = (event) => {
            console.error("Chat room websocket error observed:", event);
        };
    
        connectionInit.onmessage = (event) => {
            const data = JSON.parse(event.data);
            handleReceiveMessage(data);
        };
    };

    const handleSendMessage = messageType => {
        if(messageType !== 'UPDATE' && !chatMessage) return
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
    const handleReceiveMessage = data => {
        console.log('data- 102: ', data)
        const { Attributes, Content, Sender, Type } = data;
        const user = Sender?.Attributes ? Sender.Attributes.username : '';
        const message = JSON.parse(Attributes[Content]);
        if(Content === 'CHAT'){
            setChatMessages(prev => [{ message, username: user, type: Type }, ...prev ]);
        } else if(Content === 'PREDICTION'){
            setNotifications(prev => [ ...prev, {notification: message, username: user} ]);
            setNotificationTimeout(prev => !prev);
            setChatMessages(prev => [{ message, username: user, type: Type }, ...prev ]);
        } else if(Content === 'UPDATE'){
            const update = JSON.parse(Attributes.UPDATE);
            setChatScorecard({})
            setIncomingScore(update)
        }
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
                setChatMessage("");
                handleSendMessage('CHAT');
            }
        }
    };
    const socketActive = () => {
        return connection?.readyState === 1;
    };
    const handleRequestToken = () => {
        requestToken(username, true);
    };
    // Renderers
    const renderMessage = (message, i) => {
        return (
            <Flex key={i} display="flex" m="2" mb="0" mt="1">
                <Text key={i}>{`${message.username}: ${message.message}`}</Text>
            </Flex>
        );
    };
    
    const renderMessages = () => {
        return chatMessages.map( (message, i) => renderMessage(message, i))
    };
   
    return (
        <Flex 
            display={window.innerWidth <= 768 && tabs.chat ? 'flex' : window.innerWidth > 768 ? 'flex' : 'none'}
            id="chat-sidebar"
            flexDir="column" 
            flex={["1 0 25%", "1 0 25%", "1 0 25%", "1 0 20%"]} 
            w="100%" 
            minH={["22rem"]} 
            maxH={["40vh", "40vh", "60vh"]}
            p="2" 
            bg="gray.900" 
            borderRadius="md" 
            overflowY="scroll"
        >
            <DividerWithText text={"Group Chat"} />
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