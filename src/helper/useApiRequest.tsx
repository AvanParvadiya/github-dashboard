import axios from "axios";
import { useEffect, useState } from "react";

const useApiRequest = (url: string) => {
    const [data, setData] = useState<any>([]);
    const [isLoaded, setIsLoaded] = useState(false);
    const [error, setError] = useState<any>(null);

    useEffect(() => {
        const fetchData = () => {
            axios
                .get(url)
                .then(response => {
                    setIsLoaded(true);
                    setData(response.data);
                })
                .catch(error => {
                    setError(error);
                });
        };
        fetchData();
    }, [url]);

    return { error, isLoaded, data };
}

export default useApiRequest;