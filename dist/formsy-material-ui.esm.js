import React from 'react';
import createClass from 'create-react-class';
import PropTypes from 'prop-types';
import Formsy from 'formsy-react';
import Checkbox from 'material-ui/Checkbox';
import DatePicker from 'material-ui/DatePicker';
import { RadioButton, RadioButtonGroup } from 'material-ui/RadioButton';
import SelectField from 'material-ui/SelectField';
import keycode from 'keycode';
import TextField from 'material-ui/TextField';
import TimePicker from 'material-ui/TimePicker';
import Toggle from 'material-ui/Toggle';
import AutoComplete from 'material-ui/AutoComplete';
import { setMuiComponentAndMaybeFocus as setMuiComponentAndMaybeFocus$1 } from 'formsy-react/src/utils';

function _objectWithoutPropertiesLoose(source, excluded) {
  if (source == null) return {};
  var target = {};
  var sourceKeys = Object.keys(source);
  var key, i;

  for (i = 0; i < sourceKeys.length; i++) {
    key = sourceKeys[i];
    if (excluded.indexOf(key) >= 0) continue;
    target[key] = source[key];
  }

  return target;
}

function setMuiComponentAndMaybeFocus(c) {
  if (c === this.muiComponent) return;
  this.muiComponent = c;

  if (c && typeof c.focus === 'function') {
    this.focus = function () {
      return c.focus();
    };
  } else if (this.hasOwnProperty('focus')) {
    delete this.focus;
  }
}
function debounce(fn, delay) {
  var timeout;
  return function () {
    var _this = this;

    var args = arguments;
    clearTimeout(timeout);
    timeout = setTimeout(function () {
      fn.apply(_this, args);
    }, delay);
  };
}

var FormsyCheckbox = /*#__PURE__*/createClass({
  propTypes: {
    defaultChecked: PropTypes.bool,
    name: PropTypes.string.isRequired,
    onChange: PropTypes.func,
    validationError: PropTypes.string,
    validationErrors: PropTypes.object,
    validations: /*#__PURE__*/PropTypes.oneOfType([PropTypes.string, PropTypes.object])
  },
  mixins: [Formsy.Mixin],
  componentDidMount: function componentDidMount() {
    this.setValue(this.muiComponent.isChecked());
  },
  handleChange: function handleChange(event, value) {
    this.setValue(value);
    if (this.props.onChange) this.props.onChange(event, value);
  },
  setMuiComponentAndMaybeFocus: setMuiComponentAndMaybeFocus,
  render: function render() {
    var _this$props = this.props,
        defaultChecked = _this$props.defaultChecked,
        rest = _objectWithoutPropertiesLoose(_this$props, ["defaultChecked", "validations", "validationErrors", "validationError"]);

    var value = this.getValue();

    if (typeof value === 'undefined') {
      value = typeof defaultChecked !== 'undefined' ? defaultChecked : false;
    }

    return React.createElement(Checkbox, Object.assign({
      disabled: this.isFormDisabled()
    }, rest, {
      checked: value,
      onCheck: this.handleChange,
      ref: this.setMuiComponentAndMaybeFocus
    }));
  }
});

