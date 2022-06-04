import React from 'react'
import { Box, Heading } from '@chakra-ui/react'
import { MyScorecardsTableContent, TableActions, ScorecardsTablePagination } from './table-els'

export const MyScorecardsTable = ({ scorecardData }) => {
  // console.log('scorecardData, table: ',scorecardData)
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
      label: 'Completed'
    },
  ];
  return (
    <Box w="100%" overflowX="scroll" overflowY="scroll" as="section" py="12" maxW={{base: 'container.xl', md: '7xl', lg: 'xl'}} mx="auto" px={{base: '6', md: '8'}}>
      <TableActions options={options} />
      <MyScorecardsTableContent scorecardData={scorecardData} />
      <ScorecardsTablePagination total={scorecardData && scorecardData.length ? scorecardData.length : '0'} />
    </Box>
  )
}