import { Flex, Text } from '@chakra-ui/react'
import { DividerWithText } from '../../chakra'

export const Props = () => {
    const odds = true
    return (
        <Flex 
            as="section"
            alignItems="baseline"
            justifyContent="baseline"
            flexDir="column" 
            px={['2', '4', '8']} 
            mb="2"
            w="100%"
            pl="12"
            mt="2"
        >
            <Text 
                fontSize="xl"
                color="#cacaca"
                textDecoration="underline"
            >
                Moneyline       
            </Text>
            
            <Flex
                flexDir="column"
                px="4"
            >
                <Text 
                    display="inline-flex"
                    alignItems="baseline"
                    justifyContent="flex-start"
                >
                    <Text 
                        whiteSpace="pre-wrap"
                        noOfLines={1} 
                        _hover={{cursor: 'pointer'}} 
                        fontSize="md"
                    >
                        Fighter1: 
                    </Text>
                    <Text
                        px="4"
                    >
                        Moneyline here
                    </Text>
                </Text>
                <Text 
                    display="inline-flex"
                    alignItems="baseline"
                    justifyContent="flex-start"
                >
                    <Text 
                        whiteSpace="pre-wrap"
                        noOfLines={1} 
                        _hover={{cursor: 'pointer'}} 
                        fontSize="md"
                    >
                        Fighter2: 
                    </Text>
                    <Text
                        px="4"
                    >
                        Moneyline here
                    </Text>
                </Text>
            </Flex>
        </Flex>
    )
}