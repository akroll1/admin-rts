import { useEffect, useState } from 'react'
import { VictoryPie } from 'victory'
import { useGlobalStore } from '../../stores'
import { Flex, Heading } from '@chakra-ui/react'
import { capFirstLetters } from '../../utils'

export const PieChart = props => {

    const {
        analytics,
        fighters,
    } = useGlobalStore()

    const [percentages, setPercentages] = useState([])

    useEffect(() => {
        if(analytics?.totalScorecards > 0 && fighters.length === 2){
            const { totalPercentages } = analytics;
            const [f1, f2] = fighters.map( fighter => fighter.lastName)
            const percentages = fighters.map( fighter => {
                return ({
                    x: capFirstLetters(fighter.lastName),
                    y: parseInt(totalPercentages[fighter.lastName])
                })
            })
            const evenRounds = {
                x: 'Even', 
                y: 100 - (parseInt(totalPercentages[f1]) + parseInt(totalPercentages[f2]))
            }
            const evenRoundsIncluded = percentages.concat(evenRounds)

            setPercentages(evenRoundsIncluded)
        }
    },[analytics])

    const [f1, f2] = fighters?.length === 2 ? fighters.map( fighter => fighter.lastName) : '';

    return (
        <Flex
            id="pie"
            flexDir="column"
            h="200px"
            {...props}
            w={["auto", "50%"]}
            justifyContent="flex-start"
            maxW={["100%", "50%", "30%"]}        
        >
            <Heading
                size="sm"
                textAlign="center"
            >
                Total Rounds Won
            </Heading>
            <VictoryPie 
                animate={{
                    duration: 1000
                }}
                colorScale={['#c43a31', '#1d5d90', '#8d8d8d']}
                data={percentages} 
                responsive={true}
                // labels={[`${[capFirstLetters(f1)]}`, `${[capFirstLetters(f2)]}`, `Even`]}
                style={{
                    labels: {
                        fill: '#fff',
                        fontSize: '36'
                    }
                }}
            />
        </Flex>
    )

}