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
      right="-3.5rem"
      top={["3rem", "4rem"]}
      width={["300px", "360px"]}
      transform="rotate(45deg)"
      py={2}
      justifyContent="center"
      alignItems="center"
      maxW="100%"
    >
      <Text
        textAlign="center"
        fontSize={["md", "lg"]}
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