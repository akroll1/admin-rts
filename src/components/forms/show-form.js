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
import { NetworkEnum, Status, formattedShowTime } from '../../stores'
import { useGlobalStore } from '../../stores'

export const ShowForm = () => {
    const { 
        createShow,
        deleteShow,
        fetchShow,
        isSubmitting,
        show,
        updateShow,
    } = useGlobalStore()

    // showId is kept out of the form for put/post logic.
    const [showId, setShowId] = useState(null);
    const [form, setForm] = useState({
        fightId: '', 
        location: '',
        network: '',
        promoter: '',
        showName: '',
        showStoryline: '',
        showTime: 0,
    })    

    useEffect(() => {
        if(show?.showId){
            setForm({ 
                ...form, 
                ...show,
                fightId: show.fightIds[0]
            })
            setShowId(show.showId)
        }
    },[show])

    const searchForShow = e => {
        fetchShow(showId)
    };

    const handlePostShow = () => {
        const postObj = Object.assign(form, { 
            showTime: formattedShowTime(showTime), 
            fightIds: [fightId],
            showId: null
        })

        console.log('postObj: ', postObj);

        createShow(postObj)
        // setForm({
        //     fightIds: '', 
        //     location: '',
        //     network: '',
        //     promoter: '',
        //     showName: '',
        //     showStoryline: '',
        //     showTime: 0,
        // })
    }
    
    const handleUpdateShow = () => {
        updateShow(form)
    }
    const handleDeleteShow = e => {
        deleteShow(showId)
    }

    const handleFormChange = (e, type) => {
        const { name, id, value } = e.currentTarget;
        setForm({...form, [id]: value});
    };

    const { 
        fightId, 
        location, 
        network,
        promoter, 
        showName, 
        showStoryline, 
        showTime 
    } = form;

    console.log('form: ', form)
    return (
        <Box px={{base: '4', md: '10'}} py="16" maxWidth="3xl" mx="auto">
            <form id="show_form" onSubmit={(e) => {e.preventDefault()}}>
                <Stack spacing="4" divider={<StackDivider />}>
                    <Heading size="lg" as="h1" paddingBottom="4">
                        Show Form
                    </Heading>
                    <FieldGroup title="Search for a Show">
                        <VStack width="full" spacing="6">
                            <FormControl id="showId">
                                <FormLabel htmlFor="showId">Show ID</FormLabel>
                                <Input 
                                    value={showId} 
                                    onChange={ ({ currentTarget: {value} }) => setShowId(value.length === 36 ? value : '')} 
                                    type="text" 
                                />
                            </FormControl>
                            <HStack justifyContent="center" width="full">
                                <Button 
                                    disabled={!showId}  
                                    minW="33%" 
                                    isLoading={isSubmitting} 
                                    loadingText="Searching..." 
                                    onClick={searchForShow} 
                                    type="button" 
                                    colorScheme="solid">
                                    Search
                                </Button>
                            </HStack>
                        </VStack>
                    </FieldGroup>
                    <FieldGroup title="Show Information">
                        <VStack width="full" spacing="6">
                            <FormControl isRequired id="showName">
                                <FormLabel htmlFor="showName">Show Name</FormLabel>
                                <Input value={showName} onChange={handleFormChange}  type="text" maxLength={255} />
                            </FormControl>

                            <FormControl id="fightId">
                                <FormLabel htmlFor="fightId">Fight ID</FormLabel>
                                <Input name="fightId" value={fightId} onChange={handleFormChange} type="text" maxLength={200} />
                            </FormControl>
                            
                            <FormControl id="location">
                                <FormLabel htmlFor="location">Location</FormLabel>
                                <Input value={location} onChange={handleFormChange}  type="text" maxLength={255} />
                            </FormControl>
                            
                            <FormControl id="promoter">
                                <FormLabel htmlFor="promoter">Promoter</FormLabel>
                                <Input value={promoter} onChange={handleFormChange}  type="text" maxLength={255} />
                            </FormControl>

                            <FormControl id="network">
                                <FormLabel htmlFor="network">Network</FormLabel>
                                <Select placeholder={form.network || 'Network'} onChange={handleFormChange}>
                                    { Object.keys(NetworkEnum).map( network => <option key={network} value={network}>{network}</option>)}
                                </Select>                            
                            </FormControl>

                            { showId && 
                                <FormControl id="showStatus">
                                    <FormLabel htmlFor="showStatus">Show Status</FormLabel>
                                    <Select onChange={handleFormChange}>
                                        { Status.map( status => <option placeholder='hey' key={status.value} value={status.value}>{status.label}</option>)}
                                    </Select>                            
                                </FormControl>
                            }
                
                            <FormControl>
                                <FormLabel htmlFor="date-picker">Date and Time</FormLabel>
                                <Datepicker 
                                    id="date-picker"
                                    showTimeSelect
                                    dateFormat="Pp"
                                    selected={showTime}
                                    style={{background: '#FFF', color: '#333 !important'}}
                                    onChange={showTime => setForm({ ...form, showTime })}
                                />
                            </FormControl>
                            <FormControl id="showStoryline">
                                <FormLabel htmlFor="showStoryline">Storyline</FormLabel>
                                    <Textarea value={showStoryline} onChange={handleFormChange} rows={5} />
                                <FormHelperText>
                                    Brief description of the fight significance. URLs are hyperlinked.
                                </FormHelperText>
                            </FormControl>
                        </VStack>
                    </FieldGroup>
                </Stack>
                <FieldGroup mt="8">
                    <ButtonGroup w="100%">
                        <Button 
                            minW="33%"
                            onClick={ showId ? handleUpdateShow : handlePostShow } 
                            type="button" 
                            colorScheme="solid"
                            isLoading={isSubmitting}
                            loadingText="Submitting..."
                        >
                            Submit
                        </Button>
                        <Button 
                            minW="33%" 
                            disabled={!showId} 
                            // isLoading={isSubmitting} 
                            loadingText="Deleting" 
                            onClick={handleDeleteShow} 
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