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
    TabPanel,
} from '@chakra-ui/react'
import { v4 as uuidv4 } from 'uuid'
import { 
    ChatTokenEnum,
    ContentType,
    TabsEnum, 
    useGlobalStore 
} from '../../../stores'

export const GroupChatPanel = () => {
    const { 
        chatMessage,
        groupChatKey,
        groupChatToken,
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
  
    const messagesEndRef = createRef();
    // user
    const groupChatRef = createRef();
    const [groupConnection, setGroupConnection] = useState(null);
    const groupConnectionRef = useRef(groupConnection);
    groupConnectionRef.current = groupConnection;

    useEffect(() => {
        if(groupChatKey){
            requestChatToken(groupChatKey, ChatTokenEnum.GROUP)
        }
    },[groupChatKey])

    useEffect(() => {
        if(groupChatToken){   
            initGroupConnection(groupChatToken)
        }
    },[groupChatToken])

    const initGroupConnection = async (token) => {
        const groupConnectionInit = new WebSocket(process.env.REACT_APP_CHAT_WEBSOCKET_URL, token);
        setGroupConnection(groupConnectionInit);
        setChatToken(null, ChatTokenEnum.GROUP)
        groupConnectionInit.onopen = (event) => {
            console.info("Connected to the chat room.");
            setChatMessages(prevState => [...prevState]);
        };
    
        groupConnectionInit.onclose = (event) => {
            // If the websocket closes, remove the current chat token
            setChatToken(null, ChatTokenEnum.GROUP);
            handleRequestToken(username)
        };
    
        groupConnectionInit.onerror = (event) => {
            console.error("Chat room websocket error observed:", event);
        };
    
        groupConnectionInit.onmessage = (event) => {
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
            return groupConnection.send(JSON.stringify(callingIt))
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
        if(groupChatKey && !socketActive()){
            requestChatToken(groupChatKey, ChatTokenEnum.GROUP);
        }
    };

    const handleChatChange = e => {
        setMessage(e.target.value);
    };

    const handleChatKeydown = e => {
        if (e.key === "Enter") {
            if (chatMessage) {
                // setChatMessage("");
                handleSendMessageViaChat(e, ContentType.GROUP);
            }
        }
    };

    const socketActive = () => {
        return groupConnection?.readyState === 1;
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

    return (
        <Flex
            id="group_chat"
            ref={groupChatRef}
            minH="70vh"
            maxH="70vh"
            flexDir="column"
            w="100%"
            overflow="scroll"
            alignItems="center"
            justifyContent="flex-end"
            // pb="4"
        >
            <Flex
                id="groupConnectionRef"
                minH={["45vh","0"]}
                maxH={["45vh", "100%"]}
                overflowY="scroll"
                maxW="100%"
                flexDir="column-reverse"
                justifyContent="flex-start"
                borderRadius="md"
                bg="#171717"
                mb="1"
                color="white" 
                fontSize="sm"
                w="100%"
            >    
                {renderMessages()}
            </Flex>
            {/* <Flex ref={messagesEndRef} /> */}
            <Flex
                h="auto"
                w="100%"
                flexDir="column"
                alignItems="center"
                justifyContent="flex-end"
                pt="4"
            >
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
                        onKeyDown={handleChatKeydown}
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
            </Flex>
        </Flex>
    )
}