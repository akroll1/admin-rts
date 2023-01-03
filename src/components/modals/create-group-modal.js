import { useEffect, useState } from 'react'
import { 
    Button, 
    Flex,
    FormControl,
    FormErrorMessage,
    Heading,
    Input, 
    Modal, 
    ModalBody, 
    ModalContent, 
    ModalCloseButton, 
    ModalFooter,
    ModalOverlay,
    Radio, 
    RadioGroup,
    Text,
    Textarea,
} from '@chakra-ui/react'
import { ModalsEnum, useGlobalStore } from '../../stores'
import { CreateGroupDividerWithText } from '../../chakra';

export const CreateGroupModal = ({
    handleCreateSeasonScorecard,
}) => {
    
    const {
        modals,
        selectedFightSummary,
        selectedSeason,
        setModals,
        user,
    } = useGlobalStore();

    const [form, setForm] = useState({
        groupScorecardNotes: '',
        groupScorecardName: '',
        displayName: ''
    })
    const [value, setValue] = useState('1')

    useEffect(() => {
        setForm({ ...form, groupScorecardName: value === '1' 
            ? selectedFightSummary?.fight?.fightQuickTitle 
            : selectedSeason?.seasonName 
        })
    },[value])

    useEffect(() => {
        if(selectedSeason?.seasonId){
            setForm({ 
                ...form, 
                groupScorecardName: selectedFightSummary?.fight.fightQuickTitle,
                displayName: user?.username
            })
        }
    },[selectedSeason])

    const handleFormChange = e => {
        const { id, value } = e.currentTarget;
        if(id === 'groupScorecardNotes'){
            if(value.length > 200){
                return
            }
            return setForm({ ...form, [id]: value })
        }
        if(value.length > 30) return
        setForm({ ...form, [id]: value })
    }

    const createScorecard = () => {
        Object.assign(form, {
            groupScorecardType: value === '1' ? 'FIGHT' : 'SEASON',
            targetId: value === '1' ? selectedFightSummary.fight.fightId : selectedSeason.seasonId,
        })
        handleCreateSeasonScorecard(form)
        closeModal()
    }

    const closeModal = () => {
        setForm({ 
            groupScorecardName: selectedSeason.seasonName, 
            displayName: user?.username,
            groupScorecardNotes: '',
        })
        setValue('1')
        setModals(ModalsEnum.CREATE_GROUP_MODAL, false)
    }

    const { groupScorecardNotes, groupScorecardName, displayName } = form
    const groupScorecardNotesError = groupScorecardNotes?.length > 199;
    const groupScorecardNameError = groupScorecardName?.length > 29;
    const displayNameError = displayName?.length > 29;

    return ( 
        <Modal  
            size="lg"
            closeOnOverlayClick={false}
            isCentered
            onClose={closeModal}
            isOpen={modals[ModalsEnum.CREATE_GROUP_MODAL]}
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
                    <Text 
                        as="h2"
                        fontSize="md"
                        mb="-1"
                        color="#CCC"
                    >
                        Score
                    </Text>
                    <Text 
                        as="h2"
                        fontSize="lg"
                        color="white"
                    >
                        {selectedFightSummary?.fight?.fightQuickTitle}
                    </Text>
                    <CreateGroupDividerWithText 
                        color="#bababa"
                        text="Play a Season" 
                    />


                    <Flex
                        p="1"
                        w="100%"
                        display="inline-flex"
                        alignItems="center"
                    >
                        <Heading
                            wordBreak="break-all"
                            pl="6"
                            flex="1 0 45%"
                            as="h2"
                            size="md"
                        >
                            {value === '1' ? 'Fight' : 'Season'}
                        </Heading>
                        <Flex
                            flex="1 0 45%"
                        >

                            <RadioGroup 
                                onChange={setValue} 
                                value={value}
                            >
                                <Radio  
                                    mr="2"
                                    value={'1'}
                                >
                                    Fight
                                </Radio>
                                <Radio 
                                    value={'2'}
                                >
                                    Season
                                </Radio>
                            </RadioGroup>
                        </Flex>
                    </Flex>
                    <CreateGroupDividerWithText 
                        color="#bababa"
                        text="Group Name" 
                    />
                    <Flex
                        p="1"
                        w="100%"
                        display="inline-flex"
                        alignItems="center"
                    >

                        <Heading
                            pl="6"
                            flex="1 0 45%"
                            as="h2"
                            size="md"
                            wordBreak="break-all"
                        >
                            {groupScorecardName}
                        </Heading>
                        <FormControl isInvalid={groupScorecardNameError}>
                            <Input 
                                placeholder={value === '1' ? selectedFightSummary?.fight?.fightQuickTitle : selectedSeason?.seasonName}
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
                    <CreateGroupDividerWithText 
                        color="#bababa"
                        text="Your Name" 
                    />
                    <Flex
                        p="1"
                        w="100%"
                        display="inline-flex"
                        alignItems="center"
                    >
                        <Heading
                            wordBreak="break-all"
                            pl="6"
                            flex="1 0 45%"
                            as="h2"
                            size="md"
                        >
                            {displayName}
                        </Heading>
                        <FormControl isInvalid={displayNameError}>
                            <Input 
                                placeholder={user?.username}
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
                    <CreateGroupDividerWithText
                        color="#bababa"
                        text="Notes" 
                    />
                    <Flex
                        maxW={["90%", "80%"]}
                        p="1"
                        w="100%"
                        display="inline-flex"
                        alignItems="center"
                        justifyContent="space-between"
                        mb="4"
                    >
                        <FormControl isInvalid={groupScorecardNotesError}>
                            <Textarea 
                                id="groupScorecardNotes"
                                alignSelf="start"
                                ml="0"
                                size="sm"
                                mt="0"
                                value={groupScorecardNotes}
                                onChange={handleFormChange}  
                            />
                            <FormErrorMessage>Too Long!</FormErrorMessage>
                        </FormControl>
                    </Flex>
                    
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