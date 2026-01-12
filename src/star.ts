export const timestep = 0.5;
export const iterationsPerTimestep = 2;
export const gravity = 0.5;

let mouseX = 0;
let mouseY = 0;

document.addEventListener("mousemove", function (e) {
  mouseX = e.clientX;
  mouseY = e.clientY;
});

export class Star {
  readonly element: HTMLElement;

  private x: number;
  private y: number;
  private velX: number;
  private velY: number;
  currentTime: number;

  constructor(element: HTMLElement, x?: number, y?: number) {
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
    this.x += (this.velX * timestep) / iterationsPerTimestep;
    this.y += (this.velY * timestep) / iterationsPerTimestep;
    this.currentTime += (timestep * 0.01) / iterationsPerTimestep;
    this.velY += (gravity * timestep) / iterationsPerTimestep;
  }
}
