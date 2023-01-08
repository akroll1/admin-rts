import { Box } from '@chakra-ui/react'
import { 
  DesktopNavContent, 
  MobileNavContext 
} from '../../components/navbar'

export const Navbar = () => {
  return (
    <Box 
      as="header" 
      position="fixed" 
      w="100%"
      zIndex="10000"
      bg="fsl-body-bg"
      borderBottom={["1px solid #111111"]}
      boxSizing="border-box"
    >
      <Box 
        as="nav" 
        aria-label="Main navigation" 
        maxW="7xl" 
        px={['6', '8', '12']}
      >
        <MobileNavContext display={{ base: 'flex', lg: 'none' }} />
        <DesktopNavContent display={{ base: 'none', lg: 'flex' }} />
      </Box>
    </Box>
  )
}