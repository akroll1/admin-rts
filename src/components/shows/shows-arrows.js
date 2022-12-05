import { useEffect, useState } from 'react'
import { Flex, IconButton } from '@chakra-ui/react'
import { ChevronLeftIcon, ChevronRightIcon } from '@chakra-ui/icons'
import { useScorecardStore } from '../../stores'

export const ShowsArrows = () => {
    const [currentFightId, setCurrentFightId] = useState('')
    const { 
        selectedSeasonFightSummary,
        selectedSeasonSummary,
        setSelectedSeasonFightSummary,
    } = useScorecardStore() 
  
    useEffect(() => {
      if(selectedSeasonFightSummary?.season?.seasonId){
        setCurrentFightId(selectedSeasonFightSummary.fight.fightId)
      }
    },[selectedSeasonFightSummary])
    const rotateFighters = e => {
        const { id } = e.currentTarget;
        const { fightIds } = selectedSeasonSummary.season;
        const calculateNextIndex = (fightId, length, arrow) => {
            const direction = arrow === 'right' ? 1 : -1;
            const currentIndex = fightIds.findIndex( id => id === fightId)
            let nextIndex = currentIndex + direction;
            if(nextIndex < 0){
                return length - 1
            }
            if(nextIndex > (length-1)){
                return 0
            }
            return nextIndex
        }
        const nextIndex = calculateNextIndex(currentFightId, selectedSeasonSummary.season.fightIds.length, id)
        const nextFightId = fightIds[nextIndex]
        const [nextFightSummary] = selectedSeasonSummary.fightSummaries.filter( fightSummary => fightSummary.fight.fightId === nextFightId)
        setSelectedSeasonFightSummary(nextFightSummary.fight.fightId)
        setCurrentFightId(nextFightSummary.fight.fightId)
    }

    return (
        <Flex
            id="shows_arrows"
            display="flex"
            alignItems="flex-start"
            justifyContent="space-between"
            position="absolute"
            top={["100px", "50px"]}
            left="0"
            right="0"
            w="100%"
        >
            { ['left', 'right'].map( el => {
                return (
                    <Flex
                        key={el}
                        p="4"
                        maxW={["30%", "20%"]}
                        justifyContent="space-between"
                    >
                        <IconButton
                            // m="auto"
                            variant="ghost"
                            id={el}
                            key={el}
                            zIndex={10000}
                            onClick={rotateFighters}
                            w="100%"
                            h="20%"
                            color="#cacaca"
                            border={["1px solid transparent"]}
                            _hover={{
                                color: 'white',
                                border: '1px solid #fff'
                            }}
                            icon={el === 'right' 
                                ? 
                                    <ChevronRightIcon 
                                        width="100%" 
                                        height="100%" 
                                    /> 
                                : 
                                    <ChevronLeftIcon
                                        mr="0"
                                        width="100%"
                                        height="100%"
                                    />
                            }
                        />
                    </Flex>
                )
            })}
        </Flex>
    )
}