import { useState, useEffect } from "react";
import axios from "axios";

const URL = 'https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit';

const useAxiosPost = (route,body) => {
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState([]);
    const [error, setError] = useState('');

    useEffect(() => {
        async function postMethod() {
            try {
                const resp = await axios.post(`${URL}${route}`,body);
                if(resp) {
                    setData(resp.data);
                    setLoading(false);
                }
            } catch (err) {
                setError(err);
                setLoading(false);

            }
        }

        postMethod();
    }, [route, body]);

    return [loading,data,error];
};







export { useAxiosPost };


