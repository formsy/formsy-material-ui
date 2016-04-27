import React from 'react';
import Formsy from 'formsy-react';
import Checkbox from 'material-ui/Checkbox';
import {_setMuiComponentAndMaybeFocus} from './utils';

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
    this.setValue(this._muiComponent.isChecked());
  },

  _setMuiComponentAndMaybeFocus: _setMuiComponentAndMaybeFocus,

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
            ref={this._setMuiComponentAndMaybeFocus}
        />
    );

  }
});

export default FormsyCheckbox;
