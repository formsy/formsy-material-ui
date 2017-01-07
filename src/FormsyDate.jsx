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
        {...rest}
        errorText={errorText}
        onChange={this.handleChange}
        ref={this.setMuiComponentAndMaybeFocus}
        value={this.getValue()}
        disabled={this.isFormDisabled()}
      />
    );
  },
});

export default FormsyDate;
