import { useState, useEffect } from 'react'
import { 
    Box, 
    Button, 
    ButtonGroup, 
    Flex, 
    FormControl, 
    FormLabel, 
    Heading, 
    HStack, 
    Input, 
    Radio, 
    RadioGroup, 
    Select, 
    Stack, 
    StackDivider, 
    useToast, 
    VStack 
} from '@chakra-ui/react'
import { DividerWithText, FieldGroup } from '../../chakra'
import { 
    capFirstLetters, 
    OfficialResults,
    Status, 
    useGlobalStore,
} from '../../stores'

export const FightResolutionForm = () => {

    const { 
        fetchDistanceById,
        isSubmitting,
        selectedDistance,
        selectedFightSummary, 
        submitDistanceResolution,
    } = useGlobalStore()

    const [form, setForm] = useState({
        id: '', 
        title: '',
        distanceType: '',
    })  

    useEffect(() => {
        if(selectedFightSummary?.fighters?.length > 0 ){
            setForm({ ...form, fight: selectedFightSummary.fight, fighters: selectedFightSummary.fighters })
        }
    },[])

    const handleSubmitResolution = () => {
        submitDistanceResolution()
    }

    const handleFetchDistanceSummary = () => {
        fetchDistanceById(form.id)
    }

    // console.log('form: ', form)
    return (
        <Flex 
            px={{base: '4', md: '10'}} 
            py="16" 
            w="100%"
            mx="auto"
        >
            <form id="distance_resolution_form" onSubmit={(e) => {e.preventDefault()}}>
                <Stack spacing="4" divider={<StackDivider />}>
                    <Heading 
                        size="lg" 
                        as="h1" 
                        pb="4"
                    >
                        Distance Resolution Form
                    </Heading>
                    <FieldGroup title="Search for Distance">
                        <VStack width="full" spacing="6">
                            <FormControl id="id">
                                <FormLabel htmlFor="id">
                                    Distance ID
                                </FormLabel>
                                <Input 
                                    value={form.id} 
                                    type="text" 
                                    maxLength={36} 
                                />
                            </FormControl>
                            <HStack justifyContent="center" width="full">
                                <Button 
                                    disabled={!form.id}  
                                    minW="33%" 
                                    isLoading={isSubmitting} 
                                    loadingText="Searching..." 
                                    onClick={handleFetchDistanceSummary} 
                                    type="button" 
                                    colorScheme="solid"
                                >
                                    Search
                                </Button>
                            </HStack>
                        </VStack>
                    </FieldGroup>
                </Stack>
                <FieldGroup mt="8">
                    <ButtonGroup w="100%">
                        <Button 
                            minW="33%"
                            onClick={handleSubmitResolution} 
                            type="button" 
                            colorScheme="solid"
                            isLoading={isSubmitting}
                            loadingText="Submitting..."
                        >
                            Submit
                        </Button>
                    </ButtonGroup>
                </FieldGroup>
            </form>
        </Flex>
    )
}