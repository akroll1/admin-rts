import React, { useState, useEffect } from 'react'
import { Box, Button, Flex, FormControl, FormHelperText, FormLabel, Heading, HStack, Input, Stack, StackDivider, Text, Textarea, useColorModeValue, useToast, VStack } from '@chakra-ui/react'
import { FieldGroup } from '../../chakra'
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid'
import { CreatePanelFormTable } from '../tables';

export const CreatePanelForm = ({ user, tokenConfig }) => {
    const toast = useToast();
    const [fightId, setFightId] = useState(null);
    const [panelists, setPanelists] = useState([]);
    const [form, setForm] = useState({
        fightId: ''
    })

    const fetchPanel = async () => {
        const url = process.env.REACT_APP_PANELS + `/${fightId}`;
        return axios.get(url, tokenConfig)
            .then( res => setForm(res.data))
            .catch( err => console.log(err));
    };

    const handleUpdatePanel = async () => {
        const url = process.env.REACT_APP_PANELS;
        const putObj = {
            fightId: form.fightId,
            panelists: panelists.length > 0 ? panelists : null,
        };
        return axios.put(url, putObj, tokenConfig)
            .then(res => setForm(res.data))
            .catch(err => console.log(err))
    }

    const handleFormChange = e => {
        const { id, value } = e.currentTarget;
        setForm({ ...form, [id]: value});
    }

    return (
        <Box px={{base: '4', md: '10'}} py="16" maxWidth="3xl" mx="auto">
            <Flex maxH="15rem" overflowY="scroll">
                <CreatePanelFormTable panelists={panelists} />
                <FieldGroup mt="8">
                    <HStack width="full">
                        <Button onClick={fetchPanel} type="submit" colorScheme="blue">
                            Search for Panel
                        </Button>
                    </HStack>
                </FieldGroup>
            </Flex>
            
            <form id="create_panel_form" onSubmit={(e) => {e.preventDefault()}}>
                <Stack spacing="4" divider={<StackDivider />}>
                    <Heading size="lg" as="h1" paddingBottom="4" mt="3rem">
                        Panel Form
                    </Heading>
                    {/* <FieldGroup title="Panel">
                        <VStack width="full" spacing="6">
                            <FormControl id="discussionTitle">
                                <FormLabel>Discussion Title</FormLabel>
                                <Input required value={discussionTitle} onChange={e => handleFormChange(e)} type="text" maxLength={100} />
                            </FormControl>
                            
                        </VStack>
                    </FieldGroup> */}
                </Stack>
                <FieldGroup mt="8">
                    <HStack width="full">
                    <Button onClick={handleUpdatePanel} type="submit" colorScheme="blue">
                        Submit Panel
                    </Button>
                    <Button variant="outline">Cancel</Button>
                    </HStack>
                </FieldGroup>
            </form>
        </Box>
    )
}