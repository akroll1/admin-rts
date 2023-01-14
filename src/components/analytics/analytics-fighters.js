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

    return (
        <Flex
            alignItems="center"
            justifyContent="flex-start"
            flex="1 0 50%"
        >
            <Avatar 
                border={iteration === 0 ? "3px solid red" : "3px solid #5c7fff"}
                size={["md", "md", "lg"]}
            />
            <Flex
                flexDir="column"
                p="2"
            >

                <Heading
                    textAlign="center"
                    size={["md", "md", "lg"]}
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