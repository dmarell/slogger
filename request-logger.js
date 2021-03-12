const logger = require('./logger')

/**
 * Express request logger.
 */
class RequestLogger {
    constructor(ignoredPaths) {
        if (ignoredPaths !== undefined) {
            this.ignoredPaths = ignoredPaths
        } else {
            this.ignoredPaths = []
        }
    }

    getMiddleware() {
        const self = this
        return function (req, res, next) {
            const start = Date.now()
            res.on('finish', function () {
                const duration = Date.now() - start
                if (self.ignoredPaths.find(p => req.originalUrl === p) === undefined) {
                    logger.debug(`${req.method} ${RequestLogger._getProtocol(req)}://${req.get('host')}${req.originalUrl} ${JSON.stringify(res.statusCode)} ${duration} ms`)
                }
            })
            next()
        }
    }

    static _getProtocol(req) {
        const p = req.get('X-Forwarded-Proto')
        if (p !== undefined) {
            return p
        }
        return req.protocol
    }

    addIgnoredPath(path) {
        if (Array.isArray(path)) {
            this.ignoredPaths = [...this.ignoredPaths, ...path]
        } else {
            this.ignoredPaths.push(path)
        }
    }
}

module.exports = RequestLogger