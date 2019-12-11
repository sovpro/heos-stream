# Heos Stream

Node.js streams for HEOS protocol communication over a socket

## HeosStream

### Constructor

Construct an instance with a Socket obtainable via `net.createConnection()` or `new net.Socket()`

```js
const {HeosStream} = require ('heos-stream')
const heos_stream = new HeosStream (socket)
```
### Writing

Writing requires objects implementing a commmand object interface.

#### Command object interface

The comand interface is an object with a  string `command` and object `params` property. `command` represents the `host` and `pathname` of a HEOS command url*.


```js
const command_object = {
  command: 'string' ,
  params: {
    key: value ,
    // , key2: value 
    // , ...
  } 
}
heos_stream.write (command_object)
```

The key value pairs correspond to query string parameters that are appended to the HEOS command.

\* `host` and `pathname` are the command group and command according to the specification.

### Reading

Reading provides data objects that are one of:

 * HeosData
 * HeosResult
 * HeosEvent

#### HeosData

All data provided by HeosStream is a HeosData instance consisting of a message and command property. A HeosResult or HeosEvent is provided if the data is determined to a be the result of a command or an event.

Properties:
 * `message` : A key value object
 * `command` : The command that caused this data 

#### HeosResult

HeosResult represents data that is known to be a command result.

Properties accompanying those from HeosData
 * `result` : A string that is either 'success' or 'fail'
 * `payload` : May be undefined, object or an array
 * `options` : May be undefined or an array

#### HeosEvent

HeosEvent represents data that is known to be a HEOS event.

Properties accompanying those from HeosData
  * `event` : A string name of the event (excluding 'event/' prefix)

## Filtered Streams

There are two streams emitting data filtered to results (HeosResult) or events (HeosEvent).

### HeosResultStream

An opt-in filtered stream that emits result (HeosResult) data with a command matching on of those provided to the constructor.

```js
const result_stream = new HeosResultStream ([
  'player/set_volume'  ,
  'player/set_mute'    ,
  'player/toggle_mute' , 
  // ...
])
heos_stream.pipe (result_stream)
result_stream.on ('data', result_data => {
  // result_data.command will be one of
  // the commands provided to the constructor
  const {command, message} = result_data
})
```

### HeosEventStream

An opt-in filtered stream that emits event (HeosEvent) data with a name matching one of those provided to the constructor.

```js
const event_stream = new HeosEventStream ([
  'player_volume_changed'  ,
  // ...
])
heos_stream.pipe (event_stream)
event_stream.on ('data', event_data => {
  // event_data.event will be one of
  // the events provided the constructor
  const {event} = event_data
})
```

## Links

* [HEOS by Denon](https://usa.denon.com/us/heos)
* [HEOS CLI Protocol Specification](https://denon-uk.custhelp.com/app/answers/detail/a_id/5744/~/heos-control-protocol-\(cli\))

# Notice

This unsponsored software is provided, subject to a MIT license, unoffocially and independently of Sound United, LLC, its affiliates, subsidiaries and brands (such as HEOS, Denon and any such not listed here).
