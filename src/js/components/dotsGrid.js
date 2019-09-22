import $ from 'jquery';

const dotsCanvas = {
  init() {
    if (/Mobi/.test(navigator.userAgent)) { return; }

    const $blocks = $('[data-dots]');

    $blocks.each(function () {
      const $block = $(this);
      const block = $block[0];
      const $canvas = $('<canvas/>').appendTo($block);
      const canvas = $canvas[0];

      const width = $block.width();
      const height = $block.height();

      const ctx = canvas.getContext('2d');

      ctx.width = width;
      ctx.height = height;

      const devicePixelRatio = window.devicePixelRatio || 1;
      const backingStoreRatio = ctx.webkitBackingStorePixelRatio
        || ctx.mozBackingStorePixelRatio
        || ctx.msBackingStorePixelRatio
        || ctx.oBackingStorePixelRatio
        || ctx.backingStorePixelRatio
         || 1;

      const ratio = devicePixelRatio / backingStoreRatio;

      canvas.width = width * ratio;
      canvas.height = height * ratio;

      ctx.scale(ratio, ratio);

      let mouseX;
      let mouseY;

      function Circle(x, y) {
        this.x = x;
        this.y = y;
        this.distance = 10;
        this.radians = 0;

        this.draw = function () {
          ctx.beginPath();
          // ctx.strokeStyle = 'rgba(151, 151, 151, .3)';


          // ctx.moveTo(this.x + 3, this.y);
          // ctx.lineTo(this.x + 3, this.y + 6);
          // ctx.moveTo(this.x, this.y + 3);
          // ctx.lineTo(this.x + 6, this.y + 3);
          // ctx.lineWidth = 3;

          ctx.arc(this.x + 3, this.y + 3, 2, 0, 2 * Math.PI);
          ctx.fill();
        };
        this.update = function () {
          if (mouseX > -1) {
            const k1 = mouseY - y;
            const k2 = mouseX - x;
            const tan = k1 / k2;
            let yrad = Math.atan(tan);

            if (mouseX < x) {
              yrad = Math.PI - Math.atan(-tan);
            }

            this.x = x + Math.cos(yrad) * this.distance;
            this.y = y + Math.sin(yrad) * this.distance;
          }

          this.draw();
        };
      }

      const circlesArray = [];

      const gutter = 20;
      const countW = Math.floor(width / gutter);
      const countH = Math.floor(height / gutter);

      const len = countW * countH;
      for (let i = 0; i < countH; i++) {
        for (let t = 0; t < countW; t++) {
          const x = gutter * t;
          const y = gutter * i;

          circlesArray.push(new Circle(x, y));
        }
      }

      const loop = function () {
        ctx.clearRect(0, 0, ctx.width, ctx.height);
        for (let i = 0; i < circlesArray.length; i++) {
          circlesArray[i].update();
        }
      };

      // canvas.addEventListener('mousemove', function(e) {

      //     var parentOffset = $(this).parent().offset();
      //     var relX = e.pageX - parentOffset.left;
      //     var relY = e.pageY - parentOffset.top;

      //     mouseX = relX;
      //     mouseY = relY;

      //     ctx.clearRect(0, 0, ctx.width, ctx.height);
      //     for (var i = 0; i < circlesArray.length; i++) {
      //         circlesArray[i].update();
      //     }

      //     loop();
      // });

      document.addEventListener('mousemove', (e) => {
        const parentOffset = $(canvas).parent().offset();
        const relX = e.pageX - parentOffset.left;
        const relY = e.pageY - parentOffset.top;

        mouseX = relX;
        mouseY = relY;

        ctx.clearRect(0, 0, ctx.width, ctx.height);
        for (let i = 0; i < circlesArray.length; i++) {
          circlesArray[i].update();
        }

        loop();
      });

      loop();
    });
  },
};

dotsCanvas.init();
