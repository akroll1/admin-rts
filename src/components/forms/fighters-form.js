import { useState, useEffect } from 'react'
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
    VStack, 
    Flex, 
    useToast 
} from '@chakra-ui/react'
import { FieldGroup } from '../../chakra'
import { useScorecardStore } from '../../stores'

export const FightersForm = () => {
    const { 
        createFighter,
        deleteFighter,
        fetchFighter,
        fighter,
        updateFighter,
    } = useScorecardStore()

    const toast = useToast();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSubmittingSearch, setIsSubmittingSearch] = useState(false);
    const [searchFighterId, setSearchFighterId] = useState('');
    const [form, setForm] = useState({
        fighterId: '',
        firstName: '',
        lastName: '',
        ringname: '',
        wins: 0,
        losses: 0,
        draws: 0,
        kos: 0,
        dq: 0,
        socials: null,
        home: null
    });

    useEffect(() => {
        setForm(fighter)
    },[fighter])

    const handleFormChange = e => {
        const { id, name, value } = e.currentTarget;
        if(name === 'stats'){
            setForm({ ...form, [id]: parseInt(value) });
            return;
        }
        setForm({ ...form, [id]: value });
    }

    const handleUpdateFighter = () => {
        Object.assign(form, {
            fighterId: searchFighterId
        })
        updateFighter(form)
    }
    
    const handleCreateFighter = () => {
        createFighter(form)
    }    
    
    const searchForFighter = e => {
        fetchFighter(searchFighterId)
    }

    const handleDeleteFighter = e => {
        deleteFighter(searchFighterId)
    }

    const { 
        firstName, 
        lastName, 
        ringname, 
        wins, 
        losses, 
        draws, 
        kos, 
        dq, 
        socials, 
        home 
    } = form;

    return (
        <Box px={{base: '4', md: '10'}} py="16" maxWidth="3xl" mx="auto" height="auto">
            <FieldGroup title="Search for a Fight">
                <VStack width="full" spacing="6">
                    <FormControl id="searchFighterId">
                        <FormLabel htmlFor="searchFighterId">Fighter ID</FormLabel>
                        <Input value={searchFighterId} onChange={({currentTarget: {value}}) => setSearchFighterId(value.length === 36 ? value : '')} type="text" maxLength={36} />
                    </FormControl>
                    <HStack justifyContent="center" width="full">
                        <Button 
                            disabled={!searchFighterId} 
                            minW="33%" 
                            isLoading={isSubmittingSearch} 
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
                            <FormControl id="firstName">
                                <FormLabel>First Name</FormLabel>
                                <Input value={firstName?.toLowerCase()} required onChange={e => handleFormChange(e)} type="text" maxLength={255} />
                            </FormControl>
                            
                            <FormControl id="lastName">
                                <FormLabel>Last Name</FormLabel>
                                <Input value={lastName?.toLowerCase()} required onChange={e => handleFormChange(e)} type="text" maxLength={255} />
                            </FormControl>
                            
                            <FormControl id="ringname">
                                <FormLabel>Ring Name</FormLabel>
                                <Input value={ringname?.toLowerCase()} required onChange={e => handleFormChange(e)} type="text" maxLength={255} />
                            </FormControl>
                            
                            <FormControl id="home">
                                <FormLabel>Home</FormLabel>
                                <Input value={home} onChange={handleFormChange} type="text" maxLength={255} />
                            </FormControl>
            
                            <FormControl id="socials">
                                <FormLabel>Socials</FormLabel>
                                <Input value={socials} onChange={handleFormChange} type="text" maxLength={255} />
                            </FormControl>
                        </VStack>
                    </FieldGroup>
                    <FieldGroup title="Record">
                        <HStack width="full" spacing="6">
                            <Flex flexDirection="row" flexWrap="wrap">
                                <FormControl m="3" style={{width: '25%'}} id="wins">
                                    <FormLabel>Wins</FormLabel>
                                    <Input name="stats" value={wins} required onChange={handleFormChange} type="number" maxLength={3} />
                                </FormControl>
                                <FormControl m="3" style={{width: '25%'}} id="losses">
                                    <FormLabel>Losses</FormLabel>
                                    <Input name="stats" value={losses} required onChange={handleFormChange} type="number" maxLength={3} />
                                </FormControl>
                                <FormControl m="3" style={{width: '25%'}} id="draws">
                                    <FormLabel>Draws</FormLabel>
                                    <Input name="stats" value={draws} required onChange={handleFormChange} type="number" maxLength={3} />
                                </FormControl>
                                <FormControl m="3" style={{width: '25%'}} id="kos">
                                    <FormLabel>KO's</FormLabel>
                                    <Input name="stats" value={kos} required onChange={handleFormChange} type="number" maxLength={3} />
                                </FormControl>
                                <FormControl m="3" style={{width: '25%'}} id="dq">
                                    <FormLabel>DQ's</FormLabel>
                                    <Input name="stats" value={dq} required onChange={handleFormChange} type="number" maxLength={3} />
                                </FormControl>
                            </Flex>
                        </HStack>
                    </FieldGroup>
                </Stack>
                <FieldGroup mt="8">
                    <HStack width="full">
                    <Button 
                        onClick={searchFighterId ? handleUpdateFighter : handleCreateFighter} 
                        isLoading={isSubmitting} 
                        loadingText="Submitting..." 
                        type="submit" 
                        colorScheme="solid"
                        minW="33%"
                    >
                        {searchFighterId ? `Update Fighter` : `Create Fighter`}
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