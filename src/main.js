import { fetchImages } from './js/pixabay-api';
import { renderImages, clearGallery } from './js/render-functions';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const form = document.querySelector('#search-form');
const input = form.querySelector('.form-input');
const loader = document.querySelector('#loader');
const loadMoreBtn = document.querySelector('#load-more');

let currentPage = 1;
let currentQuery = '';
let totalHits = 0;

form.addEventListener('submit', async event => {
  event.preventDefault();
  const query = input.value.trim();
  if (query === '') {
    iziToast.error({
      title: 'Error',
      message: 'Please enter a search query',
      position: 'center',
    });
    return;
  }
  currentQuery = query;
  currentPage = 1;
  clearGallery();
  showLoader();
  loadMoreBtn.style.display = 'none';
  input.value = '';

  try {
    const data = await fetchImages(query, currentPage);
    setTimeout(() => {
      hideLoader();
      if (data.hits.length === 0) {
        iziToast.info({
          title: 'No results',
          message: 'Sorry, there are no images matching your search query. Please try again!',
          position: 'center',
        });
        return;
      }
      totalHits = data.totalHits;
      renderImages(data.hits);
      if (data.hits.length > 0) {
        loadMoreBtn.style.display = 'block';
      }
    }, 2000);
  } catch (error) {
    setTimeout(() => {
      hideLoader();
      iziToast.error({
        title: 'Error',
        message: 'Something went wrong. Please try again later.',
        position: 'center',
      });
    }, 2000);
  }
});

loadMoreBtn.addEventListener('click', async () => {
  currentPage++;
  showLoader();
  loadMoreBtn.style.display = 'none';

  try {
    const data = await fetchImages(currentQuery, currentPage);
    setTimeout(() => {
      hideLoader();
      renderImages(data.hits);
      if (currentPage * 15 >= totalHits) {
        loadMoreBtn.style.display = 'none';
        iziToast.info({
          title: 'End of results',
          message: "We're sorry, but you've reached the end of search results.",
          position: 'center',
        });
      } else {
        loadMoreBtn.style.display = 'block';
      }
      smoothScroll();
    }, 2000);
  } catch (error) {
    setTimeout(() => {
      hideLoader();
      iziToast.error({
        title: 'Error',
        message: 'Something went wrong. Please try again later.',
        position: 'center',
      });
    }, 2000);
  }
});

function showLoader() {
  loader.style.display = 'block';
}

function hideLoader() {
  loader.style.display = 'none';
}

function smoothScroll() {
  const firstCard = document.querySelector('.gallery').firstElementChild;
  if (firstCard) {
    const cardHeight = firstCard.getBoundingClientRect().height;
    window.scrollBy({
      top: cardHeight * 2,
      behavior: 'smooth',
    });
  }
}
