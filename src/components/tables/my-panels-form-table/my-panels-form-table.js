import React from 'react'
import { Flex, Table, Tbody, Td, Th, Thead, Tr, useColorModeValue as mode } from '@chakra-ui/react'
import { capFirstLetters } from '../../../utils'

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
      Header: 'Fight',
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
        {panels?.length > 0 && panels.map( (panel, i) => {
            return (
                <Tr _hover={{cursor: 'pointer'}} onClick={handlePanelSelect} 
                  id={panel.panelId} 
                  key={panel.panelId}
                >
                  <Td textAlign="center">{capFirstLetters(panel.fightQuickTitle)}</Td>
                  {/* <Td>{capFirstLetters(panel.lastName)}</Td> */}
                </Tr>
            )
        })}
      </Tbody>
    </Table>
  )
}