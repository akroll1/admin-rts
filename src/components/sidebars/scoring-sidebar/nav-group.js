import { Box, Stack, Text } from '@chakra-ui/react'
import * as React from 'react'

export const NavGroup = (props) => {
  const { label, children } = props
  return (
    <Box>
      <Text
        px="3"
        pl="0"
        fontSize="xs"
        fontWeight="semibold"
        textTransform="uppercase"
        letterSpacing="widest"
        color="gray.500"
        mb="1"
      >
        {label}
      </Text>
      <Stack spacing="1">{children}</Stack>
    </Box>
  )
}