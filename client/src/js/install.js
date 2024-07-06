const butInstall = document.getElementById('buttonInstall');

// Logic for installing the PWA
// TODO: Add an event handler to the `beforeinstallprompt` event

window.addEventListener('beforeinstallprompt', (event) => {
    
    window.deferredPrompt = event;
    // event.preventDefault();
    console.log('beforeinstallprompt event fired');

    butInstall.style.display = 'block';
});

//TODO: Implement a click event handler on the `butInstall` element

butInstall.addEventListener('click', async () => {
    const promptEvent = window.deferredPrompt;
  
    if (!promptEvent) {

      console.log('No prompt event!');

      return;
    }
  
    promptEvent.prompt();
  
    window.deferredPrompt = null;
  
    // Hide the install button
    butInstall.style.display = 'none';
  });

// TODO: Add an handler for the `appinstalled` event

window.addEventListener('appinstalled', (event) => {
      // Log install to analytics
  console.log('Application Installed!', event);
  // Clear the deferredPrompt so it can be garbage collected
  window.deferredPrompt = null;
});
