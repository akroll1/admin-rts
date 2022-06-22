import React, {useState, useEffect} from 'react'
import { Heading, Center } from '@chakra-ui/react'
import { MyScorecardsTable } from '../components/tables'
import axios from 'axios'
import { ConsoleLogger } from '@aws-amplify/core'

export const MyScorecards = ({ user, accessTokenConfig, handleFormSelect }) => {
    const { sub, username } = user;
    const [scorecardData, setScorecardData] = useState([]);

    useEffect(() => {
        if(user){
            const getUserScorecards = async () => {
                let url = process.env.REACT_APP_SCORECARDS + `/${user.sub}:${user.email}`;
                const encodedUrl = encodeURI(url);
                const scorecards = await axios.get(encodedUrl, accessTokenConfig)
                    .then(res => {
                        console.log('res: ',res);
                        return res.data.map(obj => {
                            const { associatedGroupScorecard, scorecard, fighterData } = obj;
                            return ({
                                associatedGroupScorecard,
                                scorecard,
                                fighterData
                            });
                        })
                    })
                    .catch(err => console.log(err))
                setScorecardData(scorecards);
            }
            getUserScorecards();
        }
    },[]);
    useEffect(() => {
        if(scorecardData?.length > 0){
            const checkOwnerId = () => {
                return scorecardData.filter( async data => {
                    if(data.scorecard.ownerId.includes('@')){
                        const url = process.env.REACT_APP_SCORECARDS + `/${data.scorecard.scorecardId}`;
                        return axios.patch(url, {ownerId: sub, ownerDisplayName: username }, accessTokenConfig)
                            .then( res => console.log('res: ', res))
                            .catch( err => console.log(err));
                    }
                })
            }
            checkOwnerId();
        }
    },[scorecardData])
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