function changeLanguage(language, event) {
    // Obtener el nombre de la página actual
    let currentPage = window.location.pathname;

    switch (language) {
        case 'en':
            if (!currentPage.includes('-eng.html')) {
                // Redirigir a la página en inglés correspondiente solo si aún no está en inglés
                window.location.href = currentPage.replace(/\.html$/, '-eng.html');
                // Establecer el idioma seleccionado a inglés
                selectedLanguage = 'en';
                // Prevenir el comportamiento predeterminado del enlace
                event.preventDefault();
            }
            break;
        case 'es':
            if (currentPage.includes('-eng.html')) {
                // Redirigir a la página en español correspondiente solo si está en inglés
                window.location.href = currentPage.replace(/\-eng.html$/, '.html');
                // Establecer el idioma seleccionado a español
                selectedLanguage = 'es';
                // Prevenir el comportamiento predeterminado del enlace
                event.preventDefault();
            }
            break;
        default:
            // En caso de un idioma no reconocido, no hacer nada
            return false;
    }

    // Retornar false para prevenir el comportamiento predeterminado del enlace
    return false;
}
