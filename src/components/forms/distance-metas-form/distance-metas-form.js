import { useState, useEffect } from 'react'
import { 
    Box, 
    Button, 
    FormControl, 
    FormLabel, 
    Heading, 
    HStack, 
    Input, 
    Stack, 
    StackDivider, 
    VStack 
} from '@chakra-ui/react'
import { FieldGroup } from '../../../chakra'
import { useGlobalStore } from '../../../stores';

export const DistanceMetasForm = () => {
    const {
        fetchDistanceMetas,
        updateDistanceMetas,
        distanceMetas,
    } = useGlobalStore()

    const [f1, setF1] = useState(null)
    const [f2, setF2] = useState(null)
    const [f1Moneyline, setF1Moneyline] = useState(null)
    const [f2Moneyline, setF2Moneyline] = useState(null)
    const [fightId, setFightId] = useState(null)
    const [form, setForm] = useState({})

    useEffect(() => {

        if(distanceMetas?.id){
            setFightId(distanceMetas.id)
            const { props } = distanceMetas
            if(!props?.moneyline) {
                alert('No moneyline found')
                return
            }
            const [f1, f2] = Object.keys(props?.moneyline)
            setF1Moneyline(props.moneyline[f1])
            setF2Moneyline(props.moneyline[f2])
            setF1(f1)
            setF2(f2)
            setForm({ 
                ...distanceMetas, 
            })
        }
    },[distanceMetas])

    const handleFetchDistanceMetas = () => {
        if(form?.id?.length !== 36) return alert("FightId must be 36 characters")
        fetchDistanceMetas(form.id)
    }

    const handleSubmit = e => {
        e.preventDefault()
        if(f1?.length !== 36 || f2?.length !== 36) return alert("FightId and fighters must be 36 characters")
        if(!f1Moneyline || !f2Moneyline) return alert("Moneyline must be a number")

        const updateObj = {
            id: fightId || form.id,
            props: {
                moneyline: {
                    [f1]: f1Moneyline,
                    [f2]: f2Moneyline,
                }
            },
        }
        console.log('updateObj: ', updateObj)
        updateDistanceMetas(updateObj)
    }

    return (
        <Box 
            px={['4', '8']} 
            py="8" 
            maxWidth="3xl" 
            mx="auto"
        >   
            <form id="distance_metas_form" onSubmit={(e) => {e.preventDefault()}}>
                <Stack spacing="4" divider={<StackDivider />}>
                    <Heading size="lg" as="h1" paddingBottom="4">
                        Distance Metas Form
                    </Heading>
                    <FieldGroup title="Search Distance Metas">
                        <VStack width="full" spacing="6">
                            <FormControl id="id">
                                <FormLabel htmlFor="id">Fight ID</FormLabel>
                                <Input 
                                    value={form.id} 
                                    onChange={e => setForm({ ...form, id: e.currentTarget.value })} 
                                    type="text" 
                                />
                            </FormControl>
                            <HStack justifyContent="center" width="full">
                                <Button 
                                    disabled={!form.id}  
                                    minW="33%" 
                                    // isLoading={isSubmitting} 
                                    loadingText="Searching..." 
                                    onClick={handleFetchDistanceMetas} 
                                    type="button" 
                                    colorScheme="solid"
                                >
                                    Search
                                </Button>
                            </HStack>
                        </VStack>
                    </FieldGroup>
                    <FieldGroup title="Distance Metas">
                        <VStack width="full" spacing="6">

                            <FormControl id={f1 || null}>
                                <FormLabel>Fighter 1 ID</FormLabel>
                                <Input required value={f1 || ""} onChange={e => setF1(e.currentTarget.value)} type="text" maxLength={36} />
                            </FormControl>
                            <FormControl id={f2 || null}>
                                <FormLabel>Fighter 2 ID</FormLabel>
                                <Input required value={f2 ||""} onChange={e => setF2(e.currentTarget.value)} type="text" maxLength={36} />
                            </FormControl>
                           
                            <FormControl id={f1 || null}>
                                <FormLabel>Fighter 1 Moneyline</FormLabel>
                                <Input required value={f1Moneyline} onChange={e => setF1Moneyline(e.currentTarget.value)} type="text" maxLength={10} />
                            </FormControl>
                            <FormControl id={f2 || null}>
                                <FormLabel>Fighter 2 Moneyline</FormLabel>
                                <Input required value={f2Moneyline} onChange={e => setF2Moneyline(e.currentTarget.value)} type="text" maxLength={10} />
                            </FormControl>
                           
                        </VStack>
                    </FieldGroup>
                </Stack>
                <FieldGroup mt="8">
                    <Button 
                        // onClick={id ? handlePutDistanceMetas : handlepostProps} 
                        onClick={handleSubmit} 
                        type="submit" 
                        colorScheme="solid"
                        minW="40%"
                    >
                        Submit
                    </Button>
                </FieldGroup>
            </form>
        </Box>
    )
}