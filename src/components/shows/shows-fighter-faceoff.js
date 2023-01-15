import { FighterInfoCard } from './fighter-info-card'
import { 
  Flex
} from '@chakra-ui/react'

export const ShowsFighterFaceoff = ({ 
  fighters
}) => {

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
          flexDir="row"
          mx="auto"
          px="auto"
          w="100%"
          boxSizing='border-box'
          alignItems="flex-start" 
          justifyContent="center"
          minH="7rem"
        >
          { fighters?.length > 0 && fighters.map( fighter => {
            return (
              <FighterInfoCard
                key={fighter.fighterId} 
                fighter={fighter}
              />
            )})
          }
        </Flex>
      </Flex>
  )
}