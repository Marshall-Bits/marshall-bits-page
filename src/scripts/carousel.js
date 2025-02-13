const slideLeft = document.querySelector("#slide-left");
const slideRight = document.querySelector("#slide-right");

const carousel = document.querySelector("#carousel");

let carouselItemWidth;

function initCarousel() {
  const carouselItem = carousel.querySelector("li");

  const lastCarouselItem = carousel.querySelector("li:last-child");

  lastCarouselItem.classList.remove("mr-10");

  carousel.scrollLeft = 0;

  if (carouselItem) {
    const rect = carouselItem.getBoundingClientRect();
    const computedStyle = window.getComputedStyle(carouselItem);
    const marginRight = parseInt(computedStyle.marginRight);
    carouselItemWidth = rect.width + marginRight;
  }
}

const observer = new MutationObserver(initCarousel);
observer.observe(carousel, { childList: true });

window.addEventListener("resize", initCarousel);

slideLeft.addEventListener("click", () => {
  carousel.scrollBy({
    left: -carouselItemWidth,
    behavior: "smooth",
  });
});

slideRight.addEventListener("click", () => {
  carousel.scrollBy({
    left: carouselItemWidth,
    behavior: "smooth",
  });
});
