(function() {
    "use strict";
   let input = window.document.getElementById("current_prompt");
    if (input !== null) {
    input.value = currentPrompt();
    }
})();

function currentPrompt() {
    let prompts = JSON.parse(localStorage.getItem("prompts"));
    let currentIndex = localStorage.getItem("index");
    let int = parseInt(currentIndex);
    console.log("current prompt: "+prompts[int] );
    return prompts[int];
}

window.setInterval(function() {
   let input = window.document.getElementById("current_prompt");
    if (input !== null) {
    input.value = currentPrompt();
    }
}, 5000);