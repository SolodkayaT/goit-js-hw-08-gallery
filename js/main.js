import images from './gallery-items.js';

const refs = {
  gallery: document.querySelector('.gallery'),
  modal: document.querySelector('.js-lightbox'),
  modalImage: document.querySelector('.lightbox__image'),
  button: document.querySelector('button[data-action="close-lightbox"]'),
  overlay: document.querySelector('.lightbox__content'),
};
refs.gallery.append(...createGallery());
refs.gallery.addEventListener('click', handleShowImage);
refs.button.addEventListener('click', handleCloseModal);
refs.modal.addEventListener('click', overlayCloseModal);
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

function handleShowImage({ target }) {
  if (target.tagName !== 'IMG') return;
  const url = target.dataset.source;
  refs.modal.classList.add('is-open');
  refs.modalImage.src = url;
  window.addEventListener('keydown', handleKeyPress);
  window.addEventListener('keyup', handleNextImage);
  window.addEventListener('keyup', handlePrevImage);
}

function handleCloseModal() {
  refs.modal.classList.remove('is-open');
  refs.modalImage.src = '';
  window.removeEventListener('keydown', handleKeyPress);
}
function overlayCloseModal(event) {
  if (event.target !== refs.overlay) return;
  handleCloseModal();
}
function handleKeyPress(event) {
  if (event.code !== 'Escape') return;
  handleCloseModal();
}
const links = images.map(({ original }) => original);
let index = 0;

function slider(v) {
  index += 1 * v;
  if (index > links.length - 1) {
    index = 0;
  } else if (index < 0) {
    index = links.length - 1;
  }
  refs.modalImage.src = links[index];
}
function handleNextImage(event) {
  if (event.code !== 'ArrowRight') return;
  slider(1);
}
function handlePrevImage(event) {
  if (event.code !== 'ArrowLeft') return;
  slider(-1);
}
