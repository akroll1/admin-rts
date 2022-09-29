import React, { useState } from 'react'
import { Flex, Text } from '@chakra-ui/react'
import { capFirstLetters } from '../../../utils'


export const ScoringMoneylineTable = ({ 
    fighters, 
    props, 
    totalRounds 
}) => {
    // console.log('fighters: ', fighters);
    const mapPropsToFighter = (fighters, props, totalRounds) => {
        const fighter1PropsObj = {
            'DC': '',
            'KO13': '',
            'KO46': '',
            'KO79': '',
            'KO10': ''
        }
        const fighter2PropsObj = {
            'DC': '',
            'KO13': '',
            'KO46': '',
            'KO79': '',
            'KO10': ''
        }
        
        const [fighter1Id, fighter2Id] = fighters.map( fighter => fighter.fighterId);
        const fighter1Props = props.filter( prop => prop.fighterId === fighter1Id)
            .map( x => {
                const { odds, outcome } = x
                fighter1PropsObj[outcome] = odds;
                return 
            });
        const fighter2Props = props.filter( prop => prop.fighterId === fighter2Id)
            .map( x => {
                const { odds, outcome } = x;
                fighter2PropsObj[outcome] = odds;
                return 
            });
        return [fighter1PropsObj, fighter2PropsObj];
    }
    
    const roundProps = ['DC', 'KO13', 'KO46', 'KO79', 'KO10'];
    const [fighter1, fighter2] = fighters.length > 0 ? fighters : [];
    const [fighter1Props, fighter2Props] = fighters?.length > 0 && props?.length > 0 ? mapPropsToFighter(fighters, props) : [];
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
                    <Text fontSize="lg" color="#A1A2A1">{fighter1?.lastName ? `${capFirstLetters(fighter1.lastName)}` : ``}</Text>
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
                    <Text fontSize="lg" color="#A1A2A1">{fighter2?.lastName ? `${capFirstLetters(fighter2.lastName)}` : ``}</Text>
                </Flex>
            </Flex>
        
            <Flex flexDir="row">
                
                <Flex 
                    flex="1 0 30%" 
                    flexDir="column" 
                    alignItems="center" 
                    justifyContent="center"
                >
                    { fighter1Props?.DC && roundProps.map( (prop, i) => <Text fontSize="1.2rem" key={i}>{fighter1Props[prop]}</Text> )}
                </Flex>
                
                <Flex flex="1 0 30%" flexDir="column" alignItems="center" justifyContent="center">
                    { fighter2Props?.DC && roundProps.map( (prop, i) => {
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
                    { fighter2Props?.DC && roundProps.map( (prop, i) => <Text fontSize="1.2rem" key={i}>{fighter2Props[prop]}</Text> )}
                </Flex>
            </Flex>
        </Flex>
    )
}