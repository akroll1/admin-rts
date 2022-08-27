import React from 'react'
import { HStack, Icon, StackProps, useColorModeValue, Text } from '@chakra-ui/react'
import { HiUsers } from 'react-icons/hi'

export const FollowerCount = props => {
  const { count, ...stackProps } = props;
  return (
    <HStack
      spacing="1"
      fontSize="sm"
      color={useColorModeValue('gray.600', 'gray.400')}
      {...stackProps}
    >
      <Icon as={HiUsers} />
      <Text>{count} followers</Text>
    </HStack>
  )
}