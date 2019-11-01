API_KEY = "ODAyYTE2MmYtYzYwMy00YTE5LWE3MjgtZmIxMzgwMDQxNTM4ZjVjODViNzktMmEx_PF84_consumer";

function sendMessage(to, message) {
    fetch("https://api.ciscospark.com/v1/messages", {
        method: 'POST',
        headers: {
            'Authorization': API_KEY,
            'Origin': '127.0.0.1',
        },
        body: {
            "toPersonEmail": to,
            "text": message
        }
    }).then((resp) => {
        console.log(resp.json());
    }).catch((error) => {
        console.log(error);
    });
}

function checkMessages(from) {
    fetch(("https://api.ciscospark.com/v1/messages/direct?"+from), {
        method: 'GET',
        headers: {
            'Authorization': API_KEY,
            'Origin': '127.0.0.1',
        },
    }).then((resp) => {
        console.log(resp.json());
    }).catch((error) => {
        console.log(error);
    });
}


window.onload = () => {
    sendMessage("jameseboy10@gmail.com", "hello james");
    checkMessages("jameseboy10@gmail.com");
}
