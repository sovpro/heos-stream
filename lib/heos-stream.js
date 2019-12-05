const {DelimitedStream}       = require ('delimited-stream')
const {HeosWritableStream}    = require ('./heos-writable-stream')
const {HeosReadableStream}    = require ('./heos-readable-stream')
const {Duplex, pipeline}      = require ('stream')

const HEOS_DATA_DELIMITER     = Buffer.from ("\r\n")

const writable_stream_sym     = Symbol ()
const readable_stream_sym     = Symbol ()

class HeosStream extends Duplex {
  constructor (socket) {
    super ({objectMode: true})
    this[writable_stream_sym]   = new HeosWritableStream ()
    this[readable_stream_sym]   = new HeosReadableStream ()

    const delimited_stream      = new DelimitedStream (
      HEOS_DATA_DELIMITER
    )

    pipeline (
        this[writable_stream_sym]
      , socket
      , delimited_stream
      , this[readable_stream_sym]
    )
  }
  pushData_ () {
    let data;
    while (true) {
      data = this[readable_stream_sym].read ()
      if (!data ||
          !this.push (data)) break
    }
  }
  _write (chunk, _encoding_, callback) {
    this[writable_stream_sym].write (
        chunk
      , _encoding_
      , () => callback (null)
    )
  }
  _read (bytes) {
    this[readable_stream_sym].once(
        'readable'
      , () => this.pushData_ ()
    )
  }
}

exports.HeosStream = HeosStream
