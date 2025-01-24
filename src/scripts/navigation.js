const menuButton = document.querySelector("#menu-button");
const navMenu = document.querySelector("#nav-menu");
const navLis = document.querySelectorAll("#nav-menu li");
const mainTitle = document.querySelector("#main-title");

menuButton.addEventListener("click", () => {
  navMenu.classList.remove("hidden", "animate-slide-out");
  navMenu.classList.add("flex", "animate-slide-in");
});

navLis.forEach((liElement) => {
  liElement.addEventListener("click", () => {
    if (window.innerWidth >= 640) return;
    navMenu.classList.add("animate-slide-out");
    navMenu.classList.remove("animate-slide-in");
  });
});

navMenu.addEventListener("animationend", (event) => {
  if (event.animationName !== "slide-out") return;
  navMenu.classList.add("hidden");
  navMenu.classList.remove("flex");
});

window.addEventListener("resize", () => {
  if (window.innerWidth >= 640) {
    navMenu.classList.remove("animate-slide-in", "animate-slide-out");
  }
});

mainTitle.addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});
