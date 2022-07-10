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
    const { setMyGuestJudges, availableGuestJudges, myGuestJudges } = stateStore.getState();
    const [myJudges, setMyJudges] = useState([]);
    const [overlay, setOverlay] = React.useState(<CustomOverlay />)
    
    useEffect(() => {
        if(openAddGuestJudgeModal){
            const currentJudges = availableGuestJudges.filter( judge => myGuestJudges.includes(judge.guestJudgeId))
            setMyJudges(currentJudges);
        }
    },[openAddGuestJudgeModal])

    const closeModal = () => {
        setMyJudges([]);
        setOpenAddGuestJudgeModal(false);
    }
    const localAddGuestJudge = e => {
        const { id } = e.currentTarget;
        const judgeToAdd = availableGuestJudges.filter( judge => judge.guestJudgeId === id);
        const check = myJudges.filter( judge => judge.guestJudgeId === id);
        if(check.length === 0){
            setMyJudges(prev => [...prev, ...judgeToAdd]);
        }
    }
    const localRemoveGuestJudge = e => {
        const { id } = e.currentTarget;
        const filtered = myJudges.filter( judge => judge.guestJudgeId !== id);
        setMyJudges(filtered);
        setMyGuestJudges(filtered);
    }
    
    const setJudges = () => {
        const judges = myJudges.map( judge => judge.guestJudgeId);
        setMyGuestJudges(judges)
        fetchGuestJudgeScorecards(judges);
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
                    { availableGuestJudges?.length > 0 && availableGuestJudges.map( judge => {
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
                    { myJudges.length > 0 && myJudges.map( judge => {
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
                        onClick={setJudges}
                        loadingText="Submitting"  
                        colorScheme="blue"
                    >
                        Set Judges
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