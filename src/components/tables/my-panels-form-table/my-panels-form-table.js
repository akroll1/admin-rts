import React from 'react'
import { Flex, Table, Tbody, Td, Th, Thead, Tr, useColorModeValue as mode } from '@chakra-ui/react'
import { capFirstLetters } from '../../../utils'
import { PanelistsTable } from '../panelists-table'

export const MyPanelsFormTable = ({ handlePanelSelect, panels }) => {
  return (
    <Flex 
        flexDir="column" 
        maxH="15rem" 
        overflow="scroll" 
        mx="auto" 
        mt="1rem" 
        px={{ base: '6', md: '8' }}
        minW="100%"
    >
      <MyPanelsTableContent handlePanelSelect={handlePanelSelect} panels={panels} />
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
      Header: 'Red Corner',
      accessor: 'fightQuickTitle',
  },
  {
      Header: 'Blue Corner',
      accessor: 'fightQuickTitle',
  },
  // {
  //     Header: 'Last Name',
  //     accessor: 'lastName'
  // },
];
const MyPanelsTableContent = ({ handlePanelSelect, panels }) => {
  return (
    <Table my="8" borderWidth="1px" fontSize="sm" variant="striped">
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
        {panels?.length > 0 && panels.map( panel => {
            const [fighter1, fighter2] = panel.fighters
            return (
                <Tr _hover={{cursor: 'pointer'}} onClick={handlePanelSelect} 
                  id={panel.fightId} 
                  key={panel.fightId}
                >
                  <Td textAlign="center">{`${capFirstLetters(fighter1.firstName)} ${capFirstLetters(fighter1.lastName)}`}</Td>
                  <Td textAlign="center">{`${capFirstLetters(fighter2.firstName)} ${capFirstLetters(fighter2.lastName)}`}</Td>
                </Tr>
            )
        })}
      </Tbody>
    </Table>
  )
}