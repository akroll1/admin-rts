import { Flex, Heading, Table, TableCaption, Tbody, Td, Th, Thead, Tr, useColorModeValue as mode } from '@chakra-ui/react'
import { ScoringTableInfo } from './scoring-table-els'
import { useScorecardStore } from '../../stores'
import { FightStats } from '../sidebars/chat-sidebar-components'
import { ScoringDividerWithText } from './table-els/scoring-divider-with-text'

export const ScoringTable = ({ 
    tabs, 
}) => {
    const {
        currentRound,
        fight,
        tableData, 
    } = useScorecardStore()
    console.log('tableData: ', tableData)
    const totalRounds = fight ? fight.rounds : 12;

    const sortData = (a, b) => a.username - b.username

    const sortedTable = tableData?.sort(sortData)
    const columns = [
        {
            Header: 'Player',
            accessor: 'player',
            Cell: function TableCell( fighters, prediction, username, finalScore ) {
                return (
                    <ScoringTableInfo 
                        fighters={fighters} 
                        prediction={prediction} 
                        username={username} 
                        finalScore={finalScore}
                    />
                )
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
    

    const rounds = new Array(totalRounds).fill('Round')
    const [fighter1, fighter2] = sortedTable?.length > 0 ? sortedTable[0].fighters : ''
    
    const renderRoundStyles = (i, roundKO, transformedPrediction, fighter) => {
        if((i+1) == roundKO && transformedPrediction == fighter){
            if(currentRound === (i+1)){
                return ({ border: '2px solid #e56a54' })    
            } else {
                return ({ border: '1px solid white' })
            }
        } else {
            return ({ border: '1px solid #656565' })
        }
    }

    return (      
        <>
            <ScoringDividerWithText 
                text="Your Group" 
                tabs={tabs} 
                centered={tabs.all ? true : false}
            />

            <FightStats tabs={tabs} />

            <Flex 
                overflow="scroll"
                display={tabs.all || tabs.table ? 'flex' : 'none'}
                flexDirection="column"
                id="score_table" 
                w="100%" 
                p="8"
                pt="2"
                my="auto"
                h="auto"
                // maxH={["60vh", "70vh"]}
            >      
                <Table 
                    id="scoring_table"
                    style={{tableLayout:'auto', width: '100%'}} 
                    overflowX="scroll" 
                    overflowY="scroll" 
                    size={["sm", "md"]} 
                    variant="scoringTable" 
                    my="4" 
                    borderWidth="1px" 
                    fontSize="sm"
                    bg="whiteAlpha.50"
                >
                    { fight?.fightStatus === `COMPLETE` && <TableCaption placement="top"><Heading size="md">FIGHT IS OFFICIAL</Heading></TableCaption> }
                    <Thead bg={mode('gray.50', '#111111')}>
                        <Tr>
                            {columns.map((column, index) => {

                                if(index === 0){
                                    return (    
                                        <Th 
                                            key={index} 
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

                                                fontWeight="bold"
                                                textAlign="center"
                                                style={currentRound === (roundIndex + 1) ? { color: 'white', fontSize: '1.2rem' } : { color: '#c8c8c8'} }
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
                            const { fighters, finalScore, mappedScores, prediction, totals, username } = row;;
                            let filledMappedScores;   
                            if(mappedScores.length <= totalRounds){
                                const numberToFill = totalRounds - (mappedScores.length);
                                const addingRounds = [...Array(numberToFill).fill(1)].map( round => ({[fighter1]:0, [fighter2]: 0}));
                                filledMappedScores = mappedScores.concat(addingRounds)
                            }
                            const index = prediction ? prediction.indexOf('-') : '';
                            const transformedPrediction = prediction ? prediction.slice(0, index) : '';
                            const predictionResult = prediction ? prediction.slice(index+2) : '';
                            const roundKO = prediction ? predictionResult.slice(2) : '';
                            return (
                                <Tr key={idx} p="0">
                                    {columns.map( (column, i) => {
                                        // console.log('column: ',column)
                                        const cell = row[column.accessor];
                                        const element = column.Cell?.( fighters, prediction, username, finalScore ) ?? cell;
                                        
                                        if(i === 0){
                                            return (
                                                <Td 
                                                    className='firstTd' 
                                                    key={i} 
                                                    p="0"
                                                >
                                                    {element}
                                                </Td>
                                            )
                                        }
                                        if(i === 1){
                                            return filledMappedScores?.map( (roundScores, _i) => {
                                                // console.log('roundScores: ', roundScores);
                                                return (
                                                    <Td key={_i} p="0px !important">
                                                        <Flex flexDirection="column" alignItems="center" justifyContent="space-between">
                                                            <Flex 
                                                                color={_i >= mappedScores.length ? 'transparent' : "white"}
                                                                borderRadius="2px"
                                                                w="100%"
                                                                p="1"
                                                                bg={roundScores[fighter1] ? "#4C4C4C" : "#383838"}
                                                                flexDirection="column" 
                                                                alignItems="center" 
                                                                justifyContent="center" 
                                                                style={renderRoundStyles(_i, roundKO, transformedPrediction, fighter1)}
                                                            >   
                                                                {roundScores[fighter1]}
                                                            </Flex>
                                                            <Flex 
                                                                w="100%"
                                                                style={renderRoundStyles(_i, roundKO, transformedPrediction, fighter2)}
                                                                // style={(i+1) == roundKO && (transformedPrediction == fighter2) ? currentRound === (i+1) ? { border: '1px solid #e56a54' } : { border: '1px solid white' } : { border: "1px solid #656565" } } 
                                                                color={_i >= mappedScores.length ? 'transparent' : "white"}
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
                                                <Td 
                                                    className="scoreTd"
                                                    p="0" 
                                                    key={i+44}
                                                >
                                                    <Flex 
                                                        className="scoresTotal"
                                                        p="0" 
                                                        flexDirection="column" 
                                                        alignItems="center" 
                                                        justifyContent="center"
                                                    >
                                                        <Flex 
                                                            className="scores"
                                                            bg="fsl-red"
                                                            fontWeight="bold" 
                                                            fontSize="lg" 
                                                            color="whiteAlpha.800" 
                                                            flexDirection="column" 
                                                            alignItems="center" 
                                                            justifyContent="center" 
                                                            w="100%"
                                                            >
                                                            {totals[fighter1]}
                                                        </Flex>
                                                        <Flex 
                                                            className="scores"
                                                            bg="fsl-scoring-blue"
                                                            fontWeight="bold" 
                                                            fontSize="lg" 
                                                            color="whiteAlpha.800" 
                                                            flexDirection="column" 
                                                            alignItems="center" 
                                                            justifyContent="center" 
                                                            mt="0.5rem" 
                                                            w="100%"
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
        </> 
    )
}