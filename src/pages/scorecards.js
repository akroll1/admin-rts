import React, { useEffect, useState } from 'react'
import { Flex, Heading } from '@chakra-ui/react'
import { useParams } from 'react-router'
import { stateStore } from '../stores'
import axios from 'axios'
import { ScorecardsPageScoringTable } from '../components/tables'
import { ScorecardsSearch } from '../components/search'
import { ExpiredTokenModal } from '../components/modals'
import { capFirstLetters } from '../utils'
import { ConsoleLogger } from '@aws-amplify/core'

export const Scorecards = () => {
    const { scorecardId } = useParams();
    const { tokenConfig } = stateStore.getState();
    const [scorecard, setScorecard] = useState([]);
    const [tableData, setTableData] = useState([]);
    const [prediction, setPrediction] = useState('');
    const [score, setScore] = useState('');
    const [modals, setModals] = useState({
        expiredTokenModal: false
    });

    useEffect(() => {
        if(scorecardId){
            const getScorecard = async () => {
                const url = process.env.REACT_APP_SCORECARDS + `/card/${scorecardId}`;
                return axios.get(url, tokenConfig)
                .then( res => {
                    if(res.data.length > 0 && res.data?.includes('Token expired')) return setModals({ ...modals, expiredTokenModal: true });
                    setScorecard([res.data])
                }).catch( err => console.log(err))
            }
            getScorecard()
        }
    },[scorecardId]);
    useEffect(() => {
        if(scorecard?.length > 0){
            getTableData(scorecard);
        }
    },[scorecard]);

    const getTableData = scorecards => {   
        

        const s = scorecards.map( scorecard => {
            const { fighterData, username } = scorecard;
            const [fighter1, fighter2] = fighterData;
            let { prediction } = scorecard.scorecard;
            const { scores } = scorecard.scorecard;
            const sortRoundAscending = (a, b) => a.round - b.round;

            const getOfficialResultAndUserPrediction = () => {
                // will always be 36, uuid.
                const officialResult = scorecard.fight.officialResult.slice(0, 36) === fighter1.fighterId ? `${fighter1.lastName}` : `${fighter2.lastName}`;
                // 38 here for a space in officialResult.
                const officialHow = scorecard.fight.officialResult.slice(38);
                const predictedWinner = prediction.slice(0, 36) === fighter1.fighterId ? `${fighter1.lastName}` : `${fighter2.lastName}`;
                const predictedHow = prediction.slice(37);
                setPrediction(`${capFirstLetters(predictedWinner)} ${predictedHow}`);
                // setOfficialResult(`${capFirstLetters(officialResult)} ${officialHow}`)

                return ({ 
                    officialWinner: officialResult,
                    officialHow,
                    predictedWinner,
                    predictedHow
                });
            }
            
            if(prediction){
                // 1. Get official result winner and how.
                // 2. Get prediction and how.
                const { 
                    officialWinner, 
                    officialHow, 
                    predictedWinner, 
                    predictedHow 
                } = getOfficialResultAndUserPrediction();
                // console.log('officialWinner: ', officialWinner);
                // console.log('officialHow: ', officialHow);
                // console.log('predictedWinner: ', predictedWinner)
                // console.log('predictedHow: ', predictedHow)

               
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
                fighters: [fighter1, fighter2],
                mappedScores,
                prediction,
                totals,
                username,
            })
        })
        setTableData(s);
    }; 

    const getScorecardData = scorecard => {
        
        const [fighter1, fighter2] = scorecard.fighterData;
        const officialResult = scorecard.fight.officialResult.slice(0, 36) === fighter1.fighterId 
        ? `${capFirstLetters(fighter1.lastName)} ${scorecard.fight.officialResult.slice(37)}`
        : `${capFirstLetters(fighter2.lastName)} ${scorecard.fight.officialResult.slice(37)}`
        
        const { finalScore, rounds } = scorecard.scorecard;

        const username = scorecard.username;
            return ({
                fighter1,
                fighter2,
                finalScore,
                officialResult,
                totalRounds: rounds,
                username
            })
    }
    const { officialResult, finalScore, totalRounds, username} = scorecard.length > 0 ? getScorecardData(scorecard[0]) : '';
    return (
        <Flex 
            p="8" 
            flexDir="column" 
            wordBreak="break-word"
        >
            <ExpiredTokenModal 
                modals={modals} 
                setModals={setModals} 
            />
            <Flex 
                p="4" 
                flexDir="column" 
                alignItems="center"
            >
                <Heading 
                    my="4" 
                    m="2" 
                    as="h1" 
                    size="lg"
                >
                    Search Scorecards
                </Heading>
                <ScorecardsSearch />
            </Flex>
            <Heading my="1" as="h2" size="md">Username: {username}</Heading>
            <Heading my="1" as="h3" size="md">Prediction: {prediction ? prediction : `No Prediction`}</Heading>
            <Heading my="1" as="h3" size="md">Official Result: {officialResult}</Heading>
            <Heading my="1" as="h3" size="md">Score: {finalScore ? finalScore : `No Score`}</Heading>

            <ScorecardsPageScoringTable 
                tableData={tableData}
                totalRounds={totalRounds}
            />
        </Flex>
    )
}