import React, { useState } from 'react';
import { Button, ButtonGroup, Input, Modal, ModalBody, ModalContent, ModalCloseButton, ModalFooter, ModalHeader, ModalOverlay } from '@chakra-ui/react'

const CustomOverlay = () => (
    <ModalOverlay
        bg='none'
        backdropFilter='auto'
        backdropInvert='60%'
        backdropBlur='2px'
    />
)

export const AddGuestJudgeModal = ({ handleAddGuestJudge, isSubmitting, openAddGuestJudgeModal, setOpenAddGuestJudgeModal }) => {
    const [overlay, setOverlay] = React.useState(<CustomOverlay />)

    const closeModal = () => {
        setOpenAddGuestJudgeModal(false)
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
            <ModalHeader fontSize="sm">Guest Judges</ModalHeader>
            <ModalCloseButton onClick={closeModal} />
            <ModalBody>



            </ModalBody>
            <ModalFooter 
                display="flex" 
                flexDirection="row" 
                alignItems="center" 
                justifyContent="center"
            >
            <ButtonGroup m="auto" spacing="4">
                <Button 
                    onClick={handleAddGuestJudge}
                    isDisabled={false} 
                    isLoading={isSubmitting} 
                    loadingText="Submitting"  
                    colorScheme="blue"
                >
                    Add Guest Judge
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