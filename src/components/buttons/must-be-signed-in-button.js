import {
    Button,
    Popover,
    PopoverArrow,
    PopoverCloseButton,
    PopoverContent,
    PopoverHeader,
    PopoverTrigger,
} from '@chakra-ui/react'
import { ArrowForwardIcon, ChevronRightIcon } from '@chakra-ui/icons'
import { useGlobalStore } from '../../stores'


export const MustBeSignedInButton = ({
    label,
    onClickHandler
}) => {

    const { 
        isSubmittingForm,
        user
    } = useGlobalStore()

    return (
        <Popover>
            <PopoverTrigger>
                <Button 
                    // isLoading={isSubmittingForm}
                    // disabled={isSubmittingForm}
                    // loadingText="Submitting"
                    onClick={user?.attributes?.sub ? onClickHandler : () => ''} 
                    size="md" 
                    colorScheme="solid"
                >
                    {`${label}`}
                </Button>
            </PopoverTrigger>
            <PopoverContent
                p="2"
                m="2"
            >
                <PopoverArrow />
                <PopoverCloseButton />
                <PopoverHeader>
                        Sign In to leave a review.
                </PopoverHeader>
                <Button
                    rightIcon={<ChevronRightIcon />}
                    mx="auto"
                    my="4"
                    p="2"
                    size="sm"
                    w="66%"
                >Sign In</Button>
            </PopoverContent>
        </Popover>
    )
}