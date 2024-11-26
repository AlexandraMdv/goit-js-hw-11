export function createMarkup({webformatURL, largeImageURL, tags, likes, views, comments, downloads}) {
    return `
    <a href="${largeImageURL}">
        <div class="photo-card">
            <img src="${webformatURL}" alt="${tags}" loading="lazy" />
            <div class="info-item">
                <p class="info-item">
                    <b>Likes ${likes}</b>
                </p>

                <p class="info-item">
                    <b>Views ${views}</b>
                </p>

                <p class="info-item">
                    <b>Comments ${comments}</b>
                </p>

                <p class="info-item">
                    <b>Downloads ${downloads}</b>
                </p>
            </div>
        </div>
    </a>
    `;
}

export function updateImagesList(markup) {
    document.querySelector('.gallery').innerHTML = markup;
}

export function clearGallery() {
    document.querySelector('.gallery').innerHTML = '';
}