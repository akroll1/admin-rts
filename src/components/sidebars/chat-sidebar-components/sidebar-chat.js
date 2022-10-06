import React, { createRef, useEffect, useState, useRef,} from 'react'
import { Button, ButtonGroup, Divider, Flex, Input, Text } from '@chakra-ui/react'
import { DividerWithText } from '../../../chakra'
import { v4 as uuidv4 } from 'uuid'
import { useScorecardStore } from '../../../stores'


export const ChatSidebar = ({
    setNotifications, 
    setNotificationTimeout,
    tabs,
}) => {
    const { 
        chatKey,
        chatScorecard,
        chatToken,
        groupScorecard,
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
    const [connection, setConnection] = useState(null);
    const connectionRef = useRef(connection);
    connectionRef.current = connection;
    
    useEffect(() => {
        if(chatKey){
            requestChatToken(chatKey)
        }
    },[chatKey])

    useEffect(() => {
        initConnection(chatToken)
    },[chatToken])
    
    useEffect(() => {
        if(chatScorecard?.scorecardId && socketActive()){
            console.log('handleSendMesage')
            handleSendMessage('UPDATE')
        }
    },[chatScorecard])

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
            bg="fsl-sidebar-bg" 
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
                    bg="fsl-sidebar-bg" 
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