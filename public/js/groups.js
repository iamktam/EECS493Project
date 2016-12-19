//var uniqName = getCookie("uniqname");
//console.log(uniqName);
var uniqName = "kktam";

console.log(uniqName);

//uniqName = uniqName.substring(0, uniqName.indexOf("@"));
var grpID;
var grpName;
var count = 1;
var maxSlots;
var slotsFilled;
var interval = null;
var location;

  //Retrieve the group id given a uniqName from cookies
firebase.database().ref('Users/' + uniqName).once('value').then(function(snapshot){
  grpID = snapshot.val().groupId;

  //Retrieve groupName, maxslots, leader from the group id
  firebase.database().ref('Groups/' + grpID).once('value').then(function(snapshot){
    grpName = snapshot.val().GroupName;
    maxSlots = snapshot.val().MaxSlots;
    //location = snapshot.val().Located;

    $('#grpName').append(grpName);
    //$('#locInput').append(location);
    $('#maxs').append(maxSlots);
    $('.memsList').append('<h3>' + uniqName + '</h3>');
  })
})


$(document).ready(function(){
  setInterval(function(){
    //Retrieve slots filled, leader from the group id
    firebase.database().ref('Groups/' + grpID).once('value').then(function(snapshot){
      count = (snapshot.val().Users).length;
      var members = snapshot.val().Users;
      console.log(count);
      $('#curr').text(count);
      $('.memsList').html('');
      for (i = 0; i < count; i++)
      {
        $('.memsList').append('<h3>' + members[i] + '</h3>');

      }
  })
  }, 5000);

  $('#leaveGrp').click(function(){
    console.log("Leaving Group");
    console.log(grpID);
    console.log(uniqName);
    firebase.database().ref('Groups/' + grpID + '/Users').once('value').then(function(snapshot) {
      var users = snapshot.val();
      var index = users.indexOf(uniqName);
      if (index > -1) {
        users.splice(index, 1);
      }
      console.log(users);
      count = count - 1;

      firebase.database().ref('Groups/' + grpID).update({
        SlotsFilled : count,
        Users: users
      });

      firebase.database().ref('Users/' + uniqName).update({
        groupId: null,
        classNum: null
      });

    });
    window.location.href = "https://studdy-db032.firebaseapp.com/search.html";
  });
})