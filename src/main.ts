import "./style.css";

const app: HTMLDivElement = document.querySelector("#app")!;

const gameName = "Gabriel's game";

let counter = 0;

document.title = gameName;

const header = document.createElement("h1");
header.innerHTML = gameName;
app.append(header);

const Button = document.createElement("button");
Button.innerHTML = "🍟";
Button.style.fontSize = "40pt";
app.append(Button);

const counterText = document.createElement("div");
counterText.innerHTML = ` Fries Eaten :  ${counter} `;
app.append(counterText);

// step 2: Making counter increment when clicked

Button.addEventListener("click", () => {
  counter++;
  counterText.innerHTML = `Fries Eaten :  ${counter}`;
});

setInterval(() => {
  counter++;
  counterText.innerHTML = `Fries Eaten :  ${counter}`;
}, 1000);
