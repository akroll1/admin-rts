import { 
    Avatar, 
    Center, 
    Flex, 
    Heading, s
} from '@chakra-ui/react'
import { capFirstLetters } from '../../../utils'
import backgroundImage from '../../../image/boxing-background.png'
export const FighterSelectionSwipe = ({ 
    fighter,
    handleFighterSelect,
    isScoringSidebar = false,
    selectedFighter,
}) => {

    const handleSelect = e => {
        handleFighterSelect(fighter)
    }

    const { 
        draws, 
        fighterId, 
        firstName, 
        kos,
        lastName, 
        losses, 
        ringname, 
        wins 
    } = fighter ? fighter : ''; 

    return (
     
        <Flex  
            p="2" 
            zIndex={100}  
            flexDir="column"
            justifyContent="space-between"
            alignItems="center"
            onClick={handleSelect} 
            id={fighterId}
            boxSizing="border-box" 
            borderRadius="1px"
            w={fighterId === 'DRAW' ? '20%' : '50%'}
            // w={["100%"]} 
            // minH="40vh"
            h="auto"
            cursor="pointer"
            _after={{
                content: "''",
                margin: "0 auto",
                width: '100%',
            }}
            position="relative"
            _before={{
                content: "''",
                background: `url(${backgroundImage})`,
                opacity: "0.3",
                top: "0",
                bottom: "0",
                left: "0",
                right: "0",
                position: "absolute",
                zIndex: "1"
            }}
        >
            <Flex
                textAlign="center"
                w="100%"
                flexDir="column"
            >
                <>
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
                    <Flex
                        zIndex={1000}
                        flexDir="column"
                        w="100%"
                        mt="2"
                    >   
                        <Heading 
                            // color={selectedFighter.fighterId === fighterId ? '#fff' : !selectedFighter.fighterId ? '#fafafa' : 'gray'}
                            letterSpacing="px"
                            w="100%"
                            zIndex={99}
                            as="h2"
                            size={["sm", "md"]}
                            color="#BBB"
                        >
                            {`${ringname}`}
                        </Heading>
                        <Heading
                            letterSpacing="1px"
                            as="h3"
                            size="md"
                            // color={selectedFighter.fighterId === fighterId ? 'whiteAlpha.200' : !selectedFighter.fighterId ? 'white' : 'whiteAlpha.400'}
                            color="#FAFAFA"

                        >
                            {`${capFirstLetters(firstName)} ${capFirstLetters(lastName)}`} 
                        </Heading>

                        <Flex
                            display="inline-flex"
                            flexDir="row"
                            w="100%"
                            justifyContent="center"
                            alignItems="center"
                        >
                            <Heading    
                                textAlign="center" 
                                as="h3" 
                                size="sm"
                                color={selectedFighter.fighterId === fighterId ? '#dadada' : !selectedFighter.fighterId ? '#dadada' : 'gray'}

                            >
                                {`${wins}-${losses}-${draws}`}&nbsp; 
                            </Heading>
                            <Heading
                                textAlign="center" 
                                as="h3"
                                size="xs"
                                color={selectedFighter.fighterId === fighterId ? '#dadada' : !selectedFighter.fighterId ? '#dadada' : 'gray'}

                            >
                                {`${kos} KO`}
                            </Heading>
                        </Flex>
                    {!isScoringSidebar &&
                        <Flex 
                            mt={["4"]}
                            borderBottom={selectedFighter.fighterId === fighterId ? "7px solid red" : "7px solid transparent"}
                            w="70%"
                            mx="auto"
                        />
                    }
                    </Flex>
                </>
            </Flex>
        </Flex>
    )
}
