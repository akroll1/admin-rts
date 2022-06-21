
import React, { useEffect, useState } from 'react'
import { Box, Flex, Text, useColorModeValue as mode } from '@chakra-ui/react'
import { ScoringTableInfo } from './scoring-table-els'

export const ScoringTable = ({ tableData, totalRounds }) => {
    // console.log('tableData: ', tableData);
    const columns = [
        {
            Header: 'Player',
            accessor: 'player',
            Cell: function TableCell(row, fighterA, fighterB) {
                return <ScoringTableInfo data={row} fighterA={fighterA} fighterB={fighterB} />
            }
        },
        {
            Header: 'Round',
            accessor: 'rounds'
        },
        {
            Header: 'Total',
            accessor: 'total'
        },

    ];
    const MapRounds = totalRounds => {
        return [...Array(totalRounds).fill(1)].map( (round, i) => {
            const width = String(100 / totalRounds)+ '%';

            return (
                <Flex maxW={width} minW={width}>
                    <Text m="auto">{i + 1}</Text>
                </Flex>
            )
        })
    };
    const MapOther = label => {
        return (
            <Flex alignItems="center" justifyContent="center" m="auto" >
                <Text>{label}</Text>
            </Flex>
        )
    }
    const [fighter1, fighter2] = tableData.length > 0 ? tableData[0].fighters : '';
    return (      
        <Flex 
            id="scoring_table" 
            flexDir="column"
            m="auto"
            p="4"
            overflowX="scroll"
            w="100%"
        >     
            <Flex maxW="90%" minW="90%" flexDir="column">
                <Flex minW="100%" m="auto" flexDir="row" justifyContent="space-between" bg={mode('gray.50', 'gray.800')}>
                    { columns.map( (column, i) => {

                        return (
                            <Flex fontWeight="bold" alignItems="center" justifyContent="center" maxW={column.Header === 'Round' ? '80%' : ''} minW={column.Header === 'Round' ? '80%' : '15%'}>
                                {column.Header === 'Round' ? MapRounds(totalRounds) : MapOther(column.Header)}
                            </Flex>
                        )  
                    })}
                </Flex>
                <Flex minW="100%" flexDir="column" justifyContent="space-between" bg={mode('gray.50', 'gray.800')}>
                    { tableData.map( (row, i) => {
                        let { displayName, mappedScores, totals } = row;
                        displayName = displayName.indexOf('@') > -1 ? displayName.slice(0, displayName.indexOf('@')) : displayName;
                        const getRounds = () => {
                            if(mappedScores.length >= totalRounds){
                                return mappedScores.slice(0, totalRounds);
                            } 
                            
                            const dummySlots = totalRounds - mappedScores.length;
                            const fillerArr = Array(dummySlots).fill('');
                            return mappedScores.concat(...fillerArr);
                        }
                        const rounds = getRounds();
                        return (
                            <Flex flexDir="row" minW="100%" minH="4rem">
                                <Flex m="auto" borderRadius="3px" p="2" alignItems="center" justifyContent="flex-start" minW="15%">{displayName}</Flex>
                                <Flex minW="80%" flexDir="row" justifyContent="center" alignContent="center">
                                    {
                                        rounds.map( score => {
                                            return (
                                                <Flex minH="4rem" flexDir="column" minW={`${100/totalRounds}%`} justifyContent="center">
                                                    <Flex borderRadius="1px" bg="whiteAlpha.300" justifyContent="center" flexDir="row">
                                                        { score[fighter1] ? score[fighter1] : '0'  }
                                                    </Flex>
                                                    <Flex justifyContent="center" flexDir="row">
                                                        { score[fighter2] ? score[fighter2] : '0'  }
                                                    </Flex>
                                                </Flex>
                                            )
                                        })
                                    }
                                </Flex>
                                <Flex py="2" flexDir="column" minW="10%">
                                    <Flex  borderRadius="2px" bg="whiteAlpha.400" minW="100%" flexDir="column" alignItems="center" justifyContent="center">
                                        {!totals[fighter1] ? '0' : totals[fighter1]}
                                    </Flex>
                                    <Flex minW="100%" flexDir="column" alignItems="center" justifyContent="center">
                                        {!totals[fighter2] ? '0' : totals[fighter2]}
                                    </Flex>
                                </Flex>
                            </Flex>
                        )
                    })}
                </Flex>
            </Flex>
        </Flex>
    )
}
        
     