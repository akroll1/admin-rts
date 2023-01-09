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

export const GroupChatPanel = ({
    groupChat,
    setGroupChat,
}) => {
    const { 
        groupChatKey,
        groupChatToken,
        isPanelist,
        requestChatToken,
        setChatToken,
        setGlobalNotification,
        user
    } = useGlobalStore()

    const { username } = user
    const [chatMessages, setChatMessages] = useState([]);
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

    useEffect(() => {
        if(groupConnection?.readyState === 1 && setGroupChat){
            setGroupChat({ ...groupChat, socketActive: true })
        } 
    },[groupConnection?.readyState])

    useEffect(() => {
        if(groupChat.sendMessage){
            handleSendGroupMessage()
            setGroupChat({ ...groupChat, sendMessage: false, message: '' })
        }
    },[groupChat.sendMessage])

    const initGroupConnection = async (token) => {
        const groupConnectionInit = new WebSocket(process.env.REACT_APP_CHAT_WEBSOCKET_URL, token);
        setGroupConnection(groupConnectionInit);
        setChatToken(null, ChatTokenEnum.GROUP)
        
        groupConnectionInit.onopen = (event) => {
            console.info("Connected to the group chat.");
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
            handleReceiveChatMessage(data);
        };
    };

    const handleSendGroupMessage = () => {
        if(!groupChat.message) return
        // const sanitizedMessage = message.replace(/\\/g, "\\\\").replace(/"/g, '\\"');
        let payload = {
            RequestId: uuidv4(),
            Action: 'SEND_MESSAGE',
        }

        const messageType = groupChat.contentType === ChatMessageType.CALLING_IT 
            ? ChatMessageType.CALLING_IT 
            : ChatMessageType.GROUP
        
        Object.assign(payload, {
            Attributes: { 
                messageType,
                chat: ChatMessageType.GROUP
            },
            Content: groupChat.message
        })
        groupConnection.send(JSON.stringify(payload))
        setGroupChat({ ...groupChat, message: '', sendMessage: false })
        // clear message
    }

    const handleReceiveChatMessage = data => {
        console.log('receive groupChat data: ', data)
        const { Attributes, Content, Id, Sender, Type } = data;
        const messageType = Attributes?.messageType === ChatMessageType.GROUP
            ? ChatMessageType.GROUP 
            : ChatMessageType.CALLING_IT;

        const message = Content;

        setChatMessages(prev => [{ Id, message, username: Sender.UserId }, ...prev ]);

        if(messageType === ChatMessageType.CALLING_IT){
            setGlobalNotification({ heading: Sender.Attributes.username, body: message })
        }
    };
    
    const handleRequestToken = () => {
        if(groupChatKey && !groupChat.groupSocketActive){
            requestChatToken(groupChatKey, ChatTokenEnum.GROUP);
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
            id="group_chat"
            ref={groupChatRef}
            // maxH="70vh"
            flexDir="column"
            w="100%"
            overflow="scroll"
            alignItems="center"
            justifyContent="flex-end"
            minH={["40vh", "60vh"]}
        >
            <Flex
                id="groupConnectionRef"
                // minH={["45vh","0"]}
                // maxH={["45vh", "100%"]}
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