import React from 'react'
import { Table, TableContainer, TableCaption, Tbody, Th, Thead, Td, Tr } from '@chakra-ui/react'
import { capFirstLetters } from '../../../utils'


export const AnalyticsGuestJudgeTable = ({ guestJudges }) => {
    console.log('guestJudges: ', guestJudges)

    return (
        <TableContainer w="75%" m="auto" mt="0">
            <Table variant='simple'>
                <TableCaption placement="top">Guest Judge Scorecards</TableCaption>
                <Thead>
                <Tr>
                    <Th textAlign="center">Judge</Th>
                    <Th textAlign="center">Prediction</Th>
                    <Th textAlign="center">Final Score</Th>
                </Tr>
                </Thead>
                <Tbody>
                    { guestJudges?.length > 0 && guestJudges?.map( judge => {
                        return (
                            <Tr textAlign="center" _hover={{background: 'gray.700', cursor: 'pointer'}} id={judge.guestJudgeId} key={judge.guestJudgeId}>
                                <Td textAlign="center">{`${capFirstLetters(judge.firstName)} ${capFirstLetters(judge.lastName)}`}</Td>
                                <Td textAlign="center">{`KO ${Math.ceil(Math.random()*10)}`}</Td>
                                <Td textAlign="center">{`${Math.ceil(Math.random()*100)}`}</Td>
                            </Tr>
                        )    
                    })}
                </Tbody>
            </Table>
        </TableContainer>
    )
}