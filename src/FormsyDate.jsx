const React = require('react');
const Formsy = require('formsy-react');
const DatePicker = require('material-ui/lib/date-picker/date-picker');
const FormComponentMixin = require('./FormComponentMixin');

let FormsyDate = React.createClass({
  mixins: [ Formsy.Mixin, FormComponentMixin ],

  render: function () {
    return (
      <DatePicker
        // Sets the default date format to be ISO8601 (YYYY-MM-DD), accounting for current timezone
        formatDate={(date) => (new Date(date.toDateString()+" 12:00:00 +0000")).toISOString().substring(0,10)}
        {...this.props}
        defaultValue={this.props.value}
        onChange={this.handleValueChange}
        errorText={this.getErrorMessage()}
        value={this.getValue()} />
    );
  }
});

module.exports = FormsyDate;
