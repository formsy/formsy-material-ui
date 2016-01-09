import React from 'react';
import Formsy from 'formsy-react';
import Toggle from 'material-ui/lib/toggle';
import FormComponentMixin from './FormComponentMixin';

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
