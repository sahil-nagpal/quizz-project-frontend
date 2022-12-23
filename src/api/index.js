import axios from 'axios';

let apiClient = axios.create({
    baseURL:`http://localhost:8000/api`
})

export default apiClient;

