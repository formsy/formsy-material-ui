import React from 'react';
import Formsy from 'formsy-react';
import Toggle from 'material-ui/lib/toggle';

let FormsyToggle = React.createClass({
  mixins: [ Formsy.Mixin ],

  propTypes: {
    name: React.PropTypes.string.isRequired
  },

  handleValueChange: function (event, value) {
    this.setValue(value);
  },

  componentDidMount: function () {
    this.setValue(this._toggle.isToggled());
  },

  render: function () {
    return (
      <Toggle
        {...this.props}
        ref={(c) => this._toggle = c}
        onToggle={this.handleValueChange}
      />
    );
  }
});

module.exports = FormsyToggle;
