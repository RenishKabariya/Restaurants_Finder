if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('./js/sw.js')
    .then(registration => {
      console.log('Registration successful, scope is:', registration.scope);
    })
    .catch(error => {
      console.log('Service worker registration failed, error:', error);
    });
}