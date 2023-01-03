import {  
    Avatar,
    AvatarBadge,
    Center,
    Flex, 
} from '@chakra-ui/react'

export const FighterSwipe = ({ 
    evenRound,
    fighter,
    handleFighterSelect,
    selectedFighter,
}) => {

    const handleSelect = e => {
        handleFighterSelect(fighter)
    }

    const { 
        fighterId, 
    } = fighter; 

    return (
        <Flex   
            py="4"
            zIndex={100}  
            flexDir="column"
            justifyContent="space-between"
            alignItems="center"
            onClick={handleSelect} 
            id={fighterId}
            boxSizing="border-box" 
            borderRadius="1px"
            w="100%"
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
                    <Center
                    
                        borderColor="red.300"
                    >
                        <Avatar 
                            border="2px solid red.300"
                            size={["md","md","lg"]} 
                            _hover={{cursor: 'pointer'}} 
                        >
                            {(!evenRound && selectedFighter.fighterId === fighter.fighterId) && <AvatarBadge border="2px solid" borderColor='gray.200' bg='red.400' boxSize='1.25em' /> }
                        </Avatar>
                    </Center>
                </Flex>
            </Flex>
        </Flex>
    )
}
