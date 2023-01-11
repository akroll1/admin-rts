import { useEffect, useState } from 'react'
import { 
    VictoryChart,
    VictoryLine 
} from 'victory'
import {
    Flex,
    Heading
} from '@chakra-ui/react'
import { useGlobalStore } from '../../stores'

export const SwingsGraph = props => {

    const {
        analytics,
        fighters,
        totalRounds,
    } = useGlobalStore()

    const [swingsline, setSwingsline] = useState(null)

    useEffect(() => {
        if(analytics?.roundByRoundTotals?.length > 0 && fighters?.length === 2){
            const [f1, f2] = fighters.map( fighter => fighter.lastName);
            const swingsline = [ ...new Array(totalRounds).fill('')].map( (_, _i) => {
                const calculateYAxis = () => {
                    if(!analytics.roundByRoundTotals[_i+1]) return 50;
                    if(analytics.roundByRoundTotals[_i+1][f1] == 0 && analytics.roundByRoundTotals[_i+1][f2] == 0) return 50;
                    if(analytics.roundByRoundTotals[_i+1][f1] == 100 && analytics.roundByRoundTotals[_i+1][f2] == 0) return 0;
                    if(analytics.roundByRoundTotals[_i+1][f1] == 0 && analytics.roundByRoundTotals[_i+1][f2] == 100) return 100;
                    return analytics.roundByRoundTotals[_i+1][f2]

                }
                return ({
                    x: (_i+1),
                    y: calculateYAxis()
                })
            })
            setSwingsline(swingsline)
        }
    }, [analytics, fighters])

    console.log('roundByRoundTotals: ', analytics.roundByRoundTotals)
    console.log('swingsline: ', swingsline)
    
    return (
        <Flex
            flexDir="column"
            // w="100%"
            h="400"
            w="400"
            p="4"
            {...props}   
        >
            <Heading
                size="sm"
                textAlign="center"            
            >
                Viewer Scoring
            </Heading>
            <VictoryChart
                scale="linear"
                // height={50}
                // width={50}
            >
                <VictoryLine
                    domain={{ x: [1, 12], y: [0, 100]}} 
                    responsive={true}
                    style={{
                        data: { stroke: "#c43a31" },
                        parent: { border: "1px solid #ccc"},
                        labels:{
                            fontSize: '48',
                            fill: '#fff'
                        } 
                    }}
                    animate={{
                        duration: 1000,
                        onLoad: { duration: 1000 }
                    }}
                    // minDomain={[{ x: 0 }, { y: 100 }]}
                    // maxDomain={[{ x: 12}, { y: 100 }]}
                    data={swingsline}
                    // x="x"
                    // y="Fighters"
                    // range={{ x: [1,12], y: [0, 100]}}
                    // scale={{ x: 'linear', y: 'linear'}}
                    // padding={{ top: 20, bottom: 60 }}
                />
            </VictoryChart>
        </Flex>
    )
}