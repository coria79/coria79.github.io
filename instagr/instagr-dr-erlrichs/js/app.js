/*
  INSTAGR - contenido editable
  Para reemplazar imágenes, coloca tus archivos dentro de assets/img/
  y cambia el valor de "src" en cada publicación.
*/

const posts = [
  {
    id: 1,
    src: "assets/img/placeholder-01.jpg",
    alt: "Imagen pendiente de reemplazo 1",
    location: "Milano, Italia",
    likes: 128,
    date: "6 de junio de 2026",
    comments: [
      { user: "instagr.profile", text: "Primera publicación cargada manualmente." },
      { user: "matias", text: "Luego reemplazo este espacio con una imagen real." }
    ]
  },
  {
    id: 2,
    src: "assets/img/placeholder-02.jpg",
    alt: "Imagen pendiente de reemplazo 2",
    location: "Roma, Italia",
    likes: 94,
    date: "6 de junio de 2026",
    comments: [
      { user: "instagr.profile", text: "Comentarios hardcodeados desde app.js." }
    ]
  },
  {
    id: 3,
    src: "assets/img/placeholder-03.jpg",
    alt: "Imagen pendiente de reemplazo 3",
    location: "Torino, Italia",
    likes: 207,
    date: "6 de junio de 2026",
    comments: [
      { user: "instagr.profile", text: "La grilla mantiene 3 imágenes por fila en escritorio." }
    ]
  },
  {
    id: 4,
    src: "assets/img/placeholder-04.jpg",
    alt: "Imagen pendiente de reemplazo 4",
    location: "Sicilia, Italia",
    likes: 63,
    date: "6 de junio de 2026",
    comments: [
      { user: "instagr.profile", text: "Puedes agregar más objetos a este array para sumar publicaciones." }
    ]
  },
  {
    id: 5,
    src: "assets/img/placeholder-05.jpg",
    alt: "Imagen pendiente de reemplazo 5",
    location: "Catania, Italia",
    likes: 172,
    date: "6 de junio de 2026",
    comments: [
      { user: "instagr.profile", text: "El visor muestra la imagen completa sin recortarla." }
    ]
  },
  {
    id: 6,
    src: "assets/img/placeholder-06.jpg",
    alt: "Imagen pendiente de reemplazo 6",
    location: "Palermo, Italia",
    likes: 81,
    date: "6 de junio de 2026",
    comments: [
      { user: "instagr.profile", text: "Likes simulados, no se guardan dinámicamente." }
    ]
  },
  {
    id: 7,
    src: "assets/img/placeholder-07.jpg",
    alt: "Imagen pendiente de reemplazo 7",
    location: "Italia",
    likes: 145,
    date: "6 de junio de 2026",
    comments: [
      { user: "instagr.profile", text: "Publicación de ejemplo número 7." }
    ]
  },
  {
    id: 8,
    src: "assets/img/placeholder-08.jpg",
    alt: "Imagen pendiente de reemplazo 8",
    location: "Italia",
    likes: 51,
    date: "6 de junio de 2026",
    comments: [
      { user: "instagr.profile", text: "Publicación de ejemplo número 8." }
    ]
  },
  {
    id: 9,
    src: "assets/img/placeholder-09.jpg",
    alt: "Imagen pendiente de reemplazo 9",
    location: "Italia",
    likes: 319,
    date: "6 de junio de 2026",
    comments: [
      { user: "instagr.profile", text: "Publicación de ejemplo número 9." }
    ]
  },
    {
    id: 10,
    src: "assets/img/placeholder-10.jpg",
    alt: "Imagen pendiente de reemplazo 10",
    location: "Italia",
    likes: 319,
    date: "6 de junio de 2026",
    comments: [
      { user: "instagr.profile", text: "Publicación de ejemplo número 10." }
    ]
  },
    {
    id: 11,
    src: "assets/img/placeholder-11.jpg",
    alt: "Imagen pendiente de reemplazo 11",
    location: "Italia",
    likes: 319,
    date: "6 de junio de 2026",
    comments: [
      { user: "instagr.profile", text: "Publicación de ejemplo número 11." }
    ]
  },
    {
    id: 12,
    src: "assets/img/placeholder-12.jpg",
    alt: "Imagen pendiente de reemplazo 12",
    location: "Italia",
    likes: 319,
    date: "6 de junio de 2026",
    comments: [
      { user: "instagr.profile", text: "Publicación de ejemplo número 12." }
    ]
  }
];

const gallery = document.getElementById("gallery");
const postCount = document.getElementById("postCount");
const modal = document.getElementById("modal");
const modalClose = document.getElementById("modalClose");
const modalImage = document.getElementById("modalImage");
const modalAuthor = document.getElementById("modalAuthor");
const modalLocation = document.getElementById("modalLocation");
const modalComments = document.getElementById("modalComments");
const modalLikes = document.getElementById("modalLikes");
const modalDate = document.getElementById("modalDate");

function renderGallery() {
  postCount.textContent = posts.length;

  posts.forEach((post) => {
    const button = document.createElement("button");
    button.className = "gallery__item";
    button.type = "button";
    button.setAttribute("aria-label", `Abrir publicación ${post.id}`);

    button.innerHTML = `
      <img src="${post.src}" alt="${post.alt}">
      <span class="gallery__overlay">
        <span>♡ ${post.likes}</span>
        <span>⌁ ${post.comments.length}</span>
      </span>
    `;

    button.addEventListener("click", () => openPost(post));
    gallery.appendChild(button);
  });
}

function openPost(post) {
  modalImage.src = post.src;
  modalImage.alt = post.alt;
  modalAuthor.textContent = "instagr.profile";
  modalLocation.textContent = post.location;
  modalLikes.textContent = post.likes;
  modalDate.textContent = post.date;
  modalComments.innerHTML = "";

  post.comments.forEach((comment) => {
    const paragraph = document.createElement("p");
    paragraph.className = "comment";
    paragraph.innerHTML = `<strong>${comment.user}</strong>${comment.text}`;
    modalComments.appendChild(paragraph);
  });

  modal.classList.add("is-open");
  modal.setAttribute("aria-hidden", "false");
  document.body.style.overflow = "hidden";
}

function closePost() {
  modal.classList.remove("is-open");
  modal.setAttribute("aria-hidden", "true");
  document.body.style.overflow = "";
  modalImage.src = "";
}

modalClose.addEventListener("click", closePost);

modal.addEventListener("click", (event) => {
  if (event.target === modal) {
    closePost();
  }
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && modal.classList.contains("is-open")) {
    closePost();
  }
});

renderGallery();
