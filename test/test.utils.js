import FormsyText from '../src/FormsyText'
import TextField from 'material-ui/TextField'
import FormsyRadioGroup from '../src/FormsyRadioGroup'
import RadioButtonGroup from 'material-ui/lib/radio-button-group'
import { mountTestForm } from './support'

const setup = () => {
  const formWrapper = mountTestForm(childrenFn)
  const formsyTextWrapper = formWrapper.find(FormsyText)
  const formsyRadioGroupWrapper = formWrapper.find(FormsyRadioGroup)
  return {
    formsyTextInstance: formsyTextWrapper.node,
    textFieldInstance: formsyTextWrapper.find(TextField).node,
    formsyRadioGroupInstance: formsyRadioGroupWrapper.node,
    toggleInstance: formsyRadioGroupWrapper.find(RadioButtonGroup).node,
  }
}

const childrenFn = () => (
  <div>
    <FormsyText name="text" />
    <FormsyRadioGroup name="radio" />
  </div>
)

describe('_setMuiComponentAndMaybeFocus', () => {
  it('exposes a`focus` method if the underlying material-ui component does', () => {
    const {
      formsyTextInstance,
      textFieldInstance,
      formsyRadioGroupInstance,
      toggleInstance,
    } = setup()

    expect(formsyTextInstance.focus).to.be.a('function')
    expect(textFieldInstance.focus).to.be.a('function')

    expect(formsyRadioGroupInstance.focus).to.be.undefined
    expect(toggleInstance.focus).to.be.undefined
  })

  describe('the exposed `focus` method', () => {
    it('calls `focus` on the material-ui component', () => {
      const {
        formsyTextInstance,
        textFieldInstance,
      } = setup()

      textFieldInstance.focus = sinon.spy(textFieldInstance.focus)

      expect(textFieldInstance.focus).to.not.have.been.called

      formsyTextInstance.focus()
      expect(textFieldInstance.focus).to.have.been.calledOnce

      formsyTextInstance.focus()
      expect(textFieldInstance.focus).to.have.been.calledTwice
    })
  })
})
