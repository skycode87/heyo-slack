import { useState, useEffect } from "react";
import { apiRoutes } from "../../../constants/routes";
import useFetch from "../../shared/hooks/useFetch";
import { getUserId } from "../../../utils/localStorage";

const usePlans = () => {
  const [plans, setPlans] = useState([]);
  const [filters, setFilters] = useState({
    description: "",
    active: "",
    name: "",
    sord: "asc",
    sidx: "name",
    rootId: getUserId(),
  });
  const [pagination, setPagination] = useState({ current: 1, pageSize: 100, total: 0 });
  const { data, loading, refetch } = useFetch(
    apiRoutes.PLANS.LOAD_GRID,
    "POST",
    new URLSearchParams({ ...filters, page: pagination.current, rows: pagination.pageSize })
  );

  useEffect(() => {
    if (data) {
      setPlans(data?.rows);
      setPagination({ ...pagination, current: parseInt(data?.page), total: parseInt(data?.records) });
    }
  }, [data]);

  return { plans, filters, setFilters, pagination, setPagination, loading, refetch };
};

export default usePlans;
