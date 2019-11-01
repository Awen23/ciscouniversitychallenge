var oldcontent = document.getElementsByClassName('content profile');

function showProfile(){
  var newcontent = document.getElementsByClassName('content');
  newcontent[0].style.display = "block";
  newcontent[1].style.display = "none";
  newcontent[2].style.display = "none";
}

function showJobs(){
  var newcontent = document.getElementsByClassName('content');
  newcontent[0].style.display = "none";
  newcontent[1].style.display = "block";
  newcontent[2].style.display = "none";
}

function showCourses(){
  var newcontent = document.getElementsByClassName('content');
  newcontent[0].style.display = "none";
  newcontent[1].style.display = "none";
  newcontent[2].style.display = "block";
}
