'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});
exports._setMuiComponentAndMaybeFocus = _setMuiComponentAndMaybeFocus;

function _setMuiComponentAndMaybeFocus(c) {
  if (c === this._muiComponent) return;

  this._muiComponent = c;

  if (c && typeof c.focus === 'function') {
    this.focus = function () {
      return c.focus();
    };
  } else if (this.hasOwnProperty('focus')) {
    delete this.focus;
  }
}