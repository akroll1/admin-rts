import { useEffect, useState } from 'react'
import { Flex, IconButton } from '@chakra-ui/react'
import { ChevronLeftIcon, ChevronRightIcon } from '@chakra-ui/icons'
import { useGlobalStore } from '../../stores'

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
        <>
            <ChevronLeftIcon
                onClick={rotateFighters}
                id="left"
                position="absolute"
                left="0"
                top="10"
                maxW="20%"
                fontSize="6rem" 
                ml="-1"
            />
            <ChevronRightIcon
                onClick={rotateFighters}
                id="right"
                right="0"
                top="10"
                position="absolute"
                maxW="20%"
                fontSize="6rem" 
                mr="-1"
            /> 
        </>
    )
}