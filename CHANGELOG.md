## Changelog

* 0.5.2  Fix 0.5.1 error (Issue #150, PR #151) (@codeaholicguy)

* 0.5.1  Add updateImmediately prop & fix handleChange (@mbrookes)

* 0.5.0  Lint jsx files - fix linting errors in same
         Accepts Formsy.Form.reset() (@Mokto)
         Fix text input values, and form reset (@reebalazs)
         Fixes React 15.2 unknown props warnings (@jayalfredprufrock)

* 0.4.2 Fix controlled / uncontrolled conflicts
        Add defaultValue support to FormsyText 
        (no longer have to use `value` to set the default)
        Add eslint and fix linting errors
        Add .editorconfig

* 0.4.1 Fix issue with FormsyText default `value`.

* 0.4.0 Update to MUI 0.15.0-beta.1, React 15.0.1, formsy-react 0.18.0
        Add a webpack example

* 0.3.9 Use defaultDate rather than defaultValue in FormsyDate (@ZoetropeLabs)
        Change text component proptype to allow any data type for value (@scrambled2k3)
        Remove dependency on onEnterKeyDown (@enricofoschi)
        Add `lib` to `.gitignore`
        FormsyCheckbox - Fix error on form reset (@jurgob)

* 0.3.8 Propagate events as onChange() (@magicalcows) babel 6 (@mbrookes)

* 0.3.7 Expose a `.focus()` method (@py-in-the-sky)

* 0.3.6 Add custom onBlur and onFocus handler support (@Aweary)

* 0.3.5 Support composable SelctField (@rblakeley), update REDME SelectField example, remove mixin

* 0.3.4 Fix for #35 - Treat MUI Checkbox as a controlled component to address MUI 0.14.0-rc2 regression

* 0.3.3 Fix default (ISO8601 style) date for formatDate to respect client timezone

* 0.3.2 Remove explicit files declaration from package.json (the npm docs lie!)

* 0.3.1 Add ./lib/ to package.json.

* 0.3.0 Split into separate files to allow individual import of MUI components

* 0.2.5 Fix issue #21 Textfield defaultValue handling.

* 0.2.4 Updated textfield handling (@vijayrawatsan), selectfield fix (@dmlinn).

* 0.2.3 Fix textfield initialization through this.refs.form.reset(model) (@vijayrawatsan).

* 0.2.2 Add prepublish script and associated dev dependency to package.json.

* 0.2.1 Convert dependencies to peerDependencies.

* 0.2.0 Only validate textfield onBlur

* 0.1.6 Correct live-demo URL

* 0.1.5 Add react-components keyword to package.json

* 0.1.4 Add formsy-react dependency (previously assumed it was already installed).

* 0.1.3 Fix Checkbox & Toggle to return value when unchanged, don't import all of MUI (!), update example in README.

* 0.1.2 Babelify same!

* 0.1.1 Fix exports.

* 0.1.0 Initial release.
