import * as React from 'react'
import { Box, Divider, Flex, Text, useColorModeValue } from '@chakra-ui/react'

export const ScoringDividerWithText = props => {
  const { centered, tabs, text } = props;
  return (
    <Flex 
      display={tabs.all || tabs.table ? 'flex' : 'none'}
      align="center" 
      color="gray.300" 
      w="90%" 
      m="auto" 
      my="4" 
    >
      {centered && 
        <Box flex="1">
          <Divider borderColor="currentcolor" />
        </Box>
      }
      <Text 
        as="span" 
        px="3" 
        color={useColorModeValue('gray.600', 'whiteAlpha.900')} 
        fontWeight="extrabold"
        fontSize="2rem"
        fontFamily="Koulen"
    >
        {text}
      </Text>
      <Box flex="1">
        <Divider borderColor="currentcolor" />
      </Box>
    </Flex>
  );
}