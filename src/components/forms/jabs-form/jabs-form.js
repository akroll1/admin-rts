import { useState } from 'react'
import { 
    Button,  
    Flex, 
    FormControl,
    FormLabel,
    HStack, 
    Input,
    VStack, 
} from '@chakra-ui/react'
import { FieldGroup } from '../../../chakra'
import { useGlobalStore } from '../../../stores'

export const JabsForm = () => {

    const [seasonId, setSeasonId] = useState('')
    const [submittingPushNotification, setSubmittingPushNotification] = useState(false)
    const [submittingWeeklyFightsUpdate, setSubmittingWeeklyFightsUpdate] = useState(false)
    const [submittingWeeklyCornerUpdate, setSubmittingWeeklyCornerUpdate] = useState(false)

    const { 
        sendPushNotification,
        sendWeeklyCornerUpdateEmails,
        sendWeeklyFightsUpdateEmails
    } = useGlobalStore()
    
    const handleSendWeeklyFightsUpdateEmails = async () => {
        setSubmittingWeeklyFightsUpdate(true)
        await sendWeeklyFightsUpdateEmails()
        setSubmittingWeeklyFightsUpdate(false)
    }

    const handleSendWeeklyCornerUpdateEmails = async () => {
        console.log('handleSendWeeklyCornerUpdateEmails')
        if(!seasonId || seasonId.length !== 36){
            alert('Please enter a valid season ID')
            return
        }
        setSubmittingWeeklyCornerUpdate(true)
        await sendWeeklyCornerUpdateEmails(seasonId)
        setSubmittingWeeklyCornerUpdate(false)
    }

    const handleSendPushNotification = async () => {
        console.log('handleSendPushNotification')
        setSubmittingPushNotification(true)
        setTimeout(() => sendPushNotification(seasonId),3000)
        setSubmittingPushNotification(false)
    }

    return (
        <Flex 
            id="jabs_form"
            px={{base: '4', md: '10'}} 
            py="16" 
            maxWidth="3xl" 
            mx="auto" 
            height="auto"
            flexDir="column"
            justifyContent="flex-start"
            alignItems="center"
        >
            <FieldGroup title="Weekly Fights Update" mb="12">
                <VStack width="full" spacing="6">
                    <HStack justifyContent="center" width="full">
                        <Button 
                            disabled={submittingWeeklyFightsUpdate}
                            minW="33%" 
                            isLoading={submittingWeeklyFightsUpdate} 
                            loadingText="Searching..." 
                            onClick={handleSendWeeklyFightsUpdateEmails} 
                            type="button" 
                            colorScheme="solid"
                        >
                            Send Weekyl Fights Update Emails
                        </Button>
                    </HStack>
                </VStack>
            </FieldGroup>
            <FieldGroup title="Weekly Corner Updates">
                <VStack width="full" spacing="6">
                    <FormControl id="id">
                        <FormLabel htmlFor="id">Season ID</FormLabel>
                        <Input 
                            value={seasonId} 
                            onChange={e => setSeasonId(e.currentTarget.value)} 
                            type="text"
                            placeholder="Enter Season ID" 
                        />
                    </FormControl>
                    <HStack justifyContent="center" width="full">
                        <Button 
                            disabled={submittingWeeklyCornerUpdate}
                            minW="33%" 
                            isLoading={submittingWeeklyCornerUpdate} 
                            loadingText="Searching..." 
                            onClick={handleSendWeeklyCornerUpdateEmails} 
                            type="button" 
                            colorScheme="solid"
                        >
                            Send Weekyl Corner Update Emails
                        </Button>
                    </HStack>
                </VStack>
            </FieldGroup>
            <FieldGroup title="Weekly Corner Updates">
                <VStack width="full" spacing="6">
                    <FormControl id="id">
                        <FormLabel htmlFor="id">Token</FormLabel>
                        <Input 
                            value={seasonId} 
                            onChange={e => setSeasonId(e.currentTarget.value)} 
                            type="text"
                            placeholder="Enter Season ID" 
                        />
                    </FormControl>
                    <HStack justifyContent="center" width="full">
                        <Button 
                            disabled={submittingPushNotification}
                            minW="33%" 
                            isLoading={submittingPushNotification} 
                            loadingText="Searching..." 
                            onClick={handleSendPushNotification} 
                            type="button" 
                            colorScheme="solid"
                        >
                            Send Push Notification
                        </Button>
                    </HStack>
                </VStack>
            </FieldGroup>
        </Flex>
    )
}