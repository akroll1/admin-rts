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
    Flex, 
    Input,
    Tab,
    Tabs,
    TabList,
    TabPanels,
    Heading,
} from '@chakra-ui/react'
import { v4 as uuidv4 } from 'uuid'
import { ContentType, TabsEnum, useGlobalStore } from '../../stores'

export const ChatSidebar = () => {
    const { 
        chatKey,
        chatMessage,
        chatToken,
        isPanelist,
        requestChatToken,
        setChatToken,
        setGlobalNotification,
        tabs,
        user
    } = useGlobalStore()

    const { username } = user

    const [message, setMessage] = useState('')
    const [chatMessages, setChatMessages] = useState([]);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [tabIndex, setTabIndex] = useState(0)

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

    const handleSendMessageViaChat = (e, contentType) => {
        if(!message) return
        // const sanitizedMessage = message.replace(/\\/g, "\\\\").replace(/"/g, '\\"');
        let data = {
            requestId: uuidv4(),
            action: 'SEND_MESSAGE',
            username,
        }

        if(contentType === ContentType.GROUP || contentType === ContentType.CALLING_IT){ 
            const messageType = contentType === ContentType.CALLING_IT ? ContentType.CALLING_IT : ContentType.GROUP
            const callingIt = Object.assign({
                ...data,
                Attributes: { [messageType]: message },
                content: messageType
            })
            setMessage('')
            return connection.send(JSON.stringify(callingIt))
        }
    }

    const handleReceiveMessage = data => {
        console.log('data- 111: ', data)
        const { Attributes, Content, Id, Sender, Type } = data;

        if(Content === ContentType.CALLING_IT){
            const message = Attributes[ContentType.CALLING_IT]
            setGlobalNotification({ heading: Sender.Attributes.username, body: message })
            setChatMessages(prev => [{ Id, message, type: Type, username: Sender.Attributes.username }, ...prev ]);
        }
        if(Content === ContentType.GROUP){
            const message = Attributes[ContentType.GROUP]
            setChatMessages(prev => [{ Id, message, type: Type, username: Sender.Attributes.username }, ...prev ]);
        }
    };
    
    const handleRequestToken = () => {
        if(chatKey && !socketActive()){
            requestChatToken(chatKey);
        }
    };

    const handleChatChange = e => {
        setMessage(e.target.value);
    };

    const handleChatKeydown = e => {
        if (e.key === "Enter") {
            if (chatMessage) {
                // setChatMessage("");
                handleSendMessageViaChat({ message: 'here' }, 'CHAT');
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
            <Box 
                key={i} 
                m="2" 
                mb="0" 
                mt="1"
            >
                <p style={{ overflowWrap: 'break-word' }}>
                    <span style={isSender ? isSenderStyles : notIsSenderStyles}>
                        {`${message.username}: `} &nbsp;
                    </span>
                    <span style={{ color: '#FAFAFA' }}>
                        {`${message.message}`}
                    </span>
                </p>
            </Box>
    )}
    
    const renderMessages = () => {
        return chatMessages.map( (message, i) => renderMessage(message, i))
    };

    const handleTabsChange = (index) => {
        setTabIndex(index)
    }

    return (
        <Flex 
            display={tabs[TabsEnum.ALL] || tabs[TabsEnum.CHAT] ? 'flex' : 'none'}
            bg="fsl-sidebar-bg"
            border="1px solid #252525"
            id="chat-sidebar"
            w="100%"
            flex={["1 0 30%"]} 
            maxW="100%" 
            borderRadius="md" 
            ref={chatRef}
            overflow="hidden"
            position="relative"
            justifyContent="space-between"
            flexDir="column" 
            minH="100%"
            pb="4"
        >
            <Tabs 
                w="100%"
                isFitted 
                variant='enclosed' 
                minH="85%"
                maxH="85%"
                onChange={handleTabsChange}
                display="flex"
                flexDirection="column"
                justifyContent="space-between"
            >
                <TabList mb='1em' className='group_chat'>
                    <Tab
                        _focus={{borderBottom: "1px solid tranparent"}}>
                        <Heading 
                            fontSize="lg"
                            color={tabIndex == '0' ? 'whiteAlpha.900' : 'gray.400'}
                        >
                            Group
                        </Heading>
                    </Tab>
                    <Tab
                        _focus={{borderBottom: "1px solid white"}}>
                        <Heading 
                            fontSize="lg"
                            color={tabIndex == '1' ? 'whiteAlpha.900' : 'gray.400'}
                        >
                            Panelists
                        </Heading>
                    </Tab>
                </TabList>
                <TabPanels
                    display="flex"
                    flexDir="column"
                    justifyContent="space-between"
                    minH="100%"
                    maxH="100%"
                >
                    <Flex
                        id="group_chat"
                        minH="100%"
                        maxH="100%"
                        flexDir="column"
                        w="100%"
                        overflow="scroll"
                        alignItems="center"
                        justifyContent="flex-end"
                    >
                        <Flex
                            minH="70%"
                            maxH="70%"
                            id="scroll-top"
                            overflowY="scroll"
                            maxW="100%"
                            flexDir="column-reverse"
                            justifyContent="flex-start"
                            borderRadius="md"
                            p="4"
                            color="white" 
                            fontSize="sm"
                            w="100%"
                        >    
                            {renderMessages()}
                        </Flex>
                        <Flex ref={messagesEndRef} />
                        <Flex
                            h="auto"
                            w="100%"
                            flexDir="column"
                            alignItems="center"
                            justifyContent="flex-end"
                            pb="4"
                        >
                            { tabIndex == "0" &&
                                <>
                                    <Input
                                        id="group_input"
                                        w="90%"
                                        bg="#202020"
                                        m="auto"
                                        mb="1"
                                        as="input"
                                        size="sm"
                                        type="text"
                                        color="whiteAlpha.900"
                                        _placeholder={{ color: 'whiteAlpha.700' }}
                                        placeholder={socketActive() ? "Connected!" : "Waiting to connect..."}
                                        isDisabled={!socketActive()}
                                        value={message}
                                        maxLength={150}
                                        onChange={handleChatChange}
                                        onKeyDown={handleChatKeydown}
                                    />
                                    <ButtonGroup 
                                        px="4" 
                                        w="100%"
                                        mt="2"
                                    >
                                        <Button     
                                            w="100%"
                                            m="1"
                                            size="sm"
                                            isLoading={isSubmitting} 
                                            loadingText="Joining..." 
                                            onClick={socketActive() ? e => handleSendMessageViaChat(e, ContentType.GROUP) : handleRequestToken} 
                                            variant="solid"
                                        >
                                            {socketActive() ? `Send` : `Join Chat`}
                                        </Button>
                                        <Button     
                                            w="100%"
                                            minH="1.5rem"
                                            m="1"
                                            p="1"
                                            size="sm"
                                            // disabled={!socketActive() || callingItDisabled}
                                            loadingText="Joining..." 
                                            onClick={e => handleSendMessageViaChat(e, ContentType.CALLING_IT)} 
                                            variant="outline"
                                            colorScheme="red"
                                            color='#dadada'
                                        >
                                            Calling It
                                        </Button>
                                    </ButtonGroup>
                                </>
                            }

                            { isPanelist && tabIndex == "1" &&
                                <>
                                    <Input
                                        id="group_input"
                                        w="90%"
                                        bg="#202020"
                                        m="auto"
                                        mb="1"
                                        as="input"
                                        size="sm"
                                        type="text"
                                        color="whiteAlpha.900"
                                        _placeholder={{ color: 'whiteAlpha.700' }}
                                        placeholder={socketActive() ? "Connected!" : "Waiting to connect..."}
                                        isDisabled={!socketActive()}
                                        value={message}
                                        maxLength={150}
                                        onChange={handleChatChange}
                                        onKeyDown={handleChatKeydown}
                                    />
                                    <ButtonGroup 
                                        px="4" 
                                        w="100%"
                                        mt="2"
                                    >
                                        <Button     
                                            w="100%"
                                            m="1"
                                            size="sm"
                                            isLoading={isSubmitting} 
                                            loadingText="Joining..." 
                                            onClick={socketActive() ? e => handleSendMessageViaChat(e, ContentType.GROUP) : handleRequestToken} 
                                            variant="solid"
                                        >
                                            {socketActive() ? `Panelist Chat` : `Join Chat`}
                                        </Button>
                                        <Button     
                                            w="100%"
                                            minH="1.5rem"
                                            m="1"
                                            p="1"
                                            size="sm"
                                            // disabled={!socketActive() || callingItDisabled}
                                            loadingText="Joining..." 
                                            onClick={e => handleSendMessageViaChat(e, ContentType.CALLING_IT)} 
                                            variant="outline"
                                            colorScheme="red"
                                            color='#dadada'
                                        >
                                            Calling It
                                        </Button>
                                    </ButtonGroup>
                                </>
                            }

                            { tabIndex == "1" && !isPanelist &&
                                <Heading 
                                    as="h4" 
                                    size="sm"
                                >
                                    Panelists Chat
                                </Heading>
                            }

                        </Flex>
                    </Flex>
                </TabPanels>
            </Tabs>
        </Flex>
    )
}