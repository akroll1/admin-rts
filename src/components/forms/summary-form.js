import { 
    useEffect,
    useState,
} from 'react'
import { 
    Box, 
    Button, 
    FormControl, 
    FormLabel, 
    Heading, 
    HStack, 
    Input, 
    Select,
    Stack, 
    StackDivider, 
    VStack 
} from '@chakra-ui/react'
import { FieldGroup } from '../../chakra'
import { 
    DistanceType,
    useGlobalStore, 
} from '../../stores';

export const SummaryForm = () => {
    const {
        createSummary,
        deleteSummary,
        fetchSummaryById,
        selectedSummary,
    } = useGlobalStore()

    const [form, setForm] = useState({
        id: '',
        summary: {},
        type: '',
    });

    useEffect(() => {
        if(selectedSummary?.id){
            setForm(selectedSummary)
        }
    },[selectedSummary])

    const handleFormChange = e => {
        const { id, value } = e.currentTarget;
        return setForm({ ...form, [id]: value })
    }

    const handleFetchSummary = () => {
        fetchSummaryById(form.id)
    }

    const handleDelete = e => { 
        // hold on, this is fast...
        deleteSummary(e.currentTarget.id)
    }

    const handleCreateSummary = e => {
        console.log('form- create: ', form)
        if(form.id.length !== 36 || !DistanceType[form.type]){
            alert('Bad summary values!')
            return;
        }
        createSummary(form.id, form.type)
    }
    
    console.log('form: ', form)

    return (
        <Box 
            px={{base: '4', md: '10'}} 
            py="16" 
            maxWidth="3xl" 
            mx="auto"
        >   
            <form id="blog_post_form" onSubmit={(e) => {e.preventDefault()}}>
                <Stack spacing="4" divider={<StackDivider />}>
                    <Heading size="lg" as="h1" paddingBottom="4" mt="3rem">
                        Summary Form
                    </Heading>
                    <FieldGroup title="Summary Form">
                        <VStack width="full" spacing="6">
                            <FormControl id="id">
                                <FormLabel htmlFor="id">Summary ID</FormLabel>
                                <Input 
                                    value={form.id} 
                                    onChange={handleFormChange} 
                                    type="text" 
                                />
                            </FormControl>
                            <FormControl id="type">
                                <FormLabel htmlFor="type">Distance Type</FormLabel>
                                <Select onChange={handleFormChange}>
                                    { Object.keys(DistanceType).map( type => <option key={type} value={type}>{type}</option>)}
                                </Select>                            
                            </FormControl>
                            <Button 
                                disabled={!form.id}  
                                minW="33%" 
                                // isLoading={isSubmitting} 
                                loadingText="Searching..." 
                                onClick={handleFetchSummary} 
                                type="button" 
                                colorScheme="solid">
                                Search
                            </Button>
                        </VStack>
                    </FieldGroup>
                </Stack>
                <FieldGroup mt="8">
                    <HStack width="full">
                    <Button 
                        onClick={handleCreateSummary} 
                        type="submit" 
                        colorScheme="solid"
                        minW="40%"
                    >
                        Create
                    </Button>
                    <Button 
                        minW="40%"
                        onClick={handleDelete}
                        variant="outline"
                    >
                        Delete
                    </Button>
                    </HStack>
                </FieldGroup>
            </form>
        </Box>
    )
}