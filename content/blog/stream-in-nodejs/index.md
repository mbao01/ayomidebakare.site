---
slug: stream-in-nodejs
date: 2020-03-03
title: 'Stream in Node.js'
author: 'Ayomide Bakare'
description: 'Stream is one of the most important APIs in Node.js'
categories: ['post']
keywords: ['nodejs', 'stream', 'nodejs api']
banner: './images/banner.jpg'
bannerCredit: 'Photo by Ryan Lara on Unsplash'
published: true
unlisted: false
hasFooter: false
redirects:
  - '/stream-in-nodejs'
---

**Stream** is used for data handling. They are a way to handle data between reading or writing to a file/disk, network communication or any process that involves data transfer. Stream is one of the most important APIs in Node.js because it is used in many other Node.js APIs/methods. To understand why this is and how it is implemented in Node.js, you need to understand **what it is and the reason for it**.

### So, why Stream?

Let's journey with an example you are definitely familiar with, watching a video on YouTube; a typical example of streaming. Once you open a video to watch, you begin to receive parts of the "video" bit by bit based on your internet speed. You don't wait for the entire video to be downloaded/available before you begin to watch it, do you? No, you don't! Rather you keep watching as the video becomes available in chunks. Usually, you say _the video is buffering_. That's exactly what it is, each chunk of video (data) is available one after the other, in the right order, over time. This is called a Stream, buffer over time or buffer in motion.
I introduced a familiar term there, **Buffer**.

> Buffer is a temporary storage spot for a chunk of data that is being transferred from a source to a destination. The buffer is filled with data, then passed along. The buffer transfers small chunks of data at a time.

### So what does using Stream mean?

- Efficient memory utilization :- The complete data does not need to be available in memory. Data can be processed in chunks as they are available. So your free memory space can be less than the size of data.
- Time efficiency :- Latency is reduced drastically. Imagine having to wait for a 3GB file to be in memory before being able to do anything meaningful with it. Though getting the file into memory may be asynchronous, you still need to wait till all the file is available before processing it. Why wait, huh 🤷‍♂️?

* Summarily, reduced memory allocation need and immediate data processing on data availability means increased performance.

Now you got a decent understanding of Stream. Let's play with Stream in Node.js

### Stream in Node.js

> A Stream is an abstract interface for working with streaming data in Node.js

