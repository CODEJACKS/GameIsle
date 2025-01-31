# Code Citations

## License: unknown
https://github.com/OfirApps/files/tree/58995ee0e6b21b74139a002fa94d15e14a52aae7/dafdefano.html

```
></div>
    <script>
      var content = document.getElementById("container");
      content.style.display="none";
      setTimeout(function(){
        content.style.display="block";
      }, 5000);
    </script>
```


## License: unknown
https://github.com/shaikhshoieb22/itm-pathways/tree/51a7cc09cd09bdf2173a0fc405eca8150c4ab92c/service-worker.js

```
.js
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open('my-cache').then((cache) => {
      return cache.addAll([
        '/',
        '/index.html'
```


## License: unknown
https://github.com/michaelsatumba/helloWorldPWA/tree/c0e61653ebdd6ac33e31899fed1413fe009fb8b6/service-worker.js

```
(event) => {
  event.waitUntil(
    caches.open('my-cache').then((cache) => {
      return cache.addAll([
        '/',
        '/index.html',
        '/styles.css',
        '/
```


## License: unknown
https://github.com/lyd1040/UNIVERSITY/tree/25cc1490c35cca561507f9b67eda524a98f7aa5f/service-worker.js

```
waitUntil(
    caches.open('my-cache').then((cache) => {
      return cache.addAll([
        '/',
        '/index.html',
        '/styles.css',
        '/script.js',
        '/images
```


## License: unknown
https://github.com/Shreedhar03/UrbanCart/tree/ab97e808a64a8c628003dd3875d59b333dcbd4f5/client/public/service-worker.js

```
);
    })
  );
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request);
```

