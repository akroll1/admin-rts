import { 
    Avatar, 
    Center, 
    Flex, 
    Heading, 
} from '@chakra-ui/react'
import { capFirstLetters } from '../../utils'
import backgroundImage from '../../image/boxing-background.png'
import { useGlobalStore } from '../../stores'

export const ScoringFightersFaceoff = ({
    isSidebar
}) => {

    const {
        fighters
    } = useGlobalStore()

    return (
        <Flex
            position="relative"
            flexDir="column"
            w="100%"
        >
            <Flex  
                zIndex={100}  
                flexDir="column"
                justifyContent="space-between"
                alignItems="space-between"
                boxSizing="border-box" 
                borderRadius="1px"
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
                    w="100%"
                    flexDir="row"
                >
                    {fighters?.length > 0 && fighters.map( fighter => (
                        <Flex
                            flex="1 0 50%"
                            key={fighter.fighterId}
                            flexDir="column"
                            alignItems="center"
                            justifyContent="center"
                            py="4"
                            px="2"
                        >
                            <Center>
                                <Avatar 
                                    size={["md","md","lg", "xl"]} 
                                    _hover={{cursor: 'pointer'}} 
                                />
                            </Center>
                        </Flex>
                    ))}
                </Flex>
            </Flex>
            <Flex
                textAlign="center"
                w="100%"
                flexDir="row"
            >
                { fighters.length === 2 && fighters.map( fighter => (
                    <Flex
                        w="100%"
                        flexDir="column"
                    >
                        <Heading 
                            py="1"
                            flex="1 0 50%"
                            size="md" 
                            color="gray.200"
                        >
                            {`${capFirstLetters(fighter.firstName)} ${capFirstLetters(fighter.lastName)}`}
                        </Heading>
                        { isSidebar &&
                            <Flex
                                w="100%"
                                flexDir="row"
                                alignItems="center"
                                justifyContent="center"
                            >
                                <Heading    
                                    textAlign="center" 
                                    as="h3" 
                                    size="sm"
                                    color='#dadada'
                                >
                                    {`${fighter.wins}-${fighter.losses}-${fighter.draws}`}&nbsp; 
                                </Heading>
                                <Heading
                                    textAlign="center" 
                                    as="h3"
                                    size="sm"
                                    color='#cacaca'
                                >
                                    {`${fighter.kos} KO`}
                                </Heading>  
                            </Flex>
                        }
                    </Flex>
                ))}

            </Flex>
        </Flex>
    )
}
