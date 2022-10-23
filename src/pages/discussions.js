import React, {useState, useEffect} from 'react'
import { useParams } from 'react-router';
import { Box, Divider, Flex, Heading, Logo, Spacer, Stack } from '@chakra-ui/react'
import { NavLink, SearchField } from '../chakra'
import { ExternalLinkIcon } from '@chakra-ui/icons'
// import { DiscussionEmbed } from 'disqus-react';
import axios from 'axios';

const Discussion = () => {
    const accessTokenConfig = ''
    const { id } = useParams();
    const [discussion, setDiscussion] = useState({});
    const [discussions, setDiscussions] = useState([]);
    const [selectedDiscussion, setSelectedDiscussion] = useState({
        discussionId: '',
        discussionTitle:'',
        discussionSubTitle: '',
        discussionSummary: '',
        discussionBody: '',
        discussionPics: []
    });
    const discussionsUrl = `${process.env.REACT_APP_API}/discussions`;

    useEffect(() => {
        const getAllDiscussions = async () => {
            axios.get(discussionsUrl, accessTokenConfig)
                .then( res => {
                    setDiscussions(res.data)
                    setSelectedDiscussion(res.data[0])
                })
                .catch( err => console.log(err));
        }
        const getDiscussion = async () => {
            const url = discussionsUrl + `/${id}`;
            axios.get(url, accessTokenConfig)
                .then( res => setDiscussion(res.data))
                .catch( err => console.log(err));
        }
        if(id){
            getDiscussion();
        } else {
            getAllDiscussions();
        }
    },[]);
    const handleDiscussionClick = e => {
        const { id } = e.currentTarget;
        const selected = discussions.filter( discussion => discussion.discussionId === id);
        console.log('id: ',id)
        console.log('selected: ',selected)
        setSelectedDiscussion(selected[0]);
    }
    useEffect(() => {
        console.log('discussion: ',discussion);
        console.log('discussions: ',discussions);
        console.log('selectedDiscussion, ',selectedDiscussion)
    },[discussions, discussion, selectedDiscussion])
   

  return (
    <Flex height="auto" width={{ base: 'full'}} direction="row" color="white" flexWrap="wrap" px={6} py={8}>
        <Box flex="1 0 30%">
            <SearchField mb={6} />
            <Stack spacing={6}>
                <Stack>
                    {
                        discussions && discussions.length > 0 && discussions.map( (discussion,i) => {
                            const { discussionId, discussionTitle } = discussion;
                            return <NavLink onClick={e => handleDiscussionClick(e)} icon={ExternalLinkIcon} id={discussionId} label={discussionTitle} />
                        })
                    }
                </Stack>
                <Divider borderColor="whiteAlpha.400" />
                <Stack>
                <NavLink label="Notifications" />
                <NavLink label="Help Center" />
                </Stack>
            </Stack>
            <Spacer />
        </Box>
        <Box p="6" overflow='scroll' flex="3 0 70%" spacing={8} mb={8} bg="blackAlpha.500" borderRadius="md" mt={0}>
            <DiscussionBlock selectedDiscussion={selectedDiscussion} />
        </Box>
    </Flex>
  )
}
    
export default Discussion

const DiscussionBlock = ({ selectedDiscussion }) => {
    const { discussionId, discussionTitle, discussionSubtitle, discussionSummary, discussionBody, discussionPics } = selectedDiscussion;

    return (
        <Flex flexDirection="column" alignItems="center" justifyContent="center" w="70%" m="auto">
            <Heading as="h2" size="lg">{discussionTitle}</Heading>
            {discussionSubtitle && <Heading ml="5" my="3"as="h3" size="md">{discussionSubtitle}</Heading>}
            {discussionSummary && <Heading as="h4" size="sm" ml="5" my="3">{discussionSummary}</Heading>}
            <p style={{marginBottom: '5rem', marginLeft: '1rem'}}>{discussionBody}</p>
{/*             
            <DiscussionEmbed style={{width: '75%'}}
                shortname='fightsync-live'
                config={
                    {
                        url: this.props.article.url,
                        identifier: this.props.article.id,
                        title: this.props.article.title,
                        language: 'us_EN'
                    }
                }
            /> */}
        </Flex>
    )
}