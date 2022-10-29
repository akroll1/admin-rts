import React, { createRef, useEffect, useState, useRef,} from 'react'
import { Box, Button, ButtonGroup, Divider, Flex, Input, Text } from '@chakra-ui/react'
import { DividerWithText } from '../../../chakra'
import { v4 as uuidv4 } from 'uuid'
import { useScorecardStore } from '../../../stores'
import { SidebarsDividerWithText } from '../../../chakra'


export const ChatSidebar = ({
    setNotifications, 
    setNotificationTimeout,
    tabs,
}) => {
    const { 
        chatKey,
        chatScorecard,
        chatToken,
        requestChatToken,
        setChatScorecard,
        setChatToken,
        user
    } = useScorecardStore()

    const { username } = user
    const [chatMessage, setChatMessage] = useState("");
    const [chatMessages, setChatMessages] = useState([]);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [powerShotDisabled, setPowerShotDisabled] = useState(false);

    const chatRef = createRef();
    const messagesEndRef = createRef();
    const [connection, setConnection] = useState(null);
    const connectionRef = useRef(connection);
    connectionRef.current = connection;
    
    useEffect(() => {
        if(chatKey){
            requestChatToken(chatKey)
        }
    },[chatKey])

    useEffect(() => {
        if(chatToken){   
            initConnection(chatToken)
        }
    },[chatToken])
    
    useEffect(() => {
        if(chatScorecard?.scorecardId && socketActive()){
            console.log('handleSendMesage')
            handleSendMessage('UPDATE')
        }
    },[chatScorecard])

    useEffect(() => {
        const scrollToBottom = () => {
          messagesEndRef.current.scrollTop = 0
        };
        scrollToBottom();
      });

    const initConnection = async (token) => {
        const connectionInit = new WebSocket(process.env.REACT_APP_CHAT_WEBSOCKET_URL, token);
        setConnection(connectionInit);
        setChatToken(null)
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
            // CHAT SCORECARD DATA
            const update = JSON.parse(Attributes.UPDATE);
            setChatScorecard({})
        }
    };
    
    const handleRequestToken = () => {
        if(chatKey && !socketActive()){
            requestChatToken(chatKey);
        }
    };
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
    // Renderers
    const renderMessage = (message, i) => {
        const isSender = message.username === username
        const isSenderStyles = { color: 'red', textAlign: 'left' };
        const notIsSenderStyles = { color: 'green', textAlign: 'left' }
        return (
            <Box display="inline-block" key={i} m="2" mb="0" mt="1">
                <p style={{ overflowWrap: 'break-word' }}>
                    <span style={isSender ? isSenderStyles : notIsSenderStyles}>
                        {`${message.username}: `} &nbsp;
                    </span>
                    <span style={{ color: '#FAFAFA' }}>
                        {`${message.message}`}
                    </span>
                </p>
            </Box>
        );
    };
    
    const renderMessages = () => {
        return chatMessages.map( (message, i) => renderMessage(message, i))
    };

    return (
        <Flex 
            p="1"
            display={window.innerWidth <= 768 && tabs.chat ? 'flex' : window.innerWidth > 768 ? 'flex' : 'none'}
            id="chat-sidebar"
            flex={["1 0 25%", "1 0 25%", "1 0 25%", "1 0 20%"]} 
            maxW="100%" 
            bg={tabs.all ? "'fsl-scoring-sidebar-bg'" : "'fsl-scoring-sidebar-bg'"}
            borderRadius="md" 
            ref={chatRef}
            overflow="hidden"
            overscrollBehavior="none"
            position="relative"
            justifyContent="space-between"
            flexDir="column" 
        >
            <SidebarsDividerWithText 
                fontSize={'1.5rem'} 
                text="Group Chat" 
                centered={tabs.all ? true : false}
            />
            <Flex 
                overflow="scroll"
                flexDirection="column"
            >
                { chatMessages && 
                    <Flex
                        id="scroll-top"
                        overflowY="scroll"
                        maxW="100%"
                        flexDir="column-reverse" 
                        borderRadius="md"
                        p="4"
                        color="white" 
                        fontSize="sm"
                    >    
                        {renderMessages()}  
                        <Flex ref={messagesEndRef}>   
                        </Flex>                  
                    </Flex>
                }
                <Divider p="1" w="50%" mb="2" marginX="auto"/>
                <Input
                    mb="1"
                    as="input"
                    size="sm"
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
                <ButtonGroup p="2" pt="2" pb="0">
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
            </Flex>
        </Flex>
    )
}