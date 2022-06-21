import React, {useState, useEffect} from 'react'
import { Box, Button, Checkbox, Flex, FormControl, FormHelperText, FormLabel, Heading, HStack, IconButton, Input, InputGroup, InputRightElement, Radio, RadioGroup, Select, Stack, StackDivider, Text, Textarea, useColorModeValue, VStack } from '@chakra-ui/react'
import { AddIcon, CheckIcon, DeleteIcon } from '@chakra-ui/icons'
import { FieldGroup } from '../chakra/field-group'
import Datepicker from 'react-datepicker'
import parseISO from 'date-fns/parseISO'
import axios from 'axios'
import { useNavigate } from 'react-router';
import { removeBadEmails, ROUND_LENGTH_ENUMS, validateEmail, WEIGHTCLASS_ENUMS } from '../utils'

export const CreateGroupScorecard = ({ user, accessTokenConfig, showId }) => {
    const navigate = useNavigate();
    const [amPro, setAmPro] = useState('pro');
    const [groupScorecard, setGroupScorecard] = useState({
        admin: '',
        fightDateTime:  parseISO(new Date().toISOString()),
        fighterA: '',
        fighterB: '',
        fighterAId: '',
        fighterBId: '',
        fighterStatus: amPro,
        fightId: null,
        fightResult: null,
        groupScorecardId: '',
        groupScorecardName: '',
        groupScorecardNotes: '',
        location: '',
        members: [],
        ownerDisplayName: user && user.ownerDisplayName ? user.ownerDisplayName : '',
        ownerId: '',
        showId: null,
        totalRounds: 12,
        weightclass: '',
        reminders: true, // reminders doesn't need to be on the Group Scorecard model, it's a lambda, so not sure how to fit this in...
    });
    const [emailValue, setEmailValue] = useState('');
    const [selectedShow, setSelectedShow] = useState(null);
    // const [date, setDate] = useState(new Date());
    useEffect(() => {
        if(user && user.sub){
            setGroupScorecard({...groupScorecard, admin: user.email, ownerId: user.sub, ownerDisplayName: user.ownerDisplayName, members: [user.email]});
        }
    }, [user])
    const destructureShowData = selectedShow => {
        const { showStoryline, fights, showId, location, promoter, showName, time } = selectedShow;
        const mainEventFight = fights.filter( fight => fight.isMainEvent);

        const { fightId, fightOdds, result, weightclass, totalRounds } = mainEventFight[0];
        const [fighterAData, fighterBData] = mainEventFight[0].fighters;
        const createFullName = fighterData => {
            return fighterData.firstName + ' ' + fighterData.lastName;
        };
        const getFighterId = fighterData => {
            return fighterData.fighterId;
        }
        setSelectedShow(selectedShow);
        setGroupScorecard({
            ...groupScorecard,
            groupScorecardName: showName,
            fightId,
            showId,
            fighterA: createFullName(fighterAData),
            fighterAId: getFighterId(fighterAData),
            fighterB: createFullName(fighterBData),
            fighterBId: getFighterId(fighterBData),
            scorecardName: createFullName(fighterAData) + ' vs ' + createFullName(fighterBData),
            weightclass,
            totalRounds,
            location,
            fightDateTime: parseISO(time),
            groupScorecardNotes: showStoryline
        })
    }

    useEffect(() => {
        if(showId){
            const showsUrl = process.env.REACT_APP_SHOWS + `/${showId}`;
            axios.get(showsUrl, accessTokenConfig)
            .then( res => {
                setSelectedShow(res.data);
                destructureShowData(res.data);
                console.log('res.data: ',res.data)
            })
            .catch( err => console.log(err));
        }
    },[showId]);

    const handleFormChange = e => {
        const { id, value, checked } = e.currentTarget;
        if(id === 'reminders') return setGroupScorecard({...groupScorecard, reminders: checked})
        if(id === 'emailValue') return setEmailValue(value);
        return setGroupScorecard({...groupScorecard, [id]: value});
    }

    const handleAmPro = e => {
        const {name, value} = e.currentTarget;
        setGroupScorecard({...groupScorecard, fighterStatus: name});
    }
    const handleEmailSubmit = e => {
        e.preventDefault();
        if(validateEmail(emailValue)){
            const { members } = groupScorecard;
            const tempMembers = members.concat(emailValue);
            setGroupScorecard({...groupScorecard, members: tempMembers});
            setEmailValue('');
        } else {
            alert('Not a valid email.')
        }
    }

    const deleteMember = e => {
        const { id } = e.currentTarget;
        const { members } = groupScorecard;
        const tempMembersArr = members.filter( member => member !== id)
        // console.log('106 members: ',members);
        return setGroupScorecard({...groupScorecard, members: tempMembersArr});
    }
    const submitGroupScorecard = () => {
        const url = process.env.REACT_APP_GROUP_SCORECARDS;
        const { fightDateTime, members } = groupScorecard;
        const groupScorecardObj = {
            ...groupScorecard,
            fightDateTime: new Date(fightDateTime).getTime(),
        };
        const tempMembers = members;
        const goodEmails = removeBadEmails(tempMembers);
        const dedupedEmails = [...new Set(goodEmails)];
        setGroupScorecard({ ...groupScorecard, members: dedupedEmails });
        console.log('groupScorecardObj 125: ',groupScorecardObj);
        // console.log('typeof: ',typeof groupScorecardObj.fightDateTime)
        return axios.post(url, groupScorecardObj, accessTokenConfig)
            .then(res => {
                if(res.status === 200){
                    const { groupScorecardId } = res.data;
                    return navigate(`/scoring/${groupScorecardId}`);
                }
            })
            .catch(err => console.log(err));
    };
   
    const { reminders, fighterA, fighterB, groupScorecardName, groupScorecardNotes, location, fightDateTime, members, weightclass, fighterStatus } = groupScorecard;
    // console.log('fightDateTime: ', groupScorecard.fightDateTime)
    // const { mainEvent, fighterAData, fighterBData } = selectedShow && selectedShow.showId ? destructuredShowData(groupScorecard) : '';
    // console.log('mainEvent: ',mainEvent)
    // console.log('fighterAData: ',fighterAData);
    console.log('groupScorecard: ',groupScorecard)

    return (
        <Box px={{base: '4', md: '10'}} py="16" maxWidth="3xl" mx="auto">
            <form id="settings-form" onSubmit={(e) => {e.preventDefault()}}>
                <Stack spacing="4" divider={<StackDivider />}>
                    <Heading size="lg" as="h1" paddingBottom="4">
                        Create A Scorecard
                    </Heading>
                    <FieldGroup title="Fighters">
                        <VStack width="full" spacing="6">
                            <Stack style={{width: '100%'}} direction="column" h="auto" p={4}>
                                <FormControl isRequired id="fighterA" style={{marginBottom: '1rem'}}>
                                    <FormLabel htmlFor="fighterA">Red Corner</FormLabel>
                                    <Input value={fighterA} required onChange={handleFormChange} type="text" maxLength={255} />
                                </FormControl>

                                <FormControl isRequired id="fighterB">
                                    <FormLabel htmlFor="fighterB">Blue Corner</FormLabel>
                                    <Input value={fighterB} required onChange={handleFormChange} type="text" maxLength={255} />
                                </FormControl>
                            </Stack>
                        </VStack>
                    </FieldGroup>
                    <FieldGroup title="Scorecard">
                        <VStack width="full" spacing="6">
                            <FormControl isRequired id="groupScorecardName">
                                <FormLabel htmlFor="groupScorecardName">Scorecard Name</FormLabel>
                                <Input value={groupScorecardName} required onChange={handleFormChange} type="text" maxLength={255} />
                            </FormControl>

                            <FormControl isRequired id="weightclass">
                                <FormLabel htmlFor="weightclass">Weight Class</FormLabel>
                                <Select placeholder="Weight Class" onChange={handleFormChange}>
                                    { WEIGHTCLASS_ENUMS.map(weight => {
                                        const { value, label } = weight;
                                        return <option key={value} value={value}>{label}</option>})
                                    }
                                </Select>
                            </FormControl>
                            <FormControl isRequired id="totalRounds">
                                <FormLabel htmlFor="totalRounds">Total Rounds</FormLabel>
                                <Select placeholder="Rounds" id="rounds" onChange={handleFormChange}>
                                    { ROUND_LENGTH_ENUMS.map(round => <option key={round} value={round}>{round}</option>)}
                                </Select>
                            </FormControl>
                            <FormControl id="location">
                                <FormLabel htmlFor="location">Location</FormLabel>
                                <Input value={location} onChange={handleFormChange} type="text" maxLength={255} />
                            </FormControl>

                            <FormControl>
                                <FormLabel isRequired>Date and Time</FormLabel>
                                <Datepicker
                                    id="date_picker"
                                    showTimeSelect
                                    dateFormat="Pp"
                                    selected={fightDateTime}
                                    style={{color: '#333 !important'}}
                                    onChange={date => setGroupScorecard({...groupScorecard, fightDateTime: date})}
                                />
                            </FormControl>
                            <FormControl id="groupScorecardNotes">
                                <FormLabel htmlFor="groupScorecardNotes">Notes</FormLabel>
                                <Textarea value={groupScorecardNotes} onChange={handleFormChange} rows={5} />
                                <FormHelperText>
                                    Fight notes can go here. URLs are hyperlinked.
                                </FormHelperText>
                            </FormControl>
                        </VStack>
                    </FieldGroup>
                    <FieldGroup title="Fight Type">
                    <RadioGroup id="amPro" value={fighterStatus}>
                        <Stack direction="row">
                            <Radio onChange={handleAmPro} name="amateur" value="amateur">Amateur</Radio>
                            <Radio onChange={handleAmPro} name="pro" value="pro">Professional</Radio>
                        </Stack>
                    </RadioGroup>
                    </FieldGroup>

                    <FieldGroup title="Fight Reminders">
                        <Stack width="full" spacing="4">
                            <Checkbox id="reminders" value={reminders} onChange={handleFormChange}>Get reminders for this fight.</Checkbox>
                        </Stack>
                    </FieldGroup>
                    <FieldGroup title="Score with Friends">
                        <Stack width="full" spacing="4">
                            <FormControl id="membersArr">
                                <FormLabel htmlFor="membersArr">Create a Group</FormLabel>
                                {members.map((member, i) => {
                                    return (
                                        <InputGroup m="1" key={i}>
                                            <Input size="md" readOnly key={member} value={members[i]} placeholder="first.last@email.com" type="email" maxLength={255} />
                                            <InputRightElement children={<DeleteIcon id={member} onClick={deleteMember} _hover={{cursor: 'pointer', color: 'gray'}} color="white" />} />
                                        </InputGroup>
                                    )
                                })}
                                <Input onChange={e => handleFormChange(e)} value={emailValue} id="emailValue" _focus={{color: 'black',background: 'lightgray'}} mt="4" placeholder="email@example.com" type="email" maxLength={255} />
                                <Button colorScheme="blue" onClick={e => handleEmailSubmit(e)} leftIcon={<AddIcon />} mt="2rem" type="button">
                                    Add
                                </Button>
                            </FormControl>
                        </Stack>
                    </FieldGroup>
                </Stack>
                <Flex mt="1.5rem" flexDir="row" alignItems="center" justifyContent="center">
                    <Button m="1rem" onClick={submitGroupScorecard} type="submit" colorScheme="blue">
                        Create Scorecard
                    </Button>
                    <Button m="1rem" variant="outline">Cancel</Button>
                </Flex>
            </form>
        </Box>
    )
}