//var uniqName = getCookie("uniqname");
//console.log(uniqName);
var uniqName = getUniquename();

//uniqName = uniqName.substring(0, uniqName.indexOf("@"));
var grpID;
var grpName;
var count = 1;
var maxSlots;
var interval = null;
var location;

  //Retrieve the group id given a uniqName from cookies
firebase.database().ref('Users/' + uniqName).once('value').then(function(snapshot){
  grpID = snapshot.val().groupId;

  //Retrieve groupName, maxslots, leader from the group id
  firebase.database().ref('Groups/' + grpID).once('value').then(function(snapshot){
    grpName = snapshot.val().GroupName;
    maxSlots = snapshot.val().MaxSlots;
    location = snapshot.val().Located;

    $('#grpName').append(grpName);
    $('#locInput').append(location);
    $('#maxs').append(maxSlots);
    $('.memsList').append('<h3>' + uniqName + '</h3>');
  })
})


$(document).ready(function(){
  setInterval(function(){
    if (count >= maxSlots)
    {
      closeInterval(interval);
    }
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

  $('#deleteGrp').click(function(){
    alert("CLICKED");
    console.log("CLICKED");
    firebase.database().ref('Groups/' + grpID).remove();
    window.location.href = "https://studdy-db032.firebaseapp.com/search.html";
  });
})