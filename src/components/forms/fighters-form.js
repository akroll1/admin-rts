import React, { useState, useEffect } from 'react'
import { Box, Button, FormControl, FormLabel, Heading, HStack, Input, Stack, StackDivider, VStack, Flex, useToast } from '@chakra-ui/react'
import { FieldGroup } from '../../chakra'
import { FightersTable } from '../tables';
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid'

export const FightersForm = ({ user, tokenConfig }) => {
    const toast = useToast();
    const fightersUrl = process.env.REACT_APP_FIGHTERS;
    const [fighters, setFighters] = useState([]);
    const [fighter, setFighter] = useState({
        fighterId: '',
        firstName: '',
        lastName: '',
        ringname: '',
        wins: 0,
        losses: 0,
        draws: 0,
        kos: 0,
        dq: 0,
        socials: [],
        home: ''
    });

    const setFighterInfo = e => {
        const { id, value } = e.currentTarget;

        return setFighter({...fighter, [id]: value });
    }
    const submitFighter = () => {
        // console.log('inside submit fighter: ',fighter);
        const url = fightersUrl + `/${fighter.fighterId}`;
        // console.log('fighter: ',fighter);
        return axios.put(url, fighter, tokenConfig)
            .then(res => {
                if(res.status === 200){
                    toast({ title: 'Fighter updated!',
                    status: 'success',
                    duration: 5000,
                    isClosable: true,});
                    setFighter({
                        fighterId: '',
                        firstName: '',
                        lastName: '',
                        ringname: '',
                        wins: 0,
                        losses: 0,
                        draws: 0,
                        kos: 0,
                        dq: 0,
                        socials: [],
                        home: ''
                    })
                }
            })
            .catch(err => console.log(err))
    }
    const deleteFighter = e => {
        const { id } = e.currentTarget
        const newList = fighters.filter( fighter => fighter.fighterId !== id);
        setFighters(newList);
    }
    const selectFighter = e => {
        const { id } = e.currentTarget;
        console.log('id: ',id);
        const selected = fighters.filter( fighter => fighter.fighterId === id);
        setFighter({...selected[0]})
    };
    // console.log('fighters: ',fighters);
    // console.log('fighter: ',fighter)
    const { fighterId, firstName, lastName, ringname, wins, losses, draws, kos, dq, socials, home } = fighter;
    console.log('fighterId: ', fighterId);

    return (
        <Box px={{base: '4', md: '10'}} py="16" maxWidth="3xl" mx="auto" height="auto">
            <form id="settings-form" onSubmit={e => {e.preventDefault()}}>
                <Stack spacing="4" divider={<StackDivider />}>
                    <Heading size="lg" as="h1" paddingBottom="4">
                    Fighter Form
                    </Heading>
                    <FieldGroup title="Create A Fighter">
                        <VStack width="full" spacing="6">
                            <FormControl id="firstName">
                                <FormLabel>First Name</FormLabel>
                                <Input value={firstName.toLowerCase()} required onChange={e => setFighterInfo(e)} type="text" maxLength={255} />
                            </FormControl>
                            
                            <FormControl id="lastName">
                                <FormLabel>Last Name</FormLabel>
                                <Input value={lastName.toLowerCase()} required onChange={e => setFighterInfo(e)} type="text" maxLength={255} />
                            </FormControl>
                            
                            <FormControl id="ringname">
                                <FormLabel>Ring Name</FormLabel>
                                <Input value={ringname.toLowerCase()} required onChange={e => setFighterInfo(e)} type="text" maxLength={255} />
                            </FormControl>
                            
                            <FormControl id="home">
                                <FormLabel>Home</FormLabel>
                                <Input value={home} onChange={e => setFighterInfo(e)} type="text" maxLength={255} />
                            </FormControl>
             
                            <FormControl id="socials">
                                <FormLabel>Socials</FormLabel>
                                <Input value={socials} onChange={e => setFighterInfo(e)} type="text" maxLength={255} />
                            </FormControl>
                        </VStack>
                    </FieldGroup>
                    <FieldGroup title="Record">
                        <HStack width="full" spacing="6">
                            <Flex flexDirection="row" flexWrap="wrap">
                                <FormControl m="3" style={{width: '25%'}} id="wins">
                                    <FormLabel>Wins</FormLabel>
                                    <Input value={wins} required onChange={e => setFighterInfo(e)} type="number" maxLength={3} />
                                </FormControl>

                                <FormControl m="3" style={{width: '25%'}} id="losses">
                                    <FormLabel>Losses</FormLabel>
                                    <Input value={losses} required onChange={e => setFighterInfo(e)} type="number" maxLength={3} />
                                </FormControl>
                                <FormControl m="3" style={{width: '25%'}} id="draws">
                                    <FormLabel>Draws</FormLabel>
                                    <Input value={draws} required onChange={e => setFighterInfo(e)} type="number" maxLength={3} />
                                </FormControl>
                                <FormControl m="3" style={{width: '25%'}} id="kos">
                                    <FormLabel>KO's</FormLabel>
                                    <Input value={kos} required onChange={e => setFighterInfo(e)} type="number" maxLength={3} />
                                </FormControl>
                                <FormControl m="3" style={{width: '25%'}} id="dq">
                                    <FormLabel>DQ's</FormLabel>
                                    <Input value={dq} required onChange={e => setFighterInfo(e)} type="number" maxLength={3} />
                                </FormControl>
                            </Flex>
                        </HStack>
                    </FieldGroup>
                </Stack>
                <FieldGroup mt="8">
                    <HStack width="full">
                    <Button onClick={submitFighter} type="submit" colorScheme="blue">
                        Save Changes
                    </Button>
                    <Button variant="outline">Cancel</Button>
                    </HStack>
                </FieldGroup>
            </form>
            <Flex maxH="15rem" overflowY="scroll">
                <FightersTable p="1" fighters={fighters} deleteFighter={deleteFighter} selectFighter={selectFighter} />
            </Flex>
        </Box>
    )
}