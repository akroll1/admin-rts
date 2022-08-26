import React from 'react'
import { Button, Flex, FormControl, FormGroup, FormLabel, Input, InputGroup, InputRightElement, Stack, StackDivider } from '@chakra-ui/react'
import { AddIcon, DeleteIcon } from '@chakra-ui/icons'
import { DividerWithText, FieldGroup } from '../../../chakra'

export const ShowsCreateGroupScorecard = ({ 
    deleteMember, 
    emailValue, 
    handleEmailSubmit, 
    handleFormChange, 
    handleCreateGroupScorecard, 
    isSubmitting,
    members 
}) => {
    return ( 
        <>
            <DividerWithText text={'Create a Group Scorecard'} />
            <Stack w={["100%", "80%"]} m="auto" spacing="2">
                <FieldGroup title="Score with Friends">
                    <Stack m="auto" w="100%" spacing="2">
                    <FormControl id="membersArr">
                        <FormLabel></FormLabel>
                        { members.map((member, i) => {
                            return (
                                <InputGroup key={i}>
                                    <Input size="md" readOnly key={member} value={members[i]} placeholder="first.last@email.com" type="email" maxLength={255} />
                                    <InputRightElement children={<DeleteIcon id={member} onClick={deleteMember} _hover={{cursor: 'pointer', color: 'gray'}} color="white" />} />
                                </InputGroup>
                            )
                        })}
                        <Input 
                            onChange={e => handleFormChange(e)} 
                            value={ emailValue } 
                            id="emailValue" 
                            _focus={{color: 'black',background: 'lightgray'}} 
                            mt="4" 
                            placeholder="email@example.com" 
                            type="email" maxLength={255} 
                        />
                        <Flex m="auto" alignItems="center" justifyContent="center" flexDir={['column', 'row']}>     
                            <Button 
                                colorScheme="blue" 
                                onClick={ handleEmailSubmit } 
                                leftIcon={<AddIcon />} 
                                m="2"
                                mt={["4"]}
                                type="button"
                            >
                                Add Members
                            </Button>
                            <Button 
                                isLoading={isSubmitting}
                                loadingText="Submitting"
                                m="2" 
                                mt={["4"]} 
                                onClick={handleCreateGroupScorecard} 
                                type="button" 
                                colorScheme="blue"
                            >
                                Create Scorecard
                            </Button>
                        </Flex>
                    </FormControl>
                    </Stack>
                </FieldGroup>
            </Stack> 
        </>
    )
}