import { 
    Flex
} from '@chakra-ui/react'
import { SidebarsDividerWithText } from '../../../../chakra'
import { ArrowUpDownIcon } from '@chakra-ui/icons'
import { InvitationsHeader } from '../../../../chakra'

export const ScorecardsBoardsHeaders = props => (
    <Flex       
        position="relative"
        w="100%"
        flexDir="column"
        alignItems="center"
        justifyContent="flex-start"
        bg="#111111"
        borderRadius="md"
    >
        <ScorecardsHeading
            {...props}
        />
    </Flex>
)

const ScorecardsHeading = ({ 
    label,
    pendingInvites
}) => {

    return (
        <>
            <ArrowUpDownIcon 
                position="absolute"
                top="3"
                left="1"
                fontSize="0.9rem"
                color="gray"
                _hover={{
                    cursor: 'pointer'
                }}
            />

            <SidebarsDividerWithText
                fontSize="xl"
                label={label}
                pendingInvites={pendingInvites}
                py="2"
            />
        </>
    )
}

export const ScorecardsInvitationsHeading = ({
    label,
    pendingInvites
}) => {
    return (
        <Flex       
            position="relative"
            w="100%"
            flexDir="column"
            alignItems="center"
            justifyContent="flex-start"
            bg="#111111"
            borderRadius="md"
        >
            <InvitationsHeader
                fontSize="xl"
                label={label}
                pendingInvites={pendingInvites}
            />
        </Flex>
    )
}