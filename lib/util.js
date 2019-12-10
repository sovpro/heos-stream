const NOT_FOUND_IDX  = -1
const TYPE_STRING    = 'string'

const AMP_CHAR       = '&'
const AMP_CHAR_ENC   = '%26'
const EQL_CHAR       = '='
const EQL_CHAR_ENC   = '%3D'
const PCT_CHAR       = '%'
const PCT_CHAR_ENC   = '%25'
const CHAR_LIST      = [AMP_CHAR, EQL_CHAR, PCT_CHAR]
const CHAR_LIST_ENC  = [AMP_CHAR_ENC, EQL_CHAR_ENC, PCT_CHAR_ENC]

const _escape = (str) => {
  return replaceAll (
      str
    , CHAR_LIST
    , CHAR_LIST_ENC
  )
}

function _keys (obj) {
  try { return Object.keys (obj) }
  catch { return undefined }
}

function objToQueryStr (obj) {
  const keys = _keys (obj)
  if (keys === undefined) return ''

  const len = keys.length
  if (len === 0) return ''

  let qstr  = keys[0] + EQL_CHAR + _escape (obj[keys[0]])
  let i     = 1 

  while (i < len) {
    qstr += AMP_CHAR + keys[i]
          + EQL_CHAR + _escape (obj[keys[i]])
    i++ 
  }

  return qstr
}

function queryStrToObj (qstr) {
  let obj         = {}

  if (typeof qstr !== TYPE_STRING)
    return obj

  let new_idx     = 0
  let cur_idx     = 0
  let key         = ''
  let val         = ''
  let eql_idx     = 0

  while (true) {
    if (cur_idx >= qstr.length) break

    new_idx = qstr.indexOf (AMP_CHAR, cur_idx)

    if (new_idx === NOT_FOUND_IDX) {
      if (cur_idx >= qstr.length) break
      else new_idx = qstr.length
    }

    eq_idx = qstr.indexOf (EQL_CHAR, cur_idx)

    if (eq_idx === NOT_FOUND_IDX || eq_idx >= new_idx) {
      key = qstr.substring (cur_idx, new_idx)
      val = ''
    }
    else {
      key = qstr.substring (cur_idx, eq_idx)
      val = qstr.substring (eq_idx + 1, new_idx)
    }

    obj[key] = unescape (val)
    cur_idx = new_idx + 1
  }

  return obj
}

function replaceAll (source, finds, repls) {
  if (typeof source !== 'string')
    return source

  let find_idx    = NOT_FOUND_IDX
  let idx         = 0
  let next_idx    = 0
  let item_idx    = 0
  let find        = ''
  let repl        = ''

  const items_len = Math.min (
    finds.length, repls.length
  )

  while (item_idx < items_len) {
    find = finds[item_idx]
    repl = repls[item_idx]

    do {
      find_idx = source.indexOf (find, next_idx)
      if (find_idx === NOT_FOUND_IDX) break
      next_idx = find_idx + repl.length
      source = source.substring (idx, find_idx) +
               repl +
               source.substr (find_idx + find.length)
    }
    while (true)

    item_idx += 1
  }

  return source
}

module.exports = {
    objToQueryStr
  , queryStrToObj
  , replaceAll
}

