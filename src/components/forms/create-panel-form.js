import React, { useState, useEffect } from 'react'
import { Box, Button, Flex, FormControl, FormLabel, Heading, HStack, Input, InputGroup, InputRightElement, Stack, StackDivider, Text, Textarea, useColorModeValue, useToast, VStack } from '@chakra-ui/react'
import { FieldGroup } from '../../chakra'
import axios from 'axios';
import { CreatePanelAllPanelsTable, PanelistsTable } from '../tables';
import { PanelistFormCheckbox } from './my-panels-form-els';
import { DeleteIcon } from '@chakra-ui/icons';


export const CreatePanelForm = ({ user, tokenConfig }) => {
    const toast = useToast();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [panelistIds, setPanelistIds] = useState([]);
    const [allPanels, setAllPanels] = useState([]);
    const [allPanelists, setAllPanelists] = useState([]);
    const [selectedPanel, setSelectedPanel] = useState(null);
    const [search, setSearch] = useState('');
    const [fightId, setFightId] = useState(null);
    const [newPanelist, setNewPanelist] = useState('');
    const [form, setForm] = useState({
        panelId: '',
        fightQuickTitle: ''
    })
    useEffect(() => {
        const fetchAllPanels = async () => {
            const url = process.env.REACT_APP_PANELS + `/all`;
            return axios.get(url, tokenConfig)
                .then( res => {
                    if(res.data.length > 0){
                        setAllPanels(res.data);
                    }
                }).catch( err => console.log(err));
        }
        const fetchAllPanelists = async () => {
            const url = process.env.REACT_APP_PANELISTS;
            return axios.get(url, tokenConfig)
                .then( res => {
                    setAllPanelists(res.data)
                    setForm(res.data[0])
                }).catch( err => console.log(err));
        }
        fetchAllPanels();
        fetchAllPanelists();
    },[])
    useEffect(() => {
        if(selectedPanel){
            const fetchPanelMembers = async => {
                const url = process.env.REACT_APP_PANELIST_PREDICTIONS
            }
            fetchPanelMembers()
        }
    },[selectedPanel])
    const fetchPanel = async () => {
        const url = process.env.REACT_APP_PANELS + `/${search}`;
        return axios.get(url, tokenConfig)
            .then( res => {
                if(res.data.panelId){
                    setForm(res.data)
                    setFightId(res.data.panelId)
                }}).catch( err => console.log(err));
    };

    const handleSubmitPanel = async () => {
        const url = process.env.REACT_APP_PANELS;
        const putObj = {
            panelId: form.fightId ? form.fightId : search,
            panelists: form.panelists.length > 0 ? form.panelists : null,
        };
        console.log('putObj: ', putObj)
        return axios.put(url, putObj, tokenConfig)
            .then(res => {
                if(res.status === 200){
                    return  toast({ 
                    title: 'Updated panel.',
                    status: 'success',
                    duration: 5000,
                    isClosable: true,})
                }}).catch(err => console.log(err))
    }

    const handleFormChange = e => {
        const { id, value } = e.currentTarget;
        setForm({ ...form, [id]: value});
    }

    const handleAddPanelist = () => {
        if(!newPanelist) return;
        setForm({ ...form, panelists: [...form.panelists, newPanelist] })
        setNewPanelist('');
    }
    const handleSelectPanel = e => {
        console.log('handleSelectPanel')
        const { id } = e.currentTarget;
        const [selected] = allPanels.filter( panel => panel.panelId === id);
        setForm(selected);
    }
    const handleDeleteFromPanel = e => {
        // Does not delete from DB, only locally.
        const { id } = e.currentTarget;
        console.log('id: ', id)
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
        const url = process.env.REACT_APP_PANELISTS;
        if(!form.panelId) return alert('Select a fight for panelId.')
        const postObj = {
            panelId: form.panelId,
            panelistIds
        };
        console.log('postObj: ', postObj)
        return axios.post(url, postObj, tokenConfig)
            .then( res => {
                console.log('res: ', res)
                if(res.status === 200){
                    return  toast({ 
                        title: 'Created panel.',
                        status: 'success',
                        duration: 5000,
                        isClosable: true,})
                }
            }).catch( err => console.log(err));
    }
    console.log('form: ', form)
    return (
        <>
            <Box px={{base: '4', md: '4'}} py="4" maxWidth="3xl" mx="auto">
                <CreatePanelAllPanelsTable 
                    panels={allPanels} 
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
                                onClick={fetchPanel} 
                                type="button" 
                                colorScheme="blue"
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
                                    <Input readOnly value={form.panelId} onChange={e => handleFormChange(e)} type="text" maxLength={100} />
                                </FormControl>
                                <FormControl id="newPanelist">
                                    <FormLabel>Add Panelist</FormLabel>
                                    <Input value={newPanelist} onChange={e => setNewPanelist(e.currentTarget.value)} type="text" maxLength={100} />
                                </FormControl>
                                <p>Do not add panelists on creation, will mess up the DB.</p>
                                <Button onClick={() => handleAddPanelist()} colorScheme="blue">
                                    Add Panelist
                                </Button>
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
                        <Button onClick={handleCreatePanel} type="submit" colorScheme="blue">
                            Submit Panel
                        </Button>
                        <Button variant="outline">Cancel</Button>
                        </HStack>
                    </FieldGroup>
                </form>
            </Box>
            <PanelistFormCheckbox 
                allPanelists={allPanelists} 
                panelistIds={panelistIds}
                setPanelistIds={setPanelistIds}
            />
            <PanelistsTable 
                panelists={allPanelists} 
                handleSelectedPanelist={handleSelectedPanelist} 
            />
        </>
    )
}