import React,{ useState } from 'react'
import { Heading, Flex, Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, Text, Box, Tag, ModalFooter, Button }  from '@chakra-ui/react'
import { capFirstLetters } from '../../utils/utils';

const CustomOverlay = () => (
    <ModalOverlay
      bg='none'
      backdropFilter='auto'
      backdropInvert='60%'
      backdropBlur='2px'
    />
  )
  export const ScoringModal = props => {
      const { submitScores, currentRound, scoringModal, toggleScoringModal, fighterA, fighterASlider, fighterB, fighterBSlider, handleReasonClick, reason } = props;
      const [overlay, setOverlay] = React.useState(<CustomOverlay />)
    const handleModalClose = e => {
        e.preventDefault();
        toggleScoringModal(!scoringModal)
    }
    const tags = [
        { label: 'Effective Aggression', id: 'EA' },
        { label: 'Defense', id: 'D', },
        { label: 'Ring Generalship', id: 'RG' }
    ]
    return (
        <Modal closeOnOverlayClick={false} isOpen={scoringModal} >
            <ModalOverlay />
            <ModalContent>
                <ModalHeader textAlign="center">Round {currentRound}</ModalHeader>
                <ModalCloseButton onClick={e => handleModalClose(e)} />
                <ModalBody>
                    <Flex flexDirection="row" justifyContent="space-evenly">
                        <Heading as="h4" size="md">{capFirstLetters(fighterA)} - {fighterASlider}</Heading>
                        <Heading as="h4" size="md">{capFirstLetters(fighterB)} - {fighterBSlider}</Heading>
                    </Flex>
                    <Box p="3" m="1" ml="3" mt="3" border="1px solid gray" borderRadius="5px">
                        <Heading textAlign="center" mt="1" mb="2" as="h5" size="sm">Click Reason</Heading>
                        <Flex flexDirection="column" flexWrap="wrap">
                            {tags.map ( tag => {
                                const { id, label } = tag;
                                return <Tag key={id} style={reason === id ? {background: 'gray'} : {background: 'transparent'}} margin="auto" ml="1" my="1" _hover={{cursor: 'pointer'}} id={id} onClick={handleReasonClick}>{label}</Tag>
                            })}
                        </Flex>
                    </Box>
                </ModalBody>

                <ModalFooter display="flex" flexDirection="row" alignItems="center" justifyContent="center">
                    <Button colorScheme="blue" mr={3} onClick={submitScores}>
                        Submit Scores
                    </Button>
                    <Button onClick={e => handleModalClose(e)} variant="outline">Cancel</Button>
                </ModalFooter>

            </ModalContent>
        </Modal>
    )
}