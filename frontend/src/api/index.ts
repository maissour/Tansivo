import axios from "axios";

const instance = axios.create({
    baseURL: 'https://localhost:44326/api',
    withCredentials: true,
    headers: {
        Accept: 'application/json',
        'Content-type': 'application/json'
    }
})

export default instance