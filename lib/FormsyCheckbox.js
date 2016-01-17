'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _formsyReact = require('formsy-react');

var _formsyReact2 = _interopRequireDefault(_formsyReact);

var _materialUiLibCheckbox = require('material-ui/lib/checkbox');

var _materialUiLibCheckbox2 = _interopRequireDefault(_materialUiLibCheckbox);

var FormsyCheckbox = _react2['default'].createClass({
  displayName: 'FormsyCheckbox',

  mixins: [_formsyReact2['default'].Mixin],

  propTypes: {
    name: _react2['default'].PropTypes.string.isRequired
  },

  handleValueChange: function handleValueChange(event, value) {
    this.setValue(value);
  },

  componentDidMount: function componentDidMount() {
    this.setValue(this._checkbox.isChecked());
  },

  render: function render() {
    var _this = this;

    return _react2['default'].createElement(_materialUiLibCheckbox2['default'], _extends({}, this.props, {
      ref: function (c) {
        return _this._checkbox = c;
      },
      onCheck: this.handleValueChange,
      checked: this.getValue()
    }));
  }
});

module.exports = FormsyCheckbox;