/* global red5prosdk */
import React from 'react'
import { PropTypes } from 'react'
// import red5prosdk from 'red5pro-sdk'
import BackLink from './BackLink' // eslint-disable-line no-unused-vars

class SettingsForm extends React.Component {

  componentWillUnmount () {
    const settings = this.props.settings
    for (const key in settings) {
      const _ref = this['_' + key]
      if (_ref && settings[key] !== _ref.value) {
        this.props.onFieldChange(key, _ref.value)
     }
    }
  }

  swapStreamNames () {
    const value1 = this._stream1.value
    const value2 = this._stream2.value
    this._stream1.value = value2
    this._stream2.value = value1
  }

  changeLogLevel () {
    const check = this._verboseLogging
    const isVerbose = check.checked
    this.props.onLogLevelChange(isVerbose ? 'debug' : 'warn')
  }

  render () {
    const checkStyle = {
      'vertical-align': 'middle'
    }
    const isLogVerbose = this.props.logLevel === 'debug'
    red5prosdk.setLogLevel(this.props.logLevel)
    return (
      <div>
        <BackLink onClick={this.props.onBackClick} />
        <h1 className="centered">Settings</h1>
        <p className="settings-field">
          <label className="settings-label" for="host-field">Host:</label>
          <input ref={(c) => this._host = c} name="host-field" defaultValue={this.props.settings.host}></input>
        </p>
        <p className="settings-field">
          <label className="settings-label" for="stream1-field">Stream1 Name:</label>
          <input ref={(c) => this._stream1 = c} name="stream1-field" defaultValue={this.props.settings.stream1}></input>
        </p>
        <p className="settings-field swap-streams-link">
          <span onClick={this.swapStreamNames.bind(this)}>Swap Stream Names</span>
        </p>
        <p className="settings-field">
          <label className="settings-label" for="stream2-field">Stream2 Name:</label>
          <input ref={(c) => this._stream2 = c} name="stream2-field" defaultValue={this.props.settings.stream2}></input>
        </p>
        <hr/>
        <p className="settings-field">
          <label className="settings-label" for="logging-field">Verbose R5 Logging:</label>
          {isLogVerbose
            ? (
            <input type="checkbox"
              ref={(c) => this._verboseLogging = c}
              name="logging-field"
              value="on" style={checkStyle}
              checked
              onClick={this.changeLogLevel.bind(this)}></input>
            )
            : (
            <input type="checkbox"
              ref={(c) => this._verboseLogging = c}
              name="logging-field"
              value="off" style={checkStyle}
              onClick={this.changeLogLevel.bind(this)}></input>
            )
          }
        </p>
      </div>
    )
  }

}

SettingsForm.propTypes = {
  settings: PropTypes.object.isRequired,
  logLevel: PropTypes.string.isRequired,
  onFieldChange: PropTypes.func.isRequired,
  onBackClick: PropTypes.func.isRequired,
  onLogLevelChange: PropTypes.func.isRequired
}

export default SettingsForm
