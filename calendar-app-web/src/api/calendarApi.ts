import Axios from 'axios';

const calendarApi = Axios.create({
    baseURL: 'http://localhost:4000/api/v1'
});

calendarApi.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
});

export default calendarApi;