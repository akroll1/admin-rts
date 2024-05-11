import { Box, useColorModeValue } from '@chakra-ui/react'
import { SignInForm } from './signin-form'

export const SignInPage = () => {

  return (
    <Box bg={useColorModeValue('gray.500', 'inherit')} py="12" px={{ base: '4', lg: '8' }}>
      <Box maxW="md" mx="auto">

        <SignInForm />
      </Box>
    </Box>
  )
}
