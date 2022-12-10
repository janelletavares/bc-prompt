function login() {
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    let adminUsername = process.env.ADMIN_USERNAME
    let adminPassword = process.env.ADMIN_PASSWORD
    let success = username === adminUsername && password === adminPassword;
    if (success) {
        console.log("Success!");
        localStorage.setItem("authenticated", "letsgo");
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