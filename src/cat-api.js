import axios from 'axios';

const apiKey =
  'live_buNvgYWaSdQqijze0EykdchNvxurexvSmx9PMSWufjOtVuDuKcCcStwJTH6dT5o0';
axios.defaults.headers.common['x-api-key'] = apiKey;
axios.defaults.baseURL = 'https://api.thecatapi.com/v1/';

export function fetchBreeds() {
  return axios
    .get('breeds')

    .then(response => response.data);
}

export function fetchCatByBreed(breedId) {
  return axios
    .get(`images/search?breed_ids=${breedId}`)
    .then(response => response.data);
}
