'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _formsyReact = require('formsy-react');

var _formsyReact2 = _interopRequireDefault(_formsyReact);

var _RadioButtonGroup = require('material-ui/lib/RadioButton/RadioButtonGroup');

var _RadioButtonGroup2 = _interopRequireDefault(_RadioButtonGroup);

var _utils = require('./utils');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var FormsyRadioGroup = _react2.default.createClass({
  displayName: 'FormsyRadioGroup',

  mixins: [_formsyReact2.default.Mixin],

  propTypes: {
    name: _react2.default.PropTypes.string.isRequired
  },

  handleValueChange: function handleValueChange(event, value) {
    this.setValue(value);
    if (this.props.onChange) this.props.onChange(event, value);
  },

  componentDidMount: function componentDidMount() {
    this.setValue(this._muiComponent.getSelectedValue());
  },

  _setMuiComponentAndMaybeFocus: _utils._setMuiComponentAndMaybeFocus,

  render: function render() {
    return _react2.default.createElement(
      _RadioButtonGroup2.default,
      _extends({}, this.props, {
        ref: this._setMuiComponentAndMaybeFocus,
        onChange: this.handleValueChange
      }),
      this.props.children
    );
  }
});

module.exports = FormsyRadioGroup;