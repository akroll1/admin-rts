import React from 'react'
import { Box, Flex, Heading, Table, Tbody, Td, Th, Thead, Tr, useColorModeValue as mode, IconButton } from '@chakra-ui/react'
import { DeleteIcon, CheckCircleIcon } from '@chakra-ui/icons'

export const ShowFormFightersTable = ({ fights, deleteFight }) => {
  return (
    <Flex flexDir="column" maxH="15rem" overflow="scroll" maxW={{ base: 'container.xl', md: '7xl' }} mx="auto" mt="1rem" px={{ base: '6', md: '8' }}>
      <Heading size="md" my="3">
          Fights Table
      </Heading>
      <ShowFormFightersTableContent fights={fights} deleteFight={deleteFight} />
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
      Header: 'Fighter A',
      accessor: 'lastName',
  },
  { 
      Header: 'VS',
      accessor: ''
  },
  {
      Header: 'Fighter B',
      accessor: 'lastName'
  },
  { 
      Header: 'Is Main Event',
      accessor: 'isMainEvent'
  },
  {
      Header: 'Delete',
      accessor: ''
  }
];

const ShowFormFightersTableContent = ({ fights, deleteFight }) => {
  return (
    <Table my="8" borderWidth="1px" fontSize="sm">
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
        {fights && fights.length > 0 && fights.map( (fight,i) => {
          // console.log('fight: ',fight)
          const { fighters, isMainEvent, fightId } = fight;

            return (
              <Tr id={i} style={{textAlign: 'center'}} key={i}>
                <Td style={{textAlign: 'center'}} p="1">{fighters[0].firstName} {fighters[0].lastName}</Td>
                <Td style={{textAlign: 'center'}}>vs.</Td>
                <Td style={{textAlign: 'center'}} p="1">{fighters[1].firstName} {fighters[1].lastName}</Td>
                <Td style={{textAlign: 'center'}} p="1" textAlign="center">{isMainEvent ? <IconButton style={{cursor: 'default',background: 'transparent'}} icon={<CheckCircleIcon />} /> : ''}</Td>
                <Td id={i} style={{textAlign: 'center'}} onClick={e => deleteFight(e)} p="1"><IconButton style={{background: 'transparent'}} icon={<DeleteIcon />} /></Td>
              </Tr>
            )
          })}
      </Tbody>
    </Table>
  )
}