const thumbs = document.querySelectorAll('.thumb');
const mainImage = document.getElementById('mainImage');

thumbs.forEach((thumb) => {
  thumb.addEventListener('click', () => {
    thumbs.forEach((item) => item.classList.remove('active'));
    thumb.classList.add('active');
    const image = thumb.querySelector('img');
    mainImage.src = image.src;
    mainImage.alt = image.alt;
  });
});

document.querySelector('.search').addEventListener('submit', (event) => {
  event.preventDefault();
});
