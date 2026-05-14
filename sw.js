self.addEventListener('install', (event) => {
    self.skipWaiting();
});

self.addEventListener('activate', (event) => {
    event.waitUntil(clients.claim());
});

// Écoute les messages de l'application pour lancer un chrono
self.addEventListener('message', (event) => {
    if (event.data.type === 'START_TIMER') {
        const delay = event.data.delay; // en millisecondes
        
        setTimeout(() => {
            self.registration.showNotification('OneVote', {
                body: 'Le compte à rebours est fini ! C\'est l\'heure de voter.',
                icon: 'icon.png',
                badge: 'icon.png',
                vibrate: [200, 100, 200, 100, 200],
                tag: 'vote-notification',
                renotify: true,
                requireInteraction: true // La notif reste jusqu'à ce que tu cliques
            });
        }, delay);
    }
});

// Quand on clique sur la notification, ça ouvre l'app
self.addEventListener('notificationclick', (event) => {
    event.notification.close();
    event.waitUntil(
        clients.matchAll({ type: 'window' }).then((clientList) => {
            if (clientList.length > 0) return clientList[0].focus();
            return clients.openWindow('./');
        })
    );
});
