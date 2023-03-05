import { useState, useEffect } from 'react'
import { 
    Box, 
    Button, 
    ButtonGroup, 
    FormControl, 
    FormHelperText, 
    FormLabel, 
    Heading, 
    HStack, 
    Input, 
    Select, 
    Stack, 
    StackDivider, 
    Textarea, 
    VStack 
} from '@chakra-ui/react'
import { FieldGroup } from '../../chakra'
import Datepicker from 'react-datepicker'
import "react-datepicker/dist/react-datepicker.css"
import { Networks, SeasonType, Status } from '../../stores'
import { useGlobalStore } from '../../stores'

export const SeasonForm = () => {
    const { 
        createSeason,
        deleteSeason,
        fetchSeason,
        isSubmitting,
        selectedSeason,
        updateSeason,
    } = useGlobalStore()

    const [form, setForm] = useState({
        id: '', 
        chatKey: null,
        description: '',
        distanceIds: null,
        distanceName: '',
        distanceType: "SEASON",
        status: "PENDING",
        starts: new Date(),
        ends: new Date(),
    })    

    const fetchSeasonById = e => {
        fetchSeason(form.id)
    };

    const handlePostSeason = () => {
        
        const distance = {
            id: form.id ? form.id : null, // not sure how to handle yet, form and distance.
            chatKey: null,
            description: form.description ? form.description : null,
            distanceIds: null,
            distanceName: form.distanceName,
            distanceType: "SHOW",
            starts: new Date(form.starts).toISOString(),
            ends: new Date(form.ends).toISOString(),
            status: form.status ? form.status: null,
        };
        
        const season = {
            id: form.id ? form.id : null,
            type: SeasonType.MONTH,
        }
        const seasonWithDistanceObj = {
            distance,
            season,
        }

        console.log('seasonWithDistanceObj: ', seasonWithDistanceObj);

        createSeason(seasonWithDistanceObj)
    }
    
    const handleUpdateSeason = () => {
        updateSeason(form)
    }
    const handleDeleteSeason = e => {
        deleteSeason(form.id)
    }

    const handleFormChange = (e, type) => {
        const { id, value } = e.currentTarget;
        setForm({...form, [id]: value});
    };

    return (
        <Box px={{base: '4', md: '10'}} py="16" maxWidth="3xl" mx="auto">
            <form id="show_form" onSubmit={(e) => {e.preventDefault()}}>
                <Stack spacing="4" divider={<StackDivider />}>
                    <Heading size="lg" as="h1" paddingBottom="4">
                        Season Form
                    </Heading>
                    <FieldGroup title="Search for a Season">
                        <VStack width="full" spacing="6">
                            <FormControl id="id">
                                <FormLabel htmlFor="id">Season ID</FormLabel>
                                <Input 
                                    value={form.id} 
                                    onChange={ ({ currentTarget: {value} }) => handleFormChange(value.length === 36 ? value : '')} 
                                    type="text" 
                                />
                            </FormControl>
                            <HStack justifyContent="center" width="full">
                                <Button 
                                    disabled={!form.id}  
                                    minW="33%" 
                                    isLoading={isSubmitting} 
                                    loadingText="Searching..." 
                                    // onClick={searchForSeason} 
                                    type="button" 
                                    colorScheme="solid">
                                    Search
                                </Button>
                            </HStack>
                        </VStack>
                    </FieldGroup>
                    <FieldGroup title="Show Information">
                        <VStack width="full" spacing="6">
                            <FormControl isRequired id="id">
                                <FormLabel htmlFor="id">Season ID</FormLabel>
                                <Input value={form.id} onChange={handleFormChange}  type="text" maxLength={255} />
                            </FormControl>
                            <FormControl isRequired id="distanceName">
                                <FormLabel htmlFor="distanceName">Season Name</FormLabel>
                                <Input value={form.distanceName} onChange={handleFormChange}  type="text" maxLength={255} />
                            </FormControl>

                            <FormControl id="status">
                                <FormLabel htmlFor="status">Season/Distance Status</FormLabel>
                                <Select onChange={handleFormChange}>
                                    { Object.keys(Status).map( status => <option key={status} value={status}>{status}</option>)}
                                </Select>                            
                            </FormControl>
                
                            <FormControl>
                                <FormLabel htmlFor="date-picker">Date and Time</FormLabel>
                            </FormControl>
                            <FormControl>
                                <FormLabel htmlFor="date-picker">Starts</FormLabel>
                                <Datepicker 
                                    id="starts"
                                    dateFormat="Pp"     
                                    timeFormat="p"    
                                    showTimeSelect                           
                                    selected={form.starts}
                                    style={{background: '#FFF', color: '#333 !important'}}
                                    onChange={time => setForm({ ...form, starts: time })}
                                />
                            </FormControl>
                            <FormControl>
                                <FormLabel htmlFor="date-picker">Starts</FormLabel>
                                <Datepicker 
                                    id="ends"
                                    dateFormat="Pp"     
                                    timeFormat="p"    
                                    showTimeSelect                           
                                    selected={form.ends}
                                    style={{background: '#FFF', color: '#333 !important'}}
                                    onChange={time => setForm({ ...form, ends: time })}
                                />
                            </FormControl>
                            <FormControl id="description">
                                <FormLabel htmlFor="description">Distance Description</FormLabel>
                                    <Textarea value={form.description} onChange={handleFormChange} rows={5} />
                            </FormControl>
                        </VStack>
                    </FieldGroup>
                </Stack>
                <FieldGroup mt="8">
                    <ButtonGroup w="100%">
                        <Button 
                            minW="33%"
                            onClick={handlePostSeason} 
                            type="button" 
                            colorScheme="solid"
                            isLoading={isSubmitting}
                            loadingText="Submitting..."
                        >
                            Submit
                        </Button>
                        <Button 
                            minW="33%" 
                            disabled={!form.id} 
                            // isLoading={isSubmitting} 
                            loadingText="Deleting" 
                            onClick={handleDeleteSeason} 
                            variant="outline"
                        >
                            Delete
                        </Button>
                    </ButtonGroup>
                </FieldGroup>
            </form>
            {/* <ShowFormFightersTable fights={fights} deleteFight={deleteFight} /> */}
        </Box>
    )
}