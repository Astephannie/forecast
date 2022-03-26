import { useEffect, useState } from "react";

export const useRequest = ({ request, params = {}, lazy = false }) => {
  const [loading, changeLoading] = useState(false);
  const [error, changeError] = useState();
  const [data, changeData] = useState();

  const makeRequest = (values) => {
    changeLoading(true);
    changeError();
    request({ ...params, ...values })
      .then((data) => {
        changeData(data);
      })
      .catch((e) => changeError(e))
      .finally(() => changeLoading(false));
  };

  useEffect(() => {
    if (!lazy) {
      makeRequest();
    }
  }, []);

  return {
    data,
    loading,
    error,
    makeRequest,
  };
};
