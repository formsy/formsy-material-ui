import React from 'react';
import Formsy from 'formsy-react';
import SelectField from 'material-ui/lib/select-field';

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
