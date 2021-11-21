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
