import React, { useState, useEffect } from 'react'
import { Box, Button, ButtonGroup, Flex, FormControl, FormLabel, Heading, HStack, Input, Radio, RadioGroup, Select, Stack, StackDivider, useToast, VStack } from '@chakra-ui/react'
import { DividerWithText, FieldGroup } from '../../chakra'
import axios from 'axios'
import { capFirstLetters, FIGHT_STATUS_SELECT_CONSTANTS, FIGHT_STATUS_CONSTANTS, OFFICIAL_RESULTS_ENUM } from '../../utils'

export const FightResolutionForm = ({ user, tokenConfig }) => {
    const toast = useToast();
    const [fightResolution, setFightResolution] = useState('');
    const [selectFightStatus, setSelectFightStatus] = useState('');
    const [radio, setRadio] = useState('')
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [fightId, setFightId] = useState(null);
    const [form, setForm] = useState({
        fight: {
            fightQuickTitle: '',
            fightStatus: '',
            officialResult: '',
            rounds: 0,
            weightclass: ''
        },
        fighters: []
    })  

    const searchForFight = () => {
        if(fightId){
            setIsSubmitting(true);
            const url = process.env.REACT_APP_FIGHTS + `/resolutions/${fightId}`;
            return axios.get(url, tokenConfig)
                .then( res => setForm(res.data))
                .catch( err => console.log(err))
                .finally(() => setIsSubmitting(false));
        }
    };
    const handleSubmitResolution = () => {
        const url = process.env.REACT_APP_FIGHTS + `/resolutions/${fightId}`;
        const resolutionObj = {
            officialResult: `${radio}, ${fightResolution}`,
            fightStatus: selectFightStatus
        };
        console.log('resolutionObj: ', resolutionObj);
        return axios.put(url, resolutionObj, tokenConfig)
            .then( res => console.log('res: ', res))
            .catch( err => console.log(err));
    };

    const getOfficalResult = () => {
        if(!officialResult) return `No official result.`;
        const [fighter1, fighter2] = fighters;
        const winner = officialResult.slice(0, 36) === fighter1.fighterId ? `${capFirstLetters(fighter1.firstName)} ${capFirstLetters(fighter1.lastName)}` : `${capFirstLetters(fighter2.firstName)} ${capFirstLetters(fighter2.lastName)}`
        const wonHow = officialResult.slice(37);
        return `${winner}: ${wonHow}`;
    }

    console.log('form: ', form);
    console.log('radio: ', radio);
    console.log('fightResolution: ', fightResolution);
    const { fight, fighters } = form;
    const { fightQuickTitle, fightStatus, officialResult, rounds, weightclass } = fight;
    const [fighter1, fighter2] = fighters.length > 0 ? fighters : '';
    const theOfficialResult = fighters.length > 0 ? getOfficalResult() : '';
    return (
        <Box px={{base: '4', md: '10'}} py="16" maxWidth="3xl" mx="auto">
            <form id="fight_resolution_form" onSubmit={(e) => {e.preventDefault()}}>
                <Stack spacing="4" divider={<StackDivider />}>
                    <Heading size="lg" as="h1" paddingBottom="4">
                        Fight Resolution Form
                    </Heading>
                    <FieldGroup title="Search for Fight">
                        <VStack width="full" spacing="6">
                            <FormControl id="fightId">
                                <FormLabel htmlFor="showId">Fight ID</FormLabel>
                                <Input value={fightId} onChange={ ({ currentTarget: {value} }) => setFightId(value.length == 36 ? value : '')} type="text" maxLength={36} />
                            </FormControl>
                            <HStack justifyContent="center" width="full">
                                <Button 
                                    disabled={!fightId}  
                                    minW="33%" 
                                    isLoading={isSubmitting} 
                                    loadingText="Searching..." 
                                    onClick={searchForFight} 
                                    type="button" 
                                    colorScheme="blue"
                                >
                                    Search
                                </Button>
                            </HStack>
                        </VStack>
                    </FieldGroup>
                </Stack>
            </form>
            { fighters.length > 0 && 
                <Flex flexDir="column">
                    <DividerWithText text="The Officials" />
                    <Flex flexDir="column">
                        <Heading p="2" as="h3" size="sm">Fight: {fightQuickTitle}</Heading>
                        <Heading p="2" as="h3" size="sm">Rounds: {rounds}</Heading>
                        <Heading p="2" as="h3" size="sm">Weightclass: {weightclass}</Heading>
                        <Heading p="2" as="h3" size="sm">Fight Status: {fightStatus}</Heading>
                        <Heading p="2" as="h3" size="sm">Official Result: {theOfficialResult}</Heading>
                        <Heading p="2" as="h3" size="sm"></Heading>
                    </Flex>
                    <DividerWithText text="The Officials" />
                    <Heading as="h2" size="md" textAlign="center">Choose The Winner</Heading>
                    <RadioGroup onChange={setRadio} value={radio}>
                        <Stack>
                            <Radio value={fighter1.fighterId}>{`${capFirstLetters(fighter1.firstName)} ${capFirstLetters(fighter1.lastName)}`}</Radio>
                            <Radio value={fighter2.fighterId}>{`${capFirstLetters(fighter2.firstName)} ${capFirstLetters(fighter2.lastName)}`}</Radio>
                        </Stack>
                    </RadioGroup>
                    <Select 
                        onChange={e => setFightResolution(e.currentTarget.value)}
                        w="50%" 
                        mt="4"
                    >
                        { OFFICIAL_RESULTS_ENUM.map( result => <option key={result.value} value={result.value}>{result.label}</option> )}
                    </Select>
                    <Select 
                        onChange={e => setSelectFightStatus(e.currentTarget.value)}
                        w="50%" 
                        mt="4"
                    >
                        { FIGHT_STATUS_SELECT_CONSTANTS.map( ({ value, label }) => <option key={value} value={value}>{label}</option> )}
                    </Select>

                    <FieldGroup mt="8">
                        <ButtonGroup w="100%">
                            <Button 
                                minW="33%"
                                onClick={handleSubmitResolution} 
                                type="button" 
                                colorScheme="blue"
                                isLoading={isSubmitting}
                                loadingText="Submitting..."
                            >
                                Submit
                            </Button>
                        </ButtonGroup>
                    </FieldGroup>
                </Flex>
            }
        </Box>
    )
}
// 2ed612cb-7b7e-4a68-8553-e10bc194564f, KO8
// 02e3e0a4-8b4a-43b9-8919-4f7d498aa36c