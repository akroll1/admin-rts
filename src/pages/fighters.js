import React, {useState, useEffect} from 'react'
import { useNavigate } from 'react-router-dom'
import { Box, Flex, Heading } from '@chakra-ui/react'
import jwt_decode from 'jwt-decode'
import axios from 'axios'
import { useParams } from 'react-router'
import { FightersPageFightersTable } from '../components/tables'
import { FighterStats } from '../components/fighter-stats'
import { FightersSidebar } from '../components/sidebars'
import { FightersPageFighterProfile } from '../components/sidebars'

const Fighters = () => {
    const navigate = useNavigate();
    const username = sessionStorage.getItem('username');
    const localStorageString = 'CognitoIdentityServiceProvider.'+ process.env.REACT_APP_USER_POOL_WEB_CLIENT_ID + '.' + username;
    let accessToken, idToken, decodedIdToken, sub, idTokenConfig, accessTokenConfig, tokenIsGood;
    if(username && localStorageString){
        accessToken = localStorage.getItem(localStorageString + '.accessToken');
        idToken = localStorage.getItem(localStorageString + '.idToken');
        // decodedAccessToken = jwt_decode(accessToken);
        decodedIdToken = jwt_decode(idToken);
        sub = decodedIdToken.sub;
        idTokenConfig = {
            headers: { Authorization: `Bearer ${idToken}` }
        };        
        accessTokenConfig = {
            headers: { Authorization: `Bearer ${accessToken}` }
        }
        tokenIsGood = Date.now() < (decodedIdToken.exp * 1000) ? true : false;

    } else { 
        navigate('/signin', {page: '/scoring'});
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