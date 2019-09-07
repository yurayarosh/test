// import { debounce } from 'throttle-debounce';
import NoiseVS from './vs.glsl';
import NoiseFS from './fs.glsl';

class Noise {
  constructor(canvas) {
    this.canvas = canvas;
    this.wrap = canvas.parentNode;
    this.size = {
      width: this.wrap.offsetWidth,
      height: this.wrap.offsetHeight,
    };
  }

  init() {
    this.initWebGLScene();
    this.initRAF();
    // this.setListeners();
  }

  // setListeners() {
  //   this.onResize = debounce(300, this.resize.bind(this));
  //   window.addEventListener('resize', this.onResize);
  // }

  // resize() {
  //   this.initWebGLScene();
  //   this.initRAF();
  // }

  initRAF() {
    this.canvas.style.display = 'block';
    this.canvas.style.backgroundColor = 'transparent';

    this.fps = 2; // target frame rate
    this.frameDuration = 1000 / this.fps; // how long, in milliseconds,
    // a regular frame should take to be drawn

    this.time = 0; // time value, to be sent to shaders, for example
    this.lastTime = 0; // when was the last frame drawn
    this.anim();
  }

  anim(elapsed) {
    if (elapsed) {
      this.delta = elapsed - this.lastTime;
      this.lastTime = elapsed;

      // how much of a frame did the last frame take
      this.step = this.delta / this.frameDuration;
      // add it to the time counter
      this.time += this.step;

      this.gl.uniform1f(this.timeLocation, this.time);
      this.gl.drawArrays(this.gl.TRIANGLES, 0, 6);
    }

    this.raf = window.requestAnimationFrame(this.anim.bind(this));
  }

  initWebGLScene() {
    const { width, height } = this.size;

    this.canvas.width = width;
    this.canvas.height = height;
    this.gl = this.canvas.getContext('webgl');

    this.vertexShader = this.createShader(NoiseVS, this.gl.VERTEX_SHADER);
    this.fragShader = this.createShader(NoiseFS, this.gl.FRAGMENT_SHADER);

    this.program = this.gl.createProgram();
    this.gl.attachShader(this.program, this.vertexShader);
    this.gl.attachShader(this.program, this.fragShader);

    this.gl.linkProgram(this.program);
    this.gl.useProgram(this.program);

    this.timeLocation = this.gl.getUniformLocation(this.program, 'u_time');

    this.gl.pixelStorei(this.gl.UNPACK_FLIP_Y_WEBGL, true);

    // create rectangle
    this.buffer = this.gl.createBuffer();
    this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.buffer);
    this.gl.bufferData(
      this.gl.ARRAY_BUFFER,
      new Float32Array([
        -1.0, 1.0,
        -1.0, -1.0,
        1.0, 1.0,
        -1.0, -1.0,
        1.0, -1.0,
        1.0, 1.0,
      ]),
      this.gl.STATIC_DRAW,
    );

    // vertex data
    this.positionLocation = this.gl.getAttribLocation(this.program, 'a_position');
    this.gl.enableVertexAttribArray(this.positionLocation);
    this.gl.vertexAttribPointer(this.positionLocation, 2, this.gl.FLOAT, false, 0, 0);
  }

  createShader(source, type) {
    const shader = this.gl.createShader(type);
    this.gl.shaderSource(shader, source);
    this.gl.compileShader(shader);

    return shader;
  }


  destroyListeners() {
    window.removeEventListener('resize', this.onResize);
    window.cancelAnimationFrame(this.raf);
  }
}

export default function createNoise() {
  const canvas = document.createElement('canvas');
  const wrap = document.createElement('div');
  wrap.className = 'canvas-bg';
  wrap.appendChild(canvas);
  document.body.querySelector('.out').appendChild(wrap);

  const noise = new Noise(canvas);
  noise.init();
}
