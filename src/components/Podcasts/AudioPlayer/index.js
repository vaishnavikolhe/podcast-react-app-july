import React, { useEffect, useRef, useState } from 'react'
import './styles.css'
import { FaPlay, FaPause, FaVolumeUp, FaVolumeMute } from 'react-icons/fa'
function AudioPlayer({ audioSrc, image }) {
    const [isPlaying, setIsPlaying] = useState(true)
    const [isMute, setIsMute] = useState(false)
    const [duration, setDuration] = useState(0)
    const [currentTime, setCurrentTime] = useState(0)
    const [volume, setVolume] = useState(1)
    const audioRef = useRef();

    const handleDuration = (e) => {
        setCurrentTime(e.target.value)
        audioRef.current.currentTime = e.target.value;

    }
    const handleVolume = (e) => {
        setVolume(e.target.value)
        audioRef.current.volume = e.target.value;
    }
    const togglePlay = () => {
        if (isPlaying) { setIsPlaying(false) } else { setIsPlaying(true) }
    }
    const toggleMute = () => {
        if (isMute) { setIsMute(false); setVolume(1) } else { setIsMute(true); setVolume(0) }
    }
    useEffect(() => {
        if (isPlaying) {
            audioRef.current.play()
        } else {
            audioRef.current.pause()
        }
    }, [isPlaying])

    useEffect(() => {
        if (!isMute) {
            audioRef.current.volume = volume;
        } else {
            audioRef.current.volume = 0;
        }
    }, [isMute])

    useEffect(() => {
        const audio = audioRef.current;
        audio.addEventListener("timeupdate", handleTimeUpdate);
        audio.addEventListener("loadedmetadata", handleLoadedMetadata);
        audio.addEventListener("ended", handleEnded);

        return () => {
            audio.removeEventListener("timeupdate", handleTimeUpdate);
            audio.removeEventListener("loadedmetadata", handleLoadedMetadata);
            audio.removeEventListener("ended", handleEnded);
        }
    }, [])

    const handleTimeUpdate = () => {
        setCurrentTime(audioRef.current.currentTime);
    };
    const handleLoadedMetadata = () => {
        setDuration(audioRef.current.duration);
    };
    const handleEnded = () => {
        setCurrentTime(0);
        setIsPlaying(false);
    }

    const formatTime = (time) => {
        const minutes = Math.floor(time / 60);
        const seconds = Math.floor(time % 60);
        return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
    }
    return (
        <div
            className='custom-audio-player'>
            <img src={image} className='display-image-player' alt="" />
            <audio ref={audioRef} src={audioSrc}></audio>
            <div className='duration-flex'>
                <p className='audio-btn' onClick={togglePlay}>{isPlaying ? <FaPause /> : <FaPlay />}</p>
                <p>{formatTime(currentTime)}</p>
                <input
                    type="range"
                    onChange={handleDuration}
                    className='duration-range'
                    max={duration}
                    step={0.01}
                    value={currentTime}
                />
                <p>{formatTime(duration - currentTime)}</p>
                <p className='audio-btn' onClick={toggleMute}>{!isMute ? <FaVolumeUp /> : <FaVolumeMute />}</p>
                <input
                    type="range"
                    value={volume}
                    onChange={handleVolume}
                    className='volume-range'
                    max={1}
                    min={0}
                    step={0.01}
                />
            </div>
        </div>
    )
}

export default AudioPlayer