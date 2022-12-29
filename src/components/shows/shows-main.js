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
import { useGlobalStore } from '../../stores'
import { ShowsArrows } from './shows-arrows'
import { OfficialResultBanner } from '../shows-components'

export const ShowsMain = ({
    deleteInvite,
    emailValue,
    fightReviewForm, 
    handleEmailSubmit, 
    handleFormChange,
    isError,
    isAdminError,
    isSubmitting,
    invites,
    resetInput,
    setDisplayNameModal,
    setFightReviewForm, 
    username
}) => {
    const {
        selectedFightSummary,
        selectedSeasonSummary,
    } = useGlobalStore()

    const showTime = selectedFightSummary?.show?.showTime ? selectedFightSummary.show.showTime : Date.now();
    
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
                selectedFightSummary={selectedFightSummary}
            /> 

            <ShowsFighterFaceoff 
                fighters={selectedFightSummary?.fighters} 
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
                            deleteInvite={deleteInvite} 
                            emailValue={emailValue} 
                            handleEmailSubmit={handleEmailSubmit} 
                            handleFormChange={handleFormChange} 
                            isError={isError}
                            isAdminError={isAdminError}
                            isSubmitting={isSubmitting}
                            invites={invites} 
                            resetInput={resetInput}
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