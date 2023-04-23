import axios from 'axios';

// fetch products from the API

export async function fetchProducts(): Promise<any[]> {
  try {
    const response = await axios.get(`${import.meta.env.VITE_AUTH_URL}/books`);

    if (response.status === 200) {
      return response.data;
    } else {
      throw new Error('Failed to fetch products');
    }
  } catch (error) {
    console.error('Error fetching products:', error);
    return [];
  }
}
