const fs = require("fs");
const { CypherStream } = require('./transform')

const applyCipherSequence = (config, input, output) => {
    let readableStream = fs.createReadStream(input, "utf8");
    let writeableStream = fs.createWriteStream(output);
     
    // readableStream.on("data", function(chunk){ 
    //     console.log(chunk);
    // });
    
    config.split('-').reduce((prev, stream)=> {
        return prev.pipe(new CypherStream(stream))
    }, readableStream).pipe(writeableStream)
}

module.exports = { applyCipherSequence };
