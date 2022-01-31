import { $host } from './http';

export const sendEmail = async (mailData) => {
    const { data } = await $host.post('api/order/', mailData)
    return data
}