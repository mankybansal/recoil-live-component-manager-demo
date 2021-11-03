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

const LoadingIndicator = ({ loading }: { loading: boolean }) =>
  loading ? (
    <b>
      true <Red>(Not ready)</Red>
    </b>
  ) : (
    <b>
      false <Green>(Ready)</Green>
    </b>
  );

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
      <i>loading</i> — (from Recoil): <LoadingIndicator loading={loadingFromRecoil} />
      , (from Props): <LoadingIndicator loading={loadingFromProps} />
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
