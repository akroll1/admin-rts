import { Box, Flex, Heading, Stack, Text } from '@chakra-ui/react'
import * as React from 'react'

export const NavGroup = props => {
  const { fontSize, label, children, tabs } = props
  return (
    <Box mb="2">
      <Text
        fontWeight={tabs.all ? "semibold" : "extrabold"}
        textTransform="uppercase"
        letterSpacing={tabs.all ? "wide" : "tight"}
        m="0"
      >
        <Heading 
          fontSize={fontSize ? '1rem' : tabs.all ? "xl" : "xl"}
          color={tabs.all ? "#f0f0f0" : "#f0f0f0"}
          as="h3" 
          size="md"
          mb="1"
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