import React, {useState, useEffect} from 'react'
import { Heading, Center } from '@chakra-ui/react'
import { MyScorecardsTable } from '../components/tables'
import axios from 'axios'
import { useUserStore, useUserScorecardsStore, useUserScorecardStore } from '../stores'
import { capFirstLetters } from '../utils'

export const MyScorecards = ({ user, accessTokenConfig, handleFormSelect }) => {
    const [scorecardData, setScorecardData] = useState([]);
    const { email, sub, username } = user;
    const setScorecardsStore = useUserScorecardsStore( state => state.setUserScorecards)
    useEffect(() => {
        if(sub){
            const getUserScorecards = async () => {
                const url = process.env.REACT_APP_SCORECARDS + `/${sub}:${email}`;
                // const encodedUrl = encodeURI(url);
                const scorecards = await axios.get(url, accessTokenConfig)
                    .then(res => {
                        // console.log('res: ',res);
                        const data = res.data.map(obj => {
                            const { fighterData, scorecard } = obj;
                            const { groupScorecardId, rounds, scores } = scorecard;
                            const [fighter1, fighter2] = fighterData.map( ({ lastName }) => lastName);
                            const setPrediction = prediction => {
                                if(prediction){
                                    const [prediction] = fighterData.filter( fighter => fighter.fighterId === scorecard.prediction.slice(0,36));
                                    return `${capFirstLetters(prediction.lastName)} ${scorecard.prediction.slice(37)}`;
                                }
                                    return 'Prediction Not Set'
                            }
                            const prediction = setPrediction(scorecard.prediction);
                            const label = `${capFirstLetters(fighter1)} vs ${capFirstLetters(fighter2)}`;
                            const isComplete = scores.length >= rounds;
                            return ({
                                prediction,
                                label,
                                groupScorecardId,
                                isComplete
                            })
                        });
                        setScorecardData(data)
                        // put scorecard info in for scorecards switcher.
                        setScorecardsStore(data)
                    })
                    .catch(err => console.log(err))
            }
            getUserScorecards();
        }
    },[sub]);
    // put user in DB, if not exists.
    useEffect(() => {
        if(sub){

            const checkOwnerId = async () => {
                const url = process.env.REACT_APP_USERS + `/${sub}`;
                const userExists = await axios.get(url, accessTokenConfig)
                .then( res => res.data).catch( err => console.log(err));
                if(!userExists){
                    const postUser = {
                        sub,
                        email,
                        username
                    };
                    return await axios.post(process.env.REACT_APP_USERS, postUser, accessTokenConfig)
                    .then( res => res).catch( err => console.log(err));
                }
            }
            checkOwnerId();
        }
    },[sub])
    return (
        <>
            <Center>
                <Heading my="4" as="h1" size="2xl">My Scorecards</Heading>
            </Center>
            <MyScorecardsTable handleFormSelect={handleFormSelect} scorecardData={scorecardData} />
        </>
    )
}
export default MyScorecards