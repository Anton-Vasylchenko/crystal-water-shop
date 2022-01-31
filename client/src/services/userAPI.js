import jwt_decode from "jwt-decode";
import { $authHost, $host } from './http';
import { UserRoles } from '../utils/consts';

export const registration = async (email, password, name, phone = null) => {
    console.log(phone)
    const { data } = await $host.post('api/user/registration', { email, password, name, phone, role: UserRoles.USER })
    localStorage.setItem('token', data.token)
    return jwt_decode(data.token)
}

export const login = async (email, password) => {
    const { data } = await $host.post('api/user/login', { email, password })
    localStorage.setItem('token', data.token)
    return jwt_decode(data.token)
}

export const changePassword = async (password, newPassword, id) => {
    const { data } = await $host.post('api/user/changePassword', { password, newPassword, id })
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
    localStorage.setItem('token', data.token)
    return jwt_decode(data.token)
}

export const deleteUser = async (id) => {
    const { data } = await $authHost.delete('api/user/' + id)
    return data
}

export const forgotPassword = async (email) => {
    const { data } = await $authHost.post('api/user/forgotPassword', { email })
    return data
}

export const resetPassword = async (id, token, password) => {
    const { data } = await $authHost.post('api/user/resetPassword/' + id + '/' + token, { password });
    return data
}

