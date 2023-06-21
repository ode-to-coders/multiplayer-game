export const registerServiceWorker = async () => {
  window.addEventListener('load', async () => {
    if ('serviceWorker' in navigator) {
      try {
        const registration = await navigator.serviceWorker.register(
          './serviceWorker.ts'
        );
        if (!('Notification' in window)) {
          console.error('This browser does not support desktop notifications');
          return;
        }

        await Notification.requestPermission();

        if (registration.installing) {
          console.log('Service worker installing');
        } else if (registration.waiting) {
          console.log('Service worker installed');
        } else if (registration.active) {
          console.log('Service worker active');
        }
      } catch (error) {
        console.error(`Registration failed with ${error}`);
      }
    }
  });
};
