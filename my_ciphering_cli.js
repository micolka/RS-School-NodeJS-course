const { CypherStream } = require('./src/transform')
const { getAppOptions } = require('./src/arvg')

const { error, config, input, otput } = getAppOptions(process.argv);

if (error) {
    console.error(error)
    process.exit(9)
}

const fs = require("fs");
 
let writeableStream = fs.createWriteStream(otput);
// writeableStream.write("Привет мир!");
// writeableStream.write("Продолжение записи \n");
// writeableStream.end("Завершение записи");
let readableStream = fs.createReadStream(input, "utf8");
 
// readableStream.on("data", function(chunk){ 
//     console.log(chunk);
// });

  
readableStream
    .pipe(new CypherStream('C1'))
    .pipe(new CypherStream('R1'))
    .pipe(new CypherStream('C0'))
    .pipe(new CypherStream('C0'))
    .pipe(new CypherStream('A'))
    .pipe(new CypherStream('R0'))
    .pipe(new CypherStream('R1'))
    .pipe(new CypherStream('R1'))
    .pipe(new CypherStream('A'))
    .pipe(new CypherStream('C1'))
    .pipe(writeableStream);

