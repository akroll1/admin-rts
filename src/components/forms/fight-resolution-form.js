import { useState, useEffect } from 'react'
import { Box, Button, ButtonGroup, Flex, FormControl, FormLabel, Heading, HStack, Input, Radio, RadioGroup, Select, Stack, StackDivider, useToast, VStack } from '@chakra-ui/react'
import { DividerWithText, FieldGroup } from '../../chakra'
import axios from 'axios'
import { capFirstLetters, FIGHT_STATUS_SELECT_CONSTANTS, OFFICIAL_RESULTS_ENUM } from '../../utils'
import { useScorecardStore } from '../../stores'

export const FightResolutionForm = () => {
    const { 
        fightSummary, 
        fetchFightSummary,
        submitFightResolution
    } = useScorecardStore()

    const toast = useToast();
    const [fightResolution, setFightResolution] = useState('');
    const [selectFightStatus, setSelectFightStatus] = useState('');
    const [radio, setRadio] = useState('')
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [fightId, setFightId] = useState('68319d2f-2769-4aee-b1ea-115277ed7a7b');
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
    useEffect(() => {
        if(fightSummary.fighters.length > 0 ){
            setForm(fightSummary)
        }
    },[fightSummary])
    const handleSubmitResolution = () => {
        const resolutionObj = {
            officialResult: radio === `DR` ? `DR` : `${radio},${fightResolution}`,
            fightStatus: selectFightStatus
        };
        if(!resolutionObj.officialResult || !resolutionObj.fightStatus){
            alert('Please select a resolution.')
            return
        }
        console.log('resolutionObj: ', resolutionObj);
        submitFightResolution(resolutionObj, fightId)
    }

    const setOfficalResult = () => {
        if(!officialResult) return `No official result.`;
        const [fighter1, fighter2] = form.fighters;
        const winner = officialResult.slice(0, 36) === fighter1.fighterId ? `${capFirstLetters(fighter1.firstName)} ${capFirstLetters(fighter1.lastName)}` : `${capFirstLetters(fighter2.firstName)} ${capFirstLetters(fighter2.lastName)}`
        const wonHow = officialResult.slice(37);
        return `${winner}: ${wonHow}`;
    }
    const handleFetchFightSummary = () => {
        fetchFightSummary(fightId)
    }

    const { fightQuickTitle, fightStatus, officialResult, rounds, weightclass } = form.fight;
    const [fighter1, fighter2] = form.fighters
    const theOfficialResult = form.fighters.length > 0 ? setOfficalResult() : '';
    console.log('form: ', form)

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
                                    onClick={handleFetchFightSummary} 
                                    type="button" 
                                    colorScheme="solid"
                                >
                                    Search
                                </Button>
                            </HStack>
                        </VStack>
                    </FieldGroup>
                </Stack>
            </form>
            { form.fighters.length > 0 && 
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
                            <Radio value={'DR'}>Draw</Radio>
                        </Stack>
                    </RadioGroup>
                    { radio !== 'DR' && 
                        <>
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
                        </>
                    }
                    <FieldGroup mt="8">
                        <ButtonGroup w="100%">
                            <Button 
                                minW="33%"
                                onClick={handleSubmitResolution} 
                                type="button" 
                                colorScheme="solid"
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