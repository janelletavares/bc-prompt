(function() {
    var value = localStorage.getItem("authenticated");
    console.log("checking for authentication..." + value);
    sleep(2000); //@TODO remove me
    if(value !== "letsgo")
    {
        window.location.href="./login.html";
    }

    let promptsForm = window.document.getElementById("prompts");
    promptsForm.value = currentPrompts();

    let current = window.document.getElementById("current-prompt");
    current.value = currentPrompt();

    let indexForm = window.document.getElementById("index");
    let index = localStorage.getItem("index");
    if (index === null) {
        index = 0
        localStorage.setItem("index", index.toString());
    }
    indexForm.value = index.toString();
})();

function currentPrompts() {
    let prompts = localStorage.getItem("prompts");
    if (prompts === null) {
        prompts = []
        localStorage.setItem("prompts", prompts.toString());
    }
   return prompts;
}

function currentPrompt() {
    let value = localStorage.getItem("prompts")
    let prompts = [];
    if (value !== null && value !== "") {
        prompts = JSON.parse(value);
    }

    let currentIndex = localStorage.getItem("index");
    let int = parseInt(currentIndex);
    console.log("current prompt: "+prompts[int] );
    return prompts[int];
}

function updatePrompts() {
    let promptsForm = window.document.getElementById("prompts");
    let value = promptsForm.value;
    localStorage.setItem("prompts", value);
}

function updateIndex() {
    console.log("current index: " + localStorage.getItem("index"));
    let indexForm = window.document.getElementById("index");
    parseInt(indexForm.value);
    localStorage.setItem("index", indexForm.value);
    console.log("new index: " + indexForm.value);

}

function nextPrompt() {
    let currentIndex = localStorage.getItem("index");
    console.log("current index: " + currentIndex);
    let int = parseInt(currentIndex);
    console.log("current int: " + int);
    sleep(2000);
    let prompts = JSON.parse(localStorage.getItem("prompts"));
    sleep(2000);
    console.log("prompts length: " + prompts.length);
    if (int >= prompts.length) {
        window.alert("After the last prompt!");
        return
    }

    int = int + 1;
    console.log("new index: " + int);
    localStorage.setItem("index", int.toString());
    let indexForm = window.document.getElementById("index");
    console.log("new index: " + int);
    indexForm.value = "";
    indexForm.value = currentIndex.toString();

    let current = window.document.getElementById("current-prompt");
    current.value = currentPrompt();
}

function sleep(ms) {
  var start = new Date().getTime(), expire = start + ms;
  while (new Date().getTime() < expire) { }
  return;
}