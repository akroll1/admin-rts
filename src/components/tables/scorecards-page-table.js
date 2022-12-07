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
      flex="1 0 70%"
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
