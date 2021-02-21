import { useState, useEffect } from "react";
import { apiRoutes } from "../../../constants/routes";
import useFetch from "../../shared/hooks/useFetch";

const useOriginRegions = () => {
  const [originRegions, setOriginRegions] = useState([]);
  const { data, loading, refetch } = useFetch(
    apiRoutes.CATEGORIES.GET_ORIGIN_REGIONS,
    "POST",
    new URLSearchParams({ action: "listOriginRegion" })
  );

  useEffect(() => {
    if (data) {
      setOriginRegions(data);
    }
  }, [data]);

  return { originRegions, loading, refetch };
};

export default useOriginRegions;
