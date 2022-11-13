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
    Textarea,
} from '@chakra-ui/react'
import { useScorecardStore } from '../../stores'
import { DividerWithText } from '../../chakra';

export const CreateGroupModal = ({
    displayNameModal,
    handleCreateSeasonScorecard,
    setDisplayNameModal,
    username
}) => {
    const {
        selectedSeasonSummary
    } = useScorecardStore();
    const [form, setForm] = useState({
        groupNotes: '',
        groupScorecardName: '',
        displayName: ''
    })

    useEffect(() => {
        if(selectedSeasonSummary?.season?.seasonName){
            setForm({
                groupNotes: '',
                groupScorecardName: selectedSeasonSummary.season.seasonName,
                displayName: username
            })
        }
    },[selectedSeasonSummary])

    const handleFormChange = e => {
        const { id, value } = e.currentTarget;
        if(id === 'groupNotes'){
            if(value.length > 200){
                return
            }
            return setForm({ ...form, [id]: value })
        }
        if(value.length > 30) return
        setForm({ ...form, [id]: value })
    }

    const createScorecard = () => {
        handleCreateSeasonScorecard(form)
        closeModal()
    }

    const closeModal = () => {
        setForm({ groupScorecardName: selectedSeasonSummary.season.seasonName, displayName: username })
        setDisplayNameModal(false)
    }

    const { groupNotes, groupScorecardName, displayName } = form
    const groupNotesError = groupNotes?.length > 199;
    const groupScorecardNameError = groupScorecardName?.length > 29;
    const displayNameError = displayName?.length > 29;

    return ( 
        <Modal  
            size="lg"
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
                        text="Group Name" 
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
                            minH="2rem"  
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
                        text="Notes" 
                    />
                    <Flex
                        p="2"
                        w="100%"
                        display="inline-flex"
                        alignItems="center"
                        justifyContent="space-between"
                        mb="4"
                    >
                        <FormControl isInvalid={groupNotesError}>
                            <Textarea 
                                id="groupNotes"
                                alignSelf="start"
                                ml="0"
                                size="sm"
                                mt="0"
                                value={groupNotes}
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
                            minH="2rem"  
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
                        flexDir={["column", "column", "row"]}
                        p="1"
                    >
                        <Button 
                            minW="40%"
                            m={["1", "1", "2"]}
                            px="1"
                            size="md"
                            onClick={closeModal}
                            loadingText="Submitting" 
                            colorScheme="solid"
                            variant="outline"
                        >
                            Cancel
                        </Button>
                        <Button 
                            minW="40%"
                            m={["1", "1", "2"]}
                            size="md"
                            onClick={createScorecard}
                            loadingText="Submitting" 
                            colorScheme="solid"
                            px="1"
                        >
                            Create Scorecard
                        </Button>
                    </ModalFooter>
                </ModalBody>
            </ModalContent>
        </Modal>
    )



}