import React from 'react'
import { Button, Table, Tbody, Td, Th, Thead, Tr, useColorModeValue as mode } from '@chakra-ui/react'
import { Badge } from '@chakra-ui/react'
import { TableUser } from './table-user'
import {ExternalLinkIcon} from '@chakra-ui/icons'
  
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
  console.log('screwcardData: ',scorecardData)
  return (
    <Table my="8" borderWidth="1px" fontSize="sm" size={['sm', 'md']}>
      <Thead bg={mode('gray.50', 'gray.800')}>
        <Tr>
          {columns.map((column, index) => (
            <Th style={{textAlign:'center'}} whiteSpace="nowrap" scope="col" key={index}>
              {column.Header}
            </Th>
          ))}
          <Th />
        </Tr>
      </Thead>
      <Tbody>
        { scorecardData?.length > 0 && scorecardData.map((row, index) => {
          const { groupScorecardId } = row;
          return (
            <Tr style={{textAlign: 'center'}} key={index}>
              {columns.map((column, index) => {
                const cell = row[column.accessor];
                const element = column.Cell?.(cell) ?? cell;
                return (
                  <Td style={{textAlign: 'center'}} whiteSpace="nowrap" key={index}>
                    { element }                      
                  </Td>
                )
              })}
              <Td textAlign="right">
                <Button as="a" href={`/scoring/${groupScorecardId}`} variant="link" colorScheme="blue">
                Go <ExternalLinkIcon style={{marginBottom: '0.2rem',marginLeft: '0.5rem',fontSize: '1rem'}} /> 
                </Button>
              </Td>
            </Tr>
        )})}
      </Tbody>
    </Table>
  )
}