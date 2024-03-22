let mouseX = 0;
let mouseY = 0;
let allStars = [];
let intervalId;

class Star {
  constructor(element) {
    this.element = element;

    this.x = mouseX;
    this.y = mouseY;
    this.velX = -5 + Math.random() * 10;
    this.velY = -5 + Math.random() * 10;
    this.currentTime = 0;
    this.element.style.left = this.x + "px";
    this.element.style.top = this.y + "px";
  }

  update() {
    this.element.style.left = this.x + "px";
    this.element.style.top = this.y + "px";
    this.x += this.velX;
    this.y += this.velY;
    this.currentTime += 0.01;
    this.velY += 0.2;
  }
}

const createStar = (context) => {
  const newStar = document.createElement("div");
  newStar.setAttribute("class", "star");
  const starObject = new Star(newStar);
  console.log(context);

  if (context === "github") {
    newStar.style.backgroundColor = "#f0f0f0";
  } else if (context === "linkedin") {
    newStar.style.backgroundColor = "#007ebb";
  }

  allStars.push(starObject);
  document.body.appendChild(newStar);
};

const updateStars = () => {
  allStars.forEach((star) => star.update());
  allStars
    .filter((star) => star.currentTime >= 2)
    .forEach((star) => document.body.removeChild(star.element));
  allStars = allStars.filter((star) => star.currentTime < 2);
};

setInterval(updateStars, 1);

var myName = document.getElementById("leosName");
var github = document.getElementById("github");

var linkedIn = document.getElementById("linkedin");

myName.addEventListener("mouseover", () => {
  intervalId = setInterval(createStar, 1);
});

myName.addEventListener("mouseout", () => {
  clearInterval(intervalId);
});

github.addEventListener("mouseover", () => {
  intervalId = setInterval(() => createStar("github"), 1);
});

github.addEventListener("mouseout", () => {
  clearInterval(intervalId);
});

linkedIn.addEventListener("mouseover", () => {
  intervalId = setInterval(() => createStar("linkedin"), 1);
});

linkedIn.addEventListener("mouseout", () => {
  clearInterval(intervalId);
});

document.addEventListener("mousemove", function (e) {
  mouseX = e.clientX;
  mouseY = e.clientY;
});
