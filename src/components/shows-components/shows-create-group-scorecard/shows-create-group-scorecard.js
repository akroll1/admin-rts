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
            <DividerWithText 
                p="0" 
                text={'Create a Group Scorecard'} 
                fontSize="2xl"
            />
            <Stack w={["100%", "80%"]} m="auto" spacing="2">
                <FieldGroup title="Score with Friends">
                    <Stack m="auto" w="100%" spacing="2">
                    <FormControl id="membersArr">
                        <FormLabel></FormLabel>
                        { members.map((member, i) => {
                            return (
                                <InputGroup key={i}>
                                    <Input 
                                        mb="1"
                                        size="md" 
                                        readOnly 
                                        key={member} 
                                        value={members[i]} 
                                        placeholder="first.last@email.com" 
                                        type="email" 
                                        maxLength={255} 
                                        color={i == 0 ? 'lightgray' : 'white'}
                                    />
                                    <InputRightElement 
                                        display={i === 0 ? 'none' : 'flex'} 
                                        children={
                                            <DeleteIcon 
                                                id={member} 
                                                onClick={deleteMember} 
                                                _hover={{cursor: 'pointer', color: 'gray'}} 
                                                color="white" 
                                                alignItems="center"
                                                justifyContent="center"
                                            />
                                        } 
                                    />
                                </InputGroup>
                            )
                        })}
                        <Input 
                            onChange={e => handleFormChange(e)} 
                            value={ emailValue } 
                            id="emailValue" 
                            // _focus={{color: 'black',background: 'lightgray'}} 
                            mt="4" 
                            placeholder="email@example.com" 
                            type="email" maxLength={255} 
                        />
                        <Flex m="auto" alignItems="center" justifyContent="center" flexDir={['column', 'row']}>     
                            <Button 
                                onClick={ handleEmailSubmit } 
                                leftIcon={<AddIcon />} 
                                m="2"
                                mt={["4"]}
                                type="button"
                                colorScheme="solid" 
                                size="md"
                            >
                                Add Members
                            </Button>
                            <Button 
                                size="md"
                                isLoading={isSubmitting}
                                loadingText="Submitting"
                                m="2" 
                                mt={["4"]} 
                                onClick={handleCreateGroupScorecard} 
                                type="button" 
                                colorScheme="solid"
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