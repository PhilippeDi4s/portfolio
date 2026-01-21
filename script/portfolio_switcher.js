const sections = {
  portfolio: {
    section: document.getElementById("portfolio"),
    button: document.getElementById("portfolio_btn"),
    title: "Projetos Desenvolvidos"
  },
  certificates: {
    section: document.getElementById("certificates"),
    button: document.getElementById("certificate_btn"),
    title: "Certificados"
  },
  stack: {
    section: document.getElementById("stack"),
    button: document.getElementById("stack_btn"),
    title: "Stack Tecnológica"
  }
};
const portfolio_title = document.getElementById("portfolio_title");
const section_titles = document.querySelectorAll(".hide_title_for_switch");

Object.values(sections).forEach(({ section }) => {
  section.style.display = "none";
});

sections.portfolio.section.style.display = "block";
portfolio_title.innerText = sections.portfolio.title;

section_titles.forEach(title => {
  title.style.display = "none";
});

function activateSection(activeKey) {
  Object.values(sections).forEach(({ section, button }) => {
    section.style.display = "none";
    button.classList.add("disabled");
  });

  const active = sections[activeKey];
  active.section.style.display = "block";
  active.button.classList.remove("disabled");
  portfolio_title.innerText = active.title;
}

Object.keys(sections).forEach(key => {
  sections[key].button.addEventListener("click", () => {
    activateSection(key);
  });
});
