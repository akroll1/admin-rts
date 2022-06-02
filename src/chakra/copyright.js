import React from 'react'
import { Text, TextProps } from '@chakra-ui/layout'

export const Copyright = props => (
  <Text fontSize="sm" {...props}>
    &copy; {new Date().getFullYear()} FightSync Media, Inc. All rights reserved.
  </Text>
)
