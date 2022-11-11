import { Flex, Heading } from '@chakra-ui/react'
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
import { OfficialResultBanner } from '../shows-components'

export const ShowsMain = ({
    deleteMember,
    emailValue,
    fightReviewForm, 
    handleEmailSubmit, 
    handleFormChange,
    isSubmitting,
    invites,
    setDisplayNameModal,
    setFightReviewForm, 
    username
}) => {
    const {
        selectedSeasonFightSummary,
        selectedSeasonSummary,
    } = useScorecardStore()

    const showTime = selectedSeasonFightSummary?.show?.showTime ? selectedSeasonFightSummary.show.showTime : Date.now();
    
    const UPCOMING = showTime > Date.now() ? true : false; 
    
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
            minH="50vh"
        >
            <Heading
                position="absolute"
                top="0"
                left="0"
                as="h2"
                size={["md", "lg"]}
                p="2"
                color="#bababa"
            >
                { selectedSeasonSummary?.season?.seasonName ? selectedSeasonSummary.season.seasonName : `` }
            </Heading>

            <ShowsArrows />

            <FightMetadata
                selectedSeasonFightSummary={selectedSeasonFightSummary}
            /> 

            <ShowsFighterFaceoff 
                fighters={selectedSeasonFightSummary?.fighters} 
                showTime={showTime}
            />

            { showTime > Date.now() && 
                <ShowsCountdownTimer showTime={showTime} /> 
            }
            { Date.now() > showTime && 
                <OfficialResultBanner /> 
            }

            <Flex
                flexDir="column"
                p="4"
                w="100%"
                minH="10rem"
            >
                <DividerWithText 
                    fontSize="2xl" 
                    text="Storyline" 
                    mb="0"
                    p="0" 
                />
                <FightStoryline 
                    selectedSeasonFightSummary={selectedSeasonFightSummary} 
                /> 
            
                <DividerWithText 
                    fontSize="2xl" 
                    text="Particulars" 
                    mb="0"
                    p="0" 
                />

                <ShowsParticulars 
                    selectedSeasonFightSummary={selectedSeasonFightSummary}
                />
                {/* <Props /> */}
                
                { UPCOMING 
                    ?
                        <ShowsCreateGroupScorecard 
                            deleteMember={deleteMember} 
                            emailValue={emailValue} 
                            handleEmailSubmit={handleEmailSubmit} 
                            handleFormChange={handleFormChange} 
                            isSubmitting={isSubmitting}
                            invites={invites} 
                            setDisplayNameModal={setDisplayNameModal}
                            username={username}
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