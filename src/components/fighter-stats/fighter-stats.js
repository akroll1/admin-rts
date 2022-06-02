import React from 'react'
import { Box, Center, Flex, Heading, SimpleGrid, useColorModeValue as mode } from '@chakra-ui/react'
import { StatCard } from './stat-card'
import { capFirstLetters } from '../../utils/utils'

export const FighterStats = ({ selectedFighter }) => {
    const labels = ['wins', 'losses', 'draws', 'kos']
    return (
        <Flex flexDir="row" maxW="7xl" mx="auto" px={{base: '6',md: '8'}}>
            
            {/* <SimpleGrid autoRows="true" columns={{base: 1,md: 2,lg: 4}} spacing="6"> */}
            {labels.map((label, idx) => (
                <StatCard label={label} stat={selectedFighter[label]} selectedFighter={selectedFighter} />
            ))}
            {/* </SimpleGrid> */}
        </Flex>
    )
}