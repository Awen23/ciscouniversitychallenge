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
  var request = new XMLHttpRequest()
  request.open('GET', 'https://europe-west2-betacuck.cloudfunctions.net/getAllJobs')
	var data = null;

  console.log("test");
  request.onload = function () {
    console.log("test");
    data = JSON.parse(this.response)
    console.log(data);

    for(i = 1; i<data.length ; i++){
      document.getElementById("jobList").innerHTML += "<div id='joblisting'><h2>" + data[i].job + " at " + data[i].employer + "</h2></div>";
    }

  }
  request.send()
}
