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
import { FieldGroup } from '../../chakra'
import { useGlobalStore } from '../../stores';

export const DistanceMetasForm = () => {
    const {
        fetchDistanceMetas,
        updateDistanceMetas,
        distanceMetas,
    } = useGlobalStore()

    const [form, setForm] = useState({
        id: '',
        fighter1Id: '',
        fighter2Id: '',
        fighter1ML: '',
        fighter2ML: '',
        overUnder: '',
        over: '',
        under: '',    
    });

    useEffect(() => {
        if(distanceMetas?.id){
            console.log("distanceMetas: ", distanceMetas)
            setForm({ 
                ...distanceMetas, 
            })
        }
    },[distanceMetas])

    const handleFetchDistanceMetas = () => {
        fetchDistanceMetas(form.id)
    }

    const handlePutDistanceMetas = () => {
        // DOING THIS FOR DEMO!!!
        console.log('form: ', form)
        const obj = {
            id: form.id,
        }
        // console.log('obj: ', obj)
        updateDistanceMetas(obj)

    }

    const handleFormChange = e => {
        const { id, value } = e.currentTarget;
        return setForm({ ...form, [id]: value })
    }

    console.log('form: ', form)

    return (
        <Box 
            px={['4', '8']} 
            py="8" 
            maxWidth="3xl" 
            mx="auto"
        >   
            <form id="betting_props_form" onSubmit={(e) => {e.preventDefault()}}>
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
                                    onChange={handleFormChange} 
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

                            {/* <FormControl id="fighter1Id">
                                <FormLabel>Fighter 1</FormLabel>
                                <Input required value={form.fighter1Id} onChange={handleFormChange} type="text" maxLength={100} />
                            </FormControl> */}
                           
                        </VStack>
                    </FieldGroup>
                </Stack>
                <FieldGroup mt="8">
                    <Button 
                        // onClick={id ? handlePutDistanceMetas : handlepostProps} 
                        onClick={handlePutDistanceMetas} 
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