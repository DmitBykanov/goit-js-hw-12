import axios from "axios";

const BASE_URL = 'https://pixabay.com/api/';
const API_KEY = '52252669-cc5c6090dc05e341eb544e959';

export async function getImagesByQuery(query, page = 1) {
  try {
    const response = await axios.get(BASE_URL, {
      params: {
        key: API_KEY,
        q: query,
        image_type: 'photo',
        orientation: 'horizontal',
        safesearch: true,
        per_page: 15,
        page,
      },
    });

    return response.data;
  } catch (error) {

    throw error;
  }
}