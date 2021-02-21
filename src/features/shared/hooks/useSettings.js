import { useState, useEffect } from "react";

const useSettings = () => {
  const [settings, setSettings] = useState({});

  useEffect(() => {
    if (window._KOMET_REACT_APP) {
      const settingsData = window._KOMET_REACT_APP.kometSettings;
      setSettings(settingsData);
    }
  }, []);

  return { globalSettings: settings };
};

export default useSettings;
