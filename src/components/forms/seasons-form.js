import { useState, useEffect } from 'react'
import { 
    Box, 
    Button, 
    ButtonGroup, 
    Divider,
    Flex,
    FormControl, 
    FormLabel, 
    HStack, 
    Input, 
    Stack, 
    StackDivider, 
    Textarea, 
    VStack 
} from '@chakra-ui/react'
import { FieldGroup } from '../../chakra'
import { SelectedSeasonTable, SeasonsTable } from '../tables';
import { useScorecardStore } from '../../stores';
import Datepicker from 'react-datepicker'
import "react-datepicker/dist/react-datepicker.css"

export const SeasonsForm = () => {
    const {
        createSeason,
        deleteSeason,
        fetchAllSeasons,
        fetchFightSummary,
        fetchSeason,
        fightSummary,
        seasons,
        updateSeason,
    } = useScorecardStore()

    const [seasonId, setSeasonId] = useState(null)
    const [allSeasons, setAllSeasons] = useState([]);
    const [selectedSeason, setSelectedSeason] = useState({})
    const [fightId, setFightId] = useState('')
    const [selectedFight, setSelectedFight] = useState({})
    const [fightSummaries, setFightSummaries] = useState([]);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [pickerTime, setPickerTime] = useState({
        starts: new Date().getTime(),
        ends: new Date().getTime()
    })

    // ends: parseISO(new Date().toISOString()),
    const [form, setForm] = useState({
        seasonId: '',
        ends: new Date().getTime(),
        fightIds: [],
        seasonDescription: '',
        seasonName: '',
        seasonTagline: '',
        starts: new Date().getTime(),
    })

    useEffect(() => {
        fetchAllSeasons()
    },[])

    useEffect(() => {
        setAllSeasons(seasons)
        setSelectedSeason(seasons[0])
    },[seasons])

    useEffect(() => {
        if(fightSummary.fight.fightId){
            const isDuplicate = form.fightIds.filter( id => id === fightSummary.fight.fightId)
            if(isDuplicate.length > 0) return 
            setFightSummaries([ ...fightSummaries, fightSummary ])
            setForm({ ...form, fightIds: [ ...form.fightIds, fightSummary.fight.fightId]})
        }
    },[fightSummary])

    const handleFormChange = e => {
        const { id, name, value } = e.currentTarget;
        return setForm({...form, [id]: value });
    }
    
    const handleFetchSeason = e => {
        fetchSeason(seasonId)
    }

    const handleUpdateSeason = e => {
        updateSeason(form)
    }

    const handleCreateSeason = () => {
        console.log('CREATE form: ', form)

        createSeason(form)
    }

    const handleDeleteSeason = e => {
        deleteSeason(seasonId)
    }

    const handleFetchFightSummary = e => {
        const { id } = e.currentTarget;
        if(fightId.length === 36){
            fetchFightSummary(fightId)
            return 
        }
        alert('No fight ID.')
    }

    const handleSeasonSelect = e => {
        const { id } = e.currentTarget;
        console.log('id: ', id)
        const season = allSeasons.filter( summary => summary.season.seasonId === id);
        setForm(season[0].season); 
        setSelectedSeason(season) 
        setSeasonId(season[0].seasonId)  
    }

    const removeFight = id => {
        const removed = form.fightIds.filter( fightId => fightId !== id)
        setForm({ ...form, fightIds: removed })
        const removedSummary = fightSummaries.filter( summary => summary.fight.fightId !== id)
        setFightSummaries(removedSummary)
    }

    const handleFightSelect = e => {
        console.log(e.currentTarget)
        const { id } = e.currentTarget;
        console.log('id: ', id)
        const selected = fightSummaries.filter( summary => summary.fight.fightId === id)
        console.log('selected: ', selected)
        setSelectedFight(selected)
    }

    const handlePickerChange = (time, id) => {
        setPickerTime({ ...pickerTime, [id]: time })
        setForm({ ...form, [id]: new Date(time.toString()).getTime() })
    }

    console.log('form: ', form)
    const { seasonName, seasonDescription, seasonTagline } = form
    const { ends, starts } = pickerTime
    // console.log('fightId: ', fightId)
    // console.log('selectedSeason: ', selectedSeason)
    // console.log('allSeasons: ', allSeasons)
    return (
        <>
            <Box 
                p="4" 
                // maxWidth="3xl" 
                mx="auto"
            >
                <Flex 
                    w="100%"
                    flexDir="column"
                >
                    <Stack w="100%" spacing="4" divider={<StackDivider />}>
                        <FieldGroup title="Fetch a Season">
                            <VStack width="full" spacing="6">
                                <FormControl id="seasonId">
                                    <FormLabel htmlFor="seasonId">Season ID</FormLabel>
                                    <Input 
                                        value={seasonId} 
                                        onChange={ ({ currentTarget: {value} }) => setSeasonId(value.length == 36 ? value : '')} 
                                        type="text" 
                                        maxLength={36} 
                                    />
                                </FormControl>
                                <HStack 
                                    justifyContent="center" 
                                    width="full"
                                >
                                    <Button 
                                        disabled={!seasonId}  
                                        minW="33%" 
                                        isLoading={isSubmitting} 
                                        loadingText="Searching..." 
                                        onClick={handleFetchSeason} 
                                        type="button" 
                                        colorScheme="solid"
                                    >
                                        Search
                                    </Button>
                                </HStack>
                            </VStack>
                        </FieldGroup>
                    </Stack>
                    <SeasonsTable 
                        handleSeasonSelect={handleSeasonSelect}
                        allSeasons={allSeasons}
                        selectedSeason={selectedSeason}
                    />
                    <Divider my="8"/>
                </Flex>
                <form 
                    id="seasons_form" 
                    onSubmit={(e) => {e.preventDefault()}}
                >
                    <Stack spacing="4" divider={<StackDivider />}>
                        <FieldGroup title="Create a Season">
                            <VStack width="full" spacing="6">
                                <FormControl id="seasonName">
                                <FormLabel htmlFor="seasonName">Season Name</FormLabel>
                                    <Input 
                                        value={seasonName} 
                                        onChange={handleFormChange} 
                                        type="text" 
                                        maxLength={100} 
                                    />
                                </FormControl>

                                <FormControl id="seasonTagline">
                                    <FormLabel htmlFor="seasonTagline">Season Tagline</FormLabel>
                                    <Input 
                                        value={seasonTagline} 
                                        onChange={handleFormChange} 
                                        type="text" 
                                        maxLength={100} 
                                    />
                                </FormControl>

                                <FormControl id="seasonDescription">
                                    <FormLabel>Season Description</FormLabel>
                                    <Textarea
                                        placeholder="Season Description..."
                                        value={seasonDescription}
                                        onChange={handleFormChange}
                                        type="text"
                                        size='md'
                                        rows="4"
                                    />
                                </FormControl>

                                <FormControl>
                                    <FormLabel htmlFor="date-picker">Starts</FormLabel>
                                    <Datepicker
                                        // showTimeSelect 
                                        dateFormat="Pp"
                                        selected={starts}
                                        style={{background: '#FFF', color: '#333 !important'}}
                                        onChange={time => handlePickerChange(time, 'starts')}
                                    />
                                </FormControl>

                                <FormControl>
                                    <FormLabel htmlFor="date-picker">Ends</FormLabel>
                                    <Datepicker 
                                        // showTimeSelect
                                        dateFormat="Pp"
                                        selected={ends}
                                        style={{background: '#FFF', color: '#333 !important'}}
                                        onChange={time => handlePickerChange(time, 'ends')}
                                    />
                                </FormControl>

                                <FormControl id="fightId">
                                    <FormLabel htmlFor="fightId">
                                        Fight ID
                                    </FormLabel>
                                    <Input 
                                        value={fightId} 
                                        onChange={e => setFightId(e.currentTarget.value)} 
                                        type="text" 
                                        minLength={36}
                                        maxLength={36} 
                                    />
                                </FormControl>
                                <Button 
                                    minW="33%"
                                    m="auto"
                                    onClick={handleFetchFightSummary} 
                                    type="submit" 
                                    colorScheme="solid"
                                >
                                    Get Fight
                                </Button>

                            </VStack>
                        </FieldGroup>
                    </Stack>
                    <FieldGroup mt="8">
                        <ButtonGroup width="full">
                            <Button 
                                onClick={form.seasonId ? handleUpdateSeason : handleCreateSeason} 
                                type="submit" 
                                colorScheme="solid"
                            >
                                {form.seasonId ? `Update Season` : `Create Season`}
                            </Button>
                            <Button 
                                onClick={handleDeleteSeason}
                                variant="outline"
                            >
                                Delete
                            </Button>
                        </ButtonGroup>
                    </FieldGroup>
                </form>
            </Box>
            <Divider my="8" />
            <SelectedSeasonTable 
                removeFight={removeFight}
                selectedSeason={selectedSeason}
                handleFightSelect={handleFightSelect}
            />
        </>

    )
}