import { 
    useState, 
    useEffect 
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
    VStack, 
    Flex, 
} from '@chakra-ui/react'
import { FieldGroup } from '../../../chakra'
import { FighterType, useGlobalStore } from '../../../stores'

export const FighterForm = () => {
    const { 
        deleteFighter,
        fetchFighterById,
        selectedFighter,
        isSubmitting,
        updateFighter,
    } = useGlobalStore()

    const [form, setForm] = useState({
        id: '',
        type: FighterType.BOXER,
        firstName: '',
        lastName: '',
        ringname: '',
        wins: 0,
        losses: 0,
        draws: 0,
        kos: 0,
        dq: 0,
        socials: null,
        home: null,
        profileImg: null
    });

    useEffect(() => {
        if(selectedFighter?.id){
            setForm(selectedFighter)
        }
    },[selectedFighter])

    const searchForFighter = e => {
        fetchFighterById(form.id)
    }

    const handleFormChange = e => {
        const { id, value } = e.currentTarget;
        setForm({ ...form, [id]: value });
    }

    const handleUpdateFighter = () => {
        Object.assign(form, {
            wins: parseInt(form.wins),
            losses: parseInt(form.losses),
            draws: parseInt(form.draws),
            dq: parseInt(form.dq),
            kos: parseInt(form.kos),
        })
        updateFighter(form)
    }
    

    const handleDeleteFighter = e => {
        deleteFighter(form.id)
    }

    console.log('form: ', form)
    return (
        <Box px={{base: '4', md: '10'}} py="16" maxWidth="3xl" mx="auto" height="auto">
            <FieldGroup title="Search for a Fight">
                <VStack width="full" spacing="6">
                    <FormControl id="id">
                        <FormLabel htmlFor="id">Fighter ID</FormLabel>
                        <Input value={form.id} onChange={handleFormChange} type="text" maxLength={36} />
                    </FormControl>
                    <HStack justifyContent="center" width="full">
                        <Button 
                            disabled={!form.id} 
                            minW="33%" 
                            isLoading={isSubmitting} 
                            loadingText="Searching..." 
                            onClick={searchForFighter} 
                            type="button" 
                            colorScheme="solid"
                        >
                            Search
                        </Button>
                    </HStack>
                </VStack>
            </FieldGroup>

            <form id="fighters_form" onSubmit={e => {e.preventDefault()}}>
                <Stack spacing="4" divider={<StackDivider />}>
                    <Heading size="lg" as="h1" paddingBottom="4">
                        Fighter Form
                    </Heading>
                    <FieldGroup title="Create A Fighter">
                        <VStack width="full" spacing="6">
                            <FormControl id="type">
                                <FormLabel htmlFor="type">Fighter Type</FormLabel>
                                <Select onChange={handleFormChange}>
                                    { Object.keys(FighterType).map( type => <option key={type} value={type}>{type}</option>)}
                                </Select>                            
                            </FormControl>
                            <FormControl id="firstName">
                                <FormLabel>First Name</FormLabel>
                                <Input value={form.firstName?.toLowerCase()} required onChange={handleFormChange} type="text" maxLength={255} />
                            </FormControl>
                            
                            <FormControl id="lastName">
                                <FormLabel>Last Name</FormLabel>
                                <Input value={form.lastName?.toLowerCase()} required onChange={handleFormChange} type="text" maxLength={255} />
                            </FormControl>
                            
                            <FormControl id="ringname">
                                <FormLabel>Ring Name</FormLabel>
                                <Input value={form.ringname?.toLowerCase()} required onChange={handleFormChange} type="text" maxLength={255} />
                            </FormControl>
                            
                            <FormControl id="home">
                                <FormLabel>Home</FormLabel>
                                <Input value={form.home} onChange={handleFormChange} type="text" maxLength={255} />
                            </FormControl>

                            <FormControl id="profileImg">
                                <FormLabel>Profile Image</FormLabel>
                                <Input value={form.profileImg} onChange={handleFormChange} type="text" maxLength={255} />
                            </FormControl>
            
                            <FormControl id="socials">
                                <FormLabel>Socials</FormLabel>
                                <Input value={form.socials} onChange={handleFormChange} type="text" maxLength={255} />
                            </FormControl>
                        </VStack>
                    </FieldGroup>
                    <FieldGroup title="Record">
                        <HStack width="full" spacing="6">
                            <Flex flexDirection="row" flexWrap="wrap">
                                <FormControl m="3" style={{width: '25%'}} id="wins">
                                    <FormLabel>Wins</FormLabel>
                                    <Input value={form.wins} required onChange={handleFormChange} type="number" maxLength={3} />
                                </FormControl>
                                <FormControl m="3" style={{width: '25%'}} id="losses">
                                    <FormLabel>Losses</FormLabel>
                                    <Input value={form.losses} required onChange={handleFormChange} type="number" maxLength={3} />
                                </FormControl>
                                <FormControl m="3" style={{width: '25%'}} id="draws">
                                    <FormLabel>Draws</FormLabel>
                                    <Input value={form.draws} required onChange={handleFormChange} type="number" maxLength={3} />
                                </FormControl>
                                <FormControl m="3" style={{width: '25%'}} id="kos">
                                    <FormLabel>KO's</FormLabel>
                                    <Input value={form.kos} required onChange={handleFormChange} type="number" maxLength={3} />
                                </FormControl>
                                <FormControl m="3" style={{width: '25%'}} id="dq">
                                    <FormLabel>DQ's</FormLabel>
                                    <Input value={form.dq} required onChange={handleFormChange} type="number" maxLength={3} />
                                </FormControl>
                            </Flex>
                        </HStack>
                    </FieldGroup>
                </Stack>
                <FieldGroup mt="8">
                    <HStack width="full">
                    <Button 
                        onClick={handleUpdateFighter} 
                        // isLoading={isSubmitting} 
                        loadingText="Submitting..." 
                        type="submit" 
                        colorScheme="solid"
                        minW="33%"
                    >
                        {form.id ? `Update Fighter` : `Create Fighter`}
                    </Button>
                    <Button 
                        minW="33%"
                        variant="outline"
                        onClick={handleDeleteFighter}
                    >
                        Delete
                    </Button>
                    </HStack>
                </FieldGroup>
            </form>
        </Box>
    )
}