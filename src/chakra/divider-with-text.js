import * as React from 'react'
import { Box, Divider, Flex, Text, useColorModeValue } from '@chakra-ui/react'

export const DividerWithText = props => {
  const { fontSize, text, mt, mb } = props;
  return (
    <Flex 
      align="center" 
      color="gray.300" 
      w="90%" 
      m="auto" 
      my="2" 
      mt={mt} 
      mb={mb}
      fontFamily="Koulen"
      fontSize={fontSize ? fontSize : 'inherit'}
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