import { Avatar, Center, Flex, Heading, useToast } from '@chakra-ui/react'
import { capFirstLetters } from '../../utils'

export const FighterSwipe = ({ 
    evenRound,
    fighter, 
    handleFighterSelect,
    notSelectedScore,
    redCorner,
    scoringComplete,
    selectedFighter,
}) => {
    const toast = useToast();
    const { fighterId, firstName, lastName, ringname } = fighter; 
    
    const handleSelect = e => {
        const { id } = e.currentTarget
        handleFighterSelect(id)
    }

    const handleScoringComplete = () => {
        toast({
            title: 'Scoring Complete',
            // description: "",
            position: 'top',
            status: 'error',
            duration: 5000,
            isClosable: true,
        })
    }

    const setBottomBorderStyle = () => {
        if(evenRound) return '3px solid white'
        if(selectedFighter && selectedFighter === fighterId){
            if(redCorner) return '3px solid #e62b2b'
            if(!redCorner) return '3px solid #1d5d90'
        }
        return '3px solid transparent'
    }

    const borderBottomStyles = setBottomBorderStyle();

    return (
        <Flex   
            zIndex={100}      
            flexDir="column"
            justifyContent="flex-start"
            alignItems="center"
            onClick={scoringComplete ? handleScoringComplete : handleSelect} 
            id={fighterId}
            boxSizing="border-box" 
            borderRadius="1px"
            w="100%"
            mt="4"
            _after={{
                content: "''",
                margin: "0 auto",
                width: '70%',
                borderBottom: borderBottomStyles
            }}
        >
            <Center my="">
                <Avatar 
                    size="xl" 
                    _hover={{cursor: 'pointer'}} 
                />
            </Center>
           
            <Flex
                flexDir="row"
                my="4"
            >
                <Heading    
                    textAlign="center" 
                    as="h2" 
                    size="md"
                    mb="1"
                >
                    {`${capFirstLetters(firstName)} ${capFirstLetters(lastName)}`} 
                </Heading>
            </Flex>
        </Flex>
    )
}
