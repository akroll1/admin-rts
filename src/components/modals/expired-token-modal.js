import React from 'react'
import { useNavigate } from 'react-router-dom'
import { Button, Heading, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Text, useDisclosure } from '@chakra-ui/react'

export const ExpiredTokenModal = ({ expiredTokenModal }) => {
  const navigate = useNavigate();
  const { isOpen, onOpen, onClose } = useDisclosure()
  return (
    <Modal
      isCentered
      onClose={onClose}
      isOpen={expiredTokenModal}
      motionPreset="slideInBottom"
    >
      <ModalOverlay />
      <ModalContent p="0.5rem">
        <ModalHeader mb="-1rem" fontSize="sm">FightSync.live</ModalHeader>
        <ModalBody>
            <Heading textAlign="center">Session Expired</Heading>
            <Text textAlign="center">Please sign in again.</Text>
        </ModalBody>
        <ModalFooter display="flex" flexDirection="row" alignItems="center" justifyContent="center">
          <Button w="50%" onClick={() => navigate('/signin', {page:'/scoring'})} colorScheme="blue" mr={3}>
            Sign In 
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}