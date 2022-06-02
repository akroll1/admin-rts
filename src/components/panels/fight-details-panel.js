import React from 'react'
import { Text, Box, Link, Flex } from '@chakra-ui/layout';
import { Divider } from '@chakra-ui/react'

export const FightDetailsPanel = ({ prediction, groupScorecard, switches }) => {
    const { scorecardName, fighterA, fighterB, totalRounds, weightclass } = groupScorecard;
    const splitPrediction = prediction.split(',');
    return (
        <Box style={switches.showInfoPanel ? {visibility: 'visible', opacity: '1'} : {visibility: 'hidden',opacity: '0', transition: 'all 0.6s ease'}}
            borderRadius="5px" w="50%" bg="gray" m="1" p="4">
            {switches.isAdmin &&
                 <Box flexDirection="column" borderRadius="5px" w="100%" bg="gray" mt="0" p="1" pt="1">
                    <Text p="3" as="h3" fontSize="xl">Group Scorecard Admin</Text>
                    <Box as="button" borderRadius="md" bg="tomato" color="white" px={4} h={8} w="50%" mt="3">End Fight</Box>
                    <Divider mt="3" />
                </Box>
            }
            <Text>Fight Details</Text>
            <Text color="black">{scorecardName}</Text>
            <Link href="https://google.com" isExternal color="whitesmoke">{fighterA}</Link><span style={{color:'black'}}> vs </span><Link to="/" color="whitesmoke">{fighterB}</Link>
            <Text color="black">Your Prediction</Text>
            <Flex flexDir="row">
                <Text color="whitesmoke">{splitPrediction[0]}</Text><span style={{color:'black'}}>&nbsp; wins by &nbsp;</span><Text color="whitesmoke">{splitPrediction[1]}</Text>
            </Flex>
            <Box>
            </Box>
            <Box>
                <Text color="black">{totalRounds} Rounds</Text>
                <Text color="black">{weightclass} pound limit</Text>
            </Box>
        </Box>
    )
}