import React from 'react'
import { Button, Heading, CenterButton, ButtonGroup, Flex, Text, useColorModeValue as mode } from '@chakra-ui/react'

export const ScorecardsPageTablePagination = ({ total }) => {
  return (
    <>
      <Flex align="center" justify="space-between">
        {total > 0 &&
          <>
            <Text color={mode('gray.600', 'gray.400')} fontSize="sm">
              {total} Scorecard{total === 1 ? '' : 's'}
            </Text>
          
            <ButtonGroup variant="outline" size="sm">
              <Button _hover={{ cursor: 'pointer', border: '1px solid white' }} as="a" rel="prev">
                Previous
              </Button>
              <Button  _hover={{ cursor: 'pointer', border: '1px solid white' }} as="a" rel="next">
                Next
              </Button>
            </ButtonGroup>
          </>
        }
      </Flex>
      <Flex flexDirection="column"justifyContent="center" alignItems="center">
        {total == 0 && 
          <Heading as="h2" size="lg">
            Create a Scorecard!
          </Heading>
        }
      </Flex>
    </>
  )
}