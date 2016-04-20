const React = require('react');
const Formsy = require('formsy-react');
const Toggle = require('material-ui/Toggle');
const FormComponentMixin = require('./FormComponentMixin');

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

module.exports = FormsyToggle;
