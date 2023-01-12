import { useEffect, useState } from 'react'
import { 
    VictoryAxis,
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

    // console.log('roundByRoundTotals: ', analytics.roundByRoundTotals)
    // console.log('swingsline: ', swingsline)
    
    return (
        <Flex
            flexDir="column"
            // w="100%"
            h="450"
            w="600"
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
                responsive
                scale="linear"
                // height={50}
                // width={50}
            >
                <VictoryAxis 
                    label="Rounds"
                    style={{
                        axis: {
                            stroke: '#444'  //CHANGE COLOR OF X-AXIS
                        },
                        axisLabel: {
                            fill: '#dadada',
                            padding: '36',
                            fontSize: '18',
                        },
                        color: '#dadada',
                        grid: {
                            stroke: '#222', //CHANGE COLOR OF X-AXIS GRID LINES
                            strokeDasharray: '2',
                        },
                        label: {
                            fill: '#555'
                        },
                        tickLabels: {
                            fill: '#dadada' //CHANGE COLOR OF X-AXIS LABELS
                        }, 
                    }}
                    tickValues={[1,2,3,4,5,6,7,8,9,10,11,12]}
                />
                <VictoryAxis 
                    dependentAxis
                    label="Round Percentages"
                    style={{
                        axis: {
                            stroke: '#444'  //CHANGE COLOR OF X-AXIS
                        },
                        axisLabel: {
                            fill: '#aeaeae',
                            padding: '36',
                            fontSize: '18',
                        },
                        color: '#aeaeae',
                        grid: {
                            stroke: '#222', //CHANGE COLOR OF X-AXIS GRID LINES
                            strokeDasharray: '2',
                        },
                        label: {
                            fill: '#555'
                        },
                        tickLabels: {
                            fill: '#bbb' //CHANGE COLOR OF X-AXIS LABELS
                        }, 
                    }}
                    tickFormat={(t) => `${t}%`}
                    // tickValues={[20, ]}
                    />
                <VictoryLine
                    domain={{ x: [1, 12], y: [0, 100]}} 
                    responsive={true}
                    style={{
                        data: { 
                            stroke: "#c43a31",
                            strokeWidth: '10'
                        },
                        parent: { border: "1px solid #ccc"},
                    }}
                    animate={{
                        duration: 1000,
                        onLoad: { duration: 1000 }
                    }}
                    // minDomain={[{ x: 0 }, { y: 100 }]}
                    // maxDomain={[{ x: 12}, { y: 100 }]}
                    data={swingsline}
                    // range={{ x: [1,12], y: [0, 100], label: 'Win Percentage'}}
                    // scale={{ x: 'linear', y: 'linear'}}
                />
            </VictoryChart>
        </Flex>
    )
}