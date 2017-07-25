import React, { Component } from 'react';
import createClass from 'create-react-class';
import PropTypes from 'prop-types';
import { HOC } from 'formsy-react';
import Toggle from 'material-ui/Toggle';
import { setMuiComponentAndMaybeFocus } from './utils';

class FormsyToggle extends Component {
  componentDidMount() {
    this.setValue(this.muiComponent.isToggled());
  }

  handleChange = (event, value) => {
    this.setValue(value);
    if (this.props.onChange) this.props.onChange(event, value);
  }

  setValue = this.props.setValue

  render() {
    const {
      defaultToggled,
      validations, // eslint-disable-line no-unused-vars
      validationError, // eslint-disable-line no-unused-vars
      validationErrors, // eslint-disable-line no-unused-vars
      getValue,
      isFormDisabled,
      ...rest } = this.props;

    let value = getValue();

    if (typeof value === 'undefined') {
      value = (typeof defaultToggled !== 'undefined') ? defaultToggled : false;
    }

    return (
      <Toggle
        disabled={isFormDisabled()}
        onToggle={this.handleChange}
        ref={setMuiComponentAndMaybeFocus}
        toggled={value}
        {...rest}
      />
    );
  }
}

FormsyToggle.propTypes = {
  defaultToggled: PropTypes.bool,
  getValue: PropTypes.func.isRequired,
  isFormDisabled: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func,
  setValue: PropTypes.func.isRequired,
  validationError: PropTypes.string,
  validationErrors: PropTypes.object,
  validations: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
};

export default HOC(FormsyToggle);
