import React from 'react'
import { Flex, Heading, Text } from '@chakra-ui/react'

export const FightStoryline = ({ selectedShowFight }) => {
    const { fightStoryline, odds } = selectedShowFight;
    return (
        <>
            <Flex flexDir="row" justifyContent="flex-start" alignItems="flex-start">
                <Heading 
                    textAlign="left" 
                    textDecoration="underline" 
                    mb="0.5rem" 
                    as="h4" 
                    size="md"
                >
                    The Storyline
                </Heading>
            </Flex>
            <Flex 
                maxW={["100%", "80%"]}
                alignItems="center"
                flexDir="column" 
                p={['2', '4']} 
                >
                <Text noOfLines={[4, 3, 3]} fontSize="sm">{ fightStoryline }</Text>
                { odds && <Heading p="6" pb="0" display="inherit" as="h4" size="sm"><Text textDecoration="underline">Moneyline&#58;</Text>&nbsp; <Text textDecoration="none" style={{fontWeight: 'normal'}}>{ odds }</Text></Heading>}
            </Flex>
        </>
    )
}