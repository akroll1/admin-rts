import React, {useState, useEffect} from 'react'
import { Navigate, useLocation, useNavigate } from 'react-router-dom'
import { Box, Flex, Heading } from '@chakra-ui/react'
import axios from 'axios'
import { useParams } from 'react-router'
import { FightersPageFightersTable } from '../components/tables'
import { FighterStats } from '../components/fighter-stats'
import { FightersSidebar } from '../components/sidebars'
import { FightersPageFighterProfile } from '../components/sidebars'
import { stateStore } from '../stores'

const Fighters = () => {
    const location = useLocation();
    const user = stateStore.getState().user;
    const { email, sub, username } = user;
    let accessTokenConfig;
    const accessToken = localStorage.getItem('CognitoIdentityServiceProvider.' + process.env.REACT_APP_USER_POOL_WEB_CLIENT_ID + '.' + username + '.accessToken');
    if(username && accessToken){
        accessTokenConfig = {
            headers: { Authorization: `Bearer ${accessToken}` }
        };        
    } else {
        <Navigate to="/signin" replace state={{ path: location.pathname }} />
    }
    const baseUrl = process.env.REACT_APP_FIGHTERS;
    const { id } = useParams();         
    const [fighters, setFighters] = useState([]);
    const [ selectedFighter, setSelectedFighter] = useState({});
    
    useEffect(() => {
        const getAllFighters = async () => {
            return await axios.get(baseUrl, accessTokenConfig)
                .then(res => {
                    setFighters(res.data)
                    // setSelectedFighter(res.data[0])
                })
                .catch(err => console.log(err));
        }
        const getFighter = async id => {
            const url = baseUrl + `/${id}`;
            return await axios.get(url, accessTokenConfig)
                .then( res => setSelectedFighter(res.data))
                .catch( err => console.log(err))
        }

        if(id){
            const allFighters = getAllFighters();
            const idFighter = getFighter(id);
            setFighters(allFighters);
            setSelectedFighter(idFighter);
        } else {
            const allFighters = getAllFighters();
            setFighters(allFighters);
            setSelectedFighter(allFighters[0]);
        }
    },[id])
    
    const handleFighterSelect = e => {
        const { id } = e.currentTarget;
        const selectedFighter = fighters.filter( fighter => fighter.fighterId === id);
        setSelectedFighter(selectedFighter[0]);
    }

    return (
        <Flex flexWrap="wrap" width="100%" direction="row" color="white" alignItems="flex-start" justifyContent="flex-start" px={6} py={8}>    
            <Flex minHeight="70vh" flex="1 0 25%" mb="1rem">    
                <FightersSidebar fighters={fighters} handleFighterSelect={handleFighterSelect} />
            </Flex>
            <Flex bg="gray.900" borderRadius="md" overflow='scroll' flex="1 0 70%" height="auto" justifyContent="center" direction="row" color="white" flexWrap="wrap" m={3} p={3} mb="1rem">
                <FightersPageFighterProfile handleFighterSelect={handleFighterSelect} selectedFighter={selectedFighter} />
            </Flex>
        </Flex>
    )
}
export default Fighters