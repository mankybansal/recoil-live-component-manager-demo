import { useCallback, useRef, useState, useEffect } from "react";

import { loadingState } from "./recoilState";
import { useRecoilState } from "recoil";

export * from "./recoilState";

const useSimulatedRequest = () => {
  const [loading, setLoading] = useRecoilState(loadingState);
  const [loadingTime, setLoadingTime] = useState(0);
  const timerRef = useRef<number | null>(null);

  useEffect(() => {
    if (loading) {
      timerRef.current = setInterval(() => {
        setLoadingTime((prev) => {
          if (prev === 0) {
            if (timerRef.current) {
              clearInterval(timerRef.current);
            }
            timerRef.current = null;
            setLoading(false);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
  }, [loading, setLoading]);

  const simulateBackgroundRequest = useCallback(
    (timeout = 5) => {
      setLoading(true);
      setLoadingTime(timeout);
    },
    [setLoading, setLoadingTime]
  );

  return { loading, loadingTime, simulateBackgroundRequest };
};

export default useSimulatedRequest;
