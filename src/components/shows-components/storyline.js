import React from 'react'
import { Flex, Heading, Text } from '@chakra-ui/react'

export const ShowStoryline = ({ showStoryline, odds, fightOdds }) => {
    return (
        <Flex alignItems={{base:'center', md:'flex-start'}} w={{base: '100%', md: '80%', lg: '70%'}} flexDir="column" m="unset"  my="1rem" p="1rem">
            <Heading textDecoration="underline" mb="0.5rem" as="h4" size="md">The Storyline: </Heading>
            <Text noOfLines={[4, 3, 3]} maxWidth="80%" fontSize="sm">{ showStoryline }</Text>
            { fightOdds && <Heading display="inherit" mt="2rem" as="h4" size="sm">Moneyline&#58;&nbsp; <Text style={{fontWeight: 'normal'}}>{ odds }</Text></Heading>}
        </Flex>
    )
}