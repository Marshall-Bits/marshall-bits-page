import { reviews } from "./reviews-linkedin.js";
import { reviewsUdemy } from "./reviews-udemy.js";
import { courses } from "./courses.js";

const templateReview = document.querySelector('[data-template="review-card"]');

const reviewsUl = document.querySelector("#reviews ul");

const reviewsRandom = [...reviewsUdemy, ...reviews].sort(
  () => Math.random() - 0.5,
);

renderReviews();

function renderReviews() {
  reviewsUl.innerHTML = "";
  reviewsRandom.forEach((review) => {
    const card = templateReview.content.cloneNode(true);

    const name = card.querySelector(".name");
    const reviewText = card.querySelector("blockquote");
    const readMoreButton = card.querySelector("button");
    const link = card.querySelector("a");
    const udemyName = card.querySelector(".udemy-name");
    const stars = card.querySelector(".stars");


    name.textContent = review.name;
    link.href = review.profileUrl;

    if (review.stars) {
      stars.textContent = review.stars;
      udemyName.textContent = review.name;

      link.remove();
    } else {
      udemyName.remove();
      stars.remove();
    }

    const words = review.recommendation.split(" ");
    const truncatedText =
      words.length > 30
        ? words.slice(0, 30).join(" ") + "..."
        : review.recommendation;
    reviewText.insertAdjacentText("afterbegin", truncatedText);

    if (words.length <= 30) {
      readMoreButton.remove();
    }

    readMoreButton.addEventListener("click", () => {
      openModalWithReview(review);
    });

    reviewsUl.appendChild(card);
  });
}

renderReviews();

const modal = document.querySelector("#modal");

function openModalWithReview(review) {
  const modalName = modal.querySelector("h5");
  const modalReview = modal.querySelector("blockquote");
  const closeButton = modal.querySelector("button.btn");


  modalName.textContent = review.name;
  modalReview.textContent = '"' + review.recommendation + '"';

  modal.classList.add("flex");
  modal.classList.remove("hidden");


  document.body.classList.add("overflow-hidden");

  closeButton.addEventListener("click", () => {
    closeModal();
  });
}

function closeModal() {
  modal.classList.add("hidden");
  modal.classList.remove("flex");
  document.body.classList.remove("overflow-hidden");
}

modal.addEventListener("click", (event) => {
  if (event.target === modal) {
    closeModal();
  }
});

const templateCourse = document.querySelector('[data-template="course-card"]');
const coursesUl = document.querySelector("#courses ul");

courses.forEach((course) => {
  const card = templateCourse.content.cloneNode(true);

  const image = card.querySelector("img");
  const title = card.querySelector("h4");
  const description = card.querySelector("p");
  const link = card.querySelector("a");
  const button = card.querySelector("button");
  const time = card.querySelector(".time");
  const price = card.querySelector(".price");
  const originalPrice = card.querySelector(".original-price");

  image.src = course.img;
  image.alt = course.title;

  title.textContent = course.title;
  description.textContent = course.desc;

  link.href = course.link;
  button.textContent = course.linkText;

  time.textContent += course.time;
  price.textContent += course.price;

  if (course.originalPrice) {
    originalPrice.textContent += course.originalPrice;
  } else {
    originalPrice.remove();
  }

  coursesUl.appendChild(card);
});
