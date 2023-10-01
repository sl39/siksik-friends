"use client";

import { useEffect, useRef } from "react";
import { MdMusicNote, MdMusicOff } from "react-icons/md";
import styled from "styled-components";
import { atom, useAtom } from "jotai";

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
`;

const isMusicPlayingAtom = atom(false);

export default function Music() {
  // eslint-disable-next-line no-null/no-null
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isMusicPlaying, setIsMusicPlaying] = useAtom(isMusicPlayingAtom);

  const playAudioOnce = () => {
    // 노래 켬
    if (!audioRef.current) {
      audioRef.current = new Audio();
      audioRef.current.src = "/music/BGM.wav";
      audioRef.current.loop = true;
      audioRef.current.volume = isMusicPlaying ? 0 : 1;
    }

    if (audioRef.current.paused) {
      audioRef.current.play();
      setIsMusicPlaying(true);

      // 클라이언트 사이드에서만 localStorage에 접근
      if (typeof window !== "undefined") {
        localStorage.setItem("isMusicPlaying", String(true));
        document.body.removeEventListener("click", playAudioOnce);
      }
    }
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      document.body.addEventListener("click", playAudioOnce);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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

    // 클라이언트 사이드에서만 localStorage에 접근
    if (typeof window !== "undefined") {
      localStorage.setItem("isMusicPlaying", String(!isMusicPlaying));
    }
  };

  return (
    <MusicContainer>
      <MusicButton onClick={handleClick}>
        {isMusicPlaying ? <MdMusicNote size={48} color="#808080" /> : <MdMusicOff size={48} color="#808080" />}
      </MusicButton>
    </MusicContainer>
  );
}
