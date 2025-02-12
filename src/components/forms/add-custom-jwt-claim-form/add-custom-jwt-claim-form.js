import { useState } from 'react'
import { 
    Box, 
    Button, 
    FormControl, 
    FormLabel, 
    Heading, 
    HStack, 
    Input, 
    Stack, 
    StackDivider, 
    VStack 
} from '@chakra-ui/react'
import { FieldGroup } from '../../../chakra'
import { useGlobalStore } from '../../../stores';

export const AddCustomJwtClaimForm = () => {
    
    const {
        addCustomJwtClaim,
    } = useGlobalStore()

    const [uid, setUid] = useState('')
    const [claim, setClaim] = useState('')

    const handleSubmitCustomJwtClaim = async () => {
        if(!uid) return alert('Please enter a valid UID')
        if(!claim) return alert('Please enter a valid claim')
        await addCustomJwtClaim(uid, claim)
    }

    return (
        <Box 
            px={['4', '8']} 
            py="8" 
            maxWidth="3xl" 
            mx="auto"
        >   
            <Stack spacing="4" divider={<StackDivider />}>
                <Heading size="lg" as="h1" paddingBottom="4">
                    Add Custom JWT Claim
                </Heading>
                <FieldGroup title="Custom JWT Claim">
                    <VStack width="full" spacing="6">
                        <FormControl id="uid">
                            <FormLabel htmlFor="uid">User UID</FormLabel>
                            <Input 
                                value={uid} 
                                onChange={e => setUid(e.currentTarget.value )} 
                                type="text" 
                            />
                        </FormControl>
                        <FormControl id="claim">
                            <FormLabel htmlFor="claim">Claim</FormLabel>
                            <Input 
                                value={claim} 
                                onChange={e => setClaim(e.currentTarget.value )} 
                                type="text" 
                            />
                        </FormControl>
                        <HStack justifyContent="center" width="full">
                            <Button 
                                disabled={!uid || !claim}  
                                minW="33%" 
                                // isLoading={isSubmitting} 
                                loadingText="Searching..." 
                                onClick={handleSubmitCustomJwtClaim} 
                                type="button" 
                                colorScheme="solid"
                            >
                                Submit Claim
                            </Button>
                        </HStack>
                    </VStack>
                </FieldGroup>
                
            </Stack>
        </Box>
    )
}