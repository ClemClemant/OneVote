// Écoute les messages venant de index.html
self.addEventListener('message', (event) => {
    if (event.data && event.data.action === 'SCHEDULE_NOTIFICATION') {
        const { siteId, siteName, delay } = event.data;

        // On crée un minuteur dans le Service Worker
        // Attention : Si le délai est très long (ex: 24h), le navigateur 
        // peut suspendre le SW. Mais pour quelques heures, cela fonctionne souvent mieux.
        setTimeout(() => {
            const title = "VOTE DISPONIBLE";
            const options = {
                body: `${siteName} est de nouveau prêt pour un vote !`,
                icon: "https://oneblockfrance.fr/favicon.ico",
                badge: "https://oneblockfrance.fr/favicon.ico",
                vibrate: [200, 100, 200, 100, 400],
                tag: 'vote-' + siteId,
                renotify: true,
                requireInteraction: true, // Garde la notif jusqu'à l'action de l'utilisateur
                data: {
                    url: 'https://clemclemant.github.io/'
                }
            };

            self.registration.showNotification(title, options);
        }, delay);
    }
});

// Gère le clic sur la notification
self.addEventListener('notificationclick', function(event) {
    event.notification.close();
    
    // Récupère l'URL transmise ou utilise l'URL par défaut
    const urlToOpen = event.notification.data.url || 'https://clemclemant.github.io/';

    event.waitUntil(
        clients.matchAll({ type: 'window', includeUncontrolled: true }).then(function(clientList) {
            // Si l'app est déjà ouverte, on se contente de la mettre au premier plan
            for (let i = 0; i < clientList.length; i++) {
                let client = clientList[i];
                if (client.url === urlToOpen && 'focus' in client) {
                    return client.focus();
                }
            }
            // Sinon, on ouvre une nouvelle fenêtre
            if (clients.openWindow) {
                return clients.openWindow(urlToOpen);
            }
        })
    );
});

// Installation et activation immédiate
self.addEventListener('install', (event) => {
    self.skipWaiting();
});

self.addEventListener('activate', (event) => {
    event.waitUntil(clients.claim());
});
