import { 
    useState, 
    useEffect 
} from 'react'
import { 
    Button, 
    ButtonGroup, 
    Divider,
    Flex,
    FormControl, 
    FormLabel, 
    HStack,
    Input,
    Select, 
    Stack, 
    StackDivider, 
    Textarea, 
    VStack 
} from '@chakra-ui/react'
import { FieldGroup } from '../../chakra'
import { 
    DistancesTable, 
    DistanceShowsTable, 
    SelectedShowFightTable
} from '../tables';
import { 
    DistanceType,
    Status, 
    useGlobalStore 
} from '../../stores';
import Datepicker from 'react-datepicker'
import "react-datepicker/dist/react-datepicker.css"

export const DistancesAdminForm = () => {

    const {
        deleteDistance,
        distancesByStatusSummaries,
        fetchDistancesByStatus,
        updateDistance,
    } = useGlobalStore()
    
    const resetDistance = {
        distanceId: '',
        description: '',
        showIds: [],
        distanceName: '',
        distanceType: '',
        status: '',
        storyline: '',
        starts: 0,
        ends: 0,
    };

    const [selectedDistance, setSelectedDistance] = useState(resetDistance)
    const [selectedDistanceShows, setSelectedDistanceShows] = useState([])
    const [selectedShowFights, setSelectedShowFights] = useState([])
    useEffect(() => {
        fetchDistancesByStatus(Status.PENDING)
    },[])

    useEffect(() => {
        if(distancesByStatusSummaries?.length > 0){
            setSelectedDistance({
                ...distancesByStatusSummaries[0].distance,
                ends: new Date(distancesByStatusSummaries[0].distance.ends),
                starts: new Date(distancesByStatusSummaries[0].distance.starts)
            })
            document.getElementById("distanceType").value = distancesByStatusSummaries[0].distance.distanceType;
            document.getElementById("status").value = distancesByStatusSummaries[0].distance.status;
        
            setSelectedDistanceShows(distancesByStatusSummaries[0].shows)
            setSelectedShowFights(distancesByStatusSummaries[0]?.shows[0]?.fightSummaries.length > 0 
                ? distancesByStatusSummaries[0].shows[0].fightSummaries
                : []
            )
        }
    },[distancesByStatusSummaries])
   
    const clearDistance = () => {
        setSelectedDistance(resetDistance)
    }

    const handleFormChange = e => {
        const { id, value } = e.currentTarget;
        return setSelectedDistance(prev => ({...prev, [id]: value }));
    }
    
    const handleDistanceSelect = (e, distanceId) => {
        const [distance] = distancesByStatusSummaries.filter( distance => distance.distance.distanceId === distanceId);
        setSelectedDistance({ 
            ...distance.distance,
            starts: new Date(distance.distance.starts),
            ends: new Date(distance.distance.ends),
        })
        document.getElementById("distanceType").value = distance.distance.distanceType;
        document.getElementById("status").value = distance.distance.status;
        setSelectedDistanceShows(distance.shows)
        setSelectedShowFights(distancesByStatusSummaries[0]?.shows[0]?.fightSummaries.length > 0 
            ? distancesByStatusSummaries[0].shows[0].fightSummaries
            : []
        )    
    }
    
    const handleDeleteDistance = distanceId => {
        console.log('distanceId: ', distanceId)
        alert('Delete Distance: ' + distanceId)
        deleteDistance(selectedDistance.distanceId)
    }
    
    const handleUpdateDistance = () => {
        updateDistance(selectedDistance)
    }

    // const addFightToDistance = () => {
    //     if(fightId.length === 36){
    //         if(form.fightIds){
    //             const [isDuplicate] = form.fightIds.filter( id => id === fightId)
    //             if(isDuplicate) return alert('Fight is in this Season')
    //         }

    //         Object.assign(form, {
    //             fightIds: form.fightIds?.length > 0 ? [ ...form.fightIds, fightId] : [fightId]
    //         })
    //         // updateSeason(form)
    //         return
    //     }
    //     alert('Not a fight ID.')
    // }

    const deleteShowFromDistance = showId => {

        const removed = selectedDistance.showIds.filter( id => id !== showId)
        setSelectedDistance(prev => ({ ...prev, showIds: removed }))
        // patchRemoveFightFromSeason(fightId, seasonId)
    }

    const handleStatusSelect = e => {
        const { value } = e.currentTarget;
        fetchDistancesByStatus(value)
    }

    const handleDeleteShow = (e, id) => {
        console.log('id: ', id)
        const removed = selectedDistanceShows.filter( selectedShow => selectedShow.show.showId !== id)
        setSelectedDistanceShows(removed)
        setSelectedShowFights([])
    }
    const handleShowSelect = (e, id) => {
        console.log('id: ', id)
        // setSelectedShowFights()
    }
    const distanceTypeLabels = Object.keys(DistanceType).map( type => type)
    const distanceStatusLabels = Object.keys(Status).map( status => status);
    console.log("selectedDistanceShows: ", selectedDistanceShows)

    return (
        <Flex
            id="seasons_form"
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
                    <DistancesTable 
                        distancesByStatusSummaries={distancesByStatusSummaries}
                        handleDeleteDistance={handleDeleteDistance}
                        handleDistanceSelect={handleDistanceSelect}
                        handleStatusSelect={handleStatusSelect}
                        selectedDistanceId={selectedDistance?.distanceId ? selectedDistance.distanceId : ''}
                    />
                    <Divider my="8"/>

                    { selectedDistanceShows.length > 0 && 
                        <>
                            <DistanceShowsTable 
                                handleDeleteShow={handleDeleteShow}
                                handleShowSelect={handleShowSelect}
                                selectedDistanceShows={selectedDistanceShows}
                            />
                            <Divider my="8"/>
                        </>
                    }
                    { selectedShowFights.length > 0 &&  
                        <>
                            <SelectedShowFightTable
                                selectedShowFights={selectedShowFights}
                            />
                            <Divider my="8"/>
                    </>
                    }
                </Flex>
                <form 
                    id="seasons_form" 
                    onSubmit={e => e.preventDefault()}
                >
                    <Stack spacing="4" divider={<StackDivider />}>
                        <FieldGroup title="Update a Distance">
                            <VStack width="full" spacing="6">
                                <FormControl id="distanceName">
                                <FormLabel htmlFor="distanceName">Distance Name</FormLabel>
                                    <Input 
                                        value={selectedDistance.distanceName} 
                                        onChange={handleFormChange} 
                                        type="text" 
                                        maxLength={100} 
                                    />
                                </FormControl>

                                <FormControl id="description">
                                    <FormLabel htmlFor="description">Distance Description</FormLabel>
                                    <Input 
                                        value={selectedDistance.description ? selectedDistance.description : ''} 
                                        onChange={handleFormChange} 
                                        type="text" 
                                        maxLength={100} 
                                    />
                                </FormControl>
                                
                                <FormControl id="distanceType">
                                <FormLabel htmlFor="distanceType">Distance Type</FormLabel>
                                <Select onChange={handleFormChange}>
                                    { distanceTypeLabels.map( type => {
                                        return (
                                            <option 
                                                placeholder='Type' 
                                                key={type} 
                                                value={type}
                                            >
                                                {type}
                                            </option>
                                        )
                                    })}
                                </Select>                            
                            </FormControl>
                            <FormControl id="status">
                                <FormLabel htmlFor="status">Distance Status</FormLabel>
                                <Select onChange={handleFormChange}>
                                    { distanceStatusLabels.map( status => {
                                        return (
                                            <option 
                                                placeholder='Type' 
                                                key={status} 
                                                value={status}
                                            >
                                                {status}
                                            </option>
                                        )
                                    })}
                                </Select>                            
                            </FormControl>
                                
                                <FormControl id="description">
                                    <FormLabel>Description</FormLabel>
                                    <Textarea
                                        placeholder="Description..."
                                        value={selectedDistance.description ? selectedDistance.description : ''}
                                        onChange={handleFormChange}
                                        type="text"
                                        size='md'
                                        rows="4"
                                    />
                                </FormControl>

                                <FormControl>
                                    <FormLabel htmlFor="date-picker">Starts</FormLabel>
                                    <Datepicker 
                                    id="date-picker"
                                    dateFormat="MM/dd/yyyy"                                    
                                    selected={selectedDistance.starts}
                                    style={{background: '#FFF', color: '#333 !important'}}
                                    onChange={time => setSelectedDistance({ ...selectedDistance, starts: time })}
                                />
                                </FormControl>

                                <Datepicker 
                                    id="date-picker"
                                    dateFormat="MM/dd/yyyy"                                    
                                    selected={selectedDistance.ends}
                                    style={{background: '#FFF', color: '#333 !important'}}
                                    onChange={time => setSelectedDistance({ ...selectedDistance, ends: time })}
                                />
                            </VStack>
                        </FieldGroup>
                    </Stack>
                </form>
            </Flex>


            {/* { form.seasonId &&
                <Flex
                    minW="100%"
                >
                    <SelectedSeasonFightTable 
                        deleteFightFromDistance={deleteFightFromDistance}
                        selectedSeasonFights={selectedSeasonFights}
                    />
                </Flex>
            } */}

            {/* <Flex
                flexDir="column"
                p="4"
            >
                <Stack spacing="4" divider={<StackDivider />}>
                    <FieldGroup title="Add Fight">
                        <VStack width="full" spacing="6">
                            <FormControl id="fightId">
                                <FormLabel htmlFor="fightId">
                                    Add Fight by ID
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
                                    disabled={isSubmitting || !fightId}
                                    loadingText="Submitting..." 
                                    minW="40%"
                                    onClick={addFightToDistance}
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
                        onClick={form.seasonId ? handleUpdateDistance : handleCreateSeason} 
                        type="submit" 
                        colorScheme="solid"
                    >
                        {form.seasonId ? `Update Season` : `Create Season`}
                    </Button>
                    <Button 
                        disabled={isSubmitting}
                        loadingText="Updating..."
                        onClick={handleDeleteDistance}
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
            */}
        </Flex>
    )
}