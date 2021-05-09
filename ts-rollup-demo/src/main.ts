// src/main.ts
function greeter(person: string): string {
  return "Hello, " + person;
}

const user = "Jane User,this is js hello from ts";

document.body.textContent = greeter(user);
