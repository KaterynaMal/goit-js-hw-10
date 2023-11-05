import { fetchBreeds, fetchCatByBreed } from './cat-api';

import SlimSelect from 'slim-select';
import Notiflix from 'notiflix';

const refs = {
  breedSelect: document.querySelector('.breed-select'),
  loader: document.querySelector('.loader'),
  error: document.querySelector('.error'),
  catInfo: document.querySelector('.cat-info'),
};

new SlimSelect('.breed-select');

refs.breedSelect.style.width = '200px';
refs.breedSelect.style.height = '30px';
refs.breedSelect.style.fontSize = '15px';

function hideLoader() {
  refs.loader.style.display = 'none';
  refs.breedSelect.disabled = false;
}

function showloader() {
  refs.loader.style.display = 'block';
  refs.breedSelect.disabled = false;
  refs.catInfo.style.display = 'none';
  refs.error.style.display = 'none';
}

function showError() {
  refs.error.style.display = 'block';
  hideLoader();
}

function showError() {
  Notiflix.Notify.Failure(
    'Oops! Something went wrong. Try reloading the page.'
  );
  hideLoader();
}

fetchBreeds()
  .then(breeds => {
    Breeds(breeds);
  })

  .catch(() => {
    showError();
  })
  .finally(() => {
    hideLoader();
  });

function Breeds(breeds) {
  const options = [];
  breeds.map(({ id, name }) => {
    const option = document.createElement('option');
    option.value = id;
    option.textContent = name;

    return options.push(option);
  });
  refs.breedSelect.append(...options);
}

function renderCatInfo(cat) {
  const markup = cat;
  refs.catInfo.innerHTML = `
                 <img src="${cat.url}" alt="${cat.breeds[0].name}">
                
          <h2>${cat.breeds[0].name}</h2>
          <p><strong>Description:</strong> ${cat.breeds[0].description}</p>
          <p><strong>Temperament:</strong> ${cat.breeds[0].temperament}</p>
          
                `;
}

refs.breedSelect.addEventListener('change', () => {
  showloader();
  const selectedBreedId = refs.breedSelect.value;

  if (selectedBreedId) {
    fetchCatByBreed(selectedBreedId)
      .then(catData => {
        const cat = catData[0];
        renderCatInfo(cat);

        refs.catInfo.style.width = '800px';
        refs.catInfo.style.display = 'block';
      })
      .catch(() => {
        showError();
      })
      .finally(() => {
        hideLoader();
      });
  }
});
