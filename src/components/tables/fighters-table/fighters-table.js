import React from 'react'
import { Box, Table, Tbody, Td, Th, Thead, Tr, useColorModeValue as mode, IconButton } from '@chakra-ui/react'
import { DeleteIcon, CheckCircleIcon } from '@chakra-ui/icons'
import { capFirstLetters } from '../../../utils/utils'

export const FightersTable = ({ fighters, deleteFighter, selectFighter }) => {
  return (
    <Box w="100%" mx="auto" px={{ base: '6', md: '8' }}>
      <FightersTableContent fighters={fighters} deleteFighter={deleteFighter} selectFighter={selectFighter} />
    </Box>
  )
}
 
const badgeEnum = {
  completed: 'green',
  active: 'orange',
  // declined: 'red',
}
const columns = [
  {
      Header: 'Name',
      accessor: 's',
  },
  {
      Header: 'Ring Name',
      accessor: 'ringname'
  },
  {
      Header: 'Delete',
      accessor: ''
  }
];

const FightersTableContent = ({ fighters, deleteFighter, selectFighter }) => {
  // console.log('fighters: ',fighters)
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
        {fighters && fighters.length > 0 && fighters.map( (fighter,i) => {
            const { fighterId, firstName, lastName, ringname } = fighter;
            const fullName = capFirstLetters(firstName) + ' ' + capFirstLetters(lastName);
            return (
              <Tr style={{textAlign: 'center', cursor: 'pointer'}} key={i}>
                <Td p="2" id={fighterId} onClick={e => selectFighter(e)}>{fullName}</Td>
                <Td style={{textAlign: 'center'}}>{ringname}</Td>
                <Td style={{textAlign: 'center'}} p="2"><IconButton id={fighterId} onClick={e => deleteFighter(e)} style={{background: 'transparent'}} icon={<DeleteIcon />} /></Td>
              </Tr>
            )
        })}
      </Tbody>
    </Table>
  )
}