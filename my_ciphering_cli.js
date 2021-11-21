const { getAppOptions } = require('./src/arvg')
const { applyCipherSequence } = require('./src/cipher')

const { error, config, input, output } = getAppOptions(process.argv);

if (error) {
    console.error(error)
    process.exit(9)
}

applyCipherSequence(config, input, output)
