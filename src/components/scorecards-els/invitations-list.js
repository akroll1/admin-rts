import {
    Button,
    Flex,
    IconButton,
    Stack,
    StackDivider,
    Text,
    useColorModeValue,
} from '@chakra-ui/react'
import { ScorecardsBoard } from '../sidebars/scorecards-sidebar-components/scorecards-boards/scorecards-board'
import { FiTrash2 } from 'react-icons/fi'
import { useScorecardStore } from '../../stores'
import { CheckIcon } from '@chakra-ui/icons'

export const InvitationsList = () => {

    const {
        invites
    } = useScorecardStore()
    return (
        <ScorecardsBoard
            label={`Groups`}
        >
            <Flex
                bg="bg-surface"
                boxShadow={useColorModeValue('sm', 'sm-dark')}
                borderRadius="lg"
                p={['4','6']}
            >
                <Stack spacing="5" divider={<StackDivider />}>
                <Stack
                    justify="space-between"
                    direction={['column', 'row']}
                    spacing="5"
                >
                    <Stack spacing="1">
                    <Text fontSize="lg" fontWeight="medium">
                        Experiences
                    </Text>
                    <Text fontSize="sm" color="muted">
                        Write
                    </Text>
                    </Stack>
                    <Button variant="primary">Add</Button>
                </Stack>
                    { invites?.length > 0 && invites.map( invite => {
                        return (
                            <Stack key={invite.inviteId} justify="space-between" direction="row" spacing="4">
                            <Stack spacing="0.5" fontSize="sm">
                                <Text color="emphasized" fontWeight="medium">
                                {}
                                </Text>
                                <Text color="muted">{}</Text>
                            </Stack>

                            <Stack
                                direction={['column', 'row']}
                                spacing={['0', '1']}
                            >
                                <IconButton
                                    icon={<CheckIcon fontSize="1.25rem" />}
                                    variant="ghost"
                                    aria-label="Edit experience"
                                />
                                <IconButton
                                    icon={<FiTrash2 fontSize="1.25rem" />}
                                    variant="ghost"
                                    aria-label="Delete"
                                />
                            </Stack>
                            </Stack>
                        )
                    })}
                </Stack>
            </Flex>
        </ScorecardsBoard>
    )
}