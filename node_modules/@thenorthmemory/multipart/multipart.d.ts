/// <reference types="node" />
import { ReadStream } from "fs";
import { Readable } from "stream";

/**
 * Simple and lite of `multipart/form-data` implementation, most similar to `form-data`.
 *
 * @example
 * // buffer style(Synchronous)
 * (new Multipart())
 *   .append('a', 1)
 *   .append('b', '2')
 *   .append('c', Buffer.from('31'))
 *   .append('d', JSON.stringify({}), 'any.json')
 *   .append('e', require('fs').readFileSync('/path/your/file.jpg'), 'file.jpg')
 *   .getBuffer();
 * // stream style(Asynchronous)
 *   .pipe(require('fs').createWriteStream('./file3.jpg'));
 */
export class Multipart extends Readable {
    /**
     * @protected
     * @memberof Multipart#
     * @prop {object<string,string>} mimeTypes - Built-in mime-type mapping
     */
    protected mimeTypes: object;
    /**
     * @readonly
     * @memberof Multipart#
     * @prop {Buffer} boundary - The boundary buffer.
     */
    readonly boundary: Buffer;
    /**
     * @protected
     * @memberof Multipart#
     * @prop {Array<Buffer|ReadStream>} data - The Multipart's instance data storage
     */
    protected data: Array<Buffer|ReadStream>;
    /**
     * @protected
     * @memberof Multipart#
     * @prop {[string|undefined, number][]} indices - The entities' value indices whose were in {@link Multipart#data}
     */
    protected indices: [string|undefined, number][];
    /**
     * To retrieve the {@link Miltipart#data} buffer
     *
     * @returns {Buffer} - The payload buffer
     */
    getBuffer(): Buffer;
    /**
     * To retrieve the `Content-Type` multipart/form-data header
     *
     * @returns {object<string, string>} - The `Content-Type` header With {@link Multipart#boundary}
     */
    getHeaders(): object;
    /**
     * Append a customized {@link Multipart#mimeType}
     *
     * @example
     * .appendMimeTypes({p12: 'application/x-pkcs12'})
     * .appendMimeTypes({txt: 'text/plain'})
     *
     * @param {object<string,string>} things - The mime-type
     *
     * @returns {Multipart} - The `Multipart` class instance self
     */
    appendMimeTypes(things: object): this;
    /**
     * Append data wrapped by {@link Multipart#boundary}
     *
     * @param  {string} field - The field
     * @param  {string|Buffer} value - The value
     * @param  {String} [filename] - Optional filename, when provided, then append the `Content-Type` after of the `Content-Disposition`
     *
     * @returns {Multipart} - The `Multipart` class instance self
     */
    append(field: string, value: string | Buffer | ReadStream, filename?: string): this;
    /**
     * Formed a named value, a filename reported to the server, when a Buffer or FileStream is passed as the second parameter.
     *
     * @param {string} name - The field name
     * @param {string|Buffer|ReadStream} value - The value
     * @param {string} [filename] - Optional filename, when provided, then append the `Content-Type` after of the `Content-Disposition`
     *
     * @returns {Array<Buffer|ReadStream>} - The part of data
     */
    formed(name: string, value: string | Buffer | ReadStream, filename?: string): Array<Buffer | ReadStream>;
    /**
     * To go through all key/value pairs contained in this {@link Multipart#data} instance
     *
     * @return {Iterator<[string|undefined, Buffer|ReadStream]>} - An Array Iterator key/value pairs.
     */
    entries(): Iterator<[string | undefined, Buffer | ReadStream]>;
    /**
     * Sets a new value for an existing key inside a {@link Multipart#data} instance, or adds the key/value if it does not already exist.
     *
     * @param {string} name - The field name
     * @param {string|Buffer|ReadStream} value - The value
     * @param {string} [filename] - Optional filename, when provided, then append the `Content-Type` after of the `Content-Disposition`
     *
     * @returns {this} - The Multipart instance
     */
    set(name: string, value: string | Buffer | ReadStream, filename?: string): this;
    /**
     * Returns the first value associated with a given key from within a {@link Multipart#data} instance
     *
     * @param {string} name - The field name
     *
     * @return {Buffer|ReadStream|undefined} value - The value, undefined means none named key exists
     */
    get(name: string): Buffer | ReadStream | undefined;
    /**
     * Returns all values associated with a given key from within a {@link Multipart#data} instance
     *
     * @param {string} name - The field name
     *
     * @return {(Buffer|ReadStream)[]} value(s) - The value(s)
     */
    getAll(name: string): (Buffer | ReadStream)[];
    /**
     * Returns a boolean stating whether a {@link Multipart#data} instance contains a certain key.
     *
     * @param {string} name - The field name
     *
     * @return {boolean} - True for contains
     */
    has(name: string): boolean;
    /**
     * Deletes a key and its value(s) from a {@link Multipart#data} instance
     *
     * @param {string} name - The field name
     *
     * @returns {this} - The Multipart instance
     */
    delete(name: string): this;
    /**
     * To go through all keys contained in {@link Multipart#data} instance
     *
     * @return {Iterator<string|undefined>} - An Array Iterator key pairs.
     */
    keys(): Iterator<string | undefined>;
    /**
     * To go through all values contained in {@link Multipart#data} instance
     *
     * @returns {Iterator<Array<Buffer|ReadStream>>} - An Array Iterator value pairs.
     */
    values(): Iterator<Array<Buffer | ReadStream>>;
    /**
     * @returns {string} - FormData string
     */
    static get [Symbol.toStringTag](): "FormData";
    /**
     * @returns {string} - FormData string
     */
    get [Symbol.toStringTag](): "FormData";
    /**
     * @returns {string} - FormData string
     */
    toString(): "[object FormData]";
    /**
     * alias of {@link Multipart#entries}
     * @returns {Iterator<[string|undefined, Buffer|ReadStream]>} - An Array Iterator key/value pairs.
     */
    [Symbol.iterator](): Iterator<[string|undefined, Buffer|ReadStream]>;
    _read(): void;
    /**
     * Pushing {@link Multipart#data} into the readable BufferList
     *
     * @param {boolean} [end = true] - End the writer when the reader ends. Default: true.
     * @returns {Promise<this>} - The Multipart instance
     */
    flowing(end?: boolean): Promise<this>;
    /**
     * Attaches a Writable stream to the {@link Multipart} instance
     *
     * @param  {NodeJS.WritableStream} destination - The destination for writing data
     * @param {object} [options] - Pipe options
     * @param {boolean} [options.end = true] - End the writer when the reader ends. Default: true.
     * @returns {stream.Writable} - The destination, allowing for a chain of pipes
     */
    pipe<T extends NodeJS.WritableStream>(destination: T, options?: {end?: boolean}): T;
}

export default Multipart;
