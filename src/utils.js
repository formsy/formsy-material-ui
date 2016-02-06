export function _setMuiComponentAndMaybeFocus (c) {
  if (c === this._muiComponent) return;

  this._muiComponent = c;

  if (c && typeof c.focus === 'function') {
    this.focus = () => c.focus();
  } else if (this.hasOwnProperty('focus')) {
    delete this.focus;
  }
}
