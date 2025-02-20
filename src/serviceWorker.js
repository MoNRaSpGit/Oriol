// Este código se basa en el antiguo serviceWorker de Create React App.
// Registra un Service Worker simple para habilitar la instalación de la app como PWA.

export function register() {
  // Verificamos que el navegador soporte Service Workers
  if ("serviceWorker" in navigator) {
    // Esperamos a que cargue la ventana
    window.addEventListener("load", () => {
      // El Service Worker generado por Create React App se publicará en /service-worker.js
      const swUrl = `${process.env.PUBLIC_URL}/service-worker.js`;

      navigator.serviceWorker
        .register(swUrl)
        .then((registration) => {
          console.log("Service Worker registrado:", registration);
        })
        .catch((error) => {
          console.error("Error al registrar Service Worker:", error);
        });
    });
  }
}

export function unregister() {
  if ("serviceWorker" in navigator) {
    navigator.serviceWorker.getRegistrations().then((registrations) => {
      registrations.forEach((registration) => {
        registration.unregister();
      });
    });
  }
}
