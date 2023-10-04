import { atom } from "jotai";
import type { RoomInfo } from "@/types";

export const roomAtom = atom<RoomInfo>({
  title: "방제목",
  count: 10,
  countProblem: 2,
  type: "경제",
  countTimer: 4,
});

export const timerEndedAtom = atom(false);
export const resetTimerAtom = atom(true);
