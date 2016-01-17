import React from 'react';
import Formsy from 'formsy-react';
import TimePicker from 'material-ui/lib/time-picker/time-picker';

let FormsyTime = React.createClass({
  mixins: [ Formsy.Mixin ],

  propTypes: {
    name: React.PropTypes.string.isRequired
  },

  handleValueChange: function (event, value) {
    this.setValue(value);
  },

  render: function () {
    return (
      <TimePicker
        {...this.props}
        onChange={this.handleValueChange}
      />
    );
  }
});

module.exports = FormsyTime;
