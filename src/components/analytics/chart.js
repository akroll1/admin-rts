import { Flex } from '@chakra-ui/react'
import { 
    VictoryArea,
    VictoryAxis,
    VictoryChart
} from 'victory'
import { useGlobalStore } from '../../stores'


export const Chart = () => {

    const {
        analytics
    } = useGlobalStore()

    console.log('analytics: ', analytics)
    
    return (
        <Flex>
            <VictoryChart />
                <VictoryArea data={[
                    { x: 0, y: 2 },
                    { x: 60, y: 3 },
                    { x: 120, y: 5 },
                    { x: 180, y: 4 },
                    { x: 240, y: 4 },
                    { x: 300, y: 4 }
                ]} />
                <VictoryAxis />
        </Flex>
    )
}