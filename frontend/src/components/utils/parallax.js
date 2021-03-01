import { gsap } from 'gsap';

let globalParallax = [];
let gsapAnimations = [];

let mounted = false;

const startAnimation = () => {
  gsapAnimations.forEach(animation => animation());

  if (!mounted) return;

  const rect = document.body;
  let mouse = [0, 0, false];

  rect.addEventListener(
    'mousemove',
    event => {
      mouse = [event.x, event.y, true];
    },
    { passive: true },
  );

  const animate = (target, movement) => {
    gsap.to(target, {
      x: ((mouse[0] - rect.clientWidth / 2) / rect.clientWidth) * movement,
      y: ((mouse[1] - rect.clientHeight) / rect.clientHeight) * movement,
      duration: 0.5,
    });
  };
  const step = () => {
    if (mouse[2]) {
      globalParallax.forEach(({ selector, offset }) => {
        animate(selector, offset);
      });
    }

    window.requestAnimationFrame(step);
  };

  window.requestAnimationFrame(step);
};

const initParallax = (parallax, gsapAnimation) => {
  globalParallax.push(...parallax);
  gsapAnimations.push(gsapAnimation);
};

const initAnimations = () => {
  if (window.outerWidth < 960) return;

  mounted = true;
  startAnimation();
};

export { initParallax, initAnimations };
