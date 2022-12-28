import {  
    Avatar,
    Center,
    Flex, 
} from '@chakra-ui/react'

export const FighterSwipe = ({ 
    fighter,
    handleFighterSelect,
}) => {

    const handleSelect = e => {
        handleFighterSelect(fighter)
    }

    const { 
        fighterId, 
    } = fighter; 

    return (
        <Flex   
            p="4"
            zIndex={100}  
            flexDir="column"
            justifyContent="space-between"
            alignItems="center"
            onClick={handleSelect} 
            id={fighterId}
            boxSizing="border-box" 
            borderRadius="1px"
            w={fighterId === 'DRAW' ? '20%' : '40%'}
            pt="4"
            // minH="40vh"
            cursor="pointer"
            _after={{
                content: "''",
                margin: "0 auto",
                width: '100%',
            }}
        >
            <Flex
                textAlign="center"
                w="100%"
                flexDir="column"
            >
                <Flex
                    w="100%"
                    flexDir="column"
                    alignItems="center"
                    justifyContent="center"
                >
                    <Center>
                        <Avatar 
                            size={["md","md","lg", "xl"]} 
                            _hover={{cursor: 'pointer'}} 
                        />
                    </Center>
                </Flex>
            </Flex>
        </Flex>
    )
}
