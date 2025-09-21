import axios from "axios";

const BASE_URL = 'https://pixabay.com/api/';
const API_KEY= '52252669-cc5c6090dc05e341eb544e959';

export function getImagesByQuery(query) {
  return axios.get(BASE_URL, {
    params: {
      key: API_KEY,
      q: query,
      image_type: 'photo',
      orientation: 'horizontal',
      safesearch: true,
    },
  }).then(response => response.data);
}