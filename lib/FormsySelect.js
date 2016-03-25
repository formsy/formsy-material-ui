'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _formsyReact = require('formsy-react');

var _formsyReact2 = _interopRequireDefault(_formsyReact);

var _SelectField = require('material-ui/lib/SelectField');

var _SelectField2 = _interopRequireDefault(_SelectField);

var _utils = require('./utils');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var FormsySelect = _react2.default.createClass({
  displayName: 'FormsySelect',

  mixins: [_formsyReact2.default.Mixin],

  propTypes: {
    name: _react2.default.PropTypes.string.isRequired
  },

  getInitialState: function getInitialState() {
    return {
      hasChanged: false
    };
  },

  handleChange: function handleChange(event, index, value) {
    this.setValue(value);
    this.setState({ hasChanged: true });
    if (this.props.onChange) this.props.onChange(event, value, index);
  },

  _setMuiComponentAndMaybeFocus: _utils._setMuiComponentAndMaybeFocus,

  render: function render() {
    var value = this.state.hasChanged ? this.getValue() : this.props.value;

    return _react2.default.createElement(
      _SelectField2.default,
      _extends({}, this.props, {
        ref: this._setMuiComponentAndMaybeFocus,
        onChange: this.handleChange,
        errorText: this.getErrorMessage(),
        value: value
      }),
      this.props.children
    );
  }
});

module.exports = FormsySelect;