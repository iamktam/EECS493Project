// Initialize Firebase
var config = {
  apiKey: "AIzaSyAjKAvXi5TOUrAQWmuckPqazaQEP7Yi8rA",
  authDomain: "studdy-db032.firebaseapp.com",
  databaseURL: "https://studdy-db032.firebaseio.com",
  storageBucket: "studdy-db032.appspot.com",
  messagingSenderId: "190542841899"
};

firebase.initializeApp(config);

//Initializes a user (not for updating)
function writeUserData(uniqName, isGL, groupId, classNum) {
  firebase.database().ref('Users/' + uniqName).set({
   	isGroupLeader : isGL,
   	groupId : groupId,
   	classNum: classNum
  });
}

//Initializes a group (not for updating)
function writeGroupData(groupName, description, slots, uniqName, longitude, latitude, location)
{
  var groupRef = firebase.database().ref('Groups/');
  var uniqueGroupID = groupRef.push();
  uniqueGroupID.set({
    GroupName: groupName,
    Description: description,
    MaxSlots: slots,
    Users: [uniqName],
    Longitude: longitude,
    Latitude: latitude,
    Located: location,
    SlotsFilled: 1
  });
  var key = uniqueGroupID.key;
  return key;
}

//Updates users from the JoinMe page. (Sets gL to true, updates groupId)
function updateJoinMeUserData(uniqName, isGL, groupId) {
  firebase.database().ref('Users/' + uniqName).update({
    isGroupLeader : isGL,
    groupId : groupId
  });
}

function addGroupUser(id, user) {
  firebase.database().ref('Groups/' + id).once('value').then(function(snapshot) {
    var group = snapshot.val();
    var curUsers = group.Users;
    for (var i = 0; i < curUsers.length; i++) {
      if (user == curUsers[i]) {
        alert("User is already in group!");
        return;
      }
    }
    if (group.SlotsFilled >= group.MaxSlots) {
      alert("Group is full. Please try another group.");
      return;
    }
    firebase.database().ref('Users/' + user).update({
      groupId : id
    });

    var slots = group.SlotsFilled+1;
    curUsers.push(user);
    console.log(curUsers);
    firebase.database().ref('Groups/' + id).update({
      Users: curUsers,
      SlotsFilled: slots
    }).then(function() {
      location.href="https://studdy-db032.firebaseapp.com/groups.html";
    });
  });
}

//Want to append users to group
/*function appendGroup(uniqName, groupName)
{
  var groupRef = firebase.database().ref('Groups/' + groupName + '/Users');
  groupRef.push({
    Uniqname: uniqName
  })
}*/