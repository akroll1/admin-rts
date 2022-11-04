import { useEffect, useState } from 'react'
import { 
    Button, 
    Divider,
    Flex,
    Heading,
    Input, 
    Modal, 
    ModalBody, 
    ModalContent, 
    ModalCloseButton, 
    ModalFooter,
    ModalOverlay,
} from '@chakra-ui/react'
import { useScorecardStore } from '../../stores'
import { DividerWithText } from '../../chakra';

export const DisplayNameModal = ({
    displayNameModal,
    handleCreateGroupScorecard,
    setDisplayNameModal,
    username
}) => {
    const {
        selectedFightSummary
    } = useScorecardStore();

    const [scorecardName, setScorecardName] = useState(selectedFightSummary.fight.fightQuickTitle)
    const [name, setName] = useState(username)

    const createScorecard = () => {
        handleCreateGroupScorecard(scorecardName, name)
        closeModal()
    }

    const closeModal = () => {
        setName(username);
        setScorecardName(selectedFightSummary.fight.fightQuickTitle)
        setDisplayNameModal(false)
    }

    return ( 
        <Modal  
            size="md"
            closeOnOverlayClick={false}
            isCentered
            onClose={closeModal}
            isOpen={displayNameModal}
            motionPreset="slideInBottom"
        >
            <ModalOverlay />
            <ModalContent>
                <ModalCloseButton onClick={closeModal} />
                <ModalBody
                    display="flex"
                    flexDir="column"
                    alignItems="center"
                    justifyContent="flex-start"
                    px="4"
                    my="2"
                >
                    <DividerWithText 
                        color="#bababa"
                        text="Group Scorecard Name" 
                    />
                    <Flex
                        p="2"
                        w="100%"
                        display="inline-flex"
                        alignItems="center"
                        justifyContent="space-between"
                    >

                        <Heading
                            pl="6"
                            flex="1 0 45%"
                            asdfminH="2rem"  
                            as="h2"
                            size="md"
                        >
                            {scorecardName}
                        </Heading>
                        <Input 
                            flex="1 0 45%"
                            alignSelf="start"
                            maxW="70%"
                            ml="0"
                            size="sm"
                            mt="0"
                            value={scorecardName}
                            onChange={e => setScorecardName(e.currentTarget.value)}  
                        />
                    </Flex>
                    <DividerWithText
                        color="#bababa"
                        text="Your Display Name" 
                    />
                    <Flex
                        p="2"
                        w="100%"
                        display="inline-flex"
                        alignItems="center"
                        justifyContent="space-between"
                        mb="4"
                    >
                        <Heading
                            pl="6"
                            flex="1 0 45%"
                            asdfminH="2rem"  
                            as="h2"
                            size="md"
                        >
                            {name}
                        </Heading>
                        <Input 
                            flex="1 0 45%"
                            alignSelf="start"
                            maxW="70%"
                            ml="0"
                            size="sm"
                            mt="0"
                            value={name}
                            onChange={e => setName(e.currentTarget.value)}  
                        />
                    </Flex>
                    <Divider />
                    <ModalFooter 
                        w="100%"
                        m="auto"
                        display="flex"
                        justifyContent="center"
                        alignItems="center"
                    >
                        <Button 
                            flex="1 0 40%"
                            mx="1.5"
                            size="md"
                            onClick={createScorecard}
                            loadingText="Submitting" 
                            colorScheme="solid"
                            px="1"
                        >
                            Create Scorecard
                        </Button>
                        <Button 
                            flex="1 0 40%"
                            mx="1.5"
                            px="1"
                            size="md"
                            onClick={closeModal}
                            loadingText="Submitting" 
                            colorScheme="solid"
                            variant="outline"
                        >
                            Cancel
                        </Button>
                    </ModalFooter>
                </ModalBody>
            </ModalContent>
        </Modal>
    )



}