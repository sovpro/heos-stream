const {HeosData} = require ('./heos-data')
const assert     = require ('assert')

const EVT_CMD_PRFX = 'event/'
const MSG_NOT_LIKE_EVENT = 'data not like event'

class HeosEvent extends HeosData {
  static isLike (data) {
    try {
      const command = data.heos.command
      return command.indexOf (EVT_CMD_PRFX) === 0
    }
    catch {
      return false
    }
  }
  static create (data) {
    assert (this.isLike (data), MSG_NOT_LIKE_EVENT)
    const event = new HeosEvent (data)
    Object.freeze (event)
    return event
  }
  constructor (data) {
    super (data)
  }
  get event () {
    return this.command.substr (
      EVT_CMD_PRFX.length
    )
  }
}

exports.HeosEvent = {
  create: data => HeosEvent.create (data)
}

