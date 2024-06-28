const butInstall = document.getElementById('buttonInstall');

// Logic for installing the PWA
// TODO: Add an event handler to the `beforeinstallprompt` event
window.addEventListener('beforeinstallprompt', (event) => {

    event.preventDefault();

    window.deferredPrompt = event;

    butInstall.style.display = 'block';


});

// TODO: Implement a click event handler on the `butInstall` element
butInstall.addEventListener('click', async () => {

      // Show the install prompt
      window.deferredPrompt.prompt();

      // Wait for the user to respond to the prompt
      const { outcome } = await window.deferredPrompt.userChoice;

      // Optionally, send analytics event with outcome of user choice
      console.log(`User response to the install prompt: ${outcome}`);

      // Clear the deferredPrompt so it can be garbage collected
      window.deferredPrompt = null;

      // Hide the install button
      butInstall.style.display = 'none';

    // if (window.deferredPrompt) {
    //     window.deferredPrompt.prompt();
    //     const { outcome } = await window.deferredPrompt.userChoice;
    //     console.log(`User response to the install prompt: ${outcome}`);
    //     window.deferredPrompt = null;
    //     butInstall.style.display = 'none';
    // }

});

// TODO: Add an handler for the `appinstalled` event
window.addEventListener('appinstalled', (event) => {
      // Log install to analytics
  console.log('Application Installed!', event);
  // Clear the deferredPrompt so it can be garbage collected
  window.deferredPrompt = null;
});
