import React, {useEffect, useState} from 'react'
import { Avatar, Center, Flex, Heading } from '@chakra-ui/react'
import { capFirstLetters } from '../../utils'

export const FighterSwipe = ({ 
    evenRound,
    fighter, 
    handleFighterSelect,
    notSelectedScore,
    selectedFighter,
}) => {

    const { fighterId, firstName, lastName, ringname } = fighter; 
    
    const handleSelect = e => {
        const { id } = e.currentTarget
        handleFighterSelect(id)
    }

    const setStyles = () => {
        const evenRoundStyles = {
            border: '1px solid #DADADA',
            borderBottom: '3px solid white',
            background: '#2D3748'
        }
        const selectedStyles = {
            borderBottom: '3px solid red',
            background: '#2D3748',
        }
        const notSelectedStyles = {
            // border: '1px solid #DADADA',
            borderBottom: 'inherit',
            background: 'inherit'
        }
        if(evenRound) return evenRoundStyles
        if(selectedFighter === fighterId) return selectedStyles
        if(selectedFighter && selectedFighter !== fighterId) return notSelectedStyles
    }
    const styles = setStyles();
    return (
        <Flex         
            borderBottom={`2px solid white`}     
            m="2"
            onClick={handleSelect} 
            id={fighterId}
            style={styles} 
            boxSizing="border-box" 
            flexDirection="column"
            borderRadius="1px"
            w="90%"
            minH="10rem"
            mb="8"
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
                letterSpacing="normal" 
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
                { selectedFighter && selectedFighter === fighterId &&
                    <Heading>10</Heading>
                }
                { selectedFighter && selectedFighter !== fighterId &&
                    <Heading>{notSelectedScore}</Heading>
                }
            </Flex>
        </Flex>
    )
}
