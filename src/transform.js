const { Transform } = require('stream');

class CypherStream extends Transform {  
    resultString = ''
    #lowerCaseAlphabet = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z']
    #upperCaseAlphabet = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z']

    constructor(param) {
        super(null)
        this.param = param
    }

    _transform(chunk, encoding, callback) {
      try {
        this.resultString = `${chunk.toString('utf8')}`;
        
        switch(this.param) {
            case 'C1':
            case 'C0': {
                this.caesarCipher()
                break;
            }
            case 'A': {
                this.atbashCipher()
                break;
            }
            case 'R1':
            case 'R0': {
                this.ROT8Cipher()
                break;
            }
            default: {
                console.error('No such param!!!');
            }
        }

        callback(null, this.resultString);
      } catch (err) {
        callback(err);
      }
    }

    caesarCipher(shift = 1) {

        const input = this.resultString.split('')
        this.resultString = input.map((el) => {

            const lower = this.#lowerCaseAlphabet.indexOf(el)
            const upper = this.#upperCaseAlphabet.indexOf(el)
        
            if (lower !== -1) return this.#lowerCaseAlphabet[this.calculateIndex(lower, shift)]
            if (upper !== -1) return this.#upperCaseAlphabet[this.calculateIndex(upper, shift)]
            return el

        }).join('')
    }

    atbashCipher() {
        const input = this.resultString.split('')
        this.resultString = input.map((el) => {

            const lower = this.#lowerCaseAlphabet.indexOf(el)
            const upper = this.#upperCaseAlphabet.indexOf(el)
        
            if (lower !== -1) return this.#lowerCaseAlphabet.reverse()[lower]
            if (upper !== -1) return this.#upperCaseAlphabet.reverse()[upper]
            return el

        }).join('')
    }

    ROT8Cipher() {
        this.caesarCipher(8)
    }

    calculateIndex(idx, shift) {
        if (this.param[1] === '1') return idx + shift - (idx + shift > 25 ? 26 : 0)
        if (this.param[1] === '0') return idx - shift + (idx - shift < 0 ? 26 : 0)
    }
  }

  module.exports = { CypherStream }
