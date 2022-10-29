import { Flex } from '@chakra-ui/react'
import { MyScorecardsTableContent, TableActions, ScorecardsTablePagination } from './table-els'

export const MyScorecardsTable = ({ 
  scorecards 
}) => {

  return (
    <Flex 
      flexDir="column"
      w="100%" 
      as="section" 
      py="4" 
      mx="auto" 
      px={{base: '6', md: '8'}}
    >
      {/* <TableActions /> */}
      <MyScorecardsTableContent scorecards={scorecards} />
      <ScorecardsTablePagination total={scorecards && scorecards.length ? scorecards.length : '0'} />
    </Flex>
  )
}