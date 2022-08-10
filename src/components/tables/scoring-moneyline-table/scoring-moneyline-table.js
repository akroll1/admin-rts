import React from 'react'
import { Flex, Text } from '@chakra-ui/react'
import { capFirstLetters } from '../../../utils'


export const ScoringMoneylineTable = ({ 
    fighterData, 
    props, 
    totalRounds 
}) => {
    
    const mapPropsToFighter = (fighterData, props, totalRounds) => {
        // console.log('props: ', props)
        const map = fighterData.map( (fighter, i) => {
            const labeledProps = Object.entries(props[i][fighter.fighterId]).reduce( (acc, curr, idx) => {
                const setPropsLabel = (score, index) => {
                    if(score[0] === 'DC'){
                        if(index >= 2){
                            return `4-1`
                        }
                        return `3-1`
                    } 
                    switch(index){
                        case 0:
                            return `4-1`
                        case 1:
                            return `7-1`
                        case 2:
                            return `10-1`
                        case 3:
                            return `12-1`
                        case 4:
                            return `15-1`
                        default: 
                            return console.log(`No index.`)
                    }
                }
                const obj = {
                    [curr[0]]: setPropsLabel(curr, idx)
                }
                return acc.concat(obj);
            },[]);
            const legend = {
                'DC': '',
                'KO13': '',
                'KO46': '',
                'KO79': '',
                'KO10': ''
            };
            // console.log('labeledProps: ', labeledProps);
            const reduced = labeledProps.map( labeled => {
                for(const [key, val] of Object.entries(labeled)){
                    legend[key] = val
                }
            })
            return ({
                fighter: `${capFirstLetters(fighter.firstName)} ${capFirstLetters(fighter.lastName)}`,
                props: legend
            });
        })
        return map
    }

    const data = fighterData?.length > 0 && props?.length > 0 ? mapPropsToFighter(fighterData, props, totalRounds) : [];
    const roundProps = ['DC', 'KO13', 'KO46', 'KO79', 'KO10'];
    // console.log('data: ', data)
    const [fighter1, fighter2] = data.length > 0 ? data : [];
    const transfromPropLabel = label => {
        if(label.includes('KO10')) return `KO 10-12`;
        if(label.includes('KO')) return `KO ${label.slice(2).split('').join('-')}`;
    }
    return (
        <Flex flexDir="column">
            <Flex flexDir="row"> 
                <Flex 
                    flex="1 0 30%" 
                    flexDir="column" 
                    alignItems="center" 
                    justifyContent="center"
                >
                    <Text fontSize="lg" color="#A1A2A1">{data.length > 0 ? `${fighter1.fighter}` : ''}</Text>
                </Flex>

                <Flex 
                    flex="1 0 30%" 
                    flexDir="column" 
                    alignItems="center" 
                    justifyContent="center"
                >
                    <Text fontSize="lg" color="#A1A2A1">Props</Text>

                </Flex>

                <Flex 
                    flex="1 0 30%" 
                    flexDir="column" 
                    alignItems="center" 
                    justifyContent="center"
                >
                    <Text fontSize="lg" color="#A1A2A1">{data.length > 0 ? `${fighter2.fighter}` : ''}</Text>
                </Flex>
            </Flex>
        
            <Flex flexDir="row">
                
                <Flex 
                    flex="1 0 30%" 
                    flexDir="column" 
                    alignItems="center" 
                    justifyContent="center"
                >
                    { data.length > 0 && roundProps.map( (prop, i) => {
                        // console.log('prop: ', fighter1.props[prop])
                        return <Text fontSize="1.2rem" key={i}>{fighter1.props[prop]}</Text>
                    })}
                </Flex>
                
                <Flex flex="1 0 30%" flexDir="column" alignItems="center" justifyContent="center">
                    { roundProps.map( (prop, i) => {
                        return (
                            <Text color="#c9c9c9" fontSize="1.2rem" key={i}>{prop === 'DC' ? 'Decision' : `${transfromPropLabel(prop)}`}</Text>
                        )
                    })}
                </Flex>

                <Flex 
                    flex="1 0 30%" 
                    flexDir="column" 
                    alignItems="center" 
                    justifyContent="center"
                >
                    { data.length > 0 && roundProps.map( (prop, i) => {
                        // console.log('prop: ', fighter1.props[prop])
                        return <Text fontSize="1.2rem" key={i}>{fighter2.props[prop]}</Text>
                    })}
                </Flex>
            </Flex>
        </Flex>
    )
}