import { useState, useEffect } from "react";
import { apiRoutes } from "../../../constants/routes";
import useFetch from "../../shared/hooks/useFetch";
import { getUserId } from "../../../utils/localStorage";

const useUsers = () => {
  const [users, setUsers] = useState([]);
  const [filters, setFilters] = useState({
    user: "",
    channel: "",
    sord: "asc",
    sidx: "user",
    // rootId: getUserId(),
  });
  const [pagination, setPagination] = useState({ current: 1, pageSize: 100, total: 0 });
  const { data, loading, refetch } = useFetch(
    apiRoutes.USERS.LOAD_GRID,
    "POST",
    new URLSearchParams({ ...filters, page: pagination.current, rows: pagination.pageSize })
  );

  useEffect(() => {
    if (data) {
      setUsers(data?.rows);
      setPagination({ ...pagination, current: parseInt(data?.page), total: parseInt(data?.records) });
    }
  }, [data]);

  return { users, filters, setFilters, pagination, setPagination, loading, refetch };
};

export default useUsers;
