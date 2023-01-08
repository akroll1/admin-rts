import { 
    createRef, 
    useEffect, 
    useState, 
    useRef 
} from 'react'
import { 
    Box, 
    Flex,
} from '@chakra-ui/react'
import { v4 as uuidv4 } from 'uuid'
import { 
    ChatTokenEnum,
    ChatMessageType,
    useGlobalStore 
} from '../../../stores'

export const FightChatPanel = ({
    fightChat,
    setFightChat,
}) => {
    const { 
        fightChatKey,
        fightChatToken,
        isPanelist,
        requestChatToken,
        setChatToken,
        setGlobalNotification,
        user
    } = useGlobalStore()

    const { username } = user
    const [chatMessages, setChatMessages] = useState([]);
    const [fightConnection, setFightConnection] = useState(null);
    const fightConnectionRef = useRef(fightConnection);
    fightConnectionRef.current = fightConnection;

    useEffect(() => {
        if(fightChatKey){
            requestChatToken(fightChatKey, ChatTokenEnum.FIGHT)
        }
    },[fightChatKey])

    useEffect(() => {
        if(fightChatToken){   
            initFightConnection(fightChatToken)
        }
    },[fightChatToken])
    
    useEffect(() => {
        if(fightConnection?.readyState === 1 && setFightChat){
            setFightChat({ ...fightChat, socketActive: true })
        } 
    },[fightConnection?.readyState])

    useEffect(() => {
        if(fightChat.sendMessage){
            handleSendFightMessage()
            setFightChat({ ...fightChat, sendMessage: false, message: '' })
        }
    },[fightChat.sendMessage])

    const initFightConnection = async (token) => {
        const fightConnectionInit = new WebSocket(process.env.REACT_APP_CHAT_WEBSOCKET_URL, token);
        setFightConnection(fightConnectionInit);
        setChatToken(null, ChatTokenEnum.GROUP)
        fightConnectionInit.onopen = (event) => {
            console.info("Connected to the fight chat.");
            setChatMessages(prevState => [...prevState]);
        };
    
        fightConnectionInit.onclose = (event) => {
            // If the websocket closes, remove the current chat token
            setChatToken(null, ChatTokenEnum.GROUP);
            handleRequestToken()
        };
    
        fightConnectionInit.onerror = (event) => {
            console.error("Chat room websocket error observed:", event);
        };
    
        fightConnectionInit.onmessage = (event) => {
            const data = JSON.parse(event.data);
            handleReceiveMessage(data);
        };
    };

    const handleSendFightMessage = () => {
        if(!fightChat.message) return
        // const sanitizedMessage = message.replace(/\\/g, "\\\\").replace(/"/g, '\\"');
        let payload = {
            RequestId: uuidv4(),
            Action: 'SEND_MESSAGE',
        }

        const messageType = fightChat.contentType === ChatMessageType.CALLING_IT 
            ? ChatMessageType.CALLING_IT 
            : ChatMessageType.GROUP
        
        Object.assign(payload, {
            Attributes: { 
                messageType,
                chat: ChatMessageType.GROUP
            },
            Content: fightChat.message
        })
        fightConnection.send(JSON.stringify(payload))
        setFightChat({ ...fightChat, message: '', sendMessage: false })
        // clear message
    }

    const handleReceiveMessage = data => {
        console.log('fightChat data ', data)
        const { Attributes, Content, Id, Sender, Type } = data;
        const messageType = Attributes?.messageType === ChatMessageType.FIGHT
            ? ChatMessageType.FIGHT 
            : ChatMessageType.CALLING_IT;

        const message = Content;
        setChatMessages(prev => [{ Id, message, username: Sender.UserId }, ...prev ]);

        if(messageType === ChatMessageType.CALLING_IT){
            setGlobalNotification({ heading: Sender.Attributes.username, body: message })
        }
    };
    
    const handleRequestToken = () => {
        if(fightChatKey && !fightChat.socketActive){
            requestChatToken(fightChatKey, ChatTokenEnum.FIGHT);
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
        return chatMessages.map( (message, i) => renderMessage(message, i))
    };

    return (
        <Flex
            id="fight_chat"
            ref={fightConnectionRef}
            maxH="70vh"
            flexDir="column"
            w="100%"
            overflow="scroll"
            alignItems="center"
            justifyContent="flex-end"
            // pb="4"
        >
            <Flex
               id="fightConnectionRef"
            //    ref={fightChatRef}
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

            
        </Flex>
    )
}