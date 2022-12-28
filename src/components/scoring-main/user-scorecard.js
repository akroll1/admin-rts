import { 
    Flex, 
    Heading
} from '@chakra-ui/react'
import { capFirstLetters } from '../../utils'

export const UserScorecard = ({
    fighter,
    selectedFighter,
}) => {


    return (
        <Flex
            w="100%"
            flexDir="column"
            alignItems="center"
            justifyContent="center"
        >

            <Flex
                flexDir="column"
                alignItems="center"
                justifyContent="center"
                w="100%"
            >   
                <Heading
                    letterSpacing="1px"
                    as="h3"
                    size={["sm","md"]}
                    color={selectedFighter.fighterId === fighter.fighterId ? '#dadada' : !selectedFighter.fighterId ? '#fafafa' : 'gray.400'}


                >
                    {`${capFirstLetters(fighter.firstName)} ${capFirstLetters(fighter.lastName)}`} 
                </Heading>

                <Flex 
                    mt={["2"]}
                    borderBottom={selectedFighter.fighterId === fighter.fighterId ? "7px solid red" : "7px solid transparent"}
                    w="70%"
                    mx="auto"
                />
            </Flex>
        </Flex>
    )
}