import { 
    VictoryChart,
    VictoryLine 
} from 'victory'
import {
    Flex,
    Heading
} from '@chakra-ui/react'


export const SwingsGraph = props => {

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
                // height={50}
                // width={50}
            >
                <VictoryLine 
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
                        duration: 2000,
                        onLoad: { duration: 1000 }
                    }}
                    // labels={[{ x:  }, { y: 'Swing' }].map( el => el.x)}
                    // minDomain={[{ x: 0 }, { y: 1 }]}
                    // maxDomain={[{ x: 12}, { y: 10 }]}
                    // data={[
                    //     { x: 1, y: 2 },
                    //     { x: 2, y: 3 },
                    //     { x: 3, y: 5 },
                    //     { x: 4, y: 4 },
                    //     { x: 5, y: 6 }
                    //   ]}
                    // x="Rounds"
                    // y="Fighters"
                    // range={{ x: [1,12], y: [0, 100]}}
                    // scale={{ x: 'linear', y: 'linear'}}
                    // padding={{ top: 20, bottom: 60 }}
                />
            </VictoryChart>
        </Flex>
    )
}