import React from 'react';
import Formsy from 'formsy-react';
import Checkbox from 'material-ui/Checkbox';
import { setMuiComponentAndMaybeFocus } from './utils';

const FormsyCheckbox = React.createClass({

  propTypes: {
    defaultChecked: React.PropTypes.bool,
    name: React.PropTypes.string.isRequired,
    onChange: React.PropTypes.func,
    validationError: React.PropTypes.string,
    validationErrors: React.PropTypes.object,
    validations: React.PropTypes.oneOfType([React.PropTypes.string, React.PropTypes.object]),
  },

  mixins: [Formsy.Mixin],

  componentDidMount() {
    this.setValue(this.muiComponent.isChecked());
  },

  handleChange(event, value) {
    this.setValue(value);
    if (this.props.onChange) this.props.onChange(event, value);
  },

  setMuiComponentAndMaybeFocus: setMuiComponentAndMaybeFocus,

  render() {
    const {
      defaultChecked, // eslint-disable-line no-unused-vars
      validations, // eslint-disable-line no-unused-vars
      validationErrors, // eslint-disable-line no-unused-vars
      validationError, // eslint-disable-line no-unused-vars
      ...rest } = this.props;
    let value = this.getValue();

    if (typeof value === 'undefined') {
      value = (typeof defaultChecked !== 'undefined') ? defaultChecked : false;
    }
    return (
      <Checkbox
        {...rest}
        checked={value}
        onCheck={this.handleChange}
        ref={this.setMuiComponentAndMaybeFocus}
      />
    );
  },
});

export default FormsyCheckbox;
