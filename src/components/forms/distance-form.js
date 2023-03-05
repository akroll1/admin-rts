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
import { DistanceType, Status, useGlobalStore } from '../../stores'

export const DistanceForm = () => {
    const { 
        isSubmitting,
        selectedDistance,
        createDistance,
        deleteDistance,
        fetchDistance,
        updateDistance,
    } = useGlobalStore()

    // showId is kept out of the form for put/post logic.
    const [distanceId, setDistanceId] = useState(null);
    const [form, setForm] = useState({
        id: "",
        chatKey: null,
        description: "",
        distanceName: "",
        distanceType: "FIGHT",
        status: "PENDING",
        starts: new Date(),
        ends: new Date(),
    })    

    useEffect(() => {
        if(selectedDistance?.distanceId){
            console.log('SELECTED_DISTANCE')
            setForm({ 
                ...form, 
                ...selectedDistance,
                showIds: selectedDistance.showIds?.length ? selectedDistance.showIds : [],
                ends: new Date(selectedDistance.ends),
                starts: new Date(selectedDistance.starts)
            })
            setDistanceId(selectedDistance.distanceId)
            document.getElementById("distanceType").value = selectedDistance.distanceType;
            document.getElementById("status").value = selectedDistance.status;
        }
    },[selectedDistance])

    const searchForDistance = () => {
        fetchDistance(distanceId)
    };
    
    const handleUpdateDistance = () => {
        const putObj = {
            ...form,
            description: form.description,
            distanceIds: form?.distanceIds?.length ? form.distanceIds : null,
            distanceName: form.distanceName,
            distanceType: form.distanceType,
            status: form.status,
            starts: new Date(form.starts).toISOString(),
            ends: new Date(form.ends).toISOString(),
        }
        updateDistance(putObj)
    }
    const handleDeleteDistance = e => {
        const { id } = e.currentTarget;
        deleteDistance(form.distanceId)
    }
    const handlePostDistance = () => {
        const postObj = {
            ...form,
            id: form.id ? form.id : null,
            description: form.description,
            distanceIds: form?.distanceIds?.length ? form.distanceIds : null,
            distanceName: form.distanceName,
            distanceType: form.distanceType,
            status: form.status,
            starts: new Date(form.starts).toISOString(),
            ends: new Date(form.ends).toISOString(),
        };
        console.log('postObj: ', postObj);
        createDistance(postObj)
    }

    const handleFormChange = (e, type) => {
        const { id, value } = e.currentTarget;
        // they're now prefixed with form.
        setForm({...form, [id]: value});
    };

    const distanceTypeLabels = Object.keys(DistanceType).map( type => type)
    const distanceStatusLabels = Object.keys(Status).map( status => status);
    console.log('form: ', form)
    console.log('distanceId: ', distanceId)

    return (
        <Box px={{base: '4', md: '10'}} py="16" maxWidth="3xl" mx="auto">
            <form id="show_form" onSubmit={(e) => {e.preventDefault()}}>
                <Stack spacing="4" divider={<StackDivider />}>
                    <Heading size="lg" as="h1" paddingBottom="4">
                        Create Distance Form
                    </Heading>
                    <FieldGroup title="Search for a Distance">
                        <VStack width="full" spacing="6">
                            <FormControl id="id">
                                <FormLabel htmlFor="id">Distance ID</FormLabel>
                                <Input 
                                    value={form.id} 
                                    onChange={ ({ currentTarget: {value} }) => setDistanceId(value.length === 36 ? value : '')} 
                                    type="text" 
                                />
                            </FormControl>
                            <HStack justifyContent="center" width="full">
                                <Button 
                                    minW="33%" 
                                    disabled={!distanceId}  
                                    isLoading={isSubmitting} 
                                    loadingText="Searching..." 
                                    onClick={searchForDistance} 
                                    type="button" 
                                    colorScheme="solid">
                                    Search
                                </Button>
                            </HStack>
                        </VStack>
                    </FieldGroup>
                    <FieldGroup title="Distance Information">
                        <VStack width="full" spacing="6">
                            <FormControl isRequired id="distanceName">
                                <FormLabel htmlFor="distanceName">Distance Name</FormLabel>
                                <Input value={form.distanceName} onChange={handleFormChange}  type="text" maxLength={255} />
                            </FormControl>

                            <FormControl id="description">
                                <FormLabel htmlFor="description">Description</FormLabel>
                                    <Textarea value={form.description} onChange={handleFormChange} rows={4} />
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
                            onClick={distanceId ? handleUpdateDistance : handlePostDistance } 
                            type="button" 
                            colorScheme="solid"
                            isLoading={isSubmitting}
                            loadingText="Submitting..."
                        >
                            Submit
                        </Button>
                        <Button 
                            minW="33%" 
                            disabled={!distanceId} 
                            // isLoading={isSubmitting} 
                            loadingText="Deleting" 
                            onClick={handleDeleteDistance} 
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