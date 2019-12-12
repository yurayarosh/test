import Perlin from '../lib/perlin';

const canvas = document.createElement('canvas');
const ctx = canvas.getContext('2d');
const SIZE = 600;
canvas.width = SIZE;
canvas.height = SIZE;
// canvas.style.width = `${SIZE / 2}px`;
// canvas.style.height = `${SIZE / 2}px`;
canvas.style.backgroundColor = '#000';
canvas.style.display = 'block';


document.querySelector('.out').appendChild(canvas);


const NUM = 100;

// function random(num) {
//   return Math.floor(Math.random() * num);
// }

function draw(time) {
  // ctx.clearRect(0, 0, SIZE, SIZE);
  // ctx.save();
  ctx.beginPath();
  for (let i = 0; i < NUM; i++) {
    ctx.lineTo(i * 10, 400 * Perlin(i / 20, time / 200 + i / 1000, 0));
  }
  ctx.strokeStyle = '#fff';
  ctx.globalAlpha = 0.05;
  ctx.stroke();
  // ctx.restore();
}

let time = 0;

function render() {
  time += 1;
  draw(time);

  window.requestAnimationFrame(render);
}

render();
