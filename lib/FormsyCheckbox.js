'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _formsyReact = require('formsy-react');

var _formsyReact2 = _interopRequireDefault(_formsyReact);

var _Checkbox = require('material-ui/Checkbox');

var _Checkbox2 = _interopRequireDefault(_Checkbox);

var _utils = require('./utils');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var FormsyCheckbox = _react2.default.createClass({
  displayName: 'FormsyCheckbox',

  mixins: [_formsyReact2.default.Mixin],

  propTypes: {
    name: _react2.default.PropTypes.string.isRequired
  },

  handleValueChange: function handleValueChange(event, value) {
    this.setValue(value);
    if (this.props.onChange) this.props.onChange(event, value);
  },

  componentDidMount: function componentDidMount() {
    this.setValue(this._muiComponent.isChecked());
  },

  _setMuiComponentAndMaybeFocus: _utils._setMuiComponentAndMaybeFocus,

  render: function render() {
    return _react2.default.createElement(_Checkbox2.default, _extends({}, this.props, {
      ref: this._setMuiComponentAndMaybeFocus,
      onCheck: this.handleValueChange,
      checked: this.getValue()
    }));
  }
});

exports.default = FormsyCheckbox;