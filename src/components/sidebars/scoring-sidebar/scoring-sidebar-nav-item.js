import { Flex } from '@chakra-ui/react'

export const ScoringSidebarNavItem = props => {
    const { 
        active, 
        fightId, 
        icon, 
        label,
        onclickOption 
    } = props; 

    const handleClickOption = e => {
        if(onclickOption){
            onclickOption()
            e.stopPropagation()
        }
        e.stopPropagation()
    }

    return (
        <Flex
            flex="1"
            pl="3"
            ml="1"
            justifyContent="space-between"
            alignItems="space-between"
            minW="100%"
            color={active ? 'white' : 'whiteAlpha.800'}
            id={fightId}
            onClick={handleClickOption}
            cursor="pointer"
            userSelect="none"
            rounded="md"
            transition="all 0.1s"
            // bg={active ? 'gray.700' : ''}
            _hover={{
                color: 'white',
            }}
            _active={{
                bg: 'gray.600',
            }}
        >
             <Flex 
                mt="1"
                mr="2"
                justifyContent="center"
                alignItems="center"
                fontSize={active ? '1rem' : 'inherit'} 
                color={active ? 'white' : 'gray.300'}
            >
                {icon}
            </Flex>
            <Flex 
                p="1"
                pb="0"
                w="100%"
                fontSize="1rem" 
                flex="1" 
                fontWeight="inherit"                
                color={active ? 'gray.300' : undefined}
            >
                {label}
            </Flex>
        </Flex>
    )
}