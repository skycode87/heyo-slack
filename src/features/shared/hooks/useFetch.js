import { useState, useEffect } from "react";
import { customFetch } from "../../../helpers/fetch";

const useFetch = (url, method = "GET", body) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [refetchIndex, setRefetchIndex] = useState(0);

  const refetch = () => setRefetchIndex((prevRefetchIndex) => prevRefetchIndex + 1);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);

      try {
        const response = await customFetch(url, { method, body });
        const result = await response.json();

        if (response.ok) {
          if (result.rows) {
            const rows = result?.rows.map((rowData, index) => ({
              ...rowData,
              rowPosition: index,
            }));
            setData({ ...result, rows });
          } else {
            setData(result);
          }
        } else {
          setHasError(true);
          setData(result);
        }
      } catch (error) {
        setHasError(true);
        setErrorMessage(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [refetchIndex]);

  return {
    data,
    loading,
    hasError,
    errorMessage,
    refetch,
  };
};

export default useFetch;
