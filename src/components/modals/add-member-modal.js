import React, { createRef, useEffect, useRef, useState } from 'react';
import { Button, Input, Modal, ModalBody, ModalContent, ModalCloseButton, ModalFooter, ModalHeader, ModalOverlay, useDisclosure, ButtonGroup } from '@chakra-ui/react'
import { isValidEmail } from '../../utils';
const CustomOverlay = () => (
    <ModalOverlay
        bg='none'
        backdropFilter='auto'
        backdropInvert='60%'
        backdropBlur='2px'
    />
)

export const AddMemberModal = ({ addMemberModal, handleAddMemberSubmit, isSubmitting, setAddMemberModal }) => {
    const { onClose } = useDisclosure();
    const [overlay, setOverlay] = React.useState(<CustomOverlay />)
    const [email, setEmail] = useState('');
    const isInvalid = isValidEmail(email) ? false : true;
    const addMember = () => {
        handleAddMemberSubmit(email);
    }
    return ( 
        <Modal
            isCentered
            onClose={onClose}
            isOpen={addMemberModal}
            motionPreset="slideInBottom"
        >
        <ModalOverlay />
        <ModalContent p="0.5rem">
            <ModalHeader fontSize="sm">Add Member to Group</ModalHeader>
            <ModalCloseButton onClick={() => setAddMemberModal(false)} />
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
                    colorScheme="blue"
                >
                    Add Member
                </Button>
                <Button minW="50%" variant="outline" onClick={() => setAddMemberModal(false)}>
                    Cancel
                </Button>
            </ButtonGroup>
            </ModalFooter>
        </ModalContent>
        </Modal>
    )



}