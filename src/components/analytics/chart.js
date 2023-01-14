import { useEffect, useState } from 'react'
import { Flex } from '@chakra-ui/react'
import { 
    VictoryArea,
    VictoryAxis,
    VictoryChart
} from 'victory'
import { useGlobalStore } from '../../stores'
import { AnalyticsFighters } from './analytics-fighters'


export const Chart = () => {

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
            const t = array.map( (num, _i) => {
                return ({
                    x: _i+1,
                    y: num
                })
            })
            setSwingsline(t)
            setFighter1(f1)
            setFighter2(f2)
        }
    }, [analytics, fighters])

    // console.log('roundByRoundTotals: ', analytics.roundByRoundTotals)
    // console.log('swingsline: ', swingsline)

    const renderYLabel = value => {
        if(value == 0) return '100%'
        if(value == 25) return '75%'
        if(value == 50) return '50%'
        if(value == 75) return '75%'
        if(value == 100) return '100%'
    }
    
    return (
        <Flex
            position="relative"
            flexDir="column"
            w="100%"
            m="auto"
            mt={["0", "8"]}
            maxW={["100%", "100%", "80%", "70%"]}
        >
            <Flex
                p="4"
                pb="0"
                mb={["-4","-12"]}
                flexDir="row"
                justifyContent="space-evenly"
                alignItems="flex-start"
                w="100%"
            > 
                { fighters?.length === 2 && fighters.map( (fighter, _i) => {
                    return (
                        <AnalyticsFighters 
                            key={_i}
                            iteration={_i}
                            fighter={fighter}
                            totalPercentages={analytics?.totalPercentages}
                        />
                    )
                })}
            </Flex>
            <Flex
                p="2"
                cursor="pointer"
            >   <Flex
                    w="0px"
                >
                    <svg>
                        <defs>
                            <linearGradient id="backgroundGradient" 
                            x1="0%" y1="0%" x2="0%" y2="100%"
                            >
                            <stop offset="0%" stopColor="darkred"/>
                            <stop offset="100%" stopColor="#f48877"/>
                            </linearGradient>
                        </defs>
                        <defs>
                            <linearGradient id="foregroundGradient" 
                            x1="0%" y1="0%" x2="0%" y2="100%"
                            >
                            <stop offset="0%" stopColor="#898ce6"/>
                            <stop offset="100%" stopColor="blue"/>
                            </linearGradient>
                        </defs>
                    </svg>
                </Flex>
                <VictoryChart 
                    responsive
                    minDomain={{ x: 1, y: 0 }}
                    maxDomain={{ x: 12, y: 100 }}
                    data={swingsline}
                    animate={2000}
                    style={{
                        background: {
                            fill: "url(#backgroundGradient)",
                        },
                        data: {
                            fill: "url(#backgroundGradient)",
                            stroke: "url(#backgroundGradient)",
                            strokeWidth: 10
                        }
                    }}
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
                                stroke: '#888', //CHANGE COLOR OF X-AXIS GRID LINES
                                strokeDasharray: '2',
                            },
                            label: {
                                fill: '#555'
                            },
                            tickLabels: {
                                fill: '#dadada', //CHANGE COLOR OF X-AXIS LABELS
                                fontSize: 12,
                                padding: 4
                            }, 
                        }}
                        tickValues={['1','2','3','4','5','6','7','8','9','10','11','12']}
                    />
                    <VictoryAxis 
                        dependentAxis
                        label="Percent&nbsp;&nbsp;Scored&nbsp;"
                        axisValue={[0,100]}
                        tickFormat={(t) => renderYLabel(t)}
                        tickValues={[0, 25, 50, 75, 100]}

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
                                stroke: '#888', //CHANGE COLOR OF X-AXIS GRID LINES
                                strokeDasharray: '2',
                            },
                            label: {
                                fill: '#fff'
                            },
                            tickLabels: {
                                fontSize: 12,
                                padding: 4,
                                fill: '#bbb', //CHANGE COLOR OF X-AXIS LABELS
                            }, 
                        }}
                    />

                    <VictoryArea 
                        data={swingsline}
                        style={{
                            data: {
                                fill: "url(#foregroundGradient)",
                                stroke: '#555'
                            }
                        }}
                    />
                </VictoryChart>
            </Flex>
        </Flex>
    )
}