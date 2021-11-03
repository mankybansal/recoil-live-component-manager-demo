import React, { memo } from "react";

import useSimulatedRequest from "../useSimulatedRequest";
import FooLiveComponent from "../FooLiveComponent";

import { LiveComponentContext, BaseLiveComponent } from "../LiveComponentManager";
import { clickTotalState } from "./recoilState";
import { useRecoilState } from "recoil";
import styled from "@emotion/styled";

const StatusText = styled.div`
  font-weight: bold;
  margin-bottom: 8px;
  padding: 8px 0;
`;

const AppReadyText = styled(StatusText)`
  color: green;
`;

const AppRefreshingText = styled(StatusText)`
  color: red;
`;

const ButtonContainer = styled.div`
  margin-bottom: 8px;
  button {
    margin-right: 4px;
  }
`;

const RestOfApp = () => {
  const [contextState, updateContextState] = React.useContext(LiveComponentContext);
  const [counter, setCounter] = React.useState(0);

  const [clickTotal] = useRecoilState(clickTotalState);

  const { loading, loadingTime, simulateBackgroundRequest } = useSimulatedRequest();

  const handleClearClick = React.useCallback(() => {
    setCounter(0);
    updateContextState({ stack: [] });
  }, [setCounter, updateContextState]);

  const handleAddLiveComponentClick = React.useCallback(() => {
    simulateBackgroundRequest();

    const newComponent: BaseLiveComponent = {
      id: `component-${counter}`,
      component: FooLiveComponent,
      props: {
        idx: counter,
        loadingFromProps: loading
      }
    };

    const newContextState = {
      stack: [...contextState.stack, newComponent]
    };
    updateContextState(newContextState);
    setCounter((prev) => prev + 1);
  }, [contextState, updateContextState, loading, counter, simulateBackgroundRequest]);

  const handleRefreshClick = React.useCallback(() => {
    simulateBackgroundRequest();
  }, [simulateBackgroundRequest]);

  return (
    <>
      <p>
        New live components will be passed in a{" "}
        <b>
          <i>loading</i>
        </b>{" "}
        prop at the time of creation in addition to using the same{" "}
        <b>
          <i>loading</i>
        </b>{" "}
        value from recoil.
      </p>
      <ButtonContainer>
        <button onClick={handleAddLiveComponentClick}>Add live component</button>
        <button onClick={handleClearClick}>Clear</button>
        <button onClick={handleRefreshClick}>Refresh app</button>
      </ButtonContainer>
      {loading ? (
        <AppRefreshingText>App will finish refreshing in: {loadingTime}s</AppRefreshingText>
      ) : (
        <AppReadyText>App is ready.</AppReadyText>
      )}
      Global counter: {clickTotal}
    </>
  );
};

export default memo(RestOfApp);
