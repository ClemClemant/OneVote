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
                body: "C'est l'heure de voter ! Vite !",
                icon: 'icon.png',
                vibrate: [200, 100, 200],
                requireInteraction: true
            });
        }, delay);
    }
});
