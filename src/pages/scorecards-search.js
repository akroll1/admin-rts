import React, { useEffect, useState } from 'react'
import { Flex, Heading } from '@chakra-ui/react'
import { useParams } from 'react-router'
import { useStateStore } from '../stores'
import axios from 'axios'
import { ScorecardsPageScoringTable } from '../components/tables'
import { ScorecardsSearchBar } from '../components/search'
import { ExpiredTokenModal } from '../components/modals'
import { capFirstLetters } from '../utils'
import { ScorecardsSearchTable } from '../components/tables/scorecards-search-table'
import { useScorecardStore, useScoringStore } from '../stores'
import { ScoringTable } from '../components/tables'

export const ScorecardsSearch = () => {
    const { tokenConfig } = useStateStore.getState();
    const { initialScorecardId, userId } = useParams();
    const [scorecardId, setScorecardId] = useState(initialScorecardId)
    const [search, setSearch] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [searchedUsername, setSearchedUsername] = useState('')
    const [searchedUserScorecards, setSearchedUserScorecards] = useState([]);
    const [tableData, setTableData] = useState([]);
    const [prediction, setPrediction] = useState('');
    const [modals, setModals] = useState({
        expiredTokenModal: false
    });
    const {
        collateTableData
    } = useScoringStore();
    
    const {
        userScorecard,
        userScorecards,
    } = useScorecardStore();

    useEffect(() => {
        if(userScorecard){
            collateTableData(userScorecard);
        }
    },[userScorecard]);

    const getScorecardData = scorecard => {
        const [fighter1, fighter2] = scorecard.fighterData;
        let officialResult;
        if(scorecard.fight.fightStatus === 'CANCELED'){
            officialResult = scorecard.fight.fightStatus
        } else {
            officialResult = scorecard.fight.officialResult.slice(0, 36) === fighter1.fighterId 
            ? `${capFirstLetters(fighter1.lastName)} ${scorecard.fight.officialResult.slice(37)}`
            : `${capFirstLetters(fighter2.lastName)} ${scorecard.fight.officialResult.slice(37)}`
        }
        
        const { finalScore, rounds } = scorecard.scorecard;
        
        const username = scorecard.username;
        return ({
            fighter1,
            fighter2,
            finalScore,
            officialResult,
            totalRounds: rounds,
            username
        })
    }

    const handleUserSearch = e => {
        const { value } = e.currentTarget;
        setSearch(value);
        const url = process.env.REACT_APP_USERS + `/search/${search}`;
        if(value.length > 3){
            // return axios.get(url, tokenConfig)
            //     .then( res => {
            //         console.log('res.data: ', res.data);
            //         setSearchResults(res.data)
            //     })
            //     .catch( err => console.log(err));
        }
    }

    const handleAutocompleteClick = e => {
        const { id, value } = e.currentTarget;
        const url = process.env.REACT_APP_API + `/scorecards/search/${id}`;
        return axios.get(url, tokenConfig)
            .then( res => {
                setSearchedUsername(value)
                setSearchedUserScorecards(res.data)
                setSearchResults([]);
            }).catch( err => console.log(err));
    };

    const handleScorecardSelect = e => {
        const { id } = e.currentTarget;
        console.log('id: ', id)
        setScorecardId(id);
    }

    const { officialResult, finalScore, totalRounds, username } = userScorecard?.username ? getScorecardData(userScorecard) : '';
    
    // console.log('autocomplete: ' , autocomplete)
    console.log('searchedUserScorecards: ', searchedUserScorecards);
    return (
        <Flex 
            p="8" 
            flexDir="column" 
            wordBreak="break-word"
        >
            <ExpiredTokenModal 
                modals={modals} 
                setModals={setModals} 
            />
            <Flex 
                p="4" 
                flexDir="column" 
                alignItems="center"
            >
                <Heading 
                    my="4" 
                    m="2" 
                    as="h1" 
                    size="lg"
                >
                    Search Scorecards
                </Heading>
                <ScorecardsSearchBar
                    handleAutocompleteClick={handleAutocompleteClick}
                    handleUserSearch={handleUserSearch}    
                    search={search}
                    searchResults={searchResults} 
                />
            </Flex>
            <Heading my="1" as="h2" size="md">Username: {username}</Heading>
            <Heading my="1" as="h3" size="md">Prediction: {prediction ? prediction : `No Prediction`}</Heading>
            <Heading my="1" as="h3" size="md">Official Result: {officialResult}</Heading>
            <Heading my="1" as="h3" size="md">Score: {finalScore ? finalScore : `No Prediction`}</Heading>

            <ScorecardsPageScoringTable 
                tableData={tableData}
                totalRounds={totalRounds}
            />
            { searchedUserScorecards.length > 0 && 
                <ScorecardsSearchTable
                    handleScorecardSelect={handleScorecardSelect}
                    searchedUserScorecards={searchedUserScorecards}
                    searchedUsername={searchedUsername} 
                />
            }
            <ScoringTable tabs={{ table: true }} />
        </Flex>
    )
}