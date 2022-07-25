import React, { useState, useEffect } from 'react'
import { Avatar, Box, Button, Flex, FormControl, FormLabel, Heading, HStack, Input, Stack, StackDivider, useToast, VStack } from '@chakra-ui/react'
import { FieldGroup } from '../../chakra'
import { FightersTable } from '../tables'
import axios from 'axios';

export const PoundForm = ({ user, tokenConfig }) => {
  const toast = useToast();
  const poundUrl = process.env.REACT_APP_POUND_LIST + `/${1}`;
  const fightersUrl = process.env.REACT_APP_FIGHTERS;
  const [poundList, setPoundList] = useState([]);
  const [fighterId, setFighterId] = useState('');
  const [fightersList, setFightersList] = useState([]);
  const [fighterIdsList, setFighterIdsList] = useState([]);

  useEffect(() => {
    const getFighterOptions = async () => {
      return axios.get(poundUrl, tokenConfig)
          .then(res => {
            const getFighterIds = res.data.map( fighterObj => fighterObj.fighterId);
            setFighterIdsList(getFighterIds);   
            setPoundList(res.data)
          })
          .catch(err => console.log(err))
    }
    getFighterOptions();
  },[])

  const setForm = e => {
    const { value } = e.currentTarget;
    return setFighterId(value.trim());
  }
  const getFighter = e => {
    const url = fightersUrl + `/${fighterId}`;
    console.log('poundList: ',poundList)
    axios.get(url, tokenConfig)
      .then(res => {
        console.log('res.data: ',res.data)
        const addFighterToList = poundList.concat(res.data);
        setPoundList(addFighterToList);
        const tempFighterIdsArr = fighterIdsList.concat(res.data.fighterId);
        setFighterIdsList([... new Set(tempFighterIdsArr)]);
      })
      .catch(err => console.log(err))
  }
  const submitNewPoundList = () => {
    const url = process.env.REACT_APP_POUND_LIST;
    console.log('poundList: ',poundList);
    const updateObj = {
      list: fighterIdsList,
      updatedAt: new Date(),
      ownerId: '1'
    };
    console.log('updateObj: ',updateObj)
    return axios.post(url, updateObj, tokenConfig)
      .then(res => {
        if(res.status === 200){
          toast({ title: 'P4P List updated!',
            status: 'success',
            duration: 5000,
            isClosable: true})      
        }
      })
      .catch(err => console.log(err))
  }; 

  const deleteFighter = e => {
    const { id } = e.currentTarget
    const newPoundList = poundList.filter( fighter => fighter.fighterId !== id);
    setPoundList(newPoundList);
    const newFighterIdList = fighterIdsList.filter( fighterId => fighterId !== id);
    setFighterIdsList(newFighterIdList);
}
const selectFighter = e => {
    const { id } = e.currentTarget;
    const selected = poundList.filter( fighter => fighter.fighterId === id);
    setFighterId(selected[0].fighterId)
};
  console.log('poundList: ',poundList)
  console.log('fighterIdsList: ',fighterIdsList)
  return (
    <Box px={{base: '4',md: '10'}} py="16" maxWidth="3xl" mx="auto">
      <form id="pound-form" onSubmit={(e) => {e.preventDefault()}}>
        <Stack spacing="4" divider={<StackDivider />}>
          <Heading size="lg" as="h1" paddingBottom="4">
            Pound-4-Pound List Form
          </Heading>
          <FieldGroup title="Fighter to Add">
            <VStack width="full" spacing="6">
              <FormControl id="fighterId">
              <FormLabel>Fighter Id</FormLabel>
              <Input value={fighterId} onChange={e => setForm(e)} type="text" maxLength={255} />
              </FormControl>
            </VStack>
          </FieldGroup>
        </Stack>
        <Stack width="full">
          <FieldGroup mt="8">
            <HStack width="full">
            <Button onClick={e => getFighter(e)} type="submit" colorScheme="blue">
                Add Fighter
            </Button>
            <Button onClick={e => deleteFighter(e)} type="submit" colorScheme="blue">
                Delete Fighter
            </Button>
            <Button onClick={e => submitNewPoundList(e)} variant="outline">Submit New List</Button>
            </HStack>
          </FieldGroup>
          <StackDivider />
        </Stack>
      </form>
      <Flex flexDir="column" m="3" mt="3rem" maxHeight="15rem" overflowY="scroll">
        <Heading mb="3" as="h3" size="md">Pound-4-Pound Table</Heading>
        <Heading as="h5" size="xs">*Duplicates will not saved</Heading>
        <FightersTable p="1" selectFighter={selectFighter} deleteFighter={deleteFighter} fighters={poundList} />
      </Flex>
    </Box>
  )
}