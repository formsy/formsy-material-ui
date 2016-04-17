import 'babel-polyfill'
import React from 'react'
import sinonChai from 'sinon-chai'
import chaiEnzyme from 'chai-enzyme'
import injectTapEventPlugin from 'react-tap-event-plugin'

window.React = React;
window.expect = chai.expect;
chai.use(sinonChai);
chai.use(chaiEnzyme());
injectTapEventPlugin();

const tests = require.context('.', true, /test\..+\.js$/);
tests.keys().forEach(tests);
