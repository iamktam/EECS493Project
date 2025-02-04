/**
 * Created by zacha on 12/1/2016.
 */
// Initialize Firebase

function loadGAuth() {
    gapi.load('auth2', initSigninV2);
}

function initSigninV2() {
    gapi.auth2.init({
        client_id: "190542841899-6i4jge116n5ck2o5miur8vn3ifbdp27q.apps.googleusercontent.com",
        hosted_domain: "umich.edu"
    }).then(function (GoogleAuth) {
        GoogleAuth.attachClickHandler('signInButton', {}, onSuccess, onFailure)
    });
}

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
            alert("Log in Failure");
        }
    });

    $('#signInButton').hide();
    $('#signOutButton').show();
    $('#start').show();
}

function onFailure() {
    console.error("Google oauth failed.");
    alert("Log in Failure");
}

function logout() {
    firebase.auth().signOut().then(function () {
        var GoogleAuth = gapi.auth2.getAuthInstance();
        GoogleAuth.signOut().then(function () {
            console.log('User signed out.');
            $('#signOutButton').hide();
            $('#signInButton').show();
            $('#start').hide();
        });
    }, function (error) {
        console.error(error);
        alert("Logout Failed");
    });
}

loadGAuth();