var FormsyDate = /*#__PURE__*/createClass({
  propTypes: {
    defaultDate: PropTypes.object,
    name: PropTypes.string.isRequired,
    onChange: PropTypes.func,
    requiredError: PropTypes.string,
    validationError: PropTypes.string,
    validationErrors: PropTypes.object,
    validations: /*#__PURE__*/PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
    value: PropTypes.object
  },
  mixins: [Formsy.Mixin],
  componentDidMount: function componentDidMount() {
    var defaultDate = this.props.defaultDate;
    var value = this.getValue();

    if (typeof value === 'undefined' && typeof defaultDate !== 'undefined') {
      this.setValue(defaultDate);
    }
  },
  componentWillReceiveProps: function componentWillReceiveProps(newProps) {
    if (newProps.value) {
      if (!this.props.value || !datesEq(this.props.value, newProps.value)) {
        this.setValue(newProps.value);
      }
    } else if (!this.props.value && newProps.defaultDate) {
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
      return date1.getFullYear() === date2.getFullYear() && date1.getDate() === date2.getDate() && date1.getDay() === date2.getDay();
    }
  },
  handleChange: function handleChange(event, value) {
    this.setValue(value);
    if (this.props.onChange) this.props.onChange(event, value);
  },
  setMuiComponentAndMaybeFocus: setMuiComponentAndMaybeFocus,
  render: function render() {
    var _this$props = this.props,
        requiredError = _this$props.requiredError,
        rest = _objectWithoutPropertiesLoose(_this$props, ["defaultDate", "validations", "validationErrors", "validationError", "requiredError"]);

    var isRequired = this.isRequired,
        isPristine = this.isPristine,
        isValid = this.isValid,
        isFormSubmitted = this.isFormSubmitted;
    var isRequiredError = isRequired() && !isPristine() && !isValid() && isFormSubmitted() && requiredError;
    var errorText = this.getErrorMessage() || isRequiredError;
    return React.createElement(DatePicker, Object.assign({
      disabled: this.isFormDisabled()
    }, rest, {
      errorText: errorText,
      onChange: this.handleChange,
      ref: this.setMuiComponentAndMaybeFocus,
      value: this.getValue()
    }));
  }
});

var FormsyRadio = /*#__PURE__*/createClass({
  mixins: [Formsy.Mixin],
  // Material-UI replaces any component inside RadioButtonGroup with RadioButton, so no need to render it here
  render: function render() {
    return null;
  }
});

var FormsyRadioGroup = /*#__PURE__*/createClass({
  propTypes: {
    children: PropTypes.node,
    defaultSelected: /*#__PURE__*/PropTypes.oneOfType([PropTypes.string, PropTypes.number, PropTypes.bool]),
    name: PropTypes.string.isRequired,
    onChange: PropTypes.func,
    validationError: PropTypes.string,
    validationErrors: PropTypes.object,
    validations: /*#__PURE__*/PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
    value: /*#__PURE__*/PropTypes.oneOfType([PropTypes.string, PropTypes.number, PropTypes.bool])
  },
  mixins: [Formsy.Mixin],
  componentDidMount: function componentDidMount() {
    this.setValue(this.muiComponent.getSelectedValue());
  },
  handleValueChange: function handleValueChange(event, value) {
    this.setValue(value);
    if (this.props.onChange) this.props.onChange(event, value);
  },
  setMuiComponentAndMaybeFocus: setMuiComponentAndMaybeFocus,
  render: function render() {
    var _this$props = this.props,
        defaultSelected = _this$props.defaultSelected,
        value = _this$props.value,
        rest = _objectWithoutPropertiesLoose(_this$props, ["validations", "validationError", "validationErrors", "defaultSelected", "value"]); // remove unknown props from children


    var children = React.Children.map(this.props.children, function (radio) {
      var _radio$props = radio.props,
          rest = _objectWithoutPropertiesLoose(_radio$props, ["validations", "validationError", "validationErrors"]);

      return React.createElement(RadioButton, rest);
    }); // For backward compatibility or for
    // users used to MaterialUI, use the "defaultSelected"
    // attribute for the "value" if the value was not
    // explicitly set.

    if (typeof value === 'undefined') {
      value = defaultSelected;
    }

    return React.createElement(RadioButtonGroup, Object.assign({
      disabled: this.isFormDisabled()
    }, rest, {
      ref: this.setMuiComponentAndMaybeFocus,
      onChange: this.handleValueChange,
      valueSelected: this.getValue(),
      defaultSelected: value
    }), children);
  }
});

