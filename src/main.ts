import "./style.css";

const app: HTMLDivElement = document.querySelector("#app")!;

const gameName = "Gabriel's game";

document.title = gameName;

const header = document.createElement("h1");
header.innerHTML = gameName;
app.append(header);

const Button = document.createElement("button");
Button.innerHTML = "🍟";
Button.style.fontSize = "40pt";
app.append(Button);
