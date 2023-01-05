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
} from '@chakra-ui/react'
import { v4 as uuidv4 } from 'uuid'
import { 
    ChatEnum,
    ContentType,
    useGlobalStore 
} from '../../../stores'

export const ChatUserPanel = ({
    handleRequestToken,
    handleSendMessageViaChat,
    handleUserChange,
    handleUserKeydown,
}) => {
    const { 
        isSubmitting,
        requestChatToken,
        setGlobalNotification,
        setUserChatToken,
        user,
        userChatKey,
        userChatMessage,
        userChatToken,
    } = useGlobalStore()

    const { username } = user

    const [userMessage, setUserMessage] = useState('')
    const [userMessages, setUserMessages] = useState([]);
  

    const socketActive = () => {
        // return userConnection?.readyState === 1;
    };

    // Renderers
    const renderUserMessage = (message, i) => {
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
    
    const renderUserMessages = () => {
        return userMessages.map( (message, i) => renderUserMessage(message, i))
    };

    return (
        <Flex
            // ref={userRef}
            id="user_chat"
            minH="100%"
            maxH="100%"
            flexDir="column"
            w="100%"
            overflow="scroll"
            alignItems="center"
            justifyContent="flex-end"
        >
            <Flex
                minH={["50vh","0"]}
                maxH={["50vh", "100%"]}
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
                {renderUserMessages()}
            </Flex>
            {/* <Flex ref={messagesEndRef} /> */}
            <Flex
                h="auto"
                w="100%"
                flexDir="column"
                alignItems="center"
                justifyContent="flex-end"
                pb="4"
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
                    value={userMessage}
                    maxLength={150}
                    onChange={handleUserChange}
                    onKeyDown={handleUserKeydown}
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
                        onClick={socketActive() ? e => handleSendMessageViaChat(e, ContentType.GROUP) : handleRequestToken(ChatEnum.USER)} 
                        variant="solid"
                        onKeyDown={handleUserKeydown}
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
                        onClick={e => handleSendMessageViaChat(e, ContentType.CALLING_IT, ChatEnum.USER)} 
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