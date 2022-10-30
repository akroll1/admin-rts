import { useState, useEffect } from 'react'
import { 
    Button, 
    ButtonGroup, 
    Divider,
    Flex,
    FormControl, 
    FormLabel, 
    Input,
    Select, 
    Stack, 
    StackDivider, 
    Textarea, 
    VStack 
} from '@chakra-ui/react'
import { FieldGroup } from '../../chakra'
import { SelectedSeasonTable, SeasonsTable } from '../tables';
import { SeasonStatus, useScorecardStore } from '../../stores';
import Datepicker from 'react-datepicker'
import "react-datepicker/dist/react-datepicker.css"
import parseISO from 'date-fns/parseISO'

export const SeasonsForm = () => {
    const {
        createSeason,
        deleteSeason,
        fetchAllSeasons,
        seasons,
        updateSeason,
    } = useScorecardStore()
    const resetForm = {
        seasonId: '',
        ends: 0,
        fightIds: [],
        seasonDescription: '',
        seasonName: '',
        seasonStatus: 'PENDING',
        seasonTagline: '',
        starts: 0,
    };
    const [seasonId, setSeasonId] = useState(null)
    const [allSeasons, setAllSeasons] = useState([]);
    const [selectedSeason, setSelectedSeason] = useState({})
    const [fightId, setFightId] = useState('')
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [pickerTime, setPickerTime] = useState({
        starts: Date.now(),
        ends: Date.now()
    })

    const [form, setForm] = useState(resetForm)

    useEffect(() => {
        fetchAllSeasons()
    },[])

    useEffect(() => {
        console.log('asdfadsf')
        if(seasons.length > 0){
            setAllSeasons(seasons)
            setSelectedSeason(seasons[0])
            setForm(seasons[0].season)
            setIsSubmitting(false)
            setFightId('')
        }
    },[seasons])

    useEffect(() => {
        if(fightId){
            handleUpdateSeason()
        }
    },[form.fightIds])

    const clearForm = () => {
        setForm(resetForm)
    }

    const handleFormChange = e => {
        const { id, value } = e.currentTarget;
        return setForm({...form, [id]: value });
    }
    
    const handleSeasonSelect = (e, id) => {
        const [season] = allSeasons.filter( summary => summary.season.seasonId === id);
        setForm(season.season); 
        setSelectedSeason(season) 
        setSeasonId(season.seasonId)
        handlePickerChange(season.starts, 'starts')
        handlePickerChange(season.ends, 'ends')
    }

    const handleCreateSeason = () => {
        createSeason(form)
    }
    
    const handleDeleteSeason = id => {
        alert('Uncomment to delete- Season ID: ', id)
        // deleteSeason(selectedSeason.season.seasonId)
    }
    
    const handleUpdateSeason = () => {
        setIsSubmitting(true)
        updateSeason(form)
    }

    const addFightToSeason = () => {
        if(fightId.length === 36){
            
            if(!form.seasonName) return alert('Select a Season')
            const [isDuplicate] = form.fightIds.filter( id => id === fightId)
            if(isDuplicate) return alert('Fight is in Season')

            setIsSubmitting(true)
            setForm({ ...form, fightIds: [ ...form.fightIds, fightId] })
            Object.assign(form, {
                seasonId: form.seasonId ? selectedSeason.season.seasonId : '',
                fightIds: [ ...form.fightIds, fightId]
            })
            return
        }
        alert('No fight ID.')
    }

    const deleteFightFromSeason = id => {
        setIsSubmitting(true)
        setFightId(id)
        const removed = form.fightIds.filter( fightId => fightId !== id)
        setForm({ ...form, fightIds: removed })
    }

    const handlePickerChange = (time, id) => {
        setPickerTime({ ...pickerTime, [id]: parseISO(new Date(time).toISOString()) })
        // setForm({ ...form, [id]: parseISO(new Date(time).toISOString()) })
    }


    const seasonStatusOptions = [
        {
            label: 'Active',
            value: SeasonStatus.ACTIVE
        },
        {
            label: 'Complete',
            value: SeasonStatus.COMPLETE
        },
        {
            label: 'Pending',
            value: SeasonStatus.PENDING
        },
    ]
    const { seasonName, seasonDescription, seasonStatus, seasonTagline } = form
    const { ends, starts } = pickerTime
    console.log('starts: ', starts)
    console.log('ends: ', ends)
    return (
        <Flex
            flexDir="column"
            minW="100%"
        >
            <Flex
                flexDir="column"
                w="100%" 
                p="4" 
                mx="auto"
            >
                <Flex 
                    w="100%"
                    flexDir="column"
                >
                    <SeasonsTable 
                        allSeasons={allSeasons}
                        handleDeleteSeason={handleDeleteSeason}
                        handleSeasonSelect={handleSeasonSelect}
                    />
                    <Divider my="8"/>
                </Flex>
                <form 
                    id="seasons_form" 
                    onSubmit={e => e.preventDefault()}
                >
                    <Stack spacing="4" divider={<StackDivider />}>
                        <FieldGroup title="Create or Update a Season">
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
                                        value={seasonTagline ? seasonTagline : ''} 
                                        onChange={handleFormChange} 
                                        type="text" 
                                        maxLength={100} 
                                    />
                                </FormControl>
                                
                                <FormControl id="seasonStatus">
                                    <FormLabel htmlFor="seasonStatus">Season Status</FormLabel>
                                    <Select defaultValue={'Set Status'} onChange={handleFormChange}>
                                        { seasonStatusOptions.map( option => <option key={option.value} value={option.value}>{option.label}</option>)

                                        }
                                    </Select>
                                </FormControl>
                                
                                <FormControl id="seasonDescription">
                                    <FormLabel>Season Description</FormLabel>
                                    <Textarea
                                        placeholder="Season Description..."
                                        value={seasonDescription ? seasonDescription : ''}
                                        onChange={handleFormChange}
                                        type="text"
                                        size='md'
                                        rows="4"
                                    />
                                </FormControl>

                                <FormControl>
                                    <FormLabel htmlFor="date-picker">Starts</FormLabel>
                                    <Datepicker
                                        dateFormat="MM/dd/yyyy"
                                        selected={starts}
                                        style={{ background: '#FFF', color: '#333 !important' }}
                                        onChange={time => handlePickerChange(time, 'starts')}
                                    />
                                </FormControl>

                                <FormControl>
                                    <FormLabel htmlFor="date-picker">Ends</FormLabel>
                                    <Datepicker 
                                        dateFormat="MM/dd/yyyy"
                                        selected={ends}
                                        style={{ background: '#FFF', color: '#333 !important' }}
                                        onChange={time => handlePickerChange(time, 'ends')}
                                    />
                                </FormControl>
                            </VStack>
                        </FieldGroup>
                    </Stack>
                </form>
            </Flex>
            <Divider my="8" />

            { form.seasonId &&
                <Flex
                    minW="100%"
                >
                    <SelectedSeasonTable 
                        deleteFightFromSeason={deleteFightFromSeason}
                        selectedSeason={selectedSeason}
                    />
                </Flex>
            }

            <Flex
                flexDir="column"
                p="4"
            >
                <Stack spacing="4" divider={<StackDivider />}>
                    <FieldGroup title="Add Fight">
                        <VStack width="full" spacing="6">
                            <FormControl id="fightId">
                                <FormLabel htmlFor="fightId">
                                    Add Fights by ID
                                </FormLabel>
                                <Input 
                                    value={fightId} 
                                    onChange={e => setFightId(e.currentTarget.value)} 
                                    type="text" 
                                    minLength={36}
                                    maxLength={36} 
                                />
                            </FormControl>
                            <ButtonGroup>
                                <Button
                                    disabled={isSubmitting}
                                    loadingText="Submitting..." 
                                    minW="40%"
                                    onClick={addFightToSeason}
                                    colorScheme="solid"
                                >
                                    Add Fight To Season
                                </Button>
                            </ButtonGroup>
                        </VStack>
                    </FieldGroup>
                </Stack>
            </Flex>
            <Divider my="4" />
            <FieldGroup my="4">
                <ButtonGroup width="full">
                    <Button 
                        disabled={isSubmitting}
                        loadingText="Updating..."
                        onClick={form.seasonId ? handleUpdateSeason : handleCreateSeason} 
                        type="submit" 
                        colorScheme="solid"
                    >
                        {form.seasonId ? `Update Season` : `Create Season`}
                    </Button>
                    <Button 
                        disabled={isSubmitting}
                        loadingText="Updating..."
                        onClick={handleDeleteSeason}
                        variant="outline"
                    >
                        Delete Season
                    </Button>
                    <Button 
                        disabled={isSubmitting}
                        loadingText="Updating..."
                        onClick={clearForm}
                        variant="outline"
                    >
                        Clear Form
                    </Button>
                </ButtonGroup>
            </FieldGroup>
        </Flex>
    )
}