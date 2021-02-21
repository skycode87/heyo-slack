import { useState, useEffect } from "react";
import { apiRoutes } from "../../../constants/routes";
import useFetch from "../../shared/hooks/useFetch";
import { getUserId } from "../../../utils/localStorage";

const useGuests = (userId = null) => {
  const [guests, setGuests] = useState([]);
  const [filters, setFilters] = useState({
    role: "",
    email: "",
    nombre: "",
    firstname: "",
    lastname: "",
    sord: "asc",
    sidx: "email",
    userId,
    rootId: getUserId(),
  });
  const [pagination, setPagination] = useState({ current: 1, pageSize: 100, total: 0 });
  const { data, loading, refetch } = useFetch(
    apiRoutes.GUESTS.LOAD_GRID,
    "POST",
    new URLSearchParams({ ...filters, page: pagination.current, rows: pagination.pageSize })
  );

  useEffect(() => {
    if (data) {
      setGuests(data?.rows);
      setPagination({ ...pagination, current: parseInt(data?.page), total: parseInt(data?.records) });
    }
  }, [data]);

  return { guests, filters, setFilters, pagination, setPagination, loading, refetch };
};

export default useGuests;
