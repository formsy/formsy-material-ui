import React from 'react';
import createClass from 'create-react-class';
import PropTypes from 'prop-types';
import Formsy from 'formsy-react';
import { RadioButtonGroup, RadioButton } from 'material-ui/RadioButton';
import { setMuiComponentAndMaybeFocus } from './utils';

const FormsyRadioGroup = createClass({
  propTypes: {
    children: PropTypes.node,
    defaultSelected: PropTypes.oneOfType([PropTypes.string, PropTypes.number, PropTypes.bool]),
    name: PropTypes.string.isRequired,
    onChange: PropTypes.func,
    validationError: PropTypes.string,
    validationErrors: PropTypes.object,
    validations: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.number, PropTypes.bool]),
  },

  mixins: [Formsy.Mixin],

  componentDidMount() {
    this.setValue(this.muiComponent.getSelectedValue());
  },

  handleValueChange(event, value) {
    this.setValue(value);
    if (this.props.onChange) this.props.onChange(event, value);
  },

  setMuiComponentAndMaybeFocus: setMuiComponentAndMaybeFocus,

  render() {
    let {
      validations, // eslint-disable-line no-unused-vars, prefer-const
      validationError, // eslint-disable-line no-unused-vars, prefer-const
      validationErrors, // eslint-disable-line no-unused-vars, prefer-const
      defaultSelected, // eslint-disable-line prefer-const
      value,
      ...rest
    } = this.props;

    // remove unknown props from children
    const children = React.Children.map(this.props.children, radio => {
      const {
        validations, // eslint-disable-line no-unused-vars
        validationError, // eslint-disable-line no-unused-vars
        validationErrors, // eslint-disable-line no-unused-vars
        ...rest
      } = radio.props;

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
        disabled={this.isFormDisabled()}
        {...rest}
        ref={this.setMuiComponentAndMaybeFocus}
        onChange={this.handleValueChange}
        valueSelected={this.getValue()}
        defaultSelected={value}
      >
        {children}
      </RadioButtonGroup>
    );
  },
});

export default FormsyRadioGroup;
