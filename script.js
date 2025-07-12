
// script.js - animação dos pontinhos (exemplo)
const starContainer = document.createElement('div');
starContainer.classList.add('stars');
document.body.appendChild(starContainer);

function createStar() {
  const star = document.createElement('div');
  star.classList.add('star');
  star.style.left = Math.random() * 100 + 'vw';
  star.style.animationDuration = (2 + Math.random() * 3) + 's';
  starContainer.appendChild(star);

  setTimeout(() => {
    star.remove();
  }, 5000);
}

setInterval(createStar, 200);
