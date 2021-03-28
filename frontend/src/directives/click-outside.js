export function clickOutside(node, handler) {
  function handlerClickOutside(event) {
    var isClickInside = node.contains(event.target);

    if (!isClickInside) {
      handler(event);
    }
  }

  document.addEventListener('click', handlerClickOutside);

  return {
    destroy() {
      node.removeEventListener('mousedown', handlerClickOutside);
    },
  };
}
