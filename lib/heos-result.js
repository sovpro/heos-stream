const {HeosData} = require ('./heos-data')
const assert     = require ('assert')

const MSG_NOT_LIKE_RESULT = 'data not like result'

class HeosResult extends HeosData {
  static isLike (data) {
    try {
      const result = data.heos.result
      return result === 'success' ||
             result === 'fail'
    }
    catch {
      return false
    }
  }
  static create (data) {
    assert (this.isLike (data), MSG_NOT_LIKE_RESULT)
    const result = new HeosResult (data)
    Object.freeze (result)
    return result
  }
  constructor (data) {
    super (data)
    this.payload = data.payload
    this.options = data.options
  }
  get result () {
    return this.heos.result
  }
}

HeosResult.prototype.payload = null
HeosResult.prototype.options = null

exports.HeosResult = {
  create: data => HeosResult.create (data)
}

