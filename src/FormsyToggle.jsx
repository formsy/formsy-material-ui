import React from 'react';
import Formsy from 'formsy-react';
import Toggle from 'material-ui/Toggle';
import { setMuiComponentAndMaybeFocus } from './utils';

const FormsyToggle = React.createClass({

  propTypes: {
    defaultToggled: React.PropTypes.bool,
    name: React.PropTypes.string.isRequired,
    onChange: React.PropTypes.func,
    validationError: React.PropTypes.string,
    validationErrors: React.PropTypes.object,
    validations: React.PropTypes.oneOfType([React.PropTypes.string, React.PropTypes.object]),
  },

  mixins: [Formsy.Mixin],

  componentDidMount() {
    this.setValue(this.muiComponent.isToggled());
  },

  handleChange(event, value) {
    this.setValue(value);
    if (this.props.onChange) this.props.onChange(event, value);
  },

  setMuiComponentAndMaybeFocus: setMuiComponentAndMaybeFocus,

  render() {
    const {
      defaultToggled,
      validations, // eslint-disable-line no-unused-vars
      validationError, // eslint-disable-line no-unused-vars
      validationErrors, // eslint-disable-line no-unused-vars
      ...rest } = this.props;

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
  },
});

export default FormsyToggle;
