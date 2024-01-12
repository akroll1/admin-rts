import { Button, Flex } from "@chakra-ui/react"
import { MessageCenter } from "../components/message-center"
import { useGlobalStore } from "../stores"

export const BroadcastCenter = () => {  

    // const {
    // } = useGlobalStore()
    
    const handleSendPushNotification = () => {
        console.log('send push notification')
    }

    return (
        <Flex
            w="100%"
            flexDir="column"
        >
            <Button
                w="10%"
                variant="solid"
                size="lg"
                onClick={handleSendPushNotification}
            >
                Test User Auth
            </Button>
            <MessageCenter />
        </Flex>
    )
}