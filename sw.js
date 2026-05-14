self.addEventListener('install', (event) => {
    self.skipWaiting();
});

self.addEventListener('activate', (event) => {
    event.waitUntil(clients.claim());
});

self.addEventListener('message', (event) => {
    if (event.data.type === 'START_TIMER') {
        const targetTime = Date.now() + event.data.delay;

        // On utilise une boucle plus robuste pour le fond
        const check = () => {
            const now = Date.now();
            if (now >= targetTime) {
                self.registration.showNotification('OneVote', {
                    body: "VOTEZ MAINTENANT !",
                    icon: 'icon.png',
                    vibrate: [500, 110, 500, 110, 450, 110, 200, 110, 170, 40, 450, 110, 200, 110, 170, 40],
                    tag: 'vote-urgent',
                    renotify: true,
                    requireInteraction: true
                });
            } else {
                // On recalcule le délai restant pour "survivre" à la veille
                setTimeout(check, Math.max(targetTime - now, 1000));
            }
        };
        check();
    }
});
