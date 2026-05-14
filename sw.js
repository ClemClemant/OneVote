self.addEventListener('install', (e) => self.skipWaiting());
self.addEventListener('activate', (e) => e.waitUntil(clients.claim()));

self.addEventListener('message', (event) => {
    if (event.data.type === 'START_TIMER') {
        const delay = event.data.delay;
        const label = event.data.label;

        // Le téléphone garde ce chrono en mémoire même écran éteint
        setTimeout(() => {
            self.registration.showNotification('OneVote', {
                body: `Le chrono de ${label} est terminé ! C'est l'heure.`,
                icon: 'icon.png',
                vibrate: [500, 200, 500],
                requireInteraction: true,
                tag: 'vote-' + label // Permet d'avoir plusieurs notifs si plusieurs chronos finissent
            });
        }, delay);
    }
});
