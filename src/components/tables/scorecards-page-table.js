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
        flex="1 0 50%" 
        bg="inherit"
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
          py="4" 
          mx="auto" 
          px={{base: '6', md: '8'}}
        >
          {/* <TableActions /> */}
          <ScorecardsPageTableContent scorecards={scorecards} />
          <ScorecardsPageTablePagination total={scorecards && scorecards.length ? scorecards.length : '0'} />
        </Flex>
    </Flex>
  )
}