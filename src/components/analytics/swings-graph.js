import { useEffect, useState } from 'react'
import { 
    DataLabel,
    VictoryAxis,
    VictoryChart,
    VictoryLabel,
    VictoryLine 
} from 'victory'
import {
    Flex,
    Heading
} from '@chakra-ui/react'
import { useGlobalStore } from '../../stores'
import { capFirstLetters } from '../../utils'

export const SwingsGraph = props => {

    const {
        analytics,
        fighters,
        totalRounds,
    } = useGlobalStore()

    const [fighter1, setFighter1] = useState('')
    const [fighter2, setFighter2] = useState('')
    const [swingsline, setSwingsline] = useState(null)

    useEffect(() => {
        if(analytics?.roundByRoundTotals?.length > 0 && fighters?.length === 2){
            const [f1, f2] = fighters.map( fighter => fighter.lastName);
            const swingsline = [ ...new Array(totalRounds).fill('')].map( (_, _i) => {
                const calculateYAxis = _i => {
                    if(!analytics.roundByRoundTotals[_i]) return 0.5;

                    if(analytics.roundByRoundTotals[_i][f1] == 0 
                        && analytics.roundByRoundTotals[_i][f2] == 0) return 50;

                    if(analytics.roundByRoundTotals[_i][f1] == 100 
                        && analytics.roundByRoundTotals[_i][f2] == 0) return 0;

                    if(analytics.roundByRoundTotals[_i][f1] == 0 
                        && analytics.roundByRoundTotals[_i][f2] == 100) return 100;

                    return analytics.roundByRoundTotals[_i][f2]

                }
                return ({
                    y: calculateYAxis(_i)
                })
            })
            const array = swingsline.map( scoresObj => {
                if(scoresObj.x == 0 && scoresObj.y == 0) return 50
                if(scoresObj.x == 0 && scoresObj.y > 0) return 0
                if(scoresObj.x > 0 && scoresObj.y == 0) return 100

                return scoresObj.y
            }) 
            array.unshift(50)
            setSwingsline(array)
            setFighter1(f1)
            setFighter2(f2)
        }
    }, [analytics, fighters])

    console.log('roundByRoundTotals: ', analytics.roundByRoundTotals)
    console.log('swingsline: ', swingsline)

    const renderYLabel = value => {
        if(value == 0) return '100%'
        if(value == 25) return '75%'
        if(value == 50) return '50%'
        if(value == 75) return '75%'
        if(value == 100) return '100%'
    }
    
    return (
        <Flex
            w={["100%", "50%"]}
            flexDir="column"
            // w="100%"
            // h="450"
            // w="600"
            p="4"
            {...props}   
        >
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
                            padding: '30',
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
                    domain={[2,12]}
                />
                <VictoryAxis 
                    dependentAxis
                    label="Scored &nbsp; Winner"
                    axisValue={[0,100]}
                    tickFormat={(t) => renderYLabel(t)}
                    tickValues={[0, 25, 50, 75, 100]}

                    style={{
                        axis: {
                            stroke: '#444'  //CHANGE COLOR OF X-AXIS
                        },
                        axisLabel: {
                            fill: '#aeaeae',
                            padding: '48',
                            fontSize: '18',
                        },
                        color: '#aeaeae',
                        grid: {
                            stroke: '#222', //CHANGE COLOR OF X-AXIS GRID LINES
                            strokeDasharray: '2',
                        },
                        label: {
                            fill: '#fff'
                        },
                        tickLabels: {
                            fill: '#bbb' //CHANGE COLOR OF X-AXIS LABELS
                        }, 
                    }}
                />
                <VictoryLine
                    labels={[`${capFirstLetters(fighter1)}`, `${capFirstLetters(fighter2)}`]}
                    // labels={`${capFirstLetters(fighter1)}, ${capFirstLetters(fighter2)}`}
                    labelComponent={
                        <VictoryLabel
                            dependentAxis
                            // text={[`${fighter1}`, `${fighter2}`]}
                            textAnchor="start"
                            style={{
                                fill: '#cacaca',
                                padding: '5',
                                fontSize: 18
                            }}  
                            backgroundStyle={[
                                { 
                                    fill: "transparent", 
                                    opacity: 0.2,
                                },
                            ]}
                        />
                    }
                    tickFormat={(t) => `${t}%`}
                    responsive={true}
                    style={{
                        data: { 
                            stroke: "#c43a31",
                            strokeWidth: '5'
                        },
                        parent: { border: "1px solid #ccc"},
                    }}
                    animate={{
                        duration: 1000,
                        onLoad: { duration: 1000 }
                    }}
                    data={swingsline}
                />
            </VictoryChart>
        </Flex>
    )
}