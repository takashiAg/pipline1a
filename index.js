//https://www.instagram.com/oauth/authorize/?client_id=04d70ec29021419eaef7bdada0c31e74&redirect_uri=http://ando.link&response_type=token


let parameter = {
    "access_token": "7758964315.04d70ec.b5e313ca8b5c4238bec68f9221d4a043"
}
let url = "https://api.instagram.com/v1/users/self/media/recent";
let deviceid = "00e04c02dc8e";
let token = "e49776c341419c97b34243f95dd7d79e24ebe19caa2b99d8b83e37e9d8b8c28a";

let count_1 = 0;

let callback = data => {
    let count = data["data"][0]["likes"]["count"];

    if (!("count_1" in callback)) {
        callback.count_1 = 0
    }

    if (count >= callback.count_1 + 1) {
        callback.count_1 += 1
        //console.log("動かす")
        //move_hand()
    } else if (count < callback.count_1) {
        callback.count_1 = count;
    }
    console.log(callback.count_1, count)

}

let move_hand = () => {
    $.ajax({
        url: 'https://api-http.littlebitscloud.cc/v2/devices/' + deviceid + '/output',
        type: 'POST',
        beforeSend: function (xhr) {
            xhr.setRequestHeader('Authorization', 'Bearer ' + token);
        },
        contentType: 'application/json',
        dataType: 'json',
        data: '{"percent":100 , "duration_ms":1700}',
    });
}

get_data = () => {
    //let res = $.get(url, parameter)
    $.get(url, parameter, callback)
    /*res.fail(function (jqXHR, textStatus, errorThrown) {

        console.log(errorThrown);
        console.log(textStatus);
        console.log(jqXHR);

        // Etc
    })*/
}

get_data()
//move_hand()
//setInterval(get_data, 10000)