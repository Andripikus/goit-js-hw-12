import { fetchImages } from './js/pixabay-api';
import { renderImages, clearGallery } from './js/render-functions';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const form = document.querySelector('#search-form');
const input = form.querySelector('.form-input');
const loader = document.querySelector('#loader');
let currentPage = 1;
let currentQuery = '';

form.addEventListener('submit', event => {
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
  input.value = '';
  
  fetchImages(query, currentPage)
    .then(data => {
      setTimeout(() => {
        hideLoader();
        if (data.hits.length === 0) {
          iziToast.info({
            title: 'No results',
            message:
              'Sorry, there are no images matching your search query. Please try again!',
            position: 'center',
          });
          return;
        }
        renderImages(data.hits);
      }, 2000);
    })
    .catch(error => {
      setTimeout(() => {
        hideLoader();
        iziToast.error({
          title: 'Error',
          message: 'Something went wrong. Please try again later.',
          position: 'center',
        });
      }, 2000);
    });
});

function showLoader() {
  loader.style.display = 'block';
}

function hideLoader() {
  loader.style.display = 'none';
}
