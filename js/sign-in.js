const signInBtn = document.querySelector(".header-btn");
const authModal = document.getElementById("auth-modal-overlay");
const closeModalBtn = document.getElementById("close-modal");

const authHeroSignin = document.querySelector(".auth-hero-signin");
const authFormSignin = document.querySelector(".auth-form-signin");
const authHeroSignup = document.querySelector(".auth-hero-signup");
const authFormSignup = document.querySelector(".auth-form-signup");
const authCardBg = document.querySelector(".auth-card-bg");

const openAuthModal = () => {
  authModal.classList.remove("is-hidden");
  document.body.style.overflow = "hidden";
};

const closeAuthModal = () => {
  authModal.classList.add("is-hidden");
  document.body.style.overflow = "";
};

signInBtn.addEventListener("click", openAuthModal);
closeModalBtn.addEventListener("click", closeAuthModal);

authModal.addEventListener("click", (e) => {
  if (e.target === authModal) closeAuthModal();
});

document.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && !authModal.classList.contains("is-hidden")) {
    closeAuthModal();
  }
});

window.toggleView = () => {
  const isSigninVisible = authHeroSignin.classList.contains("active");

  authCardBg.classList.toggle("signin");

  closeModalBtn.classList.toggle("dark-mode");

  [authHeroSignin, authFormSignin, authHeroSignup, authFormSignup].forEach(
    (el) => {
      el.classList.toggle("active");
    },
  );
};

const authForms = document.querySelectorAll(".auth-form-element");
authForms.forEach((form) => {
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    console.log("Дані форми зібрано. Тут буде логіка авторизації.");
  });
});
