import FormsyText from '../src/FormsyText'
import TextField from 'material-ui/TextField'
import { Simulate } from 'react-addons-test-utils'
import { mountTestForm } from './support'
import { Form } from 'formsy-react'

const setup = () => {
  const formWrapper = mountTestForm(childrenFn);
  const formsyTextWrapper = formWrapper.find(FormsyText);
  return {
    formWrapper,
    formsyTextWrapper,
  }
};

const childrenFn = () => (
  <FormsyText
    name="text"
    validations="maxLength:10"
    validationErrors={{ maxLength: 'Text is too long' }}
  />
);

const fillInText = (wrapper, text) => {
  const inputDOM = wrapper.find('input').node;
  inputDOM.value = text;
  Simulate.change(inputDOM)
};

describe('FormsyText', () => {
  it('renders a material-ui TextField', () => {
    const { formsyTextWrapper } = setup();
    expect(formsyTextWrapper).to.have.descendants(TextField)
  });

  it('sends input to the form', () => {
    const { formsyTextWrapper, formWrapper } = setup();
    fillInText(formsyTextWrapper, 'some text');
    const formsyForm = formWrapper.find(Form).node;
    const formValues = formsyForm.getCurrentValues();
    expect(formValues.text).to.eq('some text')
  });

  it('renders validation information', () => {
    const { formsyTextWrapper, formWrapper } = setup();

    expect(formsyTextWrapper).to.not.contain.text('Text is too long');

    const formsyForm = formWrapper.find(Form).node;
    fillInText(formsyTextWrapper, 'toooooooo loooooong');
    formsyForm.validateForm();
    expect(formsyTextWrapper).to.contain.text('Text is too long');

    fillInText(formsyTextWrapper, 'just fine');
    formsyForm.validateForm();
    expect(formsyTextWrapper).to.not.contain.text('Text is too long')
  })
});
