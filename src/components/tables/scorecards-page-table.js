import { 
  Flex,
  Heading 
} from '@chakra-ui/react'
import { 
  ScorecardsPageTableContent, 
  TableActions, 
  ScorecardsPageTablePagination 
} from './table-els'

export const ScorecardsPageTable = ({ 
  scorecards 
}) => {

  return (
    <Flex 
        as="section"
        id="scorecards_table"
        flex="1 0 40%" 
        bg="#151515"
        flexDirection="column" 
        justifyContent="center"
        alignItems="center"
        boxSizing="border-box" 
        position="relative"
        w="100%"
      >
        <Heading textAlign="center">Scorecards</Heading>
        <Flex 
          flexDir="column"
          w="100%" 
          as="section" 
          mx="auto" 
          p="2"
        >
          {/* <TableActions /> */}
          <ScorecardsPageTableContent scorecards={scorecards} />
          {/* <ScorecardsPageTablePagination total={scorecards && scorecards.length ? scorecards.length : '0'} /> */}
        </Flex>
    </Flex>
  )
}