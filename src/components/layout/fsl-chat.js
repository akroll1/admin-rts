import { 
    useEffect, 
    useState, 
    useRef 
} from 'react'
import { 
    ChatMessageType,
    useGlobalStore 
} from '../../stores'

export const FSLChat = () => {

    const { 
        chatKey,
        chatToken,
        fetchChatToken,
        setGlobalNotification,
    } = useGlobalStore()

    const [chatRoom, setChatRoom] = useState(null);
    const [connection, setConnection] = useState(null);
    const connectionRef = useRef(chatRoom);
    connectionRef.current = connection;

    useEffect(() => {
        if(chatKey){
            // fetchChatToken(chatKey)
        }
    },[chatKey])

    useEffect(() => {
        if(chatToken){   
            if(connection?.readyState === 1){
                return
            }
            // initiateFSLConnection(chatToken)
        }
    },[chatToken])

    const initiateFSLConnection = (token) => {
        const connectionInit = new WebSocket(
            `wss://edge.ivschat.${`us-east-1`}.amazonaws.com`,
            token
        );
        setConnection(connectionInit);
    
        connectionInit.onopen = (event) => {
          console.info('Connected to FSL chat room.');
        };
    
        connectionInit.onclose = (event) => {
            console.log('FSL chat closed:', event);
        };
    
        connectionInit.onerror = (event) => {
          console.error('FSL chat error observed:', event);
        };
    
        connectionInit.onmessage = (event) => {
            const data = JSON.parse(event.data);
            handleReceiveMessage(data);
        };
    };

    const handleReceiveMessage = data => {
        console.log("Received global message: ", data);
        const { Attributes, Content } = data;

        if(Attributes?.messageType === ChatMessageType.GLOBAL){
            setGlobalNotification({
                heading: Attributes?.username,
                message: Content,
            })
        }
    };

    return (
        <></>
    )
}