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

export const PropsForm = () => {
    const {
        fetchFightProps,
        fightProps,
        updateFightProps,
        selectedFightProps,
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
        if(selectedFightProps?.id){
            console.log("selectedFightProps: ", selectedFightProps)
            setForm({ 
                ...selectedFightProps, 
            })
        }
    },[selectedFightProps])

    const handleFetchProps = () => {
        fetchFightProps(form.id)
    }

    const handlePutProps = () => {
        console.log('form: ', form)
        const obj = {
            id: form.id,
            moneyline: form.fighter1Id 
                ? [
                    {
                        [form.fighter1Id]: form.fighter1ML,
                    },
                    {
                        [form.fighter2Id]: form.fighter2ML
                    }
                ] 
                : null,
            overUnder: form.overUnder 
                ? {
                    ou: form.overUnder,
                    over: form.over,
                    under: form.under,
                }
                : null
        }
        console.log('obj: ', obj)
        updateFightProps(obj)

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
                        Props Form
                    </Heading>
                    <FieldGroup title="Search Fight Props">
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
                                    onClick={handleFetchProps} 
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

                            <FormControl id="fighter1Id">
                                <FormLabel>Fighter 1</FormLabel>
                                <Input required value={form.fighter1Id} onChange={handleFormChange} type="text" maxLength={100} />
                            </FormControl>
                            
                            <FormControl id="fighter1ML">
                                <FormLabel>Fighter1 Moneyline</FormLabel>
                                <Input value={form.fighter1Moneyline} onChange={handleFormChange} type="text" maxLength={100} />
                            </FormControl>
                            
                            <FormControl id="fighter2Id">
                                <FormLabel>Fighter2</FormLabel>
                                <Input value={form.fighter2Id} onChange={handleFormChange} type="text" maxLength={255} />
                            </FormControl>

                            <FormControl id="fighter2ML">
                                <FormLabel>Fighter2 Moneyline</FormLabel>
                                <Input value={form.fighter2Moneyline} onChange={handleFormChange} type="text" maxLength={100} />
                            </FormControl>
                            
                            <FormControl id="overUnder">
                                <FormLabel>OverUnder</FormLabel>
                                <Input value={form.overUnder} onChange={handleFormChange} type="text" maxLength={100} />
                            </FormControl>

                            <FormControl id="over">
                                <FormLabel>Over</FormLabel>
                                <Input value={form.over} onChange={handleFormChange} type="text" maxLength={100} />
                            </FormControl>
                            
                            <FormControl id="under">
                                <FormLabel>Under</FormLabel>
                                <Input value={form.under} onChange={handleFormChange} type="text" maxLength={100} />
                            </FormControl>
                           
                        </VStack>
                    </FieldGroup>
                </Stack>
                <FieldGroup mt="8">
                    <Button 
                        // onClick={id ? handlePutProps : handlepostProps} 
                        onClick={handlePutProps} 
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