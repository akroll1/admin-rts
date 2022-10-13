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
        <Flex
            w="100%"
            flexDir="column"  
            alignItems="flex-end"
            justifyContent="flex-end"
            my="2"
        >
            <DividerWithText 
                p="0" 
                text={'Create a Scorecard'} 
                fontSize="2xl"
                mt="2"
            />
            <Flex 
                mt="8"
                w={["100%", "80%", "60%"]}
                flexDir="column"
                alignItems="flex-end"
                justifyContent="flex-end"
            >
                <FormControl id="membersArr">
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
                            size={["lg", "md"]}
                            >
                            Add Members
                        </Button>
                        <Button 
                            size={["lg", "md"]}
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
            </Flex> 
        </Flex>
    )
}