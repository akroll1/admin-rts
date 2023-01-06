import { useEffect, useState } from 'react'
import { Flex, IconButton } from '@chakra-ui/react'
import { ChevronLeftIcon, ChevronRightIcon } from '@chakra-ui/icons'
import { useGlobalStore } from '../../stores'
import { FiChevronsLeft, FiChevronsRight } from 'react-icons/fi'

export const ShowsArrows = () => {
    const [currentFightId, setCurrentFightId] = useState('')
    
    const { 
        selectedSeasonFightSummaries,
        selectedSeasonSummary,
        setSelectedFightSummary,
    } = useGlobalStore() 

    useEffect(() => {
        if(selectedSeasonFightSummaries.length > 0){
            setCurrentFightId(selectedSeasonFightSummaries[0].fight.fightId)
        }
    },[selectedSeasonFightSummaries])

    const rotateFighters = e => {
        const { id } = e.currentTarget;

        const calculateNextIndex = (currentFightId, arrow) => {
            const direction = arrow === 'right' ? 1 : -1;
            const length = selectedSeasonSummary.length;
            const currentIndex = selectedSeasonFightSummaries.findIndex( summary => summary.fight.fightId === currentFightId)

            let nextIndex = currentIndex + direction;
            if(nextIndex < 0){
                return length - 1
            }
            if(nextIndex > (length - 1)){
                return 0
            }
            
            return nextIndex
        }
        
        const nextFightIndex = calculateNextIndex(currentFightId, id)
        const nextFightSummary = selectedSeasonFightSummaries[nextFightIndex]
        setCurrentFightId(nextFightSummary.fight.fightId)
        setSelectedFightSummary(nextFightSummary.fight.fightId)
    }


    return (
        <Flex
            position="absolute"
            top="75px"
            right="0"
            left="0"
            justifyContent="space-between"
            zIndex="1000000"
            boxSizing="border-box"
            px={["4","4", "10", "10", "12"]}
            color="whiteAlpha.600"
        >
            <FiChevronsLeft
                p="2"
                onClick={rotateFighters}
                id="left"
                fontSize="4.5rem" 
            />
            <FiChevronsRight
                p="2"
                onClick={rotateFighters}
                id="right"
                fontSize="4.5rem" 
            /> 
        </Flex>
    )
}