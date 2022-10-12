import React, { useEffect, useState } from 'react'
import { Flex } from '@chakra-ui/react'
import { useParams } from 'react-router'
import { AnalyticsSidebar } from '../components/sidebars'
import { AnalyticsMain } from '../components/analytics'
import { ExpiredTokenModal, MoneylineModal } from '../components/modals'
import { AnalyticsTable } from '../components/tables'
import { useStateStore } from '../stores'
import { useWindowResize } from '../hooks'
import axios from 'axios'

const Analytics = () => {
    const { getShowId } = useParams(); // showId: /c8734c80-16e6-46d1-90f4-c103de4b8b92
    const windowWidth = useWindowResize();
    const { tokenConfig } = useStateStore.getState();
    const [tabs, setTabs] = useState({
        sidebar: false,
        scoring: true, 
        table: false,
        chat: false,
        analytics: false
    });
    const [selectedAnalyticsShow, setSelectedAnalyticsShow] = useState({});
    const [allAnalyticsShows, setAllAnalyticsShows] = useState([]);
    const [modals, setModals] = useState({
        moneylineModal: false,
        expiredTokenModal: false
    });
    useEffect(() => {
        const fetchAllFights = async () => {
            const url = process.env.REACT_APP_ANALYTICS;
            return await axios.get(url, tokenConfig)
                .then( res => {
                    console.log('res: ', res)
                    if(res.data.includes('Token expired')){
                        return setModals({ ...modals, expiredTokenModal: true })
                    }
                    setSelectedAnalyticsShow(res.data[0])
                    setAllAnalyticsShows(res.data);
                }
            ).catch( err => console.log(err));
        }
        fetchAllFights();
    },[]);

    return(
        <Flex 
            id="analytics"
            w="100%" 
            flexDirection="column" 
            color="white" 
            alignItems="center" 
            justifyContent="center" 
            margin="auto" 
            p="4"
            minH="80vh"
            mb="4"
        >         
            <ExpiredTokenModal 
                modals={modals}
            />
             <MoneylineModal
                modals={modals}
                setModals={setModals} 
            />
             <Flex 
                display={windowWidth < 768 ? tabs.table ? 'none' : 'flex' : 'flex'} 
                mb="3rem"
                w="100%" 
                minH="60vh"  
                maxH="60vh"
            >
                <AnalyticsSidebar 
                    allAnalyticsShows={allAnalyticsShows}
                    selectedAnalyticsShow={selectedAnalyticsShow}
                    setSelectedAnalyticsShow={setSelectedAnalyticsShow}
                />
                <AnalyticsMain 
                    selectedAnalyticsShow={selectedAnalyticsShow}
                />
            </Flex>
            <AnalyticsTable 
                tabs={tabs} 
            />
        </Flex>
    )
}
export default Analytics
