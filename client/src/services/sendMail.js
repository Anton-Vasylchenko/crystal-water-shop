import { $host } from './http';

export const sendEmail = async (mailData) => {

    const { data } = await $host.post('api/send/', mailData)
    return data
}