import React from 'react'
import { Flex, Table, TableCaption, Tbody, Td, Th, Thead, Tr, useColorModeValue as mode } from '@chakra-ui/react'
import { capFirstLetters } from '../../utils'

export const ScorecardsSearchTable = ({ handleScorecardSelect, searchedUserScorecards, searchedUsername }) => {
  return (
    <Flex 
        w="50%"
        flexDir="column" 
        overflow="scroll" 
        maxW={{ base: 'container.xl', md: '7xl' }} 
        mx="auto" 
        mt="1rem" 
        px={{ base: '6', md: '8' }}
    >
      <ScorecardsSearchContent 
        handleScorecardSelect={handleScorecardSelect}
        searchedUserScorecards={searchedUserScorecards} 
        searchedUsername={searchedUsername}
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
      Header: 'Scorecards',
      accessor: '',
  }
];
const ScorecardsSearchContent = ({ handleScorecardSelect, searchedUserScorecards, searchedUsername }) => {

  return (
    <Table 
        variant="striped"
        my="8" 
        mt="0" 
        borderWidth="1px" 
        fontSize="sm"
    >
        <TableCaption placement="top" >{`${searchedUsername}'s Scorecards`}</TableCaption>
        <Thead bg={mode('gray.50', 'gray.800')}>
            <Tr>
            {columns.map((column, index) => (
                <Th 
                    textAlign="center"
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
            {searchedUserScorecards?.length > 0 && searchedUserScorecards.map( (scorecard, i) => {
                console.log('searchedUserScorecards: ', searchedUserScorecards)
                return (
                    <Tr 
                        onClick={handleScorecardSelect} 
                        _hover={{cursor: 'pointer'}} 
                        id={scorecard.scorecardId} 
                        key={scorecard.fightId}
                    >
                        <Td>{scorecard.fightQuickTitle}</Td>
                    </Tr>
                )
            })}
        </Tbody>
    </Table>
  )
}