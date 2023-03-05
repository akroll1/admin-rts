import { 
    useState, 
    useEffect 
} from 'react'
import { 
    Box, 
    Button, 
    ButtonGroup, 
    Checkbox, 
    FormControl, 
    FormHelperText, 
    FormLabel, 
    Heading, 
    HStack, 
    Input, 
    InputGroup,  
    Select, 
    Stack, 
    StackDivider, 
    Textarea, 
    VStack 
} from '@chakra-ui/react'
import { FieldGroup } from '../../chakra'
import Datepicker from 'react-datepicker'
import {
    OfficialResults,
    ROUND_LENGTH_ENUMS,
    Status,
    useGlobalStore,
    WeightClass,
} from '../../stores'

export const FightForm = () => {
    const { 
        createFight,
        deleteFight,
        fetchFightSummary,
        isSubmitting,
        selectedFightSummary,
        updateFight,
    } = useGlobalStore()

    const [id, setFightId] = useState(null);
    const [fighterIds, setFighterIds] = useState({
        a: '',
        b: ''
    })
    const [form, setForm] = useState({
        id: null,
        description: '',
        fighterIds: [],
        isMainEvent: false,
        isTitleFight: false,
        officialResult: null,
        parent: null,
        rounds: 0,
        status: "PENDING",
        starts: new Date(),
        weightclass: '',
    });

    useEffect(() => {
        if(selectedFightSummary?.fight?.fighterIds?.length === 2){
            setForm({
                ...form,
                ...selectedFightSummary.fight,

                
            })
        }
    },[selectedFightSummary])
    
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
                id: form.id ? form.id : null,
                fighterIds: [fighterIds.a, fighterIds.b],
                isMainEvent: form.isMainEvent,
                isTitleFight: form.isTitleFight,
                officialResult: form.officialResult ? form.officialResult : null,
                parent: form.parent ? form.parent : null,
                rounds: parseInt(form.rounds),
                status: form.status,
                weightclass: form.weightclass,
        })
        // updateFight(fightObj)
    };
    
    const handlePostFight = () => {
       
        const distance = {
            id: form.id ? form.id : null, // not sure how to handle yet, form and distance.
            chatKey: null,
            description: form.description ? form.description : null,
            distanceIds: null, // will be null for fight. 
            distanceName: form.distanceName,
            distanceType: "FIGHT",
            starts: new Date(form.starts).toISOString(),
            status: form.status ? form.status: null,
        }

        const fight = Object.assign(Object.create({}), {
            id: form.id ? form.id : null,
            fighterIds: [fighterIds.a, fighterIds.b],
            isMainEvent: form.isMainEvent,
            isTitleFight: form.isTitleFight,
            officialResult: form.officialResult ? form.officialResult : null,
            parent: form.parent ? form.parent : null,
            rounds: parseInt(form.rounds),
            weightclass: form.weightclass,
        })
        // console.log('fightObj: ', fightObj)
        // console.log("distanceObj:  ", distanceObj)
        const postObj = {
            fight,
            distance
        }
        console.log('postObj: ', postObj)
        createFight(postObj)
    };
    
    const searchForFight = () => {
        if(id){
            fetchFightSummary(id)
        }
    }

    const handleDeleteFight = e => {
        deleteFight(id)
    }

    return (
        <Box px={{base: '4', md: '10'}} py="16" maxWidth="3xl" mx="auto">
             <FieldGroup title="Search for a Fight">
                <VStack width="full" spacing="6">
                    <FormControl isRequired id="id">
                        <FormLabel htmlFor="id">Fight ID</FormLabel>
                        <Input value={id} onChange={({currentTarget: {value}}) => setFightId(value.length === 36 ? value : '')} type="text" maxLength={36} />
                    </FormControl>
                    <HStack justifyContent="center" width="full">
                        <Button 
                            disabled={!id} 
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
                            
                            <FormControl isRequired id="a">
                                <FormLabel htmlFor="a">Fighter A ID</FormLabel>
                                <Input value={fighterIds.a} onChange={ ({ currentTarget: {value}}) => setFighterIds(prev => ({ ...prev, a: value.length === 36 ? value : '' }))} type="text" maxLength={36} />
                            </FormControl>

                            <FormControl isRequired id="b">
                                <FormLabel htmlFor="b">Fighter B ID</FormLabel>
                                <Input value={fighterIds.b} onChange={ ({ currentTarget: {value}}) => setFighterIds(prev => ({ ...prev, b: value.length === 36 ? value : '' }))} type="text" maxLength={36} />
                            </FormControl>

                            <FormControl id="parent">
                                <FormLabel htmlFor="parent">Parent ID</FormLabel>
                                <Input value={form.parent} onChange={ ({ currentTarget: {value}}) => handleFormChange(value.length === 36 ? value : '')} type="text" maxLength={36} />
                            </FormControl>

                            <Stack width="full" spacing="4">
                                <Checkbox name="checkbox" isChecked={form.isMainEvent} id="isMainEvent" onChange={e => handleFormChange(e, 'FIGHT')}>Main Event</Checkbox>
                            </Stack>

                            <Stack width="full" spacing="4">
                                <Checkbox name="checkbox" isChecked={form.isTitleFight} id="isTitleFight" onChange={e => handleFormChange(e, 'FIGHT')}>Title Fight</Checkbox>
                            </Stack>

                            <FormControl isRequired id="rounds">
                                <FormLabel htmlFor="rounds">Total Rounds</FormLabel>
                                <Select placeholder={form.rounds || 'Rounds'} onChange={e => handleFormChange(e,'ROUNDS')}>
                                    { ROUND_LENGTH_ENUMS.map( round => <option key={round} value={round}>{round}</option>)}
                                </Select>
                            </FormControl>

                            <FormControl isRequired id="weightclass">
                                <FormLabel isRequired htmlFor="weightclass">Weight Class</FormLabel>
                                <Select placeholder={form.weightclass || 'Weight Class'} onChange={e => handleFormChange(e,'FIGHT')}>
                                    { Object.keys(WeightClass).map( weightclass => <option key={weightclass} value={weightclass}>{weightclass}</option>)}
                                </Select>
                            </FormControl>

                            <FormControl id="description">
                                <FormLabel htmlFor="description">Description</FormLabel>
                                    <Textarea value={form.description} onChange={handleFormChange} rows={4} />
                            </FormControl>

                            <FormControl isRequired id="distanceName">
                                <FormLabel htmlFor="distanceName">Fight/Distance Name</FormLabel>
                                <Input value={form.distanceName} onChange={handleFormChange}  type="text" maxLength={255} />
                            </FormControl>

                            <FormControl id="status">
                                <FormLabel htmlFor="status">Distance Status</FormLabel>
                                <Select onChange={handleFormChange}>
                                    { Object.keys(Status).map( status => <option key={status} value={status}>{status}</option>)}
                                </Select>                            
                            </FormControl>

                            <FormControl>
                                <FormLabel htmlFor="date-picker">Starts</FormLabel>
                                <Datepicker 
                                    id="date-picker"
                                    dateFormat="Pp"     
                                    timeFormat="p"    
                                    showTimeSelect                           
                                    selected={form.starts}
                                    style={{background: '#FFF', color: '#333 !important'}}
                                    onChange={time => setForm({ ...form, starts: time })}
                                />
                            </FormControl>

                        </VStack>
                    </FieldGroup>

                    <FieldGroup mt="8">
                        <ButtonGroup w="100%">
                            <Button 
                                minW="33%"
                                onClick={id ? handleUpdateFight : handlePostFight} 
                                type="button" 
                                colorScheme="solid"
                                isLoading={isSubmitting}
                                loadingText="Submitting..."
                            >
                                {id ? 'Update Fight' : 'Create Fight'}
                            </Button>
                            <Button 
                                minW="33%" 
                                disabled={!id} 
                                isLoading={isSubmitting} 
                                loadingText="Deleting" 
                                onClick={handleDeleteFight} 
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