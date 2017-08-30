import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { HOC } from 'formsy-react';
import DatePicker from 'material-ui/DatePicker';
import { setMuiComponentAndMaybeFocus, timeEq } from './utils';

class FormsyDate extends Component {
  componentDidMount() {
    const { defaultDate, getValue } = this.props;
    const value = getValue();

    if (typeof value === 'undefined' && typeof defaultDate !== 'undefined') {
      this.setValue(defaultDate);
    }
  }

  componentWillReceiveProps(newProps) {
    if (newProps.value) {
      if (!this.props.value || !timeEq(this.props.value, newProps.value)) {
        this.setValue(newProps.value);
      }
    } else if (!this.props.value && newProps.defaultDate) {
      if (!timeEq(this.props.defaultDate, newProps.defaultDate)) {
        this.setValue(newProps.defaultDate);
      }
    }
  }

  setValue = this.props.setValue;

  handleChange = (event, value) => {
    this.setValue(value);
    if (this.props.onChange) this.props.onChange(event, value);
  }

  render() {
    const {
      defaultDate, // eslint-disable-line no-unused-vars
      validations, // eslint-disable-line no-unused-vars
      validationErrors, // eslint-disable-line no-unused-vars
      validationError, // eslint-disable-line no-unused-vars
      requiredError,
      ...rest } = this.props;
    const { isRequired, isPristine, isValid, isFormSubmitted, isFormDisabled, getValue, getErrorMessage } = this.props;
    const isRequiredError = isRequired() && !isPristine() && !isValid() && isFormSubmitted() && requiredError;
    const errorText = getErrorMessage() || isRequiredError;
    return (
      <DatePicker
        disabled={isFormDisabled()}
        errorText={errorText}
        onChange={this.handleChange}
        ref={setMuiComponentAndMaybeFocus}
        value={getValue()}
        {...rest}
      />
    );
  }
}

FormsyDate.propTypes = {
  defaultDate: PropTypes.object,
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
  value: PropTypes.object,
};

export default HOC(FormsyDate);

