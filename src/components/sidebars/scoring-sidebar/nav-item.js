import { Box, HStack } from '@chakra-ui/react'
import * as React from 'react'
import { BsCaretRightFill } from 'react-icons/bs'

export const NavItem = ({ 
  handlePredictionToggle, 
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
      onClick={handleClick}
      // onClick={id === 'prediction' ? () => handlePredictionToggle(true) : null }
      as="a"
      href={href}
      w="full"
      px="1"
      py={button ? "0" : "1"}
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
      <Box pl="2" fontSize="1rem" flex="1" fontWeight="inherit" color={subtle ? 'gray.400' : undefined}>
        {label}
      </Box>
      {endElement && !children && <Box>{endElement}</Box>}
      {children && <Box fontSize="xs" flexShrink={0} as={BsCaretRightFill} />}
    </HStack>
  )
}