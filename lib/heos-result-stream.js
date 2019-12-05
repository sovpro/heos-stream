const {HeosFilteredStream} = require ('./heos-filtered-stream')

class HeosResultStream extends HeosFilteredStream {
  _filter (heos_data) {
     try {
      return (
        heos_data.result &&
        this.filters.includes (
          heos_data.command
        )
      )
    }
    catch {
      return false
    }
  }
}

exports.HeosResultStream = HeosResultStream
