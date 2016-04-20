const React = require('react');
const Formsy = require('formsy-react');
const TimePicker = require('material-ui/TimePicker/TimePicker').default;
const FormComponentMixin = require('./FormComponentMixin');

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

module.exports = FormsyTime;
