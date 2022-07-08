import React, { useState, useEffect } from 'react';
import { Button, ButtonGroup, Input, InputGroup, InputRightElement, Modal, ModalBody, ModalContent, ModalCloseButton, ModalFooter, ModalHeader, ModalOverlay } from '@chakra-ui/react'
import { AddIcon, DeleteIcon } from '@chakra-ui/icons'
import { capFirstLetters } from '../../utils'
import stateStore from '../../state-store'
import { DividerWithText } from '../../chakra';

const CustomOverlay = () => (
    <ModalOverlay
        bg='none'
        backdropFilter='auto'
        backdropInvert='60%'
        backdropBlur='2px'
    />
)

export const AddGuestJudgeModal = ({ fetchGuestJudgeScorecards, openAddGuestJudgeModal, setOpenAddGuestJudgeModal }) => {
    const { addGuestJudge, availableGuestJudges, myGuestJudges, removeGuestJudge } = stateStore.getState();
    const [myJudges, setMyJudges] = useState(myGuestJudges);
    const [allJudges, setAllJudges] = useState([]);
    const [overlay, setOverlay] = React.useState(<CustomOverlay />)
    useEffect(() => {

            setAllJudges(availableGuestJudges)
    },[setOpenAddGuestJudgeModal])
    const closeModal = () => {
        setOpenAddGuestJudgeModal(false);
    }
    const localAddGuestJudge = e => {
        const { id } = e.currentTarget;
        const isCurrentJudge = myJudges.some( ({ guestJudgeId }) => guestJudgeId === id);
        if(isCurrentJudge) return;

        const [judge] = availableGuestJudges.filter( judge => judge.guestJudgeId === id);
        // remove from allJudges.
        const newAllJudges = allJudges.filter( judge => judge.guestJudgeId !== id);
        addGuestJudge(judge);
        setMyJudges(prev => [...prev, judge]);
        setAllJudges(newAllJudges);
    }
    const localRemoveGuestJudge = e => {
        const { id } = e.currentTarget;
        const updated = myJudges.filter( judge => judge.guestJudgeId !== id);
        const [putBack] = myJudges.filter( judge => judge.guestJudgeId == id);
        removeGuestJudge(id);
        setMyJudges(updated);
        setAllJudges(prev => [...prev, putBack]);
    }
    const fetchJudges = () => {
        if(myJudges.length > 0){
            fetchGuestJudgeScorecards();
        } 
        closeModal();
    }
    return ( 
        <Modal
            isCentered
            onClose={closeModal}
            isOpen={openAddGuestJudgeModal}
            motionPreset="slideInBottom"
        >
            <ModalOverlay />
            <ModalContent p="0.5rem">
                <ModalHeader fontSize="sm">Available Guest Judges</ModalHeader>
                <ModalCloseButton onClick={closeModal} />
                <ModalBody m="auto" w="100%"> 
                    { allJudges.map( judge => {
                        return (
                            <InputGroup 
                                size="sm"
                                m="2" 
                                id={judge.guestJudgeId} 
                                onClick={localAddGuestJudge}
                            >
                                <Input 
                                    p="2" 
                                    readOnly 
                                    _hover={{ background: '#3b4962', cursor: 'pointer' }} 
                                    value={`${capFirstLetters(judge.firstName)} ${capFirstLetters(judge.lastName)}`} 
                                    key={judge.guestJudgeId} 
                                />
                                <InputRightElement children={ <AddIcon /> } />

                            </InputGroup>
                        )
                    })}
                    <DividerWithText text="My Judges" />
                    { myJudges?.map( judge => {
                        const isCurrentJudge = availableGuestJudges.includes(judge);
                        return (
                            <InputGroup 
                                size="sm"
                                m="2" 
                                id={judge.guestJudgeId} 
                                onClick={localRemoveGuestJudge}
                            >
                                <Input 

                                    p="2" 
                                    readOnly 
                                    _hover={{ background: '#3b4962', cursor: 'pointer' }} 
                                    value={`${capFirstLetters(judge.firstName)} ${capFirstLetters(judge.lastName)}`} 
                                    key={judge.guestJudgeId} 
                                />
                                <InputRightElement children={ <DeleteIcon /> } />
                            </InputGroup>
                        )
                    })}
                </ModalBody>
                <ModalFooter 
                    display="flex" 
                    flexDirection="row" 
                    alignItems="center" 
                    justifyContent="center"
                >
                <ButtonGroup m="auto" spacing="4">
                    <Button 
                        onClick={fetchJudges}
                        loadingText="Submitting"  
                        colorScheme="blue"
                    >
                        Add Guest Judges
                    </Button>
                    <Button variant="outline" onClick={closeModal}>
                        Cancel
                    </Button>
                </ButtonGroup>
                </ModalFooter>
            </ModalContent>
        </Modal>
    )



}