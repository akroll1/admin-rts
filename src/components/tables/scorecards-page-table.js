import { 
  Flex,
  Heading 
} from '@chakra-ui/react'
import { useScorecardStore } from '../../stores'
import { ScorecardsPageTableContent } from './table-els'

export const ScorecardsPageTable = () => {

  const {
    userScorecards
  } = useScorecardStore()
  return (
    <Flex 
      as="section"
      id="scorecards_table"
      bg="fsl-body-bg"
      flexDirection="column" 
      justifyContent="center"
      alignItems="center"
      boxSizing="border-box" 
      position="relative"
      w="100%"
      overflow="scroll"
      p="4"
      pt="0"
      mx="auto"
      mt="4"
      mb="8"
      maxW={["100%"]}
    >
      <Heading 
        color="#fafafa"
        as="h3"
        size="lg"
        textAlign="center"
        my="2"
      >
        {userScorecards && Array.isArray(userScorecards) && userScorecards.length > 0 
          ? 'Scorecards' 
          : 'Create a Scorecard'}
      </Heading>
        
      <ScorecardsPageTableContent />
    </Flex>
  )
}