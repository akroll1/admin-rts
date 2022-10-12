import React from 'react'
import { Flex, useColorModeValue as mode } from '@chakra-ui/react'
import { FightReviews, ShowsCreateGroupScorecard, FightMetadata, FightStoryline } from '../shows-components'
import { ShowsFighterFaceoff } from './shows-fighter-faceoff'
import { DividerWithText } from '../../chakra'
import { useScorecardStore } from '../../stores'


export const ShowsMain = ({
    deleteMember,
    emailValue,
    handleCreateGroupScorecard,
    handleEmailSubmit, 
    handleFormChange,
    isSubmitting,
    members,
    setFightReviewForm, 
    fightReviewForm, 
}) => {
    const { fightSummary } = useScorecardStore();
    const showTime = fightSummary?.show?.showTime ? fightSummary?.show?.showTime : 0;
    const UPCOMING = showTime > Date.now() ? true : false; 
    
    return (
        <Flex 
            as="section"
            id="shows_main"
            p="4"
            pb="1"
            flex="1 0 65%" 
            bg="inherit"
            flexDirection="column" 
            justifyContent="center"
            alignItems="center"
            boxSizing="border-box" 
        >
            <FightMetadata
                fightSummary={fightSummary}
            /> 
            
            <ShowsFighterFaceoff 
                fighters={fightSummary.fighters} 
                showTime={showTime}
            />
            <DividerWithText 
                fontSize="2xl" 
                text="Storyline" 
                mt="2"
                mb="0"
            />
            <FightStoryline fightSummary={fightSummary} /> 
            
            { UPCOMING 
                ?
                    <ShowsCreateGroupScorecard 
                        deleteMember={deleteMember} 
                        emailValue={emailValue} 
                        handleEmailSubmit={handleEmailSubmit} 
                        handleFormChange={handleFormChange} 
                        handleCreateGroupScorecard={handleCreateGroupScorecard} 
                        isSubmitting={isSubmitting}
                        members={members} 
                    />
                :
                    <>
                        <DividerWithText 
                            text={`Reviews`} 
                            fontSize={"2xl"}
                            mb="2"
                            mt="4"

                        />
                        <FightReviews 
                            fightReviewForm={fightReviewForm} 
                            setFightReviewForm={setFightReviewForm} 
                        />
                    </>
            } 
        </Flex>    
    )
}