const butInstall = document.getElementById('buttonInstall');

// // Logic for installing the PWA
// // TODO: Add an event handler to the `beforeinstallprompt` event
window.addEventListener('beforeinstallprompt', (event) => {

    event.preventDefault();
    window.deferredPrompt = event;
    console.log('beforeinstallprompt event fired');

    butInstall.style.display = 'block';
});

// if (!butInstall) {
//     console.error('buttonInstall element not found.');
// } else {
//     window.addEventListener('beforeinstallprompt', (event) => {
//         window.deferredPrompt = event;
//         console.log('beforeinstallprompt event fired');
//         event.preventDefault();
//         butInstall.style.display = 'block';
        
//     });
// }

// TODO: Implement a click event handler on the `butInstall` element
butInstall.addEventListener('click', async () => {
        if (window.deferredPrompt) {
            console.log('Test 1', window.deferredPrompt);
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
        } else {
            console.error('Prompt not found.');
        }
});

// TODO: Add an handler for the `appinstalled` event
window.addEventListener('appinstalled', (event) => {
      // Log install to analytics
  console.log('Application Installed!', event);
  // Clear the deferredPrompt so it can be garbage collected
  window.deferredPrompt = null;
});
