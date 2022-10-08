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
    <HStack
      id={id}
      onClick={id === 'prediction' ? handlePredictionModalToggle : handleClick}
      as="a"
      href={href}
      w="full"
      px="1"
      // py={button ? "0" : "1"}
      cursor="pointer"
      userSelect="none"
      rounded="md"
      transition="all 0.2s"
      bg={active ? 'gray.700' : undefined}
      _hover={{
        bg: 'gray.700',
      }}
      _active={{
        bg: 'gray.600',
      }}
    >
      <Box fontSize="lg" color={active ? 'red' : 'gray.400'}>
        {icon}
      </Box>
      <Flex 
        pl="2" 
        fontSize="sm" 
        alignSelf="center"
        flex="1" 
        fontWeight="inherit" 
        color={subtle ? 'gray.400' : undefined}
      >
        {label}
      </Flex>
      {endElement && !children && <Box>{endElement}</Box>}
      {children && <Box fontSize="xs" flexShrink={0} as={BsCaretRightFill} />}
    </HStack>
  )
}