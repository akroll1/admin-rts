import { 
  Box, 
  Flex,
  HStack, 
  Icon 
} from '@chakra-ui/react'
import { BsCaretRightFill } from 'react-icons/bs'
import { HiBadgeCheck } from 'react-icons/hi';
import { CalendarIcon, ChevronRightIcon } from '@chakra-ui/icons'

export const UpcomingNavItem = props => {
  const { 
    active, 
    fightId, 
    icon,
    isTitleFight, 
    label, 
    selectFight, 
    upcoming,
  } = props; 

  const renderColor = (active, isTitleFight, upcoming) => {
    if(upcoming) return `gray.100`
    if(active) return `gray.100`
    return `gray.200`
  }

  return (
    <HStack
      pl="2"
      color={active ? 'white' : 'whiteAlpha.900'}
      id={fightId}
      onClick={selectFight}
      w="full"
      cursor="pointer"
      userSelect="none"
      rounded="md"
      border={active ? '1px solid #9a9a9a' : '1px solid transparent'}
    >
      <Box 
        color={renderColor(active, isTitleFight, upcoming)}
        flexDir="column"
      >
      <ChevronRightIcon
        color="gray.400"
        fontSize="xl"
      />
      </Box>
      <Flex 
        transition="all 0.2s"
        fontSize="1.1rem" 
        flex="1" 
        fontWeight="inherit" 
        color={active ? 'fsl-highlight-heading-text' : '#dadada'}
      >
        {label}
      </Flex>
      {/* <Flex>
        Next Fight
      </Flex> */}
    </HStack>
  )
}