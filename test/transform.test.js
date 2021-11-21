const { CypherStream  } = require('../src/transform')

describe('Cipher stream work:', () => {

  test('calculate cipher index', () => {
    const stream = new CypherStream('C1')

    expect(stream.calculateIndex(1, 2)).toBe(3)
    expect(stream.calculateIndex(25, 2)).toBe(1)
  })

  test('calculate decihper index', () => {
    const stream = new CypherStream('C0')

    expect(stream.calculateIndex(1, 2)).toBe(25)
    expect(stream.calculateIndex(25, 2)).toBe(23)
  })

  test('caesar cipher work', () => {
    const stream = new CypherStream('C0')
    stream.resultString = `This is secret. Message about "_" symbol!`
    stream.caesarCipher()

    expect(stream.resultString).toBe(`Sghr hr rdbqds. Ldrrzfd zants \"_\" rxlank!`)
  })

  test('ROT8 cipher work', () => {
    const stream = new CypherStream('R1')
    stream.resultString = `This is secret. Message about "_" symbol!`
    stream.ROT8Cipher()

    expect(stream.resultString).toBe(`Bpqa qa amkzmb. Umaaiom ijwcb \"_\" agujwt!`)
  })

  test('Atbash cipher work', () => {
    const stream = new CypherStream('A')
    stream.resultString = `This is secret. Message about "_" symbol!`
    stream.atbashCipher()

    expect(stream.resultString).toBe(`Gsrh rh hvxivg. Nvhhztv zylfg \"_\" hbnylo!`)
  })


  const chunk = Buffer.from(`This is secret. Message about "_" symbol!`)

  test('_transform case caesar', () => {
    const stream = new CypherStream('C1')
    
    stream._transform(chunk, 'buffer', () => {})
    expect(stream.resultString).toBe('Uijt jt tfdsfu. Nfttbhf bcpvu \"_\" tzncpm!')
  })

  test('_transform case caesar', () => {
    const stream = new CypherStream('A')
    
    stream._transform(chunk, 'buffer', () => {})
    expect(stream.resultString).toBe('Gsrh rh hvxivg. Nvhhztv zylfg \"_\" hbnylo!')
  })

  test('_transform case caesar', () => {
    const stream = new CypherStream('R1')
    
    stream._transform(chunk, 'buffer', () => {})
    expect(stream.resultString).toBe('Bpqa qa amkzmb. Umaaiom ijwcb \"_\" agujwt!')
  })

  test('_transform case error', () => {
    const mockError = jest.spyOn(console, 'error').mockImplementation(() => {})
    const stream = new CypherStream('T')

    stream._transform(chunk, 'buffer', () => {})
    expect(mockError.mock.calls.length).toBe(1)

    mockError.mockRestore()
  })

  test('_transform callback error', () => {
    const stream = new CypherStream('T')

    const callback = jest.fn().mockImplementation(() => {}) 
    
    stream._transform(undefined, 'buffer', callback)
    expect(callback.mock.calls.length).toBe(1)
  })
})
