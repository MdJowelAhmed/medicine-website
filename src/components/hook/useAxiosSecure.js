import axios from "axios";
import { useNavigate } from "react-router";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";

const axiosSecure = axios.create({
    baseURL:'http://192.168.0.157:5000'
})
const useAxiosSecure = () => {
    const navigate = useNavigate();
     const {  logout } = useContext(AuthContext)

    // request interceptor to add authorization header for every secure call to teh api
    axiosSecure.interceptors.request.use(function (config) {
        const token = localStorage.getItem('accessToken')
        console.log('request stopped by interceptors', token)
        config.headers.Authorization = ` ${token}`;
        return config;
    }, function (error) {
        // Do something with request error
        return Promise.reject(error);
    });


    // intercepts 401 and 403 status
    axiosSecure.interceptors.response.use(function (response) {
        return response;
    }, async (error) => {
        const status = error?.response?.status;
        // console.log(error)
        // console.log('status error in the interceptor', status);
        // for 401 or 403 logout the user and move the user to the login
        if (status === 401 || status === 403) {
            await logout();
            navigate('/login');
        }
        return Promise.reject(error);
    })


    return axiosSecure;
};

export default useAxiosSecure;