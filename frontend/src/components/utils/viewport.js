const intersectionObservers = {};

const observers = {
  class: entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        intersectionObservers['class'].unobserve(entry.target);
      }
    });
  },
  default: entries => {
    entries.forEach(entry => {
      const eventName = entry.isIntersecting ? 'enterViewport' : 'exitViewport';
      entry.target.dispatchEvent(new CustomEvent(eventName));
    });
  },
};

function ensureIntersectionObserver(name, config) {
  if (intersectionObservers[name]) return;

  intersectionObservers[name] = new IntersectionObserver(
    observers[name],
    config,
  );
}

function viewport(element, name = 'default', config = {}) {
  ensureIntersectionObserver(name, config);

  intersectionObservers[name].observe(element);

  return {
    destroy() {
      intersectionObservers[name].unobserve(element);
    },
  };
}

function viewClass(element) {
  element.classList.add('animate');
  viewport(element, 'class', {
    rootMargin: '-100px 0px -50% 0px',
  });
}

export { viewport, viewClass };
