importScripts("https://www.gstatic.com/firebasejs/5.9.4/firebase-app.js");
importScripts("https://www.gstatic.com/firebasejs/5.9.4/firebase-messaging.js");

firebase.initializeApp({
  apiKey: "AIzaSyD-qHxuBR9FcFOe3TRKMezxPcKhvO-9PGI",
  authDomain: "vuefiretest-c6e3b.firebaseapp.com",
  databaseURL: "https://vuefiretest-c6e3b.firebaseio.com",
  projectId: "vuefiretest-c6e3b",
  storageBucket: "vuefiretest-c6e3b.appspot.com",
  messagingSenderId: "101818530234",
  appId: "1:101818530234:web:21b6469ad9466113898583",
  measurementId: "G-H311ERVSFJ"
});

const messaging = firebase.messaging();

messaging.setBackgroundMessageHandler(function(payload) {
  const promiseChain = clients
    .matchAll({
      type: "window",
      includeUncontrolled: true
    })
    .then(windowClients => {
      for (let i = 0; i < windowClients.length; i++) {
        const windowClient = windowClients[i];
        windowClient.postMessage(payload);
      }
    })
    .then(() => {
      return registration.showNotification("Welcome sir, jarvis here...");
    });
  return promiseChain;
});

self.addEventListener('notificationclick', function(event) {
  // do what you want
  // ...
});