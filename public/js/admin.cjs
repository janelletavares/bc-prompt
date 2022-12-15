(function() {
    var http = new XMLHttpRequest();
    http.open("GET", "http://bonoboconnectprompt.com/authentication");
    http.send();
    http.onreadystatechange=(e)=>{
        console.log("checking for authentication..."+JSON.stringify(this.readyState))
        console.log("checking for authentication..."+JSON.stringify(this.status))
        console.log("checking for authentication..."+http.responseText)
        if (http.responseText !== null && http.responseText !== undefined && http.responseText !== "") {
            if (http.responseText !== JSON.stringify("letsgo")) {
                window.location.href = "login";
            } else {
                console.log("not ready for admin")
            }
        }
    }
    currentPrompts();
    currentPrompt();
    getIndex();
})();

function currentPrompts() {
    var http = new XMLHttpRequest();
    http.open("GET", "http://bonoboconnectprompt.com/prompts");
    http.setRequestHeader("Accept", "application/json");
    http.setRequestHeader("Content-Type", "application/json");
    http.send();
    http.onreadystatechange=(e)=>{
        let promptsForm = window.document.getElementById("prompts");
        promptsForm.value = http.responseText;
    }
}

function currentPrompt() {
    var http = new XMLHttpRequest();
    http.open("GET", "http://bonoboconnectprompt.com/prompt");
    http.setRequestHeader("Accept", "application/json");
    http.setRequestHeader("Content-Type", "application/json");
    http.send();
    http.onreadystatechange=(e)=>{
        let current = window.document.getElementById("current_prompt");
        current.innerText = http.responseText.slice(1, -1)
    }
}

function updatePrompts() {
    let promptsForm = window.document.getElementById("prompts");
    let value = promptsForm.value;
    console.log("new prompts = "+value)

    var http = new XMLHttpRequest();
    http.open("POST", "http://bonoboconnectprompt.com/prompts");
    http.setRequestHeader("Accept", "application/json");
    http.setRequestHeader("Content-Type", "application/json");
    http.send(value);
}

function getIndex() {
    let int = 0
    var http = new XMLHttpRequest();
    http.open("GET", "http://bonoboconnectprompt.com/index");
    http.setRequestHeader("Accept", "application/json");
    http.setRequestHeader("Content-Type", "application/json");
    http.send();
    http.onreadystatechange=(e)=> {
        int = parseInt(http.responseText)
        if (int === null || int === undefined) {
            int = 0
        }
        let indexForm = window.document.getElementById("index");
        indexForm.value = int.toString()
    }
}

function updateIndex() {
    console.log("current index: " + localStorage.getItem("index"));

    var http = new XMLHttpRequest();
    http.open("POST", "http://bonoboconnectprompt.com/index");
    http.setRequestHeader("Accept", "application/json");
    http.setRequestHeader("Content-Type", "application/json");
    http.send(JSON.stringify({index: indexForm.value}));
    http.onreadystatechange=(e)=> {
        success = http.responseText
        console.log("response "+success)
        if (success !== "true") {
            console.log("that wasn't good")
        } else {
            let indexForm = window.document.getElementById("index");
            parseInt(indexForm.value);
        }
    }
}

function nextPrompt() {
    let indexForm = window.document.getElementById("index");
    let int = parseInt(indexForm.value)
    int = int + 1;
    console.log("new index: " + int);
    let http = new XMLHttpRequest();
    http.open("POST", "http://bonoboconnectprompt.com/index");
    http.setRequestHeader("Accept", "application/json");
    http.setRequestHeader("Content-Type", "application/json");
    http.send(JSON.stringify({index: int}));
    http.onreadystatechange=(e)=> {
        console.log("next prompt response: "+http.responseText)
        success = http.responseText
        if (success === "true") {
            indexForm.value = "";
            indexForm.value = int.toString();

            let current = window.document.getElementById("current-prompt");
            current.value = currentPrompt();
        } else {
            console.log("that wasn't good")
        }
    }
}

function sleep(ms) {
  var start = new Date().getTime(), expire = start + ms;
  while (new Date().getTime() < expire) { }
  return;
}