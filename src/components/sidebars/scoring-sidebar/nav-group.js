import { Box, Flex, Heading, Stack, Text } from '@chakra-ui/react'
import * as React from 'react'

export const NavGroup = (props) => {
  const { label, children, tabs } = props
  return (
    <Box mb="2">
      <Text
        fontSize={tabs.all ? "xl" : "xl"}
        fontWeight={tabs.all ? "semibold" : "extrabold"}
        textTransform="uppercase"
        color={tabs.all ? "#fafafa" : "#dadada"}
        letterSpacing={tabs.all ? "wide" : "tight"}
        m="0"
      >
        <Heading 
          as="h3" 
          size="md"
          mb="2"
        >
          {label}
        </Heading>
      </Text>

      <Flex 
        flexDir="column"
        spacing="0"
      >
        {children}
      </Flex>
    </Box>
  )
}