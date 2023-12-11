import axios from "axios";

const axiosInstance = () => {

    const token = localStorage.getItem('token');
    const authToken = `Bearer ${token}`;

    const instance = axios.create({
        baseURL: 'http://localhost:4000/authenticate',
        headers: {
            Authorization: authToken,
        }
    });
    return instance;
}
export default axiosInstance;