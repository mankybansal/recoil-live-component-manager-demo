import React, { memo } from "react";
import styled from "@emotion/styled";

import { useRecoilState } from "recoil";
import { loadingState } from "../useSimulatedRequest";
import { clickTotalState } from "../RestOfApp/recoilState";

const RootContainer = styled.div`
  border-top: 1px solid black;
  padding: 8px 0;
`;

const Red = styled.span`
  color: red;
`;

const Green = styled.span`
  color: green;
`;

const FooLiveComponent = ({
  idx,
  loadingFromProps
}: {
  idx: number;
  loadingFromProps: boolean;
}) => {
  const [loadingFromRecoil] = useRecoilState(loadingState);
  const [counter, setCounter] = React.useState(0);

  const [, setClickTotal] = useRecoilState(clickTotalState);

  return (
    <RootContainer>
      <b>Live component {idx + 1}.</b>
      <br />
      <i>loading</i> — (from Recoil):{" "}
      <b>{loadingFromRecoil ? <Red>True</Red> : <Green>False</Green>}</b>, (from Props):{" "}
      <b>{loadingFromProps ? <Red>True</Red> : <Green>False</Green>}</b>
      <br />
      <br />
      <div>
        Internal component state | Counter: {counter}{" "}
        <button
          onClick={() => {
            setCounter((prev) => prev + 1);
            setClickTotal((prev) => prev + 1);
          }}
        >
          Click me
        </button>
      </div>
    </RootContainer>
  );
};

export default memo(FooLiveComponent);
