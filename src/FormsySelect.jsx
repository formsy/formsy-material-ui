import React from 'react';
import Formsy from 'formsy-react';
import SelectField from 'material-ui/SelectField';
import {_setMuiComponentAndMaybeFocus} from './utils';

let FormsySelect = React.createClass({
  mixins: [Formsy.Mixin],

  propTypes: {
    name: React.PropTypes.string.isRequired
  },

  getInitialState: function () {
    return {
      hasChanged: false,
    };
  },

  handleChange: function (event, index, value) {
    this.setValue(value);
    this.setState({hasChanged: value !== ''});
    if (this.props.onChange) this.props.onChange(event, value, index);
  },

  _setMuiComponentAndMaybeFocus: _setMuiComponentAndMaybeFocus,

  render: function () {
    var value = this.state.hasChanged ? this.getValue() : this.props.value;

    return (
      <SelectField
        {...this.props}
        ref={this._setMuiComponentAndMaybeFocus}
        onChange={this.handleChange}
        errorText={this.getErrorMessage()}
        value={value}
      >
        {this.props.children}
      </SelectField>
    );
  }
});

export default FormsySelect;
