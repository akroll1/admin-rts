import { 
    Flex, 
    Text, 
    useColorModeValue 
} from '@chakra-ui/react'

export const SlantBadge = () => {

  return (
    <Flex
      bg={useColorModeValue('blue.500', 'rgba(192, 22, 22, 0.8)')}
      overflow="hidden"
      position="absolute"
      right="-35"
      mr="-4"
      top="35"
      width="240px"
      transform="rotate(45deg)"
      py={2}
      justifyContent="center"
      alignItems="center"
      maxW="100%"
    >
      <Text
        fontSize="xs"
        textTransform="uppercase"
        fontWeight="bold"
        letterSpacing="wider"
        color={useColorModeValue('white', 'white')}
      >
        Coming Jan 28!
      </Text>
    </Flex>
  )
}