const { getAppOptions } = require('./src/arvg')
const { applyCipherSequence } = require('./src/cipher')

const { error, config, input, output } = getAppOptions(process.argv);

console.log(config);
console.log(input);
console.log(output);

if (error) {
    console.error(error)
    process.exit(9)
}

applyCipherSequence(config, input, output)