var FormsySelect = /*#__PURE__*/createClass({
  propTypes: {
    children: PropTypes.node,
    name: PropTypes.string.isRequired,
    onChange: PropTypes.func,
    requiredError: PropTypes.string,
    validationError: PropTypes.string,
    validationErrors: PropTypes.object,
    validations: /*#__PURE__*/PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
    value: PropTypes.any
  },
  mixins: [Formsy.Mixin],
  getInitialState: function getInitialState() {
    return {
      hasChanged: false
    };
  },
  handleChange: function handleChange(event, index, value) {
    this.setValue(value);
    this.setState({
      hasChanged: value !== ''
    });
    if (this.props.onChange) this.props.onChange(event, value, index);
  },
  setMuiComponentAndMaybeFocus: setMuiComponentAndMaybeFocus,
  render: function render() {
    var _this$props = this.props,
        requiredError = _this$props.requiredError,
        valueProp = _this$props.value,
        rest = _objectWithoutPropertiesLoose(_this$props, ["requiredError", "validations", "validationError", "validationErrors", "value", "onChange"]);

    var isRequired = this.isRequired,
        isPristine = this.isPristine,
        isValid = this.isValid,
        isFormSubmitted = this.isFormSubmitted;
    var isRequiredError = isRequired() && !isPristine() && !isValid() && isFormSubmitted() && requiredError;
    var errorText = this.getErrorMessage() || isRequiredError;
    var value = this.state.hasChanged ? this.getValue() : valueProp;
    return React.createElement(SelectField, Object.assign({
      disabled: this.isFormDisabled(),
      errorText: errorText,
      onChange: this.handleChange,
      ref: this.setMuiComponentAndMaybeFocus,
      value: value
    }, rest), this.props.children);
  }
});

var FormsyText = /*#__PURE__*/createClass({
  propTypes: {
    convertValue: PropTypes.func,
    defaultValue: PropTypes.any,
    name: PropTypes.string.isRequired,
    onBlur: PropTypes.func,
    onChange: PropTypes.func,
    onKeyDown: PropTypes.func,
    requiredError: PropTypes.string,
    underlineFocusStyle: PropTypes.object,
    underlineStyle: PropTypes.object,
    updateImmediately: PropTypes.bool,
    validationColor: PropTypes.string,
    validationError: PropTypes.string,
    validationErrors: PropTypes.object,
    validations: /*#__PURE__*/PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
    value: PropTypes.any
  },
  mixins: [Formsy.Mixin],
  getDefaultProps: function getDefaultProps() {
    return {
      underlineFocusStyle: {},
      underlineStyle: {},
      validationColor: '#4CAF50'
    };
  },
  getInitialState: function getInitialState() {
    var value = this.controlledValue();
    return {
      value: value
    };
  },
  componentWillMount: function componentWillMount() {
    this.setValue(this.controlledValue());
  },
  componentWillReceiveProps: function componentWillReceiveProps(nextProps) {
    var isValueChanging = nextProps.value !== this.props.value;

    if (isValueChanging || nextProps.defaultValue !== this.props.defaultValue) {
      var value = this.controlledValue(nextProps);
      var isValid = this.isValidValue(value);

      if (isValueChanging || this.props.defaultValue === this.getValue()) {
        this.setState({
          value: value,
          isValid: isValid
        });
        if (this.getValue() !== value) this.setValue(value);
      }
    }
  },
  componentWillUpdate: function componentWillUpdate(nextProps, nextState) {
    if (nextState._isPristine && // eslint-disable-line no-underscore-dangle
    nextState._isPristine !== this.state._isPristine) {
      // eslint-disable-line no-underscore-dangle
      // Calling state here is valid, as it cannot cause infinite recursion.
      var value = this.controlledValue(nextProps);
      var isValid = this.isValidValue(value);
      this.setValue(value);
      this.setState({
        value: value,
        isValid: isValid
      });
    }
  },
  controlledValue: function controlledValue(props) {
    if (props === void 0) {
      props = this.props;
    }

    return props.value || props.defaultValue || this.convertValue('');
  },
  handleBlur: function handleBlur(event) {
    this.setValue(this.convertValue(event.currentTarget.value));
    delete this.changeValue;
    if (this.props.onBlur) this.props.onBlur(event);
  },
  handleChange: function handleChange(event) {
    // Update the value (and so display any error) after a timeout.
    if (this.props.updateImmediately) {
      if (!this.changeValue) {
        this.changeValue = debounce(this.setValue, 400);
      }

      this.changeValue(this.convertValue(event.currentTarget.value));
    } else {
      // If there was an error (on loss of focus) update on each keypress to resolve same.
      if (this.getErrorMessage() != null) {
        this.setValue(this.convertValue(event.currentTarget.value));
      } else {
        // Only update on valid values, so as to not generate an error until focus is lost.
        if (this.isValidValue(event.target.value)) {
          this.setValue(this.convertValue(event.currentTarget.value)); // If it becomes invalid, and there isn't an error message, invalidate without error.
        }
      }
    } // Controlled component


    this.setState({
      value: event.currentTarget.value,
      isValid: this.isValidValue(event.currentTarget.value)
    });
    if (this.props.onChange) this.props.onChange(event, event.currentTarget.value);
  },
  handleKeyDown: function handleKeyDown(event) {
    if (keycode(event) === 'enter') this.setValue(this.convertValue(event.currentTarget.value));
    if (this.props.onKeyDown) this.props.onKeyDown(event, event.currentTarget.value);
  },
  convertValue: function convertValue(value) {
    if (this.props.convertValue) {
      return this.props.convertValue(value);
    } else {
      return value;
    }
  },
  setMuiComponentAndMaybeFocus: setMuiComponentAndMaybeFocus,
  render: function render() {
    var _this$props = this.props,
        requiredError = _this$props.requiredError,
        underlineFocusStyle = _this$props.underlineFocusStyle,
        underlineStyle = _this$props.underlineStyle,
        validationColor = _this$props.validationColor,
        rest = _objectWithoutPropertiesLoose(_this$props, ["defaultValue", "convertValue", "requiredError", "underlineFocusStyle", "underlineStyle", "updateImmediately", "validations", "validationError", "validationErrors", "value", "validationColor"]);

    var isRequired = this.isRequired,
        isPristine = this.isPristine,
        isValid = this.isValid,
        isFormSubmitted = this.isFormSubmitted;
    var isRequiredError = isRequired() && !isPristine() && !isValid() && isFormSubmitted() && requiredError;
    var errorText = this.getErrorMessage() || isRequiredError;
    return React.createElement(TextField, Object.assign({
      disabled: this.isFormDisabled()
    }, rest, {
      errorText: errorText,
      onBlur: this.handleBlur,
      onChange: this.handleChange,
      onKeyDown: this.handleKeyDown,
      ref: this.setMuiComponentAndMaybeFocus,
      value: this.state.value,
      underlineStyle: this.state.isValid ? {
        borderColor: validationColor
      } : underlineStyle,
      underlineFocusStyle: this.state.isValid ? {
        borderColor: validationColor
      } : underlineFocusStyle
    }));
  }
});

