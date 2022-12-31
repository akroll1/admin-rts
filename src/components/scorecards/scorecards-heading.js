
import { Heading } from '@chakra-ui/react'

export const ScorecardsHeading = ({
    length
}) => {

    return (
        <Heading 
            fontSize="3xl" 
            fontWeight="extrabold"
            mb="4"
            mx="auto"
        >
            {length ? `${length} Scorecard${length > 1 ? `s` : ``}` : `Create A Scorecard`}
        </Heading>
    )
}