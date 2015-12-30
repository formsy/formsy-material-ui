'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _formsyReact = require('formsy-react');

var _formsyReact2 = _interopRequireDefault(_formsyReact);

var _materialUiLibRadioButtonGroup = require('material-ui/lib/radio-button-group');

var _materialUiLibRadioButtonGroup2 = _interopRequireDefault(_materialUiLibRadioButtonGroup);

var _FormComponentMixin = require('./FormComponentMixin');

var _FormComponentMixin2 = _interopRequireDefault(_FormComponentMixin);

exports['default'] = _react2['default'].createClass({
  displayName: 'FormsyRadioGroup',

  mixins: [_formsyReact2['default'].Mixin, _FormComponentMixin2['default']],

  componentDidMount: function componentDidMount() {
    this.setValue(this._radio.getSelectedValue());
  },

  render: function render() {
    var _this = this;

    return _react2['default'].createElement(
      _materialUiLibRadioButtonGroup2['default'],
      _extends({}, this.props, {
        ref: function (c) {
          return _this._radio = c;
        },
        onChange: this.handleValueChange }),
      this.props.children
    );
  }
});
module.exports = exports['default'];