var FormsyTime = /*#__PURE__*/createClass({
  propTypes: {
    defaultTime: PropTypes.object,
    name: PropTypes.string.isRequired,
    onChange: PropTypes.func,
    validationError: PropTypes.string,
    validationErrors: PropTypes.object,
    validations: /*#__PURE__*/PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
    value: PropTypes.object
  },
  mixins: [Formsy.Mixin],
  componentDidMount: function componentDidMount() {
    var defaultTime = this.props.defaultTime;
    var value = this.getValue();

    if (typeof value === 'undefined' && typeof defaultTime !== 'undefined') {
      this.setValue(defaultTime);
    }
  },
  componentWillReceiveProps: function componentWillReceiveProps(newProps) {
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
      return date1.getHours() === date2.getHours() && date1.getMinutes() === date2.getMinutes();
    }
  },
  handleChange: function handleChange(event, value) {
    this.setValue(value);
    if (this.props.onChange) this.props.onChange(event, value);
  },
  setMuiComponentAndMaybeFocus: setMuiComponentAndMaybeFocus,
  render: function render() {
    var _this$props = this.props,
        rest = _objectWithoutPropertiesLoose(_this$props, ["defaultTime", "validations", "validationError", "validationErrors"]);

    return React.createElement(TimePicker, Object.assign({
      disabled: this.isFormDisabled()
    }, rest, {
      errorText: this.getErrorMessage(),
      onChange: this.handleChange,
      ref: this.setMuiComponentAndMaybeFocus,
      value: this.getValue()
    }));
  }
});

