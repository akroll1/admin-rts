import React, { useState } from 'react';
import { Button, ButtonGroup, Input, Modal, ModalBody, ModalContent, ModalCloseButton, ModalFooter, ModalHeader, ModalOverlay } from '@chakra-ui/react'
import { isValidEmail } from '../../utils';
import { CustomOverlay } from '../custom-overlay';

export const AddMemberModal = ({ 
    modals,
    setModals,
    handleAddMemberSubmit, 
    handleOpenAddMemberSubmitModal,
    isSubmitting, 
}) => {
    const [overlay, setOverlay] = useState(<CustomOverlay />)
    const [email, setEmail] = useState('');
    const isInvalid = isValidEmail(email) ? false : true;
    const addMember = () => {
        handleAddMemberSubmit(email);
    }
    const closeModal = () => {
        setEmail('');
        setModals({ ...modals, addMemberModal: false })
    }
    return ( 
        <Modal
            isCentered
            onClose={closeModal}
            isOpen={modals.addMemberModal}
            motionPreset="slideInBottom"
        >
        <ModalOverlay />
        <ModalContent p="0.5rem">
            <ModalHeader fontSize="sm">Add Member to Group</ModalHeader>
            <ModalCloseButton onClick={closeModal} />
            <ModalBody>
                <Input 
                    // isInvalid={ isInvalid ? 'red.300'} 
                    focusBorderColor={isInvalid ? 'red.300' : 'blue.300'}
                    value={email} 
                    onChange={e => setEmail(e.currentTarget.value)} 
                    placeholder="user@email.com" 
                />
            </ModalBody>
            <ModalFooter 
                display="flex" 
                flexDirection="row" 
                alignItems="center" 
                justifyContent="center"
            >
            <ButtonGroup spacing="4">
                <Button 
                    onClick={addMember}
                    isDisabled={isInvalid} 
                    isLoading={isSubmitting} 
                    loadingText="Submitting" 
                    minW="50%" 
                    colorScheme="solid"
                >
                    Add Member
                </Button>
                <Button minW="50%" variant="outline" onClick={closeModal}>
                    Cancel
                </Button>
            </ButtonGroup>
            </ModalFooter>
        </ModalContent>
        </Modal>
    )



}