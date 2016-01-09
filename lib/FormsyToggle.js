'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _formsyReact = require('formsy-react');

var _formsyReact2 = _interopRequireDefault(_formsyReact);

var _materialUiLibToggle = require('material-ui/lib/toggle');

var _materialUiLibToggle2 = _interopRequireDefault(_materialUiLibToggle);

var _FormComponentMixin = require('./FormComponentMixin');

var _FormComponentMixin2 = _interopRequireDefault(_FormComponentMixin);

var FormsyToggle = _react2['default'].createClass({
  displayName: 'FormsyToggle',

  mixins: [_formsyReact2['default'].Mixin, _FormComponentMixin2['default']],

  componentDidMount: function componentDidMount() {
    this.setValue(this._toggle.isToggled());
  },

  render: function render() {
    var _this = this;

    return _react2['default'].createElement(_materialUiLibToggle2['default'], _extends({}, this.props, {
      ref: function (c) {
        return _this._toggle = c;
      },
      onToggle: this.handleValueChange }));
  }
});

module.exports = FormsyToggle;