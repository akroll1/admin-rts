import { 
    Flex, 
} from '@chakra-ui/react'

import { ScorecardRowItemLeft } from './scorecard-row-item-left'
import { ScorecardRowItemRight } from './scorecard-row-item-right'

export const ScorecardRow = ({ 
  handleSelectGroup,
  selectedFightId,
  summary
}) => {

  return (
    <Flex
      _hover={{
        bg: "#202020"
      }}
      bg={summary?.fight?.fightId === selectedFightId ? `#252525` : ``}
      w="100%"
      direction={['column','row']}
      justify="space-between"
      align="center"
      border="1px solid #353535"
      mb="2"
      borderRadius="5px"
      py="2"
      px="6"
    >
      <ScorecardRowItemLeft 
        summary={summary} 
      /> 
      <ScorecardRowItemRight 
        fightId={summary?.fight?.fightId} 
        handleSelectGroup={handleSelectGroup} 
        summary={summary}
      />
    </Flex>
  )
}