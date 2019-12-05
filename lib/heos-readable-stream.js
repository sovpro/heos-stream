const {Transform}   = require ('stream')
const {HeosEvent}   = require ('./heos-event')
const {HeosResult}  = require ('./heos-result')
const {HeosData}    = require ('./heos-data')

class HeosReadableStream extends Transform {
  constructor () {
    super ({readableObjectMode: true})
  }
  _transform (chunk, _, callback) {
    const data = JSON.parse (
      chunk.toString ('utf8')
    )
    try {
      callback (null, HeosResult.create (data))
    }
    catch (e) {
      try {
        callback (null, HeosEvent.create (data))    
      }
      catch (e) {
        callback (null, new HeosData (data))
      }
    }
  }
}

exports.HeosReadableStream = HeosReadableStream
