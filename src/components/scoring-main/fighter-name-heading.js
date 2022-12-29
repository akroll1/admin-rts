import { 
    Flex, 
    Heading
} from '@chakra-ui/react'
import { capFirstLetters } from '../../utils'

export const FighterNamesHeading = ({
    evenRound,
    fighter,
    selectedFighter,
}) => {


    return (

        <Flex
            flexDir="column"
            alignItems="center"
            justifyContent="center"
            w="100%"
        >   
            <Heading
                p="2"
                pb="0"
                letterSpacing="1px"
                as="h3"
                size={["sm","md"]}
                color={evenRound ? `#dadada` : selectedFighter.fighterId === fighter.fighterId ? '#dadada' : !selectedFighter.fighterId ? '#fafafa' : 'whiteAlpha.600'}
            >
                {`${capFirstLetters(fighter.firstName)} ${capFirstLetters(fighter.lastName)}`} 
            </Heading>

            <Flex 
                m={["1"]}
                borderBottom={evenRound ? `5px solid red` : !selectedFighter ? `5px solid transparent` : selectedFighter.fighterId === fighter.fighterId ? "5px solid red" : "5px solid transparent"}
                w="80%"
                mx="auto"
            />
        </Flex>
    )
}