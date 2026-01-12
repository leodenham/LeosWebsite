import { Star, iterationsPerTimestep } from "./star";

let allStars: Star[] = [];
let intervalId: ReturnType<typeof setInterval>;
const newStarInterval = 10;
var photoOfLeo = document.getElementById("photoOfLeoParent");

const createStar = (context: "photoOfLeo" | "github" | "linkedin") => {
  if (!photoOfLeo) {
    return;
  }
  const newStar = document.createElement("div");
  newStar.setAttribute("class", "star");
  let x = undefined;
  let y = undefined;
  if (context === "photoOfLeo") {
    var rect = photoOfLeo.getBoundingClientRect();
    // Calculate the center coordinates
    x = rect.left + rect.width / 2;
    y = rect.top + rect.height / 2 + 20;
  }
  const starObject = new Star(newStar, x, y);

  if (context === "github") {
    newStar.style.backgroundColor = "#f0f0f0";
  } else if (context === "linkedin") {
    newStar.style.backgroundColor = "#007ebb";
  } else if (context === "photoOfLeo") {
    newStar.style.backgroundColor = "#eb213f";
  }

  allStars.push(starObject);
  document.body.appendChild(newStar);
};

const updateStars = () => {
  for (let i = 0; i < iterationsPerTimestep; i++) {
    allStars.forEach((star) => star.update());
    allStars
      .filter((star) => star.currentTime >= 2)
      .forEach((star) => document.body.removeChild(star.element));
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
  intervalId = setInterval(() => createStar("github"), newStarInterval);
});

github?.addEventListener("mouseout", () => {
  clearInterval(intervalId);
});

linkedIn?.addEventListener("mouseover", () => {
  intervalId = setInterval(() => createStar("linkedin"), newStarInterval);
});

linkedIn?.addEventListener("mouseout", () => {
  clearInterval(intervalId);
});

photoOfLeo?.addEventListener("mouseover", (e) => {
  intervalId = setInterval(() => createStar("photoOfLeo"), newStarInterval);
});

photoOfLeo?.addEventListener("mouseout", () => {
  clearInterval(intervalId);
});
