const display = document.getElementById("display");
const history = document.getElementById("history");
const buttons = document.querySelectorAll("button");

function adjustFontSize() {
  const maxLength = 18;
  display.style.fontSize = display.value.length > maxLength ? "20px" : "28px";
  display.scrollLeft = display.scrollWidth;
}

function pressButton(value) {
  if (value === "C") {
    display.value = "";
    history.textContent = "";
  } else if (value === "⌫") {
    display.value = display.value.slice(0, -1);
  } else if (value === "=") {
    try {
      let expression = display.value.replace(/÷/g, "/").replace(/×/g, "*");
      let result = eval(expression);
      history.textContent = display.value + " =";
      display.value = result;
    } catch {
      display.value = "Error";
    }
  } else {
    display.value += value;
  }
  adjustFontSize();
}

// Mouse clicks
buttons.forEach(button => {
  button.addEventListener("click", () => pressButton(button.textContent));
});

// Keyboard input
document.addEventListener("keydown", e => {
  let key = e.key;

  if (/[0-9+\-*/().]/.test(key)) {
    display.value += key;
  } else if (key === "Enter") {
    pressButton("=");
  } else if (key === "Backspace") {
    pressButton("⌫");
  } else if (key === "Escape") {
    pressButton("C");
  } else if (key === ".") {
    display.value += ".";
  }

  adjustFontSize();

  // Highlight key press
  buttons.forEach(btn => {
    if (btn.textContent === key ||
        (key === "Enter" && btn.textContent === "=") ||
        (key === "Backspace" && btn.textContent === "⌫") ||
        (key === "Escape" && btn.textContent === "C")) {
      btn.classList.add("active");
      setTimeout(() => btn.classList.remove("active"), 150);
    }
  });
});
