import { Flex } from '@chakra-ui/react'

export const ScorecardsNavItem = props => {
    const { 
        active, 
        fightId,
        handleSelectFight, 
        icon,
        isTitleFight,  
        label, 
    } = props; 

    const selectedFight = e => {
        const { id } = e.currentTarget;
        e.stopPropagation()
        handleSelectFight(id)
    }
    return (
        <Flex
            p="1"
            pl="2"
            justifyContent="space-between"
            alignItems="space-between"
            w="100%"
            color={active ? 'white' : 'whiteAlpha.800'}
            id={fightId}
            onClick={selectedFight}
            cursor="pointer"
            userSelect="none"
            rounded="md"
            transition="all 0.2s"
            _hover={{
                bg: 'gray.700'
            }}
            bg={active ? 'gray.700' : 'inherit'}
        >
            <Flex 
                mr="3"
                justifyContent="center"
                alignItems="center"
                _hover={{
                    color: '#fff'
                }}
            >
                {icon}
            </Flex>
            <Flex 
                 _hover={{
                    color: '#fff'
                }}
                mb="1"
                w="100%"
                fontSize="1rem" 
                flex="1" 
                fontWeight="inherit" 
                color={active ? 'gray.200' : 'gray.300'}

            >
                {label}
            </Flex>
        </Flex>
    )
}