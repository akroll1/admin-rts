import React from 'react'
import { Button, Flex, Table, Tbody, Td, Th, Thead, Tr, useColorModeValue as mode } from '@chakra-ui/react'
import { Badge } from '@chakra-ui/react'
import { TableUser } from './table-user'
import { useNavigate } from 'react-router'
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
    // {
    //   Header: 'Scorecard Owner',
    //   accessor: 'ownerDisplayName'
    // },
    {
      Header: 'Red Corner',
      accessor: 'fighterA',
    },
    {
      Header: 'Blue Corner',
      accessor: 'fighterB',
    }
  ];

export const MyScorecardsTableContent = ({ scorecardData }) => {
  const navigate = useNavigate();
  console.log('screwcardData: ',scorecardData)
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
            const { groupScorecardId } = row;
            return (
              <Tr onClick={() => navigate(`/scoring/${groupScorecardId}`)} _hover={{cursor: 'pointer', bg: 'blue.700'}} style={{textAlign: 'center'}} key={index}>
                {columns.map((column, index) => {
                  const cell = row[column.accessor];
                  const element = column.Cell?.(cell) ?? cell;
                  return (
                    <Td style={{textAlign: 'center'}} whiteSpace="nowrap" key={index}>
                      { element }                      
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