import { 
    Avatar, 
    Center, 
    Flex, 
} from '@chakra-ui/react'

export const ScoringSidebarFighterSwipe = () => {

    return (
        <Flex
            flexDir="column"
            flex="1 0 45%"
            minW="50%"
            alignItems="center"
            justifyContent="center"
        >
            <Flex  
                flexDir="column" 
                zIndex={100}      
                boxSizing="border-box" 
                flexDirection="column"
                borderRadius="1px"
                w="100%"
            >
                <Center m="2">
                    <Avatar 
                        size="md" 
                    />
                </Center>
            </Flex>
        </Flex>
    )
}
