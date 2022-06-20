import React, { useState, useEffect } from 'react'
import { Box, Button, ButtonGroup, Checkbox, FormControl, FormHelperText, FormLabel, Heading, HStack, Input, Select, Stack, StackDivider, Textarea, useToast, VStack } from '@chakra-ui/react'
import { FieldGroup } from '../../chakra'
import axios from 'axios'
import { FIGHT_SHOW_STATUS_ENUMS, ROUND_LENGTH_ENUMS,  WEIGHTCLASS_ENUMS } from '../../utils'

export const FightForm = ({ user, accessTokenConfig }) => {
    const toast = useToast();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [fightId, setFightId] = useState(null);
    const [fighterAId, setFighterAId] = useState('');
    const [fighterBId, setFighterBId] = useState('');

    const [form, setForm] = useState({
        fighterIds: [],
        fightQuickTitle: '',
        weightclass: '',
        rounds: 0,
        isMainEvent: false,
        isTitleFight: false,
        odds: null,
        fightStoryline: null,
    });
    // interface FightCreateDTO {
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
   
    
    const handlePutFight = () => {
        setIsSubmitting(true);
        const fightObj = Object.assign({}, form, {fighterIds: [fighterAId, fighterBId]})
        const url = process.env.REACT_APP_FIGHTS + `/${fightId}`;
        return axios.put(url, fightObj, accessTokenConfig)
        .then( res => console.log('res: ', res))
        .catch( err => console.log(err))
        .finally(() => setIsSubmitting(false));
        
    };
    
    const handlePostFight = () => {
        setIsSubmitting(true);
        const url = process.env.REACT_APP_FIGHTS;
        const postObj = Object.assign({}, form, {fighterIds: [fighterAId, fighterBId]})
        console.log('postObj: ', postObj)
        return axios.post(url, postObj, accessTokenConfig)
        .then( res => console.log('res: ', res))
        .catch( err => console.log(err))
        .finally(() => setIsSubmitting(false));
    };
    
    const searchForFight = () => {
        setIsSubmitting(true);
        const url = process.env.REACT_APP_FIGHTS + `/${fightId}`
        return axios.get(url, accessTokenConfig)
        .then( res => {
            if(res.status === 200){
                const { fighterIds } = res.data;
                setFighterAId(`${fighterIds[0]}`);
                setFighterBId(`${fighterIds[1]}`);
                setForm({ ...res.data })
            }
        })
        .catch( err => console.log(err))
        .finally(() => setIsSubmitting(false));
    };
    const deleteFight = () => {
        setIsSubmitting(true);
        const url = process.env.REACT_APP_FIGHT + `/${fightId}`;
        return axios.delete(url, accessTokenConfig)
        .then( res => console.log('res: ', res))
        .catch( err => console.log(err))
        .finally(() => setIsSubmitting(false));
    };
    const { fighterIds, fightQuickTitle, weightclass, rounds, isMainEvent, isTitleFight, odds, fightStoryline } = form;
    console.log('form: ', form);
    return (
        <Box px={{base: '4', md: '10'}} py="16" maxWidth="3xl" mx="auto">
             <FieldGroup title="Search for a Fight">
                <VStack width="full" spacing="6">
                    <FormControl isRequired id="fightId">
                        <FormLabel htmlFor="fightId">Fight ID</FormLabel>
                        <Input value={fightId} onChange={({currentTarget: {value}}) => setFightId(value.length === 36 ? value : '')} type="text" maxLength={36} />
                    </FormControl>
                    <HStack justifyContent="center" width="full">
                        <Button disabled={!fightId} minW="33%" isLoading={isSubmitting} loadingText="Searching..." onClick={() => searchForFight()} type="button" colorScheme="blue">
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
                            <FormControl isRequired id="fightQuickTitle">
                                <FormLabel htmlFor="fightQuickTitle">Fight Quick Title</FormLabel>
                                <Input value={fightQuickTitle} onChange={handleFormChange} type="text" maxLength={150} />
                            </FormControl>
                            <FormControl isRequired id="fighterAId">
                                <FormLabel htmlFor="fighterAId">Fighter A ID</FormLabel>
                                <Input value={fighterAId} onChange={ ({currentTarget: {value}}) => setFighterAId(value.length === 36 ? value : '')} type="text" maxLength={36} />
                            </FormControl>
                            <FormControl isRequired id="fighterBId">
                                <FormLabel htmlFor="fighterBId">Fighter B ID</FormLabel>
                                <Input value={fighterBId} onChange={ ({ currentTarget: {value}}) => setFighterBId(value.length == 36 ? value : '')} type="text" maxLength={36} />
                            </FormControl>
                            <FormControl isRequired id="weightclass">
                                <FormLabel isRequired htmlFor="weightclass">Weight Class</FormLabel>
                                <Select placeholder={form.weightclass || 'Weight Class'} onChange={e => handleFormChange(e,'FIGHT')}>
                                    { WEIGHTCLASS_ENUMS.map( ({value, label}) => <option key={value} value={value}>{label}</option>)}
                                </Select>
                            </FormControl>
                           
                            <FormControl isRequired id="rounds">
                                <FormLabel htmlFor="rounds">Total Rounds</FormLabel>
                                <Select placeholder={form.rounds || 'Rounds'} onChange={e => handleFormChange(e,'ROUNDS')}>
                                    { ROUND_LENGTH_ENUMS.map(round => <option key={round} value={round}>{round}</option>)}
                                </Select>
                            </FormControl>
                            <FormControl id="odds">
                                <FormLabel htmlFor="odds">Odds/Moneyline</FormLabel>
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
                        </VStack>
                    </FieldGroup>
                    { fightId &&
                        <FieldGroup title="Update Results">
                            <VStack width="full" spacing="6">
                                <FormControl id="fightStatus">
                                    <FormLabel htmlFor="fightStatus">Fight Status</FormLabel>
                                    <Select placeholder={form.fightStatus || 'Fight Status'} onChange={handleFormChange}>
                                        { FIGHT_SHOW_STATUS_ENUMS.map( ({value, label}) => <option key={value} value={value}>{label}</option>)}
                                    </Select>
                                </FormControl>
                                <FormControl id="officialResult">
                                    <FormLabel htmlFor="officialResult">Official Result</FormLabel>
                                    <Select placeholder={form.officialResult || 'Official Result'} onChange={handleFormChange}>
                                        { WEIGHTCLASS_ENUMS.map( ({value, label}) => <option key={value} value={value}>{label}</option>)}
                                    </Select>
                                </FormControl>
                                    <FormControl id="winnderId">
                                    <FormLabel htmlFor="winnerId">Winner ID</FormLabel>
                                    <Input value={form.winnerId} onChange={handleFormChange} type="text" maxLength={255} />
                                </FormControl>
                            </VStack>
                        </FieldGroup>
                    }
                    <FieldGroup mt="8">
                    <ButtonGroup w="100%">
                        <Button 
                            minW="33%"
                            onClick={fightId ? handlePutFight : handlePostFight} 
                            type="button" 
                            colorScheme="blue"
                            isLoading={isSubmitting}
                            loadingText="Submitting..."
                        >
                            Submit
                        </Button>
                        <Button minW="33%" disabled={!fightId} isLoading={isSubmitting} loadingText="Deleting" onClick={deleteFight} colorScheme="red" variant="outline">Delete</Button>
                    </ButtonGroup>
                </FieldGroup>
                </Stack>
            </form>
        </Box>
    )
}