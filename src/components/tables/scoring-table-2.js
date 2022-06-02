import React, {useEffect} from 'react'
import { Flex, Center, Text, Heading, Box, SimpleGrid } from '@chakra-ui/react'

export const ScoringTable2 = ({scorecards, currentRound, switches}) => {
    // console.log('scorecards: ',scorecards)
    const totalRounds = scorecards && scorecards.length > 0 ? scorecards[0].scores.length : 12;
    return (
        <Flex m="auto" flexDirection="column">
           
            <Flex p="10" flexDirection="row">
                <Flex alignItems="center" justifyContent="flex-start" style={{overflow: 'scroll'}} flexDirection="column">

                <Flex grow="1" m="auto" alignItems="center" justifyContent="center">
                    <SimpleGrid columns="1" spacing="3xl">
                        <Box textAlign="center" w="10rem" m="1" mb="3">
                            Round
                        </Box>
                    </SimpleGrid>
                    <SimpleGrid mb="3" borderBottom="1px solid gray" spacingX="4rem" spacingY="2rem" columns={totalRounds+1} spacing="5">
                        {scorecards && scorecards[0].scores.map((scorecard, i) => {
                            // console.log('scorecard 20: ',scorecard);
                            return (
                                <Box style={{textAlign:'center'}} key={i*6} width="5" m="auto" mb="3">
                                    {i+1} 
                                </Box>
                            )
                        })}
                    </SimpleGrid>
                
                </Flex>
                
                {scorecards && scorecards.length > 0 && scorecards.map((scorecard, i) => {
                    let { ownerId, ownerDisplayName, scores, groupScorecardId, member } = scorecard;
                    if(!ownerDisplayName){
                        ownerDisplayName = member;
                    }
                    return (
                        <Flex key={i+78} grow="1" m="auto" alignItems="center" justifyContent="center">
                            <SimpleGrid columns="1" spacing="5">
                                <Box textAlign="center" w={{base:'10rem'}} m="1" mb="3" key={i+98}>
                                    {ownerDisplayName}
                                </Box>
                            </SimpleGrid>
                            <SimpleGrid mb="3" borderBottom="1px solid gray" spacingX="4rem" spacingY="2rem" columns={totalRounds+1} spacing="5">
                                {scores.map((score,i) => {
                                    let { fighterAScore, fighterBScore } = score;

                                    if(switches.onlyShowToCurrentRound){
                                        if(i+1 >= currentRound){
                                            return;
                                        } 
                                        if(false){
                                            <Flex key={i+88} flexDirection="column" alignItems="center" justifyContent="center">
                                                <Box key={i+99} style={{textAlign: 'center', borderRadius:'3px'}} bg="gray" width="5" m="auto" mb="3">0</Box>
                                                <Box key={i+98} style={{textAlign: 'center'}} width="5" m="auto" mb="3">0</Box>
                                            </Flex>
                                        }
                                    }
                                    return (
                                        <Flex key={i+88} flexDirection="column" alignItems="center" justifyContent="center">
                                            <Box key={i+99} style={{textAlign: 'center', borderRadius:'3px'}} bg="gray" width="5" m="auto" mb="3">{fighterAScore}</Box>
                                            <Box key={i+98} style={{textAlign: 'center'}} width="5" m="auto" mb="3">{fighterBScore}</Box>
                                        </Flex>
                                    ) 
                                })}
                            </SimpleGrid>   
                        </Flex>
                    )
                })}
                </Flex>
                <Flex alignItems="center" justifyContent="flex-start" flexDirection="column">
                        <Box textAlign="center" w={{base:'10rem'}} m="1" mb="3">
                            Total
                        </Box>
                        {scorecards && scorecards.length > 0 && scorecards.map((scorecard, i) => {
                            let { fighterATotal, fighterBTotal } = scorecard;
                            return (
                                <Flex key={i+12} flexDirection="column" mt="0rem">
                                    <Box key={i+14} style={{textAlign: 'center', borderRadius:'3px'}} bg="gray" width="8" m="auto" mb="3" mt="0.5rem">
                                        {fighterATotal}
                                    </Box>
                                    <Box key={i+15} textAlign="center" w={{base:'10rem'}} m="1" mb="3" key={i*34}>
                                        {fighterBTotal}
                                    </Box>
                                </Flex>
                            )
                        })}
                </Flex>
            </Flex>
        </Flex>
    )
}