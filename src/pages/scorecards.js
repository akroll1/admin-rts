import React, { useEffect, useState } from 'react'
import { Flex, Heading } from '@chakra-ui/react'
import { useParams } from 'react-router'
import { stateStore } from '../stores'
import axios from 'axios'
import { capFirstLetters } from '../utils'
import { ScorecardsPageScoringTable } from '../components/tables'
import { ScorecardsSearch } from '../components/search'

export const Scorecards = () => {
    const { scorecardId } = useParams();
    const { tokenConfig } = stateStore.getState();
    const [scorecard, setScorecard] = useState([]);
    const [tableData, setTableData] = useState([]);
    const [prediction, setPrediction] = useState('');

    useEffect(() => {
        if(tableData.length > 0){
            const prediction = tableData[0].prediction;
            const step = prediction.split(',').join(' ');
            console.log('step: ', step)
            const transformed = step.charAt(0).toUpperCase() + step.slice(1);
            setPrediction(transformed);
        }
    },[tableData])

    useEffect(() => {
        if(scorecardId){
            const getScorecard = async () => {
                const url = process.env.REACT_APP_SCORECARDS + `/card/${scorecardId}`;
                return axios.get(url, tokenConfig)
                .then( res => setScorecard([res.data]))
                .catch( err => console.log(err))
            }
            getScorecard()
        }
    },[scorecardId]);

    useEffect(() => {
        if(scorecard?.length > 0){
            getTableData(scorecard);
        }
    },[scorecard]);

    const getTableData = (scorecards) => {            
        const s = scorecards.map( scorecard => {
            const { fighterData, username } = scorecard;
            let { prediction } = scorecard.scorecard;
            const { scores } = scorecard.scorecard;
            const [fighter1, fighter2] = fighterData;
            const sortRoundAscending = (a, b) => a.round - b.round;
            
            if(prediction){
                const index = prediction.indexOf(',');
                prediction = prediction.slice(0, index) === fighter1.fighterId ? `${fighter1.lastName},${prediction.slice(index+1)}` : `${fighter2.lastName},${prediction.slice(index+1)}`;
            }

            const totals = scores.reduce( (acc, curr) => {
                if(curr[fighter1.lastName]){
                    acc[fighter1.lastName] += curr[fighter1.lastName];
                }
                if(curr[fighter2.lastName]){
                    acc[fighter2.lastName] += curr[fighter2.lastName];
                }
                return acc;
            },{
                [fighter1.lastName]: 0,
                [fighter2.lastName]: 0
            });
            const mappedScores = scores.map( score => {
                const { round } = score;
                const f1name = fighter1.lastName;
                const f2name = fighter2.lastName;
                return ({
                    round,
                    [f1name]: score[fighter1.lastName] ? score[fighter1.lastName] : 0,
                    [f2name]: score[fighter2.lastName] ? score[fighter2.lastName] : 0
                })
            })
            .sort(sortRoundAscending);
           
            return ({
                mappedScores,
                username,
                totals,
                fighters: [fighter1.lastName, fighter2.lastName],
                prediction
            })
        })
        setTableData(s);
    }; 

    const [fighter1, fighter2] = scorecard.length > 0 ? scorecard[0].fighterData : [];
    const totalRounds = scorecard.length > 0 ? scorecard[0].scorecard.rounds : 12;
    const username = scorecard.length > 0 ? scorecard[0].username : '';
    // console.log('scorecard: ', scorecard)
    console.log('tableData: ', tableData)
    return (
        <Flex p="8" flexDir="column" wordBreak="break-word">
            <Flex p="4" flexDir="column" alignItems="center">
                <Heading my="4" m="2" as="h1" size="lg">Search User's Scorecards</Heading>
                <ScorecardsSearch />
            </Flex>
            <Heading my="1" as="h2" size="md">
                Username: {username} 
                {/* {capFirstLetters(`${fighter1.firstName} ${fighter1.lastName}`)} vs {capFirstLetters(`${fighter2.firstName} ${fighter2.lastName}`)} */}
            </Heading>
            <Heading my="1" as="h3" size="md">Prediction: {prediction}</Heading>
            <Heading my="1" as="h3" size="md">Result: </Heading>
            <Flex alignItems="center" justifyContent="center">

            </Flex>
            <ScorecardsPageScoringTable 
                tableData={tableData}
                totalRounds={totalRounds}
            />
        </Flex>
    )
}