import { Star, iterationsPerTimestep } from "./star";

let allStars: Star[] = [];
let intervalId: ReturnType<typeof setInterval>;
const newStarInterval = 10;
var photoOfLeo = document.getElementById("photoOfLeoParent");

const createStar = (color: string, isPhotoOfLeo?: boolean) => {
  if (!photoOfLeo) {
    return;
  }
  const newStar = document.createElement("div");
  newStar.setAttribute("class", "star");
  let x = undefined;
  let y = undefined;
  if (isPhotoOfLeo) {
    var rect = photoOfLeo.getBoundingClientRect();
    // Calculate the center coordinates
    x = rect.left + rect.width / 2;
    y = rect.top + rect.height / 2 + 20;
  }
  const starObject = new Star(newStar, x, y);

  newStar.style.backgroundColor = color;

  allStars.push(starObject);
  document.body.appendChild(newStar);
};

export const createAllStarElements = () => {
  const allElements = document.querySelectorAll("[data-star-color]");

  console.log(allElements);

  allElements.forEach((el) => {
    const colour: string = el.attributes["data-star-color"].value;
    el?.addEventListener("mouseover", () => {
      intervalId = setInterval(() => createStar(colour), newStarInterval);
    });

    el?.addEventListener("mouseout", () => {
      clearInterval(intervalId);
    });
  });
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