var FormsyToggle = /*#__PURE__*/createClass({
  propTypes: {
    defaultToggled: PropTypes.bool,
    name: PropTypes.string.isRequired,
    onChange: PropTypes.func,
    validationError: PropTypes.string,
    validationErrors: PropTypes.object,
    validations: /*#__PURE__*/PropTypes.oneOfType([PropTypes.string, PropTypes.object])
  },
  mixins: [Formsy.Mixin],
  componentDidMount: function componentDidMount() {
    this.setValue(this.muiComponent.isToggled());
  },
  handleChange: function handleChange(event, value) {
    this.setValue(value);
    if (this.props.onChange) this.props.onChange(event, value);
  },
  setMuiComponentAndMaybeFocus: setMuiComponentAndMaybeFocus,
  render: function render() {
    var _this$props = this.props,
        defaultToggled = _this$props.defaultToggled,
        rest = _objectWithoutPropertiesLoose(_this$props, ["defaultToggled", "validations", "validationError", "validationErrors"]);

    var value = this.getValue();

    if (typeof value === 'undefined') {
      value = typeof defaultToggled !== 'undefined' ? defaultToggled : false;
    }

    return React.createElement(Toggle, Object.assign({
      disabled: this.isFormDisabled()
    }, rest, {
      onToggle: this.handleChange,
      ref: this.setMuiComponentAndMaybeFocus,
      toggled: value
    }));
  }
});

var FormsyAutoComplete = /*#__PURE__*/createClass({
  propTypes: {
    defaultValue: PropTypes.any,
    name: PropTypes.string.isRequired,
    onBlur: PropTypes.func,
    onChange: PropTypes.func,
    onFocus: PropTypes.func,
    onKeyDown: PropTypes.func,
    validationError: PropTypes.string,
    validationErrors: PropTypes.object,
    validations: /*#__PURE__*/PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
    value: PropTypes.any
  },
  mixins: [Formsy.Mixin],
  getInitialState: function getInitialState() {
    return {
      value: this.props.defaultValue || this.props.value || ''
    };
  },
  componentWillMount: function componentWillMount() {
    this.setValue(this.props.defaultValue || this.props.value || '');
  },
  handleBlur: function handleBlur(event) {
    this.setValue(event.currentTarget.value);
    if (this.props.onBlur) this.props.onBlur(event);
  },
  handleChange: function handleChange(event) {
    this.setState({
      value: event.currentTarget.value
    });
    if (this.props.onChange) this.props.onChange(event);
  },
  handleUpdateInput: function handleUpdateInput(value) {
    this.setState({
      value: value
    });
    if (this.props.onChange) this.props.onChange(null, value);
  },
  handleKeyDown: function handleKeyDown(event) {
    if (keycode(event) === 'enter') this.setValue(event.currentTarget.value);
    if (this.props.onKeyDown) this.props.onKeyDown(event, event.currentTarget.value);
  },
  setMuiComponentAndMaybeFocus: setMuiComponentAndMaybeFocus$1,
  render: function render() {
    var _this$props = this.props,
        onFocus = _this$props.onFocus,
        rest = _objectWithoutPropertiesLoose(_this$props, ["defaultValue", "onFocus", "value", "validations", "validationError", "validationErrors"]);

    return React.createElement(AutoComplete, Object.assign({
      disabled: this.isFormDisabled()
    }, rest, {
      errorText: this.getErrorMessage(),
      onBlur: this.handleBlur,
      onChange: this.handleChange,
      onUpdateInput: this.handleUpdateInput,
      onFocus: onFocus,
      onKeyDown: this.handleKeyDown,
      ref: this.setMuiComponentAndMaybeFocus,
      value: this.state.value
    }));
  }
});

export { FormsyAutoComplete, FormsyCheckbox, FormsyDate, FormsyRadio, FormsyRadioGroup, FormsySelect, FormsyText, FormsyTime, FormsyToggle };
//# sourceMappingURL=formsy-material-ui.esm.js.map
