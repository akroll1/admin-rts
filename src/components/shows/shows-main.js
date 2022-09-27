import React from 'react'
import { Flex, useColorModeValue as mode } from '@chakra-ui/react'
import { PredictionsReviews, ShowsCreateGroupScorecard, FightMetadata, FightStoryline } from '../shows-components'
import { ShowsFighterFaceoff } from './shows-fighter-faceoff'
import { DividerWithText } from '../../chakra'
import { useFightStore } from '../../stores'

export const ShowsMain = ({
    deleteMember,
    emailValue,
    handleCreateGroupScorecard,
    handleEmailSubmit, 
    handleFormChange,
    isSubmitting,
    members,
    predictionsAndReviews,
    reviewType,
    setFightReviewForm, 
    fightReviewForm, 
}) => {
    const { fightSummary } = useFightStore();
    const { show: { showTime }} = fightSummary;
    const UPCOMING = showTime > Date.now() ? true : false; 
    return (
        <Flex 
            as="section"
            id="shows_main"
            p="4"
            pb="1"
            flex="1 0 65%" 
            bg={mode('gray.900', 'white.500')} 
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
            <DividerWithText text="The Storyline" />
            <FightStoryline fightSummary={fightSummary} /> 

            <DividerWithText text={UPCOMING ? 'Predictions' : 'Reviews'} />
            <PredictionsReviews 
                reviewType={reviewType}
                predictionsAndReviews={predictionsAndReviews}
                fightReviewForm={fightReviewForm} 
                setFightReviewForm={setFightReviewForm} 
            />
            { UPCOMING && 
                <ShowsCreateGroupScorecard 
                    deleteMember={deleteMember} 
                    emailValue={emailValue} 
                    handleEmailSubmit={handleEmailSubmit} 
                    handleFormChange={handleFormChange} 
                    handleCreateGroupScorecard={handleCreateGroupScorecard} 
                    isSubmitting={isSubmitting}
                    members={members} 
                />
            } 
        </Flex>    
    )
}