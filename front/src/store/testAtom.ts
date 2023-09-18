// import { atom, useAtom } from "jotai";

// // 변수 선언
// // null, undefind, unknewn 불가
// const correctAtom1 = atom("");
// const correctAtom2 = atom(0);
// const correctAtom3 = atom({});
// const correctAtom4 = atom([]);

// // primitive
// const strAtom = atom("hello");
// // writeonly
// const wirteAtom = atom(null, (get, set, update) => {
//   set(strAtom, update);
// });
// // readWrite
// const readWriteAtom = atom(strAtom, (_get, set, update) => {
//   set(strAtom, update);
// });

// // 번수 사용
// const [str, setStr] = useAtom(correctAtom1);
