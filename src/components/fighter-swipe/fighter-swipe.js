import React, {useEffect, useState} from 'react'
import { Avatar, Center, Flex, Heading } from '@chakra-ui/react'
import { capFirstLetters } from '../../utils'

export const FighterSwipe = ({ 
    fighter, 
    setSelectedRoundWinner,
    selectedRoundWinner,
    notWinnerScore,
}) => {
    const { fighterId, firstName, lastName, ringname } = fighter; 

    return (
        <Flex 
            w="100%"
            bg={selectedRoundWinner === lastName ? '#2D3748' : 'inherit'}
            borderBottom={selectedRoundWinner === lastName ? '3px solid red' : 'inherit'}
            id={lastName}
            onClick={() => setSelectedRoundWinner(lastName)} 
            p="1" 
            boxSizing="border-box" 
            flexDirection="column"
            borderRadius="1px"
        >
            <Center m="2">
                <Avatar 
                    size="md" 
                    _hover={{cursor: 'pointer'}} 
                />
            </Center>
            <Heading    
                textAlign="center" 
                as="h2" 
                size="xs"
                mb="1"
            >
                {capFirstLetters(firstName)} 
            </Heading>
            <Heading    
                textAlign="center" 
                mb="2" 
                as="h2" 
                size="md"
            >
                {capFirstLetters(lastName)}
            </Heading>
            <Flex 
                flexDirection="row" 
                alignItems="center" 
                justifyContent="center"
            >
                { selectedRoundWinner && selectedRoundWinner === lastName &&
                    <Heading>10</Heading>
                }
                { selectedRoundWinner && selectedRoundWinner !== lastName &&
                    <Heading>{notWinnerScore}</Heading>
                }
            </Flex>
        </Flex>
    )
}
