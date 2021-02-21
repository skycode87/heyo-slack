import { useState, useEffect } from "react";
import { apiRoutes } from "../../../constants/routes";
import useFetch from "../../shared/hooks/useFetch";

const useAssists = () => {
  const [assists, setAssists] = useState([]);
  const [filters, setFilters] = useState({
    type: "",
    location: "",
    userId: "",
  });
  const [pagination, setPagination] = useState({ current: 1, pageSize: 100, total: 0 });
  const { data, loading, refetch } = useFetch(
    apiRoutes.ASSIST.LOAD_GRID,
    "POST",
    new URLSearchParams({ ...filters, page: pagination.current, rows: pagination.pageSize })
  );

  useEffect(() => {
    if (data) {
      setAssists(data?.rows);
      setPagination({ ...pagination, current: parseInt(data?.page), total: parseInt(data?.records) });
    }
  }, [data]);

  return {
    assists,
    filtersAssists: filters,
    setFiltersAssists: setFilters,
    paginationAssists: pagination,
    setPaginationAssists: setPagination,
    loadingAssists: loading,
    refetchAssists: refetch,
  };
};

export default useAssists;
