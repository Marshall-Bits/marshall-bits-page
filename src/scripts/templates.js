import { reviews } from "./reviews.js";
import { courses } from "./courses.js";


const templateReview = document.querySelector('[data-template="review-card"]');

const reviewsUl = document.querySelector("#reviews ul");

const reviewsRandom = reviews.sort(() => Math.random() - 0.5);

let reviewsToShow = 3;
const moreReviewsButton = document.querySelector("#more-reviews");

moreReviewsButton.addEventListener("click", () => {
  reviewsToShow += 3;

  renderReviews();

  if (reviewsToShow >= reviews.length) {
    moreReviewsButton.textContent = "↑ Ver menos ↑";
    moreReviewsButton.addEventListener("click", () => {
      reviewsToShow = 3;
      renderReviews();
      moreReviewsButton.textContent = "↓ Ver más ↓";
    });
  }
});

function renderReviews() {
  reviewsUl.innerHTML = "";
  reviewsRandom.slice(0, reviewsToShow).forEach((review) => {
    const card = templateReview.content.cloneNode(true);

    const image = card.querySelector("img");
    const name = card.querySelector("p");
    const reviewText = card.querySelector("blockquote");
    const readMoreButton = card.querySelector("button");
    const link = card.querySelector("a");

    image.src = review.profileImage;
    image.alt = review.name;

    name.textContent = review.name;
    link.href = review.profileUrl;

    const words = review.recommendation.split(" ");
    const truncatedText =
      words.length > 50
        ? words.slice(0, 50).join(" ") + "..."
        : review.recommendation;
    reviewText.insertAdjacentText("afterbegin", truncatedText);

    if (words.length <= 50) {
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
  const modalImage = modal.querySelector("img");
  const modalName = modal.querySelector("h5");
  const modalReview = modal.querySelector("blockquote");
  const closeButton = modal.querySelector("button");

  modalImage.src = review.profileImage;
  modalImage.alt = review.name;

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

  image.src = course.img;
  image.alt = course.title;

  title.textContent = course.title;
  description.textContent = course.desc;

  link.href = course.link;
  button.textContent = course.linkText;

  time.textContent += course.time;
  price.textContent += course.price;

  coursesUl.appendChild(card);
});
