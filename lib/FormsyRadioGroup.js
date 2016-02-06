'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _formsyReact = require('formsy-react');

var _formsyReact2 = _interopRequireDefault(_formsyReact);

var _materialUiLibRadioButtonGroup = require('material-ui/lib/radio-button-group');

var _materialUiLibRadioButtonGroup2 = _interopRequireDefault(_materialUiLibRadioButtonGroup);

var _utils = require('./utils');

var FormsyRadioGroup = _react2['default'].createClass({
  displayName: 'FormsyRadioGroup',

  mixins: [_formsyReact2['default'].Mixin],

  propTypes: {
    name: _react2['default'].PropTypes.string.isRequired
  },

  handleValueChange: function handleValueChange(event, value) {
    this.setValue(value);
  },

  componentDidMount: function componentDidMount() {
    this.setValue(this._muiComponent.getSelectedValue());
  },

  _setMuiComponentAndMaybeFocus: _utils._setMuiComponentAndMaybeFocus,

  render: function render() {
    return _react2['default'].createElement(
      _materialUiLibRadioButtonGroup2['default'],
      _extends({}, this.props, {
        ref: this._setMuiComponentAndMaybeFocus,
        onChange: this.handleValueChange
      }),
      this.props.children
    );
  }
});

module.exports = FormsyRadioGroup;