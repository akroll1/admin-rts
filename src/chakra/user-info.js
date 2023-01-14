import { 
  Avatar, 
  Box, 
  Flex,
  HStack, 
  Text, 
  useColorModeValue as mode 
} from '@chakra-ui/react'

export const UserInfo = (props) => {
  const { name, image, email, setForm, setActive} = props
  const handleUserFormClick = () => {
      setForm('ACCOUNT');
      setActive('ACCOUNT');
  }
  return (
    <HStack 
      onClick={() => handleUserFormClick()} 
      display="inline-flex"
    >
      <Avatar 
        mr="2"
        size="md" 
        name={name} 
        src={image} 
      />
      <Box 
        lineHeight="1"
      >
        <Text 
          fontSize="lg"
          fontWeight="semibold"
        >
          {name}
        </Text>
        <Text 
          size="sm" 
          mt="1" 
          color={mode('whiteAlpha.700', 'gray.400')}
        >
          {email}
        </Text>
      </Box>
    </HStack>
  )
}