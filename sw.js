self.addEventListener('install', (e) => self.skipWaiting());
self.addEventListener('activate', (e) => e.waitUntil(clients.claim()));

self.addEventListener('message', (event) => {
    if (event.data.type === 'START_TIMER') {
        const delay = event.data.delay;
        const label = event.data.label;

        setTimeout(() => {
            self.registration.showNotification('OneVote', {
                body: `Le délai pour le vote ${label} est fini ! Relance ton vote.`,
                icon: 'icon.png',
                vibrate: [500, 150, 500],
                tag: 'vote-' + label,
                renotify: true,
                requireInteraction: true
            });
        }, delay);
    }
});

self.addEventListener('notificationclick', (event) => {
    event.notification.close();
    event.waitUntil(
        clients.openWindow('https://oneblockfrance.fr/vote')
    );
});
