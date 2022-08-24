import { Box, Flex, Container, SimpleGrid } from '@chakra-ui/react'
import * as React from 'react'
import { Stat } from './stat'
const stats = [
  {
    label: 'Total Scorecards',
    value:  `${Math.ceil(Math.random()*100000).toLocaleString()}`,
    delta: {
      value: '4.3%',
      isUpwardsTrend: true,
    },
  },
  {
    label: 'Winner Rounds Won %',
    value:  `${Math.ceil(Math.random()*100)}%`,
    delta: {
      value: '2.3%',
      isUpwardsTrend: true,
    },
  },
  {
    label: 'Correct Winner Predictions %',
    value: `${Math.ceil(Math.random()*100)}%`,
    delta: {
      value: '0.1%',
      isUpwardsTrend: false,
    },
  },
]

export const StatsHeader = () => (
  <Box as="section" py={{base: '4'}}>
    <Container maxWidth="100%">
      <SimpleGrid columns={{base: 1, md: 3}} gap={{base: '5', md: '6'}}>
        { stats.map( (stat, id) => <Stat key={id} {...stat} /> )}
      </SimpleGrid>
    </Container>
  </Box>
)