import { 
    Flex, 
    Table, 
    Tbody, 
    Td, 
    Th, 
    Thead, 
    Tr, 
    useColorModeValue as mode 
} from '@chakra-ui/react'
import { capFirstLetters } from '../../utils';

export const ScorecardsPageScoringTable = ({ 
    tableData, 
    totalRounds 
}) => {
    // console.log('tableData: ', tableData)
    const sort = (a, b) => a.username - b.username;
    const sortedTable = tableData.sort( sort )
    const columns = [
        {
            Header: 'Fighter'
        },
        {
            Header: 'Round' 
        },
        {
            Header: 'Total'
        },
    ];
    
    // console.log('getPlayersData: ',getPlayersData)
    const rounds = new Array(totalRounds).fill('Round');
    const [fighter1, fighter2] = sortedTable?.length > 0 ? sortedTable[0].fighters : '';

    return (      
        <Flex 
            overflow="scroll"
            id="score_table" 
            w="100%" 
            p="8"
            pt="2"
            my="auto"
            h="auto"
        >      
            <Table 
                style={{tableLayout:'auto', width: '100%'}} 
                overflowX="scroll" 
                size={["sm"]} 
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
                                            // style={roundIndex === lastScoredRound ? {color:'white', fontWeight: 'bold', fontSize: '1.3rem', borderBottom:'1px dotted white'} : null} 
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
                            const addingRounds = [...Array(numberToFill).fill(1)].map( round => ({[fighter1.lastName]:0, [fighter2.lastName]: 0}));
                            filledMappedScores = mappedScores.concat(addingRounds)
                        }
                        const lastScoredRound = mappedScores.length;
                        const index = prediction ? prediction.indexOf(',') : '';
                        const slicedPrediction = prediction ? prediction.slice(0, index) : '';
                        const predictionResult = prediction ? prediction.slice(index+1) : '';
                        const roundKO = prediction ? predictionResult.slice(2) : '';
                        // console.log('prediction: ', prediction)
                        // console.log('ROUND KO: ', roundKO)
                        // console.log('slicedPrediction: ', slicedPrediction)
                        // console.log('fighter1: ', fighter1)
                        return (
                            <Tr key={idx} p="0">
                                {columns.map( (column, i) => {
                                    // console.log('column: ',column)
                                    const cell = row[column.accessor];
                                    const element = column.Cell?.(username, prediction) ?? cell;
                                    
                                    if(i === 0){
                                        return (
                                            <Td key={i} p="0px !important" flexDir="column">
                                                <Flex p="1" alignItems="center" justifyContent="center">
                                                    {capFirstLetters(`${fighter1.lastName}`)} 
                                                </Flex>
                                                <Flex p="1" alignItems="center" justifyContent="center">
                                                    {capFirstLetters(`${fighter2.lastName}`)} 
                                                </Flex>
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
                                                            // borderX={(i) % 2 == 0 ? (i) >= lastScoredRound ? "3px solid tranparent" : "3px solid #2e3648" : "3px solid transparent"}
                                                            w="100%"
                                                            p="1"
                                                            bg={roundScores[fighter1.lastName] ? "gray.500" : "gray.600"} 
                                                            flexDirection="column" 
                                                            alignItems="center" 
                                                            justifyContent="center" 
                                                            style={(i+1) == roundKO && (slicedPrediction == fighter1.fighterId) ? {border:'1px solid red', fontSize: '1.2rem'} : {border: '1px solid #2e3648'} }
                                                        >   
                                                            {roundScores[fighter1.lastName]}
                                                        </Flex>
                                                        <Flex 
                                                            w="100%"
                                                            style={(i+1) == roundKO && (slicedPrediction == fighter2.fighterId) ? {border:'1px solid red', fontSize: '1.2rem'} : {border: "1px solid RGBA(0, 0, 0, 0.36)"} } 
                                                            color={i >= mappedScores.length ? 'transparent' : "whiteAlpha.900"}

                                                            flexDirection="column" 
                                                            alignItems="center" 
                                                            justifyContent="center" 
                                                            mt="0.5rem" 
                                                            p="1"
                                                        >
                                                            {roundScores[fighter2.lastName]}
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
                                                        {totals[fighter1.lastName]}
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
                                                        {totals[fighter2.lastName]}
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