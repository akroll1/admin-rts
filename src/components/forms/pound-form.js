import React, { useState, useEffect } from 'react'
import { Avatar, Box, Button, Flex, FormControl, FormLabel, Heading, HStack, Input, Stack, StackDivider, useToast, VStack } from '@chakra-ui/react'
import { FieldGroup } from '../../chakra'
import { FightersTable } from '../tables'
import { useScorecardStore } from '../../stores'

export const PoundForm = () => {
  const {
    fetchList,
    poundListOfficial,
    poundListUser,
    submitList,
  } = useScorecardStore();

  const toast = useToast();
  const [poundList, setPoundList] = useState([]);
  const [fighterId, setFighterId] = useState('');
  const [fighterIdsList, setFighterIdsList] = useState([]);

  useEffect(() => {
    fetchList('pound')
  },[])

  const setForm = e => {
    const { value } = e.currentTarget;
    return setFighterId(value.trim());
  }

  const handleSubmitList = () => {
    const listObj = {
      comment: 'New List',
      list: ['1234-5678'],
      listType: 'pound'
    }
    console.log('listObj: ', listObj)
    submitList(listObj)
  }

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
  }

  console.log('fighterIdsList: ', fighterIdsList)
  console.log('poundListUser ', poundListUser)
  console.log('poundListOfficial ', poundListOfficial)
  return (
    <Box px={{base: '4',md: '10'}} py="16" maxWidth="3xl" mx="auto">
      <form id="pound-form" onSubmit={(e) => {e.preventDefault()}}>
        <Stack spacing="4" divider={<StackDivider />}>
          <Heading size="lg" as="h1" paddingBottom="4">
            Official Pound-4-Pound List Form
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
            {/* <Button onClick={e => getFighter(e)} type="submit" colorScheme="blue">
                Add Fighter
            </Button>
            <Button onClick={e => deleteFighter(e)} type="submit" colorScheme="blue">
                Delete Fighter
            </Button> */}
            <Button onClick={handleSubmitList} variant="outline">Submit New List</Button>
            </HStack>
          </FieldGroup>
          <StackDivider />
        </Stack>
      </form>
      <Flex flexDir="column" m="3" mt="3rem" maxHeight="15rem" overflowY="scroll">
        <Heading mb="3" as="h3" size="md">Pound-4-Pound Table</Heading>
        <Heading as="h5" size="xs">*Duplicates will not saved</Heading>
        <FightersTable 
          p="1" 
          selectFighter={selectFighter} 
          deleteFighter={deleteFighter} 
          fighters={poundList} 
        />
      </Flex>
    </Box>
  )
}