const getAppOptions = (argv) => {

    const { error, config, input, output } = getParams(argv)
    if (error) return { error }

    const { configError } = validateConfig(config)
    if (configError) return { error: { configError }}
     
    return { config, input, output }
}

const getParams = (argv) => {

    if (argv.length < 3) return { error: 'No params provided!'}

    const opt = argv.slice(2)

    let config = undefined
    let input = undefined
    let output = undefined

    for (let i = 0; i < opt.length; i++) {
        if(opt[i] === '-c' || opt[i] === '--config') {
            const restOpt = opt.slice(i + 1)
            if(restOpt.find(el => el === '-c' || el === '--config')) return { error: `Duplicate param '--config'`}
            config = opt[i + 1]
        }
        if(opt[i] === '-i' || opt[i] === '--input') {
            const restOpt = opt.slice(i + 1)
            if(restOpt.find(el => el === '-i' || el === '--input')) return { error: `Duplicate param '--input'`}
            input = opt[i + 1]
        }
        if(opt[i] === '-o' || opt[i] === '--output') {
            const restOpt = opt.slice(i + 1)
            if(restOpt.find(el => el === '-o' || el === '--output')) return { error: `Duplicate param '--output'`}
            output = opt[i + 1]
        }
    }

    return { config, input, output }
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
            (cypher[2]) ? err.push(`'${el}' is wrong type of cipher code`) : checkSecondParam(cypher[1], el)
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
