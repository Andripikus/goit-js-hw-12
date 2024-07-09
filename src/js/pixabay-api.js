import axios from 'axios';

const API_KEY = '44743173-b0da996c95212aae97675bf04';
const BASE_URL = 'https://pixabay.com/api/';

export function fetchImages(query, page = 1, perPage = 12) {
  return axios.get(BASE_URL, {
    params: {
      key: API_KEY,
      q: query,
      image_type: 'photo',
      orientation: 'horizontal',
      safesearch: true,
      page,
      per_page: perPage,
    },
  })
  .then(response => response.data)
  .catch(error => {
    console.error('Error fetching images:', error);
    throw error;
  });
}
