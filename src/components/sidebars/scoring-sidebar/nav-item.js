import { Box, Flex, HStack } from '@chakra-ui/react'
import { BsCaretRightFill } from 'react-icons/bs'

export const NavItem = ({ 
  handlePredictionModalToggle, 
  button, 
  id, 
  handleClick, 
  active, 
  subtle, 
  icon, 
  children, 
  label, 
  endElement, 
  href 
}) => {

  return (
    <Flex
      maxH="2rem"
      flexDir="row"
      alignItems="center"
      justifyContent="flex-start"      
      id={id}
      mt="1"
      onClick={id === 'prediction' ? handlePredictionModalToggle : handleClick}
      as="a"
      href={href}
      w="100%"
      px="1"
      // py={button ? "0" : "1"}
      cursor="pointer"
      userSelect="none"
      rounded="md"
      transition="all 0.2s"
      bg={active ? 'gray.700' : undefined}
     
      _active={{
        bg: 'gray.600',
      }}
    >
      <Box 
        fontSize="lg" 
        color={active ? 'fsl-text' : 'gray.400'}
        >
        {icon}
      </Box>
      <Flex 
        _hover={{color:'white'}}
        my="1"
        pl="2" 
        fontSize="md" 
        alignSelf="center"
        flex="1" 
        fontWeight="bold" 
        color={'fsl-text'}
      >
        {label}
      </Flex>
      {/* {endElement && !children && <Box>{endElement}</Box>}
      {children && <Box fontSize="xs" flexShrink={0} as={BsCaretRightFill} />} */}
    </Flex>
  )
}