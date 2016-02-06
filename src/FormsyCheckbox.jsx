import React from 'react';
import Formsy from 'formsy-react';
import Checkbox from 'material-ui/lib/checkbox';
import { _setMuiComponentAndMaybeFocus } from './utils';

let FormsyCheckbox = React.createClass({
  mixins: [ Formsy.Mixin ],

  propTypes: {
    name: React.PropTypes.string.isRequired
  },

  handleValueChange: function (event, value) {
    this.setValue(value);
  },

  componentDidMount: function () {
    this.setValue(this._muiComponent.isChecked());
  },

  _setMuiComponentAndMaybeFocus: _setMuiComponentAndMaybeFocus,

  render: function () {
    return (
      <Checkbox
        {...this.props}
        ref={this._setMuiComponentAndMaybeFocus}
        onCheck={this.handleValueChange}
        checked={this.getValue()}
      />
    );
  }
});

module.exports = FormsyCheckbox;
