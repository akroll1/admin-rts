import React, {useState, useEffect} from 'react'
import { Heading, Center } from '@chakra-ui/react'
import { MyScorecardsTable } from '../components/tables'
import axios from 'axios'

export const MyScorecards = ({ user, accessTokenConfig, handleFormSelect, toggleState }) => {
    const [scorecardData, setScorecardData] = useState([]);
    console.log('user: ', user);
    useEffect(() => {
        if(user && user.sub){
            const getUserScorecards = async () => {
                const url = process.env.REACT_APP_USER_SCORECARDS + `/${user.sub}`;
                const scorecards = await axios.get(url, accessTokenConfig)
                    .then(res => {
                        // console.log('res: ',res);
                        return res.data.map(obj => {
                            let tempGS = obj.associatedGroupScorecard;
                            tempGS.scorecard = obj.scorecard;
                            return tempGS;
                        })
                    })
                    .catch(err => console.log(err))
                setScorecardData(scorecards);
            }
            getUserScorecards();
        }
    },[toggleState]);

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