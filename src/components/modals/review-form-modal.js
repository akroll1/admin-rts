import React from 'react'
import { Heading, Modal, ModalBody, ModalCloseButton, ModalContent, ModalOverlay, Stack, useColorModeValue } from '@chakra-ui/react'
import { ReviewForm } from '../forms'

export const ReviewFormModal = ({ 
    reviewForm, 
    setReviewForm, 
    handleReviewFormClose, 
    handleReviewFormSubmit, 
}) => {
    
    return (
        <Modal
            isOpen={true}
            onClose={console.log}
            size="md"
            isCentered
            blockScrollOnMount={false}
            trapFocus={false}
        >
        <ModalOverlay />
        <ModalContent borderRadius="xl" mx={{ base: '2.5', lg: '16' }} overflow="hidden">
            <ModalCloseButton
            // can handle sanitizing the review form by moving the form state up here and sending down a clean form state.
                onClick={handleReviewFormClose}
                top="0"
                right="0"
                size="lg"
                borderRadius="none"
                borderBottomLeftRadius="md"
            />
            <ModalBody
                px={{ base: '5', md: '8', lg: '12' }}
                py={{ base: '10', md: '8', lg: '12' }}
                pb={{ base: '6' }}
            >
            <Stack spacing="6">
                <ReviewForm 
                    reviewForm={reviewForm} 
                    setReviewForm={setReviewForm} 
                    handleReviewFormClose={handleReviewFormClose}
                    handleReviewFormSubmit={handleReviewFormSubmit} 
                />
            </Stack>
            </ModalBody>
        </ModalContent>
        </Modal>
    )
}