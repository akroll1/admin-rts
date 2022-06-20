import React, {useState, useEffect} from 'react'
import { Heading, Center } from '@chakra-ui/react'
import { MyScorecardsTable } from '../components/tables'
import axios from 'axios'

export const MyScorecards = ({ user, accessTokenConfig, handleFormSelect }) => {
    const [scorecardData, setScorecardData] = useState([]);
    useEffect(() => {
        if(user){
            const getUserScorecards = async () => {
                const url = process.env.REACT_APP_SCORECARDS + `/${user.sub}`;
                const scorecards = await axios.get(url, accessTokenConfig)
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