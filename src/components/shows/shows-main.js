import React from 'react'
import { Flex, useColorModeValue as mode } from '@chakra-ui/react'
import { PredictionsReviews, ShowsCreateGroupScorecard, FightMetadata, FightStoryline } from '../shows-components'
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
    selectedFightSummary, 
    setFightReviewForm, 
    fightReviewForm, 
}) => {
    const { showTime } = selectedFightSummary?.show?.showTime ? selectedFightSummary.show : 1656208800000;
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
                showTime={showTime}
                selectedFightSummary={selectedFightSummary}
            /> 
            
            <ShowsFighterFaceoff 
                fighters={selectedFightSummary.fighters} 
                showTime={showTime}
            />
            <DividerWithText text="The Storyline" />
            <FightStoryline selectedFightSummary={selectedFightSummary} /> 

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