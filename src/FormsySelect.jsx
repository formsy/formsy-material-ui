import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { HOC } from 'formsy-react';
import SelectField from 'material-ui/SelectField';
import { setMuiComponentAndMaybeFocus } from './utils';

class FormsySelect extends Component {
  constructor() {
    super();
    this.state = {
      hasChanged: false,
    };
  }

  setValue = this.props.setValue;  

  handleChange(event, index, value) {
    this.setValue(value);

    this.setState({
      hasChanged: value !== '',
    });

    if (this.props.onChange) this.props.onChange(event, value, index);
  }

  render() {
    const {
      requiredError,
      validations, // eslint-disable-line no-unused-vars
      validationError, // eslint-disable-line no-unused-vars
      validationErrors, // eslint-disable-line no-unused-vars
      value: valueProp,
      onChange,
      ...rest
    } = this.props;

    const { isRequired, isPristine, isValid, isFormSubmitted, isFormDisabled, getValue, getErrorMessage } = this.props;
    const isRequiredError = isRequired() && !isPristine() && !isValid() && isFormSubmitted() && requiredError;
    const errorText = getErrorMessage() || isRequiredError;
    const value = this.state.hasChanged ? getValue() : valueProp;

    return (
      <SelectField
        disabled={isFormDisabled()}
        errorText={errorText}
        onChange={this.handleChange}
        ref={setMuiComponentAndMaybeFocus}
        value={value}
        {...rest}
      >
        {this.props.children}
      </SelectField>
    );
  }
}

FormsySelect.propTypes = {
  children: PropTypes.node,
  getErrorMessage: PropTypes.func.isRequired,
  getValue: PropTypes.func.isRequired,
  isFormDisabled: PropTypes.func.isRequired,
  isFormSubmitted: PropTypes.func.isRequired,
  isPristine: PropTypes.func.isRequired,
  isRequired: PropTypes.func.isRequired,
  isValid: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func,
  requiredError: PropTypes.string,
  setValue: PropTypes.func.isRequired,  
  validationError: PropTypes.string,
  validationErrors: PropTypes.object,
  validations: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  value: PropTypes.any,
};

export default HOC(FormsySelect);
