function verifyAccount(){
	const data = {
      "name": $('#name').val(),
      "email": $('#email').val(),
      "type": "member",
      "skills": $('#skills').val(),
      "experience": $('#experience').val(),
      "education": $('#education').val()
  	};

    const url = "https://europe-west2-betacuck.cloudfunctions.net/createProfile"


    fetch(url, {
    	method: "POST",
    	body: JSON.stringify(data),
    	headers: {
    		'Content-Type': 'application/json',
    		'Origin': '127.0.0.1'
    	}
    }).then((resp) => {
    	console.log(resp);
    }).catch((error) => {
    	console.log(error);
    });

	location.replace("main.html");

}