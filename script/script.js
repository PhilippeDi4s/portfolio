(function () {
  const header = document.querySelector(".header");
  const iconHamburguer = document.querySelector(".menu_toggle");
  const inputHamburguer = document.querySelector("#hamburguer");
  const outsideHeader = document.querySelector("#outside_header");
  const nav = document.querySelector("#menu");
  const ul = document.querySelector(".menu_list");
  const tabletQuery = window.matchMedia("(max-width: 79.9rem)");

  function handleScreenChange(e) {
    if (e.matches) {
      headerMobile();
    } else {
      headerDesktop();
    }
  }

  function headerMobile() {
    iconHamburguer.style.display = "block";
    nav.style.position = "fixed";
    ul.style.flexDirection = "column";
    nav.style.width = "100%";
    nav.style.backgroundColor = "var(--background)";
    nav.style.opacity = "0";
    outsideHeader.append(nav);
  }

  function headerDesktop() {
    iconHamburguer.style.display = "none";
    inputHamburguer.checked = false;
    nav.style.opacity = "1";
    nav.style.position = "static";
    ul.style.flexDirection = "row";
    nav.style.width = "fit-content";
    header.append(nav);
  }

  handleScreenChange(tabletQuery);
  tabletQuery.addEventListener("change", handleScreenChange);

inputHamburguer.addEventListener("change", function () {
    if (this.checked) {
      nav.style.opacity = "1";
    } else {
      nav.style.opacity = "0";
    }
  }); 
})();
