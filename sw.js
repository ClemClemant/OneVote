self.addEventListener('install', (event) => {
    self.skipWaiting();
});

self.addEventListener('activate', (event) => {
    event.waitUntil(clients.claim());
});

self.addEventListener('message', (event) => {
    if (event.data.type === 'START_TIMER') {
        const delay = event.data.delay;
        setTimeout(() => {
            self.registration.showNotification('OneVote', {
                body: 'Le compte à rebours est fini ! C\'est l\'heure de voter.',
                icon: 'icon.png',
                badge: 'icon.png',
                vibrate: [200, 100, 200, 100, 200],
                tag: 'vote-notification',
                renotify: true,
                requireInteraction: true
            });
        }, delay);
    }
});

self.addEventListener('notificationclick', (event) => {
    event.notification.close();
    event.waitUntil(
        clients.matchAll({ type: 'window' }).then((clientList) => {
            if (clientList.length > 0) return clientList[0].focus();
            return clients.openWindow('./');
        })
    );
});
