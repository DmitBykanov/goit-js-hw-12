import { getImagesByQuery } from './js/pixabay-api.js';
import { createGallery, clearGallery, showLoader, hideLoader } from './js/render-functions.js';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import 'loaders.css/loaders.min.css';

const form = document.querySelector('.form');
const input = form.querySelector('input');

form.addEventListener('submit', onSearch);

function onSearch(event) {
  event.preventDefault();
  const query = input.value.trim();
  if (query === '') {
   input.classList.add('input-error');

    iziToast.warning({
      title: 'Warning',
      message: 'Please enter a search term.',
      position: 'topRight',
    });

    const removeInputError =() => {
      input.classList.remove('input-error');
      input.removeEventListener('focus', removeInputError);
    }
    input.addEventListener('focus', removeInputError);
    return;
  }

  clearGallery();
  showLoader();

  getImagesByQuery(query.toLowerCase())
    .then(data => {
      if (!data.hits || data.hits.length === 0) {
        iziToast.error({
          title: 'No results',
          message: 'Sorry, there are no images matching your search query. Please try again!',
          position: 'topRight',
        });
        return;
      }
      createGallery(data.hits);
    })
    .catch(error => {
      iziToast.error({
        title: 'Error',
        message: 'Something went wrong while fetching images. Please try again later.',
        position: 'topRight',
      });
    })
    .finally(() => {
      hideLoader();
      input.value = '';
    });
}