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

    const [cornerUpdateForm, setCornerUpdateForm] = useState({
        seasonId: '',
        fightId: '',
        fightTitle: '',
        fightSummary: '',
        isDraw: false,
        nextWeeksFight: '',
        officialResult: ''
    })  
    const [pushToken, setPushToken] = useState('')
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

    const handleSendPushNotification = async () => {
        console.log('handleSendPushNotification')
        setSubmittingPushNotification(true)
        setTimeout(() => sendPushNotification(seasonId),3000)
        setSubmittingPushNotification(false)
    }

    const handleUpdateCornerUpdateForm = (e) => {
        const { id, value } = e.currentTarget;
        if(id === "isDraw"){
            setCornerUpdateForm( prev => ({ ...prev, isDraw: value === "true" ? true : false }))
            return;
        }
        setCornerUpdateForm( prev => ({
            ...prev,
            [id]: value
        }))
    }
  
    const handleSendWeeklyCornerUpdateEmails = async () => {
        console.log('handleSendWeeklyCornerUpdateEmails')
        setSubmittingWeeklyCornerUpdate(true)
        console.log('cornerUpdateForm: ', cornerUpdateForm)
        await sendWeeklyCornerUpdateEmails(cornerUpdateForm)
        setSubmittingWeeklyCornerUpdate(false)
    }
    // {
    //     "seasonId": "39ea50a6-5cb4-4d05-893c-d943d3e838e5",
    //     "fightId": "422a645e-3c65-49d7-865c-a85420b9bf95",
    //     "fightTitle": "Conceicao vs Foster",
    //     "fightSummary": "Foster defeated Conceicao but split decision.",
    //     "isDraw": false,
    //     "nextWeeksFight": "Next week is Davis vs Lemos.",
    //     "officialResult": "4c965a90-32b0-4e24-8081-a94659489476:7-5"
    // }

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
                    <FormControl id="seasonId">
                        <FormLabel htmlFor="seasonId">Season ID</FormLabel>
                        <Input 
                            value={cornerUpdateForm.seasonId} 
                            onChange={handleUpdateCornerUpdateForm} 
                            type="text"
                            placeholder="Season ID" 
                        />
                    </FormControl>
                    <FormControl id="fightId">
                        <FormLabel htmlFor="fightId">Fight ID</FormLabel>
                        <Input 
                            value={cornerUpdateForm.fightId} 
                            onChange={handleUpdateCornerUpdateForm} 
                            type="text"
                            placeholder="Fight ID" 
                        />
                    </FormControl>
                    <FormControl id="fightTitle">
                        <FormLabel htmlFor="fightTitle">Fight Title</FormLabel>
                        <Input 
                            value={cornerUpdateForm.fightTitle} 
                            onChange={handleUpdateCornerUpdateForm} 
                            type="text"
                            placeholder="Fight ID" 
                        />
                    </FormControl>
                    <FormControl id="fightSummary">
                        <FormLabel htmlFor="fightSummary">Fight Summary</FormLabel>
                        <Input 
                            value={cornerUpdateForm.fightSummary} 
                            onChange={handleUpdateCornerUpdateForm} 
                            type="text"
                            placeholder="Fight Summary, quick blurb." 
                        />
                    </FormControl>
                    <FormControl id="isDraw">
                        <FormLabel htmlFor="isDraw">Is Draw</FormLabel>
                        <Input 
                            value={cornerUpdateForm.isDraw} 
                            onChange={handleUpdateCornerUpdateForm} 
                            type="text"
                            placeholder="Fight Summary, quick blurb." 
                        />
                    </FormControl>
                    <FormControl id="nextWeeksFight">
                        <FormLabel htmlFor="nextWeeksFight">Next Week's Fight</FormLabel>
                        <Input 
                            value={cornerUpdateForm.nextWeeksFight} 
                            onChange={handleUpdateCornerUpdateForm} 
                            type="text"
                            placeholder="Next week's fight." 
                        />
                    </FormControl>
                    <FormControl id="officialResult">
                        <FormLabel htmlFor="officialResult">Official Result</FormLabel>
                        <Input 
                            value={cornerUpdateForm.officialResult} 
                            onChange={handleUpdateCornerUpdateForm} 
                            type="text"
                            placeholder="Example: 64663e6d-6de5-447c-8459-2e637b042120:KO5" 
                        />
                    </FormControl>
                    <HStack justifyContent="center" width="full">
                        <Button 
                            disabled={submittingWeeklyCornerUpdate}
                            minW="33%" 
                            isLoading={submittingWeeklyCornerUpdate} 
                            loadingText="Blasting Out Update..." 
                            onClick={handleSendWeeklyCornerUpdateEmails} 
                            type="button" 
                            colorScheme="solid"
                        >
                            Send Weekyl Corner Update Emails
                        </Button>
                    </HStack>
                </VStack>
            </FieldGroup>
            <FieldGroup title="Push Notifications">
                <VStack width="full" spacing="6">
                    <FormControl id="id">
                        <FormLabel htmlFor="id">Token</FormLabel>
                        <Input 
                            value={pushToken} 
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