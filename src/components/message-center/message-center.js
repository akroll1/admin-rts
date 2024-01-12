import { 
    useEffect, 
    useState, 
    useRef, 
    createRef
} from 'react'
import { 
    Box, 
    Flex,
    Input,
} from '@chakra-ui/react'
import { v4 as uuidv4 } from 'uuid'
import { 
    ChatEnums,
    useGlobalStore 
} from "../../stores"

export const MessageCenter = ({
    showSidebar
}) => {
    
    const { 
        chatToken,
        distanceMetas,
        requestChatToken,
        setChatToken,
        user,
    } = useGlobalStore()

    const username = "username"
    const [chatMessage, setChatMessage] = useState([]);
    const [chatMessages, setChatMessages] = useState([]);

    const [connection, setConnection] = useState(null);
    const connectionRef = useRef();
    connectionRef.current = connection;
    const messageCenterRef = useRef()
    messageCenterRef.current = document.getElementById("message_center_ref")
    
    useEffect(() => {
        if(distanceMetas?.syncs){
            requestChatToken(distanceMetas.syncs, ChatEnums.FSL)
        }
    },[distanceMetas])

    useEffect(() => {
        if(chatToken){   
            initShowConnection(chatToken)
        }
    },[chatToken])

    const initShowConnection = async (chatToken) => {
        const initConnection = new WebSocket(process.env.REACT_APP_CHAT_WEBSOCKET_URL, chatToken);
        setConnection(initConnection);
        setChatToken(null, ChatEnums.FSL)
        initConnection.onopen = (event) => {
            console.info("Connected to the fight chat.");
            setChatMessages(prevState => [...prevState]);
        };
    
        initConnection.onclose = (event) => {
            // If the websocket closes, remove the current chat token
            setChatToken(null, ChatEnums.FSL);
            handleRequestToken()
        };
    
        initConnection.onerror = (event) => {
            console.error("Chat room websocket error observed:", event);
        };
    
        initConnection.onmessage = (event) => {
            const data = JSON.parse(event.data);
            handleReceiveMessage(data);
        };
    };

    const handleSetChatMessage = e => {
        const { value } = e.currentTarget;
        setChatMessage(value)

    }

    const handleSendMessage = e => {
        if(e.key === 'Enter'){
            if(!user?.sub){
                return alert('Please sign in.')
            }
            
            if(!chatMessage) return
            const payload = {
                "Action": "SEND_MESSAGE",
                requestId: uuidv4(),
                Content: chatMessage,
                Attributes: {
                    originator: ChatEnums.FSL
                }
              }
            connection.send(JSON.stringify(payload))
            setChatMessage('')
        }
    }

    const handleReceiveMessage = data => {
        console.log('fightChat data ', data)
        const { Content, Sender: { Attributes, UserId } } = data;
        const { originator } = data.Attributes;
        const isSender = UserId === user?.sub;
        const { username } = Attributes;

        if(originator === ChatEnums.FSL){
            const message = {
                originator,
                isSender,
                username,
                message: Content
            }
            setChatMessages( prev => ([ ...prev, message] ))
        }
    };
    
    const handleRequestToken = () => {
        if(distanceMetas.syncs){
            requestChatToken(distanceMetas.syncs, ChatEnums.FSL);
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
        return chatMessages?.map( (message, i) => renderMessage(message, i))
    };

    return (
        <Flex
            id="message_center_ref"
            ref={connectionRef}
            display={showSidebar ? 'flex' : 'none'}
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
                {chatMessages?.length > 0 ? renderMessages() : 'Welcome'}
            </Flex>
            <Input
                size="sm"
                onChange={handleSetChatMessage}
                onKeyDown={handleSendMessage}
                value={chatMessage}
            />
        </Flex>
    )
}