import React from 'react'
import { Flex, useColorModeValue as mode } from '@chakra-ui/react'
import { PredictionsReviews, ShowsCreateGroupScorecard, ShowsMetadata, FightStoryline } from '../shows-components'
import { ShowCard } from '../tables'
import { DividerWithText } from '../../chakra'

export const ShowsMain = ({
    fighters,
    accessTokenConfig,
    userReview, 
    predictionsAndReviews,
    showTheReviewForm, 
    setShowTheReviewForm, 
    selectedShow, 
    selectedShowFight, 
    handleEmailSubmit, 
    emailValue,
    reviewType,
    members,
    deleteMember,
    handleFormChange,
    handleScorecardSubmit
}) => {
    const { showTime } = selectedShow;
    console.log('selectedShowFight: ', selectedShowFight);
    const displayTime = showTime > Date.now();
    const { fighterIds, fightQuickTitle, fightStoryline, odds } = selectedShowFight;
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
                displayTime={displayTime}
                selectedShow={selectedShow}
                selectedShowFight={selectedShowFight}
            /> 
            
             <ShowCard 
                fighters={fighters}
            />
            
            <FightStoryline 
                showTime={showTime} 
                displayTime={displayTime} 
                fightStoryline={fightStoryline} 
                odds={odds}
            /> 

            <DividerWithText text={reviewType === 'REVIEW' ? 'Reviews' : 'Predictions'} />
            <PredictionsReviews 
                reviewType={reviewType}
                predictionsAndReviews={predictionsAndReviews}
                userReview={userReview} 
                showTheReviewForm={showTheReviewForm} 
                setShowTheReviewForm={setShowTheReviewForm} 
            />
            { displayTime && 
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