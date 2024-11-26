import Notiflix from "notiflix";
const ENDPOINT = 'https://pixabay.com/api/';
const API_KEY = '47297906-a9077d1cc59aa7be5c21f4292';

let querryPage = 1;

const getImages = async query => {

    try {
        const response = await axios.get(`${ENDPOINT}?key=${API_KEY}&q=${query}&image_type=photo&orientation=horizontal&safesearch=true&page=${querryPage}&per_page=40`);

        if(querryPage === 1 && response.data.totalHits > 0) {
            Notiflix.Notify.success(`We found ${response.data.totalHits} images.`)
        }
        return response.data;
     
    } catch (err) {
        console.error(err);
        
    }
 
}

function incrementPage() {
    querryPage += 1;
}

function resetPage() {
    querryPage = 1;
}

export {getImages, incrementPage, resetPage};


// Retrieving photos of "yellow flowers". The search term q needs to be URL encoded:

// https://pixabay.com/api/?key=47297906-a9077d1cc59aa7be5c21f4292&q=yellow+flowers&image_type=photo