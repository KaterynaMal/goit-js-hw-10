import { fetchBreeds, fetchCatByBreed } from './cat-api';

const refs = {
  breedSelect: document.querySelector('.breed-select'),
  loader: document.querySelector('.loader'),
  error: document.querySelector('.error'),
  catInfo: document.querySelector('.cat-info'),
};

function hideLoader() {
  refs.loader.style.display = 'none';
  refs.breedSelect.disabled = false;
}

function showloader() {
  refs.loader.style.display = 'block';
  refs.breedSelect.disabled = true;
  refs.catInfo.style.display = 'none';
  refs.error.style.display = 'none';
}

function showError() {
  refs.error.style.display = 'block';
}

fetchBreeds()
    .then((breeds) => {
        hideLoader();
        breeds.forEach((breed) => {
            const option = document.createElement("option");
            option.value = breed.id;
            option.textContent = breed.name;
            breedSelect.appendChild(option);
        });

    })
        .catch(() => {
            hideLoader();
            showError();
        });

refs.breedSelect.addEventListener("change", () => {
    showloader();
    const selectedBreedId = refs.breedSelect.value;

    if (selectedBreedId) {
        fetchCatByBreed(selectedBreedId)
            .then((catData) => {
                hideLoader;
                const cat = catData[0];
                refs.catInfo.innerHTML = `
                 <img src="${cat.url}" alt="${cat.breeds[0].name}">
          <h2>${cat.breeds[0].name}</h2>
          <p><strong>Description:</strong> ${cat.breeds[0].description}</p>
          <p><strong>Temperament:</strong> ${cat.breeds[0].temperament}</p>
                `;
                refs.catInfo.style.disabled = "block";
            })
            .catch(() => {
                hideLoader();
                showError();
        })
    }
        })