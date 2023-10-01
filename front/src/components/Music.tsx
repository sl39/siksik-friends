"use client";

import { useRef, useState } from "react";
import { MdMusicNote, MdMusicOff } from "react-icons/md";
import styled from "styled-components";

const MusicContainer = styled.div`
  z-index: 90;
  width: 50px;
  height: 50px;
  position: absolute;
  top: 1.5%;
  right: 1.5%;
`;
const MusicButton = styled.button`
  position: relative;
  s
`;
export default function Music() {
  // eslint-disable-next-line no-null/no-null
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isMusicPlaying, setIsMusicPlaying] = useState(localStorage.getItem("isMusicPlaying") === "true");

  const handleClick = () => {
    if (isMusicPlaying) {
      // 노래 끔
      if (audioRef.current) {
        audioRef.current.pause();
      }
    } else {
      // 노래 켬
      if (!audioRef.current) {
        audioRef.current = new Audio();
        audioRef.current.src = "/music/BGM.wav";
        audioRef.current.loop = true;
        audioRef.current.volume = 1;
      }
      audioRef.current.play();
    }
    setIsMusicPlaying(!isMusicPlaying);
    localStorage.setItem("isMusicPlaying", String(!isMusicPlaying));
  };

  return (
    <MusicContainer>
      <MusicButton onClick={handleClick}>
        {isMusicPlaying ? <MdMusicNote size={48} color="#808080" /> : <MdMusicOff size={48} color="#808080" />}
      </MusicButton>
    </MusicContainer>
  );
}
