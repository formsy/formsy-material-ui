import React from 'react';
import Formsy from 'formsy-react';
import DatePicker from 'material-ui/DatePicker';
import { setMuiComponentAndMaybeFocus } from './utils';

const FormsyDate = React.createClass({

  propTypes: {
    defaultDate: React.PropTypes.object,
    name: React.PropTypes.string.isRequired,
    onChange: React.PropTypes.func,
    requiredError: React.PropTypes.string,
    validationError: React.PropTypes.string,
    validationErrors: React.PropTypes.object,
    validations: React.PropTypes.oneOfType([React.PropTypes.string, React.PropTypes.object]),
    value: React.PropTypes.object,
  },

  mixins: [Formsy.Mixin],

  componentDidMount() {
    const { defaultDate } = this.props;
    const value = this.getValue();

    if (typeof value === 'undefined' && typeof defaultDate !== 'undefined') {
      this.setValue(defaultDate);
    }
  },

  componentWillReceiveProps(newProps) {
    if (newProps.value) {
      if (!this.props.value || !datesEq(this.props.value, newProps.value)) {
        this.setValue(newProps.value);
      }
    }
    else if (!this.props.value && newProps.defaultDate) {
      if (!datesEq(this.props.defaultDate, newProps.defaultDate)) {
        this.setValue(newProps.defaultDate);
      }
    }

    /**
     * Check date equality by year, month and day
     * @param {Date} date1
     * @param {Date} date2
     */
    function datesEq(date1, date2) {
      return date1.getFullYear() === date2.getFullYear()
        && date1.getDate() === date2.getDate()
        && date1.getDay() === date2.getDay()
    }
  },

  handleChange(event, value) {
    this.setValue(value);
    if (this.props.onChange) this.props.onChange(event, value);
  },

  setMuiComponentAndMaybeFocus: setMuiComponentAndMaybeFocus,

  render() {
    const {
      defaultDate, // eslint-disable-line no-unused-vars
      validations, // eslint-disable-line no-unused-vars
      validationErrors, // eslint-disable-line no-unused-vars
      validationError, // eslint-disable-line no-unused-vars
      requiredError,
      ...rest } = this.props;
    const { isRequired, isPristine, isValid, isFormSubmitted } = this;
    const isRequiredError = isRequired() && !isPristine() && !isValid() && isFormSubmitted() && requiredError;
    const errorText = this.getErrorMessage() || isRequiredError;
    return (
      <DatePicker
        disabled={this.isFormDisabled()}
        {...rest}
        errorText={errorText}
        onChange={this.handleChange}
        ref={this.setMuiComponentAndMaybeFocus}
        value={this.getValue()}
      />
    );
  },
});

export default FormsyDate;
