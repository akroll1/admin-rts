import { 
    Heading, 
    Flex, 
    Text 
} from '@chakra-ui/react'
import { useGlobalStore } from '../../stores'

export const OfficialResultBanner = () => {

    const {
        transformedResult
    } = useGlobalStore()
        
    return (
        <Flex 
            id="official_result_banner" 
            border="1px solid #795858"
            flexDirection="column" 
            color="white" 
            maxW="100%" 
            w="90%"
            p="2"
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
                    fontSize={["md", "lg", "xl"]}
                >
                Official Result
                </Text>
                <Heading 
                    px="4"
                    textAlign="center"
                    as="h3"
                    // fontSize={["lg", "lg", "xl"]}
                    size={["md","md","lg"]}
                >
                    {transformedResult}
                </Heading>
            </Flex>
        </Flex>
    )
}