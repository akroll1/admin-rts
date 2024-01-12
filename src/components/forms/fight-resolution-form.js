import { useState, useEffect } from 'react'
import { 
    Box,
    Button, 
    ButtonGroup, 
    FormControl, 
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
import { useGlobalStore } from '../../stores'
import Datepicker from 'react-datepicker'
import { officialResultOptions } from '../../stores'

export const FightResolutionForm = () => {
    const [searchId, setSearchId] = useState('')    
    const [officialResultForm, setOfficialResultForm] = useState({
        winnerId: '',
        resolution: '',
    })
    const [form, setForm] = useState({
        id: '',
        description: '',
        parent: '',
        storyline: '',
        subtitle: '',
        syncs: '',
        title: '',
        starts: new Date(),
        ends: new Date(),
        createdAt: '',
        updatedAt: '',
        isMainEvent: false, 
        isTitleFight: false, 
        officialResult: '', 
        rounds: 3,  
        location: '',
        network: '',
        promoter: '',
        seasonType: '',
        status: 'PENDING',
        type: '',
        typeIds: [],
        weightclass: '',
        winnerId: '', 
    });

    const { 
        fetchDistanceById,
        isSubmitting,
        selectedDistance,
        updateFightResolution,
    } = useGlobalStore()

    useEffect(() => {
        if(selectedDistance?.id){
            const { id, instance, metas, status, type } = selectedDistance
            if(type === 'SHOW'){
                console.log('SHOW ID: ', id)
                console.log('FIGHT ID: ', metas?.typeIds?.toString())
                alert(`SHOW: ${metas.title} \n\nFIGHT ID: \n${metas?.typeIds?.toString()}`)
                return
            }
            setForm({
                ...form,
                id: id ? id : '',
                description: metas.description ? metas.description : '',
                parent: metas.parent ? metas.parent : '',
                storyline: metas.storyline ? metas.storyline : '',
                subtitle: metas.subtitle ? metas.subtitle : '',
                syncs: metas.syncs ? metas.syncs : '',
                title: metas.title ? metas.title : '',
                starts: metas.starts ? new Date(metas.starts) : new Date(),
                ends: metas.ends ? new Date(metas.ends) : new Date(),
                createdAt: metas.createdAt ? metas.createdAt : '',
                updatedAt: metas.updatedAt ? metas.updatedAt : '',
                // FIGHT
                isMainEvent: instance.isMainEvent ? true : false, 
                isTitleFight: instance.isTitleFight ? true : false, 
                officialResult: instance.officialResult || '',
                rounds: instance.rounds ? instance.rounds : 3,  
                weightclass: instance.weightclass ? instance.weightclass : '',  
                // SHOW
                location: instance.location ? instance.location : '',
                network: instance.network ? instance.network : 'NONE',
                promoter: instance.promoter ? instance.promoter : '',
                status: instance.status ? instance.status : "PENDING",
                type,
                seasonType: instance.seasonType ? instance.seasonType : '',
                typeIds: metas.typeIds ? metas.typeIds : [],
            })
        }
    },[selectedDistance])

    const handleSearchForDistance = () => {
        fetchDistanceById(searchId)
    }
    const handleSubmitResolution = () => {
        /**
        * @params resolution: `${officialResultForm.winnerId}:${officialResultForm.resolution}`, fightId: form.id, rounds: form.rounds 
        */
        const resolution = `${officialResultForm.winnerId}:${officialResultForm.resolution}`;
        updateFightResolution(form?.id, resolution, form?.rounds)
    }
    const handleFormChange = e => {
        const { id, value } = e.currentTarget;
        setForm({ ...form, [id]: value });
    };
    const handleOfficialResultChange = e => {
        const { id, value } = e.currentTarget;
        setOfficialResultForm({ ...officialResultForm, [id]: value });
    }

    // console.log('form: ', form)
    // console.log('officialResultForm: ', officialResultForm)

    return (
        <Box px={{base: '4', md: '10'}} py="16" maxWidth="3xl" mx="auto">
            <Heading size="lg" as="h1" paddingBottom="4">
                Resolutions Form
            </Heading>
            <FieldGroup title="Search Distances">
                <VStack width="full" spacing="6">
                    <FormControl id="searchId">
                        <FormLabel htmlFor="searchId">Distance ID</FormLabel>
                        <Input value={searchId} onChange={e => setSearchId(e.currentTarget.value)} type="text"  />
                    </FormControl>
                    <HStack justifyContent="center" width="full">
                        <Button 
                            disabled={searchId.length !== 36} 
                            minW="33%" 
                            // isLoading={isSubmitting} 
                            loadingText="Searching..." 
                            onClick={handleSearchForDistance} 
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
                    { form?.id && <>
                        <FieldGroup title="Metas">
                            <VStack width="full" spacing="6">

                                <FormControl id="parent">
                                    <FormLabel htmlFor="parent">Parent ID</FormLabel>
                                    <Input value={form.parent} onChange={handleFormChange} type="text" maxLength={36} />
                                </FormControl>
                                <FormControl id="title">
                                    <FormLabel htmlFor="title">Title</FormLabel>
                                    <Input value={form.title} onChange={handleFormChange} type="text" maxLength={36} />
                                </FormControl>
                                <FormControl id="subtitle">
                                    <FormLabel htmlFor="subtitle">Subtitle</FormLabel>
                                    <Input value={form.subtitle} onChange={handleFormChange} type="text" maxLength={36} />
                                </FormControl>
                                <FormControl id="description">
                                    <FormLabel htmlFor="description">Description</FormLabel>
                                        <Textarea value={form.description} onChange={handleFormChange} rows={3} />
                                </FormControl>
                                <FormControl id="storyline">
                                    <FormLabel htmlFor="storyline">Storyline</FormLabel>
                                        <Textarea value={form.storyline} onChange={handleFormChange} rows={3} />
                                </FormControl>
                                <FormControl>
                                    <FormLabel htmlFor="starts">Starts</FormLabel>
                                    <Datepicker 
                                        id="starts"
                                        dateFormat="Pp"     
                                        timeFormat="p"    
                                        showTimeSelect                           
                                        selected={form.starts}
                                        style={{background: '#FFF', color: '#333 !important'}}
                                        // onChange={time => setForm({ ...form, starts: time })}
                                    />
                                </FormControl>
                            </VStack>
                        </FieldGroup>
                        <FieldGroup title="Resolution">
                            <VStack width="full" spacing="6">
                                <FormControl>
                                    <FormLabel htmlFor="winnerId">Winner ID</FormLabel>
                                    <Select 
                                        id="winnerId" 
                                        onChange={handleOfficialResultChange}
                                        placeholder="ID"
                                    >
                                        {form.typeIds.map((fighterId,i) => <option key={fighterId} value={fighterId}>{fighterId}</option>)}
                                    </Select>
                                </FormControl>
                                <FormControl>
                                    <FormLabel htmlFor="resolution">Resolution Options</FormLabel>
                                    <Select 
                                        id="resolution" 
                                        onChange={handleOfficialResultChange}
                                        placeholder="Official Result"
                                    >
                                        {officialResultOptions.map( option => <option key={option} value={option}>{option}</option>)}
                                    </Select>
                                </FormControl>
                                <FormControl id="resolution">
                                    <FormLabel htmlFor="resolution">Official result</FormLabel>
                                    <Input value={`${officialResultForm?.winnerId}:${officialResultForm?.resolution}`} readOnly type="text" />
                                </FormControl>
                            </VStack>
                        </FieldGroup>
                        <FieldGroup mt="8">
                            <ButtonGroup w="100%">
                                <Button 
                                    minW="33%" 
                                    disabled={!form.id} 
                                    isLoading={isSubmitting} 
                                    loadingText="Deleting" 
                                    // onClick={handleDeleteDistance} 
                                    variant="outline"
                                >
                                    Delete
                                </Button>
                                <Button 
                                    minW="33%"
                                    onClick={handleSubmitResolution} 
                                    type="button" 
                                    colorScheme="solid"
                                    isLoading={isSubmitting}
                                    loadingText="Submitting..."
                                >
                                    {form.id ? 'Update' : 'Create'}
                                </Button>
                            </ButtonGroup>
                        </FieldGroup></>
                    }
                </Stack>
            </form>
        </Box>
    )
}