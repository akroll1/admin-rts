import React from 'react'
import { Flex, Heading, Text } from '@chakra-ui/react'

export const ShowStoryline = ({ showStoryline, odds, fightOdds }) => {
    return (
        <Flex textAlign="left" alignItems={{base:'center', md:'flex-start'}} w="100%" flexDir="column" m="unset"  mb="1rem" p={['2', '4', '8']} pt="0">
            <Heading textDecoration="underline" mb="0.5rem" as="h4" size="md">The Storyline: </Heading>
            <Text noOfLines={[4, 3, 3]} maxWidth="80%" fontSize="sm">{ showStoryline }</Text>
            { fightOdds && <Heading display="inherit" mt="2rem" as="h4" size="sm">Moneyline&#58;&nbsp; <Text style={{fontWeight: 'normal'}}>{ odds }</Text></Heading>}
        </Flex>
    )
}