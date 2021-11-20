const { expect, test, describe } = require('@jest/globals');
const { getParams, getAppOptions, validateConfig } = require('../src/arvg')

describe('Config vaidation:', () => {
  test('returns config if params matched', () => {
    expect(validateConfig('C1-R1-C0-C0-A-R0-R1-R1-A-C1'))
      .toStrictEqual({config: 'C1-R1-C0-C0-A-R0-R1-R1-A-C1'})
  })
    
  test('returns error if wrong type of cipher code', () => {
    expect(validateConfig('K1-R1-C0-A'))
      .toStrictEqual({configError: ["'K1' is wrong type of cipher code",]})
  })

  test('returns error if wrong type of cipher code', () => {
    expect(validateConfig('C12-R1-C0-A'))
      .toStrictEqual({configError: ["'C12' is wrong type of cipher code",]})
  })
    
  test('returns error if cipher A has direction argument', () => {
    expect(validateConfig('C1-R1-C0-A1'))
      .toStrictEqual({configError: ["'A' code must not have direction argument",]})
  })
    
  test('returns error if passed wrong type of cipher code', () => {
    expect(validateConfig('C3-R1-C0-A'))
      .toStrictEqual({configError: ["cipher direction of 'C' code must be 0 or 1",]})
  })
    
  test('returns error if cipher C or R does not have direction argument', () => {
    expect(validateConfig('C-R1-C0-A'))
      .toStrictEqual({configError: ["cipher 'C' must have direction argument: 0 or 1",]})
  })
})

const argv = [
  '',
  '',
  '-c',
  'C1-C1-R0-A',
  '-i',
  './input.txt',
  '-o',
  './output.txt'
]
const [ base1, base2, cipher, cParam, input, iParam, output, oParam ] = argv

describe('Params extraction:', () => {
  test('returns params from passed cli args', () => {
    expect(getParams(argv))
      .toStrictEqual({config: 'C1-C1-R0-A', input: "./input.txt", output: "./output.txt"})
  })

  test('returns error when no params passed', () => {
    expect(getParams([base1, base2]))
      .toStrictEqual({error: "No params provided!"})
  })

  test(`returns error when config param '--config' duplicated`, () => {
    expect(getParams([base1, base2, cipher, cParam, cipher]))
      .toStrictEqual({error: "Duplicate param '--config'"})
  })

  test(`returns error when config param '--input' duplicated`, () => {
    expect(getParams([base1, base2, cipher, cParam, input, iParam, input]))
      .toStrictEqual({error: "Duplicate param '--input'"})
  })

  test(`returns error when config param '--output' duplicated`, () => {
    expect(getParams([base1, base2, cipher, cParam, output, oParam, output]))
      .toStrictEqual({error: "Duplicate param '--output'"})
  })
})

describe('Getting params:', () => {
  test('returns config if params matched', () => {
    expect(getAppOptions(argv))
      .toStrictEqual({config: 'C1-C1-R0-A', input: "./input.txt", output: "./output.txt"})
  })
    
  test('transfer getParams error', () => {
    expect(getAppOptions([base1, base2]))
      .toStrictEqual({error: "No params provided!"})
  })

  test('transfer validateConfig error', () => {
    expect(getAppOptions([base1, base2, cipher, 'K1-R1-C0-A']))
      .toStrictEqual({error: {configError: ["'K1' is wrong type of cipher code",]}})
  })
    
})

//C1-R1-C0-C0-A-R0-R1-R1-A-C1