import React, { useEffect, useState } from 'react'
import { Flex } from '@chakra-ui/react'
import { useParams } from 'react-router'
import { AnalyticsSidebar } from '../components/sidebars'
import { AnalyticsMain } from '../components/analytics'
import { stateStore } from '../stores'
import axios from 'axios'

const Analytics = () => {
    const {tokenConfig,  user } = stateStore.getState();
    const { sub, email, username } = user;
    const [showData, setShowData] = useState({
        fight: {
            fightQuickTitle: ''
        }
    });
    const { showId } = useParams(); // showId: /c8734c80-16e6-46d1-90f4-c103de4b8b92

    useEffect(() => {
        if(showId){
            const fetchFightData = async () => {
                const url = process.env.REACT_APP_ANALYTICS + `/${showId}`;
                return await axios.get(url, tokenConfig)
                    .then( res => setShowData(res.data))
                    .catch( err => console.log(err));
            }
            fetchFightData();
        }
    },[]);
    console.log('showData: ', showData);
    return(
        <Flex flexDirection={["column", "column", "row"]}>
            <AnalyticsSidebar
                showData={showData} 
                showId={showId} 
            />
            <AnalyticsMain showData={showData} />
        </Flex>
    )
}
export default Analytics
