'use strict';

const React = require('react');
const Formsy = require('formsy-react');

const Checkbox = require('material-ui/lib/checkbox');
const DatePicker = require('material-ui/lib/date-picker/date-picker');
const RadioButtonGroup = require('material-ui/lib/radio-button-group');
const SelectField = require('material-ui/lib/select-field');
const TextField = require('material-ui/lib/text-field');
const TimePicker = require('material-ui/lib/time-picker/time-picker');
const Toggle = require('material-ui/lib/toggle');

let FormComponentMixin = {
  propTypes: {
    name: React.PropTypes.string.isRequired,
    validations: React.PropTypes.string,
    validationError: React.PropTypes.string,
    hintText: React.PropTypes.string,
    floatingLabelText: React.PropTypes.string
  },

  handleChange: function (event) {
    this.setValue(event.currentTarget.value);
  },

  handleValueChange: function (event, value) {
    this.setValue(value);
  }

};

let FormsyCheckbox = React.createClass({
  mixins: [ Formsy.Mixin, FormComponentMixin ],

  componentDidMount: function () {
    this.setValue(this._checkbox.isChecked());
  },

  render: function () {
    return (
      <Checkbox
        {...this.props}
        ref={(c) => this._checkbox = c}
        onCheck={this.handleValueChange} />
    );
  }
});

let FormsyDate = React.createClass({
  mixins: [ Formsy.Mixin, FormComponentMixin ],

  render: function () {
    return (
      <DatePicker
        formatDate={(date) => date.toISOString().substring(0,10)}
        {...this.props}
        onChange={this.handleValueChange} />
    );
  }
});

let FormsyRadio = React.createClass({
  mixins: [ Formsy.Mixin ],

  // Material-UI replaces any component inside RadioButtonGroup with RadioButton, so no need to render it here
  render: function () {}
});

let FormsyRadioGroup = React.createClass({
  mixins: [ Formsy.Mixin, FormComponentMixin ],

  componentDidMount: function () {
    this.setValue(this._radio.getSelectedValue());
  },

  render: function () {
    return (
      <RadioButtonGroup
        {...this.props}
        ref={(c) => this._radio = c}
        onChange={this.handleValueChange} >
        {this.props.children}
      </RadioButtonGroup>
    );
  }
});

let FormsySelect = React.createClass({
  mixins: [ Formsy.Mixin, FormComponentMixin],

  render: function () {
    return (
      <SelectField
        {...this.props}
        onChange={this.handleChange}
        value={this.getValue()}
        errorText={this.getErrorMessage()} />
    );
  }
});

let FormsyText = React.createClass({
  mixins: [ Formsy.Mixin, FormComponentMixin ],

  render: function () {
    return (
      <TextField
        {...this.props}
        onChange={this.handleChange}
        errorText={this.getErrorMessage()}
        value={this.getValue()} />
    );
  }
});

let FormsyTime = React.createClass({
  mixins: [ Formsy.Mixin, FormComponentMixin ],

  render: function () {
    return (
      <TimePicker
        {...this.props}
        onChange={this.handleValueChange} />
    );
  }
});

let FormsyToggle = React.createClass({
  mixins: [ Formsy.Mixin, FormComponentMixin ],

  componentDidMount: function () {
    this.setValue(this._toggle.isToggled());
  },

  render: function () {
    return (
      <Toggle
        {...this.props}
        ref={(c) => this._toggle = c}
        onToggle={this.handleValueChange} />
    );
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