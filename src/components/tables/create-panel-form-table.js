import React from 'react'
import { Flex, Table, Tbody, Td, Th, Thead, Tr, useColorModeValue as mode } from '@chakra-ui/react'
import { capFirstLetters } from '../../utils'

export const CreatePanelFormTable = ({ panelists }) => {
  return (
    <Flex 
        flexDir="column" 
        maxH="15rem" 
        overflow="scroll" 
        maxW={{ base: 'container.xl', md: '7xl' }} 
        mx="auto" 
        mt="1rem" 
        px={{ base: '6', md: '8' }}
    >
      <CreatePanelFormTableContent panelists={panelists} />
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
const CreatePanelFormTableContent = ({ panelists }) => {

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
                <Tr _hover={{cursor: 'pointer'}} id={panelist.panelistId} key={panelist.panelistId}>
                    <Td>{capFirstLetters(panelist.firstName)}</Td>
                    <Td>{capFirstLetters(panelist.lastName)}</Td>
                </Tr>
            )
        })}
      </Tbody>
    </Table>
  )
}