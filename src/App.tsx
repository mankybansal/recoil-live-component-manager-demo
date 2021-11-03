import React from "react";

import { RecoilRoot } from "recoil";

import LiveComponentManager, { LiveComponentProvider } from "./LiveComponentManager";
import RestOfApp from "./RestOfApp";

import styled from "@emotion/styled";

import "./styles.css";

const Container = styled.div`
  border: 3px solid black;
  margin-bottom: 8px;
  padding: 8px;
`;

const App = () => (
  <RecoilRoot>
    <div className="App">
      <h1>Recoil Demo</h1>
      <p>
        <b>RestOfApp</b> & <b>LiveComponentManager</b> don't share a react context or global react
        state.
      </p>
      <LiveComponentProvider>
        <Container>
          <h3>RestOfApp</h3>
          <RestOfApp />
        </Container>
        <Container>
          <h3>LiveComponentManager</h3>
          <LiveComponentManager />
        </Container>
      </LiveComponentProvider>
    </div>
  </RecoilRoot>
);

export default App;
