function verifyAccount(){
  var info = document.getElementsByClassName('signin');
  var email = info[0].value;
  var password = info[1].value;

  var data = {
    'email': email,
    'password': password
  }

  // document.cookie = "user=joe; pass=mama"
  document.cookie = "username=" + email;

  if(email == 'oliver.redeyoff@gmail.com'){
    location.replace('CustomerPage.html');
  }
  else {
    location.replace('CompanyPage.html');
  }

}
