/**
  |============================
  | Input section
  |============================
*/

// 1. ДАНІ КОРИСТУВАЧА
const userData = {
  goal: "",
  selectedIdea: "",
};

// 2. ЕЛЕМЕНТИ ТА КАРТКИ
const userIdeaInput = document.getElementById("user-idea");
const errorMessage = document.getElementById("error-message");
const btnUserIdea = document.getElementById("user-idea-btn");

const cards = {
  0: document.getElementById("step-0-card"),
  1: document.getElementById("step-1-card"),
  2: document.getElementById("step-2-card"),
  3: document.getElementById("step-3-card"),
  4: document.getElementById("step-4-card"),
};

const loaders = {
  1: document.getElementById("step-1-loading"),
  2: document.getElementById("step-2-loading"),
  3: document.getElementById("step-3-loading"),
  4: document.getElementById("step-4-loading"),
};

const contents = {
  1: document.getElementById("step-1-content"),
  2: document.getElementById("step-2-content"),
  3: document.getElementById("step-3-content"),
  4: document.getElementById("step-4-content"),
};

const errorBlocks = {
  1: document.getElementById("step-1-error"),
  2: document.getElementById("step-2-error"),
  3: document.getElementById("step-3-error"),
  4: document.getElementById("step-4-error"),
};

// 3. ДОПОМІЖНІ ФУНКЦІЇ
function typeWriter(element, text, speed = 15) {
  element.innerHTML = "";
  let i = 0;
  function type() {
    if (i < text.length) {
      element.innerHTML += text.charAt(i) === "\n" ? "<br>" : text.charAt(i);
      i++;
      setTimeout(type, speed);
    }
  }
  type();
}

// 4. ГОЛОВНА УНІВЕРСАЛЬНА ФУНКЦІЯ
function showStep(stepNumber) {
  // Ховаємо ВСЕ перед новим кроком
  Object.values(cards).forEach((card) => card.classList.add("is-hidden"));
  Object.values(loaders).forEach((loader) =>
    loader?.classList.add("is-hidden"),
  );
  Object.values(contents).forEach((content) =>
    content?.classList.add("is-hidden"),
  );
  Object.values(errorBlocks).forEach((error) =>
    error?.classList.add("is-hidden"),
  );

  cards[stepNumber].classList.remove("is-hidden");

  if (stepNumber > 0 && loaders[stepNumber]) {
    loaders[stepNumber].classList.remove("is-hidden");

    let prompt = "";
    let outputElement = null;

    if (stepNumber === 1) {
      outputElement = document.getElementById("idea-list-output");
      prompt = `Goal: "${userData.goal}". Suggest 5 strategic paths. Format: strictly 5 strings separated by semicolons. No numbers.`;
    } else if (stepNumber === 2) {
      outputElement = document.getElementById("structure-output");
      prompt = `For goal "${userData.goal}", create a 3-step structure for strategy: "${userData.selectedIdea}". Use bold titles.`;
    } else if (stepNumber === 3) {
      outputElement = document.getElementById("details-output");
      prompt = `Provide 5 practical tasks for "${userData.selectedIdea}" to achieve "${userData.goal}". Use emojis.`;
    } else if (stepNumber === 4) {
      outputElement = document.getElementById("final-output");
      prompt = `Professional summary for: "${userData.goal}" using strategy "${userData.selectedIdea}". Max 80 words.`;
    }

    // ВИКЛИК ШІ З ПОДВІЙНИМ ЗАХИСТОМ
    askGemini(prompt)
      .then((aiResponse) => {
        loaders[stepNumber].classList.add("is-hidden");

        if (aiResponse) {
          contents[stepNumber].classList.remove("is-hidden");

          if (stepNumber === 1) {
            const paths = aiResponse
              .split(";")
              .map((p) => p.trim().replace(/^\d+[\.\)]\s*/, ""))
              .filter((p) => p.length > 5)
              .slice(0, 5);

            typeWriter(outputElement, paths.join("\n"));

            const select = document.getElementById("chosen-idea-select");
            select.innerHTML =
              '<option value="" disabled selected>— Select an Idea —</option>';
            paths.forEach((path, index) => {
              const opt = document.createElement("option");
              opt.value = index + 1;
              opt.textContent = path;
              select.appendChild(opt);
            });
          } else {
            const cleanText = aiResponse.replace(/\*\*/g, "");
            typeWriter(outputElement, cleanText);
          }
        } else {
          // Обробка логічного null (наприклад, статус 500 чи 404)
          errorBlocks[stepNumber]?.classList.remove("is-hidden");
        }
      })
      .catch((err) => {
        // Обробка критичних помилок (Offline, Failed to fetch)
        console.error("Critical Error:", err);
        loaders[stepNumber].classList.add("is-hidden");
        errorBlocks[stepNumber]?.classList.remove("is-hidden");
      });
  }

  if (typeof scrollToIndicator === "function") {
    scrollToIndicator();
  }
}

// 5. ОБРОБНИКИ КНОПОК (Тут все без змін)
btnUserIdea.addEventListener("click", () => {
  const text = userIdeaInput.value.trim();
  if (!text || text.length < 10 || /^\d+$/.test(text)) {
    showError("Describe your goal in more detail (min 10 symbols).");
    return;
  }
  userData.goal = text;
  hideError();
  showStep(1);
});

document.getElementById("step-1-button").addEventListener("click", () => {
  const select = document.getElementById("chosen-idea-select");
  if (select.value === "") {
    select.classList.add("error-border");
    document.getElementById("select-error").style.display = "block";
    return;
  }
  userData.selectedIdea = select.options[select.selectedIndex].text;
  select.classList.remove("error-border");
  document.getElementById("select-error").style.display = "none";
  showStep(2);
  if (typeof updateStepIndicator === "function") updateStepIndicator(2);
});

document.getElementById("step-2-button").addEventListener("click", () => {
  showStep(3);
  if (typeof updateStepIndicator === "function") updateStepIndicator(3);
});

document.getElementById("step-3-button").addEventListener("click", () => {
  showStep(4);
  if (typeof updateStepIndicator === "function") updateStepIndicator(4);
});

document.getElementById("restart-button").addEventListener("click", () => {
  userData.goal = "";
  userData.selectedIdea = "";
  userIdeaInput.value = "";
  document.getElementById("chosen-idea-select").selectedIndex = 0;
  showStep(0);
  if (typeof updateStepIndicator === "function") updateStepIndicator(1);
});

function showError(message) {
  errorMessage.textContent = message;
  errorMessage.style.display = "block";
  userIdeaInput.classList.add("error-border");
}

function hideError() {
  errorMessage.style.display = "none";
  userIdeaInput.classList.remove("error-border");
}
