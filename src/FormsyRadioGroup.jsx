const React = require('react');
const Formsy = require('formsy-react');
const RadioButtonGroup = require('material-ui/lib/radio-button-group');
const FormComponentMixin = require('./FormComponentMixin');

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

module.exports = FormsyRadioGroup;
