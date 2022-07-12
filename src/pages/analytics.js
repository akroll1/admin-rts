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
    const [showData, setShowData] = useState({});
    const { showId } = useParams(); // 3d2ad8d8-f9a2-4ea6-9038-5eea0bc61083

    useEffect(() => {
        if(showId){
            const fetchFightData = async () => {
                const url = `${process.env.REACT_APP_ANALYTICS}/${ showId }`;
                return await axios.get(url, tokenConfig)
                .then( res => setShowData(res.data))
                .catch( err => console.log(err));
            }
            fetchFightData();
        }
    },[]);
    console.log('showData: ', showData);
    return(
        <Flex>
            <AnalyticsSidebar showData={showData} />
            <AnalyticsMain />
        </Flex>
    )
}
export default Analytics
