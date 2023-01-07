import { useEffect, useState } from 'react'
import { Flex, IconButton } from '@chakra-ui/react'
import { 
    ArrowRightIcon, 
    ChevronLeftIcon, 
    ChevronRightIcon,
    TriangleUpIcon,
} from '@chakra-ui/icons'
import { useGlobalStore } from '../../stores'

export const ShowsArrows = () => {
    const [currentFightId, setCurrentFightId] = useState('')
    
    const { 
        selectedSeasonFightSummaries,
        selectedSeasonSummary,
        setSelectedFightSummary,
    } = useGlobalStore() 

    useEffect(() => {
        if(selectedSeasonFightSummaries?.length > 0){
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
            top="80px"
            right="0"
            left="0"
            justifyContent="space-between"
            zIndex="5000"
            boxSizing="border-box"
            px={["4","4", "10", "10", "12"]}
            color="whiteAlpha.600"
        >
            <Flex
                fontSize={["3.5rem", "4.5rem"]}
                _hover={{
                    color: "whiteAlpha.800"
                }}
                ml={["-2", "2"]}
                borderRadius="lg"
            >
                <TriangleUpIcon
                    transform="rotateZ(-90deg)"
                    cursor="pointer"
                    p="2"
                    onClick={rotateFighters}
                    id="left"
                />
            </Flex>
            <Flex
                borderRadius="lg"
                mr={["-2", "2"]}
                _hover={{
                    color: "whiteAlpha.800"
                }}
                fontSize={["3.5rem", "4.5rem"]} 
            >

                <TriangleUpIcon
                    transform="rotateZ(90deg)"
                    cursor="pointer"
                    p="2"
                    onClick={rotateFighters}
                    id="right"
                /> 
            </Flex>
        </Flex>
    )
}