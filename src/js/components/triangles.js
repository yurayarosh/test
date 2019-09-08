import $ from 'jquery';

/* eslint-disable */
const out = $('.out');
out.height('1000px')
const canvas = $('<canvas></canvas>').appendTo(out)[0];

const ctx = canvas.getContext('2d');
const color = '#fc335c';
let idle = null;
let dot;

canvas.width = window.innerWidth;
canvas.height = out.outerHeight();
canvas.style.display = 'block';

ctx.fillStyle = color;
ctx.lineWidth = 0.1;
ctx.strokeStyle = color;

const mousePosition = {
  x: canvas.width / 2,
  y: canvas.width / 2,
};
const dots = {
  nb: 150,
  distance: 90,
  d_radius: 900,
  array: [],
};

function Dot() {
  this.x = Math.random() * canvas.width;
  this.y = Math.random() * canvas.height;

  this.vx = -0.5 + Math.random();
  this.vy = -0.5 + Math.random();

  this.radius = Math.random();
}

Dot.prototype = {
  create() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
    ctx.fill();
  },

  animate() {
    for (let i = 0, dot = false; i < dots.nb; i++) {
      dot = dots.array[i];

      if (dot.y < 0 || dot.y > canvas.height) {
        dot.vx = dot.vx;
        dot.vy = -dot.vy;
      } else if (dot.x < 0 || dot.x > canvas.width) {
        dot.vx = -dot.vx;
        dot.vy = dot.vy;
      }
      dot.x += dot.vx;
      dot.y += dot.vy;
    }
  },

  line() {
    for (let i = 0; i < dots.nb; i++) {
      for (let j = 0; j < dots.nb; j++) {
        let i_dot = dots.array[i];
        let j_dot = dots.array[j];

        if ((i_dot.x - j_dot.x) < dots.distance
          && (i_dot.y - j_dot.y) < dots.distance
          && (i_dot.x - j_dot.x) > -dots.distance
          && (i_dot.y - j_dot.y) > -dots.distance) {
          if ((i_dot.x - mousePosition.x) < dots.d_radius
            && (i_dot.y - mousePosition.y) < dots.d_radius
            && (i_dot.x - mousePosition.x) > -dots.d_radius
            && (i_dot.y - mousePosition.y) > -dots.d_radius) {
            ctx.beginPath();
            ctx.moveTo(i_dot.x, i_dot.y);
            ctx.lineTo(j_dot.x, j_dot.y);
            ctx.stroke();
            ctx.closePath();
          }
        }
      }
    }
  },
};

function createDots() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  for (let i = 0; i < dots.nb; i++) {
    dots.array.push(new Dot());
    dot = dots.array[i];

    dot.create();
  }

  dot.line();
  dot.animate();

  window.requestAnimationFrame(createDots)
}

createDots()

// idle = setInterval(createDots, 1000 / 30);

// $(canvas).on('mousemove mouseleave', (e) => {
//   if (e.type == 'mousemove') {
//     mousePosition.x = canvas.width / 2;
//     mousePosition.y = canvas.height / 2;
//   }
//   if (e.type == 'mouseleave') {
//     mousePosition.x = canvas.width / 2;
//     mousePosition.y = canvas.height / 2;
//   }
// });
/* eslint-enable */
