self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open("clipboard-cache").then((cache) => {
      // Optional: Pre-cache any static assets
    })
  );
});

self.addEventListener("fetch", (event) => {
  // Optional: Handle fetching and caching of other requests
});

self.addEventListener("message", (event) => {
  if (event.data.type === "STORE_CLIPBOARD_TEXT") {
    const { text, key } = event.data.payload;
    const request = new Request(`/clipboard/${key}`);
    event.waitUntil(
      caches.open("clipboard-cache").then((cache) => {
        return cache.put(request, new Response(text));
      })
    );
  }
});
