import { useState, useEffect } from 'react'
import { 
    Box, 
    Button, 
    ButtonGroup, 
    Flex,
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
import { EventType, Status, useGlobalStore } from '../../stores'

export const CreateEventForm = () => {
    const { 
        isSubmitting,
        selectedEvent,
        createEvent,
        deleteEvent,
        fetchEvent,
        updateEvent,
    } = useGlobalStore()

    // showId is kept out of the form for put/post logic.
    const [eventId, setEventId] = useState(null);
    const [showId, setShowId] = useState(null)
    const [form, setForm] = useState({
        description: "",
        eventName: "",
        eventType: "",
        showIds: [],
        status: "",
        storyline: "",
        starts: "",
        ends: "",
    })    

    useEffect(() => {
        if(selectedEvent?.eventId){
            console.log('SELECTED_EVENT')
            setForm({ 
                ...form, 
                ...selectedEvent,
                showIds: selectedEvent.showIds?.length ? selectedEvent.showIds : [],
                ends: new Date(selectedEvent.ends),
                starts: new Date(selectedEvent.starts)
            })
            setEventId(selectedEvent.eventId)
            document.getElementById("eventType").value = selectedEvent.eventType;
            document.getElementById("status").value = selectedEvent.status;
        }
    },[selectedEvent])

    const searchForEvent = () => {
        fetchEvent(eventId)
    };
    
    const handleUpdateEvent = () => {
        const putObj = {
            ...form,
            showIds: form.showId.length ? form.showIds : null,
            starts: new Date(form.starts).toISOString(),
            ends: new Date(form.ends).toISOString(),
        }
        updateEvent(putObj)
    }
    const handleDeleteEvent = e => {
        deleteEvent(eventId)
    }
    const handlePostEvent = () => {
        const postObj = {
            ...form,
            showIds: form.showIds.length ? form.showIds : null,
            starts: new Date(form.starts).toISOString(),
            ends: new Date(form.ends).toISOString(),
        };
        console.log('postObj: ', postObj);
        createEvent(postObj)
    }

    const handleFormChange = (e, type) => {
        const { id, value } = e.currentTarget;
        // they're now prefixed with form.
        setForm({...form, [id]: value});
    };

     const addFightToEvent = () => {
        if(showId.length === 36){
            if(!form.eventName) return alert('Select an Event')
            if(form.showIds){
                const [isDuplicate] = form.showIds.filter( id => id === showId)
                if(isDuplicate) return alert('Fight is in this Season')
            }

            Object.assign(form, {
                eventId,
                showIds: form.showIds?.length > 0 ? [ ...form.showIds, showId] : [showId]
            })
            updateEvent(form)
            return
        }
        alert('Not a fight ID.')
    }

    const deleteFightFromEvent = showId => {

        setShowId(showId)
        const removed = form.showIds.filter( id => id !== showId)
        setForm({ ...form, showIds: removed })
        // patchRemoveFightFromEvent(showId, eventId)
    }

    const eventTypeLabels = Object.keys(EventType).map( type => type)
    const eventStatusLabels = Object.keys(Status).map( status => status);
    console.log('form: ', form)
    console.log('eventId: ', eventId)

    return (
        <Box px={{base: '4', md: '10'}} py="16" maxWidth="3xl" mx="auto">
            <form id="show_form" onSubmit={(e) => {e.preventDefault()}}>
                <Stack spacing="4" divider={<StackDivider />}>
                    <Heading size="lg" as="h1" paddingBottom="4">
                        Event (Target) Form
                    </Heading>
                    <FieldGroup title="Search for an Event">
                        <VStack width="full" spacing="6">
                            <FormControl id="eventId">
                                <FormLabel htmlFor="eventId">Event ID</FormLabel>
                                <Input 
                                    value={eventId} 
                                    onChange={ ({ currentTarget: {value} }) => setEventId(value.length === 36 ? value : '')} 
                                    type="text" 
                                />
                            </FormControl>
                            <HStack justifyContent="center" width="full">
                                <Button 
                                    disabled={!eventId}  
                                    minW="33%" 
                                    isLoading={isSubmitting} 
                                    loadingText="Searching..." 
                                    onClick={searchForEvent} 
                                    type="button" 
                                    colorScheme="solid">
                                    Search
                                </Button>
                            </HStack>
                        </VStack>
                    </FieldGroup>
                    <FieldGroup title="Event Information">
                        <VStack width="full" spacing="6">
                            <FormControl isRequired id="eventName">
                                <FormLabel htmlFor="eventName">Event Name</FormLabel>
                                <Input value={form.eventName} onChange={handleFormChange}  type="text" maxLength={255} />
                            </FormControl>
                            
                            <FormControl id="storyline">
                                <FormLabel htmlFor="storyline">Event Storyline</FormLabel>
                                    <Textarea value={form.storyline} onChange={handleFormChange} rows={4} />
                                <FormHelperText>
                                    Brief description of the EVENT's significance. URLs are hyperlinked.
                                </FormHelperText>
                            </FormControl>

                            <FormControl id="description">
                                <FormLabel htmlFor="description">Description</FormLabel>
                                    <Textarea value={form.description} onChange={handleFormChange} rows={4} />
                            </FormControl>

                            <FormControl id="eventType">
                                <FormLabel htmlFor="eventType">Event Type</FormLabel>
                                <Select onChange={handleFormChange}>
                                    { eventTypeLabels.map( type => {
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
                                <FormLabel htmlFor="status">Event Status</FormLabel>
                                <Select onChange={handleFormChange}>
                                    { eventStatusLabels.map( status => {
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
                
                            <FormControl>
                                <FormLabel htmlFor="date-picker">Start time</FormLabel>
                                <Datepicker 
                                    id="date-picker"
                                    dateFormat="MM/dd/yyyy"                                    
                                    selected={form.starts}
                                    style={{background: '#FFF', color: '#333 !important'}}
                                    onChange={time => setForm({ ...form, starts: time })}
                                />
                            </FormControl>
                            <FormControl>
                                <FormLabel htmlFor="date-picker">End time</FormLabel>
                                <Datepicker 
                                    // onSelect={date => setForm({ ...form, ends: new Date().toISOString() })}
                                    id="date-picker"
                                    dateFormat="MM/dd/yyyy"                                    
                                    selected={form.ends}
                                    style={{background: '#FFF', color: '#333 !important'}}
                                    onChange={time => setForm({ ...form, ends: time })}
                                />
                            </FormControl>
                        </VStack>
                    </FieldGroup>
                </Stack>
                <FieldGroup mt="8">
                    <ButtonGroup w="100%">
                        <Button 
                            minW="33%"
                            onClick={eventId ? handleUpdateEvent : handlePostEvent } 
                            type="button" 
                            colorScheme="solid"
                            isLoading={isSubmitting}
                            loadingText="Submitting..."
                        >
                            Submit
                        </Button>
                        <Button 
                            minW="33%" 
                            disabled={!eventId} 
                            // isLoading={isSubmitting} 
                            loadingText="Deleting" 
                            onClick={handleDeleteEvent} 
                            variant="outline"
                        >
                            Delete
                        </Button>
                    </ButtonGroup>
                </FieldGroup>
            </form>

            {/* { form.eventId &&
                <Flex
                    minW="100%"
                >
                    <SelectedSeasonFightTable 
                        deleteFightFromSeason={deleteFightFromSeason}
                        selectedSeasonFights={selectedSeasonFights}
                    />
                </Flex>
            } */}

        </Box>
    )
}