/**
 * Created by zacha on 12/1/2016.
 */
// Initialize Firebase

function initFirebase() {
  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyAjKAvXi5TOUrAQWmuckPqazaQEP7Yi8rA",
    authDomain: "studdy-db032.firebaseapp.com",
    databaseURL: "https://studdy-db032.firebaseio.com",
    storageBucket: "studdy-db032.appspot.com",
    messagingSenderId: "190542841899"
  };
  firebase.initializeApp(config);

}

function loadGAuth() {
    gapi.load('auth2', initSigninV2);
}

function initSigninV2() {
    gapi.auth2.init({
        client_id: "422505116773-olhbmj7h3m9depnfbvstf6q50jrauhli.apps.googleusercontent.com",
        hosted_domain: "umich.edu"
    }).then(function (GoogleAuth) {
        GoogleAuth.attachClickHandler('signInButton', {}, onSuccess, onFailure)
    });
}

window.onload = loadGAuth();

function onSuccess(curUser) {
    var credential = firebase.auth.GoogleAuthProvider.credential(curUser.getAuthResponse().id_token);
    firebase.auth().signInWithCredential(credential).catch(function (error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        if (errorCode === 'auth/invalid-custom-token') {
            alert('The token you provided is not valid.');
        } else {
            console.error(error);
        }
    });
    $('#signInButton').hide();
    $('#signOutButton').show();
}

function onFailure() {
    console.log("login failure");
}

function logout() {
    firebase.auth().signOut().then(function () {
        var GoogleAuth = gapi.auth2.getAuthInstance();
        GoogleAuth.signOut().then(function () {
            console.log('User signed out.');
            $('#signOutButton').hide();
            $('#signInButton').show();
        });
    }, function (error) {
        console.log('sign out error')
    });
}

initFirebase();