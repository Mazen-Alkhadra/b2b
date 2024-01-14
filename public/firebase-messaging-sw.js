importScripts("https://www.gstatic.com/firebasejs/9.10.0/firebase-app-compat.js");
importScripts("https://www.gstatic.com/firebasejs/9.10.0/firebase-messaging-compat.js");

const config = {
    apiKey: "AIzaSyA5muRAFekwDDs2_EutIuKF5QOyTqSt6Ug",
    authDomain: "back2back-bfe1f.firebaseapp.com",
    projectId: "back2back-bfe1f",
    storageBucket: "back2back-bfe1f.appspot.com",
    messagingSenderId: "778086849740",
    appId: "1:778086849740:web:3197f69cc69130d92c7669",
    measurementId: "G-KLB6VCRG5N"
};

firebase.initializeApp(config);

// create messaging instance
const messaging = firebase.messaging();


messaging.onBackgroundMessage((payload) => {
    const notificationTitle = payload.notification.title;
    const notificationOptions = {
        body: payload.notification.body,
        icon: '/images/logo.svg'
    };
    return self.registration.showNotification(notificationTitle, notificationOptions);
});