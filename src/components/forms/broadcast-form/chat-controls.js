import {
    Flex,
    Input,
} from '@chakra-ui/react'
import { ChatButtons } from './chat-buttons'


export const ChatControls = ({
    connected,
    handleReconnect,
    handleSendMessage,
    handleSetMessage,
    message,
}) => {

    return (
        <Flex
            w="100%"
            flexDir="column"
        >
            <Flex
                px="2"
                py="2"
                bg="#222"
            >
                <Input
                    p="1"
                    bg="#000"
                    size="md"
                    onChange={handleSetMessage}
                    onKeyDown={handleSetMessage}
                    value={message}
                    placeholder={connected
                        ? "Type a message..."
                        : "Disconnected..."}
                />
            </Flex>
            <ChatButtons 
                connected={connected}
                handleReconnect={handleReconnect}
                handleSendMessage={handleSendMessage} 
            />
        </Flex>
    )
}