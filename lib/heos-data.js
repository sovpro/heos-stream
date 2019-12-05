const {queryStrToObj} = require ('./util')

class HeosData {
  constructor (data) {
    this.heos    = {
        ...data.heos
      , message : queryStrToObj (
          data.heos.message
      )
    }
  }
  get command () {
    return this.heos.command
  }
  get message () {
    return this.heos.message
  }
}

HeosData.prototype.heos    = null

exports.HeosData = HeosData
