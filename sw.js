self.addEventListener('message', event => {
    if (event.data.type === 'SCHEDULE_NOTIFICATION') {
        const { id, delay } = event.data;

        // On utilise un setTimeout ici. 
        // Note : Sur certains mobiles, le SW peut être tué si le délai est trop long (>5-10 min).
        // Pour des délais de plusieurs heures, seule une API Push (serveur) est 100% garantie.
        setTimeout(() => {
            self.registration.showNotification("VOTE DISPONIBLE", {
                body: "Le Site " + id + " est prêt !",
                icon: "icon.png", // Assure-toi d'avoir une icône locale
                vibrate: [300, 100, 300],
                requireInteraction: true,
                tag: 'vote-' + id,
                renotify: true
            });
        }, delay);
    }
});

self.addEventListener('notificationclick', function(event) {
    event.notification.close();
    event.waitUntil(
        clients.openWindow('https://clemclemant.github.io/')
    );
});
