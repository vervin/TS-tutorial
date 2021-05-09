'use strict';

// src/main.ts
function greeter(person) {
    return "Hello, " + person;
}
var user = "Jane User,this is js hello from ts";
document.body.textContent = greeter(user);
