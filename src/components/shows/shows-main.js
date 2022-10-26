import { useEffect, useState } from 'react'
import { Flex, Heading, useColorModeValue as mode } from '@chakra-ui/react'
import { 
    FightMetadata, 
    FightReviews, 
    FightStoryline, 
    ShowsCreateGroupScorecard,
    ShowsParticulars,
} from '../shows-components'
import { ShowsFighterFaceoff } from './shows-fighter-faceoff'
import { DividerWithText } from '../../chakra'
import { useScorecardStore } from '../../stores'
import { SeasonsDropdown } from './shows-els'

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
    const {
        fightSummary,
    } = useScorecardStore()
    const [time, setTime] = useState(0)
    const showTime = fightSummary?.show?.showTime ? fightSummary?.show?.showTime : 0;
    
    useEffect(() => {
        if(fightSummary?.show?.showTime){
            setTime(fightSummary.show.showTime)
        }
    },[fightSummary?.show?.showTime])

    const UPCOMING = time > Date.now() ? true : false; 
    
    return (
        <Flex 
            as="section"
            id="shows_main"
            px={["4", "8"]}
            pb="1"
            flex="1 0 65%" 
            bg="inherit"
            flexDirection="column" 
            justifyContent="center"
            alignItems="center"
            boxSizing="border-box" 
        >
            <SeasonsDropdown />
            
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
                mb="0"
                p="0" 
            />

            <FightStoryline 
                fightSummary={fightSummary} 
            /> 
           
            <DividerWithText 
                fontSize="2xl" 
                text="Particulars" 
                mb="0"
                p="0" 
            />

            <ShowsParticulars />

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
    )
}