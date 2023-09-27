"use client";

import { useEffect, useState } from "react";
import styled from "styled-components";

interface ITest {
  width: number;
}

const ProgressBar = styled.div`
  width: 100%;
  height: 30px;
  background-color: #dedede;
  border-radius: 12px;
  font-weight: 600;
  font-size: 0.8rem;
  overflow: hidden;
`;

const Progress = styled.div.attrs<ITest>((props) => ({
  style: {
    width: `${props.width}%`,
  },
}))<ITest>`
  height: 30px;
  padding: 0;
  text-align: center;
  background-color: skyblue;
  color: #111;
  border-radius: 12px;
  float: right;
`;

const CenteredText = styled.p`
  text-align: center;
`;

export default function Timer() {
  const maxItem = 5;
  const [sec, setSec] = useState(maxItem);

  useEffect(() => {
    const interval = setInterval(() => {
      if (sec > 0) {
        setSec(sec - 1);
      } else {
        clearInterval(interval);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [sec]);

  const widthProgress = (sec * 100) / maxItem;
  return (
    <div>
      <div>
        <CenteredText>{sec} 초</CenteredText>
        <ProgressBar>
          <Progress width={widthProgress} />
        </ProgressBar>
      </div>
    </div>
  );
}
