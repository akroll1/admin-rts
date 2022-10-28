import { useEffect, useState } from 'react'
import { Flex, Text } from '@chakra-ui/react'

export const FightStoryline = ({ 
    selectedFightSummary 
}) => {
    const [lines, setLines] = useState([4])
    const fightStoryline = selectedFightSummary?.fight?.fightStoryline;
    const showStoryline = selectedFightSummary?.show?.showStoryline;

    const handleShowFullText = e => {
        if(lines.length){
            setLines([])
            return
        }
        setLines([4])
    }

    return (
        <Flex 
            as="section"
            alignItems="flex-start"
            flexDir="column" 
            px={['2', '4', '8']} 
            mb="2"
            color="fsl-text"
            // transition="all 0.2s"  
        >
            <Text 
                p="2"
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