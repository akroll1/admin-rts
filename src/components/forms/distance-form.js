import { 
    useState, 
    useEffect 
} from 'react'
import { 
    Box, 
    Button, 
    ButtonGroup, 
    Checkbox, 
    FormControl, 
    FormLabel, 
    Heading, 
    HStack, 
    Input, 
    Select, 
    Stack, 
    StackDivider, 
    Textarea, 
    UnorderedList,
    VStack 
} from '@chakra-ui/react'
import { FieldGroup } from '../../chakra'
import Datepicker from 'react-datepicker'
import {
    DistanceType,
    Networks,
    ROUND_LENGTH_ENUMS,
    SeasonType,
    Status,
    useGlobalStore,
    WeightClass,
} from '../../stores'

export const DistanceForm = () => {
    const { 
        deleteDistance,
        fetchDistanceById,
        isSubmitting,
        updateDistance,
        selectedDistance,
    } = useGlobalStore()

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
        typeId: '',
        typeIds: [],
        weightclass: '',
    });

    useEffect(() => {
        if(selectedDistance?.id){
            console.log('selectedDistance: ', selectedDistance)
            const { id, instance, metas, status, type } = selectedDistance
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
                officialResult: instance.officialResult ? instance.officialResult : '', 
                rounds: instance.rounds ? instance.rounds : 3,  
                weightclass: instance.weightclass ? instance.weightclass : '',  
                // SHOW
                location: instance.location ? instance.location : '',
                network: instance.network ? instance.network : 'NONE',
                promoter: instance.promoter ? instance.promoter : '',
                status: instance.status ? instance.status : "PENDING",
                type,
                seasonType: instance.seasonType ? instance.seasonType : '',
                typeId: '',
                typeIds: metas.typeIds ? metas.typeIds : [],
            })
            if(document.getElementById("type")){
                document.getElementById("type").value = type;
            }
            if(document.getElementById("status")){
                document.getElementById("status").value = status;
            }
            if(type === "SHOW" && instance && document.getElementById("network") && document.getElementById("promoter")){
                document.getElementById("network").value = instance.network ? instance.network : "NONE";
                document.getElementById("promoter").value = instance.promoter ? instance.promoter : "NONE";
            }
            if(type === "FIGHT" && document.getElementById("weightclass" && document.getElementById("rounds"))){
                document.getElementById("weightclass").value = instance.weightclass
                document.getElementById("rounds").value = instance.rounds
            }
            if(type === "SEASON" && document.getElementById("seasonType")){
                document.getElementById("seasonType").value = instance.seasonType
            }
        }
    },[selectedDistance])
    
    const handleFormChange = e => {
        const { id, value } = e.currentTarget;
        setForm({ ...form, [id]: value });
    };
   
    // rounds is being cast in places.
    
    const handleUpdateDistance = () => {
        const distance = {
            id: form.id ? form.id : null, 
            status: form.status,
            type: form.type,
        }
        const metas = {
            description: form.description ? form.description : null,
            parent: form.parent ? form.parent : null,
            storyline: form.storyline ? form.storyline : null,
            subtitle: form.subtitle ? form.subtitle : null,
            syncs: null,
            title: form.title,
            typeIds: form.typeIds.length > 0 ? form.typeIds : null,
            starts: new Date(form.starts).toISOString(),
            ends: form.type === "SEASON" ? new Date(form.ends).toISOString() : null,
        };
        const fight = {
            isMainEvent: form.isMainEvent,
            isTitleFight: form.isTitleFight,
            officialResult: form.officialResult ? form.officialResult : null,
            rounds: parseInt(form.rounds),
            weightclass: form.weightclass,
        };
        const show = {
            location: form.location ? form.location : null,
            network: form.network ? form.network : null,
            promoter: form.promoter ? form.promoter : null,
        };
        
        const createUpdateObj = () => {
            let instance;
            if(form.type === "FIGHT"){
                instance = fight;
            }
            if(form.type === "SHOW"){
                instance = show;
            }
            if(form.type === "SEASON"){
                instance = { seasonType: form.seasonType };
            }
            return Object.assign({}, {
                ...distance,
                instance,
                metas,
            })
        };
        const putObj = createUpdateObj();
        // console.log('postObj: ', putObj)
        if(!form.typeIds.length > 0){
            alert('Missing typeIds!')
            return
        }
        console.log('putObj: ', putObj)
        updateDistance(putObj)
    };
    
    const handleFetchDistanceById = () => {
        if(form.id){
            fetchDistanceById(form.id)
        }
    }

    const handleDeleteDistance = e => {
        return
        deleteDistance(form.id)
    }

    const handleIds = () => {
        if(form.typeIds.some( id => id === form.typeId))return
        setForm( prev => ({ ...form, typeIds: [...prev.typeIds, form.typeId], typeId: '' })) 
    }
    
    const handleRemoveId = e => {
        const { id } = e.currentTarget;
        const removed = form.typeIds.filter( typeId => typeId !== id);
        setForm({ ...form, typeIds: removed, typeId: '' }) 
    }
    // console.log('form: ', form)
    return (
        <Box px={{base: '4', md: '10'}} py="16" maxWidth="3xl" mx="auto">
            <Heading size="lg" as="h1" paddingBottom="4">
                Distance Form
            </Heading>
             <FieldGroup title="Search Distances">
                <VStack width="full" spacing="6">
                    <FormControl id="id">
                        <FormLabel htmlFor="id">Distance ID</FormLabel>
                        <Input value={form.id} onChange={handleFormChange} type="text" maxLength={36} />
                    </FormControl>
                    <HStack justifyContent="center" width="full">
                        <Button 
                            disabled={form.id.length !== 36} 
                            minW="33%" 
                            // isLoading={isSubmitting} 
                            loadingText="Searching..." 
                            onClick={handleFetchDistanceById} 
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
                    <FieldGroup title="Distance">
                        <VStack width="full" spacing="6">
                            <FormControl id="status">
                                <FormLabel htmlFor="status">Distance Status</FormLabel>
                                <Select onChange={handleFormChange}>
                                    { Object.keys(Status).map( status => <option key={status} value={status}>{status}</option>)}
                                </Select>                            
                            </FormControl>
                            <FormControl>
                                <FormLabel htmlFor="type">Distance Type</FormLabel>
                                <Select disabled={form.id} id="type" onChange={handleFormChange}>
                                    { Object.keys(DistanceType).map( type => {
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
                        </VStack>
                    </FieldGroup>
                
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
                                    onChange={time => setForm({ ...form, starts: time })}
                                />
                            </FormControl>
                            <FormControl>
                                <FormLabel htmlFor="ends">Ends</FormLabel>
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
                            <FormControl isRequired id="typeId">
                                <FormLabel htmlFor="typeId">Type IDs</FormLabel>
                                <Input value={form.typeId} onChange={handleFormChange}  type="text" maxLength={255} />
                                <Button 
                                    disabled={form.typeId.length !== 36}
                                    minW="50%" 
                                    m="2" 
                                    onClick={handleIds}
                                >
                                    Add
                                </Button>
                            </FormControl>
                            <UnorderedList>
                                { form.typeIds.length > 0 && form.typeIds.map( id => <li id={id} style={{cursor: 'pointer'}} onClick={handleRemoveId} key={id}>{id}</li>)}
                            </UnorderedList>
                        </VStack>
                    </FieldGroup>
                    <FieldGroup title="Instance">
                        <VStack width="full" spacing="6">
                            { form.type === "FIGHT" &&
                                <>
                                    <Stack width="full" spacing="4">
                                        <Checkbox isChecked={form.isMainEvent} id="isMainEvent" onChange={e => setForm( prev => ({ ...prev, isMainEvent: !prev.isMainEvent }))}>Main Event</Checkbox>
                                    </Stack>

                                    <Stack width="full" spacing="4">
                                        <Checkbox isChecked={form.isTitleFight} id="isTitleFight" onChange={e => setForm( prev => ({ ...prev, isTitleFight: !prev.isTitleFight }))}>Title Fight</Checkbox>
                                    </Stack>

                                    <FormControl isRequired>
                                        <FormLabel htmlFor="rounds">Total Rounds</FormLabel>
                                        <Select id="rounds" placeholder={form.rounds || 'Rounds'} onChange={handleFormChange}>
                                            { ROUND_LENGTH_ENUMS.map( round => <option key={round} value={round}>{round}</option>)}
                                        </Select>
                                    </FormControl>

                                    <FormControl isRequired id="weightclass">
                                        <FormLabel isRequired htmlFor="weightclass">Weight Class</FormLabel>
                                        <Select id="weightclass" placeholder={form.weightclass || 'Weight Class'} onChange={handleFormChange}>
                                            { Object.values(WeightClass).map( weightclass => <option key={weightclass} value={weightclass}>{weightclass}</option>)}
                                        </Select>
                                    </FormControl>
                                    <FormControl id="officialResult">
                                        <FormLabel htmlFor="officialResult">Offiicial Result</FormLabel>
                                        <Input value={form.officialResult} onChange={handleFormChange} type="text" maxLength={255} />
                                    </FormControl>
                                </>
                            }
                            { form.type === "SHOW" && 
                                <>
                                    <FormControl id="location">
                                        <FormLabel htmlFor="location">Location</FormLabel>
                                        <Input value={form.location} onChange={handleFormChange} type="text" maxLength={255} />
                                    </FormControl>
                                    <FormControl>
                                        <FormLabel htmlFor="network">Network</FormLabel>
                                        <Select id="network" placeholder={form?.network || 'Network'} onChange={handleFormChange}>
                                            { Object.values(Networks).map( network => <option key={network} value={network}>{network}</option>)}
                                        </Select>                            
                                    </FormControl>
                                    <FormControl>
                                        <FormLabel htmlFor="promoter">Promoter</FormLabel>
                                        <Select id="promoter" placeholder={form.promoter || 'Promoter'} onChange={handleFormChange}>
                                            { Object.values(Networks).map( promoter => <option key={promoter} value={promoter}>{promoter}</option>)}
                                        </Select>                              
                                    </FormControl>
                                </>
                            }
                            { form.type === "SEASON" &&
                                <>
                                    <FormControl>
                                        <FormLabel htmlFor="seasonType">Season Type</FormLabel>
                                        <Select id="seasonType" placeholder={form.seasonType || 'Season Type'} onChange={handleFormChange}>
                                            { Object.values(SeasonType).map( seasonType => <option key={seasonType} value={seasonType}>{seasonType}</option>)}
                                        </Select>                            
                                    </FormControl>
                                </>
                            }
                        </VStack>
                    </FieldGroup>

                    <FieldGroup mt="8">
                        <ButtonGroup w="100%">
                            <Button 
                                minW="33%"
                                onClick={handleUpdateDistance} 
                                type="button" 
                                colorScheme="solid"
                                isLoading={isSubmitting}
                                loadingText="Submitting..."
                            >
                                {form.id ? 'Update' : 'Create'}
                            </Button>
                            <Button 
                                minW="33%" 
                                disabled={!form.id} 
                                isLoading={isSubmitting} 
                                loadingText="Deleting" 
                                onClick={handleDeleteDistance} 
                                variant="outline"
                            >
                                Delete
                            </Button>
                        </ButtonGroup>
                    </FieldGroup>
                </Stack>
            </form>
        </Box>
    )
}