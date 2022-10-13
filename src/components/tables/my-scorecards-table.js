import React from 'react'
import { Box } from '@chakra-ui/react'
import { MyScorecardsTableContent, TableActions, ScorecardsTablePagination } from './table-els'

export const MyScorecardsTable = ({ scorecards }) => {

  return (
    <Box 
      w="100%" 
      as="section" 
      py="4" 
      mx="auto" 
      px={{base: '6', md: '8'}}
    >
      <TableActions />
      <MyScorecardsTableContent scorecards={scorecards} />
      <ScorecardsTablePagination total={scorecards && scorecards.length ? scorecards.length : '0'} />
    </Box>
  )
}