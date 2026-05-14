self.addEventListener('install', (event) => {
    self.skipWaiting();
});

self.addEventListener('activate', (event) => {
    event.waitUntil(clients.claim());
});

// Écoute le message envoyé par le bouton
self.addEventListener('message', (event) => {
    if (event.data.type === 'START_TIMER') {
        const delay = event.data.delay;

        // On déclenche la notif après le délai, même si l'écran est éteint
        setTimeout(() => {
            self.registration.showNotification('OneVote', {
                body: "C'est l'heure de voter ! Vite !",
                icon: 'icon.png',
                vibrate: [200, 100, 200, 100, 200],
                requireInteraction: true // La notif reste jusqu'à ce que tu cliques
            });
        }, delay);
    }
});

// Quand on clique sur la notification, ça réouvre l'appli
self.addEventListener('notificationclick', (event) => {
    event.notification.close();
    event.waitUntil(
        clients.matchAll({ type: 'window' }).then((clientList) => {
            if (clientList.length > 0) return clientList[0].focus();
            return clients.openWindow('./');
        })
    );
});
