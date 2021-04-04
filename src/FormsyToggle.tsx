import React from 'react';
import createClass from 'create-react-class';
import PropTypes from 'prop-types';
import Formsy from 'formsy-react';
import Toggle from 'material-ui/Toggle';
import { setMuiComponentAndMaybeFocus } from './utils';

const FormsyToggle = createClass<any, any>({
  propTypes: {
    defaultToggled: PropTypes.bool,
    name: PropTypes.string.isRequired,
    onChange: PropTypes.func,
    validationError: PropTypes.string,
    validationErrors: PropTypes.object,
    validations: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
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
      ...rest
    } = this.props;

    let value = this.getValue();

    if (typeof value === 'undefined') {
      value = typeof defaultToggled !== 'undefined' ? defaultToggled : false;
    }

    return (
      <Toggle
        disabled={this.isFormDisabled()}
        {...rest}
        onToggle={this.handleChange}
        ref={this.setMuiComponentAndMaybeFocus}
        toggled={value}
      />
    );
  },
});

export default FormsyToggle;
