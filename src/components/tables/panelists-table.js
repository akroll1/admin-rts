import React from 'react'
import { Flex, Table, Tbody, Td, Th, Thead, Tr, useColorModeValue as mode } from '@chakra-ui/react'
import { capFirstLetters } from '../../utils'
import { ConsoleLogger } from '@aws-amplify/core'

export const PanelistsTable = ({ panelists }) => {
  return (
    <Flex flexDir="column" maxH="15rem" overflow="scroll" maxW={{ base: 'container.xl', md: '7xl' }} mx="auto" mt="1rem" px={{ base: '6', md: '8' }}>
      <PanelistsTableContent panelists={panelists} />
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
];
const PanelistsTableContent = ({ panelists }) => {
    const logPanelistInfo = e => {
        const { id } = e.currentTarget;
        const [panelist] = panelists.filter( panelist => panelist.panelistId === id);
        console.log('panelist: ', panelist)
    
    }
  return (
    <Table my="8" borderWidth="1px" fontSize="sm">
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
        {panelists?.length > 0 && panelists.map( (panelist, i) => {
            return (
                <Tr _hover={{cursor: 'pointer'}} onClick={logPanelistInfo} id={panelist.panelistId} key={panelist.panelistId}>
                    <Td>{capFirstLetters(panelist.firstName)}</Td>
                    <Td>{capFirstLetters(panelist.lastName)}</Td>
                </Tr>
            )
        })}
      </Tbody>
    </Table>
  )
}