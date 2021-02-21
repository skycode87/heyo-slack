import { useState, useEffect } from "react";

const usePageData = () => {
  const [pageData, setPageData] = useState({ settings: {}, initialData: {} });

  useEffect(() => {
    if (window._KOMET_REACT_APP) {
      const pageInformation = window._KOMET_REACT_APP.pageData;
      setPageData({ settings: pageInformation?.settings || {}, initialData: pageInformation?.initialData || {} });
    }
  }, []);

  return { settings: pageData.settings, initialData: pageData.initialData };
};

export default usePageData;
