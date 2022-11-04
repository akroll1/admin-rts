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
      border={active ? '1px solid #9a9a9a' : 'none'}
      >
      <Box 
        
        color={isTitleFight ? 'gray.200' : active ? 'white' : 'gray.400'}
        >
        {icon}
      </Box>
      <Box 
        transition="all 0.2s"
        fontSize="1rem" 
        flex="1" 
        fontWeight="inherit" 
        color={active ? 'fsl-highlight-heading-text' : '#dadada'}
      >
        {label}
      </Box>
    </HStack>
  )
}