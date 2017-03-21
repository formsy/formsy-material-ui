import React from 'react';
import Formsy from 'formsy-react';
import TimePicker from 'material-ui/TimePicker';
import { setMuiComponentAndMaybeFocus } from './utils';

const FormsyTime = React.createClass({

  propTypes: {
    defaultTime: React.PropTypes.object,
    name: React.PropTypes.string.isRequired,
    onChange: React.PropTypes.func,
    validationError: React.PropTypes.string,
    validationErrors: React.PropTypes.object,
    validations: React.PropTypes.oneOfType([React.PropTypes.string, React.PropTypes.object]),
    value: React.PropTypes.object,
  },

  mixins: [Formsy.Mixin],

  componentDidMount() {
    const { defaultTime } = this.props;
    const value = this.getValue();

    if (typeof value === 'undefined' && typeof defaultTime !== 'undefined') {
      this.setValue(defaultTime);
    }
  },

  componentWillReceiveProps(newProps) {
    if (newProps.value) {
      if (!this.props.value || !timesEq(this.props.value, newProps.value)) {
        this.setValue(newProps.value);
      }
    } else if (!this.props.value && newProps.defaultTime) {
      if (!timesEq(this.props.defaultTime, newProps.defaultTime)) {
        this.setValue(newProps.defaultTime);
      }
    }

    /**
     * Check time equality by hours and minutes
     * @param {Date} date1
     * @param {Date} date2
     */
    function timesEq(date1, date2) {
      return date1.getHours() === date2.getHours() &&
        date1.getMinutes() === date2.getMinutes();
    }
  },

  handleChange(event, value) {
    this.setValue(value);
    if (this.props.onChange) this.props.onChange(event, value);
  },

  setMuiComponentAndMaybeFocus: setMuiComponentAndMaybeFocus,

  render() {
    const {
      defaultTime, // eslint-disable-line no-unused-vars
      validations, // eslint-disable-line no-unused-vars
      validationError, // eslint-disable-line no-unused-vars
      validationErrors, // eslint-disable-line no-unused-vars
      ...rest,
    } = this.props;

    return (
      <TimePicker
        disabled={this.isFormDisabled()}
        {...rest}
        errorText={this.getErrorMessage()}
        onChange={this.handleChange}
        ref={this.setMuiComponentAndMaybeFocus}
        value={this.getValue()}
      />
    );
  },
});

export default FormsyTime;
