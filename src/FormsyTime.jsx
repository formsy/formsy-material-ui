import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { HOC } from 'formsy-react';
import TimePicker from 'material-ui/TimePicker';
import { setMuiComponentAndMaybeFocus, timeEq } from './utils';


class FormsyTime extends Component {
  componentDidMount() {
    const { defaultTime, getValue } = this.props;
    const value = getValue();

    if (typeof value === 'undefined' && typeof defaultTime !== 'undefined') {
      this.setValue(defaultTime);
    }
  }

  componentWillReceiveProps(newProps) {
    if (newProps.value) {
      if (!this.props.value || !timeEq(this.props.value, newProps.value)) {
        this.setValue(newProps.value);
      }
    } else if (!this.props.value && newProps.defaultTime) {
      if (!timeEq(this.props.defaultTime, newProps.defaultTime)) {
        this.setValue(newProps.defaultTime);
      }
    }
  }

  setValue = this.props.setValue

  handleChange = (event, value) => {
    this.setValue(value);
    if (this.props.onChange) this.props.onChange(event, value);
  }

  render() {
    const {
      defaultTime, // eslint-disable-line no-unused-vars
      validations, // eslint-disable-line no-unused-vars
      validationError, // eslint-disable-line no-unused-vars
      validationErrors, // eslint-disable-line no-unused-vars
      isFormDisabled,
      getErrorMessage,
      getValue,
      ...rest
    } = this.props;

    return (
      <TimePicker
        disabled={isFormDisabled()}
        errorText={getErrorMessage()}
        onChange={this.handleChange}
        ref={setMuiComponentAndMaybeFocus}
        value={getValue()}
        {...rest}
      />
    );
  }
}

FormsyTime.propTypes = {
  defaultTime: PropTypes.object,
  getErrorMessage: PropTypes.func.isRequired,
  getValue: PropTypes.func.isRequired,
  isFormDisabled: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func,
  setValue: PropTypes.func.isRequired,
  validationError: PropTypes.string,
  validationErrors: PropTypes.object,
  validations: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  value: PropTypes.object,
};

export default HOC(FormsyTime);
