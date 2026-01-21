const switcher_section = document.querySelector(".portfolio_header")
switcher_section.style.display="flex"
const sections_portfolio = {
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

Object.values(sections_portfolio).forEach(({ section }) => {
  section.style.display = "none";
});

sections_portfolio.portfolio.section.style.display = "block";
portfolio_title.innerText = sections_portfolio.portfolio.title;

section_titles.forEach(title => {
  title.style.display = "none";
});

function activateSection(activeKey) {
  Object.values(sections_portfolio).forEach(({ section, button }) => {
    section.style.display = "none";
    button.classList.add("disabled");
  });

  const active = sections_portfolio[activeKey];
  active.section.style.display = "block";
  active.button.classList.remove("disabled");
  portfolio_title.innerText = active.title;
}

Object.keys(sections_portfolio).forEach(key => {
  sections_portfolio[key].button.addEventListener("click", () => {
    activateSection(key);
  });
});
