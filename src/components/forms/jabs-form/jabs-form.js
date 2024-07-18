import { 
    useState, 
    useEffect 
} from 'react'
import { 
    Flex, 
    Button,  
    HStack, 
    VStack, 
} from '@chakra-ui/react'
import { FieldGroup } from '../../../chakra'
import { useGlobalStore } from '../../../stores'

export const JabsForm = () => {

    const [isSubmitting, setIsSubmitting] = useState(false)

    const { 
        sendWeeklyFightsUpdateEmails
    } = useGlobalStore()
    
    const handleSendWeeklyFightsUpdateEmails = async () => {
        setIsSubmitting(true)
        await sendWeeklyFightsUpdateEmails()
        setIsSubmitting(false)
    }

    return (
        <Flex px={{base: '4', md: '10'}} py="16" maxWidth="3xl" mx="auto" height="auto">
            <FieldGroup title="Weekly Fights Update">
                <VStack width="full" spacing="6">
                    <HStack justifyContent="center" width="full">
                        <Button 
                            disabled={isSubmitting}
                            minW="33%" 
                            isLoading={isSubmitting} 
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
        </Flex>
    )
}