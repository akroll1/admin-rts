import React from 'react'
import { Avatar, Flex, HStack, Text } from '@chakra-ui/react'

export const UserProfile = (props) => {
  const { name, image, email } = props
  return (
    <HStack spacing="4" px="2">
       name={name} src={image} />
      <Flex direction="column">
        <Text fontWeight="medium">{name}</Text>
        <Text fontSize="sm" lineHeight="shorter">
          {email}
        </Text>
      </Flex>
    </HStack>
  )
}