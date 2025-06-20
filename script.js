document.addEventListener('DOMContentLoaded', () => {
    const getApodBtn = document.getElementById('getApodBtn');
    const apodTitle = document.getElementById('apod-title');
    const apodDate = document.getElementById('apod-date');
    const apodImage = document.getElementById('apod-image');
    const apodExplanation = document.getElementById('apod-explanation');
    const errorMessage = document.getElementById('error-message');

    // La API de APOD de la NASA tiene un límite de uso sin API Key,
    // pero para fines de demostración, se puede usar sin ella.
    // Si planeas un uso intensivo, obtén una clave en: https://api.nasa.gov/
    const NASA_API_URL = 'https://api.nasa.gov/planetary/apod?api_key=DEMO_KEY'; 
    // 'DEMO_KEY' es proporcionada por la NASA para pruebas.

    getApodBtn.addEventListener('click', async () => {
        // Limpiar resultados anteriores y mensajes de error
        apodTitle.textContent = 'Cargando...';
        apodDate.textContent = '';
        apodImage.src = '';
        apodImage.alt = 'Cargando imagen...';
        apodExplanation.textContent = '';
        errorMessage.textContent = '';

        try {
            // Realizar la solicitud HTTP de forma asíncrona usando fetch
            const response = await fetch(NASA_API_URL);

            // Verificar si la respuesta fue exitosa (código 200)
            if (!response.ok) {
                // Si la respuesta no es OK, lanzamos un error
                throw new Error(`Error al obtener datos: ${response.status} ${response.statusText}`);
            }

            // Convertir la respuesta a JSON de forma asíncrona
            const data = await response.json();

            // Verificar si es un video en lugar de una imagen
            if (data.media_type === 'video') {
                apodImage.style.display = 'none'; // Ocultar el elemento de imagen
                apodExplanation.textContent = 'El APOD de hoy es un video. Puedes verlo en: ' + data.url;
                apodTitle.textContent = data.title;
                apodDate.textContent = `Fecha: ${data.date}`;
            } else {
                apodImage.style.display = 'block'; // Mostrar el elemento de imagen
                // Actualizar los elementos HTML con los datos de la API
                apodTitle.textContent = data.title;
                apodDate.textContent = `Fecha: ${data.date}`;
                apodImage.src = data.url;
                apodImage.alt = data.title;
                apodExplanation.textContent = data.explanation;
            }

        } catch (error) {
            // Capturar y mostrar cualquier error que ocurra
            console.error('Hubo un problema con la operación de fetch:', error);
            errorMessage.textContent = `No se pudo cargar la imagen del día: ${error.message}. Intenta de nuevo más tarde.`;
            apodTitle.textContent = ''; // Limpiar el título de "Cargando..."
            apodImage.alt = 'Error al cargar imagen';
        }
    });

    // Opcional: Cargar la imagen al inicio automáticamente
    getApodBtn.click();
});