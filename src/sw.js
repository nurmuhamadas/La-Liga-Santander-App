import messi from './assets/img/messi-ramos.jpg';
import santiago from './assets/img/santiago bernabeu.jpg';
import profile from './assets/img/fotoku.jpg';
import logo from './assets/logo/LaLiga_Santander.svg';
import logoPng from './assets/logo/LaLiga-icon-512.png';
import arrow_back from './assets/icon/arrow_back-24px.svg';

importScripts('https://storage.googleapis.com/workbox-cdn/releases/3.6.3/workbox-sw.js');
if (workbox)
    console.log(`Workbox berhasil dimuat`);
else
    console.log(`Workbox gagal dimuat`);

workbox.precaching.precacheAndRoute([{
        url: '/',
        revision: '1'
    },
    {
        url: '/index.html',
        revision: '1'
    },
    {
        url: '/sw_bundle.js',
        revision: '1'
    },
    {
        url: '/assets/manifest.json',
        revision: '1'
    },
    arrow_back,
    messi,
    santiago,
    logo,
    profile
]);

workbox.routing.registerRoute(
    new RegExp('/src/img/'),
    workbox.strategies.cacheOnly()
);

workbox.routing.registerRoute(
    /\.(?:png|gif|jpg|jpeg|svg)$/,
    workbox.strategies.cacheFirst()
);

workbox.routing.registerRoute(
    '/main_bundle.js',
    workbox.strategies.staleWhileRevalidate({
        cacheName: "main-data"
    })
);

workbox.routing.registerRoute(
    /^https:\/\/api\.football\-data\.org\/v2\//,
    workbox.strategies.staleWhileRevalidate({
        cacheName: "football-data",
        plugins: [
            new workbox.expiration.Plugin({
                maxEntries: 60,
                maxAgeSeconds: 30 * 24 * 60 * 60, // 30 hari
            }),
        ],
    })
);


// PUSH NOTIFICATION
self.addEventListener('push', function (event) {
    let body;
    if (event.data) {
        body = event.data.text();
    } else {
        body = 'Push message no payload';
    }
    const options = {
        body: body,
        icon: logoPng,
        vibrate: [100, 50, 100],
        data: {
            dateOfArrival: Date.now(),
            primaryKey: 1
        }
    };
    event.waitUntil(
        self.registration.showNotification('La Liga Santander', options)
    );
});