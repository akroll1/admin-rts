import { Flex, Text } from '@chakra-ui/react'
import { DividerWithText } from '../../chakra'

export const Odds = () => {
    const odds = true
    return (
        <>
            { odds && 
                <Flex 
                    as="section"
                    w="100%"
                    flexDir="column"
                >
                    <DividerWithText 
                        fontSize="2xl" 
                        text="Props" 
                        mt="2"
                        mb="0"
                        p="0" 
                    />
                    <Flex
                        flexDir="column"
                        w="100%"
                        maxW="80%"
                        m="auto"
                    >
                        <Text 
                            w="100%"
                            textAlign="left"
                            fontWeight="bold"
                            letterSpacing="1px"
                        >
                            Moneyline
                        </Text>
                        <Text 
                            textDecoration="none" 
                            style={{fontWeight: 'normal'}}
                            >
                                &#58;&nbsp;{ 'odds' }
                        </Text>
                    </Flex>
                </Flex>
            }
        </>
    )
}