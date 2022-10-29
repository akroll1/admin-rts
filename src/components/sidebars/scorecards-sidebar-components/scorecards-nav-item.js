import { Box, Flex, Icon } from '@chakra-ui/react'
import { BsCaretRightFill } from 'react-icons/bs'
import { HiBadgeCheck } from 'react-icons/hi';

export const ScorecardsNavItem = props => {
    const { 
        active, 
        isPlaying, 
        name, 
        fightId, 
        selectFight, 
        icon, 
        children, 
        label, 
        endElement, 
        href 
    } = props; 

    return (
        <Flex
            pl="2"
            justifyContent="space-between"
            alignItems="space-between"
            w="100%"
            mb="1"
            color={active ? 'white' : 'whiteAlpha.800'}
            id={fightId}
            onClick={e => e.stopPropagation()}
            href={href}
            cursor="pointer"
            userSelect="none"
            rounded="md"
            transition="all 0.2s"
            // bg={active ? 'gray.700' : ''}
            _hover={{
                bg: 'gray.700',
            }}
            _active={{
                bg: 'gray.600',
            }}
        >
            <Flex 
                justifyContent="center"
                alignItems="center"
                fontSize={active ? '1rem' : 'inherit'} 
                color={active ? 'white' : 'gray.300'}
            >
                {icon}
            </Flex>
            <Box 
                fontSize="1rem" 
                flex="1" 
                fontWeight="inherit" 
                color={active ? 'gray.300' : undefined}
            >
                {label}
            </Box>
            {endElement && !children && <Box>{endElement}</Box>}
            {children && <Box fontSize="xs" flexShrink={0} as={BsCaretRightFill} />}
        </Flex>
    )
}