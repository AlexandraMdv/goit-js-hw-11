import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import Notiflix from 'notiflix';
import { getImages, incrementPage, resetPage } from './api.js';
import { createMarkup, updateImagesList, clearGallery } from './markup.js';

const form = document.querySelector('.search-form');
const loadMoreBtn = document.querySelector('.load-more');
loadMoreBtn.style.display = 'none';

let currentValue = '';
let lightbox;

// Event Listener for Search
form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const inputValue = e.target.elements.searchQuery.value.trim();
    if (!inputValue) return Notiflix.Notify.warning('Please enter a search term');

    currentValue = inputValue;
    resetPage();
    clearGallery();
    loadMoreBtn.style.display = 'none';

    try {
        const data = await getImages(currentValue);
        if (data && data.hits.length > 0) {
            const markup = data.hits.reduce( (markup, hit) => createMarkup(hit) + markup, '');
            updateImagesList(markup);
            if (data.totalHits > 40) {
                loadMoreBtn.style.display = 'block';
            } 

            
            lightbox = new SimpleLightbox('.gallery a').refresh();
        } else {
            e.target.elements.searchQuery.value = '';
            return Notiflix.Notify.failure('Sorry, there are no images matching your search query. Please try again.');
        }
    } catch (err) {
        onError(err);
    }

    
});

// Event Listener for Load More
loadMoreBtn.addEventListener('click', async () => {
    incrementPage();
    const data = await getImages(currentValue);
    if (data && data.hits.length > 0) {
        const markup = data.hits.map(createMarkup).join('');
        document.querySelector('.gallery').insertAdjacentHTML('beforeend', markup);
        if (data.hits.length < 40) loadMoreBtn.style.display = 'none'; // No more results

        
        lightbox.refresh();
    } else {
        loadMoreBtn.style.display = 'none';
        return Notiflix.Notify.warning("We're sorry, but you've reached the end of search results.");
    }
});

function onError(error) {
    console.error(error);
}
