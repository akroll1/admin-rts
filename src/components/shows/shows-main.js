import React from 'react'
import { Flex, useColorModeValue as mode } from '@chakra-ui/react'
import { PredictionsReviews, ShowsCreateGroupScorecard, ShowsMetadata, FightStoryline } from '../shows-components'
import { ShowsFighterFaceoff } from './shows-fighter-faceoff'
import { DividerWithText } from '../../chakra'

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
    selectedShow, 
    setShowReviewForm, 
    showReviewForm, 
}) => {
    const { show: { showTime }} = selectedShow;
    const UPCOMING = showTime > Date.now() ? true : false; 
    // console.log('selectedShowFight: ', selectedShowFight);
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
            <ShowsMetadata
                showTime={showTime}
                selectedShow={selectedShow}
            /> 
            
            <ShowsFighterFaceoff 
                fighters={selectedShow.fighters} 
                showTime={showTime}
            />
            <DividerWithText text="The Storyline" />
            <FightStoryline selectedShow={selectedShow} /> 

            <DividerWithText text={UPCOMING ? 'Predictions' : 'Reviews'} />
            <PredictionsReviews 
                reviewType={reviewType}
                predictionsAndReviews={predictionsAndReviews}
                showReviewForm={showReviewForm} 
                setShowReviewForm={setShowReviewForm} 
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