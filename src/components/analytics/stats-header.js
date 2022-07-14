import { Box, Flex, Container, SimpleGrid } from '@chakra-ui/react'
import * as React from 'react'
import { Stat } from './stat'
const stats = [
  {
    label: 'Total Scorecards',
    value: '143,887',
    delta: {
      value: '4.3%',
      isUpwardsTrend: true,
    },
  },
  {
    label: 'Avg. Rounds Won',
    value: '74.87%',
    delta: {
      value: '2.3%',
      isUpwardsTrend: true,
    },
  },
  {
    label: 'Correct Predictions',
    value: '63.87%',
    delta: {
      value: '0.1%',
      isUpwardsTrend: false,
    },
  },
]

export const StatsHeader = () => (
  <Box as="section" py={{ base: '4', md: '8' }}>
    <Container maxWidth="100%">
      <SimpleGrid columns={{ base: 1, md: 3 }} gap={{ base: '5', md: '6' }}>
        {stats.map((stat, id) => (
          <Stat key={id} {...stat} />
        ))}
      </SimpleGrid>
    </Container>
  </Box>
)