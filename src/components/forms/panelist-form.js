import { useState, useEffect } from 'react'
import { 
    Box, 
    Button, 
    ButtonGroup, 
    FormControl, 
    FormLabel, 
    HStack, 
    Input, 
    Stack, 
    StackDivider, 
    Textarea, 
    VStack 
} from '@chakra-ui/react'
import { FieldGroup } from '../../chakra'
import { PanelistsTable } from '../tables';
import { useGlobalStore } from '../../stores';

export const PanelistForm = () => {
    const {
        createPanelist,
        deletePanelist,
        fetchAllPanelists,
        fetchPanelist,
        panelist,
        panelists,
        updatePanelist,
    } = useGlobalStore()

    const [panelistId, setPanelistId] = useState(null)
    const [allPanelists, setAllPanelists] = useState([]);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [form, setForm] = useState({
        bio: '',
        displayName: '',
        firstName: '',
        img: '',
        lastName: '',
        link: '',
        tagline: ''
    });

    useEffect(() => {
        fetchAllPanelists()
    },[])

    useEffect(() => {
        if(panelists.length > 0){
            setAllPanelists(panelists)
        }
    },[panelists])

    useEffect(() => {
        if(panelist.panelistId){
            setForm(panelist)
        }
    },[panelist])

    const handleFormChange = e => {
        const { id, value } = e.currentTarget;
        return setForm({...form, [id]: value });
    }
    
    const handleFetchPanelist = e => {
        fetchPanelist(panelistId)
    }

    const handleUpdatePanelist = e => {
        updatePanelist(form)
    }

    const handleCreatePanelist = e => {
        console.log('CREATE form: ', form)
        // createPanelist(createObj)
    }

    const handleDeletePanelist = e => {
        deletePanelist(panelistId)
    }

    const handleSelectedPanelist = e => {
        const { id } = e.currentTarget;
        const [panelist] = allPanelists.filter( panelist => panelist.panelistId === id);
        setForm(panelist);  
        setPanelistId(panelist.panelistId)  
    }
    const { bio, displayName, firstName, img, lastName, links, tagline } = form;

    return (
        <>
            <Box px={{base: '4', md: '10'}} py="16" maxWidth="3xl" mx="auto">
                <form id="panelist_form" onSubmit={(e) => {e.preventDefault()}}>
                    <Stack spacing="4" divider={<StackDivider />}>
                        <FieldGroup title="Search for a Panelist">
                            <VStack width="full" spacing="6">
                                <FormControl id="panelistId">
                                    <FormLabel htmlFor="panelistId">Panelist ID</FormLabel>
                                    <Input value={panelistId} onChange={ ({ currentTarget: {value} }) => setPanelistId(value.length == 36 ? value : '')} type="text" maxLength={36} />
                                </FormControl>
                                <HStack justifyContent="center" width="full">
                                    <Button 
                                        disabled={!panelistId}  
                                        minW="33%" 
                                        isLoading={isSubmitting} 
                                        loadingText="Searching..." 
                                        onClick={handleFetchPanelist} 
                                        type="button" 
                                        colorScheme="solid"
                                    >
                                        Search
                                    </Button>
                                </HStack>
                            </VStack>
                        </FieldGroup>
                        <FieldGroup title="Panelist Info">
                            <VStack width="full" spacing="6">
                                <FormControl isRequired id="firstName">
                                    <FormLabel htmlFor="firstName">First Name</FormLabel>
                                    <Input required value={firstName} onChange={e => handleFormChange(e)} type="text" maxLength={100} />
                                </FormControl>
                                <FormControl isRequired id="lastName">
                                    <FormLabel htmlFor="lastName">Last Name</FormLabel>
                                    <Input required value={lastName} onChange={e => handleFormChange(e)} type="text" maxLength={100} />
                                </FormControl>
                                <FormControl id="displayName">
                                    <FormLabel htmlFor="displayName">Display Name</FormLabel>
                                    <Input required value={displayName} onChange={e => handleFormChange(e)} type="text" maxLength={100} />
                                </FormControl>
                                <FormControl id="img">
                                    <FormLabel htmlFor="img">Image Url</FormLabel>
                                    <Input value={img} onChange={e => handleFormChange(e)} type="text" maxLength={100} />
                                </FormControl>
                                <FormControl id="links">
                                    <FormLabel htmlFor="links">Link Url</FormLabel>
                                    <Input value={links} onChange={e => handleFormChange(e)} type="text" maxLength={100} />
                                </FormControl>
                                
                                <FormControl id="tagline">
                                    <FormLabel>Tagline</FormLabel>
                                    <Input value={tagline} onChange={e => handleFormChange(e)} type="text" maxLength={255} />
                                </FormControl>
                                <FormControl id="bio">
                                    <FormLabel>Bio</FormLabel>
                                    <Textarea
                                        required
                                        placeholder="Biography..."
                                        value={bio}
                                        onChange={e => handleFormChange(e)}
                                        type="text"
                                        size='md'
                                        rows="6"
                                    />
                                </FormControl>
                            </VStack>
                        </FieldGroup>
                    </Stack>
                    <FieldGroup mt="8">
                        <ButtonGroup width="full">
                            <Button 
                                onClick={panelistId ? handleUpdatePanelist : handleCreatePanelist} 
                                type="submit" 
                                colorScheme="solid"
                            >
                                {panelistId ? `Update Panelist` : `Create Panelist`}
                            </Button>
                            <Button 
                                onClick={handleDeletePanelist}
                                variant="outline"
                            >
                                Delete
                            </Button>
                        </ButtonGroup>
                    </FieldGroup>
                </form>
            </Box>
            <PanelistsTable 
                panelists={allPanelists} 
                handleSelectedPanelist={handleSelectedPanelist} 
            />
        </>

    )
}