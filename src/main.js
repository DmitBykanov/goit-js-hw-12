import { getImagesByQuery } from './js/pixabay-api.js';
import {
  createGallery,
  clearGallery,
  showLoader,
  hideLoader,
  showLoadMoreButton,
  hideLoadMoreButton,
} from './js/render-functions.js';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import 'loaders.css/loaders.min.css';

const form = document.querySelector('.form');
const input = form.querySelector('input');
const galleryContainer = document.querySelector('.gallery');
const loadMoreBtn = document.getElementById('load-more');

const perPage = 15;
let page = 1;
let currentQuery = '';
let totalHits = 0;

if (loadMoreBtn) loadMoreBtn.classList.add('visually-hidden');

let loader = document.getElementById('loader');
if (!loader) {
  loader = document.createElement('div');
  loader.id = 'loader';
  loader.classList.add('loader', 'visually-hidden');
}
galleryContainer.insertAdjacentElement('afterend', loader);

function markInputError() {
  input.classList.add('input-error');
  input.value = '';
  input.focus();
}

function clearInputError() {
  input.classList.remove('input-error');
}

function showEndOfResults() {
  iziToast.info({
    title: 'Info',
    message: "We're sorry, but you've reached the end of search results.",
    position: 'topRight',
  });
}

form.addEventListener('submit', onSearch);
loadMoreBtn.addEventListener('click', onLoadMore);

async function onSearch(event) {
  event.preventDefault();
  const query = input.value.trim();
  clearInputError();

  if (!query) {
    markInputError();
    iziToast.warning({
      title: 'Warning',
      message: 'Please enter a search term.',
      position: 'topRight',
    });
    return;
  }

  currentQuery = query.toLowerCase();
  page = 1;
  totalHits = 0;

  clearGallery();
  hideLoadMoreButton();
  showLoader();

  try {
    const data = await getImagesByQuery(currentQuery, page, perPage);

    if (!data.hits?.length) {
      markInputError();
      iziToast.error({
        title: 'No results',
        message: 'Sorry, there are no images matching your search query.',
        position: 'topRight',
      });
      return;
    }

    totalHits = data.totalHits || 0;
    createGallery(data.hits);

    if (page * perPage < totalHits) showLoadMoreButton();
    else hideLoadMoreButton();
  } catch (error) {
    console.error(error);
    markInputError();
    iziToast.error({
      title: 'Error',
      message: 'Something went wrong while fetching images. Please try again later.',
      position: 'topRight',
    });
  } finally {
    hideLoader();
  }
}

async function onLoadMore() {
  if (!currentQuery) return;
  page += 1;
  showLoader();

  try {
    const data = await getImagesByQuery(currentQuery, page, perPage);

    if (!data.hits?.length) {
      hideLoadMoreButton();
      showEndOfResults();
      return;
    }

    createGallery(data.hits);

    const items = document.querySelectorAll('.gallery .gallery-item');
    if (items.length > perPage) {
      const { top } = items[items.length - data.hits.length].getBoundingClientRect();
      window.scrollBy({ top: top - 20, behavior: 'smooth' });
    }

    if (page * perPage >= totalHits) {
      hideLoadMoreButton();
      showEndOfResults();
    } else showLoadMoreButton();
  } catch (error) {
    console.error(error);
    page = Math.max(1, page - 1);
    iziToast.error({
      title: 'Error',
      message: 'Something went wrong while fetching more images. Please try again later.',
      position: 'topRight',
    });
  } finally {
    hideLoader();
  }
}
