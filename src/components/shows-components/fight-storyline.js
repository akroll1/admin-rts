import React from 'react'
import { Flex, Heading, Text } from '@chakra-ui/react'

export const FightStoryline = ({ fightSummary }) => {
    const { fight: { fightStoryline, odds }} = fightSummary;
    return (
        <Flex 
            as="section"
            maxW={["100%", "80%"]}
            alignItems="flex-start"
            flexDir="column" 
            p={['2', '4']} 
        >

            <Text noOfLines={[4, 3, 3]} fontSize="sm">{ fightStoryline }</Text>
            { odds && 
                <Flex p="0" mt="4" display="inline-flex">
                    <Text 
                        fontWeight="bold"
                        letterSpacing="1px"
                    >
                        Moneyline
                    </Text>
                    <Text 
                        textDecoration="none" 
                        style={{fontWeight: 'normal'}}
                        >
                            &#58;&nbsp;{ odds }
                    </Text>
                </Flex>
            }
        </Flex>
    )
}