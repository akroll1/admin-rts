import React from 'react'
import { Table, TableContainer, TableCaption, Tbody, Th, Thead, Td, Tr } from '@chakra-ui/react'
import { capFirstLetters } from '../../../utils'


export const ScoringMoneylineTable = () => {

    return (
        <TableContainer>
            <Table variant='simple'>
                <Thead>
                    <Tr>
                        <Th textAlign="center">Prop</Th>
                        <Th textAlign="center">Odds</Th>
                    </Tr>
                </Thead>
                <Tbody>
                    
                </Tbody>
            </Table>
        </TableContainer>
    )
}