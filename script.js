function sendMemberProfile() {
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
}
    // $.post(url, data, function(data, status) {
    // 	console.log(`sent ${data} with status ${status}`)
    // })

    // $.ajaxSetup({
    // headers: {
    //     'Content-Type': 'application/json',
    //     'Accept': 'application/json',
    //     'Access-Control-Allow-Headers': 'x-requested-with',
    //     'Access-Control-Allow-Origin': 'True'
    // }
// });
// }
