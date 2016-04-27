import React from 'react';
import Formsy from 'formsy-react';
import Toggle from 'material-ui/Toggle';
import {setMuiComponentAndMaybeFocus} from './utils';

let FormsyToggle = React.createClass({
  mixins: [Formsy.Mixin],

  propTypes: {
    defaultToggled: React.PropTypes.bool,
    name: React.PropTypes.string.isRequired,
    onChange: React.PropTypes.func,
  },

  handleChange(event, value) {
    this.setValue(value);
    if (this.props.onChange) this.props.onChange(event, value);
  },

  componentDidMount() {
    this.setValue(this.muiComponent.isToggled());
  },

  setMuiComponentAndMaybeFocus: setMuiComponentAndMaybeFocus,

  render() {
    const {defaultToggled, ...rest} = this.props;
    let value = this.getValue();

    if (typeof value === 'undefined') {
      value = (typeof defaultToggled !== 'undefined') ? defaultToggled : false;
    }
    
    return (
      <Toggle
        {...rest}
        onToggle={this.handleChange}
        ref={this.setMuiComponentAndMaybeFocus}
        toggled={value}
      />
    );
  }
});

module.exports = FormsyToggle;
