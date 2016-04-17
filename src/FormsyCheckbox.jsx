import React from 'react';
import Formsy from 'formsy-react';
import Checkbox from 'material-ui/Checkbox';
import {_setMuiComponentAndMaybeFocus} from './utils';

const FormsyCheckbox = React.createClass({
  mixins: [Formsy.Mixin],

  propTypes: {
    name: React.PropTypes.string.isRequired
  },

  handleValueChange: function (event, value) {
    this.setValue(value);
    if (this.props.onChange) this.props.onChange(event, value);
  },

  componentDidMount: function () {
    this.setValue(this._muiComponent.isChecked());
  },

  _setMuiComponentAndMaybeFocus: _setMuiComponentAndMaybeFocus,

  render: function () {

    const extendedProps = Object.assign({}, this.props);
    const defaultChecked = extendedProps.defaultChecked;
    delete extendedProps.defaultChecked;

    return (
      <Checkbox
        {...extendedProps}
        ref={this._setMuiComponentAndMaybeFocus}
        onCheck={this.handleValueChange}
        checked={this.getValue() || defaultChecked || false}
      />
    );
  }
});

export default FormsyCheckbox;
