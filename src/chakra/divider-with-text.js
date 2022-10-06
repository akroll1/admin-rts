import * as React from 'react'
import { Box, Divider, Flex, Text, useColorModeValue } from '@chakra-ui/react'

export const DividerWithText = props => {
  const { text, mt, mb } = props;
  return (
    <Flex 
      align="center" 
      color="gray.300" 
      w="90%" 
      m="auto" 
      my="4" 
      mt={mt} 
      mb={mb}
    >
      <Box flex="1">
        <Divider borderColor="currentcolor" />
      </Box>
      <Text as="span" px="3" color={useColorModeValue('gray.600', 'whiteAlpha.900')} fontWeight="medium">
        {text}
      </Text>
      <Box flex="1">
        <Divider borderColor="currentcolor" />
      </Box>
    </Flex>
  );
}