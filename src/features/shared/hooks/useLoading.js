import { useCallback, useState } from "react";
import Loading from "../components/Loading";
import { loadingMode } from "../components/Loading/constants";

const useLoading = () => {
  const [isLoading, setLoading] = useState(false);
  const [mode, setMode] = useState(loadingMode.COMPLETE);

  const showLoading = useCallback((speed) => {
    setLoading(true);
    setMode(speed || loadingMode.FAST);
  }, []);

  const hideLoading = useCallback(() => {
    setMode(loadingMode.COMPLETE);
    setTimeout(() => setLoading(false), 500);
  }, []);

  return { loader: isLoading ? <Loading mode={mode} /> : null, showLoading, hideLoading };
};

export default useLoading;
