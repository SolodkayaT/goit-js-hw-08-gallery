import images from './gallery-items.js';

const gallery = document.querySelector('.gallery');
const modal = document.querySelector('.js-lightbox');
const modalImage = document.querySelector('.lightbox__image');
const button = document.querySelector('button[data-action="close-lightbox"]');
const overlay = document.querySelector('.lightbox__content');
function createGallery() {
  return images.map(({ preview, original, description }) => {
    const li = document.createElement('li');
    li.insertAdjacentHTML(
      'afterbegin',
      `<li class="gallery__item">
    
      <img
        class="gallery__image"
        src="${preview}"
        data-source="${original}"
        alt="${description}"
      />
  
      <span class="gallery__icon">
        <i class="material-icons">zoom_out_map</i>
      </span>
    </a>
  </li>`,
    );
    return li;
  });
}

gallery.append(...createGallery());

function handleShowImage({ target }) {
  if (target.tagName !== 'IMG') return;
  const url = target.dataset.source;
  modal.classList.add('is-open');
  modalImage.src = url;
  window.addEventListener('keydown', handleKeyPress);
}
function handleCloseModal() {
  modal.classList.remove('is-open');
  modalImage.src = '';
  window.removeEventListener('keydown', handleKeyPress);
}
function overlayCloseModal(event) {
  if (event.target !== overlay) return;
  handleCloseModal();
}
function handleKeyPress(event) {
  if (event.code !== 'Escape') return;
  handleCloseModal();
}
gallery.addEventListener('click', handleShowImage);
button.addEventListener('click', handleCloseModal);
modal.addEventListener('click', overlayCloseModal);
