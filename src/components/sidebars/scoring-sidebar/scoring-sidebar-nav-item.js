import { Flex } from '@chakra-ui/react'

export const ScoringSidebarNavItem = props => {
    const { 
        active, 
        fightId, 
        icon, 
        id,
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

    const isLinked = id === 'userPrediction' || id === 'moneyline';

    return (
        <Flex
            flex="1"
            pl="2"
            mb="1px"
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
        >
             <Flex 
                mt="1px"
                mr="2"
                justifyContent="center"
                alignItems="center"
                fontSize="md" 
                color='gray.300'
            >
                {icon}
            </Flex>
            <Flex 
                pl="1"
                pb="0"
                w="100%"
                fontSize="1rem" 
                flex="1" 
                // fontWeight="semibold"                
                color="#c5c5c5"
                _hover={{
                    color: '#f5f5f5',
                    textDecoration: isLinked ? 'underline' : '',
                }}
            >
                {label}
            </Flex>
        </Flex>
    )
}