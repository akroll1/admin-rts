import React from 'react'
import { Heading, Modal, ModalBody, ModalCloseButton, ModalContent, ModalOverlay, Stack, useColorModeValue } from '@chakra-ui/react'
import { ReviewFormForm } from './review-form-form'

export const ReviewForm = ({ userReview, handleReviewFormSubmit, setShowTheReviewForm }) => {
    
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
                onClick={() => setShowTheReviewForm(false)}
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
                <Heading
                    fontSize="2xl"
                    fontWeight="semibold"
                    color={useColorModeValue('black', 'white')}
                >
                    Your review
                </Heading>
                <ReviewFormForm userReview={userReview} handleReviewFormSubmit={handleReviewFormSubmit} setShowTheReviewForm={setShowTheReviewForm}/>
            </Stack>
            </ModalBody>
        </ModalContent>
        </Modal>
    )
}