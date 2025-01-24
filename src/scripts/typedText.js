const paragraph = document.querySelector("#typed-text");
const bar = document.querySelector("#bar");

const slogans = [
  "Desbloquea tu potencial con Marcel",
  "Transforma tus ideas en código, ¡empieza hoy!",
  "Aprende las bases, desarrolla tu futuro",
  "npm install marcel-instructor",
  "Cursos de programación para juniors",
];

let sloganIndex = 0;
let charIndex = 0;
let isDeleting = false;

function type() {
  const currentSlogan = slogans[sloganIndex];
  if (isDeleting) {
    paragraph.textContent = currentSlogan.substring(0, charIndex--);
    if (charIndex < 0) {
      isDeleting = false;
      sloganIndex = (sloganIndex + 1) % slogans.length;
      setTimeout(type, 500);
    } else {
      setTimeout(type, 50);
    }
  } else {
    paragraph.textContent = currentSlogan.substring(0, charIndex++);
    if (charIndex > currentSlogan.length) {
      isDeleting = true;
      setTimeout(type, 1500);
    } else {
      setTimeout(type, 60);
    }
  }
}

type();

setInterval(() => {
  bar.classList.toggle("hidden");
}, 900);
