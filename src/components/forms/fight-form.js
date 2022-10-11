import React, { useState, useEffect } from 'react'
import { Box, Button, ButtonGroup, Checkbox, FormControl, FormHelperText, FormLabel, Heading, HStack, Input, InputGroup, InputRightElement, Select, Stack, StackDivider, Textarea, useToast, VStack } from '@chakra-ui/react'
import { FieldGroup } from '../../chakra'
import { DeleteIcon } from '@chakra-ui/icons'
import { FIGHT_STATUS_SELECT_CONSTANTS, OFFICIAL_RESULTS_ENUM, ROUND_LENGTH_ENUMS, WEIGHTCLASS_ENUMS } from '../../utils'
import { useScorecardStore } from '../../stores'

export const FightForm = () => {
    const { 
        createFight,
        fetchFight,
        fight,
        updateFight,
    } = useScorecardStore()

    const toast = useToast();
    const [fighterAId, setFighterAId] = useState('');
    const [fighterBId, setFighterBId] = useState('');
    const [fightId, setFightId] = useState(null);
    const [guestJudge, setGuestJudge] = useState('');
    const [guestJudgeIds, setGuestJudgeIds] = useState([]);
    const [form, setForm] = useState({
        fighterIds: [],
        fightQuickTitle: '',
        fightStoryline: null,
        isMainEvent: false,
        isTitleFight: false,
        rounds: 0,
        weightclass: '',
    });

    useEffect(() => {
        if(fight.fighterIds.length === 2){
            setForm(fight)
            setFighterAId(fight.fighterIds[0])
            setFighterBId(fight.fighterIds[1])
        }
    },[fight])
    
    const handleFormChange = e => {
        const { name, id, value, checked } = e.currentTarget;
        if(name === 'checkbox'){
            return setForm({ ...form, [id]: checked });
        }
        setForm({ ...form, [id]: value });
    };
   
    // rounds is being cast in places.
    const handleUpdateFight = () => {
        const fightObj = Object.assign(Object.create({}), {
                fightId: form.fightId,
                fightQuickTitle: form.fightQuickTitle,
                fightStatus: form.fightStatus,
                isMainEvent: form.isMainEvent,
                isTitleFight: form.isTitleFight,
                officialResult: form.officialResult,
                rounds: parseInt(form.rounds)
        })
        // console.log('fightObj: ',fightObj)
        updateFight(fightObj)
    };
    
    const handlePostFight = () => {
        const postObj = Object.assign(form, {
            fighterIds: [fighterAId, fighterBId], 
            rounds: parseInt(form.rounds)
        })
        createFight(postObj)
    };
    
    const searchForFight = () => {
        if(fightId){
            fetchFight(fightId)
        }
    }

    const handleAddGuestJudge = () => {
        if(guestJudge.length === 36){
            setGuestJudgeIds( prev => ([...prev, guestJudge]));
            return setGuestJudge('');
        }
        return alert('Not a valid UUID');
    }
    const deleteJudge = e => {
        const { id } = e.currentTarget;
        const filtered = guestJudgeIds.filter( judge => judge !== id)
        setGuestJudgeIds(filtered)
    }
    const { fightQuickTitle, isMainEvent, isTitleFight, fightStoryline, rounds } = form;
    console.log('form: ', form)
    return (
        <Box px={{base: '4', md: '10'}} py="16" maxWidth="3xl" mx="auto">
             <FieldGroup title="Search for a Fight">
                <VStack width="full" spacing="6">
                    <FormControl isRequired id="fightId">
                        <FormLabel htmlFor="fightId">Fight ID</FormLabel>
                        <Input value={fightId} onChange={({currentTarget: {value}}) => setFightId(value.length === 36 ? value : '')} type="text" maxLength={36} />
                    </FormControl>
                    <HStack justifyContent="center" width="full">
                        <Button 
                            disabled={!fightId} 
                            minW="33%" 
                            // isLoading={isSubmitting} 
                            loadingText="Searching..." 
                            onClick={searchForFight} 
                            type="button" 
                            colorScheme="solid"
                        >
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
                                        { FIGHT_STATUS_SELECT_CONSTANTS.map( ({value, label}) => <option key={value} value={value}>{label}</option>)}
                                    </Select>
                                </FormControl>
                                <FormControl id="officialResult">
                                    <FormLabel htmlFor="officialResult">Official Result</FormLabel>
                                    <Select placeholder={form.officialResult || 'Official Result'} onChange={handleFormChange}>
                                        { OFFICIAL_RESULTS_ENUM.map( ({value, label}) => <option key={value} value={value}>{label}</option>)}
                                    </Select>
                                </FormControl>
                                    <FormControl id="winnderId">
                                    <FormLabel htmlFor="winnerId">Winner ID</FormLabel>
                                    <Input value={form.winnerId} onChange={handleFormChange} type="text" maxLength={255} />
                                </FormControl>
                            </VStack>
                        </FieldGroup>
                    }
                    <FieldGroup title="Guest Judges">
                        <VStack width="full" spacing="6">
                            <FormControl id="guestJudge">
                                <FormLabel htmlFor="guestJudge">Guest Judge ID's</FormLabel>
                                <Input value={guestJudge} placeholder="Guest Judge ID" onChange={e => setGuestJudge(e.currentTarget.value)}></Input>
                            </FormControl>
                            <FieldGroup mt="8">
                                <HStack width="full">
                                <Button minW="33%" onClick={handleAddGuestJudge} type="button" colorScheme="blue">
                                    Add Guest Judge
                                </Button>
                                </HStack>
                            </FieldGroup>
                            { guestJudgeIds.map( (judge, i) => {
                                return (
                                    <InputGroup>
                                        <Input id={judge} onClick={deleteJudge} value={judge} key={judge} placeholder="Guest Judge ID" />
                                    </InputGroup>
                                )
                            })}
                        </VStack>
                    </FieldGroup>

                    <FieldGroup mt="8">
                        <ButtonGroup w="100%">
                            <Button 
                                minW="33%"
                                onClick={fightId ? handleUpdateFight : handlePostFight} 
                                type="button" 
                                colorScheme="solid"
                                // isLoading={isSubmitting}
                                loadingText="Submitting..."
                            >
                                Submit
                            </Button>
                            <Button 
                                minW="33%" 
                                disabled={!fightId} 
                                // isLoading={isSubmitting} 
                                loadingText="Deleting" 
                                // onClick={deleteFight} 
                                variant="outline"
                            >
                                Delete
                            </Button>
                        </ButtonGroup>
                    </FieldGroup>
                </Stack>
            </form>
        </Box>
    )
}