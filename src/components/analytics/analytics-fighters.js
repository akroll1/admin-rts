import { capFirstLetters } from '../../utils'
import { 
    Avatar,
    Flex,
    Heading,
} from '@chakra-ui/react'

export const AnalyticsFighters = ({
    fighter,
    iteration,
    totalPercentages,
}) => {
    console.log('iteration: ', iteration)
    return (
        <Flex
            alignItems="center"
            justifyContent="flex-start"
        >
            <Avatar 
                border={iteration === 0 ? "2px solid red" : "2px solid white"}
                size="md"
            />
            <Flex
                flexDir="column"
                p="2"
            >

                <Heading
                    textAlign="center"
                    size="md"
                >
                    {`${capFirstLetters(fighter.lastName)}`}
                </Heading>
                <Heading 
                    textAlign="center"
                    size="md"
                    color="gray.300"
                >
                    {totalPercentages && totalPercentages[fighter.lastName] ? totalPercentages[fighter.lastName] : ''}&#37;	
                </Heading>
            </Flex>
        </Flex>
    )
}