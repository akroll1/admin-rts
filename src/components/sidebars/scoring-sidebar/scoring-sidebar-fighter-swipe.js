import { Avatar, Center, Flex, Heading } from '@chakra-ui/react'
import { capFirstLetters } from '../../../utils'

export const ScoringSidebarFighterSwipe = ({ 
    fighter, 
}) => {
    const { fighterId, firstName, lastName, ringname } = fighter; 

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
                id={fighterId}
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
            <Flex
                flexDir="row"
            >
                <Heading    
                    textAlign="center" 
                    as="h2" 
                    size="xs"
                    mb="1"
                >
                    {`${capFirstLetters(firstName)} ${capFirstLetters(lastName)}`} 
                </Heading>
            </Flex>
        </Flex>
    )
}
