function login() {
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    let success = "false"
    var http = new XMLHttpRequest();
    http.open("POST", "http://localhost:3000/authentication");
    http.setRequestHeader("Accept", "application/json");
    http.setRequestHeader("Content-Type", "application/json");
    let input = {username: username, password: password}
    console.log("sending... "+JSON.stringify(input));
    http.send(JSON.stringify(input));
    http.onreadystatechange=(e)=>{
        console.log("checking for authentication= "+typeof  http.responseText)
        if (http.responseText !== null && http.responseText !== undefined && http.responseText !== "") {
            console.log("checking for authentication= "+http.responseText)
            if (http.responseText === JSON.stringify("letsgo")) {
                console.log("success!")
                window.location.href = "admin"; // i don't know why this isn't working
            } else {
                console.log("invalid login")
            }
        }
    }
    return success === "true"
}

function sleep(ms) {
  var start = new Date().getTime(), expire = start + ms;
  while (new Date().getTime() < expire) { }
  return;
}