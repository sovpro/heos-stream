const {Transform}      = require ('stream')
const {objToQueryStr}  = require ('./util')

class HeosWritableStream extends Transform {
  constructor () {
    super ({writableObjectMode: true})
  }
  write (command, ...rest) {
    if (typeof command === 'string') {
      const [params, ...rest_super] = rest
      return super.write ({command, params}, ...rest_super)
    }
    return super.write (command, ...rest)
  }
  _transform ({command, params}, _, callback) {
    const qry_str = objToQueryStr (params)
    const cmd_str = `heos://${command}`
                  + `${qry_str ? `?${qry_str}` : ''}\r\n`
    const cmd_buf = Buffer.from (cmd_str, 'utf8')
    callback (null, cmd_buf)
  }
}

exports.HeosWritableStream = HeosWritableStream
