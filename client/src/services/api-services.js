import axios from 'axios';

class ApiServices {
  _baseUrl = `${process.env.REACT_APP_API_URL}api/`;

  /**
   * 'http://localhost:3004/';
   * change _baseUrl on this url, if you run app with npm run dev and you want to use my fake json-server
   */

  getResource = async (url) => {
    const res = await fetch(`${this._baseUrl}${url}`)
    if (!res.ok) {
      throw new Error(`Could not fetch ${url}, received ${res.status}`);
    }
    const body = res.json();
    return body;
  }

  getGoods = async (sortBy, category, sortOrder, limit) => {
    const { data } = await axios.get(`${this._baseUrl}product`, {
      params: {
        categoryId: category,
        sortOrder: sortOrder,
        sortBy: sortBy,
        limit: limit
      }
    })

    return data.rows;
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

