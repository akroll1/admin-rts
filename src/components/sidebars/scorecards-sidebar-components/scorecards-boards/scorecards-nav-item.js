import { Flex, HStack } from '@chakra-ui/react'

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
        e.stopPropagation()
        const { id } = e.currentTarget;
        handleSelectFight(id)
    }
    return (
        <HStack
            p="1"
            pl="2"
            w="100%"
            color={active ? '#fafafa' : '#dadada'}
            id={fightId}
            onClick={selectedFight}
            cursor="pointer"
            userSelect="none"
            rounded="md"
            transition="all 0.2s"
            _hover={{
                color: '#fafafa',
            }}
            border={active ? '1px solid #9a9a9a' : 'none'}
            
        >
            <Flex 
                mr="2"
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
                w="100%"
                fontSize="1rem" 
                flex="1" 
                fontWeight="inherit" 
                color={active ? 'fsl-highlight-heading-text' : '#dadada'}
            >
                {label}
            </Flex>
        </HStack>
    )
}