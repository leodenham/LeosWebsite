// src/star.ts
var timestep = 0.5;
var iterationsPerTimestep = 2;
var gravity = 0.5;
var mouseX = 0;
var mouseY = 0;
document.addEventListener("mousemove", function(e) {
  mouseX = e.clientX;
  mouseY = e.clientY;
});

class Star {
  element;
  x;
  y;
  velX;
  velY;
  currentTime;
  constructor(element, x, y) {
    this.element = element;
    this.x = x ?? mouseX;
    this.y = y ?? mouseY;
    this.velX = -5 + Math.random() * 10;
    this.velY = -Math.random() * 8;
    this.currentTime = 0;
    this.element.style.left = this.x + "px";
    this.element.style.top = this.y + "px";
  }
  update() {
    this.element.style.left = this.x + "px";
    this.element.style.top = this.y + "px";
    this.x += this.velX * timestep / iterationsPerTimestep;
    this.y += this.velY * timestep / iterationsPerTimestep;
    this.currentTime += timestep * 0.01 / iterationsPerTimestep;
    this.velY += gravity * timestep / iterationsPerTimestep;
  }
}

// src/script.ts
var allStars = [];
var intervalId;
var newStarInterval = 10;
var photoOfLeo = document.getElementById("photoOfLeoParent");
var createStar = (color, isPhotoOfLeo) => {
  if (!photoOfLeo) {
    return;
  }
  const newStar = document.createElement("div");
  newStar.setAttribute("class", "star");
  let x = undefined;
  let y = undefined;
  if (isPhotoOfLeo) {
    var rect = photoOfLeo.getBoundingClientRect();
    x = rect.left + rect.width / 2;
    y = rect.top + rect.height / 2 + 20;
  }
  const starObject = new Star(newStar, x, y);
  newStar.style.backgroundColor = color;
  allStars.push(starObject);
  document.body.appendChild(newStar);
};
var createAllStarElements = () => {
  const allElements = document.querySelectorAll("[data-star-color]");
  console.log(allElements);
  allElements.forEach((el) => {
    const colour = el.attributes["data-star-color"].value;
    el?.addEventListener("mouseover", () => {
      intervalId = setInterval(() => createStar(colour), newStarInterval);
    });
    el?.addEventListener("mouseout", () => {
      clearInterval(intervalId);
    });
  });
};
var updateStars = () => {
  for (let i = 0;i < iterationsPerTimestep; i++) {
    allStars.forEach((star) => star.update());
    allStars.filter((star) => star.currentTime >= 2).forEach((star) => document.body.removeChild(star.element));
    allStars = allStars.filter((star) => star.currentTime < 2);
  }
};
setInterval(updateStars, 1);
var myName = document.getElementById("leosName");
var github = document.getElementById("github");
var linkedIn = document.getElementById("linkedin");
myName?.addEventListener("mouseover", () => {
  intervalId = setInterval(createStar, newStarInterval);
});
myName?.addEventListener("mouseout", () => {
  clearInterval(intervalId);
});
github?.addEventListener("mouseover", () => {
  intervalId = setInterval(() => createStar("#f0f0f0"), newStarInterval);
});
github?.addEventListener("mouseout", () => {
  clearInterval(intervalId);
});
linkedIn?.addEventListener("mouseover", () => {
  intervalId = setInterval(() => createStar("#007ebb"), newStarInterval);
});
linkedIn?.addEventListener("mouseout", () => {
  clearInterval(intervalId);
});
photoOfLeo?.addEventListener("mouseover", (e) => {
  intervalId = setInterval(() => createStar("#eb213f", true), newStarInterval);
});
photoOfLeo?.addEventListener("mouseout", () => {
  clearInterval(intervalId);
});
export {
  createAllStarElements
};
