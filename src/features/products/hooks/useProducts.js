import { useState, useEffect } from "react";
import { apiRoutes } from "../../../constants/routes";
import useFetch from "../../shared/hooks/useFetch";

const useProducts = () => {
  const [products, setProducts] = useState([]);
  const [filters, setFilters] = useState({
    kometCodeStatus: "",
    description: "",
    category: "",
    active: 1,
    sord: "asc",
    sidx: "description",
  });

  const [pagination, setPagination] = useState({ current: 1, pageSize: 100, total: 0 });
  const { data, loading, refetch } = useFetch(
    apiRoutes.PRODUCTS.LOAD_GRID,
    "POST",
    new URLSearchParams({ ...filters, page: pagination.current, rows: pagination.pageSize })
  );

  useEffect(() => {
    if (data) {
      setProducts(data?.rows);
      setPagination({ ...pagination, current: parseInt(data?.page), total: parseInt(data?.records) });
    }
  }, [data]);

  return { products, filters, setFilters, pagination, setPagination, loading, refetch };
};

export default useProducts;
