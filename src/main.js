import { getImagesByQuery } from './js/pixabay-api.js';
import {
  createGallery,
  clearGallery,
  showLoader,
  hideLoader,
  showLoadMoreButton,
  hideLoadMoreButton
} from './js/render-functions.js';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const form = document.querySelector('.form');
const input = form.querySelector('input');
const loadMoreBtn = document.getElementById('load-more');
const perPage = 15;

let page = 1;
let currentQuery = '';
let totalHits = 0;

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
if (loadMoreBtn) loadMoreBtn.addEventListener('click', onLoadMore);

async function onSearch(event) {
  event.preventDefault();
  const query = input.value.trim();
  clearInputError();

  if (!query) {
    markInputError();
    iziToast.warning({ title: 'Warning', message: 'Please enter a search term.', position: 'topRight' });
    return;
  }

  currentQuery = query.toLowerCase();
  page = 1;
  totalHits = 0;

  input.value = '';
  clearGallery();
  hideLoadMoreButton();
  showLoader();

  try {
    const data = await getImagesByQuery(currentQuery, page);

    if (!data.hits?.length) {
      markInputError();
      iziToast.error({ title: 'No results', message: 'Sorry, no images found.', position: 'topRight' });
      return;
    }

    totalHits = data.totalHits;
    createGallery(data.hits);

    if (totalHits > perPage) showLoadMoreButton();
    else hideLoadMoreButton();

  } catch (error) {
    console.error(error);
    hideLoadMoreButton();
    markInputError();
    iziToast.error({ title: 'Error', message: 'Something went wrong. Try again later.', position: 'topRight' });
  } finally {
    hideLoader();
  }
}

async function onLoadMore() {
  if (!currentQuery) return;
  page += 1;
  showLoader();
  loadMoreBtn.disabled = true;

  try {
    const data = await getImagesByQuery(currentQuery, page);

    if (!data.hits?.length) {
      hideLoadMoreButton();
      showEndOfResults();
      return;
    }

    createGallery(data.hits);

    const firstCard = document.querySelector('.gallery .gallery-item');
    if (firstCard) {
      const cardHeight = firstCard.getBoundingClientRect().height;
      window.scrollBy({ top: cardHeight * 2, behavior: 'smooth' });
    }

    if (page * perPage >= totalHits) {
      hideLoadMoreButton();
      showEndOfResults();
    } else {
      showLoadMoreButton();
    }

  } catch (error) {
    console.error(error);
    page = Math.max(1, page - 1);
    iziToast.error({ title: 'Error', message: 'Something went wrong. Try again later.', position: 'topRight' });
  } finally {
    hideLoader();
    loadMoreBtn.disabled = false;
  }
}
