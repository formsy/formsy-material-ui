const React = require('react');
const Formsy = require('formsy-react');
const SelectField = require('material-ui/SelectField');
const FormComponentMixin = require('./FormComponentMixin');

let FormsySelect = React.createClass({
  mixins: [ Formsy.Mixin],

  propTypes: {
    name: React.PropTypes.string.isRequired
  },

  handleChange: function (event) {
    this.setValue(event.target.value);
  },

  render: function () {
    return (
      <SelectField
        {...this.props}
        onChange={this.handleChange}
        errorText={this.getErrorMessage()}
        value={this.getValue()} />
    );
  }
});

module.exports = FormsySelect;
