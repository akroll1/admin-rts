import * as React from 'react'
import { Box, HStack, Icon } from '@chakra-ui/react'
import { BsCaretRightFill } from 'react-icons/bs'
import { HiBadgeCheck } from 'react-icons/hi';

export const UpcomingNavItem = (props) => {
  const { 
    active, 
    fightId, 
    icon,
    isTitleFight, 
    label, 
    selectFight, 
  } = props; 
  return (
    <HStack
      color={active ? 'white' : 'whiteAlpha.900'}
      id={fightId}
      onClick={selectFight}
      w="full"
      p="1"
      pl="3"
      cursor="pointer"
      userSelect="none"
      rounded="md"
      transition="all 0.2s"
      bg={active ? 'gray.700' : ''}
      _hover={{
        bg: 'gray.700',
      }}
      _active={{
        bg: 'gray.600',
      }}
    >
      <Box 
        
        color={isTitleFight ? 'gray.200' : active ? 'white' : 'gray.500'}
      >
        {icon}
      </Box>
      <Box 
        fontSize="1rem" 
        flex="1" 
        fontWeight="inherit" 
        color={active ? 'fsl-highlight-heading-text' : '#cacaca'}
      >
        {label}
      </Box>
    </HStack>
  )
}