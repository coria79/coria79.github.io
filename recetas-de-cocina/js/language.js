let selectedLanguage = 'es';

function changeLanguage(language) {
    // Obtener el nombre de la página actual
    let currentPage = window.location.pathname;

    if (language === 'en') {
        // Redirigir a la página en inglés correspondiente
        window.location.href = currentPage.replace('.html', '-eng.html');
    } else {
        // Redirigir a la versión en español
        window.location.href = currentPage.replace('-eng.html', '.html');
    }

    // Establecer el idioma seleccionado
    selectedLanguage = language;

    // Retornar false para prevenir el comportamiento predeterminado del enlace
    return false;
}

// Cargar la página según el idioma seleccionado.
document.addEventListener('DOMContentLoaded', function () {
    if (selectedLanguage === 'en') {
        let currentPage = window.location.pathname;
        if (currentPage.includes('-eng.html')) {
            // Si ya estamos en la versión en inglés, no hace falta redireccionar
            return;
        }
        window.location.href = currentPage.replace('.html', '-eng.html');
    }
});
