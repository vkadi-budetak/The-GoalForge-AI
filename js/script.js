/**
  |============================
  | Step Indicator
  |============================
*/
const indicatorStep1 = document.getElementById("step-1");
const indicatorStep2 = document.getElementById("step-2");
const indicatorStep3 = document.getElementById("step-3");
const indicatorStep4 = document.getElementById("step-4");

/**
  |============================
  | Input section
  |============================
*/
const userIdea = document.getElementById("user-idea");
const errorMessage = document.getElementById("error-message");

const heroBtn = document.getElementById("hero-btn");
const servicesSection = document.getElementById("services");
const btnUserIdea = document.getElementById("user-idea-btn");
const btnProceedtoStep1 = document.getElementById("step-1-button");
const btnProceedtoStep2 = document.getElementById("step-2-button");
const btnProceedtoStep3 = document.getElementById("step-3-button");
const btnFinishButton = document.getElementById("finish-button");
const btnRestartButton = document.getElementById("restart-button");

const step0Card = document.getElementById("step-0-card");
const step1Card = document.getElementById("step-1-card");
const step2Card = document.getElementById("step-2-card");
const step3Card = document.getElementById("step-3-card");
const step4Card = document.getElementById("step-4-card");

const chosenIdeaSelect = document.getElementById("chosen-idea-select");
const selectError = document.getElementById("select-error");

const step1Loading = document.getElementById("step-1-loading");
const step2Loading = document.getElementById("step-2-loading");
const step3Loading = document.getElementById("step-3-loading");
const step4Loading = document.getElementById("step-4-loading");

const step1Content = document.getElementById("step-1-content");
const step2Content = document.getElementById("step-2-content");
const step3Content = document.getElementById("step-3-content");
const step4Content = document.getElementById("step-4-content");

heroBtn.addEventListener("click", () => {
  servicesSection.scrollIntoView({
    behavior: "smooth",
    block: "start",
  });
});

btnUserIdea.addEventListener("click", () => {
  const text = userIdea.value.trim();
  const minLength = 10;

  if (!text) {
    showError("The field cannot be empty!");
    return;
  }
  if (text.length < minLength) {
    showError(
      `Describe the idea in more detail (minimum ${minLength} symbols)`
    );
    return;
  }
  const isOnlyNumbers = /^\d+$/.test(text);
  if (isOnlyNumbers) {
    showError("The idea should contain letters, not just numbers!");
    return;
  }
  hideError();

  step0Card.classList.add("is-hidden");
  step1Card.classList.remove("is-hidden");
  step1Loading.classList.remove("is-hidden");
  step1Content.classList.add("is-hidden");

  setTimeout(() => {
    step1Loading.classList.add("is-hidden");
    step1Content.classList.remove("is-hidden");
  }, 2000);
});

const showError = (message) => {
  userIdea.classList.add("error-border");
  errorMessage.textContent = message;
  errorMessage.style.display = "block";

  userIdea.classList.remove("error-border");
  void userIdea.offsetWidth;
  userIdea.classList.add("error-border");

  userIdea.focus();
};

const hideError = () => {
  userIdea.classList.remove("error-border");
  errorMessage.style.display = "none";
};

userIdea.addEventListener("input", hideError);

/**
 * Input subsection 2
 */
chosenIdeaSelect.addEventListener("change", () => {
  if (chosenIdeaSelect.value !== "") {
    chosenIdeaSelect.classList.remove("error-border");
    selectError.style.display = "none";
  }
});

btnProceedtoStep1.addEventListener("click", () => {
  if (chosenIdeaSelect.value === "") {
    chosenIdeaSelect.classList.add("error-border");
    selectError.style.display = "block";
    return;
  }

  indicatorStep1.classList.remove("active");
  indicatorStep2.classList.add("active");

  step2Card.classList.remove("is-hidden");
  step1Card.classList.add("is-hidden");
  step2Loading.classList.remove("is-hidden");
  step2Content.classList.add("is-hidden");

  setTimeout(() => {
    step2Loading.classList.add("is-hidden");
    step2Content.classList.remove("is-hidden");
  }, 2000);
});

/**
 * Input subsection 3
 */
btnProceedtoStep2.addEventListener("click", () => {
  indicatorStep2.classList.remove("active");
  indicatorStep3.classList.add("active");

  step3Card.classList.remove("is-hidden");
  step2Card.classList.add("is-hidden");
  step3Loading.classList.remove("is-hidden");
  step3Content.classList.add("is-hidden");

  setTimeout(() => {
    step3Loading.classList.add("is-hidden");
    step3Content.classList.remove("is-hidden");
  }, 2000);
});

/**
 * Input subsection 4
 */
btnProceedtoStep3.addEventListener("click", () => {
  indicatorStep3.classList.remove("active");
  indicatorStep4.classList.add("active");

  step4Card.classList.remove("is-hidden");
  step3Card.classList.add("is-hidden");
  step4Loading.classList.remove("is-hidden");
  step4Content.classList.add("is-hidden");

  setTimeout(() => {
    step4Loading.classList.add("is-hidden");
    step4Content.classList.remove("is-hidden");
  }, 2000);
});

/**
 * Input Finish
 */
btnRestartButton.addEventListener("click", () => {
  step0Card.classList.remove("is-hidden");
  step4Card.classList.add("is-hidden");
  userIdea.value = "";

  indicatorStep4.classList.remove("active");
  indicatorStep1.classList.add("active");
});
