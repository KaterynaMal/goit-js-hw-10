import axios from 'axios';

const apiKey =
  'live_buNvgYWaSdQqijze0EykdchNvxurexvSmx9PMSWufjOtVuDuKcCcStwJTH6dT5o0';
axios.defaults.headers.common['x-api-key'] = apiKey;

export function fetchBreeds() {
  return axios
    .get('https://api.thecatapi.com/v1/breeds')
    .then((response) => response.data)
    .catch((error) => {
      throw error;
    });
}

export function fetchCatByBreed(breedId) {
  return axios
    .get(`https://api.thecatapi.com/v1/images/search?breed_ids=${breedId}`)
    .then((response) => response.data)
    .catch((error) => {
      throw error;
    });
}
