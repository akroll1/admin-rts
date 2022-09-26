import * as React from 'react'
import { Box, HStack, Icon } from '@chakra-ui/react'
import { BsCaretRightFill } from 'react-icons/bs'
import { HiBadgeCheck } from 'react-icons/hi';
export const UpcomingNavItem = (props) => {
  const { active, isPlaying, name, fightId, selectFight, subtle, icon, children, label, endElement, href } = props; 
  return (
    <HStack
    name={name}
    id={fightId}
    onClick={selectFight}
    as="a"
    href={href}
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
      <Box fontSize="lg" color={active ? 'currentcolor' : 'gray.400'}>
        {icon}
      </Box>
      <Box fontSize="1rem" flex="1" fontWeight="inherit" color={subtle ? 'gray.400' : undefined}>
        {label}
      </Box>
      { isPlaying && <Box>
          <Icon as={HiBadgeCheck} color="green.300" verticalAlign="text-bottom" />
        </Box>
      }
      {endElement && !children && <Box>{endElement}</Box>}
      {children && <Box fontSize="xs" flexShrink={0} as={BsCaretRightFill} />}
    </HStack>
  )
}