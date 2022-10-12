import React, {useState, useEffect} from 'react'
import { Navigate, useLocation, useNavigate } from 'react-router-dom'
import { Box, Flex, Heading } from '@chakra-ui/react'
import axios from 'axios'
import { useParams } from 'react-router'
import { FightersSidebar } from '../components/sidebars'
import { FightersPageFighterProfile } from '../components/sidebars'
import { FightersPageFightersForm } from '../components/fighters-page'
import { useStateStore } from '../stores'

const Fighters = () => {
    const location = useLocation();
    const { id } = useParams();
    const [fighterId, setFighterId] = useState(id);
    const { tokenConfig } = useStateStore.getState();
    const [fighters, setFighters] = useState([]);
    const [ selectedFighter, setSelectedFighter] = useState({});
    
    useEffect(() => {
        const getAllFighters = async () => {
            const url = process.env.REACT_APP_API + `/fighters`;
            return await axios.get(url, tokenConfig)
                .then(res => {
                    setFighters(res.data)
                    setSelectedFighter(res.data[0])
                })
                .catch(err => console.log(err));
        }
        getAllFighters()
    },[]);

    useEffect(() => {  
        if(fighterId){
            const getFighter = async () => {
                const url = process.env.REACT_APP_API + `/fighters/${fighterId}`;
                return await axios.get(url, tokenConfig)
                .then( res => setSelectedFighter(res.data))
                .catch( err => console.log(err))
            }
            getFighter();
        }
    },[fighterId])
    
    const handleSidebarFighterSelect = e => {
        const { id } = e.currentTarget;
        setFighterId(id)
    }

    return (
        <Flex flexWrap="wrap" width="100%" direction="row" color="white" alignItems="flex-start" justifyContent="flex-start" px={6} py={8}>    
            <Flex minHeight="70vh" flex="1 0 25%" mb="1rem">    
                <FightersSidebar 
                    fighters={fighters} 
                    handleSidebarFighterSelect={handleSidebarFighterSelect} 
                />
            </Flex>
            <Flex bg="gray.900" borderRadius="md" overflow='scroll' flex="1 0 70%" height="auto" justifyContent="center" direction="row" color="white" flexWrap="wrap" m={3} p={3} mb="1rem">
                <FightersPageFighterProfile 
                    selectedFighter={selectedFighter} 
                />
                { fighterId &&
                    <FightersPageFightersForm 
                        selectedFighter={selectedFighter}
                    />
                }
            </Flex>
        </Flex>
    )
}
export default Fighters