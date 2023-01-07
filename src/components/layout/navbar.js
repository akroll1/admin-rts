import { Box } from '@chakra-ui/react'
import { NavContent } from '../../components/navbar'

export const Navbar = () => {
  return (
    <Box 
      as="header" 
      position="fixed" 
      w="100%"
      zIndex="10000"
      bg="fsl-body-bg"
      borderBottom={["1px solid #111111"]}
    >
      <Box 
        as="nav" 
        aria-label="Main navigation" 
        maxW="7xl" 
        mx="auto" 
        px={['6', '8', '12']}
      >
        <NavContent.Mobile display={{ base: 'flex', lg: 'none' }} />
        <NavContent.Desktop display={{ base: 'none', lg: 'flex' }} />
      </Box>
    </Box>
  )
}