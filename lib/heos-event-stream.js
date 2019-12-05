const {HeosFilteredStream} = require ('./heos-filtered-stream')

class HeosEventStream extends HeosFilteredStream {
  _filter (heos_data) {
    try {
      return this.filters.includes (
        heos_data.event
      )
    }
    catch {
      return false
    }
  }
}

exports.HeosEventStream = HeosEventStream
