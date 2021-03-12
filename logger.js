const util = require('util')

const  labels = {}

/**
 * Logs to standard output.
 *
 * Logs formatted when running local (json=false) or with json output in cloud.
 * Support logging with string and/or json parameters.
 */
class Logger {
  constructor() {
    this.json = true
  }

  init(json) {
    if (json !== undefined) {
      this.json = json
    }
    this.info(`Logger.init, json: ${this.json}`)
  }

  addLabel(name, value) {
    labels[name] = value
  }

  error() {
    return this._log('ERROR', arguments)
  }

  warn() {
    return this._log('WARNING', arguments)
  }

  info() {
    return this._log('INFO', arguments)
  }

  debug() {
    return this._log('DEBUG', arguments)
  }

  static _formatTimestamp(timestamp) {
    return timestamp.toISOString().replace('T', ' ').replace('Z', '')
  }

  _log(severity, args) {
    let logPayload
    if (this.json) {
      // json logging, probably because we are executing in cloud
      if (args.length > 0 && typeof (args[0]) === 'string') {
        // logging a string
        logPayload = JSON.stringify({severity, labels, message: util.format.apply(util.format, args)})
      } else if (args.length > 0) {
        // logging an object --> json
        const p = args[0]
        p.severity = severity
        p.labels = labels
        logPayload = JSON.stringify(p)
      }
    } else {
      // Plain text logging, probably because we are executing locally
      logPayload = `${Logger._formatTimestamp(new Date())} ${severity} ${util.format.apply(util.format, args)}`
    }
    console.log(logPayload)
  }
}

const logger = new Logger()

module.exports = logger