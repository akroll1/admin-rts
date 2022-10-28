import { useEffect, useState } from 'react'
import { FighterInfoCard } from '../tables/shows-page-show-card/fighter-info-card'
import { 
  ChevronRightIcon, 
  ChevronLeftIcon 
} from '@chakra-ui/icons'
import { 
  Flex
} from '@chakra-ui/react'
import { useScorecardStore } from '../../stores'

export const ShowsFighterFaceoff = ({ 
  fighters
}) => {
  const [currentFightId, setCurrentFightId] = useState('')
  const { 
    selectedSeason,
    selectedFightSummary,
    setSelectedFightSummary,
  } = useScorecardStore() 

  useEffect(() => {
    if(selectedFightSummary.season?.seasonId){
      setCurrentFightId(selectedFightSummary.fight.fightId)
    }
  },[selectedFightSummary])
  
  const rotateFighters = e => {
    const { id } = e.currentTarget;
    const { fightIds } = selectedSeason.season;
    const calculateNextIndex = (fightId, length, arrow) => {
      const direction = arrow === 'right' ? 1 : -1;
      const currentIndex = fightIds.findIndex( id => id === fightId)
      let nextIndex = currentIndex + direction;
      debugger;
      if(nextIndex < 0){
        return length - 1
      }
      if(nextIndex > (length-1)){
        return 0
      }
      return nextIndex
    }
    const nextIndex = calculateNextIndex(currentFightId, selectedSeason.season.fightIds.length, id)
    const nextFightId = fightIds[nextIndex]
    const [nextFightSummary] = fightSummaries.filter( summary => summary.fight.fightId === nextFightId)
    setSelectedFightSummary(nextFightSummary)
    setCurrentFightId(nextFightSummary.fight.fightId)
  }
  const { fightSummaries } = selectedSeason;
  
  return (
      <Flex
        id="fighters_faceoff"
        as="section"
        w="100%"
        maxW="100%"
        mx="auto"
        my="1"
        justifyContent="space-between"
        flexDirection={["row"]}
        alignItems="center"
        px="auto"
        py="1"
        bg="transparent"
        shadow={{ md: 'base' }}
        boxSizing="border-box"
        position="relative"
      >
        <Flex
          position="absolute"
          top="0"
          left="0"
        >
          <ChevronLeftIcon
            onClick={rotateFighters}
            id="left"
            color="#795858" 
            boxSize={["3rem", "5rem", "6rem"]}
            _hover={{ 
              cursor: 'pointer',
              color: 'fsl-text'
            }}
          />
        </Flex>
        <Flex 
          flexDir="row"
          mx="auto"
          px="auto"
          w="100%"
          boxSizing='border-box'
          alignItems="center" 
          justifyContent="space-around"
        >
          { fighters?.length > 0 && fighters.map( fighter => {
            return (
              <FighterInfoCard 
                fighter={fighter}
              />
            )})
          }
          <Flex
            position="absolute"
            top="0"
            right="0"
            
          >
            <ChevronRightIcon 
              onClick={rotateFighters}
              id="right"
              color="#795858"
              boxSize={["3rem", "5rem", "6rem"]}
              _hover={{ 
                cursor: 'pointer',
                color: 'fsl-text'
              }}
            />
          </Flex>
        </Flex>
      </Flex>
  )
}