import { useEffect, useState } from 'react'
import { Flex, Heading, useColorModeValue } from '@chakra-ui/react'
import { capFirstLetters } from '../../../utils'
import { TabsEnum, useGlobalStore } from '../../../stores'

export const FightStats = ({
    fighterIds
}) => {

    const { 
        analytics,
        fighters,
        tabs,
    } = useGlobalStore();

    // console.log('analytics: ', analytics)
    const [fighter1, fighter2] = fighters.length === 2 ? fighters.map( fighter => fighter.lastName) : '';

    return (
        <Flex
            id="fight_stats"
            display={tabs[TabsEnum.ALL] || tabs[TabsEnum.TABLE] || tabs[TabsEnum.SCORING] ? 'flex' : 'none'}
            flexDirection="row"
            p="1"
            boxShadow={useColorModeValue('sm', 'sm-dark')}
            alignItems="center"
            justifyContent="space-between"
            w="100%"
            mb="1"
        >
                <Flex
                    flex="0 0 40%"
                    flexDir="column"
                    alignItems="center"
                    justifyContent="center"            
                >
                     <Heading 
                        size="md"
                        color="gray.300"
                    >
                        {analytics && analytics[fighter1] ? analytics[fighter1] : ''}&#37;	
                    </Heading>
                   
                </Flex>
                <Flex
                    flex="0 0 40%"
                    flexDir="column"
                    alignItems="center"
                    justifyContent="center"    
                >
                    <Heading 
                        color="gray.300"
                        size="md"
                    >
                        {analytics && analytics[fighter2] ? analytics[fighter2] : ''}&#37;	
                    </Heading>
                </Flex>
        </Flex>
    )
}