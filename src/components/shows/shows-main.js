import { useEffect, useState } from 'react'
import { Flex } from '@chakra-ui/react'
import { 
    FightMetadata, 
    FightReviews, 
    FightStoryline, 
    ShowsCreateGroupScorecard,
    ShowsParticulars,
} from '../shows-components'
import { ShowsFighterFaceoff } from './shows-fighter-faceoff'
import { ShowsCountdownTimer } from '../timers'
import { DividerWithText } from '../../chakra'
import { useScorecardStore } from '../../stores'
import { ShowsArrows } from './shows-arrows'

export const ShowsMain = ({
    deleteMember,
    emailValue,
    fightReviewForm, 
    handleCreateGroupScorecard,
    handleEmailSubmit, 
    handleFormChange,
    isSubmitting,
    members,
    setFightReviewForm, 
}) => {
    const {
        selectedFightSummary,
    } = useScorecardStore()
    const [time, setTime] = useState(0)

    const showTime = selectedFightSummary?.show?.showTime ? selectedFightSummary?.show?.showTime : 0;
    
    useEffect(() => {
        if(selectedFightSummary?.show?.showTime){
            setTime(selectedFightSummary.show.showTime)
        }
    },[selectedFightSummary?.show?.showTime])
    
    const UPCOMING = time > Date.now() ? true : false; 
    
    return (
        <Flex 
            as="section"
            id="shows_main"
            flex="1 0 65%" 
            bg="inherit"
            flexDirection="column" 
            justifyContent="center"
            alignItems="center"
            boxSizing="border-box" 
            position="relative"
            w="100%"
        >
            <ShowsArrows />

            <FightMetadata
                selectedFightSummary={selectedFightSummary}
            /> 

            <ShowsFighterFaceoff 
                fighters={selectedFightSummary.fighters} 
                showTime={showTime}
            />

            { showTime > Date.now() && 
                <ShowsCountdownTimer showTime={showTime} /> 
            }

            <Flex
                flexDir="column"
                p="4"
                w="100%"
            >
                <DividerWithText 
                    fontSize="2xl" 
                    text="Storyline" 
                    mb="0"
                    p="0" 
                />
                <FightStoryline 
                    selectedFightSummary={selectedFightSummary} 
                /> 
            
                <DividerWithText 
                    fontSize="2xl" 
                    text="Particulars" 
                    mb="0"
                    p="0" 
                />

                <ShowsParticulars 
                    selectedFightSummary={selectedFightSummary}
                />

                {/* <Props /> */}
                
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
        </Flex>    
    )
}