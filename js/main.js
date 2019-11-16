import images from './gallery-items.js';

const gallery = document.querySelector('.gallery');
const modal = document.querySelector('.js-lightbox');
const modalImage = document.querySelector('.lightbox__image');
const button = document.querySelector('button[data-action="close-lightbox"]');
const overlay = document.querySelector('.lightbox__content');
const links = images.map(({ original }) => original);
console.log(links);
let index = 0;
function slider(v) {
  index += 1 * v;
  if (index > links.length - 1) {
    index = 0;
  } else if (index < 0) {
    index = links.length - 1;
  }
  modalImage.src = links[index];
}
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
function handleNextImage(event) {
  if (event.code !== 'ArrowRight') return;
  slider(1);
}
function handlePrevImage(event) {
  if (event.code !== 'ArrowLeft') return;
  slider(-1);
}
gallery.append(...createGallery());
gallery.addEventListener('click', handleShowImage);
button.addEventListener('click', handleCloseModal);
modal.addEventListener('click', overlayCloseModal);

function handleShowImage({ target }) {
  if (target.tagName !== 'IMG') return;
  const url = target.dataset.source;
  modal.classList.add('is-open');
  modalImage.src = url;
  window.addEventListener('keydown', handleKeyPress);
  window.addEventListener('keyup', handleNextImage);
  window.addEventListener('keyup', handlePrevImage);
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
