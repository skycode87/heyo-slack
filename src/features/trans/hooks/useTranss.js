import { useState, useEffect } from "react";
import { apiRoutes } from "../../../constants/routes";
import useFetch from "../../shared/hooks/useFetch";
import { getUserId } from "../../../utils/localStorage";

const useTranss = (appId = null, planId = null, userId = null) => {
  const [transs, setTranss] = useState([]);
  const [filters, setFilters] = useState({
    description: "",
    active: "",
    name: "",
    sord: "asc",
    sidx: "date",
    userId,
    appId,
    planId,
    rootId: getUserId(),
  });
  const [pagination, setPagination] = useState({ current: 1, pageSize: 100, total: 0 });
  const { data, loading, refetch } = useFetch(
    apiRoutes.TRANS.LOAD_GRID,
    "POST",
    new URLSearchParams({ ...filters, page: pagination.current, rows: pagination.pageSize })
  );

  useEffect(() => {
    if (data) {
      setTranss(data?.rows);
      setPagination({ ...pagination, current: parseInt(data?.page), total: parseInt(data?.records) });
    }
  }, [data]);

  return { transs, filters, setFilters, pagination, setPagination, loading, refetch };
};

export default useTranss;
