import React from 'react'
import { Avatar, Flex, HStack, Icon, Text, useColorModeValue, VStack } from '@chakra-ui/react'
import { capFirstLetters } from '../../../utils';
import { useNavigate } from 'react-router';

export const FighterInfoCard = props => {
  const navigate = useNavigate();
  const { fighterId, firstName, lastName, ringname, bio, isVerified, ...stackProps } = props;

  return (
    <Flex 
      _hover={{cursor: 'pointer'}} 
      flexDir="column" 
      alignItems="center" 
      // onClick={() => navigate(`/fighters/${fighterId}`)}
    >
      <Avatar size="lg" />
      <VStack spacing="1" flex="1">
        <HStack>
          <Text 
            fontSize="lg" 
            m="2" 
            p="2" 
            mb="0" 
            textAlign="center" 
            fontWeight="bold"
          >
            {`${capFirstLetters(firstName)} ${capFirstLetters(lastName)}`}
          </Text>
        </HStack>
        <Text
          fontSize="sm"
          textAlign="center"
          noOfLines={2}
          color={useColorModeValue('gray.600', 'gray.400')}
        >
          {`${capFirstLetters(ringname)}`}
        </Text>
      </VStack>
    </Flex>
  )
}