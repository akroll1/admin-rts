import React from 'react'
import { Button, Flex, Table, Tbody, Td, Th, Thead, Tr, useColorModeValue as mode } from '@chakra-ui/react'
import { Badge } from '@chakra-ui/react'
import { TableUser } from './table-user'
import { useNavigate } from 'react-router'
import { capFirstLetters } from '../../../utils'
import { IoConstructOutline } from 'react-icons/io5'

const badgeEnum = {
  completed: 'green',
  active: 'orange',
  // declined: 'red',
}
export const columns = [
  {
    Header: 'Group Scorecard Name',
    accessor: 'groupScorecardName',
    Cell: function MemberCell(data) {
      return <TableUser gsDisplayName={data} />
    },
  },
  {
    Header: 'Your Prediction',
    accessor: 'prediction'
  }
];

export const MyScorecardsTableContent = ({ scorecardData }) => {
  const navigate = useNavigate();
  
  const getPrediction = scorecardData => {
    return scorecardData.map( data => {
      const { fighterData, scorecard } = data;
      if(scorecard.prediction){
        const [prediction] = fighterData.filter( fighter => fighter.fighterId === scorecard.prediction.slice(0,36));
        return `${capFirstLetters(prediction.lastName)} ${scorecard.prediction.slice(37)}`;
      }
      return 'Prediction Not Set'
    })
  };

  return (
    <Flex overflow="scroll" w="100%">
      <Table my="8" borderWidth="1px" fontSize="sm" size={['sm', 'md']}>
        <Thead bg={mode('gray.50', 'gray.800')}>
          <Tr>
            {columns.map((column, index) => (
              <Th style={{textAlign:'center'}} whiteSpace="nowrap" scope="col" key={index}>
                {column.Header}
              </Th>
            ))}
          </Tr>
        </Thead>
        <Tbody>
          { scorecardData?.length > 0 && scorecardData.map((row, index) => {
            const { associatedGroupScorecard } = row;
            const { groupScorecardId, groupScorecardName } = associatedGroupScorecard;
            return (
              <Tr onClick={() => navigate(`/scoring/${groupScorecardId}`)} _hover={{cursor: 'pointer', bg: 'gray.700', color: '#fff', border: '1px solid #795858'}} style={{textAlign: 'center'}} key={index}>
                {columns.map((column, index) => {
                  const { accessor } = column;
                  return (
                    <Td style={{textAlign: 'center'}} whiteSpace="nowrap" key={index}>
                      { accessor === 'prediction' ? getPrediction(scorecardData)[0] : groupScorecardName}                      
                    </Td>
                  )
                })}
              </Tr>
          )})}
        </Tbody>
      </Table>
    </Flex>
  )
}