import { useEffect, useState } from 'react'
import { 
    Button, 
    Divider,
    Flex,
    FormErrorMessage,
    Heading,
    Input, 
    Modal, 
    ModalBody, 
    ModalContent, 
    ModalCloseButton, 
    ModalFooter,
    ModalOverlay,
    FormControl,
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

    const [form, setForm] = useState({
       groupScorecardName: '',
       displayName: ''
    })

    useEffect(() => {
        if(selectedFightSummary?.fight?.fightQuickTitle){
            setForm({
                groupScorecardName: selectedFightSummary.fight.fightQuickTitle,
                displayName: username
            })
        }
    },[selectedFightSummary])

    const handleFormChange = e => {
        const { id, value } = e.currentTarget;
        if(value.length > 30) return
        setForm({ ...form, [id]: value })
    }

    const createScorecard = () => {
        handleCreateGroupScorecard(form)
        closeModal()
    }

    const closeModal = () => {
        setForm({ groupScorecardName: selectedFightSummary.fight.fightQuickTitle, displayName: username })
        setDisplayNameModal(false)
    }

    const { groupScorecardName, displayName } = form
    const groupScorecardNameError = groupScorecardName?.length > 29;
    const displayNameError = displayName?.length > 29;

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
                            wordBreak="break-all"
                        >
                            {groupScorecardName}
                        </Heading>
                        <FormControl isInvalid={groupScorecardNameError}>
                            <Input 
                                id="groupScorecardName"
                                flex="1 0 45%"
                                alignSelf="start"
                                maxW="70%"
                                ml="0"
                                size="sm"
                                mt="0"
                                value={groupScorecardName}
                                onChange={handleFormChange}  
                            />
                            <FormErrorMessage>Too Long!</FormErrorMessage>
                        </FormControl>
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
                            wordBreak="break-all"
                            pl="6"
                            flex="1 0 45%"
                            asdfminH="2rem"  
                            as="h2"
                            size="md"
                        >
                            {displayName}
                        </Heading>
                        <FormControl isInvalid={displayNameError}>
                            <Input 
                                id="displayName"
                                flex="1 0 45%"
                                alignSelf="start"
                                maxW="70%"
                                ml="0"
                                size="sm"
                                mt="0"
                                value={displayName}
                                onChange={handleFormChange}  
                            />
                            <FormErrorMessage>Too Long!</FormErrorMessage>
                        </FormControl>
                    </Flex>
                    <Divider />
                    <ModalFooter 
                        w="100%"
                        m="auto"
                        display="flex"
                        justifyContent="center"
                        alignItems="center"
                        flexDir="column"
                        p="1"
                    >
                        <Button 
                            minW="40%"
                            m="1"
                            size="md"
                            onClick={createScorecard}
                            loadingText="Submitting" 
                            colorScheme="solid"
                            px="1"
                            >
                            Create Scorecard
                        </Button>
                        <Button 
                            minW="40%"
                            m="1"
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