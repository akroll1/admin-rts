import React from 'react'
import { Flex, Table, TableCaption, Tbody, Td, Th, Thead, Tr, useColorModeValue as mode } from '@chakra-ui/react'
import { capFirstLetters } from '../../utils'

export const SeasonsTable = ({ 
    handleSelectedSeason,
    seasons, 
}) => {
  return (
    <Flex 
      flexDir="column" 
      maxH="20rem" 
      mx="auto" 
      mt="1rem" 
      px={{ base: '6', md: '8' }}
    >
      <SeasonsTableContent 
        seasons={seasons} 
        handleSelectedSeason={handleSelectedSeason} 
      />
    </Flex>
  )
}
 
const badgeEnum = {
  completed: 'green',
  active: 'orange',
  // declined: 'red',
}
const columns = [
  {
      Header: 'Season',
      accessor: 'seasonTitle',
  },
  {
      Header: 'Start Date',
      accessor: 'start'
  },
  {
    Header: 'End Date',
    accessor: 'end'
  }
];
const SeasonsTableContent = ({ 
  handleSelectedSeason,
  seasons, 
}) => {
   
  return (
    <Table my="8" borderWidth="1px" fontSize="sm" overflowY="scroll">
      <TableCaption placement="top">Seasons Table</TableCaption> 
      <Thead bg={mode('gray.50', 'gray.800')}>
        <Tr>
          {columns.map((column, index) => (
            <Th 
                whiteSpace="nowrap" 
                scope="col" 
                key={index}
            >
              {column.Header}
            </Th>
          ))}
        </Tr>
      </Thead>
      <Tbody>
        {seasons?.length > 0 && seasons.map( (season, i) => {
            return (
                <Tr _hover={{cursor: 'pointer'}} onClick={handleSelectedSeason} id={season.seasonId} key={season.seasonId}>
                    <Td>{capFirstLetters(season.seasonTitle)}</Td>
                    <Td>{capFirstLetters(season.start)}</Td>
                    <Td>{capFirstLetters(season.end)}</Td>
                </Tr>
            )
        })}
      </Tbody>
    </Table>
  )
}