import React from 'react'
import { Button, FormControl, FormGroup, FormLabel, Input, InputGroup, InputRightElement, Stack, StackDivider } from '@chakra-ui/react'
import { AddIcon, DeleteIcon } from '@chakra-ui/icons'
import { DividerWithText, FieldGroup } from '../../../chakra'

export const ShowsCreateGroupScorecard = ({ deleteMember, emailValue, handleEmailSubmit, handleFormChange, handleScorecardSubmit, members }) => {
    return ( 
        <>
            <DividerWithText text={'Create a Group Scorecard'} />
            <Stack w="80%" m="auto" spacing="4" divider={<StackDivider />}>
                <FieldGroup title="Create a Scorecard">
                    <Stack m="auto" w="70%" spacing="4">
                    <FormControl id="membersArr">
                        <FormLabel>Invite Friends</FormLabel>
                        { members.map((member, i) => {
                            return (
                                <InputGroup m="1" key={i}>
                                    <Input size="md" readOnly key={member} value={members[i]} placeholder="first.last@email.com" type="email" maxLength={255} />
                                    <InputRightElement children={<DeleteIcon id={member} onClick={deleteMember} _hover={{cursor: 'pointer', color: 'gray'}} color="white" />} />
                                </InputGroup>
                            )
                        })}
                        <Input onChange={e => handleFormChange(e)} value={ emailValue } id="emailValue" _focus={{color: 'black',background: 'lightgray'}} mt="4" placeholder="email@example.com" type="email" maxLength={255} />
                        <Button colorScheme="blue" onClick={ handleEmailSubmit } leftIcon={<AddIcon />} mt="2rem" mr="1.2rem" type="button">
                            Add Members
                        </Button>
                        <Button mt="2rem" _hover={{cursor: 'pointer'}} onClick={ handleScorecardSubmit } type="button" colorScheme="blue">
                            Create Scorecard
                        </Button>
                    </FormControl>
                    </Stack>
                </FieldGroup>
            </Stack> 
        </>
    )
}