import {
    Flex,
    Spinner
} from '@chakra-ui/react'

export const SpinnerMain = () => {
    return (
        <Flex
            minH="70vh"
            m="auto"
        >
            <Spinner 
                speed="0.6s"
                m="auto"
                size="xl"
                thickness='5px'
                color="red.500"
                emptyColor='gray.200'
            />
        </Flex>
    )
}
                    