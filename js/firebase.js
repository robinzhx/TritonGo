import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';

var firebaseConfig = {
    apiKey: "AIzaSyBo3tXAIyM0BfZgodUpAWJ2saxoDiDVrtE",
    authDomain: "my-app-15445.firebaseapp.com",
    databaseURL: "https://my-app-15445.firebaseio.com",
    projectId: "my-app-15445",
    storageBucket: "my-app-15445.appspot.com",
    messagingSenderId: "685807203825"
};

firebaseApp = firebase.initializeApp(firebaseConfig);

module.exports = {firebaseApp : firebaseApp};