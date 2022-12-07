import { 
    Divider,
    Flex, 
    Heading,
    Icon,
    ListItem,
    Text,
    UnorderedList
} from '@chakra-ui/react'
import { CheckIcon, DeleteIcon } from '@chakra-ui/icons'
import { useScorecardStore } from '../../../../stores'
import { parseEpoch } from '../../../../utils'
import { ScorecardsBoard } from './scorecards-board'

export const ScorecardsInvitationsBoard = () => {

    const { 
        acceptInvite,
        deleteInvite,
        userInvites
    } = useScorecardStore()

    const handleIconClick = (e, clickType) => {
        const { id } = e.currentTarget;
        if(clickType === 'DELETE'){
            deleteInvite(id);
            return 
        }
        const [groupScorecardId, inviteId] = id.split(':')
        acceptInvite(groupScorecardId, inviteId)
    }

    return (
        <ScorecardsBoard
            label={`Invitations`}
        >
            { userInvites.length === 0 &&
                <Text
                    color="#bababa"
                    m="auto"
                    as="h3"
                    size="md"
                >
                    No Invitations
                </Text>
            }
            <Flex
                w="100%"
                flexDir="column"
                alignItems="flex-start"
                overflow="scroll"
                // minH={['auto']}
            >
                <Flex
                    w="100%"
                    flexDir="column"
                    mb="2"
                >
                    { userInvites.length > 0 && userInvites.map( invite => {
                        return (
                            <InviteListItem
                                key={invite.inviteId}
                                handleIconClick={handleIconClick}
                                invite={invite}
                            />
                        )
                    })}
                </Flex>
            </Flex>
        </ScorecardsBoard>
    )
}

const InviteListItem = ({ handleIconClick, invite }) => {
    console.log('invite: ', invite)

    const {
        accepted,
        admin,
        awaitingAcceptance,
        createdAt,
        groupScorecardId,
        groupScorecardName,
        groupScorecardNotes,
        groupScorecardType,
        inviteId,
        members,
    } = invite

    return (
        <Flex 
            bg="fsl-body-bg" 
            mb="2"
            w="100%"
            fontSize="sm" 
            px="4" 
            spacing="0.5"
            border="1px solid #353535"
            borderRadius="md"
            p="2"
            flexDir="column"
            position="relative"
            alignItems="flex-start"
        >
            <InviteIcons 
                groupScorecardId={groupScorecardId}
                handleIconClick={handleIconClick} 
                inviteId={inviteId}
            />

            <Flex
                w="100%"
                flexDir="column"
            >
                <Text 
                    fontSize="0.5rem"
                    color="fsl-subdued-text"
                >
                    {`${groupScorecardType}`}
                </Text>
                <Heading
                    maxW="70%" 
                    fontWeight="medium" 
                    color="#fafafa"
                    as="h4"
                    size="md"
                >
                    {`${groupScorecardName}`}
                </Heading>

                <Divider mt="2" mb="1" />
                <Flex
                    w="100%"
                    flexDir="row"
                    justifyContent="space-between"
                >
                    <Text 
                        fontSize="0.5rem"
                        color="fsl-subdued-text"
                    >
                        {`${accepted}/${awaitingAcceptance+accepted} accepted`}
                    </Text>
                    <Text
                        fontSize="0.7rem"
                        color="fsl-subdued-text"
                    >
                        {`Sent ${parseEpoch(createdAt).slice(4,11)}`}
                    </Text>
                </Flex>
                
                <Text 
                    fontSize="0.9rem"
                    fontWeight="bold"
                    color="fsl-subdued-text"
                >
                    {`Members`}
                </Text>
                <UnorderedList
                    pl="2"
                    maxH="10rem"
                >
                    { members.length > 0 && members.map( (member, _i) => {
                        return (
                            <ListItem key={_i}>
                                {member === admin ? `${member}*` : `${member}`}
                            </ListItem>
                        )
                    })}
                </UnorderedList>
                <Text 
                    fontSize="0.9rem"
                    fontWeight="bold"
                    color="fsl-subdued-text"
                >
                    {`Notes`}
                </Text>
                <Text 
                    pl="2"
                    fontSize="0.9rem"
                    fontWeight="bold"
                    color="fsl-subdued-text"
                >
                    {`${groupScorecardNotes ? groupScorecardNotes : ''}`}
                </Text>
            </Flex>
        </Flex>
    )
}

const InviteIcons = ({ 
    groupScorecardId,
    handleIconClick,
    inviteId
}) => {

    return (
        <Flex
            top="5"
            right="1"
            position="absolute"
            flexDir="row"
            maxW="25%"
            alignItems="baseline"
        >
            <Icon
                onClick={e => handleIconClick(e, 'ACCEPT')}
                id={`${groupScorecardId}:${inviteId}`}
                borderRadius="md"
                mx="1"
                p="1"
                fontSize="1.7rem"
                color="green.400"
                border="1px solid #353535"
                as={CheckIcon}
                cursor="pointer"
            />
            <Icon
                onClick={e => handleIconClick(e, 'DELETE')}
                id={`${groupScorecardId}:${inviteId}`}
                borderRadius="md"
                mx="1"
                p="1"
                fontSize="1.7rem"
                color="whiteAlpha.600"
                border="1px solid #353535"
                as={DeleteIcon}
                cursor="pointer"
            />
        </Flex>
    )
}