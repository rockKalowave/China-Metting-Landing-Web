# Multipart

Simple and lite of the `multipart/form-data` implementation. Split from `wechatpay-axios-plugin` project for general usages.

## Usage

`npm i @thenorthmemory/multipart`

```js
import Multipart from '@thenorthmemory/multipart';

// buffer style(Synchronous)
(new Multipart())
  .append('a', 1)
  .append('b', '2')
  .append('c', Buffer.from('31'))
  .append('d', JSON.stringify({}), 'any.json')
  .append('e', require('fs').readFileSync('/path/your/file.jpg'), 'file.jpg')
  .getBuffer();

// stream style(Asynchronous)
(new Multipart())
  .append('f', require('fs').createReadStream('/path/your/file2.jpg'), 'file2.jpg')
  .pipe(require('fs').createWriteStream('./file3.jpg'));
```

## API

- [Multipart](#multipart)
  - [Usage](#usage)
  - [API](#api)
    - [new Multipart()](#new-multipart)
    - [multipart.mimeTypes](#multipartmimetypes)
    - [multipart.boundary](#multipartboundary)
    - [multipart.data](#multipartdata)
    - [multipart.indices](#multipartindices)
    - [multipart.getBuffer() ⇒ <code>Buffer</code>](#multipartgetbuffer--buffer)
    - [multipart.getHeaders() ⇒ <code>object.&lt;string, string&gt;</code>](#multipartgetheaders--objectstring-string)
    - [multipart.appendMimeTypes(things) ⇒ <code>this</code>](#multipartappendmimetypesthings--this)
    - [multipart.append(name, value, [filename]) ⇒ <code>this</code>](#multipartappendname-value-filename--this)
    - [multipart.formed(name, value, [filename]) ⇒ <code>Array.&lt;(Buffer\|ReadStream)&gt;</code>](#multipartformedname-value-filename--arraybufferreadstream)
    - [multipart.set(name, value, [filename]) ⇒ <code>this</code>](#multipartsetname-value-filename--this)
    - [multipart.delete(name) ⇒ <code>this</code>](#multipartdeletename--this)
    - [multipart.get(name) ⇒ <code>Buffer</code> \| <code>ReadStream</code> \| <code>undefined</code>](#multipartgetname--buffer--readstream--undefined)
    - [multipart.getAll(name) ⇒ <code>Array.&lt;(Buffer\|ReadStream)&gt;</code>](#multipartgetallname--arraybufferreadstream)
    - [multipart.has(name) ⇒ <code>boolean</code>](#multiparthasname--boolean)
    - [multipart.entries() ⇒ <code>Iterator.&lt;Array.&lt;EntryTuple.&lt;(string\|undefined), (Buffer\|ReadStream)&gt;&gt;&gt;</code>](#multipartentries--iteratorarrayentrytuplestringundefined-bufferreadstream)
    - [multipart.keys() ⇒ <code>Iterator.&lt;(string\|undefined)&gt;</code>](#multipartkeys--iteratorstringundefined)
    - [multipart.values() ⇒ <code>Iterator.&lt;(Buffer\|ReadStream)&gt;</code>](#multipartvalues--iteratorbufferreadstream)
    - [multipart.toString() ⇒ <code>string</code>](#multiparttostring--string)
    - [multipart.flowing([end]) ⇒ <code>Promise.&lt;this&gt;</code>](#multipartflowingend--promisethis)
    - [multipart.pipe(destination, [options]) ⇒ <code>stream.Writable</code>](#multipartpipedestination-options--streamwritable)
  - [License](#license)


### new Multipart()
Create a `multipart/form-data` buffer container for the media(image/video) file uploading.


### multipart.mimeTypes
**Kind**: instance property of [<code>Multipart</code>](#Multipart)  
**Access**: protected  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| mimeTypes | <code>object.&lt;string, string&gt;</code> | Built-in mime-type mapping |


### multipart.boundary
**Kind**: instance property of [<code>Multipart</code>](#Multipart)  
**Read only**: true  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| boundary | <code>Buffer</code> | The boundary buffer. |


### multipart.data
**Kind**: instance property of [<code>Multipart</code>](#Multipart)  
**Access**: protected  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| data | <code>Array.&lt;(Buffer\|ReadStream)&gt;</code> | The Multipart's instance data storage |


### multipart.indices
**Kind**: instance property of [<code>Multipart</code>](#Multipart)  
**Access**: protected  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| indices | <code>Array.&lt;IndexTuple.&lt;(string\|undefined), number&gt;&gt;</code> | The entities' value indices whose were in [data](#Multipart+data) |


### multipart.getBuffer() ⇒ <code>Buffer</code>
To retrieve the [Miltipart#data](Miltipart#data) buffer

**Kind**: instance method of [<code>Multipart</code>](#Multipart)  
**Returns**: <code>Buffer</code> - - The payload buffer  

### multipart.getHeaders() ⇒ <code>object.&lt;string, string&gt;</code>
To retrieve the `Content-Type` multipart/form-data header

**Kind**: instance method of [<code>Multipart</code>](#Multipart)  
**Returns**: <code>object.&lt;string, string&gt;</code> - - The `Content-Type` header With [boundary](#Multipart+boundary)  

### multipart.appendMimeTypes(things) ⇒ <code>this</code>
Append a customized [Multipart#mimeType](Multipart#mimeType)

**Kind**: instance method of [<code>Multipart</code>](#Multipart)  
**Returns**: <code>this</code> - - The `Multipart` class instance self  

| Param | Type | Description |
| --- | --- | --- |
| things | <code>object.&lt;string, string&gt;</code> | The mime-type |

**Example**  
```js
.appendMimeTypes({p12: 'application/x-pkcs12'})
.appendMimeTypes({txt: 'text/plain'})
```

### multipart.append(name, value, [filename]) ⇒ <code>this</code>
Append data wrapped by [boundary](#Multipart+boundary)

**Kind**: instance method of [<code>Multipart</code>](#Multipart)  
**Returns**: <code>this</code> - - The `Multipart` class instance self  

| Param | Type | Description |
| --- | --- | --- |
| name | <code>string</code> | The field name |
| value | <code>string</code> \| <code>Buffer</code> \| <code>ReadStream</code> | The value |
| [filename] | <code>string</code> | Optional filename, when provided, then append the `Content-Type` after of the `Content-Disposition` |


### multipart.formed(name, value, [filename]) ⇒ <code>Array.&lt;(Buffer\|ReadStream)&gt;</code>
Formed a named value, a filename reported to the server, when a Buffer or FileStream is passed as the second parameter.

**Kind**: instance method of [<code>Multipart</code>](#Multipart)  
**Returns**: <code>Array.&lt;(Buffer\|ReadStream)&gt;</code> - - The part of data  

| Param | Type | Description |
| --- | --- | --- |
| name | <code>string</code> | The field name |
| value | <code>string</code> \| <code>Buffer</code> \| <code>ReadStream</code> | The value |
| [filename] | <code>string</code> | Optional filename, when provided, then append the `Content-Type` after of the `Content-Disposition` |


### multipart.set(name, value, [filename]) ⇒ <code>this</code>
Sets a new value for an existing key inside a [data](#Multipart+data) instance, or adds the key/value if it does not already exist.

**Kind**: instance method of [<code>Multipart</code>](#Multipart)  
**Returns**: <code>this</code> - - The Multipart instance  

| Param | Type | Description |
| --- | --- | --- |
| name | <code>string</code> | The field name |
| value | <code>string</code> \| <code>Buffer</code> \| <code>ReadStream</code> | The value |
| [filename] | <code>string</code> | Optional filename, when provided, then append the `Content-Type` after of the `Content-Disposition` |


### multipart.delete(name) ⇒ <code>this</code>
Deletes a key and its value(s) from a [data](#Multipart+data) instance

**Kind**: instance method of [<code>Multipart</code>](#Multipart)  
**Returns**: <code>this</code> - - The Multipart instance  

| Param | Type | Description |
| --- | --- | --- |
| name | <code>string</code> | The field name |


### multipart.get(name) ⇒ <code>Buffer</code> \| <code>ReadStream</code> \| <code>undefined</code>
Returns the first value associated with a given key from within a [data](#Multipart+data) instance

**Kind**: instance method of [<code>Multipart</code>](#Multipart)  
**Returns**: <code>Buffer</code> \| <code>ReadStream</code> \| <code>undefined</code> - value - The value, undefined means none named key exists  

| Param | Type | Description |
| --- | --- | --- |
| name | <code>string</code> | The field name |


### multipart.getAll(name) ⇒ <code>Array.&lt;(Buffer\|ReadStream)&gt;</code>
Returns all values associated with a given key from within a [data](#Multipart+data) instance

**Kind**: instance method of [<code>Multipart</code>](#Multipart)  
**Returns**: <code>Array.&lt;(Buffer\|ReadStream)&gt;</code> - value(s) - The value(s)  

| Param | Type | Description |
| --- | --- | --- |
| name | <code>string</code> | The field name |


### multipart.has(name) ⇒ <code>boolean</code>
Returns a boolean stating whether a [data](#Multipart+data) instance contains a certain key.

**Kind**: instance method of [<code>Multipart</code>](#Multipart)  
**Returns**: <code>boolean</code> - - True for contains  

| Param | Type | Description |
| --- | --- | --- |
| name | <code>string</code> | The field name |


### multipart.entries() ⇒ <code>Iterator.&lt;Array.&lt;EntryTuple.&lt;(string\|undefined), (Buffer\|ReadStream)&gt;&gt;&gt;</code>
To go through all key/value pairs contained in this [data](#Multipart+data) instance

**Kind**: instance method of [<code>Multipart</code>](#Multipart)  
**Returns**: <code>Iterator.&lt;Array.&lt;EntryTuple.&lt;(string\|undefined), (Buffer\|ReadStream)&gt;&gt;&gt;</code> - - An Array Iterator key/value pairs.  

### multipart.keys() ⇒ <code>Iterator.&lt;(string\|undefined)&gt;</code>
To go through all keys contained in [data](#Multipart+data) instance

**Kind**: instance method of [<code>Multipart</code>](#Multipart)  
**Returns**: <code>Iterator.&lt;(string\|undefined)&gt;</code> - - An Array Iterator key pairs.  

### multipart.values() ⇒ <code>Iterator.&lt;(Buffer\|ReadStream)&gt;</code>
To go through all values contained in [data](#Multipart+data) instance

**Kind**: instance method of [<code>Multipart</code>](#Multipart)  
**Returns**: <code>Iterator.&lt;(Buffer\|ReadStream)&gt;</code> - - An Array Iterator value pairs.  


### multipart.toString() ⇒ <code>string</code>
**Kind**: instance method of [<code>Multipart</code>](#Multipart)  
**Returns**: <code>string</code> - - FormData string  

### multipart.flowing([end]) ⇒ <code>Promise.&lt;this&gt;</code>
Pushing [data](#Multipart+data) into the readable BufferList

**Kind**: instance method of [<code>Multipart</code>](#Multipart)  
**Returns**: <code>Promise.&lt;this&gt;</code> - - The Multipart instance  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| [end] | <code>boolean</code> | <code>true</code> | End the writer when the reader ends. Default: `true`. Available {@since v0.8.0} |


### multipart.pipe(destination, [options]) ⇒ <code>stream.Writable</code>
Attaches a Writable stream to the [Multipart](#Multipart) instance

## License

[MIT](LICENSE)
