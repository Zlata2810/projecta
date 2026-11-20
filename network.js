const svg = document.getElementById("net");
const NS = "http://www.w3.org/2000/svg";

if (!svg) {
  throw new Error('Не знайдено SVG-контейнер мережі з id="net".');
}

function make(tag, attrs, parent) {
  const element = document.createElementNS(NS, tag);
  for (const name in attrs) element.setAttribute(name, attrs[name]);
  (parent || svg).appendChild(element);
  return element;
}

const input = [{ x: 110, y: 235, text: ["Промпт", "'З чого складається ШІ?'"], link: "prompt.html" }];
const middle = [
  { x: 390, y: 115, text: ["Можливості"], link: "advantagesAI.html" },
  { x: 390, y: 355, text: ["Виклики та ризики"], link: "friend or threat.html" },
];
const output = [
  { x: 700, y: 65, text: ["Переваги"], link: "advantagesAI.html" },
  { x: 790, y: 235, text: ["ШІ в навчанні"], link: "education.html" },
  { x: 700, y: 405, text: ["Друг чи загроза"], link: "friend or threat.html" },
];

function connect(from, to) {
  make("line", { x1: from.x, y1: from.y, x2: to.x, y2: to.y });
  const dot = make("circle", {
    cx: from.x,
    cy: from.y,
    r: 4,
    class: "signal",
  });
  const animation = {
    dur: "2.8s",
    begin: "0s",
    repeatCount: "indefinite",
    calcMode: "linear",
  };
  make("animate", { attributeName: "cx", from: from.x, to: to.x, ...animation }, dot);
  make("animate", { attributeName: "cy", from: from.y, to: to.y, ...animation }, dot);
}

function drawNode(point, color, radius) {
  const link = make("a", { href: point.link, "aria-label": point.text.join(" ") });
  const circle = make("circle", { cx: point.x, cy: point.y, r: radius, class: color }, link);
  make("animate", {
    attributeName: "r",
    values: `${radius};${radius + 4};${radius}`,
    dur: "2.8s",
    begin: "0s",
    repeatCount: "indefinite",
    calcMode: "spline",
    keyTimes: "0; 0.5; 1",
    keySplines: "0.42 0 0.58 1; 0.42 0 0.58 1",
  }, circle);

  const label = make("text", { x: point.x, y: point.y + radius + 24 }, link);
  point.text.forEach((line, index) => {
    make("tspan", { x: point.x, dy: index === 0 ? 0 : 19 }, label).textContent = line;
  });
}

input.forEach((source) => middle.forEach((target) => connect(source, target)));
middle.forEach((source) => output.forEach((target) => connect(source, target)));
input.forEach((point) => drawNode(point, "blue", 48));
middle.forEach((point) => drawNode(point, "pink", 40));
output.forEach((point) => drawNode(point, "green", 37));
