import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

const gallery = document.querySelector('.gallery');
const loader = document.getElementById('loader');
const lightbox = new SimpleLightbox('.gallery a', {
  captionsData: 'alt',
  captionDelay: 250,
});

export function createGallery(images) {
  if (!images?.length) return;

  const markup = images
    .map(img => {
      const {
        webformatURL,
        largeImageURL,
        tags,
        likes,
        views,
        comments,
        downloads,
      } = img;

      return `
        <li class="gallery-item">
          <a class="gallery-link" href="${largeImageURL}">
            <img class="gallery-image" src="${webformatURL}" alt="${tags}" loading="lazy" />
          </a>
          <div class="info">
            <p class="info-item"><b>Likes:</b> ${likes}</p>
            <p class="info-item"><b>Views:</b> ${views}</p>
            <p class="info-item"><b>Comments:</b> ${comments}</p>
            <p class="info-item"><b>Downloads:</b> ${downloads}</p>
          </div>
        </li>
      `;
    })
    .join('');

  gallery.insertAdjacentHTML('beforeend', markup);
  lightbox.refresh();
}

export function clearGallery() {
  gallery.innerHTML = '';
}

export function showLoader() {
  if (!loader) return;

  // 🔧 перемістимо loader після кнопки перед показом
  const btn = document.getElementById('load-more');
  if (btn && btn.nextSibling !== loader) {
    btn.insertAdjacentElement('afterend', loader);
  }

  loader.classList.remove('visually-hidden');
  loader.classList.add('is-loading');
}

export function hideLoader() {
  if (!loader) return;
  loader.classList.add('visually-hidden');
  loader.classList.remove('is-loading');
}

export function showLoadMoreButton() {
  const btn = document.getElementById('load-more');
  if (btn) btn.classList.remove('visually-hidden');
}

export function hideLoadMoreButton() {
  const btn = document.getElementById('load-more');
  if (btn) btn.classList.add('visually-hidden');
}