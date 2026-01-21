// ================== TOGGLE DE ANIMAÇÕES ==================
const deactivate_animation = document.getElementById("deactivate_animation");
const animation_status = document.getElementById("animation_status");
const animationInput = document.getElementById("animation");

let animationsEnabled = true;

// ================== SELETORES ==================
const sections = document.querySelectorAll("body > section");
const cards = document.querySelectorAll(".portfolio_card");

// ================== OBSERVERS ==================
const observer = new IntersectionObserver((entries) => {
  if (!animationsEnabled) return;

  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("show");
    } else {
      entry.target.classList.remove("show");
    }
  });
});

const cardObserver = new IntersectionObserver(
  (entries) => {
    if (!animationsEnabled) return;

    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("show");
        cardObserver.unobserve(entry.target);
      }
    });
  },
  {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px" 
  }
);

// ================== FUNÇÕES ==================
function showAllElements() {
  sections.forEach((section) => {
    section.classList.remove("hidden");
    section.classList.add("show");
  });

  cards.forEach((card) => {
    card.classList.remove("hidden");
    card.classList.add("show");
  });
}

function disconnectObservers() {
  observer.disconnect();
  cardObserver.disconnect();
}

function initObservers() {
  sections.forEach((section) => {
    section.classList.add("hidden");
    observer.observe(section);
  });

  cards.forEach((card) => {
    card.classList.add("hidden");
    cardObserver.observe(card);
  });
}

// ================== TOGGLE EVENT ==================
animationInput.addEventListener("change", () => {
  animationsEnabled = !animationInput.checked;

  localStorage.setItem("animationsDisabled", !animationsEnabled);

  animation_status.innerText = animationsEnabled
    ? "Animações Ativadas"
    : "Animações Desativadas";

  if (!animationsEnabled) {
    disconnectObservers();
    showAllElements();
  } else {
    initObservers();
  }
});

// ================== LOCAL STORAGE ==================
const savedPreference = localStorage.getItem("animationsDisabled");

if (savedPreference === "true") {
  animationsEnabled = false;
  animationInput.checked = true;
  animation_status.innerText = "Animações Desativadas";
} else {
  animationsEnabled = true;
  animationInput.checked = false;
  animation_status.innerText = "Animações Ativadas";
}

// ================== INIT ==================
initObservers();
if (animationsEnabled) {
  initObservers();
} else {
    disconnectObservers();
    showAllElements();
}