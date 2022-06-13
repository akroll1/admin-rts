import React from 'react'
import { Flex, useColorModeValue as mode } from '@chakra-ui/react'
import { PredictionsReviews, ShowsCreateGroupScorecard, ShowsMetadata, FightStoryline } from '../shows-components'
import { ShowCard } from '../tables'
import { DividerWithText } from '../../chakra'

export const ShowsMain = ({
    fighters,
    selectedShowFight, 
    predictionsAndReviews,
    userReview, 
    showReviewForm, 
    setShowReviewForm, 
    selectedShow, 
    reviewType,
    handleEmailSubmit, 
    deleteMember,
    members,
    emailValue,
    handleFormChange,
    handleScorecardSubmit,
}) => {
    const { showTime } = selectedShow;
    const UPCOMING = showTime > Date.now() ? true : false; 
    // console.log('selectedShowFight: ', selectedShowFight);
    return (
        <Flex 
            as="section"
            id="shows_main"
            p="4"
            maxW={["100%", "90%", "80%"]} 
            flex="1 0 65%" 
            bg={mode('gray.900', 'white.500')} 
            flexDirection="column" 
            justifyContent="center"
            alignItems="center"
            boxSizing="border-box" 
        >
            <ShowsMetadata
                selectedShow={selectedShow}
                selectedShowFight={selectedShowFight}
            /> 
            
             <ShowCard fighters={fighters} />
            
            <FightStoryline selectedShowFight={selectedShowFight} /> 

           

            <DividerWithText text={UPCOMING ? 'Predictions' : 'Reviews'} />
            <PredictionsReviews 
                reviewType={reviewType}
                predictionsAndReviews={predictionsAndReviews}
                userReview={userReview} 
                showReviewForm={showReviewForm} 
                setShowReviewForm={setShowReviewForm} 
            />
            { UPCOMING && 
                <ShowsCreateGroupScorecard 
                    deleteMember={deleteMember} 
                    emailValue={emailValue} 
                    handleEmailSubmit={handleEmailSubmit} 
                    handleFormChange={handleFormChange} 
                    handleScorecardSubmit={handleScorecardSubmit} 
                    members={members} 
                />
            } 
        </Flex>    
    )
}