// Import the functions you need from the SDKs you need
const { initializeApp } = require("firebase/app");
const { getStorage } = require("firebase/storage");
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD6JmrA1EuGebh_72fqag3GLLUCqf-yY7w",
  authDomain: "fourways-4ways.firebaseapp.com",
  projectId: "fourways-4ways",
  storageBucket: "fourways-4ways.appspot.com",
  messagingSenderId: "247288921432",
  appId: "1:247288921432:web:09db5ba6250f7dfddff92d",
  measurementId: "G-SJQ0YK6FK2"
};

// Initialize Firebase
exports.app = initializeApp(firebaseConfig);
// Initialize Cloud Storage and get a reference to the service
exports.storage = getStorage(module.app);

