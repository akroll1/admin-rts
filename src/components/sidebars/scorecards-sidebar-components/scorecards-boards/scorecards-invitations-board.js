import { 
    Alert,
    AlertIcon,
    Divider,
    Flex, 
    Heading,
    IconButton,
    ListItem,
    Text,
    UnorderedList,
    useColorModeValue,
} from '@chakra-ui/react'
import { useGlobalStore } from '../../../../stores'
import { parseEpoch } from '../../../../utils'
import { CheckIcon } from '@chakra-ui/icons'
import { FiTrash2 } from 'react-icons/fi'

export const ScorecardsInvitationsBoard = () => {

    const { 
        acceptInvite,
        deleteInvite,
        userInvites
    } = useGlobalStore()

    const handleIconClick = (e, clickType) => {
        const { id } = e.currentTarget;
        const [groupScorecardId, inviteId] = id.split(':')
        return clickType === 'DELETE' ? deleteInvite(inviteId) : acceptInvite(groupScorecardId, inviteId);
    }
    
    return (
        <Flex
            bg="transparent"
            position="relative"
            w="100%"
            flexDir="column"
            alignItems="flex-start"
            justifyContent="flex-start"
            border="1px solid #383838"
            borderRadius="md"
            py="2"
            px="4"
            my="4"
        >
            <Flex       
                position="relative"
                w="100%"
                flexDir="column"
                alignItems="center"
                justifyContent="flex-start"
                bg="transparent"
                borderRadius="md"
                p="2"
            >
                <InvitationsHeader
                    fontSize="xl"
                    pendingInvites={userInvites?.length > 0}
                />
            </Flex>
            <Flex
                w="100%"
                bg="bg-surface"
                boxShadow={useColorModeValue('sm', 'sm-dark')}
                borderRadius="lg"
            >
                { userInvites?.length > 0 && userInvites.map( (invite, _i) => {
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
                            key={inviteId}
                            w="100%"
                            flexDirection="column"
                        >
                            <Flex
                                flexDir="column"
                                w="100%"
                                alignItems="space-between"
                                justifyContent="flex-start"
                            >
                                <Heading
                                    size="sm"
                                    color="gray"
                                >
                                    {`${groupScorecardType}`}
                                </Heading>
                                <Flex
                                    w="100%"
                                    alignItems="center"
                                    justifyContent="space-between"
                                >

                                    <Heading 
                                        maxW="70%"
                                        size={["sm","md"]} 
                                        color="emphasized" 
                                        fontWeight="medium"
                                        wordBreak="break-word"
                                    >
                                        {groupScorecardName}
                                    </Heading>
                                    <InvitationsButtons 
                                        handleIconClick={handleIconClick}
                                        groupScorecardId={groupScorecardId}
                                        inviteId={inviteId}
                                    />
                                </Flex>
                            </Flex>
                            
                            <Flex
                                w="100%"
                                flexDir="row"
                                justifyContent="space-between"
                                mt="1"
                            >
                                <Text 
                                    fontSize="0.7rem"
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
                           
                            <UnorderedList
                                pl="2"
                                maxH="10rem"
                            >
                                { members.length > 0 && members.map( (member, _i) => {
                                    return (
                                        <ListItem 
                                            key={_i}
                                        >
                                            {member === admin ? `${member}*` : `${member}`}
                                        </ListItem>
                                    )
                                })}
                            </UnorderedList>
                            <Flex
                                mt="1"
                                w="100%"
                                p="1"
                                border="1px solid #333"
                                borderRadius="3px"
                            >
                                <Text 
                                    fontSize="0.9rem"
                                    fontWeight="bold"
                                    color="fsl-subdued-text"
                                >
                                    {`Notes:`}
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
                            
                            { _i > 0 && <Divider mt="2" /> }
                        </Flex>
                    )
                })}
            </Flex>
        </Flex>
    )
}

export const InvitationsButtons = ({
    handleIconClick,
    groupScorecardId,
    inviteId
}) => {
    return (

        <Flex
            display="inline-flex"
            flexDir="row"
        >
            <IconButton
                onClick={e => handleIconClick(e, 'ACCEPT')}
                id={`${groupScorecardId}:${inviteId}`}
                size="sm"
                color="green"
                border="1px solid #888"
                icon={<CheckIcon fontSize="1rem" />}
                variant="ghost"
                aria-label="Accept Invite"
                mr="2"
            />
            <IconButton
                onClick={e => handleIconClick(e, 'DELETE')}
                id={`${groupScorecardId}:${inviteId}`}
                size="sm"
                p="0"
                border="1px solid #888"
                icon={<FiTrash2 fontSize="1rem" />}
                variant="ghost"
                aria-label="Decline Invite"
            />
        </Flex>
    )
}

export const InvitationsHeader = ({ 
    fontSize,
    pendingInvites
  }) => {
    return (
      <Flex 
        display="inline-flex"
        alignItems="center"
        justifyContent="center"
        pb="0"
      >
        <Heading
          fontSize={fontSize}
        >
          Invitations
        </Heading>
        { pendingInvites && 
          <Alert 
            p="1"
            status="error"
            bg="transparent"
            m="auto"
          >
            <AlertIcon w="3" p="0" mt="-2" ml="-1" />
          </Alert>
        }
      </Flex>
    )
  }