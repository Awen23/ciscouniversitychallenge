function createJob(){

  const data = {
      "Title": document.getElementById('title').value,
      "Location": document.getElementById('location').value,
      "Email": document.getElementById('email').value,
      "skills": document.getElementById('skills').value
  	};

    console.log(data);
    console.log("should be data");

  //location.replace("CompanyPage.html");
}
