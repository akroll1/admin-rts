import { 
    Button,
    Flex,
} from '@chakra-ui/react'
import { ChatMessageType } from '../../../stores'

export const ChatButtons = ({
    connected,
    handleReconnect,
    handleSendMessage,
}) => {

    const handleClick = e => {
        e.preventDefault()
        if(connected){
            handleSendMessage(ChatMessageType.CORNER)
            return
        }
        handleReconnect()
    }

    return (
        <Flex
            w="100%"
            flexDir={["column", "row"]}
            justifyContent="space-around"
            bg="#222"
            borderBottomRadius={["md"]}
            pt={["1", "4"]}
            pb="4"
            px="2"
        >
            
            <Button
                mt={["2", "0"]}
                p="2"
                onClick={handleClick}
                minW="50%"
            >
                {connected ? "Send" : "Reconnect"}
            </Button>
        </Flex>
    )
}