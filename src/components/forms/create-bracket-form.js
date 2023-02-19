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

export const CreateBracketForm = () => {
    const { 
        isSubmitting,
        selectedBracket,
        createBracket,
        deletBrackett,
        fetchBracket,
        updateBracket,
    } = useGlobalStore()

    // showId is kept out of the form for put/post logic.
    const [bracketId, setBracketId] = useState(null);
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
        if(selectedBracket?.bracketId){
            setForm({ 
                ...form, 
                ...selectedBracket,
            })
            setBracketId(selectedBracket.bracketId)
        }
    },[selectedBracket])

    const searchForBracket = e => {
        fetchEvent(eventId)
    };

    const handlePostBracket = () => {
        const postObj = Object.assign(form, {})

        console.log('postObj: ', postObj);

    }
    
    const handleUpdateBracket = () => {
        updateEvent(form)
    }
    const handleDeleteBracket = e => {
        deleteBracket(eventId)
    }
    const handlePostBracket = () => {
        console.log('form: ', form)
        createBracket(form)
    }

    const handleFormChange = (e, type) => {
        const { name, id, value } = e.currentTarget;
        setForm({...form, [id]: value});
    };

    console.log('form: ', form)

    return (
        <Box px={{base: '4', md: '10'}} py="16" maxWidth="3xl" mx="auto">
            <form id="show_form" onSubmit={(e) => {e.preventDefault()}}>
                <Stack spacing="4" divider={<StackDivider />}>
                    <Heading size="lg" as="h1" paddingBottom="4">
                        Bracket Form
                    </Heading>
                    <FieldGroup title="Search for a Bracket">
                        <VStack width="full" spacing="6">
                            <FormControl id="eventId">
                                <FormLabel htmlFor="eventId">Event ID</FormLabel>
                                <Input 
                                    value={Id} 
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

                            <FormControl id="showStoryline">
                                <FormLabel htmlFor="showStoryline">Storyline</FormLabel>
                                    <Textarea value={showStoryline} onChange={handleFormChange} rows={5} />
                                <FormHelperText>
                                    Brief description of the fight significance. URLs are hyperlinked.
                                </FormHelperText>
                            </FormControl>

                            <FormControl id="eventType">
                                <FormLabel htmlFor="eventStatus">Event Status</FormLabel>
                                <Select onChange={handleFormChange}>
                                    { EVENT_TYPE.map( type => {
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
                                    { STATUS.map( status => {
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