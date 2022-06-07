
import React, {useEffect} from 'react'
import { Flex, Table, Th, Tr, Td, Thead,Tbody, useColorModeValue as mode } from '@chakra-ui/react'
import { ScoringTableInfo } from './scoring-table-els'
// import { scoringTablePrediction } from '../../utils'

export const ScoringTable = ({ fightResult, prediction, fighterA, fighterB, scorecards, totalRounds, currentRound }) => {
    const whichRoundKO = prediction => {
        if(prediction){
            prediction = prediction.toLowerCase();
            return prediction.includes('ko') ? prediction.slice(prediction.indexOf('ko')+2) : false;    
        }
    }
    const isFighterA = (prediction, fighterA) => {
        if(prediction){
            prediction = prediction.toLowerCase();
            return prediction.split(' ')[1].split(',')[0].includes(fighterA.toLowerCase().split(' ')[1]) ? 'fighterAScore' : 'fighterBScore';
        }
    }
        
    //     scoringTablePrediction(prediction, fighterA);
    // console.log('winType: ', winType);
    //     fighterA.includes
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
            accessor: 'round'
        },
        {
            Header: 'Total',
            accessor: 'total'
        },

    ];
    
    // console.log('scorecards: ',scorecards)
    const getPlayersData = scorecards && scorecards.length > 0 && scorecards.map( scorecard => {
        const { prediction, scores, ownerDisplayName, member, fighterATotal, fighterBTotal } = scorecard;
        const player = ownerDisplayName ? ownerDisplayName : member;
        const getRound = prediction => {
            if(!prediction) return 
            const index = prediction.indexOf('KO');
            if(index > -1){
                const round = prediction.slice(index+2);
                return round;
            } 
        }
        return ({
            player,
            scores,
            fighterATotal,
            fighterBTotal,
            round: getRound(prediction)
        });
    });
    // console.log('getPlayersData: ',getPlayersData)
    const rows = scorecards && scorecards.length > 0 ? scorecards.length : 0;
    const rounds = new Array(totalRounds).fill('Round');
    return (      
        <Flex 
            id="score_table" 
            overflow="auto" 
            w="50%" 
            m="auto"
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
            >
                { fightResult && <caption style={{margin: '1rem auto',width: '100%', captionSide:"top"}}>Official: {fightResult} </caption> }
                <Thead bg={mode('gray.50', 'gray.800')}>
                    <Tr>
                        {columns.map((column, index) => {

                            if(index === 0){
                                return (    
                                    <Th style={{transform:'rotate(-90deg)'}} color="white" fontWeight="bold" style={{width: '5%'}} key={index} whiteSpace="nowrap" scope="col" key={index}>
                                        {column.Header}
                                    </Th>
                                )
                            } else if(index === 1){
                                return rounds.map( (round, roundIndex) => {
                                    return <Th key={roundIndex} style={roundIndex+1 === currentRound ? {color:'white', fontWeight: 'bold', fontSize: '1.3rem', borderBottom:'1px dotted white'} : null} color="white" fontWeight="bold">{roundIndex+1}</Th>
                                })
                            } else if(index === 2){
                                return <Th color="white" fontWeight="bold">Total</Th>
                            }
                        })}
                    </Tr>
                </Thead>
                <Tbody>
                    {getPlayersData && getPlayersData.length > 0 && getPlayersData.map( (row, idx) => {
                        // console.log('row: ',row)
                        const { scores, fighterATotal, fighterBTotal } = row
                        return (
                            <Tr key={idx} p="0">
                                {columns.map( (column, i) => {
                                    // console.log('column: ',column)
                                    const cell = row[column.accessor];
                                    const element = column.Cell?.(row, fighterA, fighterB) ?? cell;
                                    
                                    if(i === 0){
                                        return (
                                            <Td p="0">
                                                {element}
                                            </Td>
                                        )
                                    }
                                    if(i === 1){
                                        return scores.map( (scoreRow,ind) => {
                                            // console.log('scoreRow: ',scoreRow)
                                            const koRound = whichRoundKO(prediction)-1;
                                            const whichFighter = isFighterA(prediction, fighterB);
                                            // console.log('whichFighter: ',whichFighter);

                                            // console.log('koRound: ',koRound)
                                            const { fighterAScore, fighterBScore } = scoreRow;
                                            return (
                                                <Td minW="100%" key={ind} p="1px">
                                                    <Flex p="1px" flexDirection="column" alignItems="center" justifyContent="space-between">
                                                        <Flex style={ind == koRound  ? {border:'1px solid red', fontSize: '1.2rem'} : null} borderRadius="3px" bg="gray.500" color="black" flexDirection="column" alignItems="center" justifyContent="center" w="100%">{fighterAScore}</Flex>
                                                        <Flex style={ind == koRound && whichFighter === String(fighterBScore) ? {border:'1px solid red', fontSize: '1.2rem'} : null} color="whiteAlpha.900" flexDirection="column" alignItems="center" justifyContent="center" mt="0.5rem" w="100%">{fighterBScore}</Flex>
                                                    </Flex>
                                                </Td>
                                        )
                                    })}
                                    if(i === 2){
                                        return (
                                            <Td p="0">
                                                <Flex p="0" flexDirection="column" alignItems="center" justifyContent="center">
                                                    <Flex fontWeight="bold" fontSize="md" color="gray.400" flexDirection="column" alignItems="center" justifyContent="center" w="100%">{fighterATotal}</Flex>
                                                    <Flex fontWeight="bold" fontSize="md" color="whiteAlpha.900" flexDirection="column" alignItems="center" justifyContent="center" mt="0.5rem" w="100%">{fighterBTotal}</Flex>
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
        
     