import React, { useState, useEffect } from 'react'
import { Box, Button, FormControl, FormLabel, Heading, HStack, Input, Stack, StackDivider, VStack, Flex, useToast } from '@chakra-ui/react'
import { FieldGroup } from '../../chakra'
import { capFirstLetters } from '../../utils';

export const FightersPageFightersForm = ({ 
    selectedFighter 
}) => {

    const { fighterId, firstName, lastName, ringname, wins, losses, draws, kos, dq, socials, home } = selectedFighter;
    console.log('fighterId: ', fighterId);

    return (
        <Box px={{base: '4', md: '10'}} py="16" maxWidth="3xl" mx="auto" height="auto">
            <form id="fighters+page_fighters_form" onSubmit={e => {e.preventDefault()}}>
                <Stack spacing="4" divider={<StackDivider />}>
                    <Heading size="lg" as="h1" paddingBottom="4">
                    {`${capFirstLetters(firstName)} ${capFirstLetters(lastName)}`}
                    </Heading>
                    <FieldGroup title="Fighter Info">
                        <VStack width="full" spacing="6">
                            <FormControl id="firstName">
                                <FormLabel>First Name</FormLabel>
                                <Input value={`${capFirstLetters(firstName)}`} type="text" maxLength={255} />
                            </FormControl>
                            
                            <FormControl id="lastName">
                                <FormLabel>Last Name</FormLabel>
                                <Input value={`${capFirstLetters(lastName)}`} type="text" maxLength={255} />
                            </FormControl>
                            
                            <FormControl id="ringname">
                                <FormLabel>Ring Name</FormLabel>
                                <Input value={`${ringname}`} type="text" maxLength={255} />
                            </FormControl>
                            
                            <FormControl id="home">
                                <FormLabel>Home</FormLabel>
                                <Input value={`${capFirstLetters(home)}`} maxLength={255} />
                            </FormControl>
             
                            {/* <FormControl id="socials">
                                <FormLabel>Socials</FormLabel>
                                <Input value={socials} type="text"} maxLength={255} />
                            </FormControl> */}
                        </VStack>
                    </FieldGroup>
                    <FieldGroup title="Record">
                        <HStack width="full" spacing="6">
                            <Flex flexDirection="row" flexWrap="wrap">
                                <FormControl m="3" style={{width: '25%'}} id="wins">
                                    <FormLabel>Wins</FormLabel>
                                    <Input value={wins} type="number" maxLength={3} />
                                </FormControl>

                                <FormControl m="3" style={{width: '25%'}} id="losses">
                                    <FormLabel>Losses</FormLabel>
                                    <Input value={losses} type="number" maxLength={3} />
                                </FormControl>
                                <FormControl m="3" style={{width: '25%'}} id="draws">
                                    <FormLabel>Draws</FormLabel>
                                    <Input value={draws} type="number" maxLength={3} />
                                </FormControl>
                                <FormControl m="3" style={{width: '25%'}} id="kos">
                                    <FormLabel>KO's</FormLabel>
                                    <Input value={kos} type="number" maxLength={3} />
                                </FormControl>
                                <FormControl m="3" style={{width: '25%'}} id="dq">
                                    <FormLabel>DQ's</FormLabel>
                                    <Input value={dq} type="number" maxLength={3} />
                                </FormControl>
                            </Flex>
                        </HStack>
                    </FieldGroup>
                </Stack>
            </form>
        </Box>
    )
}