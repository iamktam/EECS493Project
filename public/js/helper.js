/**
 * Created by zacha on 12/18/2016.
 */

function getUniquename() {
    var curUser = firebase.auth().currentUser;
    console.log(curUser);
    if (!curUser) {
        return false;
    }
    var email = curUser.email;
    if (!isUmich()) {
        return false;
    }
    return email.substring(0, email.indexOf("@"));

}

function isUmich() {
    var curUser = firebase.auth().currentUser;
    var curEmail = curUser.email;
    var domain = curEmail.replace(/.*@/, "");
    if (domain == "umich.edu") {
        return true;
    }
    else {
        return false;
    }
}
