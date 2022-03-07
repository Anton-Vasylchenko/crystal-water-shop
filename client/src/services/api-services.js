import axios from 'axios';

class ApiServices {
  _baseUrl = process.env.NODE_ENV === 'production' ? 'api/' : `${process.env.REACT_APP_API_URL}api/`;

  getResource = async (url) => {
    const res = await fetch(`${this._baseUrl}${url}`)
    if (!res.ok) {
      throw new Error(`Could not fetch ${url}, received ${res.status}`);
    }
    const body = res.json();
    return body;
  }

  getOrders = async (page, limit, userId) => {
    const { data } = await axios.get(`${this._baseUrl}order`, {
      params: {
        userId,
        limit,
        page
      }
    })

    return data;
  }

  getOrdersItems = async (orderId) => {
    const { data } = await axios.get(`${this._baseUrl}order/items`, {
      params: {
        orderId: orderId
      }
    });
    return data;
  }

  getUsers = async (limit, page) => {
    const { data } = await axios.get(`${this._baseUrl}user`, {
      params: {
        limit: limit,
        page: page
      }
    })

    return data;
  }

  getProductByCatId = async (catId) => {
    const { data } = await axios.get(`${this._baseUrl}product/byCategory/${catId}`)
    return data;
  }

  getShopItemById = async (id) => {
    const { data } = await axios.get(`${this._baseUrl}product/${id}`)
    return data;
  }

  getShopCategories = async () => {
    const items = await this.getResource(`category`);
    return items;
  }

  getAdvantages = async () => {
    const items = await this.getResource(`advantages`);
    return items;
  }

}

const apiServices = new ApiServices();

export default apiServices;

