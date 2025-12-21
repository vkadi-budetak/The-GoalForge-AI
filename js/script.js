/**
  |============================
  | Input section
  |============================
*/
const userIdea = document.getElementById("user-idea");
const errorMessage = document.getElementById("error-message");
const btnUserIdea = document.getElementById("user-idea-btn");
const btnProceedtoStep1 = document.getElementById("step-1-button");
// console.log(btnProceedtoStep2)
const btnProceedtoStep2 = document.getElementById("step-2-button");
const btnProceedtoStep3 = document.getElementById("step-3-button");

const step0Card = document.getElementById("step-0-card");
const step1Card = document.getElementById("step-1-card");
const step2Card = document.getElementById("step-2-card");
const step3Card = document.getElementById("step-3-card");
const step4Card = document.getElementById("step-4-card");

const chosenIdeaSelect = document.getElementById("chosen-idea-select")

btnUserIdea.addEventListener("click", () => {
  const text = userIdea.value.trim();
  const minLength = 10;

  if (!text) {
    showError("The field cannot be empty!");
    return;
  }
  if (text.length < minLength) {
    showError(`Describe the idea in more detail (minimum ${minLength} symbols)`);
    return;
  }
  const isOnlyNumbers = /^\d+$/.test(text);
  if (isOnlyNumbers) {
    showError("The idea should contain letters, not just numbers!");
    return;
  }

  hideError();
  openInputSubsection(step1Card);
//   closeInputSubsection(step0Card);

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

const openInputSubsection = (targetStep) => {
  if (targetStep ) {
    targetStep.style.display = "block";
  } else {
    console.error("Element not found!");
  }
};

const closeInputSubsection = (targetStep) => {
  if (targetStep ) {
    targetStep.style.display = "none";
  } else {
    console.error("Element not found!");
  }
};

/**
  |============================
  | Input subsection 2
  |============================
*/
chosenIdeaSelect.addEventListener('change', () => {
    btnProceedtoStep1.disabled = false;
})


btnProceedtoStep1.addEventListener("click", () => {
    console.log("btn click")
    openInputSubsection(step2Card);
    //   closeInputSubsection(step1Card);
})


/**
  |============================
  | Input subsection 2
  |============================
*/
btnProceedtoStep2.addEventListener("click", () => {
    console.log("btn click")
    openInputSubsection(step3Card);
    //   closeInputSubsection(step2Card);
})

/**
  |============================
  | Input subsection 3
  |============================
*/
btnProceedtoStep3.addEventListener("click", () => {
    console.log("btn click")
    openInputSubsection(step4Card);
    //   closeInputSubsection(step2Card);
})

