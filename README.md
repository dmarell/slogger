## Node.js logging library
Output logs on standard output both in cloud and locally. The package has some features compared to logging using
raw console.log:
- Simplified syntax 
- Standard compact timestamp format
- Supports logging plain strings or an object
- Supports metadata for cloud logging (for example severity and labels) without ruining readability when running
 locally. Sets the parameter `json` in `init` to true when running in the cloud, for Stackdriver logging to pickup 
severity and metadata
- A http request logger for node express

### Logger usage
```
const {logger} = require('@dmarell/slogger')

// Initialize logging before using it
logger.init(`config.envName && config.envName !== 'dev')

// Optionally set labels
logger.addLabel('appName', config.appName)
logger.addLabel('envName', config.envName)
logger.addLabel('version', process.env.VERSION)

// Logging examples
logger.error('logger error')
logger.warn('logger warn')
logger.info('logger info, %d', 42)
logger.info('The', 'quick', 'brown', 'fox', 'jumps', 'over', 'the', 'lazy', 'dog')
logger.debug('The Answer is %s, really.', 42)
logger.debug({foo: 'Text', bar: 42})
logger.debug({message: 'Text', value: 42})
```

### RequestLogger usage
Used for logging HTTP request with Node Express. Does not log request body.
```
const {RequestLogger} = require('@dmarell/slogger')
const app = require('express')()
app.use(new RequestLogger().getMiddleware())
```
