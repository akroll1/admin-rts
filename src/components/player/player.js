import React, {useEffect, useRef, useState} from 'react';
import {
    create,
    isPlayerSupported,
    MediaPlayer,
    PlayerError,
    PlayerEventType,
    PlayerState,
    Quality,
    TextCue,
    TextMetadataCue,
} from 'amazon-ivs-player';

export const Player = ({startBroadcast, setStartBroadcast, selectedChannel}) => {
    const playbackUrl = selectedChannel ? selectedChannel.playbackUrl : null;
    const videoSrc = 'https://player.live-video.net/1.0.0/amazon-ivs-player.min.js';
    // const stream = "https://fcc3ddae59ed.us-west-2.playback.live-video.net/api/video/v1/us-west-2.893648527354.channel.xhP3ExfcX8ON.m3u8";
    const stream = 'https://31c84084a50b.us-east-1.playback.live-video.net/api/video/v1/us-east-1.896748474789.channel.INm8ucGR84N2.m3u8';
    const divEl = useRef(null);
    const videoEl = useRef(null);

    useEffect(() => {
        const script = document.createElement('script');
        script.src = videoSrc;
        script.async = true;
        document.body.appendChild(script);
        script.onload = () => {
            // eslint-disable-next-line no-undef
            if (IVSPlayer.isPlayerSupported) {
                // eslint-disable-next-line no-undef
                const player = IVSPlayer.create();
                // eslint-disable-next-line no-undef
                player.attachHTMLVideoElement(document.getElementById('video-player'));
                player.addEventListener("PlayerTextMetadataCue", (cue) => {
                    let q = JSON.parse(cue.text);
                    console.log('player cue: ', cue);
        
                    // console.log('latency: ',player.getLiveLatency());
                });
                player.addEventListener("Playing", (data) => {
                    if(!!startBroadcast){
                        setStartBroadcast(true);
                    }
                })
                player.addEventListener("PlayerError", (cue) => {
                    console.log('player error: ',cue);
                });
                // player.load(podcast);
                player.load(playbackUrl);
                player.play();
            }
        }
        return () => {
            document.body.removeChild(script);
        }
    },[playbackUrl, startBroadcast])
    const getDeviceWidth = (width) => {
        if(width > 768) return 320;
        // if(width > 768) return 350;
        if(width > 605) return 300;
        if(width >= 550) return 275;
        if(width >= 500) return 250;
        if(width >= 480) return 240;
        if(width >= 435) return 220;
        if(width >= 425) return 210;
        if(width >= 400) return 200;
        if(width < 400) return 180;
    };
    return (
        <div ref={divEl}>
            <video
                id="video-player"
                ref={videoEl}
                playsInline
                autoPlay
                height={getDeviceWidth(window.innerWidth)}
                controls
            />
        </div>
    )

}