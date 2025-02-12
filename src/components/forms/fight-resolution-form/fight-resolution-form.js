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
import { FieldGroup } from '../../../chakra'
import { officialResultOptions, Status, useGlobalStore } from '../../../stores'
import Datepicker from 'react-datepicker'

export const FightResolutionForm = () => {
    const [isCanceledSubmitting, setIsCanceledSubmitting] = useState(false)
    const [searchId, setSearchId] = useState('')    
    const [knockdowns, setKnockdowns] = useState({})
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
            const { id, instance, metas, type } = selectedDistance
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

    const handleFightWasCanceled = async () => {
        setIsCanceledSubmitting(true)
        await updateFightResolution({ 
            fightId: form.id,
            status: Status.CANCELED,
        })
        setIsCanceledSubmitting(false)
    }

    const handleSubmitResolution = () => {
        /**
        * @params resolution: `${officialResultForm.winnerId}:${officialResultForm.resolution}`, fightId: form.id, rounds: form.rounds 
        */
        if(!officialResultForm.winnerId || !officialResultForm.resolution) return alert('Missing official result!')
        const resolution = `${officialResultForm.winnerId}:${officialResultForm.resolution}`;
        const fighter1 = form?.typeIds[0]   
        const fighter2 = form?.typeIds[1]
        const f1Knockdowns = knockdowns[form?.typeIds[0]] || "0"
        const f2Knockdowns = knockdowns[form?.typeIds[1]] || "0"
        if(!fighter1 || !fighter2 || !f1Knockdowns || !f2Knockdowns) return alert('Missing fighter(s) or knockdown(s)!')
        const resolutionObj = {
            fightId: form.id,
            fighter1,
            fighter2,
            f1Knockdowns,
            f2Knockdowns,
            resolution,
            rounds: form?.rounds,
            status: Status.COMPLETE,
        }
        console.log('RESOLUTION: ', resolutionObj)
        updateFightResolution(resolutionObj)
    }
    const handleFormChange = e => {
        const { id, value } = e.currentTarget;
        setForm({ ...form, [id]: value });
    };

    const handleKnockdownsChange = e => {
        const { id, value } = e.currentTarget;
        setKnockdowns( prev => ({ ...prev, [id]: value }));
    }

    const handleOfficialResultChange = e => {
        const { id, value } = e.currentTarget;
        setOfficialResultForm({ ...officialResultForm, [id]: value });
    }

    // console.log('form: ', form)
    // console.log('officialResultForm: ', officialResultForm)
    // console.log('knockdowns: ', knockdowns)

    return (
        <Box px={{base: '4', md: '10'}} py="16" maxWidth="3xl" mx="auto">
            <Heading size="lg" as="h1" paddingBottom="4">
                Resolutions Form
            </Heading>
            <FieldGroup title="Search Distances">
                <VStack width="full" spacing="6">
                    <FormControl id="searchId">
                        <FormLabel htmlFor="searchId">Distance ID</FormLabel>
                        <Input value={searchId.trim()} onChange={e => setSearchId(e.currentTarget.value)} type="text" maxLength={36} minLength={36} />
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

                                <FormControl>
                                    <FormLabel htmlFor="f1Knockdowns">Fighter 1 Knockdowns</FormLabel>
                                    <Select 
                                        id={`${form.typeIds[0]}`} 
                                        onChange={handleKnockdownsChange}
                                    >
                                        {["0","1","2","3","4","5","6","7","8","9"].map( option => <option key={option} value={option}>{option}</option>)}
                                    </Select>
                                </FormControl>
                                <FormControl>
                                    <FormLabel htmlFor="f2Knockdowns">Fighter 2 Knockdowns</FormLabel>
                                    <Select 
                                        id={`${form.typeIds[1]}`} 
                                        onChange={handleKnockdownsChange}
                                    >
                                        {["0","1","2","3","4","5","6","7","8","9"].map( option => <option key={option} value={option}>{option}</option>)}
                                    </Select>
                                </FormControl>

                            </VStack>
                        </FieldGroup>
                        <FieldGroup mt="8">
                            <ButtonGroup w="100%">
                                <Button 
                                    w="33%"
                                    mr="4"
                                    onClick={handleSubmitResolution} 
                                    type="button" 
                                    colorScheme="solid"
                                    isLoading={isSubmitting}
                                    loadingText="Submitting..."
                                >
                                   Resolve Fight
                                </Button>
                                <Button 
                                    w="33%"
                                    variant="outline"
                                    onClick={handleFightWasCanceled} 
                                    type="button" 
                                    colorScheme="solid"
                                    isLoading={isCanceledSubmitting}
                                    loadingText="Canceling Fight..."
                                >
                                    Fight Canceled
                                </Button>
                            </ButtonGroup>
                        </FieldGroup></>
                    }
                </Stack>
            </form>
        </Box>
    )
}