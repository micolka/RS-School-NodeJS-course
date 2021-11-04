const getAppOptions = (argv) => {

    if (argv.length < 3) return { error: 'No params provided!'}

    console.log(argv);

    const { config, configError } = validateConfig(argv[3])
    const input = './hello.txt'
    const otput = './123.txt'

    if (configError) {
        return { error: { configError }}
    }
     
    return { config, input, otput }
}

const validateConfig = (config) => {
    const params = config.split('-')
    const err = []

    const checkSecondParam = (param, el) => {
        if (param === undefined) {
            err.push(`cipher '${el}' must have direction argument: 0 or 1`)
        } else if ((param !== '1') && (param !== '0')) {
            err.push(`cipher direction of '${el[0]}' code must be 0 or 1`)
        }
    }

    params.forEach(el => {
        const cypher = el.split('')
        
        if (el[0] === 'C' || el[0] === 'R') {
            checkSecondParam(cypher[1], el)
        } else if (cypher[0] === 'A') {
            if (cypher[1]) err.push(`'${cypher[0]}' code must not have direction argument`)
        } else {
            err.push(`'${el}' is wrong type of cipher code`)
        }
        
    })
    if (err.length > 0) return { configError: err }

    return { config };
}

module.exports = { getAppOptions };
