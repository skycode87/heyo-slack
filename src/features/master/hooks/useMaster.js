import { useState, useEffect } from "react";
import { apiRoutes } from "../../../constants/routes";
import useFetch from "../../shared/hooks/useFetch";
import { getUserId } from "../../../utils/localStorage";

const useMasters = () => {
  const [masters, setMasters] = useState([]);
  const [filters, setFilters] = useState({
    name: "",
    value: "",
    rootId: getUserId(),
    description: "",
    fatherId: "",
    _id: "",
    sord: "asc",
    sidx: "name",
  });
  const [pagination, setPagination] = useState({ current: 1, pageSize: 100, total: 0 });

  const { data, loading, refetch } = useFetch(
    apiRoutes.MASTER.LOAD_GRID,
    "POST",
    new URLSearchParams({ ...filters, page: pagination.current, rows: pagination.pageSize })
  );

  useEffect(() => {
    if (data) {
      setMasters(data?.rows);
      setPagination({ ...pagination, current: parseInt(data?.page), total: parseInt(data?.records) });
    }
  }, [data]);

  return { masters, filters, setFilters, pagination, setPagination, loading, refetch };
};

export default useMasters;
