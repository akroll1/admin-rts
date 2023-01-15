import React, { useState } from 'react';
import { Button, ButtonGroup, Input, Modal, ModalBody, ModalContent, ModalCloseButton, ModalFooter, ModalHeader, ModalOverlay } from '@chakra-ui/react'
import { isValidEmail } from '../../utils';
import { CustomOverlay } from '../utils/custom-overlay';
import { useGlobalStore } from '../../stores';

export const AddMemberModal = ({ 
    handleAddMemberSubmit, 
    isSubmitting, 
}) => {
    const { 
        modals,
        setModals
    } = useGlobalStore()

    const [overlay, setOverlay] = useState(<CustomOverlay />)
    const [email, setEmail] = useState('');
    const isInvalid = isValidEmail(email) ? false : true;
    const addMember = () => {
        handleAddMemberSubmit(email);
    }
    const closeModal = () => {
        setEmail('');
        setModals('addMemberModal', false)
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
                    size="md"
                    onClick={addMember}
                    isDisabled={isInvalid} 
                    isLoading={isSubmitting} 
                    loadingText="Submitting" 
                    minW="50%" 
                    colorScheme="solid"
                >
                    Add Member
                </Button>
                <Button 
                    size="md"
                    minW="50%" 
                    variant="outline" 
                    onClick={closeModal}
                >
                    Cancel
                </Button>
            </ButtonGroup>
            </ModalFooter>
        </ModalContent>
        </Modal>
    )



}