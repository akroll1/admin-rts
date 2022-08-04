import React from 'react'
import { Flex, Table, TableCaption, Tbody, Td, Th, Thead, Tr, useColorModeValue as mode } from '@chakra-ui/react'
import { capFirstLetters } from '../../utils'

export const PanelistsTable = ({ panelists, handleSelectedPanelist }) => {
  return (
    <Flex flexDir="column" maxH="20rem" mx="auto" mt="1rem" px={{ base: '6', md: '8' }}>
      <PanelistsTableContent panelists={panelists} handleSelectedPanelist={handleSelectedPanelist} />
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
      Header: 'First Name',
      accessor: 'firstName',
  },
  {
      Header: 'Last Name',
      accessor: 'lastName'
  },
  {
    Header: 'Display Name',
    accessor: 'displayName'
  }
];
const PanelistsTableContent = ({ panelists, handleSelectedPanelist }) => {
   
  return (
    <Table my="8" borderWidth="1px" fontSize="sm" overflowY="scroll">
      <TableCaption placement="top">All Panelists Table</TableCaption> 
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
        {panelists?.length > 0 && panelists.map( (panelist, i) => {
            return (
                <Tr _hover={{cursor: 'pointer'}} onClick={handleSelectedPanelist} id={panelist.panelistId} key={panelist.panelistId}>
                    <Td>{capFirstLetters(panelist.firstName)}</Td>
                    <Td>{capFirstLetters(panelist.lastName)}</Td>
                    <Td>{capFirstLetters(panelist.displayName)}</Td>
                </Tr>
            )
        })}
      </Tbody>
    </Table>
  )
}