import "./style.css";

const app: HTMLDivElement = document.querySelector("#app")!;

const gameName = "Gabriel's Fries Eating game";

let counter = 0;
let lastTimestamp = 0;
let incrementPerSecond = 0;

document.title = gameName;

const header = document.createElement("h1");
header.innerHTML = gameName;
app.append(header);

const FriesButton = document.createElement("button");
FriesButton.innerHTML = "🍟";
FriesButton.style.fontSize = "40pt";
app.append(FriesButton);

const counterText = document.createElement("div");
counterText.innerHTML = ` Fries Eaten :  ${counter} `;
app.append(counterText);

// step 2: Making counter increment when clicked

FriesButton.addEventListener("click", () => {
  counter++;
  counterText.innerHTML = `Fries Eaten :  ${counter}`;
});

// step 3: auto clickers step 4: updates by frame
function updateCounter(timestamp: number) {
  if (!lastTimestamp) {
    lastTimestamp = timestamp;
  }

  const elapsedTime = (timestamp - lastTimestamp) / 1000;

  const increment = incrementPerSecond * elapsedTime;

  counter += increment;
  counterText.innerHTML = `Fries Eaten : ${counter.toFixed(
    2,
  )}<br/>Auto Eat Rate: ${incrementPerSecond.toFixed(2)}`;

  lastTimestamp = timestamp;
  requestAnimationFrame(updateCounter);
}

// step 5: upgrades
interface Item {
  name: string;
  cost: number;
  rate: number;
  description: string;
}

// Item data
const upgrades: Item[] = [
  { name: "😋", cost: 10, rate: 0.1, description: "Another mouth" },
  { name: "👄", cost: 100, rate: 2, description: "Big mouth" },
  { name: "👩‍👨‍👧‍👦", cost: 1000, rate: 5, description: "Whole family to eat lots of fries" },
  { name: "🚌", cost: 2000, rate: 15, description: "A Bus full of fries enthusiasts" },
  { name: "🗑️", cost: 5000, rate: 999, description: "Dump the fries out. Fast & Efficient." }
];

function createUpgradeButtons() {
  for (const upgrade of upgrades) {
    const upgradeButton = document.createElement("button");
    upgradeButton.innerHTML = `${upgrade.name} (Cost: ${upgrade.cost})<br/>${upgrade.description}`;
    app.append(upgradeButton);

    // Function to handle the upgrade purchase
    upgradeButton.addEventListener("click", () => {
      if (counter >= upgrade.cost) {
        counter -= upgrade.cost;
        incrementPerSecond += upgrade.rate;
        counterText.innerHTML = `Fries Eaten :  ${counter.toFixed(2)}`;
        updateButtonStates();
        requestAnimationFrame(updateCounter);
        upgrade.cost = upgrade.cost * 1.15;
        upgradeButton.innerHTML = `${
          upgrade.name
        } (Cost: ${upgrade.cost.toFixed(2)})<br/>${upgrade.description}`;
      }
    });
  }
}

function updateButtonStates() {
  for (const upgrade of upgrades) {
    const buttons = document.querySelectorAll("button");

    buttons.forEach((button) => {
      if (button.textContent) {
        if (button.textContent.includes(upgrade.name)) {
          const upgradeButton = button as HTMLButtonElement;

          if (counter < upgrade.cost) {
            upgradeButton.disabled = true; // Disable the button
          } else {
            upgradeButton.disabled = false; // Enable the button
          }
        }
      }
    });
  }
}

// Make the buttons
createUpgradeButtons();

// Update Button Staets
setInterval(updateButtonStates, 100);
