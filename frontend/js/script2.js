var oldcontent = document.getElementsByClassName('content profile');

function loadName(){
  document.getElementById("username").innerHTML = document.cookie.substr(9);
}

function showProfile() {
  var newcontent = document.getElementsByClassName('content');
  newcontent[0].style.display = "block";
  newcontent[1].style.display = "none";
  newcontent[2].style.display = "none";
}

function showJobs() {
  var newcontent = document.getElementsByClassName('content');
  newcontent[0].style.display = "none";
  newcontent[1].style.display = "block";
  newcontent[2].style.display = "none";
}

function showCourses() {
  var newcontent = document.getElementsByClassName('content');
  newcontent[0].style.display = "none";
  newcontent[1].style.display = "none";
  newcontent[2].style.display = "block";
}

function getJobs() {
  toSend = {
    "employer": "cisco",
    "title": "engineer"
  }

  fetch('https://europe-west2-betacuck.cloudfunctions.net/getJob', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(toSend),
  }).then((resp) => {
    return resp.json();
  }).then((text) => {
    console.log(text);
  }).catch((error) => {
    console.log("error");
    console.log(error);
  });


  // var request = new XMLHttpRequest()
  //
  // request.open('POST', 'https://cors-anywhere.herokuapp.com/https://europe-west2-betacuck.cloudfunctions.net/getJob', true)
  //
  // request.onload = function() {
  //   console.log(request);
  // }
  // request.send(JSON.stringify(toSend))
}
