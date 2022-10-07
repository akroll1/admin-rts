import React, { useState, useEffect } from 'react'
import { Box, Button, ButtonGroup, FormControl, FormHelperText, FormLabel, Heading, HStack, Input, Select, Stack, StackDivider, Textarea, useToast, VStack } from '@chakra-ui/react'
import { FieldGroup } from '../../chakra'
import axios from 'axios'
import { ShowFormFightersTable, ShowFormShowsTable } from '../tables'
import Datepicker from 'react-datepicker'
import "react-datepicker/dist/react-datepicker.css"
import { NETWORK_ENUMS, FIGHT_STATUS_SELECT_CONSTANTS, createTimestamp } from '../../utils'
import parseISO from 'date-fns/parseISO'
// import { addDays } from 'date-fns/addDays'

export const ShowForm = ({ user, tokenConfig }) => {
    const toast = useToast();
    const [isSubmitting, setIsSubmitting] = useState(false);
    // showId is kept out of the form for put/post logic.
    const [showId, setShowId] = useState(null);
    const [form, setForm] = useState({
        fightIds: '', // cast to string[] on submit.
        location: '',
        network: '',
        promoter: '',
        showName: '',
        showStoryline: '',
        showTime: parseISO(new Date().toISOString()),
    })    

    const searchForShow = () => {
        if(showId){
            setIsSubmitting(true);
            const url = process.env.REACT_APP_API + `/shows/${showId}`;
            return axios.get(url, tokenConfig)
                .then( res => {
                    console.log('res: ', res)
                    let { showTime } = res.data;
                    const time = parseISO(new Date(showTime).toISOString());
                    setForm({ ...res.data, showTime: time })
                })
                .catch( err => console.log(err))
                .finally(() => setIsSubmitting(false));
        }
    };

    const handlePostShow = () => {
        setIsSubmitting(true);
        const url = process.env.REACT_APP_API + `/shows`;
        const { showTime, fightIds } = form;
        let postObj = Object.assign(form, {showTime: createTimestamp(showTime)}, {fightIds: [fightIds[0]]})
        // console.log('postObj: ', postObj);
        return axios.post(url, postObj, tokenConfig)
        .then(res => {
            if(res.status === 200){
                toast({ title: 'Show updated!',
                status: 'success',
                duration: 5000,
                isClosable: true,})   
            }
        })
        .catch(err => console.log(err))
        .finally(() => setIsSubmitting(false))
    }
    const handlePutShow = () => {
        setIsSubmitting(true);
        const url = process.env.REACT_APP_API + `/shows/${showId}`;
        const { guestScorerIds, location, showName, network, promoter, showStoryline, showStatus } = form;
        let { showTime } = form;

        const obj = {
            showId,
            guestScorerIds,
            location, 
            showName, 
            network,
            promoter, 
            showStoryline,
            showStatus,
            showTime
        };

        const putObj = Object.assign({}, obj, {showTime: createTimestamp(showTime)});
        console.log('putObj: ', putObj);

        return axios.put(url, putObj, tokenConfig)
            .then( res => console.log('res: ', res))
            .catch( err => console.log(err))
            .finally(() => setIsSubmitting(false));

    };
    const handleFormChange = (e, type) => {
        const { name, id, value } = e.currentTarget;
        if(name) return setForm({ ...form, fightIds: [value]});
        return setForm({...form, [id]: value});
    };

    const deleteShow = () => {
        setIsSubmitting(true);
        const url = process.env.REACT_APP_API + `/shows/${showId}`;

        return axios.delete(url, tokenConfig)
            .then( res => {
                console.log('res: ', res);
                if(res.status === 200){
                    /// do toast and clean show form.
                }
            })
            .catch( err => console.log(err))
            .finally(() => setIsSubmitting(false));

    }
    const { fightIds, location, network, promoter, showName, showStatus, showStoryline, showTime } = form;
    const fightId = fightIds[0];
    // console.log('form: ', form);

    return (
        <Box px={{base: '4', md: '10'}} py="16" maxWidth="3xl" mx="auto">
            <form id="show_form" onSubmit={(e) => {e.preventDefault()}}>
                <Stack spacing="4" divider={<StackDivider />}>
                    <Heading size="lg" as="h1" paddingBottom="4">
                        Show Form
                    </Heading>
                    <FieldGroup title="Search for a Show">
                        <VStack width="full" spacing="6">
                            <FormControl id="showId">
                                <FormLabel htmlFor="showId">Show ID</FormLabel>
                                <Input value={showId} onChange={ ({ currentTarget: {value} }) => setShowId(value.length == 36 ? value : '')} type="text" maxLength={36} />
                            </FormControl>
                            <HStack justifyContent="center" width="full">
                                <Button disabled={!showId}  minW="33%" isLoading={isSubmitting} loadingText="Searching..." onClick={searchForShow} type="button" colorScheme="blue">
                                    Search
                                </Button>
                            </HStack>
                        </VStack>
                    </FieldGroup>
                    <FieldGroup title="Show Information">
                        <VStack width="full" spacing="6">
                            <FormControl isRequired id="showName">
                                <FormLabel htmlFor="showName">Show Name</FormLabel>
                                <Input value={showName} onChange={handleFormChange}  type="text" maxLength={255} />
                            </FormControl>

                            <FormControl id="fightIds">
                                <FormLabel htmlFor="fightIds">Fight ID</FormLabel>
                                <Input name="fightId" value={fightId} onChange={handleFormChange} type="text" maxLength={200} />
                            </FormControl>
                            
                            <FormControl id="location">
                                <FormLabel htmlFor="location">Location</FormLabel>
                                <Input value={location} onChange={handleFormChange}  type="text" maxLength={255} />
                            </FormControl>
                            
                            <FormControl id="promoter">
                                <FormLabel htmlFor="promoter">Promoter</FormLabel>
                                <Input value={promoter} onChange={handleFormChange}  type="text" maxLength={255} />
                            </FormControl>

                            <FormControl id="network">
                                <FormLabel htmlFor="network">Network</FormLabel>
                                <Select placeholder={form.network || 'Network'} onChange={handleFormChange}>
                                    { NETWORK_ENUMS.map( ({value, label}) => <option key={value} value={value}>{label}</option>)}
                                </Select>                            
                            </FormControl>

                            { showId && 
                                <FormControl id="showStatus">
                                    <FormLabel htmlFor="showStatus">Show Status</FormLabel>
                                    <Select onChange={handleFormChange}>
                                        { FIGHT_STATUS_SELECT_CONSTANTS.map( ({value, label}) => <option placeholder='hey' key={value} value={value}>{label}</option>)}
                                    </Select>                            
                                </FormControl>
                            }
                
                            <FormControl>
                                <FormLabel htmlFor="date-picker">Date and Time</FormLabel>
                                <Datepicker 
                                    id="date-picker"
                                    showTimeSelect
                                    dateFormat="Pp"
                                    selected={showTime}
                                    style={{background: '#FFF', color: '#333 !important'}}
                                    onChange={showTime => setForm({...form, showTime})}
                                />
                            </FormControl>
                            <FormControl id="showStoryline">
                                <FormLabel htmlFor="showStoryline">Storyline</FormLabel>
                                    <Textarea value={showStoryline} onChange={handleFormChange} rows={5} />
                                <FormHelperText>
                                    Brief description of the fight significance. URLs are hyperlinked.
                                </FormHelperText>
                            </FormControl>
                        </VStack>
                    </FieldGroup>
                </Stack>
                <FieldGroup mt="8">
                    <ButtonGroup w="100%">
                        <Button 
                            minW="33%"
                            onClick={ showId ? handlePutShow : handlePostShow } 
                            type="button" 
                            colorScheme="blue"
                            isLoading={isSubmitting}
                            loadingText="Submitting..."
                            >
                            Submit
                        </Button>
                        <Button minW="33%" disabled={!showId} isLoading={isSubmitting} loadingText="Deleting" onClick={deleteShow} colorScheme="red" variant="outline">Delete</Button>
                    </ButtonGroup>
                </FieldGroup>
            </form>
            {/* <ShowFormFightersTable fights={fights} deleteFight={deleteFight} /> */}
        </Box>
    )
}