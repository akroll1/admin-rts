import React, { useState } from 'react'
import { Button, Flex, FormControl, FormLabel, Heading, Input, Stack, StackDivider, VStack } from '@chakra-ui/react'
import useStore from '../../state-store'
import { FieldGroup } from '../../chakra';

export const BroadcastForm = () => {
    const [form, setForm] = useState({broadcast: ''});
    const sendBroadcast = useStore( ({ setBroadcast }) => setBroadcast)
    const sendTheBroadcast = () => {
        sendBroadcast(form.broadcast);
        setForm({ broadcast: '' });
        setTimeout(() => {
            sendBroadcast('');
        },5000)
    }   
    const { broadcast } = form;
    return (
        <Flex w="100%" flexDir="column" alignItems="center" justifyContent="center">
                <Stack w="75%" spacing="4" divider={<StackDivider />}>
                    <Heading size="lg" as="h1" paddingBottom="4" mt="3rem">
                        Push Notifications
                    </Heading>
                    <FieldGroup title="Send Broadcast">
                        <VStack width="full" spacing="6">
                            <FormControl id="broadcast">
                                <FormLabel>Message</FormLabel>
                                <Input w="100%" required value={broadcast} onChange={e => setForm({ ...form, broadcast: e.currentTarget.value })} type="text" maxLength={150} />
                            </FormControl>
                        </VStack>   
                    </FieldGroup>
                </Stack>
            <Button variant="outline" colorScheme="red" onClick={sendTheBroadcast}>Broadcast</Button>
        </Flex>
    )

};