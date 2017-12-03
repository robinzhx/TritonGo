import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';

var firebaseConfig = {
    apiKey: "AIzaSyBc04CVZWge1WHkw734cXisxLerreJvq7E",
    authDomain: "triton-go.firebaseapp.com",
    databaseURL: "https://triton-go.firebaseio.com",
    projectId: "triton-go",
    storageBucket: "",
    messagingSenderId: "518641838604"
};

firebaseApp = firebase.initializeApp(firebaseConfig);

module.exports = {firebaseApp : firebaseApp};