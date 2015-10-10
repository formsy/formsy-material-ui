'use strict';

let React = require('react');
let Formsy = require('formsy-react');
let MUI = require('material-ui');

let { Checkbox, DatePicker, RadioButtonGroup, SelectField, TextField, TimePicker, Toggle } = MUI;

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

  render: function () {

    return (
      <Checkbox
        {...this.props}
        onCheck={this.handleValueChange}
        value={this.getValue()} />
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
        value={this.getValue()} />
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
        errorText={this.getErrorMessage()} />
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

  render: function () {
    return (
      <Toggle
        {...this.props}
        onToggle={this.handleValueChange}
        value={this.getValue()} />
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