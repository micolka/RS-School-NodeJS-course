const fs = require("fs");
const { CypherStream } = require('./transform')

const applyCipherSequence = (config, input, output) => {
    let readableStream = input 
        ? fs.createReadStream(input, "utf8").on('error', (err) =>  handleDirError(err, input)) 
        : process.stdin

    let writeableStream = output 
        ? fs.createWriteStream(output, { flags: 'a' }).on('error', (err) => handleDirError(err, output)) 
        : process.stdout
     
    config.split('-').reduce((prev, stream)=> {
        return prev.pipe(new CypherStream(stream))
    }, readableStream).pipe(writeableStream)
}

const handleDirError = (err, path) => {
    if(err.code === 'ENOENT') {
        console.error(`No such file or directory, open '${path}'`)
    } else {
        console.error(err)
    }
    process.exit(9)
}

module.exports = { applyCipherSequence };
