API_KEY = "Bearer ODAyYTE2MmYtYzYwMy00YTE5LWE3MjgtZmIxMzgwMDQxNTM4ZjVjODViNzktMmEx_PF84_consumer";

function sendMessage(to, message) {
    data = {
        "toPersonEmail": to,
        "text": message
      }
    fetch("https://api.ciscospark.com/v1/messages", {
        method: 'POST',
        headers: {
            'Authorization': API_KEY,
            'Content-Type': "application/json"
        },
        body: JSON.stringify(data)
    }).then((resp) => {
        return resp.json();
    }).then((json) => {
        console.log(json);
    }).catch((error) => {
        console.log(error);
    });
}

function checkMessages(from) {
    fetch(("https://api.ciscospark.com/v1/messages/direct?personEmail=" + from), {
        method: 'GET',
        headers: {
            'Authorization': API_KEY,
            'Content-type': 'application/json'
        },
    }).then((resp) => {
        return resp.json();
    }).then((json) => {
        console.log(json);
    }).catch((error) => {
        console.log(error);
    });
}


window.onload = () => {
    sendMessage("jameseboy10@gmail.com", "hello james");
    checkMessages("jameseboy10@gmail.com");
}
