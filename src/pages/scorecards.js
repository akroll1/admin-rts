import React, { useEffect, useState } from 'react'
import { Flex, Heading } from '@chakra-ui/react'
import { useParams } from 'react-router'
import { stateStore } from '../stores'
import axios from 'axios'
import { ScorecardsPageScoringTable } from '../components/tables'
import { ScorecardsSearch } from '../components/search'
import { ExpiredTokenModal } from '../components/modals'
import { capFirstLetters } from '../utils'

export const Scorecards = () => {
    const { scorecardId } = useParams();
    const { tokenConfig } = stateStore.getState();
    const [scorecard, setScorecard] = useState([]);
    const [tableData, setTableData] = useState([]);
    const [prediction, setPrediction] = useState('');
    const [officialResult, setOfficialResult] = useState('');
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
            // that needs to be 
            const winnerId = ''
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
                setOfficialResult(`${capFirstLetters(officialResult)} ${officialHow}`)

                const calculateScore = () => {
                    const userPickedWinner = officialResult === predictedWinner ? true : false;
                    if(!userPickedWinner) return 0;
                    console.log('officialHow: ', officialHow);
                    console.log('predictedHow: ', predictedHow)
                    // if Decision, less points than a KO.
                    if(officialHow.includes('KO')){
                        // if called KO round.
                        if(officialHow === predictedHow) return 250;
                        // if called correct interval, such as 1-3 or 4-6.
                        const officialHowNumber = Number(officialHow.slice(2));
                        const predictedHowNumber = Number(predictedHow.slice(2));
                        console.log('officialHowNumber: ', officialHowNumber);
                        console.log('predictedHowNumber: ', predictedHowNumber);
                        const getScore = () => {
                            if( (officialHowNumber === 1 || officialHowNumber === 2 || officialHowNumber === 3) && (predictedHowNumber === 1 || predictedHowNumber === 2 || predictedHowNumber === 3) ){
                                return 100;
                            }
                            if( (officialHowNumber === 4 || officialHowNumber === 5 || officialHowNumber === 6) && (predictedHowNumber === 4 || predictedHowNumber === 5 || predictedHowNumber === 6) ){
                                return 100
                            }
                            if( (officialHowNumber === 7 || officialHowNumber === 8 || officialHowNumber === 9) && (predictedHowNumber === 7 || predictedHowNumber === 8 || predictedHowNumber === 9) ){
                                return 100;
                            }
                            if( (officialHowNumber === 10 || officialHowNumber === 11 || officialHowNumber === 12) && (predictedHowNumber === 10 || predictedHowNumber === 11 || predictedHowNumber === 12) ){
                                return 100;
                            }
                        }
                        const score = getScore();
                        setScore(score)
                    } else {
                        // for UD, Decision.
                        return 50
                    }
                }
                const score = calculateScore();
                console.log('score: ', score)
                return ({ 
                    officialWinner: officialResult,
                    officialHow,
                    predictedWinner,
                    predictedHow
                });
            }

            const getUserPrediction = prediction => {

            }
            
            if(prediction){
                // 1. Get official result winner and how.
                // 2. Get prediction and how.
                // 3. Calculate score from that.
                const { officialWinner, officialHow, predictedWinner, predictedHow } = getOfficialResultAndUserPrediction();
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
    // console.log('tableData: ', tableData)
    return (
        <Flex p="8" flexDir="column" wordBreak="break-word">
            <ExpiredTokenModal modals={modals} setModals={setModals} />
            <Flex p="4" flexDir="column" alignItems="center">
                <Heading my="4" m="2" as="h1" size="lg">Search User's Scorecards</Heading>
                <ScorecardsSearch />
            </Flex>
            <Heading my="1" as="h2" size="md">
                Username: {username} 
                {/* {capFirstLetters(`${fighter1.firstName} ${fighter1.lastName}`)} vs {capFirstLetters(`${fighter2.firstName} ${fighter2.lastName}`)} */}
            </Heading>
            <Heading my="1" as="h3" size="md">Prediction: {prediction}</Heading>
            <Heading my="1" as="h3" size="md">Official Result: {officialResult}</Heading>
            <Heading my="1" as="h3" size="md">Score: {score}</Heading>

            <ScorecardsPageScoringTable 
                tableData={tableData}
                totalRounds={totalRounds}
            />
        </Flex>
    )
}