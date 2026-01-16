(() => {
  const header = document.querySelector(".header");
  const headerMenu = document.querySelector("#header_menu");
  const menuList = document.querySelector("#menu_list");
  const menuToggle = document.querySelector("#hamburguer");
  const menuIcon = document.querySelector(".menu_toggle-label");
  const mediaQuery = window.matchMedia("(max-width: 79.9rem)");

  function updateLayout(isMobile) {
    menuIcon.style.display = isMobile ? "block" : "none";
    menuToggle.checked = false;

    headerMenu.classList.toggle("header_menu--mobile", isMobile);

    menuList.classList.toggle("menu_list--mobile", isMobile);
    menuList.classList.toggle("menu_list--desktop", !isMobile);
    
    isMobile ? header.after(headerMenu) : header.append(headerMenu);
  }

  updateLayout(mediaQuery.matches);
  mediaQuery.addEventListener("change", (e) => updateLayout(e.matches));
})();
