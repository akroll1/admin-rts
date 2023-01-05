import { useEffect, useState } from 'react'
import { Flex, Heading, useColorModeValue } from '@chakra-ui/react'
import { capFirstLetters } from '../../../utils'
import { TabsEnum, useGlobalStore } from '../../../stores'

export const FightStats = ({
    fighterIds
}) => {

    const { 
        activeGroupScorecard,
        fighters,
        tabs,
    } = useGlobalStore();

    const [fighter1, fighter2] = fighters?.length === 2 ? fighters : '';
    const { fighter1Id, fighter2Id, selectedFighterId} = fighterIds?.fighter1Id ? fighterIds : {};
    const [fighterPercentages, setFighterPercentages] = useState({})

    const fighter1Percentage = 50;
    const fighter2Percentage = 50;

    return (
        <Flex
            id="fight_stats"
            mt="4"
            display={tabs[TabsEnum.ALL] || tabs[TabsEnum.TABLE] || tabs[TabsEnum.SCORING] ? 'flex' : 'none'}
            flexDirection="row"
            px="2"
            // boxShadow={useColorModeValue('sm', 'sm-dark')}
            alignItems="center"
            justifyContent="space-between"
            w="100%"
            m="auto"
            borderBottom="1px solid gray"
            mb="2"
        >
                <Flex
                    borderBottom={
                        selectedFighterId && selectedFighterId == fighter1Id 
                        ? "2px solid white" 
                        : selectedFighterId && selectedFighterId != fighter1Id 
                            ? '2px solid blue' 
                            : '2px solid red'
                        }
                    flex="0 0 40%"
                    flexDir="column"
                    alignItems="center"
                    justifyContent="center"  
                    p="1"             
                >
                    <Heading 
                        pt="2"
                        size="lg" 
                        color="muted"
                    >
                        {capFirstLetters(fighter1.lastName)}
                    </Heading>
                    <Heading 
                        size="md"
                        color="gray.400"
                    >
                        {fighter1Percentage ? fighter1Percentage : 0}&#37;	
                    </Heading>
                </Flex>
                <Flex
                    flex="0 0 40%"
                    flexDir="column"
                    alignItems="center"
                    justifyContent="center"             
                >
                    <Heading 
                        size="lg" 
                        pt="2"
                    >
                        {capFirstLetters(fighter2.lastName)}
                    </Heading>
                    <Heading 
                        color="gray.400"
                        size="md"
                    >
                        {fighter2Percentage ? fighter2Percentage : 0}&#37;	
                    </Heading>
                </Flex>
        </Flex>
    )
}