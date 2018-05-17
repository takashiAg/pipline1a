//https://www.instagram.com/oauth/authorize/?client_id=04d70ec29021419eaef7bdada0c31e74&redirect_uri=http://ando.link&response_type=token

var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;


let parameter = {
    "access_token": "7758964315.04d70ec.b5e313ca8b5c4238bec68f9221d4a043"
};
let url = "https://api.instagram.com/v1/users/self/media/recent";

let deviceid = "00e04c02dc8e";
let token = "e49776c341419c97b34243f95dd7d79e24ebe19caa2b99d8b83e37e9d8b8c28a";

//let count_1 = 0;

let callback = data => {

    let count = data["data"][0]["likes"]["count"];
    //console.log(callback.count_1, count)

    if (!("count_1" in callback)) {
        callback.count_1 = 0
    }

    if (count >= callback.count_1 + 1) {
        callback.count_1 += 1
        console.log("動かす")
        move_hand()
    } else if (count < callback.count_1) {
        callback.count_1 = count;
    }

}

let move_hand = () => {

    let xhr = new XMLHttpRequest();
    let cloudbit_url = 'https://api-http.littlebitscloud.cc/v2/devices/' + deviceid + '/output';
    //console.log(cloudbit_url);
    xhr.open('POST', cloudbit_url, true);
    xhr.setRequestHeader('Authorization', 'Bearer ' + token);
    xhr.setRequestHeader('Accept', 'application/vnd.littlebits.v2+json');
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4) {
            if (xhr.status === 200) {
                console.log(xhr.response);
            } else {
                console.log("error\nstatus = " + xhr.status);
            }
        }
    };
    let params = JSON.stringify({"percent": 100, "duration_ms": 1000});
    xhr.send(params);
};

let get_data = () => {
    get(url, parameter, callback)
}


let get = (url, param, callback_function) => {
    let Full_url = url + "?";
    let count = 0;
    for (key in param) {
        if (count != 0) Full_url += "&";
        Full_url += key + "=" + param[key]
    }
    let xhr = new XMLHttpRequest();
    console.log(Full_url)
    xhr.open('GET', Full_url);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4) {
            if (xhr.status === 200) {
                callback_function(JSON.parse(xhr.responseText))
            } else {
                console.log("error\nstatus = " + xhr.status);
            }
        }
    };

    xhr.send();
};
setInterval(get_data, 1000)



