import React from 'react';
import Formsy from 'formsy-react';
import Checkbox from 'material-ui/lib/checkbox';

import { _setMuiComponentAndMaybeFocus } from 'formsy-material-ui/lib/utils'
// import { _setMuiComponentAndMaybeFocus } from './utils';

let FormsyCheckbox = React.createClass({
  mixins: [ Formsy.Mixin ],

  propTypes: {
    name: React.PropTypes.string.isRequired
  },

  handleValueChange: function (event, value) {
    this.setValue(value);
    if (this.props.onChange) this.props.onChange(event, value);
  },

  componentDidMount: function () {
    this.setValue(this._muiComponent.isChecked());
  },

  _setMuiComponentAndMaybeFocus: _setMuiComponentAndMaybeFocus,

  render: function () {
    var _value = this.getValue();
    var defaultChecked = this.props.defaultChecked;
    if(typeof _value  === 'undefined' )
      _value = typeof defaultChecked !== 'undefined' ? defaultChecked : false

    return (
      <Checkbox
        {...this.props}
        ref={this._setMuiComponentAndMaybeFocus}
        onCheck={this.handleValueChange}
        checked={_value}
      />
    );
  }
});

module.exports = FormsyCheckbox;
