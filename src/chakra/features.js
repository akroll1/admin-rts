import { 
  Center, 
  Heading,
  Stack, 
  Text, 
  useColorModeValue as mode 
} from '@chakra-ui/react'

export const Feature = (props) => {
  const { title, children, icon } = props
  return (
    <Stack 
      direction="row" 
      w="100%" 
      spacing="6" 
      pl="2"
    >
      <Center 
        aria-hidden 
        flexShrink={0} 
        w="12" 
        h="12" 
        rounded="md" 
        color="white" 
        bg="#525252"
        mt={["1px"]}
      >
        {icon}
      </Center>
      <Stack>
        <Heading 
          as="h3" 
          // fontSize={["2xl", "2xl", "xl"]} 
          fontSize={["2xl", "2xl"]} 
          letterSpacing="2px"
          mb={["-2", "-1", "-1"]}
        >
          {title}
        </Heading>
        <Text 
          pr="6" 
          color={mode('gray.600', 'gray.400')} 
          lineHeight="tall"
          fontSize="lg"
          mt={["0","-0.1rem"]}
        >
          {children}
        </Text>
      </Stack>
    </Stack>
  )
}