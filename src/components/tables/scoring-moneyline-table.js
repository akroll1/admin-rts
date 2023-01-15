import { useEffect, useState } from 'react'
import { 
    Flex, 
    Heading,    
    Text 
} from '@chakra-ui/react'
import { capFirstLetters } from '../../utils'
import { useGlobalStore } from '../../stores'
import { FightPropsEnum } from '../../stores'

export const ScoringMoneylineTable = () => {

    const {
        fighters,
        fightProps,
    } = useGlobalStore()

    const [propsLabels, setPropsLabels] = useState({})

    const [fighter1, fighter2] = fighters.length === 2 ? fighters : []

    // console.log('fightProps: ', fightProps.fightProps)
    useEffect(() => {
        if(fightProps?.fightProps?.MONEYLINE){
            const [fighter1, fighter2] = fighters;
            const obj = fightProps.fightProps[FightPropsEnum.MONEYLINE]
            setPropsLabels({
                moneyline1: `${obj[fighter1.fighterId]}`,
                moneyline2: `${obj[fighter2.fighterId]}`
            })
        }
    },[fightProps])
    return (
        <Flex flexDir="column">
            <Flex flexDir="row"> 
                <Flex 
                    flex="1 0 45%" 
                    flexDir="column" 
                    alignItems="center" 
                    justifyContent="center"
                    >
                    <Heading 
                        color="whiteAlpha.800"                        
                        fontSize="2xl" 
                    >
                        {fighter1?.lastName ? `${capFirstLetters(fighter1.lastName)}` : ``}
                    </Heading>
                    <Heading 
                        fontSize="xl" 
                    >
                        {propsLabels.moneyline1}
                    </Heading>
                </Flex>
                <Flex 
                    flex="1 0 45%" 
                    flexDir="column" 
                    alignItems="center" 
                    justifyContent="center"
                >
                    <Heading 
                        color="whiteAlpha.800"
                        fontSize="2xl" 
                    >
                        {fighter2?.lastName ? `${capFirstLetters(fighter2.lastName)}` : ``}
                    </Heading>
                    <Heading 
                        fontSize="xl" 
                    >
                        {propsLabels.moneyline2}
                    </Heading>
                </Flex>
            </Flex>
        </Flex>
    )
}