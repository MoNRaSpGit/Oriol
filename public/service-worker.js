// public/service-worker.js

// Esto se ejecuta en el contexto del Service Worker, NO en tu aplicación
console.log("[Service Worker] Hola desde SW.");

// Evento 'install' (opcional)
self.addEventListener("install", (event) => {
  console.log("[Service Worker] Install event.");
  // Aquí puedes usar event.waitUntil(...) para precache
});

// Evento 'activate' (opcional)
self.addEventListener("activate", (event) => {
  console.log("[Service Worker] Activate event.");
  // Aquí podrías limpiar cachés antiguas, etc.
});

// Evento 'fetch' (opcional)
self.addEventListener("fetch", (event) => {
  // console.log("[Service Worker] Fetch event for ", event.request.url);
  // Podrías interceptar peticiones y servir desde cache
});
