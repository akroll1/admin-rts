import { 
    useEffect, 
    useState, 
    useRef 
} from 'react'
import { 
    Box, 
    Flex, 
    Input 
} from '@chakra-ui/react'
import { 
    ChatEnums,
    useGlobalStore 
} from '../../stores'
import { v4 as uuidv4 } from 'uuid'

export const BroadcastForm = () => {
    const [form, setForm] = useState({broadcast: ''});
    const { sendBroadcast } = useGlobalStore();
 
    
    const { 
        chatKey,
        chatRoom,
        chatToken,
        fetchChatToken,
        setChatToken,
        setGlobalNotification,
        user
    } = useGlobalStore()

    const { username } = user
    const [chat, setChat] = useState([]);
    const [connection, setConnection] = useState(null);
    const [messages, setMessages] = useState([])
    const [message, setMessage] = useState('')
    const connectionRef = useRef(chatRoom);
    connectionRef.current = connection;


    useEffect(() => {
        if(chatKey){
            fetchChatToken(chatKey)
        }
    },[chatKey])

    useEffect(() => {
        if(chatToken){   
            initiateChatRoomConnection(chatToken)
        }
    },[chatToken])

    const initiateChatRoomConnection = (token) => {
        const connectionInit = new WebSocket(
            `wss://edge.ivschat.${`us-east-1`}.amazonaws.com`,
            token
        );
        setConnection(connectionInit);
    
        connectionInit.onopen = (event) => {
            console.info('Connected to the chat room.');
        };
    
        connectionInit.onclose = (event) => {
            // If the websocket closes, remove the current chat token
            setChatToken(null);
        };
    
        connectionInit.onerror = (event) => {
            console.error('Chat room websocket error observed:', event);
            setChatToken(null);
        };
    
        connectionInit.onmessage = (event) => {
            const data = JSON.parse(event.data);
            console.log("MESSAGE: ", data)
            handleReceiveMessage(data);
        };
    };

    const handleSetMessage = e => {
        const { value } = e.currentTarget;
        setMessage(value)
    }

    const handleSendMessage = () => {
        // if(!chat.message) return
        // const sanitizedMessage = message.replace(/\\/g, "\\\\").replace(/"/g, '\\"');
        let payload = {
            RequestId: uuidv4(),
            Action: 'SEND_MESSAGE',
        }

        const messageType = chat.contentType === ChatEnums.CALLING_IT 
            ? ChatEnums.CALLING_IT 
            : ChatEnums.FIGHT
        
        Object.assign(payload, {
            Attributes: { 
                // messageType,
                // chat: ChatEnums.GROUP
            },
            Content: message
        })
        console.log('payload ', payload)
        connection.send(JSON.stringify(payload))
        setChat({ ...chat, message: '', sendMessage: false })
        // clear message
    }

    const handleReceiveMessage = data => {
        console.log('chat data ', data)
        const { Attributes, Content, Id, Sender } = data;

        const messageType = Attributes?.messageType === ChatEnums.FIGHT
            ? ChatEnums.FIGHT 
            : ChatEnums.CALLING_IT;

        const message = Content;
        setMessages(prev => [{ Id, message, username: Sender?.Attributes?.username }, ...prev ]);

        if(messageType === ChatEnums.CALLING_IT){
            setGlobalNotification({ heading: Sender?.Attributes?.username, body: message })
        }
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
        return messages.map( (message, i) => renderMessage(message, i))
    };

    console.log('message ', message)
    console.log('messages ', messages)

    return (
        <Flex
            id="message_center_ref"
            ref={connectionRef}
            flexDir="column"
            w="100%"
            alignItems="center"
            justifyContent="flex-end"
            minH={["5rem"]}
            bg="inherit"
            borderRadius="md"
            border="1px solid #333"
            p="1"
        >
            <Flex
                maxH="5rem"
                overflowY="scroll"
                flexDir="column"
                justifyContent="flex-start"
                borderRadius="md"
                mb="1"
                color="white" 
                fontSize="sm"
                w="100%"
            >    
                {messages.length > 0 ? renderMessages() : 'Welcome'}
            </Flex>
            <Input
                size="sm"
                onChange={handleSetMessage}
                onKeyDown={handleSendMessage}
                value={message}
            />
        </Flex>
    )
}