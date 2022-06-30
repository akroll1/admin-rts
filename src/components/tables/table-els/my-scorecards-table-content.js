import React from 'react'
import { Button, Flex, Table, Tbody, Td, Th, Thead, Tr, useColorModeValue as mode } from '@chakra-ui/react'
import { Badge } from '@chakra-ui/react'
import { TableUser } from './table-user'
import { useNavigate } from 'react-router'
import { capFirstLetters } from '../../../utils'

const badgeEnum = {
  completed: 'green',
  active: 'orange',
  // declined: 'red',
}


export const MyScorecardsTableContent = ({ scorecards }) => {
  // console.log('scorecards: ', scorecards)
  const navigate = useNavigate();

  return (
    <Flex overflow="scroll" w="100%">
      <Table my="8" borderWidth="1px" fontSize="sm" size={['sm', 'md']}>
        <Thead bg={mode('gray.50', 'gray.800')}>
          <Tr>
              <Th style={{textAlign:'center'}} whiteSpace="nowrap" scope="col">
                Scorecard  
              </Th>
              <Th style={{textAlign:'center'}} whiteSpace="nowrap" scope="col">
                Prediction
              </Th>
              <Th style={{textAlign:'center'}} whiteSpace="nowrap" scope="col">
                Status
              </Th>
          </Tr>
        </Thead>
        <Tbody>
          { scorecards?.length > 0 && scorecards.map((row, index) => {
            const { groupScorecardId, isComplete, label, prediction } = row;
            return (
              <Tr key={groupScorecardId} onClick={() => navigate(`/scoring/${groupScorecardId}`)} _hover={{cursor: 'pointer', bg: 'gray.700', color: '#fff', border: '1px solid #795858'}} style={{textAlign: 'center'}} key={index}>
                <Td textAlign="center" whiteSpace="nowrap">
                  { label }
                </Td>
                <Td textAlign="center" whiteSpace="nowrap">
                  { prediction }                      
                </Td>
                <Td textAlign="center" whiteSpace="nowrap">
                  { isComplete ? `Fight Complete` : `Upcoming` }                      
                </Td>
              </Tr>
          )})}
        </Tbody>
      </Table>
    </Flex>
  )
}