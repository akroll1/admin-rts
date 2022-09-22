import React, { useEffect, useState } from 'react'
import { Flex, Heading } from '@chakra-ui/react'
import { MyScorecardsTable } from '../components/tables'
import { ExpiredTokenModal } from '../components/modals'
import axios from 'axios'
import { capFirstLetters } from '../utils'
import { stateStore } from '../stores'

export const MyScorecards = () => {
    const [modals, setModals] = useState({
        expiredTokenModal: false
    });
    const [scorecards, setScorecards] = useState(null);

    const { user, setUser, setUserScorecards, tokenConfig, userScorecards } = stateStore( state => state);
    console.log('userScorecards: ', userScorecards)
    // getScorecards && check if user exists.
    useEffect(() => {
      const getUserScorecards = async () => {
        const url = process.env.REACT_APP_SCORECARDS + `/${encodeURIComponent(user.sub)}-${encodeURIComponent(user.email)}`;
        return axios.get(url, tokenConfig)
          .then(res => {
            if(res.data.includes('Token expired')){
              return setModals({ ...modals, expiredTokenModal: true });
            }
            if(res.data?.length > 0 ) setUserScorecards(res.data)
            // console.log('res: ',res);
            const data = res.data?.map(obj => {
              const { fighterData, fightStatus, scorecard } = obj;
              const { finalScore, groupScorecardId, ownerId, rounds, scorecardId, scores } = scorecard;
              if(ownerId.includes('@')){
                const patchUrl = process.env.REACT_APP_SCORECARDS + `/${scorecardId}`;
                const setOwnerId = axios.patch(patchUrl, { ownerId: user.sub, username: user.username }, tokenConfig)
                  .then( res => res).catch( err => console.log(err));
              }
              const [fighter1, fighter2] = fighterData.map( ({ lastName }) => lastName);
              const setPrediction = prediction => {
                  if(prediction){
                      const [prediction] = fighterData.filter( fighter => fighter.fighterId === scorecard.prediction.slice(0,36));
                      return `${capFirstLetters(prediction.lastName)} ${scorecard.prediction.slice(37)}`;
                  }
                      return `No Prediction`
              }
              const prediction = setPrediction(scorecard.prediction);
              const label = `${capFirstLetters(fighter1)} vs ${capFirstLetters(fighter2)}`;
              return ({
                fightStatus,
                finalScore,
                groupScorecardId,
                label,
                prediction,
                rounds,
                scorecardId
              })
            });
            // put scorecard info in for scorecards switcher.
            if(res.data.length > 0){
              setScorecards(data)
              setUserScorecards(data)
            }
          }).catch(err => console.log(err))
        } 
        getUserScorecards();
  
        // put user data into DB.
        const updateUser = async () => {
          // put a check on here so this isn't called every time.
          const url = process.env.REACT_APP_USERS + `/${user.sub}`;
          return await axios.put(url, { username: user.username, email: user.email } , tokenConfig)
            .then( res => setUser({ ...user, ...res.data })).catch( err => console.log(err));
        }
        updateUser();
    },[])
    return (
        <Flex flexDir="column" p="4">
            <ExpiredTokenModal 
                modals={modals}
                setModals={setModals}
            />
            <Heading textAlign="center">Scorecards</Heading>
            <MyScorecardsTable scorecards={scorecards} />
        </Flex>
    )
}
export default MyScorecards