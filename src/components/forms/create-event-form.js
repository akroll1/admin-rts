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
import { EVENT_TYPE, STATUS } from '../../utils'
import { useGlobalStore } from '../../stores'

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
    const [form, setForm] = useState({
        description: "",
        eventName: "",
        eventType: "",
        status: "",
        storyline: "",
        typeIds: "",
        starts: "",
        ends: "",
    })    

    useEffect(() => {
        if(selectedEvent?.eventId){
            setForm({ 
                ...form, 
                ...selectedEvent,
            })
            setEventId(selectedEvent.eventId)
        }
    },[selectedEvent])

    const searchForEvent = e => {
        fetchEvent(eventId)
    };

    const handlePostShow = () => {
        const postObj = Object.assign(form, {})

        console.log('postObj: ', postObj);

    }
    
    const handleUpdateEvent = () => {
        updateEvent(form)
    }
    const handleDeleteEvent = e => {
        deleteEvent(eventId)
    }
    const handlePostEvent = () => {
        console.log('form: ', form)
        createEvent(form)
    }

    const handleFormChange = (e, type) => {
        const { id, value } = e.currentTarget;
        // they're now prefixed with form.
        setForm({...form, [id]: value});
    };

    console.log('form: ', form)

    const eventTypeLabels = [
        {label: "Fight", value: "FIGHT"},
        {label: "Show", value: "SHOW" },
        {label: "Season-fights", value: "SEASON_FIGHTS"},
        {label: "Season-shows", value: "SEASON_SHOWS"},
    ];
    const eventStatusLabels = [
        {label: "ACTIVE", value: "ACTIVE"},
        {label: "CANCELED", value: "CANCELED"},
        {label: "COMPLETE", value: "COMPLETE"},
        {label: "FANTASY", value: "FANTASY"},
        {label: "HISTORICAL", value: "HISTORICAL"},
        {label: "PENDING", value: "PENDING"},
        {label: "TESTING", value: "TESTING"},
    ]
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

                            <FormControl id="eventId">
                                <FormLabel htmlFor="eventId">Event ID</FormLabel>
                                <Input name="eventId" value={form.eventId} onChange={handleFormChange} type="text" maxLength={200} />
                            </FormControl>
                            
                            <FormControl id="description">
                                <FormLabel htmlFor="description">Event Description</FormLabel>
                                <Input value={form.description} onChange={handleFormChange}  type="text" maxLength={255} />
                            </FormControl>

                            <FormControl id="storyline">
                                <FormLabel htmlFor="storyline">Event Storyline</FormLabel>
                                    <Textarea value={form.storyline} onChange={handleFormChange} rows={5} />
                                <FormHelperText>
                                    Brief description of the EVENT's significance. URLs are hyperlinked.
                                </FormHelperText>
                            </FormControl>

                            <FormControl id="eventType">
                                <FormLabel htmlFor="eventType">Event Type</FormLabel>
                                <Select onChange={handleFormChange}>
                                    { eventTypeLabels.map( type => {
                                        return (
                                            <option 
                                                placeholder='Type' 
                                                key={type.value} 
                                                value={type.value}
                                            >
                                                {type.label}
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
                                                key={status.value} 
                                                value={status.value}
                                            >
                                                {status.label}
                                            </option>
                                        )
                                    })}
                                </Select>                            
                            </FormControl>
                
                            <FormControl>
                                <FormLabel htmlFor="date-picker">Start time</FormLabel>
                                <Datepicker 
                                    id="date-picker"
                                    showTimeSelect
                                    dateFormat="Pp"
                                    selected={form.starts}
                                    style={{background: '#FFF', color: '#333 !important'}}
                                    onChange={time => setForm({ ...form, starts: time })}
                                />
                            </FormControl>
                            <FormControl>
                                <FormLabel htmlFor="date-picker">End time</FormLabel>
                                <Datepicker 
                                    id="date-picker"
                                    showTimeSelect
                                    dateFormat="Pp"
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
                            onClick={ eventId ? handleUpdateEvent : handlePostEvent } 
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
        </Box>
    )
}