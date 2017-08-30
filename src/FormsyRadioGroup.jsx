import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { HOC } from 'formsy-react';
import { RadioButtonGroup, RadioButton } from 'material-ui/RadioButton';
import { setMuiComponentAndMaybeFocus } from './utils';

class FormsyRadioGroup extends Component {
  componentDidMount() {
    this.setValue(this.muiComponent.getSelectedValue());
  }

  handleValueChange = (event, value) => {
    this.setValue(value);
    if (this.props.onChange) this.props.onChange(event, value);
  }

  setValue = this.props.setValue

  render() {
    let {
      validations, // eslint-disable-line no-unused-vars, prefer-const
      validationError, // eslint-disable-line no-unused-vars, prefer-const
      validationErrors, // eslint-disable-line no-unused-vars, prefer-const
      defaultSelected, // eslint-disable-line prefer-const
      value,
      ...rest } = this.props;

    const {
      isFormDisabled,
      getValue,
    } = this.props;

    // remove unknown props from children
    const children = React.Children.map(this.props.children, (radio) => {
      const {
        validations, // eslint-disable-line no-unused-vars
        validationError, // eslint-disable-line no-unused-vars
        validationErrors, // eslint-disable-line no-unused-vars
        ...rest } = radio.props;

      return React.createElement(RadioButton, rest);
    });

    // For backward compatibility or for
    // users used to MaterialUI, use the "defaultSelected"
    // attribute for the "value" if the value was not
    // explicitly set.
    if (typeof value === 'undefined') {
      value = defaultSelected;
    }

    return (
      <RadioButtonGroup
        disabled={isFormDisabled()}
        ref={setMuiComponentAndMaybeFocus}
        onChange={this.handleValueChange}
        valueSelected={getValue()}
        defaultSelected={value}
        {...rest}
      >
        {children}
      </RadioButtonGroup>
    );
  }
}

FormsyRadioGroup.propTypes = {
  children: PropTypes.node,
  defaultSelected: PropTypes.oneOfType([PropTypes.string, PropTypes.number, PropTypes.bool]),
  getValue: PropTypes.func.isRequired,
  isFormDisabled: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func,
  setValue: PropTypes.func.isRequired,
  validationError: PropTypes.string,
  validationErrors: PropTypes.object,
  validations: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number, PropTypes.bool]),
};

export default HOC(FormsyRadioGroup);
