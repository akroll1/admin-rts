
import React, { useEffect, useState } from 'react'
import { Box, Flex, Table, Tbody, Td, Text, Th, Thead, Tr, useColorModeValue as mode } from '@chakra-ui/react'
import { ScoringTableInfo } from './scoring-table-els'

export const ScoringTable = ({ scoredRounds, tableData, tabs, totalRounds }) => {
    // console.log('tableData: ', tableData)
    const sort = (a, b) => a.username - b.username;
    const sortedTable = tableData.sort( sort )
    const columns = [
        {
            Header: 'Player',
            accessor: 'player',
            Cell: function TableCell(username, prediction) {
                return <ScoringTableInfo username={username} prediction={prediction} />
            }
        },
        {
            Header: 'Round',
            accessor: 'round'
        },
        {
            Header: 'Total',
            accessor: 'total'
        },

    ];
    
    // console.log('getPlayersData: ',getPlayersData)
    const rounds = new Array(totalRounds).fill('Round');
    const [fighter1, fighter2] = sortedTable?.length > 0 ? sortedTable[0].fighters : '';
    return (      
        <Flex 
            overflow="scroll"
            display={window.innerWidth <= 768 && tabs.table ? 'flex' : window.innerWidth > 768 ? 'flex' : 'none'}
            id="score_table" 
            w="100%" 
            m="auto"
            p="8"
            pt="2"
        >      
            <Table 
                style={{tableLayout:'auto', width: '100%'}} 
                overflowX="scroll" 
                overflowY="scroll" 
                size={["sm", "md"]} 
                variant="striped" 
                my="4" 
                borderWidth="1px" 
                fontSize="sm"
                bg="whiteAlpha.50"
            >
                {/* { fightResult && <caption style={{margin: '1rem auto',width: '100%', captionSide:"top"}}>Official: {fightResult} </caption> } */}
                <Thead bg={mode('gray.50', 'gray.800')}>
                    <Tr>
                        {columns.map((column, index) => {

                            if(index === 0){
                                return (    
                                    <Th 
                                        key={index} 
                                        // style={{transform:'rotate(-90deg)', width: '5%'}} 
                                        color="white" 
                                        fontWeight="bold" 
                                        whiteSpace="nowrap" 
                                        scope="col"
                                        textAlign="center"
                                    >
                                        {column.Header}
                                    </Th>
                                )
                            } else if(index === 1){
                                return rounds.map( (round, roundIndex) => {
                                    return (
                                        <Th 
                                            key={roundIndex} 
                                            // style={roundIndex === currentRound ? {color:'white', fontWeight: 'bold', fontSize: '1.3rem', borderBottom:'1px dotted white'} : null} 
                                            color="white" 
                                            fontWeight="bold"
                                            textAlign="center"
                                        >
                                            {roundIndex+1}
                                        </Th>
                                    )
                                })
                            } else if(index === 2){
                                return <Th key={index+99} color="white" fontWeight="bold">Total</Th>
                            }
                        })}
                    </Tr>
                </Thead>
                <Tbody>
                    {sortedTable?.length > 0 && sortedTable?.map( (row, idx) => {
                        const { mappedScores, prediction, totals, username } = row;;
                        let filledMappedScores;   
                        if(mappedScores.length <= totalRounds){
                            const numberToFill = totalRounds - (mappedScores.length);
                            const addingRounds = [...Array(numberToFill).fill(1)].map( round => ({[fighter1]:0, [fighter2]: 0}));
                            filledMappedScores = mappedScores.concat(addingRounds)
                        }
                        const currentRound = mappedScores.length;
                        const index = prediction ? prediction.indexOf(',') : '';
                        const transformedPrediction = prediction ? prediction.slice(0, index) : '';
                        const predictionResult = prediction ? prediction.slice(index+1) : '';
                        const roundKO = prediction ? predictionResult.slice(2) : '';
                        return (
                            <Tr key={idx} p="0">
                                {columns.map( (column, i) => {
                                    // console.log('column: ',column)
                                    const cell = row[column.accessor];
                                    const element = column.Cell?.(username, prediction) ?? cell;
                                    
                                    if(i === 0){
                                        return (
                                            <Td key={i} p="0">
                                                {element}
                                            </Td>
                                        )
                                    }
                                    if(i === 1){
                                        return filledMappedScores?.map( (roundScores, i) => {
                                            // console.log('roundScores: ', roundScores);
                                            return (
                                                <Td key={i+88} p="0px !important">
                                                    <Flex flexDirection="column" alignItems="center" justifyContent="space-between">
                                                        <Flex 
                                                            color={i >= mappedScores.length ? 'transparent' : "black"}
                                                            borderRadius="2px"
                                                            // borderX={(i) % 2 == 0 ? (i) >= currentRound ? "3px solid tranparent" : "3px solid #2e3648" : "3px solid transparent"}
                                                            w="100%"
                                                            p="1"
                                                            bg={roundScores[fighter1] ? "gray.500" : "gray.600"} 
                                                            flexDirection="column" 
                                                            alignItems="center" 
                                                            justifyContent="center" 
                                                            style={(i+1) == roundKO && (transformedPrediction == fighter1) ? {border:'1px solid red', fontSize: '1.2rem'} : {border: '1px solid #2e3648'} }
                                                        >   
                                                            {roundScores[fighter1]}
                                                        </Flex>
                                                        <Flex 
                                                            w="100%"
                                                            style={(i+1) == roundKO && (transformedPrediction == fighter2) ? {border:'1px solid red', fontSize: '1.2rem'} : {border: "1px solid RGBA(0, 0, 0, 0.36)"} } 
                                                            color={i >= mappedScores.length ? 'transparent' : "whiteAlpha.900"}

                                                            flexDirection="column" 
                                                            alignItems="center" 
                                                            justifyContent="center" 
                                                            mt="0.5rem" 
                                                            p="1"
                                                        >
                                                            {roundScores[fighter2]}
                                                        </Flex>
                                                    </Flex>
                                                </Td>
                                            )
                                        })
                                    }
                                    if(i === 2){
                                        return (
                                            <Td p="0" key={i+44}>
                                                <Flex p="0" flexDirection="column" alignItems="center" justifyContent="center">
                                                    <Flex 
                                                        fontWeight="bold" 
                                                        fontSize="md" 
                                                        color="gray.400" 
                                                        flexDirection="column" 
                                                        alignItems="center" 
                                                        justifyContent="center" 
                                                        w="100%"
                                                    >
                                                        {totals[fighter1]}
                                                    </Flex>
                                                    <Flex 
                                                        fontWeight="bold" 
                                                        fontSize="md" 
                                                        color="whiteAlpha.900" 
                                                        flexDirection="column" 
                                                        alignItems="center" 
                                                        justifyContent="center" 
                                                        mt="0.5rem" w="100%"
                                                    >
                                                        {totals[fighter2]}
                                                    </Flex>
                                                </Flex>
                                            </Td>
                                        )
                                    }
                                })}

                            </Tr>
                        )
                    })}
                </Tbody>
            </Table>
        </Flex>
    )
}