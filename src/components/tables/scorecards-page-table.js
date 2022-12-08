import { 
  Flex,
  Heading 
} from '@chakra-ui/react'
import { useScorecardStore } from '../../stores'
import { ScorecardsPageTableContent } from './table-els'

export const ScorecardsPageTable = ({ 
  collatedScorecards,
  groupType,
  handleScorecardSelect,
  selectedScorecard
}) => {
 
  const {
    userScorecards
  } = useScorecardStore() 
  
  return (
    <Flex 
      as="section"
      id="scorecards_page_table"
      flex="1 0 60%"
      bg="fsl-body-bg"
      flexDirection="column" 
      justifyContent="flex-start"
      alignItems="flex-start"
      boxSizing="border-box" 
      position="relative"
      w="100%"
      maxW="100%"
      overflow="scroll"
      p="4"
      pt="2"
      mx="auto"
      mb="8"
    >
      <ScorecardsPageTableContent 
        collatedScorecards={collatedScorecards} 
        groupType={groupType}
        handleScorecardSelect={handleScorecardSelect}
        selectedScorecard={selectedScorecard}
      />
    </Flex>
  )
}
