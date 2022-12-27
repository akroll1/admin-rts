import { 
    Avatar, 
    Center, 
    Flex, 
    Heading, 
} from '@chakra-ui/react'
import { useGlobalStore } from '../../stores'
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

    const { 
        setToast
    } = useGlobalStore()

    const handleSelect = e => {
        const { id } = e.currentTarget
        handleFighterSelect(id)
    }

    const handleScoringComplete = () => {
        const toast = {
            title: 'Scoring Complete',
            // description: "",
            position: 'top',
            status: 'error',
            duration: 5000,
            isClosable: true,
        }
        setToast(toast)
    }

    
    const { 
        fighterId, 
        firstName, 
        lastName, 
    } = fighter; 
    
    const setBottomBorderStyle = () => {
        if(evenRound) return '0.5rem solid white'
        if(selectedFighter && selectedFighter === fighterId){
            if(redCorner) return '0.5rem solid #e62b2b'
            if(!redCorner) return '0.5rem solid #1d5d90'
        }
        return '0.5rem solid transparent'
    }
    
    const borderBottomStyles = setBottomBorderStyle();

    return (
        <Flex   
            zIndex={100}      
            flexDir="column"
            justifyContent="space-between"
            alignItems="center"
            onClick={scoringComplete ? handleScoringComplete : handleSelect} 
            id={fighterId}
            boxSizing="border-box" 
            borderRadius="1px"
            w="100%"
            pt="4"
            _after={{
                content: "''",
                margin: "0 auto",
                width: '70%',
                borderBottom: borderBottomStyles,
            }}
        >
            <Flex
                w="100%"
                flexDir="column"
                alignItems="center"
                justifyContent="center"
            >
                <Center>
                    <Avatar 
                        size="xl" 
                        _hover={{cursor: 'pointer'}} 
                    />
                </Center>
            </Flex>    
            <Flex
                flexDir="column"
                w="100%"
            >   
                <Heading
                    pt="2"
                    letterSpacing="0.5px"
                    as="h3"
                    size="md"
                >
                    {`${capFirstLetters(lastName)}`} 
                </Heading>
                <Flex
                    w="100%"
                    minH="1.5rem"
                    justifyContent="center"
                    alignItems="center"
                >
                { selectedFighter && selectedFighter === fighterId &&
                    <Heading    
                        textAlign="center" 
                        as="h2" 
                        size="lg"
                    >
                        {`10`} 
                    </Heading>
                }
                { selectedFighter && selectedFighter !== fighterId &&
                    <Heading    
                        textAlign="center" 
                        as="h2" 
                        size="lg"
                    >
                        {notSelectedScore} 
                    </Heading>
                }
                </Flex>
            </Flex>
        </Flex>
    )
}
