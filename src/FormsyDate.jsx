const React = require('react');
const Formsy = require('formsy-react');
const DatePicker = require('material-ui/DatePicker/DatePicker');
const FormComponentMixin = require('./FormComponentMixin');

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

module.exports = FormsyDate;
