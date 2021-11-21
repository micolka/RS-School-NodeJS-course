const { applyCipherSequence, handleDirError  } = require('../src/cipher')
const fs = require("fs")

describe('No file/dir error handling:', () => {

  const err = {
    errno: -2,
    code: 'ENOENT',
    syscall: 'open',
    path: '.hhjkh/output.txt'
  }

  test('prints error to console', () => {
    const mockExit = jest.spyOn(process, 'exit').mockImplementation(() => {})
    const mockError = jest.spyOn(console, 'error').mockImplementation(() => {})

    handleDirError(err)
    expect(mockError).toBeCalled()

    mockExit.mockRestore()
    mockError.mockRestore()
  })

  test('prints another error to console', () => {
    const mockExit = jest.spyOn(process, 'exit').mockImplementation(() => {})
    const mockError = jest.spyOn(console, 'error').mockImplementation(() => {})

    handleDirError({error: {message: 'Some error'}})
    expect(mockError).toBeCalled()

    mockExit.mockRestore()
    mockError.mockRestore()
  })

  test('process.exit is calles with code 9', () => {
    const mockExit = jest.spyOn(process, 'exit').mockImplementation(() => {})
    const mockError = jest.spyOn(console, 'error').mockImplementation(() => {})

    handleDirError({error: {message: 'Some error'}})
    expect(mockExit).toHaveBeenCalledWith(9)

    mockExit.mockRestore()
    mockError.mockRestore()
  })
})

describe('main cipher fuction:', () => {
  const config = 'C1-C1-R0-A'
  const input = './input.txt'
  const output = './output.txt'
  

  test('stdin if no input', async (done) => {
    const obj = {fn: handleDirError}
    const mockHandleDirError = jest.spyOn(obj, 'handleDirError')

    try {
      await applyCipherSequence(config, './test/input.txt', output)
      expect(handleDirError).toHaveBeenCalledTimes(1);
      done()
    } catch (e) {
      done.fail(e)
    } finally {
      handleDirError.mockRestore()

    }

  })

})