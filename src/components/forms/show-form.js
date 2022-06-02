import React, { useState, useEffect } from 'react'
import { Avatar, Box, Button, Checkbox, Flex, FormControl, FormHelperText, FormLabel, Heading, HStack, Input, Select, Stack, StackDivider, Textarea, useToast, VStack } from '@chakra-ui/react'
import { AddIcon } from '@chakra-ui/icons'
import { FieldGroup } from '../../chakra'
import axios from 'axios'
import { v4 as uuidv4 } from 'uuid'
import { ShowFormFightersTable, ShowFormShowsTable } from '../tables'
import { FightersForm } from './fighters-form'
import Datepicker from 'react-datepicker'
import "react-datepicker/dist/react-datepicker.css"
import '../../stylesheets/datepicker.css'
import { roundLengthOptions, weightclasses } from '../../utils/utils'
import parseISO from 'date-fns/parseISO'
// import { addDays } from 'date-fns/addDays'
export const ShowForm = ({ user, accessTokenConfig }) => {
    const showsUrl = process.env.REACT_APP_SHOWS;
    const toast = useToast();
    const [guestScorer, setGuestScorer] = useState('');
    const [showForm, setShowForm] = useState({
        isFeaturedShow: false,
        guestScorerIds: [],
        location: '',
        network: '',
        promoter: '',
        showId: uuidv4(),
        showName: '',
        showStoryline: '',
        showTime: parseISO(new Date().toISOString()),
    })
    const [fightForm, setFightForm] = useState({
        fightId: '',
        fighterAId: '',
        fighterBId: '',
        weightclass: '',
        totalRounds: 0,
        fightOdds: '',
        fightStoryline: '',
        fighters: []
    })
    const [contactForm, setContactForm] = useState({
        firstName: '',
        lastName: '',
        phone: '',
        email: '',
        org: ''
    })
    const [fights, setFights] = useState([]);
    const [isMainEvent, setIsMainEvent] = useState(false);
    const [shows, setShows] = useState([]);
    
    useEffect(() => {
        const getAllShows = async () => {
            axios.get(showsUrl, accessTokenConfig)
                .then( res => setShows(res.data))
                .catch( err => console.log(err));
        }
        getAllShows();
    },[])
    const handleFormChange = (e,type) => {
        const { id, value } = e.currentTarget;
        if(type === 'Show') return setShowForm({...showForm, [id]: value})
        if(type === 'Fight') return setFightForm({...fightForm, [id]: value.trim()})
        if(type === 'Rounds') return setFightForm({...fightForm, [id]: parseInt(value)})
        if(type === 'Contact') return setContactForm({...contactForm, [id]: value.trim()})
        if(type === 'GuestScorer') return setGuestScorer(value)
        return setShowForm({...showForm, [id]: value.trim()})
    };
    const handleGetTheFighters = async () => {
        // left off here... fix this!
        const { fighterAId, fighterBId } = fightForm;
        const getFightersPromises = [fighterAId, fighterBId].map( async fighterId => {
            let url = process.env.REACT_APP_FIGHTERS + `/${fighterId}`;
            return axios(url, accessTokenConfig)
                .then(res => {
                    return res.data
                })
                .catch(err => console.log(err));
        });
        
        const getTheFighters = await Promise.all(getFightersPromises);
        const { fightOdds, fightStoryline, totalRounds, weightclass } = fightForm;
        const fightsObj = {
            fightId: uuidv4(),
            fighterAId,
            fighterBId,
            fighters: getTheFighters,
            fightOdds,
            fightStoryline,
            isMainEvent: isMainEvent,
            totalRounds,
            weightclass
        }
        const tempFights = fights.concat(fightsObj);
        setFights(tempFights);
        setIsMainEvent(false);
    }
    const handleCheckbox = () => {
        return setIsMainEvent(!isMainEvent);
    }
    const handleSubmitShow = () => {
        const { showTime } = showForm;
        console.log('fights: ',fights)
        const showObj = {
            ...showForm,
            isFeaturedShow: true,
            showTime: new Date(showTime).getTime(),
            fights: fights,
            contactInfo: {
                ...contactForm
            }
        }
        console.log('showObj: ',showObj)
        const url = showsUrl + `/${showForm.showId}`
        axios.put(url, showObj, accessTokenConfig)
            .then(res => {
                if(res.status === 200){
                    toast({ title: 'Show updated!',
                    status: 'success',
                    duration: 5000,
                    isClosable: true,})   
                }
            })
            .catch(err => console.log(err))
    }
    const deleteFight = e => {
        const { id } = e.currentTarget;
        const tempFights = fights;
        const index = parseInt(id);
        const d = [...tempFights.slice(0,index),...tempFights.slice(index+1)];
        setFights(d)
    }
    const handleAddGuestScorer = () => {
        console.log('guest: ',guestScorer);
        const { guestScorerIds } = showForm;
        const temp = guestScorerIds.concat(guestScorer)
        setShowForm({...showForm, guestScorerIds: temp});
        setGuestScorer('');
    };
    const { showTime, showStoryline } = showForm;
    const { fighterAId, fighterBId, fightStoryline } = fightForm;

    // useEffect(() => {
        // console.log('fighterAId: ',fighterAId);
        // console.log('fighterBId: ',fighterBId);
        // console.log('contactInfo: ',contactInfo);
        // console.log('fights: ',fights);
        console.log('showForm: ',showForm);
        console.log('guestScorer: ',guestScorer)
        // console.log('fightForm: ',fightForm);
        // console.log('contactForm: ',contactForm)
        // console.log('shows: ',shows)
        // console.log('showTime: ',showTime);

    // },[fights, fightForm, showTime])

    return (
        <Box px={{base: '4', md: '10'}} py="16" maxWidth="3xl" mx="auto">
            <form id="settings-form" onSubmit={(e) => {e.preventDefault()}}>
                <Stack spacing="4" divider={<StackDivider />}>
                    <Heading size="lg" as="h1" paddingBottom="4">
                        Show Form
                    </Heading>
                    <FieldGroup title="Show Information">
                        <VStack width="full" spacing="6">
                            <FormControl isRequired id="showName">
                                <FormLabel htmlFor="showName">Show Name</FormLabel>
                                <Input onChange={e => handleFormChange(e,'Show')}  type="text" maxLength={255} />
                            </FormControl>
                            
                            <FormControl id="location">
                                <FormLabel htmlFor="location">Location</FormLabel>
                                <Input onChange={e => handleFormChange(e,'Show')}  type="text" maxLength={255} />
                            </FormControl>
                            
                            <FormControl id="promoter">
                                <FormLabel htmlFor="promoter">Promoter</FormLabel>
                                <Input onChange={e => handleFormChange(e,'Show')}  type="text" maxLength={255} />
                            </FormControl>

                            <FormControl id="network">
                                <FormLabel htmlFor="network">Network</FormLabel>
                                <Input onChange={e => handleFormChange(e,'Show')}  type="text" maxLength={255} />
                            </FormControl>
                
                            <FormControl>
                                <FormLabel htmlFor="date-picker">Date and Time</FormLabel>
                                <Datepicker 
                                    id="date-picker"
                                    showTimeSelect
                                    dateFormat="Pp"
                                    selected={showTime}
                                    style={{color: '#333 !important'}}
                                    onChange={showTime => setShowForm({...showForm, showTime})}
                                />
                            </FormControl>
                            <FormControl id="showStoryline">
                                <FormLabel htmlFor="showStoryline">Storyline</FormLabel>
                                    <Textarea value={showStoryline} onChange={e => handleFormChange(e,'Show')} rows={5} />
                                <FormHelperText>
                                    Brief description of the fight significance. URLs are hyperlinked.
                                </FormHelperText>
                            </FormControl>
                        </VStack>
                    </FieldGroup>
                    <FieldGroup title="Find Fighters">
                        <VStack width="full" spacing="6">
                            <FormControl isRequired id="fighterAId">
                                <FormLabel htmlFor="fighterAId">Fighter A ID</FormLabel>
                                <Input value={fighterAId} onChange={e => handleFormChange(e,'Fight')} type="text" maxLength={50} />
                            </FormControl>
                            <FormControl isRequired id="fighterBId">
                                <FormLabel htmlFor="fighterBId">Fighter B ID</FormLabel>
                                <Input value={fighterBId} onChange={e => handleFormChange(e,'Fight')} type="text" maxLength={50} />
                            </FormControl>
                            <FormControl isRequired id="weightclass">
                                <FormLabel isRequired htmlFor="weightclass">Weight Class</FormLabel>
                                <Select placeholder="Weight Class" onChange={e => handleFormChange(e,'Fight')}>
                                    {weightclasses.map(weight => {
                                        const { value, label } = weight;
                                        return <option key={value} value={value}>{label}</option>})
                                    }
                                </Select>
                            </FormControl>
                            <FormControl isRequired id="totalRounds">
                                <FormLabel htmlFor="totalRounds">Total Rounds</FormLabel>
                                <Select placeholder="Rounds" onChange={e => handleFormChange(e,'Rounds')}>
                                    {roundLengthOptions.map(round => <option key={round} value={round}>{round}</option>)}
                                </Select>
                            </FormControl>
                            <FormControl id="fightOdds">
                                <FormLabel htmlFor="fightOdds">Odds/Moneyline</FormLabel>
                                <Input placeholder="For example: -600, Spence" onChange={e => handleFormChange(e,'Fight')}  type="text" maxLength={255} />
                            </FormControl>
                            <FormControl id="fightStoryline">
                                <FormLabel htmlFor="fightStoryline">Storyline</FormLabel>
                                    <Textarea value={fightStoryline} onChange={e => handleFormChange(e,'Fight')} rows={5} />
                                <FormHelperText>
                                    Brief description of the fight significance. URLs are hyperlinked.
                                </FormHelperText>
                            </FormControl>
                            <Stack width="full" spacing="4">
                                <Checkbox isChecked={isMainEvent} id="isMainEvent" onChange={() => handleCheckbox()}>Main Event</Checkbox>
                            </Stack>
                            <FieldGroup mt="8">
                                <HStack width="full">
                                <Button onClick={() => handleGetTheFighters()} type="button" colorScheme="blue">
                                    Find Fighters
                                </Button>
                                </HStack>
                            </FieldGroup>
                        </VStack>
                    </FieldGroup>
                    <FieldGroup title="Guest Scorers">
                        <VStack width="full" spacing="6">
                            <FormControl id="guestScorers">
                                <FormLabel htmlFor="guestScorers">Guest Scorer ID's</FormLabel>
                                <Input value={guestScorer} placeholder="guestScorerId:groupScorecardId" onChange={e => handleFormChange(e,'GuestScorer')}></Input>
                            </FormControl>
                            <FieldGroup mt="8">
                                <HStack width="full">
                                <Button onClick={() => handleAddGuestScorer()} type="button" colorScheme="blue">
                                    Add Guest Scorer
                                </Button>
                                </HStack>
                            </FieldGroup>
                        </VStack>
                    </FieldGroup>
                    <FieldGroup title="Contact Info">
                        <VStack width="full" spacing="6">
                            <FormControl id="firstName">
                                <FormLabel htmlFor="firstName">First Name</FormLabel>
                                <Input onChange={e => handleFormChange(e,'ContactInfo')}  type="text" maxLength={255} />
                            </FormControl>
                            <FormControl id="lastName">
                                <FormLabel htmlFor="lastName">Last Name</FormLabel>
                                <Input onChange={e => handleFormChange(e,'ContactInfo')}  type="text" maxLength={255} />
                            </FormControl>
                            <FormControl id="phone">
                                <FormLabel htmlFor="phone">Phone</FormLabel>
                                <Input onChange={e => handleFormChange(e,'ContactInfo')}  type="text" maxLength={255} />
                            </FormControl>
                            <FormControl id="email">
                                <FormLabel htmlFor="email">Email</FormLabel>
                                <Input onChange={e => handleFormChange(e,'ContactInfo')}  type="email" maxLength={255} />
                            </FormControl>
                            <FormControl id="org">
                                <FormLabel htmlFor="org">Organization</FormLabel>
                                <Input onChange={e => handleFormChange(e,'ContactInfo')}  type="text" maxLength={255} />
                            </FormControl>
                        </VStack>
                    </FieldGroup>
                </Stack>
                <FieldGroup mt="8">
                    <HStack width="full">
                    <Button onClick={() => handleSubmitShow()} type="button" colorScheme="blue">
                        Submit Show
                    </Button>
                    <Button variant="outline">Cancel</Button>
                    </HStack>
                </FieldGroup>
            </form>
            <ShowFormFightersTable fights={fights} deleteFight={deleteFight} />
        </Box>
    )
}