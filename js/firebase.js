// Initialize Firebase
var config = {
apiKey: "AIzaSyAjKAvXi5TOUrAQWmuckPqazaQEP7Yi8rA",
authDomain: "studdy-db032.firebaseapp.com",
databaseURL: "https://studdy-db032.firebaseio.com",
storageBucket: "studdy-db032.appspot.com",
messagingSenderId: "190542841899"
};
firebase.initializeApp(config);

function writeUserData(uniqName, email, isGL, groupId, approvalReq, classNum, location, description, longitude, latitude, maxSlots, slotsFilled) {
  firebase.database().ref('Users/' + uniqName).set({
    email: email,
   	isGroupLeader : isGL,
   	groupId : groupId,
   	approval : approvalReq,
   	classNum: classNum,
   	locationName : location,
   	description : description,
   	longitude : longitude,
   	latitude : latitude,
   	maxSlots : maxSlots,
   	slotsFilled : slotsFilled
  });
}