const buttons = document.querySelectorAll(".primary-btn, .secondary-btn");
buttons.forEach((button) => {
  button.addEventListener("click", () => {
    const original = button.textContent;
    button.textContent = button.classList.contains("primary-btn")
      ? "Compra simulada iniciada"
      : "Producto agregado";
    setTimeout(() => {
      button.textContent = original;
    }, 1800);
  });
});

const thumbs = document.querySelectorAll(".thumb");
thumbs.forEach((thumb) => {
  thumb.addEventListener("click", () => {
    thumbs.forEach((item) => item.classList.remove("is-active"));
    thumb.classList.add("is-active");
  });
});
