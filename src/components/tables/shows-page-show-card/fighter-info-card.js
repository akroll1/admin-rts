import React from 'react'
import { HStack, Icon, Text, useColorModeValue, VStack } from '@chakra-ui/react'
import { capFirstLetters } from '../../../utils/utils';

export const FighterInfoCard = props => {
  const { firstName, lastName, ringname, bio, isVerified, ...stackProps } = props;
  return (
    <VStack spacing="1" flex="1">
      <HStack>
        <Text fontSize="lg" m="2" p="2" mb="0" textAlign="center" fontWeight="bold">{capFirstLetters(firstName)} {capFirstLetters(lastName)}</Text>
      </HStack>
      <Text
        fontSize="sm"
        textAlign="center"
        noOfLines={2}
        color={useColorModeValue('gray.600', 'gray.400')}
      >
        {capFirstLetters(ringname)}
      </Text>
    </VStack>
  )
}