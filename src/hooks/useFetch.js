import { useState } from "react";

const useFetch = (apiFn, options = {}) => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const execute = async (...args) => {
        try {
            setLoading(true);
            setError(null);
            
            const response = await apiFn(...args, options);
            setData(response);

            return response;
        } catch (err) {
            setError(err?.response?.data?.message || err.message);
            throw err;
        } finally {
            setLoading(false);
        }
    };

    return { data, loading, error, execute };
};

export default useFetch;
