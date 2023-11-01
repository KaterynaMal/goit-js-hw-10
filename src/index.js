import { fetchBreeds, fetchCatByBreed } from './cat-api';

const refs = {
  selectCats: document.querySelector('.breed-select'),
  loader: document.querySelector('.loader'),
  error: document.querySelector('.error'),
  catInfo: document.querySelector('.cat-info'),
};
