import gallery from './gallery.js'
const galleryEl = document.querySelector('.gallery')
const createsHtmlGallery = createsLandscapePhotos(gallery)
const boxModalOpen = document.querySelector('.lightbox')
const imgModalEl = document.querySelector('.lightbox__image')
const btnEl = document.querySelector('.lightbox__button')
const closeOverlay = document.querySelector('.lightbox__overlay')

galleryEl.insertAdjacentHTML('beforeend',createsHtmlGallery)

function createsLandscapePhotos(colors) {
    return colors.map(({ preview, original, description }) => {
        return `<li class="gallery__item">
    <a
        class="gallery__link"
        href="${original}"
    >
        <img
            
            class="gallery__image"
            
            src="${preview}"
            data-source="${original}"
            alt="${description}"
        />
    </a>
</li> `}).join('')
}

const openImageFn = (e) => {

    e.preventDefault()

    let tegNameEl = e.target.nodeName
    let protoNodeNameEl = e.target.dataset.source
    let altPhotoEl = e.target.alt
    
    if (tegNameEl !=='IMG') {
        return
    }

    boxModalOpen.classList.add("is-open")
    imgModalEl.src = protoNodeNameEl
    imgModalEl.alt = altPhotoEl
    imgModalEl.dataset.index = e.target.dataset.index
    imgModalEl.dataset.index = 0
}

galleryEl.addEventListener('click', openImageFn)

const closeImageFn = () => {
    boxModalOpen.classList.remove("is-open")
    imgModalEl.src = ''
    imgModalEl.alt = ''
}

btnEl.addEventListener('click', closeImageFn)

closeOverlay.addEventListener('click', closeImageFn)

const closeEscapeFn = () => {
    console.log(event.key)
    if (event.key === 'Escape') {
      closeImageFn()
    }
}





window.addEventListener('keydown', (e) => {
    const key = e.code
if (key === 'Escape') {
closeImageFn()
}
if (key === 'ArrowLeft') {
    ArrowLeft()
}
if (key === 'ArrowRight') {
    ArrowRight()
}
})

const setNewSrc = (step, index) => {
    imgModalEl.dataset.index = `${index + step}`
    imgModalEl.src = gallery[index + step].original
}

const ArrowLeft = () => {
    let index = +imgModalEl.dataset.index
    if (index === 0) {
        setNewSrc(0, gallery.length - 1)
        return
    }
    setNewSrc(-1, index)
}

const ArrowRight = () => {
    let index = +imgModalEl.dataset.index
    if (index === gallery.length -1) {
        setNewSrc(0, 0)
        return
    }
    setNewSrc(1, index)
}
