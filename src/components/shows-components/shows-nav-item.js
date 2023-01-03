import { Box, HStack } from '@chakra-ui/react'
import * as React from 'react'
import { BsCaretRightFill } from 'react-icons/bs'

export const ShowsNavItem = (props) => {
  const { fighterId, handleSidebarFighterSelect, active, subtle, icon, children, label, endElement, href } = props
  return (
    <HStack
      w="100%"
      id={fighterId}
      onClick={handleSidebarFighterSelect}
      as="a"
      href={href}
      flex="1"
      p="1"
      pl="2"
      cursor="pointer"
      userSelect="none"
      rounded="md"
      transition="all 0.1s"
      // bg={active ? 'gray.700' : undefined}
      _active={{
        bg: 'gray.600',
      }}
      _hover={{
        color: 'whiteAlpha.900',
      }}
    >
      <Box 
        fontSize="lg" 
        color="whiteAlpha.700"
        _hover={{
          color: '#fafafa',
        }}
      >
        {icon}
      </Box>
      <Box 
        px="1"
        fontSize="1rem" 
        flex="1" 
        fontWeight="inherit" 
        color="fsl-text"
        _hover={{
          textDecor: 'underline',
          color: 'whiteAlpha.900',
        }}
      >
        {label}
      </Box>
      {endElement && !children && <Box>{endElement}</Box>}
      {children && <Box fontSize="xs" flexShrink={0} as={BsCaretRightFill} />}
    </HStack>
  )
}