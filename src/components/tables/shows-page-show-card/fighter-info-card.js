import { Avatar, Flex, HStack, Icon, Text, useColorModeValue, VStack } from '@chakra-ui/react'
import { capFirstLetters } from '../../../utils';

export const FighterInfoCard = props => {
  const { ...stackProps } = props;
  const { draws, fighterId, firstName, kos, lastName, losses, ringname, wins } = props.fighter;

  return (
    <Flex 
      maxW={["50%", "45%", "40%"]}
      p="2"
      _hover={{cursor: 'pointer'}} 
      flexDir="column" 
      alignItems="center" 
      my="0"
      minW={["45%"]}
    >
      <Avatar size={["md", "lg"]} />
      <VStack spacing="0" flex="1">
        <HStack>
          <Text 
            fontSize={["md", "xl", "2xl"]} 
            mt="1"  
            textAlign="center" 
            fontWeight="bold"
          >
            {`${capFirstLetters(firstName)} ${capFirstLetters(lastName)}`}
          </Text>
        </HStack>
        <Text
          my="0"
          px="2"
          py="0"
          fontSize={["sm", "md", "lg"]}
          textAlign="center"
          noOfLines={1}
          color={useColorModeValue('gray.600', 'gray.300')}
        >
          {`${capFirstLetters(ringname)}`}
        </Text>
        <Text 
          as="h6" 
          fontSize="xs"
          >
          {`${wins}-${losses}-${draws}, ${kos} KO's`}
        </Text>
      </VStack>
    </Flex>
  )
}