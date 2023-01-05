import { 
    useEffect,
    useRef,    
    useState 
} from 'react'
import {
    Box,
    Flex,
    Heading,
    Tab,
    Tabs,
    TabList,
    TabPanel,
    TabPanels,
} from '@chakra-ui/react'
import {
    ChatEnum,
    ContentType,
    TabsEnum,
    useGlobalStore,
} from '../../stores'
import { v4 as uuidv4 } from 'uuid'
import { ChatUserPanel, ChatPanelistPanel } from './scoring-sidebar-components'

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
    const [tabIndex, setTabIndex] = useState(0)

    const [connection, setUserConnection] = useState(null);
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
        setUserConnection(connectionInit);
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

    const handleUserChange = e => {
        setMessage(e.target.value);
    };

    const handleUserKeydown = e => {
        if (e.key === "Enter") {
            if (chatMessage) {
                // setChatMessage("");
                handleSendMessageViaChat(e, ContentType.GROUP, ChatEnum.USER);
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

    const handleTabsChange = (index) => {
        setTabIndex(index)
    }


    return (
        <Flex 
            display={tabs[TabsEnum.ALL] || tabs[TabsEnum.CHAT] ? 'flex' : 'none'}
            bg="fsl-sidebar-bg"
            border="1px solid #252525"
            id="chat-sidebar"
            flex={["1 0 25%"]} 
            maxW={["100%", "100%", "40%"]} 
            borderRadius="md" 
            overflow="hidden"
            position="relative"
            justifyContent="space-between"
            flexDir="column" 
            minH="90%"
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
                    <TabPanel>
                        <ChatUserPanel 
                            handleRequestToken={handleRequestToken}
                            handleSendMessageViaChat={handleSendMessageViaChat}
                            handleUserChange={handleUserChange}
                            handleUserKeydown={handleUserKeydown}
                        />
                    </TabPanel>
                    <TabPanel>
                        {/* <ChatPanelistPanel /> */}
                    </TabPanel>
                </TabPanels>
            </Tabs>
        </Flex>
    )
}