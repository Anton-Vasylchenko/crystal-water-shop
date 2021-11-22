import jwt_decode from "jwt-decode";
import { $authHost, $host } from './http';

export const registration = async (email, password, name) => {
    const { data } = await $host.post('api/user/registration', { email, password, name, role: 'USER' })
    localStorage.setItem('token', data.token)
    return jwt_decode(data.token)
}

export const login = async (email, password) => {
    const { data } = await $host.post('api/user/login', { email, password })
    localStorage.setItem('token', data.token)
    return jwt_decode(data.token)
}

export const check = async () => {
    const { data } = await $authHost.get('api/user/auth')
    localStorage.setItem('token', data.token)
    return jwt_decode(data.token)
}

export const changeRole = async (id, userRole) => {
    const role = { role: userRole }
    const { data } = await $host.patch('api/user/' + id, role)
    return data;
}

export const updateUser = async (user, id) => {
    const { data } = await $authHost.patch('api/user/updateUser/' + id, user)
    console.log('23432324');
    localStorage.setItem('token', data.token)
    return jwt_decode(data.token)
}