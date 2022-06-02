import React from 'react'
import { useNavigate } from 'react-router-dom'
import { Heading, useDisclosure, Button, Modal, ModalBody, ModalContent, ModalCloseButton, ModalFooter, ModalHeader, ModalOverlay } from '@chakra-ui/react'

export const ExpiredTokenModal = ({ openModal }) => {
  const navigate = useNavigate();
  const { isOpen, onOpen, onClose } = useDisclosure()
  return (
    <>

      <Modal
        isCentered
        onClose={onClose}
        isOpen={openModal}
        motionPreset="slideInBottom"
      >
        <ModalOverlay />
        <ModalContent p="0.5rem">
          <ModalHeader mb="-1rem" fontSize="sm">FightSync.live</ModalHeader>
          <ModalBody>
              <Heading textAlign="center">Please Sign In</Heading>
          </ModalBody>
          <ModalFooter display="flex" flexDirection="row" alignItems="center" justifyContent="center">
            <Button w="50%" onClick={() => navigate('/signin', {page:'/scoring'})} colorScheme="blue" mr={3}>
              Sign In
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}