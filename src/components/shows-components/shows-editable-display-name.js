import { useState } from 'react'
import { 
    ButtonGroup, 
    Editable, 
    EditableInput,
    EditablePreview, 
    Flex,
    FormControl,
    FormHelperText,
    IconButton, 
    Input, 
    InputGroup,
    useEditableControls,
} from "@chakra-ui/react";
import { 
    CheckIcon, 
    CloseIcon,
} from "@chakra-ui/icons";

export const ShowsEditableDisplayName = ({
    setDisplayName,
    username
}) => {
    const [value, setValue] = useState(username)

    const handleNameChange = () => {
        const id = document.getElementById('display_name').value
        if(id.length > 24) return alert('Display name is too long.')
        setValue(id)
        setDisplayName(id)
    }

    const submitName = () => {
        setDisplayName(value)
    }

    const handleCancel = () => {
        setValue(username)
        setDisplayName(username)
    }

    const EditableControls = () => {
        const {
            isEditing,
            getSubmitButtonProps,
            getCancelButtonProps,
        } = useEditableControls();

        return (
            <ButtonGroup 
                alignItems="center"
                justifyContent="end" 
                size="sm" 
                spacing="2"
                p="2"

            >
                <IconButton
                    background={isEditing ? "red" : "transparent"}
                    icon={<CheckIcon />} 
                    _focus={{
                        border: '1px solid white'
                    }}
                    _active={{
                        border: '1px solid white'
                    }}
                    _hover={isEditing ? { background: "red" } : { background: 'transparent' }}
                    {...getSubmitButtonProps()} 
                    border={isEditing ? "1px solid #aaaaaa" : '1px solid #404040'}
                />
                <IconButton
                    background={isEditing ? "transparent" : "transparent"}
                    icon={<CloseIcon boxSize={3} />}
                    border={isEditing ? "1px solid #aaaaaa" : '1px solid #404040'}
                    _focus={{
                        border: '1px solid white'
                    }}
                    _active={{
                        border: '1px solid white'
                    }}
                    _hover={{
                        background: 'transparent',
                        border: '1px solid white'
                    }}
                    {...getCancelButtonProps()}
                />
            </ButtonGroup>
        )   
    }

    return (
        <Flex
            w="100%"
            flexDir="column"
            alignItems="flex-start"
            justifyContent="center"
            mb="4"
            maxW="100%"
        >         
        <FormControl
            w="100%"
            maxW="100%"
            mb="4"
        >   
            <FormHelperText>Your Group Name</FormHelperText>
            <Editable
                w="100%"
                justifyContent="space-between"
                defaultValue={username}
                isPreviewFocusable={true}
                selectAllOnFocus={false}
                value={value}
                onChange={handleNameChange}
                onCancel={handleCancel}
                onSubmit={submitName}
                border="1px solid gray"
                borderRadius="md"
            > 
                <InputGroup 
                    w="100%"
                    display="flex"
                    justifyContent="center"
                    alignItems="center"
                        maxW="100%"
                    >
                    <EditablePreview
                        fontSize="1.1rem"
                        w="100%"
                        pl="2"
                        color="#FAFAFA"
                        alignSelf="center"
                        maxW="100%"
                        textAlign="center"
                    />
                    <Input 
                        pl="2"
                        id="display_name"
                        alignSelf="center"
                        as={EditableInput} 
                    />
                    <EditableControls />
                </InputGroup>
                    </Editable>
            </FormControl>
        <FormControl
            w="100%"
            maxW="100%"
        >   
            <FormHelperText 
                pb="1"
                color="#cacaca"
            >
                Your Display Name
            </FormHelperText>
            <Editable
                w="100%"
                justifyContent="space-between"
                defaultValue={username}
                isPreviewFocusable={true}
                selectAllOnFocus={false}
                value={value}
                onChange={handleNameChange}
                onCancel={handleCancel}
                onSubmit={submitName}
                border="1px solid gray"
                borderRadius="md"

            > 
                <InputGroup 
                    w="100%"
                    display="flex"
                    justifyContent="center"
                    alignItems="center"
                        maxW="100%"
                    >
                    <EditablePreview
                        fontSize="1.1rem"
                        w="100%"
                        pl="2"
                        color="#FAFAFA"
                        alignSelf="center"
                        maxW="100%"
                        textAlign="center"
                    />
                    <Input 
                        pl="2"
                        id="display_name"
                        alignSelf="center"
                        as={EditableInput} 
                    />
                    <EditableControls />
                </InputGroup>
                    </Editable>
            </FormControl>
        </Flex>    
    )
}