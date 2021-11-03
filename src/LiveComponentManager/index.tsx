import React from "react";

export type BaseLiveComponent<
  TComponent extends React.ComponentType<any> = any
> = {
  id: string;
  component: TComponent;
  props?: Omit<React.ComponentProps<TComponent>, "id">;
};

type LiveComponentContextState = {
  stack: BaseLiveComponent[];
};

type LiveComponentContextType = [
  LiveComponentContextState,
  React.Dispatch<React.SetStateAction<LiveComponentContextState>>
];

export const LiveComponentContext = React.createContext<
  LiveComponentContextType
>([
  {
    stack: []
  },
  () => {}
]);

export const LiveComponentProvider = ({
  children
}: {
  children: React.ReactNode;
}) => {
  const stack = [] as BaseLiveComponent[];
  const contextStateHooks = React.useState<LiveComponentContextState>({
    stack
  });
  const [state, updateState] = contextStateHooks;
  const memoizedContextStateHooks = React.useMemo<LiveComponentContextType>(
    () => [state, updateState],
    [state, updateState]
  );

  return (
    <LiveComponentContext.Provider value={memoizedContextStateHooks}>
      {children}
    </LiveComponentContext.Provider>
  );
};

const LiveComponentManager = () => {
  const [contextState] = React.useContext(LiveComponentContext);
  const { stack } = contextState;
  return (
    <div>
      {stack.length === 0 && <p>No live components.</p>}
      {stack.map((liveComponent) => (
        <liveComponent.component
          key={`LiveComponent-${liveComponent.id}`}
          {...liveComponent.props}
        />
      ))}
    </div>
  );
};

export default LiveComponentManager;
