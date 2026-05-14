self.addEventListener('install', (e) => self.skipWaiting());
self.addEventListener('activate', (e) => e.waitUntil(clients.claim()));

// Gestion de la notification en arrière-plan
self.addEventListener('message', (event) => {
    if (event.data.type === 'START_TIMER') {
        const delay = event.data.delay;
        const label = event.data.label;

        setTimeout(() => {
            self.registration.showNotification('OneVote', {
                body: `Le délai pour le vote ${label} est terminé !`,
                icon: 'icon.png',
                vibrate: [500, 110, 500, 110, 450, 110, 200, 110],
                tag: 'vote-' + label,
                renotify: true,
                requireInteraction: true
            });
        }, delay);
    }
});

// Redirection vers le site quand on clique sur la notification
self.addEventListener('notificationclick', (event) => {
    event.notification.close();
    event.waitUntil(
        clients.openWindow('https://oneblockfrance.fr/vote')
    );
});
