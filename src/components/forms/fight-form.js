import React, { useState, useEffect } from 'react'
import { Box, Button, Checkbox, FormControl, FormHelperText, FormLabel, Heading, HStack, Input, Select, Stack, StackDivider, Textarea, useToast, VStack } from '@chakra-ui/react'
import { FieldGroup } from '../../chakra'
import axios from 'axios'
import { fightStatusEnums, roundLengthOptions,  weightclasses } from '../../utils'

export const FightForm = ({ user, accessTokenConfig }) => {
    const toast = useToast();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [fights, setFights] = useState([]);
    const [form, setForm] = useState({
        fightId: '',
        showId: '',
        fighterIds: [],
        weightclass: '',
        rounds: 0,
        fightState: 'PENDING',
        isMainEvent: false,
        isTitleFight: false,
        odds: null,
        fightStoryline: '',
        fighterAId: '',
        fighterBId: ''
    });
    // interface FightCreateDTO {
    //     fightId: string;
    //     showId?: string | null;
    //     fighterIds: string[];
    //     weightclass: WeightClass;
    //     rounds: number;
    //     isMainEvent: boolean;
    //     isTitleFight: boolean;
    //     odds?: string | null;
    //     fightStoryline?: string | null;
    // }
    const handleFormChange = e => {
        const { name, id, value, checked } = e.currentTarget;
        if(name === 'checkbox'){
            return setForm({ ...form, [id]: checked });
        }
        setForm({ ...form, [id]: value });
    };
    const handleGetTheFighters = async () => {
        // left off here... fix this!
        const { fighterAId, fighterBId } = form;
        const getFightersPromises = [fighterAId, fighterBId].map( async fighterId => {
            let url = process.env.REACT_APP_FIGHTERS + `/${fighterId}`;
            return axios(url, accessTokenConfig)
                .then(res => {
                    return res.data
                })
                .catch(err => console.log(err));
        });
        
        const getTheFighters = await Promise.all(getFightersPromises);
        const { fightOdds, fightStoryline, totalRounds, weightclass } = form;
        const fightsObj = {
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
    }
    const { showId, fightId, fighterIds, fighterAId, fighterBId, weightclass, rounds, isMainEvent, isTitleFight, odds, fightStoryline } = form;
    

    const handlePutFight = () => {
        /*  fightId ? putFight : createFight  */

        // const fightObj = {
        //     showId,
        //     fighters: [fighterAId, fighterBId],
        //     weightclass,
        //     rounds: parseInt(rounds),
        //     isMainEvent,
        //     isTitleFight,
        //     odds,
        //     fightStoryline
        // } 
        const fightObj = {
            fighterIds: ['fighterAId', 'fighterBId'],
            weightclass: 'weightclass',
            rounds: parseInt('100'),
            isMainEvent: true,
            isTitleFight: true,
            odds: 'odds',
            fightStoryline: 'fightStoryline'
        } 
        console.log('fightObj: ', fightObj);

        const url = process.env.REACT_APP_FIGHT
        return axios.post(url, fightObj, accessTokenConfig)
            .then( res => console.log('res: ', res)).catch( err => console.log(err));

    };
    
    
    const searchForFight = () => {
        setIsSubmitting(true);
        const url = process.env.REACT_APP_FIGHT + `/${form.fightId}`
        return axios.get(url, accessTokenConfig)
            .then( ({ data }) => setForm({ ...form, ...data, fighterAId: fighterIds[0], fighterBId: fighterIds[1] }))
            .catch( err => console.log(err))
            .finally(() => setIsSubmitting(false));
    };
    
    console.log('form: ', form);
    return (
        <Box px={{base: '4', md: '10'}} py="16" maxWidth="3xl" mx="auto">
             <FieldGroup title="Search for a Fight">
                <VStack width="full" spacing="6">
                    <FormControl isRequired id="fightId">
                        <FormLabel htmlFor="fightId">Fight ID</FormLabel>
                        <Input value={fightId} onChange={handleFormChange} type="text" maxLength={50} />
                    </FormControl>
                    <HStack justifyContent="center" width="full">
                        <Button isLoading={isSubmitting} loadingText="Searching..." onClick={() => searchForFight()} type="button" colorScheme="blue">
                            Search
                        </Button>
                    </HStack>
                </VStack>
            </FieldGroup>
            <form id="settings-form" onSubmit={(e) => {e.preventDefault()}}>
                <Stack spacing="4" divider={<StackDivider />}>
                    <Heading size="lg" as="h1" paddingBottom="4">
                        Fight Form
                    </Heading>
                    <FieldGroup title="Fight Info">
                        <VStack width="full" spacing="6">
                            <FormControl isRequired id="fighterAId">
                                <FormLabel htmlFor="fighterAId">Fighter A ID</FormLabel>
                                <Input value={fighterAId} onChange={e => handleFormChange(e,'FIGHT')} type="text" maxLength={50} />
                            </FormControl>
                            <FormControl isRequired id="fighterBId">
                                <FormLabel htmlFor="fighterBId">Fighter B ID</FormLabel>
                                <Input value={fighterBId} onChange={e => handleFormChange(e,'FIGHT')} type="text" maxLength={50} />
                            </FormControl>
                            <FormControl isRequired id="weightclass">
                                <FormLabel isRequired htmlFor="weightclass">Weight Class</FormLabel>
                                <Select placeholder="Weight Class" onChange={e => handleFormChange(e,'FIGHT')}>
                                    {weightclasses.map( ({value, label}) => <option key={value} value={value}>{label}</option>)}
                                </Select>
                            </FormControl>
                            <FormControl isRequired id="fightStatus">
                                <FormLabel isRequired htmlFor="fightStatus">Fight Status</FormLabel>
                                <Select placeholder="Fight Status" onChange={e => handleFormChange(e,'FIGHT')}>
                                    {fightStatusEnums.map( ({value, label}) => <option key={value} value={value}>{label}</option>)}
                                </Select>
                            </FormControl>
                            <FormControl isRequired id="rounds">
                                <FormLabel htmlFor="rounds">Total Rounds</FormLabel>
                                <Select placeholder="Rounds" onChange={e => handleFormChange(e,'ROUNDS')}>
                                    {roundLengthOptions.map(round => <option key={round} value={round}>{round}</option>)}
                                </Select>
                            </FormControl>
                            <FormControl id="fightOdds">
                                <FormLabel htmlFor="fightOdds">Odds/Moneyline</FormLabel>
                                <Input value={odds} placeholder="For example: -600, Spence" onChange={e => handleFormChange(e,'FIGHT')}  type="text" maxLength={255} />
                            </FormControl>
                            <FormControl id="fightStoryline">
                                <FormLabel htmlFor="fightStoryline">Storyline</FormLabel>
                                    <Textarea value={fightStoryline} onChange={e => handleFormChange(e,'FIGHT')} rows={5} />
                                <FormHelperText>
                                    Brief description of the fight significance. URLs are hyperlinked.
                                </FormHelperText>
                            </FormControl>
                            <Stack width="full" spacing="4">
                                <Checkbox name="checkbox" isChecked={isMainEvent} id="isMainEvent" onChange={e => handleFormChange(e, 'FIGHT')}>Main Event</Checkbox>
                            </Stack>
                            <Stack width="full" spacing="4">
                                <Checkbox name="checkbox" isChecked={isTitleFight} id="isTitleFight" onChange={e => handleFormChange(e, 'FIGHT')}>Title Fight</Checkbox>
                            </Stack>
                            <HStack justifyContent="center" width="full">
                                <Button onClick={() => handlePutFight()} type="button" colorScheme="blue">
                                    Submit Fight
                                </Button>
                            </HStack>
                        </VStack>
                    </FieldGroup>
                </Stack>
            </form>
        </Box>
    )
}