The [Stream API][#stream] prototype is linked to [EventEmitter][#event_emitter] meaning Stream share some methods and properties of [EventEmitter][#event_emitter]. The Stream object is used as a super constructor in many Node.js APIs and methods. The file system, HTTP server request and response objects, process.stdout are all Stream instances. If you've used Node.js before, you've certainly used streams.

There are four main Stream types: [Writable][#stream_writable], [Readable][#stream_readable], [Duplex][#stream_duplex] and [Transform][#stream_transform]. I will briefly go over them and we look at multiple examples to help cement your understanding so far.

#### 1. Writable {#stream_writable}

Writable are streams to which data can be written. Writable stream writes data to a destination. Data is buffered (sent to destination) in Writable stream when the `writable.write(chunk)` method is called.

```javascript
const myStream = getWritableStreamSomehow()

for (let i = 1; i <= 10; i++) {
  // Write "1 2 3 4 5 6 7 8 9 10 " to a destination.
  myStream.write(i + ' ')
}

myStream.end('done writing data')
```

List of useful events on Writable stream:  
`'close'` - event is emitted when the stream and any of its underlying resources (a file descriptor, for example) have been closed. This means that no other events will be emitted, and no further computation will occur.

`'error'` - event is emitted if an error occurred while writing or piping data. The event listener callback is passed a single error argument when called like so `function callback(error: Error) { }`. The stream is not closed when the `'error'` event is emitted unless the `autoDestroy` option was set to true when creating the stream.

`'finish'` - event is emitted after the `end()` method has been called, and all data has been flushed to the underlying system.

`'pipe'` - event is emitted when the Writable stream is pipped to a Readable stream using `readable.pipe(writable)`. The readable is passed as the first argument to the event handler like so `function callback(readable: Readable) { }`.

`'unpipe'` - event is emitted when the `readable.unpipe()` method is called on a Readable stream. The readable is passed as the first argument to the event handler like so `function callback(readable: Readable) { }`.

List of useful methods on Writable stream:  
`destroy(error?: Error)` - Destroy the stream. Optionally emit an `'error'` event with `error` as callback argument, and may emit a `'close'` event. Subsequent calls to `write()` or `end()` will result in an `ERR_STREAM_DESTROYED` error.

`end(chunk?: string|Buffer|Uint8Array|any, encoding?: string, callback?: Function)` - Calling this method signals that no more data will be written to the Writable. The optional `chunk` and encoding arguments allow one final additional chunk of data to be written immediately before closing the stream. If provided, the optional callback function is attached as a listener for the `'finish'` event.

`setDefaultEncoding(encoding: string)` - This method sets the default encoding for a Writable stream.

`write(chunk?: string|Buffer|Uint8Array|any, encoding?: string, callback?: Function)` - This method writes some data to the stream, and calls the supplied callback once the data has been fully handled.  
There's a maximum size of data that can be written to a stream. Check the documentation for the stream you're using to know

#### 2. Readable

Readable are streams from which data can be read. Readable stream reads data from a source. Data is buffered when `readable.read()` is called, `readable.pipe()` is called, you attach a handler/listner to `'data'` event, or if `readable.resume()` is called and `'data'` event is handled.

```javascript
const readable = getReadableStreamSomehow()

// By default stream is in Paused mode
// So this works and reads a chunk in memory
let chunk = readable.read()

// Stream is set to Flowing mode below by listening on 'data' event
readable.on('data', chunk => {
  console.log(`Received ${chunk.length} bytes of data.`)
  chunk += chunk
})

// Set stream back to Paused mode - 'data' handler does not work again
readable.pause()

// Works because it is in Paused mode. Only reads a chunk of data
chunk += readable.read()

// NOTE: This has no effect and does not change the mode to Flowing
// You need to explicitely call `readable.resume()` if you switched to
// Paused mode explicitely using readable.pause().
readable.on('data', anotherHandler)

// Now in Flowing mode and both 'data' event handlers work
readable.resume()
```

List of useful events on Readable stream:  
`'close'` - event is emitted when the stream and any of its underlying resources (a file descriptor, for example) have been closed. This means that no other events will be emitted, and no further computation will occur.

`'data'` - event is emitted whenever a chunk of data is available. The chunk is passed as the first argument to the callback. The `'data'` event will also be emitted in, Paused mode, whenever the `readable.read()` method is called and a chunk of data is available to be returned. Attaching a `'data'` event listener to a stream that has not been explicitly paused will switch the stream into flowing mode. Data will then be passed as soon as it is available. Attaching a `'data'` event listener to a stream that has been explicitly paused will not switch the stream into Flowing mode. You need to call `readable.resume()` to switch to Flowing mode.

`'end'` - event is emitted when there is no more data to be consumed from the stream. Note that `'end'` event happens before `'close'` event, not after.

`'error'` - event may be emitted at any time. It is advisable to always handle this event and do some clean up (e.g close an open file or piped writable streams) to prevent memory leak. (Confirm that `'end'` and `'close'` are called on `'error'`)

`'pause'` - event is emitted when `pause()` is called and `readableFlowing` is not `false`

`'resume'` - event is emitted when `resume()` is called and `readableFlowing` is not `true`.

List of useful methods on Readable stream:  
`destroy(error?: Error)` - Destroy the stream. Optionally emit an `'error'` event with `error` as callback argument, and may emit a `'close'` event.

`pause()` - stops data from flowing through the stream. Therefore `'data'` events are no longer emmited. This does not stop data from buffering.

`pipe(destination: Writable, options?: Object)` - attaches a Writable stream to the readable. The readable is in Flowing mode and pushes all it's data to the Writable. There's no pausing the readable. One important caveat is that if the Readable stream emits an error during processing, the Writable destination is not closed automatically. If an error occurs, it will be necessary to manually close each stream in order to prevent memory leaks.

`read(size?: Number)` - pulls some data out of the internal buffer and returns it. If no data is available to be read, `null` is returned. By default, the data will be returned as a Buffer object unless an encoding has been specified using the `setEncoding()` method. The `size` argument is the number of bytes to be read. It is optional and must be less than or equal to 1 GB if specified.

`resume()` - resumes explicitly paused stream from Paused mode into Flowing mode. The stream begins to emit `'data'` events.

`setEncoding(encoding: string)` - sets the character encoding for data read from the Readable stream e.g 'utf8', 'hex'. By default, no encoding is assigned and stream data will be returned as Buffer objects.

`unpipe(destination?: Writable)` - detach a Writable stream `destination` from the readable. Note this does not end/close the Writable stream. If `destination` is not specified, detaches all Writable streams from the readable.

Full list can be found here:

#### 3. Duplex

Duplex are streams that are both Readable and Writable. Duplex streams read data from a source and write data to a destination. The Readable and Writable parts of the Duplex use different buffers, therefore data is buffered when `duplex.read()` is called, a handler is attached to `'data'` event or `duplex.write(chunk)` method is called.

#### 4. Transform

Transform are Duplex streams that can modify or transform the data after it is read from source, before being written to destination.

There are many stream objects provided by Node.js. For instance, a [request to an HTTP server](https://nodejs.org/dist/latest-v12.x/docs/api/http.html#http_class_http_incomingmessage) and [process.stdout](https://nodejs.org/dist/latest-v12.x/docs/api/process.html#process_process_stdout) are both stream instances.

Again, a stream can be readable, writable, or both. Let's look at some applications of stream.

1. Reading data from a file
   You can guess what kind of stream this uses.

```javascript
const fs = require('fs')
// By default readable in Paused mode
const readable = fs.createReadStream('file.txt', {
  encoding: 'utf8',
  highWaterMark: 64 * 1024, // The maximum size of each chunk is 64kb
})
let data = '',
  count = 1

readable.on('data', chunk => {
  data += chunk
  console.log(`Chunk ${count++}: ${chunk}`)
})

readable.on('end', () => {
  console.log('End of File')
})
```

2. Writing data to a file
   You can guess what kind of stream this uses too.

```javascript
const fs = require('fs')
const readable = fs.createReadStream('file.txt', {
  encoding: 'utf8',
  highWaterMark: 64 * 1024, // The maximum size of each chunk is 64kb
})
const writable = fs.createWriteStream('newFile.txt')

readable.on('data', chunk => {
  // Write chunk into newFile.txt
  writeable.write(chunk)
})

readable.on('end', () => {
  // normally, writeable.end() is called by default
  writeable.end('Finished reading from file.txt')
})

writeable.on('error', () => {})
```

3. Using `readable.pipe()`
   You can guess what kind of stream this uses too.

```javascript
const fs = require('fs')
const readable = fs.createReadStream('file.txt', {
  encoding: 'utf8',
  highWaterMark: 64 * 1024, // The maximum size of each chunk is 64kb
})
const writable = fs.createWriteStream('newFile.txt')

// All the data from source 'file.txt' gets copied into 'newFile.txt'.
readable.pipe(writable)
```

4. Compressing a file (Transform example)

```javascript
const fs = require('fs')
const readable = fs.createReadStream('file.txt')
const compress = zlib.createGzip()
const writable = fs.createWriteStream('file.txt.gz')

readable.pipe(compress).pipe(writable)
```

5. HTTP Request and Response streams

```javascript
const http = require('http')
const server = http.createServer((req, res) => {
  // `req` is an http.IncomingMessage, which is a Readable Stream.
  // `res` is an http.ServerResponse, which is a Writable Stream.

  let body = ''
  // Get the data as utf8 strings.
  // If an encoding is not set, Buffer objects will be received.
  req.setEncoding('utf8')

  // Readable streams emit 'data' events once a listener is added.
  req.on('data', chunk => {
    body += chunk
  })

  // The 'end' event indicates that the entire body has been received.
  req.on('end', () => {
    try {
      const data = JSON.parse(body)
      // Write back something interesting to the user:
      res.write(typeof data)
      res.end()
    } catch (er) {
      // uh oh! bad json!
      res.statusCode = 400
      return res.end(`error: ${er.message}`)
    }
  })
})

server.listen(1337)

// $ curl localhost:1337 -d "{}"
// object
// $ curl localhost:1337 -d "\"foo\""
// string
// $ curl localhost:1337 -d "not json"
// error: Unexpected token o in JSON at position 1
```

### Conclusion

Stream is an integral part of the NodeJS API. Understanding streams in NodeJS turns magic in science and saves you valuable time finding an invisible bug in your code.

[#stream]: https://nodejs.org/dist/latest-v12.x/docs/api/stream.html#stream_stream 'Node.js v12 Stream API'
[#stream_writable]: https://nodejs.org/dist/latest-v12.x/docs/api/stream.html#stream_writable_streams 'Writable Stream'
[#stream_readable]: https://nodejs.org/dist/latest-v12.x/docs/api/stream.html#stream_readable_streams 'Readable Stream'
[#stream_duplex]: https://nodejs.org/dist/latest-v12.x/docs/api/stream.html#stream_readable_streams 'Readable Stream'
[#stream_transform]: https://nodejs.org/dist/latest-v12.x/docs/api/stream.html#stream_readable_streams 'Readable Stream'
[#event_emitter]: https://nodejs.org/dist/latest-v12.x/docs/api/events.html#events_class_eventemitter 'EventEmitter API'

**PS**: This post is targetted mainly towards consuming streams and not implementing them
