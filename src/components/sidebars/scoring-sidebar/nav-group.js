import { Box, Stack, Text } from '@chakra-ui/react'
import * as React from 'react'

export const NavGroup = (props) => {
  const { label, children, tabs } = props

  return (
    <Box>
      <Text
        // px="1"
        pl="0"
        fontSize={tabs.all ? "xs" : "lg"}
        fontWeight={tabs.all ? "semibold" : "extrabold"}
        textTransform="uppercase"
        color={tabs.all ? "#fafafa" : "#dadada"}
        letterSpacing={tabs.all ? "wide" : "tight"}
        mb="1"
      >
        {label}
      </Text>
      <Stack spacing="0">{children}</Stack>
    </Box>
  )
}