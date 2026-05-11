self.addEventListener('notificationclick', function(event) {
    event.notification.close();
    clients.openWindow('https://clemclemant.github.io/');
});
