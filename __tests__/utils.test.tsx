/* eslint-env mocha */
/* global expect, sinon */
/* eslint no-unused-expressions: "off" */

import React from 'react';
import FormsyText from '../src/FormsyText';
import TextField from 'material-ui/TextField';
import FormsyRadioGroup from '../src/FormsyRadioGroup';
import { RadioButtonGroup } from 'material-ui/RadioButton';

// @ts-ignore
import { mountTestForm } from './support';

const childrenFn = () => (
  <div>
    <FormsyText name="text" />
    <FormsyRadioGroup name="radio" />
  </div>
);

const setup = (): any => {
  const formWrapper = mountTestForm(childrenFn);
  const formsyTextWrapper = formWrapper.find(FormsyText);
  const formsyRadioGroupWrapper = formWrapper.find(FormsyRadioGroup);
  return {
    formsyTextInstance: formsyTextWrapper.instance(),
    textFieldInstance: formsyTextWrapper.find(TextField).instance(),
    formsyRadioGroupInstance: formsyRadioGroupWrapper.instance(),
    toggleInstance: formsyRadioGroupWrapper.find(RadioButtonGroup).instance(),
  };
};

describe('_setMuiComponentAndMaybeFocus', () => {
  it('exposes a`focus` method if the underlying material-ui component does', () => {
    const { formsyTextInstance, textFieldInstance, formsyRadioGroupInstance, toggleInstance } = setup();

    expect(typeof formsyTextInstance.focus).toEqual('function');
    expect(typeof textFieldInstance.focus).toEqual('function');

    expect(typeof formsyRadioGroupInstance.focus).toEqual('undefined');
    expect(typeof toggleInstance.focus).toEqual('undefined');
  });

  describe('the exposed `focus` method', () => {
    it('calls `focus` on the material-ui component', () => {
      const { formsyTextInstance, textFieldInstance } = setup();

      jest.spyOn(textFieldInstance, 'focus');

      expect(textFieldInstance.focus).not.toHaveBeenCalled();

      formsyTextInstance.focus();
      expect(textFieldInstance.focus).toHaveBeenCalledTimes(1);

      formsyTextInstance.focus();
      expect(textFieldInstance.focus).toHaveBeenCalledTimes(2);
    });
  });
});
