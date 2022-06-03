import * as React from 'react'
import { Box, Divider, Flex, Text, useColorModeValue } from '@chakra-ui/react'

export const DividerWithText = ({ text }) => (
  <Flex align="center" color="gray.300" w="80%" m="auto">
    <Box flex="1">
      <Divider borderColor="currentcolor" />
    </Box>
    <Text as="span" px="3" color={useColorModeValue('gray.600', 'gray.400')} fontWeight="medium">
      {text}
    </Text>
    <Box flex="1">
      <Divider borderColor="currentcolor" />
    </Box>
  </Flex>
);