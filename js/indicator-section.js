/**
  |============================
  | Step Indicator
  |============================
*/
const indicatorStep1 = document.getElementById("step-1");
const indicatorStep2 = document.getElementById("step-2");
const indicatorStep3 = document.getElementById("step-3");
const indicatorStep4 = document.getElementById("step-4");

const updateStepIndicator = (stepNumber) => {
  // Збираємо твої змінні в масив для зручного перебору
  const steps = [
    indicatorStep1,
    indicatorStep2,
    indicatorStep3,
    indicatorStep4,
  ];

  steps.forEach((step, index) => {
    const currentIdx = index + 1; // Номер кроку (1, 2, 3, 4)

    if (currentIdx < stepNumber) {
      // Кроки, які ми вже пройшли
      step.classList.remove("active");
      step.classList.add("completed");
    } else if (currentIdx === stepNumber) {
      // Поточний активний крок
      step.classList.add("active");
      step.classList.remove("completed");
    } else {
      // Майбутні кроки
      step.classList.remove("active", "completed");
    }
  });
};
