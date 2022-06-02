import React from 'react'
import { Box, Heading } from '@chakra-ui/react'
import { MyScorecardsTableContent, TableActions, ScorecardsTablePagination } from './table-els'

export const MyScorecardsTable = ({scorecardData, handleFormSelect}) => {
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
    <Box as="section" py="12">
      <Box maxW={{base: 'container.xl', md: '7xl'}} mx="auto" px={{base: '6', md: '8'}}>
        <Box w="100%" overflowX="scroll" overflowY="scroll">
          {/* <Heading size="md" mb="6">
            My Scorecards
          </Heading> */}
          <TableActions options={options} />
          <MyScorecardsTableContent scorecardData={scorecardData} />
          <ScorecardsTablePagination total={scorecardData && scorecardData.length ? scorecardData.length : '0'} />
        </Box>
      </Box>
    </Box>
  )
}