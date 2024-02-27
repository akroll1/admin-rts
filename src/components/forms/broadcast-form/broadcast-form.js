import { 
    useEffect, 
    useState, 
    useRef 
} from 'react'
import {
    Button, 
    Flex 
} from '@chakra-ui/react'
import { 
    ChatMessageType,
    useGlobalStore 
} from '../../../stores'
import { v4 as uuidv4 } from 'uuid'
import { ChatControls } from './chat-controls';
import { RenderMessages } from './render-messages';

export const BroadcastForm = () => {

    const { 
        chatKey,
        chatToken,
        fetchChatToken,
        performKBTest,
    } = useGlobalStore()

    const [chatRoom] = useState(null);
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
            if(connection?.readyState === 1){
                return
            }
            initiateConnection(chatToken)
        }
    },[chatToken])

    const initiateConnection = (token) => {
        console.log('token: ', token)
        const connectionInit = new WebSocket(
            `wss://edge.ivschat.${`us-east-1`}.amazonaws.com`,
            token
        );
        setConnection(connectionInit);
    
        connectionInit.onopen = (event) => {
          console.info('Connected to the chat room.');
        };
    
        connectionInit.onclose = (event) => {
            console.log('Chat room websocket closed:', event);
            connectionInit.onclose = (event) => {
                if(chatKey){
                    setTimeout(() => {
                        fetchChatToken(chatKey)
                        console.log("RECONNECTING to chat room...")
                    },5000)
                }
            };
        };
    
        connectionInit.onerror = (event) => {
          console.error('Chat room websocket error observed:', event);
        };
    
        connectionInit.onmessage = (event) => {
            console.log("Received message: ", event);
            const data = JSON.parse(event.data);
            handleReceiveMessage(data);
        };
    };
    // Handlers

    const handleReceiveMessage = data => {
        // console.log("Received message: ", data);
        const { Attributes, Content, Id } = data;
        
        const message = Content || 'No message content found.';
        const obj = { 
            Id, 
            message, 
            username: Attributes?.username,
            messageType: ChatMessageType.GLOBAL,
        }
        setMessages(prev => [obj, ...prev ]);
    };

    const handleSendMessage = messageType => {
        if(!message) return
        let payload = {
            RequestId: uuidv4(),
            Action: 'SEND_MESSAGE',
            Attributes: { 
                username: 'FSL',
                messageType: ChatMessageType.GLOBAL,
            },
            Content: message || 'No message content found.',
        }
        connection.send(JSON.stringify(payload))
        setMessage('')
    }

    const handleReconnect = () => {
        if(chatToken) {
            console.log("Reconnecting to chat room...")
            initiateConnection(chatToken)
        }
        if(!chatKey){
            console.log("No chat room key found!")
        }
        fetchChatToken(chatKey)
    }

    const handleSetMessage = e => {
        if(e.key === 'Enter'){
            return handleSendMessage(ChatMessageType.GLOBAL)
        }
        const { value } = e.currentTarget;
        setMessage(value)
    }

    const handleKBTest = () => {
        performKBTest()
    }

    // console.log("messages: ", messages);

    return (
        <>
            <Button
                m="4"
                onClick={handleKBTest}
            >
                Knowledge Base Test                  
            </Button>

            <Flex
                id="chat_tab"
                ref={connectionRef}
                flexDir="column"
                w="100%"
                alignItems="center"
                justifyContent="flex-start"
                minH={["5rem"]}
                bg="inherit"
                borderRadius="md"
                border="1px solid #333"
                maxW={["100%", "90%", "80%"]}
            >
               
                {/* <Flex
                    py="4"
                    maxH="15rem"
                    minH="15rem"
                    overflowY="scroll"
                    flexDir="column-reverse"
                    justifyContent="flex-start"
                    alignItems="flex-start"
                    borderRadius="md"
                    pb="2"
                    color="white" 
                    fontSize="sm"
                    w="100%"
                >    
                    {messages.length > 0 &&
                        messages.map( (message, _i) => (
                            <RenderMessages
                                key={_i}
                                message={message}
                            />
                        ))
                    }
                </Flex>
                <ChatControls
                    connected={connection?.readyState === 1}
                    handleReconnect={handleReconnect}
                    handleSendMessage={handleSendMessage}
                    handleSetMessage={handleSetMessage}
                    message={message}
                /> */}
            </Flex>
        </>
    )
}