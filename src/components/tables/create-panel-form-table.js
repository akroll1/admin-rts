import React from 'react'
import { Flex, Table, TableCaption, Tbody, Td, Th, Thead, Tr, useColorModeValue as mode } from '@chakra-ui/react'
import { capFirstLetters } from '../../utils'

export const CreatePanelAllPanelsTable = ({ panels, handleSelectPanel }) => {
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
      <CreatePanelAllPanelsTableContent panels={panels} handleSelectPanel={handleSelectPanel} />
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
      Header: 'Fight',
      accessor: 'fightQuickTitle',
  }
];
const CreatePanelAllPanelsTableContent = ({ panels, handleSelectPanel }) => {

  return (
    <Table my="8" mt="0" borderWidth="1px" fontSize="sm">
        <TableCaption placement="top" >All Panels Table</TableCaption>
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
        {panels?.length > 0 && panels.map( (panel, i) => {
            return (
                <Tr onClick={handleSelectPanel} _hover={{cursor: 'pointer'}} id={panel.panelId} key={panel.panelId}>
                    <Td>{capFirstLetters(panel.fightQuickTitle)}</Td>
                </Tr>
            )
        })}
      </Tbody>
    </Table>
  )
}