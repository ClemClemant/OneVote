self.addEventListener('message', (event) => {
    if (event.data && event.data.action === 'SCHEDULE_NOTIFICATION') {
        const { siteId, siteName, delay } = event.data;

        // Le setTimeout dans un Service Worker a des limites sur mobile
        // Mais c'est la seule option sans serveur externe.
        setTimeout(() => {
            self.registration.showNotification("VOTE DISPONIBLE", {
                body: siteName + " est prêt !",
                icon: "https://oneblockfrance.fr/favicon.ico",
                vibrate: [200, 100, 200],
                tag: 'vote-' + siteId,
                renotify: true,
                requireInteraction: true
            });
        }, delay);
    }
});

self.addEventListener('notificationclick', (event) => {
    event.notification.close();
    event.waitUntil(
        clients.openWindow('https://clemclemant.github.io/')
    );
});

self.addEventListener('install', () => self.skipWaiting());
self.addEventListener('activate', (event) => event.waitUntil(clients.claim()));
