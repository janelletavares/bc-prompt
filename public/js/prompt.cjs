(function() {
    "use strict";

    currentPrompt();
})();

function currentPrompt() {
    let http = new XMLHttpRequest();
    http.open("GET", "http://34.213.130.157/prompt");
    http.setRequestHeader("Accept", "application/json");
    http.setRequestHeader("Content-Type", "application/json");
    http.send();
    http.onreadystatechange=(e)=>{
        let display = window.document.getElementById("current_prompt");
        console.log("responseText= "+http.responseText)
        display.innerText = http.responseText.slice(1, -1)
    }
}

window.setInterval(function() {
    currentPrompt();
}, 5000);