import React from 'react'
import { Heading, Center, Button, ButtonGroup, Flex, Text, useColorModeValue as mode } from '@chakra-ui/react'

export const GroupsTablePagination = ({ totals }) => {
  return (
    <>
      <Flex align="center" justify="space-between">
        {totals > 0 &&
          <>
            <Text color={mode('gray.600', 'gray.400')} fontSize="sm">
              {totals} Group{totals === 1 ? '' : 's'}
            </Text>
          
            <ButtonGroup variant="outline" size="sm">
              <Button _hover={{cursor: 'pointer'}} as="a" rel="prev">
                Previous
              </Button>
              <Button _hover={{cursor: 'pointer'}} as="a" rel="next">
                Next
              </Button>
            </ButtonGroup>
          </>
        }
      </Flex>
      <Flex flexDirection="column"justifyContent="center" alignItems="center">
        {!totals && 
          <Heading as="h2" size="md">
            You have no groups.
          </Heading>
        }
      </Flex>
    </>
  )
}