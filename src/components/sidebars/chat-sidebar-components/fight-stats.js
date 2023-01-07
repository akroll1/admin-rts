import { useEffect, useState } from 'react'
import { Flex, Heading, useColorModeValue } from '@chakra-ui/react'
import { capFirstLetters } from '../../../utils'
import { TabsEnum, useGlobalStore } from '../../../stores'

export const FightStats = ({
    fighterIds
}) => {

    const { 
        fighters,
        tabs,
    } = useGlobalStore();

    const [fighter1, fighter2] = fighters?.length === 2 ? fighters : '';
    const { fighter1Id, fighter2Id, selectedFighterId} = fighterIds?.fighter1Id ? fighterIds : {};
    const [fighterPercentages, setFighterPercentages] = useState({})

    const fighter1Percentage = 50;
    const fighter2Percentage = 50;
    console.log('selectedFighterId: ', selectedFighterId && selectedFighterId == fighter1Id)
    console.log('fighterId1: ', fighter1)
    return (
        <Flex
            id="fight_stats"
            display={tabs[TabsEnum.ALL] || tabs[TabsEnum.TABLE] || tabs[TabsEnum.SCORING] ? 'flex' : 'none'}
            flexDirection="row"
            px="2"
            boxShadow={useColorModeValue('sm', 'sm-dark')}
            alignItems="center"
            justifyContent="space-between"
            w="100%"
            borderBottom='1px solid #404040'
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
                        {fighter1Percentage ? fighter1Percentage : 0}&#37;	
                    </Heading>
                    <Heading 
                        size="lg" 
                        color={!selectedFighterId ? 'gray.300' : selectedFighterId && selectedFighterId === fighter1 ?.fighterId ? 'gray.200' : "gray.200"}
                    >
                        {capFirstLetters(fighter1?.lastName)}
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
                        {fighter2Percentage ? fighter2Percentage : 0}&#37;	
                    </Heading>
                    <Heading 
                        size="lg" 
                        color={!selectedFighterId ? 'gray.300' : selectedFighterId && selectedFighterId === fighter2 ?.fighterId ? 'gray.200' : "gray.200"}
                    >
                        {capFirstLetters(fighter2?.lastName)}
                    </Heading>
                </Flex>
        </Flex>
    )
}