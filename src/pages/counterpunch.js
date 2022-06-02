import React, {useEffect, useState} from 'react';
import { Player } from '../components/player'
import { Flex } from '@chakra-ui/react'
import {slicedGame, getGameType} from './helpers'
// import Chat from '../components/chat'
// import ChannelsAside from '../components/channels-aside'
import axios from 'axios';

const CounterPunch = () => {
    useEffect(() => {
        const currentUser = {
            id: '12345-67890',
            name: 'andrew kroll',
            email: 'andrew.kroll@yahoo.com',
            photoUrl: '',
            welcomeMessage: 'Welcome to FCL!'
        };
    },[]);
    const [chatMessages,setChatMessages] = useState([{
        id: '1234-5678-90',
        message: 'here is a message',
        senderName: 'Bobby'
    },{
        id: '1234-5678-90',
        message: 'here is a second message',
        senderName: 'Mike'
    },{
        id: '1234-5678-90',
        message: 'here is a third message',
        senderName: 'Bobby'
    }]);

    const [channel, setchannel] = useState({});
    const [selectedChannel,setSelectedChannel] = useState(null);
    const [playbackUrl, setPlaybackUrl] = useState(null);
    const [chatInput, setChatInput] = useState('');
    const [isTyping, setIsTyping] = useState(true);
    const [token, setToken] = useState('');
    const [user, setUser] = useState({});    
    const [startBroadcast,setStartBroadcast] = useState(false);
    const [websocket, setWebsocket] = useState({});
    
    websocket.onopen = (data) => {
        console.log('websocket: ',data);
        if(data && channel.episode){
            sendUserData();
        }
    }
    websocket.onclose = (closeEvent) => {
        setTimeout(() => setReopenSocket(true),2000);
    };
    websocket.onmessage = ({data}) => {
        console.log('data 98: ',data);
    }

    const setReopenSocket = () => {
        console.log('reopening websocket...');
        setWebsocket(new WebSocket(process.env.REACT_APP_WS_URL+`?token=${token}`));
        setUser({sub: '123-456-789', email: 'idTokenDotEmail', channel});
    };

    const sendUserData = () => {
        websocket.send(JSON.stringify({ action: 'routeUserData', data: {...user}}));
    };

    const onChatSubmit = (e) => {
        e.preventDefault();
        let message = {
            id: 'here is id',
            senderName:'name here',
            message: chatInput
        };
        setChatInput('');
        setChatMessages([...chatMessages,message]);
    }
    const handleChatInput = (e) => {
        setChatInput(e.target.value);
    };
    const handleChannelClick = e => {
        let arn = e.currentTarget.getAttribute('data-url');
        let episode = e.currentTarget.id;
        let getStreamKey = arn => {
            let index = arn.lastIndexOf('/');
            let streamId = arn.slice(index+1);
            return streamId;
        }
        let streamKey = getStreamKey(arn);
        let url = process.env.REACT_APP_GET_CHANNELS_URL + streamKey;
        axios(url)
            .then(res => setSelectedChannel({...selectedChannel, playbackUrl: res.data.playbackUrl, episode}))
            .catch(err => console.log('err: ',err));
    };
    // console.log('chatMessages: ',chatMessages);
    // console.log('playbackUrl: ',playbackUrl);
    console.log('selectedChannel 101: ',selectedChannel)
    return (
        <Flex w="100%" p="3" alignItems="center" justifyContent="center" flexBasis='1 0 auto'>
            <div
                handleChannelClick={handleChannelClick}
                selectedChannel={selectedChannel}
                setSelectedChannel={setSelectedChannel}
            />
            <div>
                <div>
                    {selectedChannel && selectedChannel.episode &&<h3>{selectedChannel.episode}</h3>}
                    <Player 
                        selectedChannel={selectedChannel} 
                        startBroadcast={startBroadcast}
                        setStartBroadcast={setStartBroadcast}
                    />
                    
                </div>
                {/* <LeaderboardWrapper>
                    <Text>Viewer Polls/Tweets Below</Text>
                </LeaderboardWrapper> */}
            </div>
            {/* <LiveAside style={{border: '1px solid lightgray'}}>
                <Chat 
                    chatMessages={chatMessages} 
                    isTyping={isTyping} 
                    handleChatInput={handleChatInput}
                    chatInput={chatInput}
                    onChatSubmit={onChatSubmit}
                />
            </LiveAside> */}
        </Flex>
    );
}
export default CounterPunch;