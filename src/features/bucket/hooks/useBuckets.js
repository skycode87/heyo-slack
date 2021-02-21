import { useState, useEffect } from "react";
import { apiRoutes } from "../../../constants/routes";
import useFetch from "../../shared/hooks/useFetch";
import { getUserId } from "../../../utils/localStorage";

const useBuckets = (packId = null, planId = null, userId = null) => {
  const [buckets, setBuckets] = useState([]);
  const [filters, setFilters] = useState({
    description: "",
    active: "",
    name: "",
    sord: "asc",
    sidx: "date",
    userId,
    packId,
    planId,
    rootId: getUserId(),
  });
  const [pagination, setPagination] = useState({ current: 1, pageSize: 100, total: 0 });
  const { data, loading, refetch } = useFetch(
    apiRoutes.BUCKET.LOAD_GRID,
    "POST",
    new URLSearchParams({ ...filters, page: pagination.current, rows: pagination.pageSize })
  );

  useEffect(() => {
    if (data) {
      setBuckets(data?.rows);
      setPagination({ ...pagination, current: parseInt(data?.page), total: parseInt(data?.records) });
    }
  }, [data]);

  return { buckets, filters, setFilters, pagination, setPagination, loading, refetch };
};

export default useBuckets;
