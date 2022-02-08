import axios from "axios";

const _baseUrl = process.env.NODE_ENV === 'production' ? '/' : `${process.env.REACT_APP_API_URL}/`;

const $host = axios.create({
    baseURL: _baseUrl
})

const $authHost = axios.create({
    baseURL: _baseUrl
})

const authIterceptor = config => {
    config.headers.authorization = `Bearer ${localStorage.getItem('token')}`
    return config
}

$authHost.interceptors.request.use(authIterceptor)

export {
    $host,
    $authHost
}