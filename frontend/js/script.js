var oldcontent = document.getElementsByClassName('content profile');
var jobs;
var courses;

function loadName(){
  document.getElementById("username").innerHTML = document.cookie.substr(9);
}

function showProfile(){
  var newcontent = document.getElementsByClassName('content');
  newcontent[0].style.display = "block";
  newcontent[1].style.display = "none";
  newcontent[2].style.display = "none";
  newcontent[3].style.display = "none";
}

function showJobs(){
  var newcontent = document.getElementsByClassName('content');
  newcontent[0].style.display = "none";
  newcontent[1].style.display = "block";
  newcontent[2].style.display = "none";
  newcontent[3].style.display = "none";
}

function showCourses(){
  var newcontent = document.getElementsByClassName('content');
  newcontent[0].style.display = "none";
  newcontent[1].style.display = "none";
  newcontent[2].style.display = "block";
  newcontent[3].style.display = "none";
}

function showChat(){
  var newcontent = document.getElementsByClassName('content');
  newcontent[0].style.display = "none";
  newcontent[1].style.display = "none";
  newcontent[2].style.display = "none";
  newcontent[3].style.display = "block";
}

function getJobs() {
  var request = new XMLHttpRequest()
  request.open('GET', 'https://europe-west2-betacuck.cloudfunctions.net/getAllJobs')
	var data = null;

  request.onload = function () {
    data = JSON.parse(this.response)

    for(i = 1; i<data.length ; i++){
      document.getElementById("jobList").innerHTML += "<div class='joblisting " + i + "' onclick='expandJob(" + i + ")'><h2>" + data[i].job + " at " + data[i].employer + "</h2><p id='jobDescription'>Email : " + data[i].email + "<br>Skills required : " + JSON.stringify(data[i].skills) + "</p><button style='margin-left:40px;'>Apply</button></div>";
    }

  }
  request.send()
}

function getCourses() {
  var request = new XMLHttpRequest()
  request.open('GET', 'https://europe-west2-betacuck.cloudfunctions.net/getCourses')
	var data = null;

  request.onload = function () {
    data = JSON.parse(this.response)

    for(i = 0; i<data.length ; i++){
      if(i!=1){
        document.getElementById("courseList").innerHTML += "<div class='joblisting " + i + "' onclick='expandCourse(" + i + ")'><h2>" + data[i].name + " teaching " + data[i].topic + "</h2><p id='courseDescription'>Link : " + data[i].link +  "<br>Complexity level : " + data[i].level + "</p></div>";
      }
    }


  }
  request.send()
}

function expandJob(num){
  var elem = document.getElementsByClassName(num);
  if(elem[0].style.height == '400px'){
    elem[0].style.height = '50px';
  }
  else {
    elem[0].style.height = '400px';
  }
}

function expandCourse(num){
  var elem = document.getElementsByClassName(num);
  if(elem[0].style.height == '400px'){
    elem[0].style.height = '50px';
  }
  else {
    elem[0].style.height = '400px';
  }
}
