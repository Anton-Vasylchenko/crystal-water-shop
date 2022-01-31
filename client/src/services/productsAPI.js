import { $authHost, $host } from './http';

// products
export const createProduct = async (product) => {
    const { data } = await $authHost.post('api/product', product)
    return data
}

export const updateProduct = async (product, id) => {
    const { data } = await $authHost.patch('api/product/' + id, product)
    return data
}

export const deleteProduct = async (id) => {
    const { data } = await $authHost.delete('api/product/' + id)
    return data
}

// categories

export const createCategory = async (category) => {
    const { data } = await $authHost.post('api/category', category)
    return data
}

export const deleteCategory = async (id) => {
    const { data } = await $authHost.delete('api/category/' + id)
    return data
}

export const updateCategory = async (name, id) => {
    const { data } = await $authHost.patch('api/category/' + id, name)
    return data
}

// components

export const updateComponent = async (id, item) => {
    const { data } = await $authHost.patch('api/component/' + id, item)
    return data
}

export const getComponentInfoByName = async (name) => {
    const { data } = await $host.get('api/component/getByName/' + name)
    return data;
}

export const getProductByCatId = async (id) => {
    const { data } = await $host.get('api/product/byCategory/' + id)
    return data;
}

// advantages

export const createAdvantages = async (advantage) => {
    const { data } = await $authHost.post('api/advantages', advantage)
    return data
}

export const deleteAdvantages = async (id) => {
    const { data } = await $authHost.delete('api/advantages/' + id)
    return data
}

export const updateAdvantages = async (id, item) => {
    const { data } = await $authHost.patch('api/advantages/' + id, item)
    return data
}

// orders

export const deleteOrders = async (id) => {
    const { data } = await $authHost.delete('api/order/' + id)
    return data
}