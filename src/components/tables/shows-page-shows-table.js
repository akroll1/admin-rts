import React from 'react'
import { Avatar, Badge, Box, Button, ButtonGroup, Flex, FormControl, FormLabel, Heading, HStack, Input, InputGroup, InputLeftElement, Select, Stack, Text, Table, Tbody, Thead, Td, Th, Tr, useColorModeValue as mode } from '@chakra-ui/react'
import { BsSearch } from 'react-icons/bs'
import { RiAddFill, RiArrowRightUpLine } from 'react-icons/ri'
import { ShowInfo } from '../../chakra'

const badgeEnum = {
    active: 'green',
    retired: 'orange',
    beltholder: 'red'
};
const columns = [
    {
      Header: 'Name',
      accessor: 'fullName',
      Cell: function MemberCell(cellData) {
        return <ShowInfo data={cellData} />
      },
    },
    {
      Header: 'VS'
    },
    {
      Header: 'Name',
      accessor: 'fullName',
      Cell: function MemberCell(cellData) {
        return <ShowInfo data={cellData} />
      },
    },
    
];
export const ShowsPageShowsTable = ({ selectedShow, handleFightSelect }) => {
    console.log('selectedShow, table: ',selectedShow)
    const { fights } = selectedShow;
    console.log('fightss: ',fights)
    return (
        // <Box w="100%" overflow="scroll" as="section" py="12">
        <Box maxW={{base: 'xl', md: '7xl'}} mx="auto" px={{base: '6', md: '8'}}>
            <Box overflowX="auto">
                <TableActions />
                <TableContent selectedShow={selectedShow} handleFightSelect={handleFightSelect} />
            </Box>
        </Box>
        // </Box>
    )
}
  
const TableContent = ({ selectedShow, handleFightSelect }) => {
  let fighters;
  let fights;
  if(selectedShow.showId){
    fights = selectedShow.fights;
    fighters = fights.map( fight => fight.fighters)
    console.log('fighters: ', fighters);
  };
  return (
    <Table variant="striped" w="100%" my="8" borderWidth="1px" fontSize="sm">
      <Thead bg={mode('gray.50', 'gray.800')}>
        <Tr>
          {columns.map((column, index) => (
            <Th whiteSpace="nowrap" scope="col" key={index}>
              {column.Header}
            </Th>
          ))}
          <Th />
        </Tr>
      </Thead>
      <Tbody>
          {fighters && fighters.length > 0 && fighters.map((row, index) => {
              const { showId } = row;
              return (
                  <Tr id={showId} onClick={e => handleFightSelect(e)} key={index} _hover={{background: '#140e0e',cursor: 'pointer'}}>
                      {columns.map((column, index) => {
                          const cell = row[column.accessor]
                          const element = column.Cell?.(fights) ?? cell
                          return (
                          <Td margin="auto" whiteSpace="nowrap" key={index}>
                              {element}
                          </Td>
                          )
                      })}
                      <Td textAlign="right">
                          <Button id={index} onClick={e => handleFightSelect(e)} variant="link" colorScheme="blue">
                              Select
                          </Button>
                      </Td>
                  </Tr>
              )
          })}
      </Tbody>
    </Table>
  )
}
const TableActions = () => {
  return (
    <Stack spacing="4" direction={{base: 'column', md: 'row'}} justify="space-between">
      <HStack>
        <FormControl minW={{md: '320px'}} id="search">
          <InputGroup size="sm">
            <FormLabel srOnly>Filter by name or email</FormLabel>
            <InputLeftElement pointerEvents="none" color="gray.400">
              <BsSearch />
            </InputLeftElement>
            <Input rounded="base" type="search" placeholder="Filter by name or email..." />
          </InputGroup>
        </FormControl>
        <Select w={{base: '200px'}} rounded="base" size="sm" placeholder="Filters">
          <option>Televised</option>
          <option>Local</option>
        </Select>
      </HStack>
    </Stack>
  )
}

const TablePagination = ({ total }) => {
  return (
    <Flex w="100%" align="center" justify="space-between">
      <Text color={mode('gray.600', 'gray.400')} fontSize="sm">
        {total} Shows
      </Text>
      <ButtonGroup variant="outline" size="sm">
        <Button cursor="pointer" as="a" rel="prev">
          Previous
        </Button>
        <Button cursor="pointer" as="a" rel="next">
          Next
        </Button>
      </ButtonGroup>
    </Flex>
  )
}