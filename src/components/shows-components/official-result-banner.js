import { 
    Heading, 
    Flex, 
    Text 
} from '@chakra-ui/react'
import { useScorecardStore } from '../../stores'

export const OfficialResultBanner = () => {

    const {
        transformedResult
    } = useScorecardStore()
        
    return (
        <Flex 
            id="official_result_banner" 
            border="1px solid #795858"
            flexDirection="column" 
            color="white" 
            maxW="100%" 
            w="90%"
            p={["0", "0", "2"]}
            justifyContent="center"
            alignItems="center"
            borderRadius="5px"
        >
            <Flex
                alignItems="center"
                justifyContent="center"
                flexDir="row"
                m="auto"
                w="100%"
            >
                <Text
                    px="4"
                    textAlign="center"
                    fontWeight="thin" 
                    fontSize={["lg", "lg", "xl"]}
                >
                Official Result
                </Text>
                <Heading 
                    px="4"
                    textAlign="center"
                    as="h3"
                    size="lg"
                >
                    {transformedResult}
                </Heading>
            </Flex>
        </Flex>
    )
}