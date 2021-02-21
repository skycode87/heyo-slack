import { useState, useEffect } from "react";
import { apiRoutes } from "../../../constants/routes";
import useFetch from "../../shared/hooks/useFetch";

const useCategories = () => {
  const [categories, setCategories] = useState([]);
  const [filters, setFilters] = useState({
    name: "",
    division: "",
    active: "",
    kometCodeStatus: "",
    sord: "asc",
    sidx: "name",
  });
  const [pagination, setPagination] = useState({ current: 1, pageSize: 100, total: 0 });
  const { data, loading, refetch } = useFetch(
    apiRoutes.CATEGORIES.LOAD_GRID,
    "POST",
    new URLSearchParams({ ...filters, page: pagination.current, rows: pagination.pageSize })
  );

  useEffect(() => {
    if (data) {
      setCategories(data?.rows);
      setPagination({ ...pagination, current: parseInt(data?.page), total: parseInt(data?.records) });
    }
  }, [data]);

  return { categories, filters, setFilters, pagination, setPagination, loading, refetch };
};

export default useCategories;
