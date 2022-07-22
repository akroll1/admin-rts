import React, { useState, useEffect } from 'react'
import { Box, Button, Flex, FormControl, FormLabel, Heading, HStack, Input, InputGroup, InputRightElement, Stack, StackDivider, Text, Textarea, useColorModeValue, useToast, VStack } from '@chakra-ui/react'
import { FieldGroup } from '../../chakra'
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid'
import { CreatePanelFormTable } from '../tables';
import { DeleteIcon } from '@chakra-ui/icons';

export const CreatePanelForm = ({ user, tokenConfig }) => {
    const toast = useToast();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [allPanels, setAllPanels] = useState([]);
    const [selectedPanel, setSelectedPanel] = useState({});
    const [search, setSearch] = useState('');
    const [fightId, setFightId] = useState(null);
    const [newPanelist, setNewPanelist] = useState('');
    const [form, setForm] = useState({
        panelId: '',
        panelists: [],
        panelistPredictions: [],
    })
    useEffect(() => {
        const fetchAllPanels = async () => {
            const url = process.env.REACT_APP_PANELS;
            return axios.get(url, tokenConfig)
                .then( res => {
                    if(res.data.length > 0){
                        setAllPanels(res.data);
                        setForm(res.data[0]);
                    }
                }).catch( err => console.log(err));
        }
        fetchAllPanels();
    },[])
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
        const { id } = e.currentTarget;
        const [selected] = allPanels.filter( panel => panel.panelId === id);
        setForm(selected);
    }
    const handleDeleteFromPanel = e => {
        // Does not delete from DB, only locally.
        const { id } = e.currentTarget;
        console.log('id: ', id)
        const filtered = form.panelists.filter( panelist => panelist !== id);
        setForm({ ...form, panelists: filtered})
        setNewPanelist('');
        // handleSelectPanel();
    }
    return (
        <Box px={{base: '4', md: '4'}} py="4" maxWidth="3xl" mx="auto">
            <CreatePanelFormTable panelists={form.panelists} handleSelectPanel={handleSelectPanel} />
            <FieldGroup title="Search for Panel">
                <VStack width="full" spacing="6">
                    <FormControl isRequired id="search">
                        <FormLabel htmlFor="search">Panel/Fight ID</FormLabel>
                        <Input value={search} onChange={({currentTarget: {value}}) => setSearch(value.length === 36 ? value : '')} type="text" maxLength={36} />
                    </FormControl>
                    <HStack justifyContent="center" width="full">
                        <Button disabled={!search} minW="33%" isLoading={isSubmitting} loadingText="Searching..." onClick={fetchPanel} type="button" colorScheme="blue">
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
                            { form.panelists.length > 0 && form.panelists.map( panelist => {
                                return (
                                    <InputGroup w="100%">
                                        <Input readOnly value={panelist} key={panelist} />
                                        <InputRightElement _hover={{cursor: 'pointer'}} id={panelist} onClick={handleDeleteFromPanel} children={<DeleteIcon />} />
                                    </InputGroup>
                                )
                            })}
                        </VStack>
                    </FieldGroup>
                </Stack>
                <FieldGroup mt="8">
                    <HStack width="full">
                    <Button onClick={handleSubmitPanel} type="submit" colorScheme="blue">
                        Submit Panel
                    </Button>
                    <Button variant="outline">Cancel</Button>
                    </HStack>
                </FieldGroup>
            </form>
        </Box>
    )
}