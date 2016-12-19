var grpID;
var count = 1;
var slotsFilled;
var interval = null;

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
    });
  }, 5000);

  $('#leaveGrp').click(function(){
    console.log("Leaving Group");
    console.log(grpID);
    console.log(getUniquename());
    firebase.database().ref('Groups/' + grpID + '/Users').once('value').then(function(snapshot) {
      var users = snapshot.val();
      var index = users.indexOf(getUniquename());
      if (index > -1) {
        users.splice(index, 1);
      }
      console.log(users);
      count = count - 1;
      
      if (count <= 0)
      {
        firebase.database.ref('Groups/' + grpID).remove();
      }
      else
      {
        firebase.database().ref('Groups/' + grpID).update({
          SlotsFilled : count,
          Users: users
        });
      }
      firebase.database().ref('Users/' + uniqName).remove();
    });
    window.location.href = "https://studdy-db032.firebaseapp.com/search.html";
  });
  console.log(getUniquename());
  //Retrieve the group id given a getUniquename() from cookies
  setTimeout(function() {
    firebase.database().ref('Users/' + getUniquename()).once('value').then(function(snapshot){
      console.log(snapshot.val());
      grpID = snapshot.val().groupId;

      //Retrieve groupName, maxslots, leader from the group id
      firebase.database().ref('Groups/' + grpID).once('value').then(function(snapshot){
        var grpName = snapshot.val().GroupName;
        var maxSlots = snapshot.val().MaxSlots;
        var location = snapshot.val().Located;

        $('#grpName').append(grpName);
        $('#loci').append(location);
        $('#maxs').append(maxSlots);
        $('.memsList').append('<h3>' + getUniquename() + '</h3>');
      });
    });
  }, 500);
});