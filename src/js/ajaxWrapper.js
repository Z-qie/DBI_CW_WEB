// function translating data from object to url query string format.
function queryString (obj) {
    var str = "";
    for (var attr in obj) {
        str += attr + "=" + obj[attr] + "&";
    }
    return str.substring(0, str.length - 1);
}
// a wrapper funciton to facilitate data transaction by ajax
/*
    success: the called function when data request is done
    error: the error handler when data cannot be sent
*/
function $ajax ({method = "post", url, data, success, error}) {
    // create ajax object 
    var xhr = null;
    try{
        xhr = new XMLHttpRequest();
    } catch (e) {
        xhr = new ActiveXObject("Microsoft.XMLHTTP");
    }
    // function translating data from object to url query string format.
    if(data){
        data = queryString(data);
    }
    if (method == "get" && data){
        url += "?" + data;
    }
    // status 0
    xhr.open(method, url, true);
    // send request: status 1
    if (method == "get") {
        xhr.send();
    } else {
        xhr.setRequestHeader("content-type", "application/x-www-form-urlencoded");
        xhr.send(data);
    }

    // waiting for response
    xhr.onreadystatechange = function () {
        if (xhr.readyState == 4) {
            // success
            if (xhr.status == 200) {
                if (success) {
                    success(xhr.responseText);
                }
            } else {
                if (error) {
                    error("Error: " + xhr.status);
                }
            }
        }
    }

}