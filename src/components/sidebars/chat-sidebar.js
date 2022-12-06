import { 
    createRef, 
    useEffect, 
    useState, 
    useRef 
} from 'react'
import { 
    Box, 
    Button, 
    ButtonGroup, 
    Divider, 
    Flex, 
    Input 
} from '@chakra-ui/react'
import { v4 as uuidv4 } from 'uuid'
import { useScorecardStore } from '../../stores'
import { SidebarsDividerWithText } from '../../chakra'


export const ChatSidebar = ({
    tabs,
}) => {
    const { 
        chatKey,
        chatScore,
        chatToken,
        requestChatToken,
        sendingChatScores,
        setChatToken,
        updateScorecardsFromChat,
        user
    } = useScorecardStore()

    const { username } = user
    const [notificationTimeout, setNotificationTimeout] = useState(false);
    const [notifications, setNotifications] = useState([]);
    const [chatMessage, setChatMessage] = useState("");
    const [chatMessages, setChatMessages] = useState([]);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [callingItDisabled, setCallingItDisabled] = useState(false);
    // change PowerShot to Calling It, you get one per fight.

    const chatRef = createRef();
    const messagesEndRef = createRef();
    const [connection, setConnection] = useState(null);
    const connectionRef = useRef(connection);
    connectionRef.current = connection;

    useEffect(() => {
        if(sendingChatScores.scorecardId){
            handleSendRoundScoresViaChat(sendingChatScores)
        }
    },[sendingChatScores])

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
        if(chatScore?.scorecardId && socketActive()){
            // console.log('handleSendMesage')
            handleSendMessage('UPDATE')
        }
    },[chatScore])

    useEffect(() => {
        const scrollToBottom = () => {
            messagesEndRef.current.scrollTop = 0
        };
        scrollToBottom();
    });

    useEffect(() => {
        if(notifications.length > 0){
            const timer = setTimeout(() => {
                const temp = notifications;
                temp.shift(temp.length -1)
                setNotifications(temp);
                // setNotificationTimeout(prev => !prev);
            }, 10000)
            return () => clearTimeout(timer);
        }
    },[notificationTimeout])

    const handleCloseNotification = e => {
        const { id } = e.currentTarget;
        const temp = notifications
        const filtered = temp.filter( ({ notification }) => notification !== id);
        setNotifications(filtered)
    };

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

    const handleSendRoundScoresViaChat = scoresToSend => {
        const data = JSON.stringify({
            requestId: uuidv4(),
            action: 'SEND_MESSAGE',
            content: 'UPDATE',
            Attributes: {
                'UPDATE': JSON.stringify(scoresToSend)
            }
        });
        connection.send(data);
    }

    const handleSendMessage = messageType => {
        if(messageType !== 'UPDATE' && !chatMessage) return
        const sanitizedMessage = chatMessage.replace(/\\/g, "\\\\").replace(/"/g, '\\"');

        const data = JSON.stringify({
            requestId: uuidv4(),
            action: 'SEND_MESSAGE',
            content: messageType,
            Attributes: {
                [messageType]: JSON.stringify(messageType === 'UPDATE' ? chatScore : sanitizedMessage)
            }
        });
        connection.send(data);
        setChatMessage('');
        if(messageType === 'PREDICTION'){
            setCallingItDisabled(true);
            setTimeout(() => {
                setCallingItDisabled(false)
            },10000)
        }
    };
    const handleReceiveMessage = data => {
        // console.log('data- 102: ', data)
        const { Attributes, Content, Sender, Type } = data;
        const user = Sender?.Attributes ? Sender.Attributes.username : '';
        // Getting undefined here, clean up.
        const message = JSON.parse(Attributes[Content]);
        if(Content === 'CHAT'){
            setChatMessages(prev => [{ message, username: user, type: Type }, ...prev ]);
        } else if(Content === 'PREDICTION'){
            setNotifications(prev => [ ...prev, {notification: message, username: user} ]);
            setNotificationTimeout(prev => !prev);
            setChatMessages(prev => [{ message, username: user, type: Type }, ...prev ]);
        } else if(Content === 'UPDATE'){
            const update = JSON.parse(data.Attributes.UPDATE)
            updateScorecardsFromChat(update)
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
            display={(tabs.all || tabs.chat) ? 'flex' : 'none'}
            bg="fsl-sidebar-bg"
            border="1px solid #252525"
            id="chat-sidebar"
            p="1"
            w="100%"
            flex={["1 0 25%"]} 
            maxW="100%" 
            borderRadius="md" 
            ref={chatRef}
            overflow="hidden"
            overscrollBehavior="none"
            position="relative"
            justifyContent="space-between"
            flexDir="column" 
        >
            <SidebarsDividerWithText 
                fontSize="xl" 
                py="2"
                mx="1"
                label="Group Chat" 
            />
            <Flex 
                w="100%"
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
                        w="100%"
                    >    
                        {renderMessages()}  
                        <Flex ref={messagesEndRef}>   
                        </Flex>                  
                    </Flex>
                }
                <Divider p="1" w="50%" mb="2" marginX="auto"/>
                <Input
                    w="90%"
                    bg="#202020"
                    m="auto"
                    mb="1"
                    as="input"
                    size="sm"
                    type="text"
                    color="#dadada"
                    _placeholder={{color: '#dadada'}}
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
                        // disabled={!socketActive() || callingItDisabled}
                        loadingText="Joining..." 
                        onClick={() => handleSendMessage('PREDICTION')} 
                        variant="outline"
                        colorScheme="red"
                        color='#dadada'
                    >
                        Calling It
                    </Button>
                </ButtonGroup>
            </Flex>
        </Flex>
    )
}