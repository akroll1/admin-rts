import { useEffect, useState } from 'react'
import { Flex, Text } from '@chakra-ui/react'

export const FightStoryline = ({ 
    fightSummary 
}) => {
    const [lines, setLines] = useState([4, 3, 3])
    const fightStoryline = fightSummary?.fight?.fightStoryline;
    const showStoryline = fightSummary?.show?.showStoryline;

    const handleShowFullText = e => {
        if(lines.length > 0){
            setLines([])
            return
        }
        setLines([4, 3, 3])
    }

    return (
        <Flex 
            as="section"
            maxW={["100%", "80%"]}
            alignItems="flex-start"
            flexDir="column" 
            p={['2', '4']} 
        >
            <Text 
                whiteSpace="pre-wrap"
                onClick={handleShowFullText}
                noOfLines={lines} 
                _hover={{cursor: 'pointer'}} 
                fontSize="sm"
            >
                { showStoryline || fightStoryline }
            </Text>
        </Flex>
    )
}