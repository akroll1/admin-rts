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

export const FightPropsForm = () => {
    const {
        createFightProps,
        fetchFightProps,
        fightProps,
        updateFightProps
    } = useGlobalStore()

    const [id, setFightId] = useState(null)

    const [form, setForm] = useState({
        props: {
            //FightPropsEnum: {
                //fighterId: prop
            // }
        }
    });

    useEffect(() => {
        if(fightProps?.fighter1Id){
            setForm({ ...form, ...fightProps })
        }
    },[fightProps])

    const handleFetchProps = () => {
        fetchFightProps(id)
    }

    const handlePutProps = () => {
        const obj = {
            ...form,
            id
        }
        console.log('obj: ', obj)
        updateFightProps(obj)
    }

    const handlepostProps = () => {
        // const obj = {
        //     ...form,
        //     id
        // }
        const obj = {
            id: '8479a912-2d13-4993-a431-5c154a9e331f',
            fightProps: {
                MONEYLINE: {
                    'd2e6ca30-4bc7-47a5-a9fb-a3bb51197403': '-4500',
                    'd5eb3ce2-d1f7-4c9f-8a40-4b9d5f8e2ee1': '+1600'
                }
            }
        }
        createFightProps(obj)

    }

    const handleFormChange = e => {
        const { id, value } = e.currentTarget;
        return setForm({ ...form, [id]: value })
    }

    const { 
        fighter1Id,
        fighter2Id,
        fighter1Moneyline,
        fighter2Moneyline,
    } = form;
    const fightQuickTitle = 'still testing'
    console.log('form: ', form)
    console.log('id: ', id)
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
                        Props Form
                    </Heading>
                    <FieldGroup title="Find Fight Props">
                        <VStack width="full" spacing="6">
                            <FormControl id="id">
                                <FormLabel htmlFor="id">Search Props by Fight ID</FormLabel>
                                <Input 
                                    value={id} 
                                    onChange={ ({ currentTarget: {value} }) => setFightId(value.length == 36 ? value : '')} 
                                    type="text" 
                                />
                            </FormControl>
                            <HStack justifyContent="center" width="full">
                                <Button 
                                    disabled={!id}  
                                    minW="33%" 
                                    // isLoading={isSubmitting} 
                                    loadingText="Searching..." 
                                    onClick={() => handleFetchProps()} 
                                    type="button" 
                                    colorScheme="solid"
                                >
                                    Search
                                </Button>
                            </HStack>
                        </VStack>
                    </FieldGroup>
                    <FieldGroup title="Fight Props">
                        <VStack width="full" spacing="6">
                            <FormControl id="fightQuickTitle">
                                <FormLabel></FormLabel>
                                <Input required value={fightQuickTitle} onChange={handleFormChange} type="text" maxLength={100} />
                            </FormControl>

                            <FormControl id="fighter1Id">
                                <FormLabel>Fighter 1</FormLabel>
                                <Input required value={fighter1Id} onChange={handleFormChange} type="text" maxLength={100} />
                            </FormControl>
                            
                            <FormControl id="fighter1Moneyline">
                                <FormLabel>Fighter1 Moneyline</FormLabel>
                                <Input value={fighter1Moneyline} onChange={handleFormChange} type="text" maxLength={100} />
                            </FormControl>
                            
                            <FormControl id="fighter2Id">
                                <FormLabel>Fighter2</FormLabel>
                                <Input value={fighter2Id} onChange={handleFormChange} type="text" maxLength={255} />
                            </FormControl>

                            <FormControl id="fighter2Moneyline">
                                <FormLabel>Fighter2 Moneyline</FormLabel>
                                <Input value={fighter2Moneyline} onChange={handleFormChange} type="text" maxLength={100} />
                            </FormControl>
                           
                        </VStack>
                    </FieldGroup>
                </Stack>
                <FieldGroup mt="8">
                    <Button 
                        // onClick={id ? handlePutProps : handlepostProps} 
                        onClick={handlepostProps} 
                        type="submit" 
                        colorScheme="solid"
                        minW="40%"
                    >
                        Update
                    </Button>
                </FieldGroup>
            </form>
        </Box>
    )
}