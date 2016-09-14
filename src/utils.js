export function setMuiComponentAndMaybeFocus(c) {
  if (c === this.muiComponent) return;

  this.muiComponent = c;

  if (c && typeof c.focus === 'function') {
    this.focus = () => c.focus();
  } else if (this.hasOwnProperty('focus')) {
    delete this.focus;
  }
}

export function debounce(fn, delay) {
  let timeout;
  return function() {
    const args = arguments;
    clearTimeout(timeout);
    timeout = setTimeout(() => {
      fn.apply(this, args);
    }, delay);
  };
}
