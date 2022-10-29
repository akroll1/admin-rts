import { Box, Flex, Icon, Text } from '@chakra-ui/react'
import { BsCaretRightFill } from 'react-icons/bs'

export const ScoringSidebarNavItem = props => {
    const { 
        active, 
        fightId, 
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
            id={fightId}
            onClick={e => e.stopPropagation()}
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
            <Text 
                w="100%"
                ml="2"
                fontWeight="medium"
                fontSize="1rem" 
                flex="1" 
                color={active ? 'gray.300' : undefined}
            >
                {label}
            </Text>
        </Flex>
    )
}