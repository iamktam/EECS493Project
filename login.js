/**
 * Created by zacha on 12/1/2016.
 */
function loadGAuth() {
    gapi.load('auth2', initSigninV2);
}

function initSigninV2() {
    gapi.auth2.init({
        client_id: "422505116773-olhbmj7h3m9depnfbvstf6q50jrauhli.apps.googleusercontent.com",
        hosted_domain: "umich.edu"
    }).then(gapi.signin2.render('signInButton', {
        'scope': 'profile email',
        'width': 240,
        'height': 50,
        'longtitle': true,
        'theme': 'dark',
        'onsuccess': onSuccess,
        'onfailure': onFailure
    }));
}

window.onload = loadGAuth();

function onSuccess(curUser) {
    var credential = firebase.auth.GoogleAuthProvider.credential(curUser.getAuthResponse().id_token);
    firebase.auth().signInWithCredential(credential);
}

function onFailure() {
    console.log("login failure");
}