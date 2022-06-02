import React from 'react'
import { HStack, Text, useColorModeValue, VStack } from '@chakra-ui/react'
import { capFirstLetters } from '../../utils';

export const FighterInfoCard = props => {
  const { firstName, lastName, ringname, bio, isVerified, ...stackProps } = props;
  return (
    <VStack spacing="1" flex="1" {...stackProps}>
      <HStack>
        <Text textAlign="center" fontWeight="bold">{capFirstLetters(firstName)} {capFirstLetters(lastName)}</Text>
        {/* {isVerified && <Icon as={HiBadgeCheck} color="red.300" verticalAlign="text-bottom" />} */}
      </HStack>
      <Text
        fontSize="sm"
        textAlign="center"
        noOfLines={2}
        color={useColorModeValue('gray.600', 'gray.400')}
      >
        {ringname}
      </Text>
    </VStack>
  )
}