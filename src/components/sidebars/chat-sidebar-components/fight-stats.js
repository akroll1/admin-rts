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
            mt="4"
            display={tabs[TabsEnum.ALL] || tabs[TabsEnum.TABLE] || tabs[TabsEnum.SCORING] ? 'flex' : 'none'}
            flexDirection="row"
            px="2"
            boxShadow={useColorModeValue('sm', 'sm-dark')}
            alignItems="center"
            justifyContent="space-between"
            w="100%"
            m="auto"
            borderBottom="1px solid gray"
            pb="1"
        >
                <Flex
                    borderBottom={ selectedFighterId 
                        ? selectedFighterId === fighter1Id
                            ? '2px solid red'
                            : '2px solid transparent'
                        : '2px solid transparent'
                    }
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
                        color="muted"
                    >
                        {capFirstLetters(fighter1?.lastName)}
                    </Heading>
                </Flex>
                <Flex
                    flex="0 0 40%"
                    flexDir="column"
                    alignItems="center"
                    justifyContent="center"  
                    borderBottom={ selectedFighterId 
                        ? selectedFighterId === fighter2Id
                            ? '2px solid red'
                            : '2px solid transparent'
                        : '2px solid transparent'
                    }           
                >
                    <Heading 
                        color="gray.300"
                        size="md"
                    >
                        {fighter2Percentage ? fighter2Percentage : 0}&#37;	
                    </Heading>
                    <Heading 
                        size="lg" 
                    >
                        {capFirstLetters(fighter2?.lastName)}
                    </Heading>
                </Flex>
        </Flex>
    )
}