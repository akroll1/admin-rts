import React from 'react'
import { Box } from '@chakra-ui/react'
import { MyScorecardsTableContent, TableActions, ScorecardsTablePagination } from './table-els'

export const MyScorecardsTable = ({ scorecards }) => {

  const options = [
    { 
      value: 'upcoming',
      label: 'Upcoming'
    },
    { 
      value: 'active',
      label: 'Active'
    },
    { 
      value: 'completed',
      label: 'Complete'
    },
  ];
  return (
    <Box w="100%" as="section" py="4" maxW={{base: 'container.xl', md: 'container.xl', lg: 'container.xl'}} mx="auto" px={{base: '6', md: '8'}}>
      <TableActions options={options} />
      <MyScorecardsTableContent scorecards={scorecards} />
      <ScorecardsTablePagination total={scorecards && scorecards.length ? scorecards.length : '0'} />
    </Box>
  )
}