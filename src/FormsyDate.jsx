import React from 'react';
import Formsy from 'formsy-react';
import DatePicker from 'material-ui/lib/date-picker/date-picker';

let FormsyDate = React.createClass({
  mixins: [ Formsy.Mixin ],

  propTypes: {
    name: React.PropTypes.string.isRequired
  },

  handleValueChange: function (event, value) {
    this.setValue(value);
  },

  render: function () {
    return (
      <DatePicker
        // Sets the default date format to be ISO8601 (YYYY-MM-DD), accounting for current timezone
        formatDate={(date) => (new Date(date.toDateString()+" 12:00:00 +0000")).toISOString().substring(0,10)}
        {...this.props}
        defaultValue={this.props.value}
        onChange={this.handleValueChange}
        errorText={this.getErrorMessage()}
        value={this.getValue()}
      />
    );
  }
});

module.exports = FormsyDate;
