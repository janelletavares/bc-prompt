function login() {
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

        console.log("0Success!");
        sleep(2000); //@TODO remove me
    //let adminUsername = process.env.ADMIN_USERNAME
        console.log("1Success!");
        sleep(2000); //@TODO remove me
    //let adminPassword = process.env.ADMIN_PASSWORD
        console.log("2Success!");
        sleep(2000); //@TODO remove me
    let success = username === "admin" && password === "admin";
    if (success) {
        console.log("Success!");
        sleep(2000); //@TODO remove me
        localStorage.setItem("authenticated", "letsgo");
        sleep(2000); //@TODO remove me
        window.location.href="./admin.html"; // i don't know why this isn't working
    } else {
        window.alert("Authentication failed");
    }
    return success
}

function sleep(ms) {
  var start = new Date().getTime(), expire = start + ms;
  while (new Date().getTime() < expire) { }
  return;
}