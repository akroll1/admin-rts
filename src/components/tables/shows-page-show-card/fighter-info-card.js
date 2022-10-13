import React from 'react'
import { Avatar, Flex, HStack, Icon, Text, useColorModeValue, VStack } from '@chakra-ui/react'
import { capFirstLetters } from '../../../utils';

export const FighterInfoCard = props => {
  const { fighterId, firstName, lastName, ringname, bio, isVerified, ...stackProps } = props;

  return (
    <Flex 
      _hover={{cursor: 'pointer'}} 
      flexDir="column" 
      alignItems="center" 
      // onClick={() => navigate(`/fighters/${fighterId}`)}
    >
      <Avatar size={["md", "lg"]} />
      <VStack spacing="0" flex="1">
        <HStack>
          <Text 
            fontSize={["md", "xl", "2xl"]} 
            mt="2"  
            textAlign="center" 
            fontWeight="bold"
          >
            {`${capFirstLetters(firstName)} ${capFirstLetters(lastName)}`}
          </Text>
        </HStack>
        <Text
          px="2"
          fontSize={["sm", "md", ]}
          textAlign="center"
          noOfLines={1}
          color={useColorModeValue('gray.600', 'gray.400')}
        >
          {`${capFirstLetters(ringname)}`}
        </Text>
      </VStack>
    </Flex>
  )
}