import { useState, useEffect } from 'react'
import { Box, Button, Flex, FormControl, FormLabel, Heading, HStack, Input, InputGroup, InputRightElement, Stack, StackDivider, Text, Textarea, useColorModeValue, useToast, VStack } from '@chakra-ui/react'
import { FieldGroup } from '../../chakra'
import { CreatePanelAllPanelsTable, PanelistsTable } from '../tables';
import { PanelistFormCheckbox } from './my-panels-form-els';
import { DeleteIcon } from '@chakra-ui/icons';
import { useScorecardStore } from '../../stores';


export const CreatePanelForm = () => {
    
    const {
        createPanel,
        fetchPanelSummaries,
        panelSummaries,
    } = useScorecardStore();

    const toast = useToast();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [summaries, setSummaries] = useState([]);
    const [selectedSummary, setSelectedSummary] = useState(null);
    const [search, setSearch] = useState('');
    const [newPanelist, setNewPanelist] = useState('');
    const [form, setForm] = useState({
        panelId: '',
        fightQuickTitle: ''
    })
    useEffect(() => {
        fetchPanelSummaries()
    },[])

    useEffect(() => {
        if(panelSummaries.length > 0){
            setSummaries(panelSummaries)
            setSelectedSummary(panelSummaries[0])
        }
    },[panelSummaries])

    const handleFormChange = e => {
        const { id, value } = e.currentTarget;
        console.log('id: ', id)
        console.log('value: ', value)
        setForm({ ...form, [id]: value});
    }

    const handleAddPanelist = () => {
        if(!newPanelist) return;
        setForm({ ...form, panelists: [...form.panelists, newPanelist] })
        setNewPanelist('');
    }
    const handleSelectPanel = e => {
        const { id } = e.currentTarget;
        const [selected] = summaries.filter( panel => panel.panelId === id);
        setSelectedSummary(selected)
        setForm(selected);
    }
    const handleDeleteFromPanel = e => {
        // Does not delete from DB, only locally.
        const { id } = e.currentTarget;
        const filtered = form.panelists.filter( panelist => panelist !== id);
        setForm({ ...form, panels: filtered})
        setNewPanelist('');
        // handleSelectPanel();
    }
    const handleSelectedPanelist = e => {
        const { id } = e.currentTarget;
        console.log('id: ', id)
    }
    const handleCreatePanel = () => {
        createPanel(form.panelId)
    }
    console.log('form: ', form)
    console.log('selectedSummary: ', selectedSummary)
    console.log('summaries: ', summaries)
    return (
        <>
            <Box px={{base: '4', md: '4'}} py="4" maxWidth="3xl" mx="auto">
                <CreatePanelAllPanelsTable 
                    summaries={summaries} 
                    handleSelectPanel={handleSelectPanel} 
                />
                <FieldGroup title="Search for Panel">
                    <VStack width="full" spacing="6">
                        <FormControl isRequired id="search">
                            <FormLabel htmlFor="search">Panel/Fight ID</FormLabel>
                            <Input 
                                value={search} 
                                type="text" maxLength={36} 
                                onChange={({currentTarget: {value}}) => setSearch(value.length === 36 ? value : '')} 
                            />
                        </FormControl>
                        <HStack justifyContent="center" width="full">
                            <Button 
                                disabled={!search} 
                                minW="33%" 
                                isLoading={isSubmitting} 
                                loadingText="Searching..." 
                                // onClick={searchForPanel} 
                                type="button" 
                                colorScheme="solid"
                            >
                                Search
                            </Button>
                        </HStack>
                    </VStack>
                </FieldGroup>
                
                <form id="create_panel_form" onSubmit={(e) => {e.preventDefault()}}>
                    <Stack spacing="4" divider={<StackDivider />}>
                        <FieldGroup title="Panel Data">
                            <VStack width="full" spacing="6">
                                <FormControl id="panelId">
                                    <FormLabel>Panel/Fight ID</FormLabel>
                                    <Input value={form.panelId} onChange={handleFormChange} type="text" maxLength={100} />
                                </FormControl>
                                <FormControl id="fightQuickTitle">
                                    <FormLabel>Fight Quick Title</FormLabel>
                                    <Input value={form.fightQuickTitle} onChange={handleFormChange} type="text" maxLength={100} />
                                </FormControl>
                                {/* <p>Do not add panelists on creation, will mess up the DB.</p>
                                <Button onClick={() => handleAddPanelist()} colorScheme="blue">
                                    Add Panelist
                                </Button> */}
                                {/* { form.panels.length > 0 && form.panels.map( panel => {
                                    return (
                                        <InputGroup w="100%">
                                            <Input readOnly value={panel} key={panel} />
                                            <InputRightElement _hover={{cursor: 'pointer'}} id={panel} onClick={handleDeleteFromPanel} children={<DeleteIcon />} />
                                        </InputGroup>
                                    )
                                })} */}
                            </VStack>
                        </FieldGroup>
                    </Stack>
                    <FieldGroup mt="8">
                        <HStack width="full">
                        <Button 
                            isDisabled={!form.panelId}
                            onClick={handleCreatePanel} 
                            type="submit" 
                            colorScheme="solid"
                        >
                            Submit Panel
                        </Button>
                        <Button variant="outline">Cancel</Button>
                        </HStack>
                    </FieldGroup>
                </form>
            </Box>
            {/* <PanelistFormCheckbox 
                allPanelists={allPanelists} 
                panelistIds={panelistIds}
                setPanelistIds={setPanelistIds}
            />
            <PanelistsTable 
                panelists={allPanelists} 
                handleSelectedPanelist={handleSelectedPanelist} 
            /> */}
        </>
    )
}