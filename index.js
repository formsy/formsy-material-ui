'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var React = require('react');
var Formsy = require('formsy-react');

var Checkbox = require('material-ui/lib/checkbox');
var DatePicker = require('material-ui/lib/date-picker/date-picker');
var RadioButtonGroup = require('material-ui/lib/radio-button-group');
var SelectField = require('material-ui/lib/select-field');
var TextField = require('material-ui/lib/text-field');
var TimePicker = require('material-ui/lib/time-picker/time-picker');
var Toggle = require('material-ui/lib/toggle');

var FormComponentMixin = {
  propTypes: {
    name: React.PropTypes.string.isRequired,
    validations: React.PropTypes.string,
    validationError: React.PropTypes.string,
    hintText: React.PropTypes.string,
    floatingLabelText: React.PropTypes.string
  },

  handleChange: function handleChange(event) {
    this.setValue(event.target.value);
  },

  handleValueChange: function handleValueChange(event, value) {
    this.setValue(value);
  }

};

var FormsyCheckbox = React.createClass({
  displayName: 'FormsyCheckbox',

  mixins: [Formsy.Mixin, FormComponentMixin],

  componentDidMount: function componentDidMount() {
    this.setValue(this._checkbox.isChecked());
  },

  render: function render() {
    var _this = this;

    return React.createElement(Checkbox, _extends({}, this.props, {
      ref: function (c) {
        return _this._checkbox = c;
      },
      onCheck: this.handleValueChange }));
  }
});

var FormsyDate = React.createClass({
  displayName: 'FormsyDate',

  mixins: [Formsy.Mixin, FormComponentMixin],

  render: function render() {
    return React.createElement(DatePicker, _extends({
      formatDate: function (date) {
        return date.toISOString().substring(0, 10);
      }
    }, this.props, {
      onChange: this.handleValueChange }));
  }
});

var FormsyRadio = React.createClass({
  displayName: 'FormsyRadio',

  mixins: [Formsy.Mixin],

  // Material-UI replaces any component inside RadioButtonGroup with RadioButton, so no need to render it here
  render: function render() {}
});

var FormsyRadioGroup = React.createClass({
  displayName: 'FormsyRadioGroup',

  mixins: [Formsy.Mixin, FormComponentMixin],

  componentDidMount: function componentDidMount() {
    this.setValue(this._radio.getSelectedValue());
  },

  render: function render() {
    var _this2 = this;

    return React.createElement(
      RadioButtonGroup,
      _extends({}, this.props, {
        ref: function (c) {
          return _this2._radio = c;
        },
        onChange: this.handleValueChange }),
      this.props.children
    );
  }
});

var FormsySelect = React.createClass({
  displayName: 'FormsySelect',

  mixins: [Formsy.Mixin, FormComponentMixin],

  render: function render() {
    return React.createElement(SelectField, _extends({}, this.props, {
      onChange: this.handleChange,
      value: this.getValue() }));
  }
});

var FormsyText = React.createClass({
  displayName: 'FormsyText',

  mixins: [Formsy.Mixin, FormComponentMixin],

  render: function render() {
    return React.createElement(TextField, _extends({}, this.props, {
      onBlur: this.handleChange,
      errorText: this.getErrorMessage(),
      value: this.getValue() }));
  }
});

var FormsyTime = React.createClass({
  displayName: 'FormsyTime',

  mixins: [Formsy.Mixin, FormComponentMixin],

  render: function render() {
    return React.createElement(TimePicker, _extends({}, this.props, {
      onChange: this.handleValueChange }));
  }
});

var FormsyToggle = React.createClass({
  displayName: 'FormsyToggle',

  mixins: [Formsy.Mixin, FormComponentMixin],

  componentDidMount: function componentDidMount() {
    this.setValue(this._toggle.isToggled());
  },

  render: function render() {
    var _this3 = this;

    return React.createElement(Toggle, _extends({}, this.props, {
      ref: function (c) {
        return _this3._toggle = c;
      },
      onToggle: this.handleValueChange }));
  }
});

module.exports = {
  FormsyCheckbox: FormsyCheckbox,
  FormsyDate: FormsyDate,
  FormsyRadio: FormsyRadio,
  FormsyRadioGroup: FormsyRadioGroup,
  FormsySelect: FormsySelect,
  FormsyText: FormsyText,
  FormsyTime: FormsyTime,
  FormsyToggle: FormsyToggle
};
