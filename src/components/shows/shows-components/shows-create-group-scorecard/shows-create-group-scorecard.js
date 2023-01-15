import { 
    Button, 
    Flex, 
    FormControl, 
    Input, 
    InputGroup, 
    InputRightElement,
    Popover,
    PopoverTrigger,
    PopoverContent,
    PopoverArrow,
    PopoverCloseButton,
    PopoverHeader,
    FormErrorMessage
} from '@chakra-ui/react'
import { AddIcon, CloseIcon, DeleteIcon, LockIcon } from '@chakra-ui/icons'
import { DividerWithText } from '../../../../chakra'
import { ModalsEnum, useGlobalStore } from '../../../../stores'

export const ShowsCreateGroupScorecard = ({ 
    deleteInvite, 
    emailValue, 
    handleEmailSubmit, 
    handleFormChange, 
    isAdminError,
    isError,
    invites, 
    resetInput,
}) => {

    const {
        isSubmittingForm,
        setModals,
        user
    } = useGlobalStore()

    const handleSubmit = () => {
        setModals(ModalsEnum.CREATE_GROUP_MODAL, true)
    }

    return ( 
        <Flex
            id="create_group"
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
                pr={["0", "4"]}
                mt="8"
                w={["100%", "60%", "60%"]}
                flexDir="column"
                alignItems="flex-end"
                justifyContent="flex-end"
            >
                <FormControl 
                    id="invites_form"
                >
                    { invites.map( (invite, _i) => {
                        return (
                            <InputGroup 
                                mb="2"
                                key={_i}
                            >
                                <Input 
                                    mb="1"
                                    size="md" 
                                    readOnly 
                                    value={invites[_i]} 
                                    placeholder="first.last@email.com" 
                                    type="email" 
                                    maxLength={255} 
                                    color={_i == 0 ? '#bababa' : '#eaeaea'}
                                />
                                <InputRightElement 
                                    children={
                                        _i === 0
                                        ?
                                            <LockIcon
                                                color="#9a9a9a"
                                                _hover={{
                                                    cursor: 'not-allowed'
                                                }}
                                            />
                                        :
                                            <DeleteIcon 
                                                id={invite} 
                                                onClick={deleteInvite} 
                                                _hover={{
                                                    cursor: 'pointer', 
                                                    color: 'white'
                                                }} 
                                                color="#dadada" 
                                                alignItems="center"
                                                justifyContent="center"
                                            />
                                            
                                    } 
                                />
                            </InputGroup>
                        )
                    })}
                </FormControl>
                <FormControl isInvalid={isError}>
                    <InputGroup>
                        <Input 
                            errorBorderColor="red.700"
                            onChange={handleFormChange} 
                            value={ emailValue } 
                            id="emailValue" 
                            // _focus={{color: 'black',background: 'lightgray'}} 
                            mt="3" 
                            placeholder="email@example.com" 
                            type="email" 
                            maxLength={255} 
                            // autoComplete="nope"
                        />
                        { emailValue && 
                            <InputRightElement children={<CloseIcon
                                _hover={{cursor: 'pointer', color: 'white'}} 
                                    color="#dadada" 
                                    alignItems="center"
                                    justifyContent="center" 
                                    mt="8"
                                    fontSize="0.9rem"
                                    onClick={resetInput}
                                />}
                            />
                        }
                    </InputGroup>
                    <FormErrorMessage>{isAdminError ? `You're already included.` : `Not a valid email.`}</FormErrorMessage>
                </FormControl>
                <Flex 
                    m="auto" 
                    alignItems="center" 
                    justifyContent="center" 
                    flexDir={['column', 'row']}
                    mt={isError ? '0' : '5'}
                >     
                    <Popover>
                        <PopoverTrigger>
                            <Button 
                                minW={["90%", "40%"]}
                                leftIcon={invites.length >= 4 ? '' : <AddIcon />} 
                                m="2"
                                mt={["4"]}
                                type="submit"
                                colorScheme="solid" 
                                variant="outline"
                                color="#CACACA"
                                size={["lg", "md"]}
                                _hover={{
                                    color: 'white',
                                    border: '1px solid #353535',
                                    bg: "#353535"
                                }}
                                bg="#252525"
                                onClick={user?.sub ? handleEmailSubmit : () => ''} 
                            >
                                {`${invites.length >= 4 ? '5 Member Limit' : 'Add Member'}`}
                            </Button>
                        </PopoverTrigger>
                        <PopoverContent>
                            <PopoverArrow />
                            <PopoverCloseButton />
                            <PopoverHeader>
                                Please sign in.
                            </PopoverHeader>
                        </PopoverContent>
                    </Popover>
                    <Popover>
                        <PopoverTrigger>
                            <Button 
                                isLoading={isSubmittingForm}
                                disabled={isSubmittingForm}
                                loadingText="Submitting"
                                minW={["90%", "40%"]}
                                size={["lg", "md"]}
                                m="2" 
                                type="submit"
                                mt={["4"]} 
                                onClick={user?.sub ? handleSubmit : () => ''} 
                                colorScheme="solid" 
                            >
                                Create Scorecard
                            </Button>
                        </PopoverTrigger>
                        <PopoverContent>
                            <PopoverArrow />
                            <PopoverCloseButton />
                            <PopoverHeader>
                                Please sign in.
                            </PopoverHeader>
                        </PopoverContent>
                    </Popover>
                </Flex>
            </Flex> 
        </Flex>
    )
}