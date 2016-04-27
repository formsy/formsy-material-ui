import React from 'react';
import Formsy from 'formsy-react';
import Checkbox from 'material-ui/Checkbox';
import {setMuiComponentAndMaybeFocus} from './utils';

const FormsyCheckbox = React.createClass({
  mixins: [Formsy.Mixin],

  propTypes: {
    defaultChecked: React.PropTypes.bool,
    name: React.PropTypes.string.isRequired,
    onChange: React.PropTypes.func,
  },

  handleChange(event, value) {
    this.setValue(value);
    if (this.props.onChange) this.props.onChange(event, value);
  },

  componentDidMount() {
    this.setValue(this.muiComponent.isChecked());
  },

  setMuiComponentAndMaybeFocus: setMuiComponentAndMaybeFocus,

  render() {
    const {defaultChecked, ...rest} = this.props;
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

  }
});

export default FormsyCheckbox;
