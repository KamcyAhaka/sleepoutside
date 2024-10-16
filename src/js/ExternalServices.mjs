import { alertMessage, setLocalStorage } from "./utils.mjs";

const baseURL = import.meta.env.VITE_SERVER_URL

async function convertToJson(res) {
  const jsonResponse = await res.json()
  if (res.ok) {
    return jsonResponse;
  } else {
    throw { name: 'servicesError', message: jsonResponse };
  }
}

export default class ExternalServices {
  async getData(category) {
    const response = await fetch(baseURL + `products/search/${category}`);
    const data = await convertToJson(response);
    return data.Result;
  }
  async findProductById(id) {
    const response = await fetch(baseURL + `product/${id}`);
    const data = await convertToJson(response);
    return data.Result;
  }

  async checkout(checkoutObject) {
    
    const fetchOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(checkoutObject)
    }

    try {
      const response = await fetch(baseURL + `checkout`, fetchOptions);
      await convertToJson(response)
      setLocalStorage('so-cart', [])
      window.location.assign('/checkout/success.html')
    } catch (error) {
      const errorMessages = error.message
      Object.values(errorMessages).forEach(message => {
        alertMessage(message)
      })
    }
  }
}
