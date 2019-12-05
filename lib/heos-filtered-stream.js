const {Transform} = require ('stream')

const filters_sym = Symbol ()

class HeosFilteredStream extends Transform {
  constructor (filters) {
    super ({
        writableObjectMode: true
      , readableObjectMode: true
    })
    this[filters_sym] = filters
  }
  _filter () {
     return false
  }
  _transform (heos_data, _, callback) {
    if (this._filter (heos_data))
      this.push (heos_data)
    callback (null)
  }
  get filters () {
    return this[filters_sym]
  }
}

exports.HeosFilteredStream = HeosFilteredStream
