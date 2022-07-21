import React, { useState, useEffect } from 'react'
import { Box, Button, ButtonGroup, FormControl, FormLabel, HStack, Input, Stack, StackDivider, Text, Textarea, useColorModeValue, useToast, VStack } from '@chakra-ui/react'
import { FieldGroup } from '../../chakra'
import axios from 'axios';
import { PanelistsTable } from '../tables/panelists-table';

export const PanelistForm = ({ setModals, tokenConfig }) => {
    const [panelists, setPanelists] = useState([
        {
            panelistId: '1',
            firstName: 'A',
            lastName: 'K'
        }
    ]);
    const toast = useToast();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [searchByFight, setSearchByFight] = useState('');
    const [search, setSearch] = useState('');
    const [form, setForm] = useState({
        panelistId: '',
        bio: '',
        displayName: '',
        firstName: '',
        img: '',
        lastName: '',
        link: '',
        tagline: ''
    });

    const handleFormChange = e => {
        const { id, value } = e.currentTarget;
        return setForm({...form, [id]: value });
    }
    const searchForPanelist = () => {
        if(search){
            setIsSubmitting(true);
            const url = process.env.REACT_APP_PANELISTS + `/${search}`;
            return axios.get(url, tokenConfig)
                .then( res => setForm({ ...res.data }))
                .catch( err => console.log(err))
                .finally(() => setIsSubmitting(false));
        }
    };
    
    const searchForPanelistByFight = () => {

    };

    const putGuestJudge = () => {
        const url = process.env.REACT_APP_PANELISTS;
        return axios.put(url, form, tokenConfig)
            .then(res => {
                if(res.status === 200){
                    console.log('res: ', res)
                    if(res.data.includes('Token expired')) return setModals({ expiredTokenModal: true })

                    toast({ title: 'Updated panelists.',
                        status: 'success',
                        duration: 5000,
                        isClosable: true,})
                }})
            .catch(err => console.log(err))
    }

    const { bio, displayName, firstName, panelistId, lastName, img, links, tagline } = form;
    // LINKS is an array | null;
    return (
        <>
            <Box px={{base: '4', md: '10'}} py="16" maxWidth="3xl" mx="auto">
                <form id="panelist_form" onSubmit={(e) => {e.preventDefault()}}>
                    <Stack spacing="4" divider={<StackDivider />}>
                        <FieldGroup title="Search for a Panelist">
                            <VStack width="full" spacing="6">
                                <FormControl id="search">
                                    <FormLabel htmlFor="panelistId">Panelist ID</FormLabel>
                                    <Input value={search} onChange={ ({ currentTarget: {value} }) => setSearch(value.length == 36 ? value : '')} type="text" maxLength={36} />
                                </FormControl>
                                <HStack justifyContent="center" width="full">
                                    <Button disabled={!search}  minW="33%" isLoading={isSubmitting} loadingText="Searching..." onClick={searchForPanelist} type="button" colorScheme="blue">
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
                            <Button onClick={putGuestJudge} type="submit" colorScheme="blue">
                                Submit
                            </Button>
                            <Button variant="outline">Cancel</Button>
                        </ButtonGroup>
                    </FieldGroup>
                </form>
                <Stack mt="3rem" spacing="4" divider={<StackDivider />}>
                    <FieldGroup title="All Fight Panelists">
                        <VStack width="full" spacing="6">
                            <FormControl id="searchByFight">
                                <FormLabel htmlFor="panelistId">
                                    Fight ID
                                </FormLabel>
                                <Input 
                                    value={searchByFight} 
                                    onChange={ ({ currentTarget: {value} }) => setSearchByFight(value.length == 36 ? value : '')} 
                                    type="text" 
                                    maxLength={36} 
                                />
                            </FormControl>
                            <HStack justifyContent="center" width="full">
                                <Button 
                                    disabled={!searchByFight}  
                                    minW="33%" 
                                    isLoading={isSubmitting} 
                                    loadingText="Searching..." 
                                    onClick={searchForPanelistByFight} 
                                    type="button" 
                                    colorScheme="blue"
                                >
                                    Search
                                </Button>
                            </HStack>
                        </VStack>
                    </FieldGroup>
                </Stack>
            </Box>
            <PanelistsTable panelists={panelists} />
        </>

    )
}