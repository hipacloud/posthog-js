'use strict'

function _typeof(obj) {
    '@babel/helpers - typeof'

    if (typeof Symbol === 'function' && typeof Symbol.iterator === 'symbol') {
        _typeof = function (obj) {
            return typeof obj
        }
    } else {
        _typeof = function (obj) {
            return obj && typeof Symbol === 'function' && obj.constructor === Symbol && obj !== Symbol.prototype
                ? 'symbol'
                : typeof obj
        }
    }

    return _typeof(obj)
}

function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
        throw new TypeError('Cannot call a class as a function')
    }
}

function _defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
        var descriptor = props[i]
        descriptor.enumerable = descriptor.enumerable || false
        descriptor.configurable = true
        if ('value' in descriptor) descriptor.writable = true
        Object.defineProperty(target, descriptor.key, descriptor)
    }
}

function _createClass(Constructor, protoProps, staticProps) {
    if (protoProps) _defineProperties(Constructor.prototype, protoProps)
    if (staticProps) _defineProperties(Constructor, staticProps)
    return Constructor
}

function _defineProperty(obj, key, value) {
    if (key in obj) {
        Object.defineProperty(obj, key, {
            value: value,
            enumerable: true,
            configurable: true,
            writable: true,
        })
    } else {
        obj[key] = value
    }

    return obj
}

function ownKeys(object, enumerableOnly) {
    var keys = Object.keys(object)

    if (Object.getOwnPropertySymbols) {
        var symbols = Object.getOwnPropertySymbols(object)
        if (enumerableOnly)
            symbols = symbols.filter(function (sym) {
                return Object.getOwnPropertyDescriptor(object, sym).enumerable
            })
        keys.push.apply(keys, symbols)
    }

    return keys
}

function _objectSpread2(target) {
    for (var i = 1; i < arguments.length; i++) {
        var source = arguments[i] != null ? arguments[i] : {}

        if (i % 2) {
            ownKeys(Object(source), true).forEach(function (key) {
                _defineProperty(target, key, source[key])
            })
        } else if (Object.getOwnPropertyDescriptors) {
            Object.defineProperties(target, Object.getOwnPropertyDescriptors(source))
        } else {
            ownKeys(Object(source)).forEach(function (key) {
                Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key))
            })
        }
    }

    return target
}

function _slicedToArray(arr, i) {
    return (
        _arrayWithHoles(arr) ||
        _iterableToArrayLimit(arr, i) ||
        _unsupportedIterableToArray(arr, i) ||
        _nonIterableRest()
    )
}

function _arrayWithHoles(arr) {
    if (Array.isArray(arr)) return arr
}

function _iterableToArrayLimit(arr, i) {
    if (typeof Symbol === 'undefined' || !(Symbol.iterator in Object(arr))) return
    var _arr = []
    var _n = true
    var _d = false
    var _e = undefined

    try {
        for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {
            _arr.push(_s.value)

            if (i && _arr.length === i) break
        }
    } catch (err) {
        _d = true
        _e = err
    } finally {
        try {
            if (!_n && _i['return'] != null) _i['return']()
        } finally {
            if (_d) throw _e
        }
    }

    return _arr
}

function _unsupportedIterableToArray(o, minLen) {
    if (!o) return
    if (typeof o === 'string') return _arrayLikeToArray(o, minLen)
    var n = Object.prototype.toString.call(o).slice(8, -1)
    if (n === 'Object' && o.constructor) n = o.constructor.name
    if (n === 'Map' || n === 'Set') return Array.from(o)
    if (n === 'Arguments' || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen)
}

function _arrayLikeToArray(arr, len) {
    if (len == null || len > arr.length) len = arr.length

    for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]

    return arr2
}

function _nonIterableRest() {
    throw new TypeError(
        'Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.'
    )
}

function _createForOfIteratorHelper(o, allowArrayLike) {
    var it

    if (typeof Symbol === 'undefined' || o[Symbol.iterator] == null) {
        if (
            Array.isArray(o) ||
            (it = _unsupportedIterableToArray(o)) ||
            (allowArrayLike && o && typeof o.length === 'number')
        ) {
            if (it) o = it
            var i = 0

            var F = function () {}

            return {
                s: F,
                n: function () {
                    if (i >= o.length)
                        return {
                            done: true,
                        }
                    return {
                        done: false,
                        value: o[i++],
                    }
                },
                e: function (e) {
                    throw e
                },
                f: F,
            }
        }

        throw new TypeError(
            'Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.'
        )
    }

    var normalCompletion = true,
        didErr = false,
        err
    return {
        s: function () {
            it = o[Symbol.iterator]()
        },
        n: function () {
            var step = it.next()
            normalCompletion = step.done
            return step
        },
        e: function (e) {
            didErr = true
            err = e
        },
        f: function () {
            try {
                if (!normalCompletion && it.return != null) it.return()
            } finally {
                if (didErr) throw err
            }
        },
    }
}

// Copyright (c) 2013 Pieroxy <pieroxy@pieroxy.net>
// This work is free. You can redistribute it and/or modify it
// under the terms of the WTFPL, Version 2
// For more information see LICENSE.txt or http://www.wtfpl.net/
//
// For more information, the home page:
// http://pieroxy.net/blog/pages/lz-string/testing.html
//
// LZ-based compression algorithm, version 1.4.4
// private property
var f = String.fromCharCode
var keyStrBase64 = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/='
var keyStrUriSafe = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+-$'
var baseReverseDic = {}

function getBaseValue(alphabet, character) {
    if (!baseReverseDic[alphabet]) {
        baseReverseDic[alphabet] = {}

        for (var i = 0; i < alphabet.length; i++) {
            baseReverseDic[alphabet][alphabet.charAt(i)] = i
        }
    }

    return baseReverseDic[alphabet][character]
}

var LZString = {
    compressToBase64: function compressToBase64(input) {
        if (input == null) return ''

        var res = LZString._compress(input, 6, function (a) {
            return keyStrBase64.charAt(a)
        })

        switch (
            res.length % 4 // To produce valid Base64
        ) {
            default: // When could this happen ?

            case 0:
                return res

            case 1:
                return res + '==='

            case 2:
                return res + '=='

            case 3:
                return res + '='
        }
    },
    decompressFromBase64: function decompressFromBase64(input) {
        if (input == null) return ''
        if (input == '') return null
        return LZString._decompress(input.length, 32, function (index) {
            return getBaseValue(keyStrBase64, input.charAt(index))
        })
    },
    compressToUTF16: function compressToUTF16(input) {
        if (input == null) return ''
        return (
            LZString._compress(input, 15, function (a) {
                return f(a + 32)
            }) + ' '
        )
    },
    decompressFromUTF16: function decompressFromUTF16(compressed) {
        if (compressed == null) return ''
        if (compressed == '') return null
        return LZString._decompress(compressed.length, 16384, function (index) {
            return compressed.charCodeAt(index) - 32
        })
    },
    //compress into uint8array (UCS-2 big endian format)
    compressToUint8Array: function compressToUint8Array(uncompressed) {
        var compressed = LZString.compress(uncompressed)
        var buf = new Uint8Array(compressed.length * 2) // 2 bytes per character

        for (var i = 0, TotalLen = compressed.length; i < TotalLen; i++) {
            var current_value = compressed.charCodeAt(i)
            buf[i * 2] = current_value >>> 8
            buf[i * 2 + 1] = current_value % 256
        }

        return buf
    },
    //decompress from uint8array (UCS-2 big endian format)
    decompressFromUint8Array: function decompressFromUint8Array(compressed) {
        if (compressed === null || compressed === undefined) {
            return LZString.decompress(compressed)
        } else {
            var buf = new Array(compressed.length / 2) // 2 bytes per character

            for (var i = 0, TotalLen = buf.length; i < TotalLen; i++) {
                buf[i] = compressed[i * 2] * 256 + compressed[i * 2 + 1]
            }

            var result = []
            buf.forEach(function (c) {
                result.push(f(c))
            })
            return LZString.decompress(result.join(''))
        }
    },
    //compress into a string that is already URI encoded
    compressToEncodedURIComponent: function compressToEncodedURIComponent(input) {
        if (input == null) return ''
        return LZString._compress(input, 6, function (a) {
            return keyStrUriSafe.charAt(a)
        })
    },
    //decompress from an output of compressToEncodedURIComponent
    decompressFromEncodedURIComponent: function decompressFromEncodedURIComponent(input) {
        if (input == null) return ''
        if (input == '') return null
        input = input.replace(/ /g, '+')
        return LZString._decompress(input.length, 32, function (index) {
            return getBaseValue(keyStrUriSafe, input.charAt(index))
        })
    },
    compress: function compress(uncompressed) {
        return LZString._compress(uncompressed, 16, function (a) {
            return f(a)
        })
    },
    _compress: function _compress(uncompressed, bitsPerChar, getCharFromInt) {
        if (uncompressed == null) return ''
        var i,
            value,
            context_dictionary = {},
            context_dictionaryToCreate = {},
            context_c = '',
            context_wc = '',
            context_w = '',
            context_enlargeIn = 2,
            // Compensate for the first entry which should not count
            context_dictSize = 3,
            context_numBits = 2,
            context_data = [],
            context_data_val = 0,
            context_data_position = 0,
            ii

        for (ii = 0; ii < uncompressed.length; ii += 1) {
            context_c = uncompressed.charAt(ii)

            if (!Object.prototype.hasOwnProperty.call(context_dictionary, context_c)) {
                context_dictionary[context_c] = context_dictSize++
                context_dictionaryToCreate[context_c] = true
            }

            context_wc = context_w + context_c

            if (Object.prototype.hasOwnProperty.call(context_dictionary, context_wc)) {
                context_w = context_wc
            } else {
                if (Object.prototype.hasOwnProperty.call(context_dictionaryToCreate, context_w)) {
                    if (context_w.charCodeAt(0) < 256) {
                        for (i = 0; i < context_numBits; i++) {
                            context_data_val = context_data_val << 1

                            if (context_data_position == bitsPerChar - 1) {
                                context_data_position = 0
                                context_data.push(getCharFromInt(context_data_val))
                                context_data_val = 0
                            } else {
                                context_data_position++
                            }
                        }

                        value = context_w.charCodeAt(0)

                        for (i = 0; i < 8; i++) {
                            context_data_val = (context_data_val << 1) | (value & 1)

                            if (context_data_position == bitsPerChar - 1) {
                                context_data_position = 0
                                context_data.push(getCharFromInt(context_data_val))
                                context_data_val = 0
                            } else {
                                context_data_position++
                            }

                            value = value >> 1
                        }
                    } else {
                        value = 1

                        for (i = 0; i < context_numBits; i++) {
                            context_data_val = (context_data_val << 1) | value

                            if (context_data_position == bitsPerChar - 1) {
                                context_data_position = 0
                                context_data.push(getCharFromInt(context_data_val))
                                context_data_val = 0
                            } else {
                                context_data_position++
                            }

                            value = 0
                        }

                        value = context_w.charCodeAt(0)

                        for (i = 0; i < 16; i++) {
                            context_data_val = (context_data_val << 1) | (value & 1)

                            if (context_data_position == bitsPerChar - 1) {
                                context_data_position = 0
                                context_data.push(getCharFromInt(context_data_val))
                                context_data_val = 0
                            } else {
                                context_data_position++
                            }

                            value = value >> 1
                        }
                    }

                    context_enlargeIn--

                    if (context_enlargeIn == 0) {
                        context_enlargeIn = Math.pow(2, context_numBits)
                        context_numBits++
                    }

                    delete context_dictionaryToCreate[context_w]
                } else {
                    value = context_dictionary[context_w]

                    for (i = 0; i < context_numBits; i++) {
                        context_data_val = (context_data_val << 1) | (value & 1)

                        if (context_data_position == bitsPerChar - 1) {
                            context_data_position = 0
                            context_data.push(getCharFromInt(context_data_val))
                            context_data_val = 0
                        } else {
                            context_data_position++
                        }

                        value = value >> 1
                    }
                }

                context_enlargeIn--

                if (context_enlargeIn == 0) {
                    context_enlargeIn = Math.pow(2, context_numBits)
                    context_numBits++
                } // Add wc to the dictionary.

                context_dictionary[context_wc] = context_dictSize++
                context_w = String(context_c)
            }
        } // Output the code for w.

        if (context_w !== '') {
            if (Object.prototype.hasOwnProperty.call(context_dictionaryToCreate, context_w)) {
                if (context_w.charCodeAt(0) < 256) {
                    for (i = 0; i < context_numBits; i++) {
                        context_data_val = context_data_val << 1

                        if (context_data_position == bitsPerChar - 1) {
                            context_data_position = 0
                            context_data.push(getCharFromInt(context_data_val))
                            context_data_val = 0
                        } else {
                            context_data_position++
                        }
                    }

                    value = context_w.charCodeAt(0)

                    for (i = 0; i < 8; i++) {
                        context_data_val = (context_data_val << 1) | (value & 1)

                        if (context_data_position == bitsPerChar - 1) {
                            context_data_position = 0
                            context_data.push(getCharFromInt(context_data_val))
                            context_data_val = 0
                        } else {
                            context_data_position++
                        }

                        value = value >> 1
                    }
                } else {
                    value = 1

                    for (i = 0; i < context_numBits; i++) {
                        context_data_val = (context_data_val << 1) | value

                        if (context_data_position == bitsPerChar - 1) {
                            context_data_position = 0
                            context_data.push(getCharFromInt(context_data_val))
                            context_data_val = 0
                        } else {
                            context_data_position++
                        }

                        value = 0
                    }

                    value = context_w.charCodeAt(0)

                    for (i = 0; i < 16; i++) {
                        context_data_val = (context_data_val << 1) | (value & 1)

                        if (context_data_position == bitsPerChar - 1) {
                            context_data_position = 0
                            context_data.push(getCharFromInt(context_data_val))
                            context_data_val = 0
                        } else {
                            context_data_position++
                        }

                        value = value >> 1
                    }
                }

                context_enlargeIn--

                if (context_enlargeIn == 0) {
                    context_enlargeIn = Math.pow(2, context_numBits)
                    context_numBits++
                }

                delete context_dictionaryToCreate[context_w]
            } else {
                value = context_dictionary[context_w]

                for (i = 0; i < context_numBits; i++) {
                    context_data_val = (context_data_val << 1) | (value & 1)

                    if (context_data_position == bitsPerChar - 1) {
                        context_data_position = 0
                        context_data.push(getCharFromInt(context_data_val))
                        context_data_val = 0
                    } else {
                        context_data_position++
                    }

                    value = value >> 1
                }
            }

            context_enlargeIn--

            if (context_enlargeIn == 0) {
                context_enlargeIn = Math.pow(2, context_numBits)
                context_numBits++
            }
        } // Mark the end of the stream

        value = 2

        for (i = 0; i < context_numBits; i++) {
            context_data_val = (context_data_val << 1) | (value & 1)

            if (context_data_position == bitsPerChar - 1) {
                context_data_position = 0
                context_data.push(getCharFromInt(context_data_val))
                context_data_val = 0
            } else {
                context_data_position++
            }

            value = value >> 1
        } // Flush the last char

        while (true) {
            context_data_val = context_data_val << 1

            if (context_data_position == bitsPerChar - 1) {
                context_data.push(getCharFromInt(context_data_val))
                break
            } else context_data_position++
        }

        return context_data.join('')
    },
    decompress: function decompress(compressed) {
        if (compressed == null) return ''
        if (compressed == '') return null
        return LZString._decompress(compressed.length, 32768, function (index) {
            return compressed.charCodeAt(index)
        })
    },
    _decompress: function _decompress(length, resetValue, getNextValue) {
        var dictionary = [],
            enlargeIn = 4,
            dictSize = 4,
            numBits = 3,
            entry = '',
            result = [],
            i,
            w,
            bits,
            resb,
            maxpower,
            power,
            c,
            data = {
                val: getNextValue(0),
                position: resetValue,
                index: 1,
            }

        for (i = 0; i < 3; i += 1) {
            dictionary[i] = i
        }

        bits = 0
        maxpower = Math.pow(2, 2)
        power = 1

        while (power != maxpower) {
            resb = data.val & data.position
            data.position >>= 1

            if (data.position == 0) {
                data.position = resetValue
                data.val = getNextValue(data.index++)
            }

            bits |= (resb > 0 ? 1 : 0) * power
            power <<= 1
        }

        switch (bits) {
            case 0:
                bits = 0
                maxpower = Math.pow(2, 8)
                power = 1

                while (power != maxpower) {
                    resb = data.val & data.position
                    data.position >>= 1

                    if (data.position == 0) {
                        data.position = resetValue
                        data.val = getNextValue(data.index++)
                    }

                    bits |= (resb > 0 ? 1 : 0) * power
                    power <<= 1
                }

                c = f(bits)
                break

            case 1:
                bits = 0
                maxpower = Math.pow(2, 16)
                power = 1

                while (power != maxpower) {
                    resb = data.val & data.position
                    data.position >>= 1

                    if (data.position == 0) {
                        data.position = resetValue
                        data.val = getNextValue(data.index++)
                    }

                    bits |= (resb > 0 ? 1 : 0) * power
                    power <<= 1
                }

                c = f(bits)
                break

            case 2:
                return ''
        }

        dictionary[3] = c
        w = c
        result.push(c)

        while (true) {
            if (data.index > length) {
                return ''
            }

            bits = 0
            maxpower = Math.pow(2, numBits)
            power = 1

            while (power != maxpower) {
                resb = data.val & data.position
                data.position >>= 1

                if (data.position == 0) {
                    data.position = resetValue
                    data.val = getNextValue(data.index++)
                }

                bits |= (resb > 0 ? 1 : 0) * power
                power <<= 1
            }

            switch ((c = bits)) {
                case 0:
                    bits = 0
                    maxpower = Math.pow(2, 8)
                    power = 1

                    while (power != maxpower) {
                        resb = data.val & data.position
                        data.position >>= 1

                        if (data.position == 0) {
                            data.position = resetValue
                            data.val = getNextValue(data.index++)
                        }

                        bits |= (resb > 0 ? 1 : 0) * power
                        power <<= 1
                    }

                    dictionary[dictSize++] = f(bits)
                    c = dictSize - 1
                    enlargeIn--
                    break

                case 1:
                    bits = 0
                    maxpower = Math.pow(2, 16)
                    power = 1

                    while (power != maxpower) {
                        resb = data.val & data.position
                        data.position >>= 1

                        if (data.position == 0) {
                            data.position = resetValue
                            data.val = getNextValue(data.index++)
                        }

                        bits |= (resb > 0 ? 1 : 0) * power
                        power <<= 1
                    }

                    dictionary[dictSize++] = f(bits)
                    c = dictSize - 1
                    enlargeIn--
                    break

                case 2:
                    return result.join('')
            }

            if (enlargeIn == 0) {
                enlargeIn = Math.pow(2, numBits)
                numBits++
            }

            if (dictionary[c]) {
                entry = dictionary[c]
            } else {
                if (c === dictSize) {
                    entry = w + w.charAt(0)
                } else {
                    return null
                }
            }

            result.push(entry) // Add w+entry[0] to the dictionary.

            dictionary[dictSize++] = w + entry.charAt(0)
            enlargeIn--
            w = entry

            if (enlargeIn == 0) {
                enlargeIn = Math.pow(2, numBits)
                numBits++
            }
        }
    },
}

var version = '1.8.0'

var Config = {
    DEBUG: false,
    LIB_VERSION: version,
}

/* eslint camelcase: "off", eqeqeq: "off" */
/*
 * Saved references to long variable names, so that closure compiler can
 * minimize file size.
 */

var ArrayProto = Array.prototype,
    FuncProto = Function.prototype,
    ObjProto = Object.prototype,
    slice = ArrayProto.slice,
    toString = ObjProto.toString,
    hasOwnProperty = ObjProto.hasOwnProperty,
    win = typeof window !== 'undefined' ? window : {},
    navigator = win.navigator || {
        userAgent: '',
    },
    document$1 = win.document || {},
    userAgent = navigator.userAgent
var nativeBind = FuncProto.bind,
    nativeForEach = ArrayProto.forEach,
    nativeIndexOf = ArrayProto.indexOf,
    nativeIsArray = Array.isArray,
    breaker = {}
var _ = {
    trim: function trim(str) {
        // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/Trim#Polyfill
        return str.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, '')
    },
} // Console override

var console$1 = {
    /** @type {function(...*)} */
    log: function log() {
        if (Config.DEBUG && !_.isUndefined(window.console) && window.console) {
            try {
                window.console.log.apply(window.console, arguments)
            } catch (err) {
                _.each(arguments, function (arg) {
                    window.console.log(arg)
                })
            }
        }
    },

    /** @type {function(...*)} */
    error: function error() {
        if (Config.DEBUG && !_.isUndefined(window.console) && window.console) {
            var args = ['PostHog error:'].concat(Array.prototype.slice.call(arguments))

            try {
                window.console.error.apply(window.console, args)
            } catch (err) {
                _.each(args, function (arg) {
                    window.console.error(arg)
                })
            }
        }
    },

    /** @type {function(...*)} */
    critical: function critical() {
        if (!_.isUndefined(window.console) && window.console) {
            var args = ['PostHog error:'].concat(Array.prototype.slice.call(arguments))

            try {
                window.console.error.apply(window.console, args)
            } catch (err) {
                _.each(args, function (arg) {
                    window.console.error(arg)
                })
            }
        }
    },
} // UNDERSCORE
// Embed part of the Underscore Library

_.bind = function (func, context) {
    var args, _bound

    if (nativeBind && func.bind === nativeBind) {
        return nativeBind.apply(func, slice.call(arguments, 1))
    }

    if (!_.isFunction(func)) {
        throw new TypeError()
    }

    args = slice.call(arguments, 2)

    _bound = function bound() {
        if (!(this instanceof _bound)) {
            return func.apply(context, args.concat(slice.call(arguments)))
        }

        var ctor = {}
        ctor.prototype = func.prototype
        var self = new ctor()
        ctor.prototype = null
        var result = func.apply(self, args.concat(slice.call(arguments)))

        if (Object(result) === result) {
            return result
        }

        return self
    }

    return _bound
}

_.bind_instance_methods = function (obj) {
    for (var func in obj) {
        if (typeof obj[func] === 'function') {
            obj[func] = _.bind(obj[func], obj)
        }
    }
}
/**
 * @param {*=} obj
 * @param {function(...*)=} iterator
 * @param {Object=} context
 */

_.each = function (obj, iterator, context) {
    if (obj === null || obj === undefined) {
        return
    }

    if (nativeForEach && obj.forEach === nativeForEach) {
        obj.forEach(iterator, context)
    } else if (obj.length === +obj.length) {
        for (var i = 0, l = obj.length; i < l; i++) {
            if (i in obj && iterator.call(context, obj[i], i, obj) === breaker) {
                return
            }
        }
    } else {
        for (var key in obj) {
            if (hasOwnProperty.call(obj, key)) {
                if (iterator.call(context, obj[key], key, obj) === breaker) {
                    return
                }
            }
        }
    }
}

_.extend = function (obj) {
    _.each(slice.call(arguments, 1), function (source) {
        for (var prop in source) {
            if (source[prop] !== void 0) {
                obj[prop] = source[prop]
            }
        }
    })

    return obj
}

_.isArray =
    nativeIsArray ||
    function (obj) {
        return toString.call(obj) === '[object Array]'
    } // from a comment on http://dbj.org/dbj/?p=286
// fails on only one very rare and deliberate custom object:
// var bomb = { toString : undefined, valueOf: function(o) { return "function BOMBA!"; }};

_.isFunction = function (f) {
    try {
        return /^\s*\bfunction\b/.test(f)
    } catch (x) {
        return false
    }
}

_.include = function (obj, target) {
    var found = false

    if (obj === null) {
        return found
    }

    if (nativeIndexOf && obj.indexOf === nativeIndexOf) {
        return obj.indexOf(target) != -1
    }

    _.each(obj, function (value) {
        if (found || (found = value === target)) {
            return breaker
        }
    })

    return found
}

_.includes = function (str, needle) {
    return str.indexOf(needle) !== -1
} // Underscore Addons

_.isObject = function (obj) {
    return obj === Object(obj) && !_.isArray(obj)
}

_.isEmptyObject = function (obj) {
    if (_.isObject(obj)) {
        for (var key in obj) {
            if (hasOwnProperty.call(obj, key)) {
                return false
            }
        }

        return true
    }

    return false
}

_.isUndefined = function (obj) {
    return obj === void 0
}

_.isString = function (obj) {
    return toString.call(obj) == '[object String]'
}

_.isDate = function (obj) {
    return toString.call(obj) == '[object Date]'
}

_.isNumber = function (obj) {
    return toString.call(obj) == '[object Number]'
}

_.encodeDates = function (obj) {
    _.each(obj, function (v, k) {
        if (_.isDate(v)) {
            obj[k] = _.formatDate(v)
        } else if (_.isObject(v)) {
            obj[k] = _.encodeDates(v) // recurse
        }
    })

    return obj
}

_.timestamp = function () {
    Date.now =
        Date.now ||
        function () {
            return +new Date()
        }

    return Date.now()
}

_.formatDate = function (d) {
    // YYYY-MM-DDTHH:MM:SS in UTC
    function pad(n) {
        return n < 10 ? '0' + n : n
    }

    return (
        d.getUTCFullYear() +
        '-' +
        pad(d.getUTCMonth() + 1) +
        '-' +
        pad(d.getUTCDate()) +
        'T' +
        pad(d.getUTCHours()) +
        ':' +
        pad(d.getUTCMinutes()) +
        ':' +
        pad(d.getUTCSeconds())
    )
}

_.safewrap = function (f) {
    return function () {
        try {
            return f.apply(this, arguments)
        } catch (e) {
            console$1.critical('Implementation error. Please turn on debug and contact support@posthog.com.')

            if (Config.DEBUG) {
                console$1.critical(e)
            }
        }
    }
}

_.safewrap_class = function (klass, functions) {
    for (var i = 0; i < functions.length; i++) {
        klass.prototype[functions[i]] = _.safewrap(klass.prototype[functions[i]])
    }
}

_.safewrap_instance_methods = function (obj) {
    for (var func in obj) {
        if (typeof obj[func] === 'function') {
            obj[func] = _.safewrap(obj[func])
        }
    }
}

_.strip_empty_properties = function (p) {
    var ret = {}

    _.each(p, function (v, k) {
        if (_.isString(v) && v.length > 0) {
            ret[k] = v
        }
    })

    return ret
} // Deep copies an object.
// It handles cycles by replacing all references to them with `undefined`
// Also supports customizing native values

var COPY_IN_PROGRESS_ATTRIBUTE = Symbol ? Symbol('__deepCircularCopyInProgress__') : '__deepCircularCopyInProgress__'

function deepCircularCopy(value, customizer) {
    if (value !== Object(value)) return customizer ? customizer(value) : value // primitive value

    if (COPY_IN_PROGRESS_ATTRIBUTE in value) return undefined
    value[COPY_IN_PROGRESS_ATTRIBUTE] = true
    var result

    if (_.isArray(value)) {
        result = []

        _.each(value, function (it) {
            result.push(deepCircularCopy(it, customizer))
        })
    } else {
        result = {}

        _.each(value, function (val, key) {
            if (key !== COPY_IN_PROGRESS_ATTRIBUTE) {
                result[key] = deepCircularCopy(val, customizer)
            }
        })
    }

    delete value[COPY_IN_PROGRESS_ATTRIBUTE]
    return result
}

_.copyAndTruncateStrings = function (object, maxStringLength) {
    return deepCircularCopy(object, function (value) {
        if (typeof value === 'string' && maxStringLength !== null) {
            value = value.slice(0, maxStringLength)
        }

        return value
    })
}

_.base64Encode = function (data) {
    var b64 = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/='
    var o1,
        o2,
        o3,
        h1,
        h2,
        h3,
        h4,
        bits,
        i = 0,
        ac = 0,
        enc = '',
        tmp_arr = []

    if (!data) {
        return data
    }

    data = _.utf8Encode(data)

    do {
        // pack three octets into four hexets
        o1 = data.charCodeAt(i++)
        o2 = data.charCodeAt(i++)
        o3 = data.charCodeAt(i++)
        bits = (o1 << 16) | (o2 << 8) | o3
        h1 = (bits >> 18) & 0x3f
        h2 = (bits >> 12) & 0x3f
        h3 = (bits >> 6) & 0x3f
        h4 = bits & 0x3f // use hexets to index into b64, and append result to encoded string

        tmp_arr[ac++] = b64.charAt(h1) + b64.charAt(h2) + b64.charAt(h3) + b64.charAt(h4)
    } while (i < data.length)

    enc = tmp_arr.join('')

    switch (data.length % 3) {
        case 1:
            enc = enc.slice(0, -2) + '=='
            break

        case 2:
            enc = enc.slice(0, -1) + '='
            break
    }

    return enc
}

_.utf8Encode = function (string) {
    string = (string + '').replace(/\r\n/g, '\n').replace(/\r/g, '\n')
    var utftext = '',
        start,
        end
    var stringl = 0,
        n
    start = end = 0
    stringl = string.length

    for (n = 0; n < stringl; n++) {
        var c1 = string.charCodeAt(n)
        var enc = null

        if (c1 < 128) {
            end++
        } else if (c1 > 127 && c1 < 2048) {
            enc = String.fromCharCode((c1 >> 6) | 192, (c1 & 63) | 128)
        } else {
            enc = String.fromCharCode((c1 >> 12) | 224, ((c1 >> 6) & 63) | 128, (c1 & 63) | 128)
        }

        if (enc !== null) {
            if (end > start) {
                utftext += string.substring(start, end)
            }

            utftext += enc
            start = end = n + 1
        }
    }

    if (end > start) {
        utftext += string.substring(start, string.length)
    }

    return utftext
}

_.UUID = (function () {
    // Time/ticks information
    // 1*new Date() is a cross browser version of Date.now()
    var T = function T() {
        var d = 1 * new Date(),
            i = 0 // this while loop figures how many browser ticks go by
        // before 1*new Date() returns a new number, ie the amount
        // of ticks that go by per millisecond

        while (d == 1 * new Date()) {
            i++
        }

        return d.toString(16) + i.toString(16)
    } // Math.Random entropy

    var R = function R() {
        return Math.random().toString(16).replace('.', '')
    } // User agent entropy
    // This function takes the user agent string, and then xors
    // together each sequence of 8 bytes.  This produces a final
    // sequence of 8 bytes which it returns as hex.

    var UA = function UA() {
        var ua = userAgent,
            i,
            ch,
            buffer = [],
            ret = 0

        function xor(result, byte_array) {
            var j,
                tmp = 0

            for (j = 0; j < byte_array.length; j++) {
                tmp |= buffer[j] << (j * 8)
            }

            return result ^ tmp
        }

        for (i = 0; i < ua.length; i++) {
            ch = ua.charCodeAt(i)
            buffer.unshift(ch & 0xff)

            if (buffer.length >= 4) {
                ret = xor(ret, buffer)
                buffer = []
            }
        }

        if (buffer.length > 0) {
            ret = xor(ret, buffer)
        }

        return ret.toString(16)
    }

    return function () {
        var se = (window.screen.height * window.screen.width).toString(16)
        return T() + '-' + R() + '-' + UA() + '-' + se + '-' + T()
    }
})() // _.isBlockedUA()
// This is to block various web spiders from executing our JS and
// sending false captureing data

_.isBlockedUA = function (ua) {
    if (/(google web preview|baiduspider|yandexbot|bingbot|googlebot|yahoo! slurp)/i.test(ua)) {
        return true
    }

    return false
}
/**
 * @param {Object=} formdata
 * @param {string=} arg_separator
 */

_.HTTPBuildQuery = function (formdata, arg_separator) {
    var use_val,
        use_key,
        tph_arr = []

    if (_.isUndefined(arg_separator)) {
        arg_separator = '&'
    }

    _.each(formdata, function (val, key) {
        use_val = encodeURIComponent(val.toString())
        use_key = encodeURIComponent(key)
        tph_arr[tph_arr.length] = use_key + '=' + use_val
    })

    return tph_arr.join(arg_separator)
}

_.getQueryParam = function (url, param) {
    // Expects a raw URL
    param = param.replace(/[[]/, '\\[').replace(/[\]]/, '\\]')
    var regexS = '[\\?&]' + param + '=([^&#]*)',
        regex = new RegExp(regexS),
        results = regex.exec(url)

    if (results === null || (results && typeof results[1] !== 'string' && results[1].length)) {
        return ''
    } else {
        var result = results[1]

        try {
            result = decodeURIComponent(result)
        } catch (err) {
            console$1.error('Skipping decoding for malformed query param: ' + result)
        }

        return result.replace(/\+/g, ' ')
    }
}

_.getHashParam = function (hash, param) {
    var matches = hash.match(new RegExp(param + '=([^&]*)'))
    return matches ? matches[1] : null
}

_.register_event = (function () {
    // written by Dean Edwards, 2005
    // with input from Tino Zijdel - crisp@xs4all.nl
    // with input from Carl Sverre - mail@carlsverre.com
    // with input from PostHog
    // http://dean.edwards.name/weblog/2005/10/add-event/
    // https://gist.github.com/1930440

    /**
     * @param {Object} element
     * @param {string} type
     * @param {function(...*)} handler
     * @param {boolean=} oldSchool
     * @param {boolean=} useCapture
     */
    var register_event = function register_event(element, type, handler, oldSchool, useCapture) {
        if (!element) {
            console$1.error('No valid element provided to register_event')
            return
        }

        if (element.addEventListener && !oldSchool) {
            element.addEventListener(type, handler, !!useCapture)
        } else {
            var ontype = 'on' + type
            var old_handler = element[ontype] // can be undefined

            element[ontype] = makeHandler(element, handler, old_handler)
        }
    }

    function makeHandler(element, new_handler, old_handlers) {
        var handler = function handler(event) {
            event = event || fixEvent(window.event) // this basically happens in firefox whenever another script
            // overwrites the onload callback and doesn't pass the event
            // object to previously defined callbacks.  All the browsers
            // that don't define window.event implement addEventListener
            // so the dom_loaded handler will still be fired as usual.

            if (!event) {
                return undefined
            }

            var ret = true
            var old_result, new_result

            if (_.isFunction(old_handlers)) {
                old_result = old_handlers(event)
            }

            new_result = new_handler.call(element, event)

            if (false === old_result || false === new_result) {
                ret = false
            }

            return ret
        }

        return handler
    }

    function fixEvent(event) {
        if (event) {
            event.preventDefault = fixEvent.preventDefault
            event.stopPropagation = fixEvent.stopPropagation
        }

        return event
    }

    fixEvent.preventDefault = function () {
        this.returnValue = false
    }

    fixEvent.stopPropagation = function () {
        this.cancelBubble = true
    }

    return register_event
})()

_.info = {
    campaignParams: function campaignParams() {
        var campaign_keywords = 'utm_source utm_medium utm_campaign utm_content utm_term'.split(' '),
            kw = '',
            params = {}

        _.each(campaign_keywords, function (kwkey) {
            kw = _.getQueryParam(document$1.URL, kwkey)

            if (kw.length) {
                params[kwkey] = kw
            }
        })

        return params
    },
    searchEngine: function searchEngine(referrer) {
        if (referrer.search('https?://(.*)google.([^/?]*)') === 0) {
            return 'google'
        } else if (referrer.search('https?://(.*)bing.com') === 0) {
            return 'bing'
        } else if (referrer.search('https?://(.*)yahoo.com') === 0) {
            return 'yahoo'
        } else if (referrer.search('https?://(.*)duckduckgo.com') === 0) {
            return 'duckduckgo'
        } else {
            return null
        }
    },
    searchInfo: function searchInfo(referrer) {
        var search = _.info.searchEngine(referrer),
            param = search != 'yahoo' ? 'q' : 'p',
            ret = {}

        if (search !== null) {
            ret['$search_engine'] = search

            var keyword = _.getQueryParam(referrer, param)

            if (keyword.length) {
                ret['ph_keyword'] = keyword
            }
        }

        return ret
    },

    /**
     * This function detects which browser is running this script.
     * The order of the checks are important since many user agents
     * include key words used in later checks.
     */
    browser: function browser(user_agent, vendor, opera) {
        vendor = vendor || '' // vendor is undefined for at least IE9

        if (opera || _.includes(user_agent, ' OPR/')) {
            if (_.includes(user_agent, 'Mini')) {
                return 'Opera Mini'
            }

            return 'Opera'
        } else if (/(BlackBerry|PlayBook|BB10)/i.test(user_agent)) {
            return 'BlackBerry'
        } else if (_.includes(user_agent, 'IEMobile') || _.includes(user_agent, 'WPDesktop')) {
            return 'Internet Explorer Mobile'
        } else if (_.includes(user_agent, 'SamsungBrowser/')) {
            // https://developer.samsung.com/internet/user-agent-string-format
            return 'Samsung Internet'
        } else if (_.includes(user_agent, 'Edge') || _.includes(user_agent, 'Edg/')) {
            return 'Microsoft Edge'
        } else if (_.includes(user_agent, 'FBIOS')) {
            return 'Facebook Mobile'
        } else if (_.includes(user_agent, 'Chrome')) {
            return 'Chrome'
        } else if (_.includes(user_agent, 'CriOS')) {
            return 'Chrome iOS'
        } else if (_.includes(user_agent, 'UCWEB') || _.includes(user_agent, 'UCBrowser')) {
            return 'UC Browser'
        } else if (_.includes(user_agent, 'FxiOS')) {
            return 'Firefox iOS'
        } else if (_.includes(vendor, 'Apple')) {
            if (_.includes(user_agent, 'Mobile')) {
                return 'Mobile Safari'
            }

            return 'Safari'
        } else if (_.includes(user_agent, 'Android')) {
            return 'Android Mobile'
        } else if (_.includes(user_agent, 'Konqueror')) {
            return 'Konqueror'
        } else if (_.includes(user_agent, 'Firefox')) {
            return 'Firefox'
        } else if (_.includes(user_agent, 'MSIE') || _.includes(user_agent, 'Trident/')) {
            return 'Internet Explorer'
        } else if (_.includes(user_agent, 'Gecko')) {
            return 'Mozilla'
        } else {
            return ''
        }
    },

    /**
     * This function detects which browser version is running this script,
     * parsing major and minor version (e.g., 42.1). User agent strings from:
     * http://www.useragentstring.com/pages/useragentstring.php
     */
    browserVersion: function browserVersion(userAgent, vendor, opera) {
        var browser = _.info.browser(userAgent, vendor, opera)

        var versionRegexs = {
            'Internet Explorer Mobile': /rv:(\d+(\.\d+)?)/,
            'Microsoft Edge': /Edge?\/(\d+(\.\d+)?)/,
            Chrome: /Chrome\/(\d+(\.\d+)?)/,
            'Chrome iOS': /CriOS\/(\d+(\.\d+)?)/,
            'UC Browser': /(UCBrowser|UCWEB)\/(\d+(\.\d+)?)/,
            Safari: /Version\/(\d+(\.\d+)?)/,
            'Mobile Safari': /Version\/(\d+(\.\d+)?)/,
            Opera: /(Opera|OPR)\/(\d+(\.\d+)?)/,
            Firefox: /Firefox\/(\d+(\.\d+)?)/,
            'Firefox iOS': /FxiOS\/(\d+(\.\d+)?)/,
            Konqueror: /Konqueror:(\d+(\.\d+)?)/,
            BlackBerry: /BlackBerry (\d+(\.\d+)?)/,
            'Android Mobile': /android\s(\d+(\.\d+)?)/,
            'Samsung Internet': /SamsungBrowser\/(\d+(\.\d+)?)/,
            'Internet Explorer': /(rv:|MSIE )(\d+(\.\d+)?)/,
            Mozilla: /rv:(\d+(\.\d+)?)/,
        }
        var regex = versionRegexs[browser]

        if (regex === undefined) {
            return null
        }

        var matches = userAgent.match(regex)

        if (!matches) {
            return null
        }

        return parseFloat(matches[matches.length - 2])
    },
    os: function os() {
        var a = userAgent

        if (/Windows/i.test(a)) {
            if (/Phone/.test(a) || /WPDesktop/.test(a)) {
                return 'Windows Phone'
            }

            return 'Windows'
        } else if (/(iPhone|iPad|iPod)/.test(a)) {
            return 'iOS'
        } else if (/Android/.test(a)) {
            return 'Android'
        } else if (/(BlackBerry|PlayBook|BB10)/i.test(a)) {
            return 'BlackBerry'
        } else if (/Mac/i.test(a)) {
            return 'Mac OS X'
        } else if (/Linux/.test(a)) {
            return 'Linux'
        } else if (/CrOS/.test(a)) {
            return 'Chrome OS'
        } else {
            return ''
        }
    },
    device: function device(user_agent) {
        if (/Windows Phone/i.test(user_agent) || /WPDesktop/.test(user_agent)) {
            return 'Windows Phone'
        } else if (/iPad/.test(user_agent)) {
            return 'iPad'
        } else if (/iPod/.test(user_agent)) {
            return 'iPod Touch'
        } else if (/iPhone/.test(user_agent)) {
            return 'iPhone'
        } else if (/(BlackBerry|PlayBook|BB10)/i.test(user_agent)) {
            return 'BlackBerry'
        } else if (/Android/.test(user_agent)) {
            return 'Android'
        } else {
            return ''
        }
    },
    referringDomain: function referringDomain(referrer) {
        var split = referrer.split('/')

        if (split.length >= 3) {
            return split[2]
        }

        return ''
    },
    properties: function properties() {
        return _.extend(
            _.strip_empty_properties({
                $os: _.info.os(),
                $browser: _.info.browser(userAgent, navigator.vendor, window.opera),
                $device: _.info.device(userAgent),
            }),
            {
                $current_url: window.location.href,
                $host: window.location.host,
                $pathname: window.location.pathname,
                $browser_version: _.info.browserVersion(userAgent, navigator.vendor, window.opera),
                $screen_height: window.screen.height,
                $screen_width: window.screen.width,
                $lib: 'web',
                $lib_version: Config.LIB_VERSION,
                $insert_id: Math.random().toString(36).substring(2, 10) + Math.random().toString(36).substring(2, 10),
                $time: _.timestamp() / 1000, // epoch time in seconds
            }
        )
    },
    people_properties: function people_properties() {
        return _.extend(
            _.strip_empty_properties({
                $os: _.info.os(),
                $browser: _.info.browser(userAgent, navigator.vendor, window.opera),
            }),
            {
                $browser_version: _.info.browserVersion(userAgent, navigator.vendor, window.opera),
            }
        )
    },
} // EXPORTS (for closure compiler)

_['isObject'] = _.isObject
_['isBlockedUA'] = _.isBlockedUA
_['isEmptyObject'] = _.isEmptyObject
_['info'] = _.info
_['info']['device'] = _.info.device
_['info']['browser'] = _.info.browser
_['info']['browserVersion'] = _.info.browserVersion
_['info']['properties'] = _.info.properties

/*
 * Get the className of an element, accounting for edge cases where element.className is an object
 * @param {Element} el - element to get the className of
 * @returns {string} the element's class
 */

function getClassName(el) {
    switch (_typeof(el.className)) {
        case 'string':
            return el.className

        case 'object':
            // handle cases where className might be SVGAnimatedString or some other type
            return el.className.baseVal || el.getAttribute('class') || ''

        default:
            // future proof
            return ''
    }
}
/*
 * Get the direct text content of an element, protecting against sensitive data collection.
 * Concats textContent of each of the element's text node children; this avoids potential
 * collection of sensitive data that could happen if we used element.textContent and the
 * element had sensitive child elements, since element.textContent includes child content.
 * Scrubs values that look like they could be sensitive (i.e. cc or ssn number).
 * @param {Element} el - element to get the text of
 * @returns {string} the element's direct text content
 */

function getSafeText(el) {
    var elText = ''

    if (shouldCaptureElement(el) && !isSensitiveElement(el) && el.childNodes && el.childNodes.length) {
        _.each(el.childNodes, function (child) {
            if (isTextNode(child) && child.textContent) {
                elText += _.trim(child.textContent) // scrub potentially sensitive values
                    .split(/(\s+)/)
                    .filter(shouldCaptureValue)
                    .join('') // normalize whitespace
                    .replace(/[\r\n]/g, ' ')
                    .replace(/[ ]+/g, ' ') // truncate
                    .substring(0, 255)
            }
        })
    }

    return _.trim(elText)
}
/*
 * Check whether an element has nodeType Node.ELEMENT_NODE
 * @param {Element} el - element to check
 * @returns {boolean} whether el is of the correct nodeType
 */

function isElementNode(el) {
    return el && el.nodeType === 1 // Node.ELEMENT_NODE - use integer constant for browser portability
}
/*
 * Check whether an element is of a given tag type.
 * Due to potential reference discrepancies (such as the webcomponents.js polyfill),
 * we want to match tagNames instead of specific references because something like
 * element === document.body won't always work because element might not be a native
 * element.
 * @param {Element} el - element to check
 * @param {string} tag - tag name (e.g., "div")
 * @returns {boolean} whether el is of the given tag type
 */

function isTag(el, tag) {
    return el && el.tagName && el.tagName.toLowerCase() === tag.toLowerCase()
}
/*
 * Check whether an element has nodeType Node.TEXT_NODE
 * @param {Element} el - element to check
 * @returns {boolean} whether el is of the correct nodeType
 */

function isTextNode(el) {
    return el && el.nodeType === 3 // Node.TEXT_NODE - use integer constant for browser portability
}
var usefulElements = ['a', 'button', 'form', 'input', 'select', 'textarea', 'label']
/*
 * Check whether a DOM event should be "captured" or if it may contain sentitive data
 * using a variety of heuristics.
 * @param {Element} el - element to check
 * @param {Event} event - event to check
 * @returns {boolean} whether the event should be captured
 */

function shouldCaptureDomEvent(el, event) {
    if (!el || isTag(el, 'html') || !isElementNode(el)) {
        return false
    }

    var parentIsUsefulElement = false
    var targetElementList = [el]
    var parentNode = true
    var curEl = el

    while (curEl.parentNode && !isTag(curEl, 'body')) {
        // If element is a shadow root, we skip it
        if (curEl.parentNode.nodeType === 11) {
            targetElementList.push(curEl.parentNode.host)
            curEl = curEl.parentNode.host
            continue
        }

        parentNode = curEl.parentNode
        if (!parentNode) break

        if (usefulElements.indexOf(parentNode.tagName.toLowerCase()) > -1) {
            parentIsUsefulElement = true
        } else {
            var _compStyles = window.getComputedStyle(parentNode)

            if (_compStyles && _compStyles.getPropertyValue('cursor') === 'pointer') {
                parentIsUsefulElement = true
            }
        }

        targetElementList.push(parentNode)
        curEl = parentNode
    }

    var compStyles = window.getComputedStyle(el)

    if (compStyles && compStyles.getPropertyValue('cursor') === 'pointer' && event.type === 'click') {
        return true
    }

    var tag = el.tagName.toLowerCase()

    switch (tag) {
        case 'html':
            return false

        case 'form':
            return event.type === 'submit'

        case 'input':
            return event.type === 'change' || event.type === 'click'

        case 'select':
        case 'textarea':
            return event.type === 'change' || event.type === 'click'

        default:
            if (parentIsUsefulElement) return event.type === 'click'
            return (
                event.type === 'click' &&
                (usefulElements.indexOf(tag) > -1 || el.getAttribute('contenteditable') === 'true')
            )
    }
}
/*
 * Check whether a DOM element should be "captured" or if it may contain sentitive data
 * using a variety of heuristics.
 * @param {Element} el - element to check
 * @returns {boolean} whether the element should be captured
 */

function shouldCaptureElement(el) {
    for (var curEl = el; curEl.parentNode && !isTag(curEl, 'body'); curEl = curEl.parentNode) {
        var classes = getClassName(curEl).split(' ')

        if (_.includes(classes, 'ph-sensitive') || _.includes(classes, 'ph-no-capture')) {
            return false
        }
    }

    if (_.includes(getClassName(el).split(' '), 'ph-include')) {
        return true
    } // don't include hidden or password fields

    var type = el.type || ''

    if (typeof type === 'string') {
        // it's possible for el.type to be a DOM element if el is a form with a child input[name="type"]
        switch (type.toLowerCase()) {
            case 'hidden':
                return false

            case 'password':
                return false
        }
    } // filter out data from fields that look like sensitive fields

    var name = el.name || el.id || ''

    if (typeof name === 'string') {
        // it's possible for el.name or el.id to be a DOM element if el is a form with a child input[name="name"]
        var sensitiveNameRegex = /^cc|cardnum|ccnum|creditcard|csc|cvc|cvv|exp|pass|pwd|routing|seccode|securitycode|securitynum|socialsec|socsec|ssn/i

        if (sensitiveNameRegex.test(name.replace(/[^a-zA-Z0-9]/g, ''))) {
            return false
        }
    }

    return true
}
/*
 * Check whether a DOM element is 'sensitive' and we should only capture limited data
 * @param {Element} el - element to check
 * @returns {boolean} whether the element should be captured
 */

function isSensitiveElement(el) {
    // don't send data from inputs or similar elements since there will always be
    // a risk of clientside javascript placing sensitive data in attributes
    if (
        (isTag(el, 'input') && el.type != 'button') ||
        isTag(el, 'select') ||
        isTag(el, 'textarea') ||
        el.getAttribute('contenteditable') === 'true'
    ) {
        return true
    }

    return false
}
/*
 * Check whether a string value should be "captured" or if it may contain sentitive data
 * using a variety of heuristics.
 * @param {string} value - string value to check
 * @returns {boolean} whether the element should be captured
 */

function shouldCaptureValue(value) {
    if (value === null || _.isUndefined(value)) {
        return false
    }

    if (typeof value === 'string') {
        value = _.trim(value) // check to see if input value looks like a credit card number
        // see: https://www.safaribooksonline.com/library/view/regular-expressions-cookbook/9781449327453/ch04s20.html

        var ccRegex = /^(?:(4[0-9]{12}(?:[0-9]{3})?)|(5[1-5][0-9]{14})|(6(?:011|5[0-9]{2})[0-9]{12})|(3[47][0-9]{13})|(3(?:0[0-5]|[68][0-9])[0-9]{11})|((?:2131|1800|35[0-9]{3})[0-9]{11}))$/

        if (ccRegex.test((value || '').replace(/[- ]/g, ''))) {
            return false
        } // check to see if input value looks like a social security number

        var ssnRegex = /(^\d{3}-?\d{2}-?\d{4}$)/

        if (ssnRegex.test(value)) {
            return false
        }
    }

    return true
}
function loadScript(scriptUrlToLoad, callback) {
    var scriptTag = document.createElement('script')
    scriptTag.type = 'text/javascript'
    scriptTag.src = scriptUrlToLoad
    scriptTag.onload = callback
    var scripts = document.getElementsByTagName('script')

    if (scripts.length > 0) {
        scripts[0].parentNode.insertBefore(scriptTag, scripts[0])
    } else {
        document.body.appendChild(scriptTag)
    }
}

var autocapture = {
    _initializedTokens: [],
    _previousElementSibling: function _previousElementSibling(el) {
        if (el.previousElementSibling) {
            return el.previousElementSibling
        } else {
            do {
                el = el.previousSibling
            } while (el && !isElementNode(el))

            return el
        }
    },
    _getPropertiesFromElement: function _getPropertiesFromElement(elem) {
        var tag_name = elem.tagName.toLowerCase()
        var props = {
            tag_name: tag_name,
        }
        if (usefulElements.indexOf(tag_name) > -1) props['$el_text'] = getSafeText(elem)
        var classes = getClassName(elem)
        if (classes.length > 0)
            props['classes'] = classes.split(' ').filter(function (c) {
                return c !== ''
            })

        _.each(elem.attributes, function (attr) {
            // Only capture attributes we know are safe
            if (isSensitiveElement(elem) && ['name', 'id', 'class'].indexOf(attr.name) === -1) return

            if (shouldCaptureValue(attr.value)) {
                props['attr__' + attr.name] = attr.value
            }
        })

        var nthChild = 1
        var nthOfType = 1
        var currentElem = elem

        while ((currentElem = this._previousElementSibling(currentElem))) {
            // eslint-disable-line no-cond-assign
            nthChild++

            if (currentElem.tagName === elem.tagName) {
                nthOfType++
            }
        }

        props['nth_child'] = nthChild
        props['nth_of_type'] = nthOfType
        return props
    },
    _getDefaultProperties: function _getDefaultProperties(eventType) {
        return {
            $event_type: eventType,
            $ce_version: 1,
        }
    },
    _extractCustomPropertyValue: function _extractCustomPropertyValue(customProperty) {
        var propValues = []

        _.each(document.querySelectorAll(customProperty['css_selector']), function (matchedElem) {
            var value

            if (['input', 'select'].indexOf(matchedElem.tagName.toLowerCase()) > -1) {
                value = matchedElem['value']
            } else if (matchedElem['textContent']) {
                value = matchedElem['textContent']
            }

            if (shouldCaptureValue(value)) {
                propValues.push(value)
            }
        })

        return propValues.join(', ')
    },
    _getCustomProperties: function _getCustomProperties(targetElementList) {
        var props = {}

        _.each(
            this._customProperties,
            function (customProperty) {
                _.each(
                    customProperty['event_selectors'],
                    function (eventSelector) {
                        var eventElements = document.querySelectorAll(eventSelector)

                        _.each(
                            eventElements,
                            function (eventElement) {
                                if (_.includes(targetElementList, eventElement) && shouldCaptureElement(eventElement)) {
                                    props[customProperty['name']] = this._extractCustomPropertyValue(customProperty)
                                }
                            },
                            this
                        )
                    },
                    this
                )
            },
            this
        )

        return props
    },
    _getEventTarget: function _getEventTarget(e) {
        // https://developer.mozilla.org/en-US/docs/Web/API/Event/target#Compatibility_notes
        if (typeof e.target === 'undefined') {
            return e.srcElement
        } else {
            if (e.target.shadowRoot) {
                return e.composedPath()[0]
            }

            return e.target
        }
    },
    _captureEvent: function _captureEvent(e, instance) {
        /*** Don't mess with this code without running IE8 tests on it ***/
        var target = this._getEventTarget(e)

        if (isTextNode(target)) {
            // defeat Safari bug (see: http://www.quirksmode.org/js/events_properties.html)
            target = target.parentNode
        }

        if (shouldCaptureDomEvent(target, e)) {
            var targetElementList = [target]
            var curEl = target

            while (curEl.parentNode && !isTag(curEl, 'body')) {
                if (curEl.parentNode.nodeType === 11) {
                    targetElementList.push(curEl.parentNode.host)
                    curEl = curEl.parentNode.host
                    continue
                }

                targetElementList.push(curEl.parentNode)
                curEl = curEl.parentNode
            }

            var elementsJson = []
            var href,
                explicitNoCapture = false

            _.each(
                targetElementList,
                function (el) {
                    var shouldCaptureEl = shouldCaptureElement(el) // if the element or a parent element is an anchor tag
                    // include the href as a property

                    if (el.tagName.toLowerCase() === 'a') {
                        href = el.getAttribute('href')
                        href = shouldCaptureEl && shouldCaptureValue(href) && href
                    } // allow users to programmatically prevent capturing of elements by adding class 'ph-no-capture'

                    var classes = getClassName(el).split(' ')

                    if (_.includes(classes, 'ph-no-capture')) {
                        explicitNoCapture = true
                    }

                    elementsJson.push(this._getPropertiesFromElement(el))
                },
                this
            )

            elementsJson[0]['$el_text'] = getSafeText(target)

            if (href) {
                elementsJson[0]['attr__href'] = href
            }

            if (explicitNoCapture) {
                return false
            }

            var props = _.extend(
                this._getDefaultProperties(e.type),
                {
                    $elements: elementsJson,
                },
                this._getCustomProperties(targetElementList)
            )

            instance.capture('$autocapture', props)
            return true
        }
    },
    // only reason is to stub for unit tests
    // since you can't override window.location props
    _navigate: function _navigate(href) {
        window.location.href = href
    },
    _addDomEventHandlers: function _addDomEventHandlers(instance) {
        var handler = _.bind(function (e) {
            e = e || window.event

            this._captureEvent(e, instance)
        }, this)

        _.register_event(document, 'submit', handler, false, true)

        _.register_event(document, 'change', handler, false, true)

        _.register_event(document, 'click', handler, false, true)
    },
    _customProperties: {},
    init: function init(instance) {
        instance.toolbar.maybeLoadEditor()
        var token = instance.get_config('token')

        if (this._initializedTokens.indexOf(token) > -1) {
            console.log('autocapture already initialized for token "' + token + '"')
            return
        }

        this._initializedTokens.push(token)

        var parseDecideResponse = _.bind(function (response) {
            if (!(document && document.body)) {
                console.log('document not ready yet, trying again in 500 milliseconds...')
                setTimeout(function () {
                    parseDecideResponse(response)
                }, 500)
                return
            }

            instance.toolbar.afterDecideResponse(response)
            instance.sessionRecording.afterDecideResponse(response)

            if (response && response['config'] && response['config']['enable_collect_everything'] === true) {
                if (response['custom_properties']) {
                    this._customProperties = response['custom_properties']
                }

                this._addDomEventHandlers(instance)
            } else {
                instance['__autocapture_enabled'] = false
            }

            if (response['featureFlags']) {
                instance.persistence &&
                    instance.persistence.register({
                        $active_feature_flags: response['featureFlags'],
                    })
            } else {
                instance.persistence && instance.persistence.unregister('$active_feature_flags')
            }

            if (response['supportedCompression']) {
                var compression = {}

                var _iterator = _createForOfIteratorHelper(response['supportedCompression']),
                    _step

                try {
                    for (_iterator.s(); !(_step = _iterator.n()).done; ) {
                        var method = _step.value
                        compression[method] = true
                    }
                } catch (err) {
                    _iterator.e(err)
                } finally {
                    _iterator.f()
                }

                instance['compression'] = compression
            } else {
                instance['compression'] = {}
            }
        }, this)

        var json_data = JSON.stringify({
            token: token,
            distinct_id: instance.get_distinct_id(),
        })

        var encoded_data = _.base64Encode(json_data)

        instance._send_request(
            instance.get_config('api_host') + '/decide/',
            {
                data: encoded_data,
            },
            {
                method: 'POST',
            },
            instance._prepare_callback(parseDecideResponse)
        )
    },
    // this is a mechanism to ramp up CE with no server-side interaction.
    // when CE is active, every page load results in a decide request. we
    // need to gently ramp this up so we don't overload decide. this decides
    // deterministically if CE is enabled for this project by modding the char
    // value of the project token.
    enabledForProject: function enabledForProject(token, numBuckets, numEnabledBuckets) {
        numBuckets = !_.isUndefined(numBuckets) ? numBuckets : 10
        numEnabledBuckets = !_.isUndefined(numEnabledBuckets) ? numEnabledBuckets : 10
        var charCodeSum = 0

        for (var i = 0; i < token.length; i++) {
            charCodeSum += token.charCodeAt(i)
        }

        return charCodeSum % numBuckets < numEnabledBuckets
    },
    isBrowserSupported: function isBrowserSupported() {
        return _.isFunction(document.querySelectorAll)
    },
}

_.bind_instance_methods(autocapture)

_.safewrap_instance_methods(autocapture)

var DOMAIN_MATCH_REGEX = /[a-z0-9][a-z0-9-]+\.[a-z.]{2,6}$/i // Methods partially borrowed from quirksmode.org/js/cookies.html

var cookieStore = {
    get: function get(name) {
        try {
            var nameEQ = name + '='
            var ca = document.cookie.split(';')

            for (var i = 0; i < ca.length; i++) {
                var c = ca[i]

                while (c.charAt(0) == ' ') {
                    c = c.substring(1, c.length)
                }

                if (c.indexOf(nameEQ) === 0) {
                    return decodeURIComponent(c.substring(nameEQ.length, c.length))
                }
            }
        } catch (err) {}

        return null
    },
    parse: function parse(name) {
        var cookie

        try {
            cookie = JSON.parse(cookieStore.get(name)) || {}
        } catch (err) {
            // noop
        }

        return cookie
    },
    set: function set(name, value, days, cross_subdomain, is_secure) {
        try {
            var cdomain = '',
                expires = '',
                secure = ''

            if (cross_subdomain) {
                var matches = document.location.hostname.match(DOMAIN_MATCH_REGEX),
                    domain = matches ? matches[0] : ''
                cdomain = domain ? '; domain=.' + domain : ''
            }

            if (days) {
                var date = new Date()
                date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000)
                expires = '; expires=' + date.toGMTString()
            }

            if (is_secure) {
                secure = '; secure'
            }

            var new_cookie_val = name + '=' + encodeURIComponent(value) + expires + '; path=/' + cdomain + secure
            document.cookie = new_cookie_val
            return new_cookie_val
        } catch (err) {
            return
        }
    },
    remove: function remove(name, cross_subdomain) {
        try {
            cookieStore.set(name, '', -1, cross_subdomain)
        } catch (err) {
            return
        }
    },
}
var _localStorage_supported = null
var localStore = {
    is_supported: function is_supported() {
        if (_localStorage_supported !== null) {
            return _localStorage_supported
        }

        var supported = true

        try {
            var key = '__mplssupport__',
                val = 'xyz'
            localStore.set(key, val)

            if (localStore.get(key) !== val) {
                supported = false
            }

            localStore.remove(key)
        } catch (err) {
            supported = false
        }

        if (!supported) {
            console$1.error('localStorage unsupported; falling back to cookie store')
        }

        _localStorage_supported = supported
        return supported
    },
    error: function error(msg) {
        console$1.error('localStorage error: ' + msg)
    },
    get: function get(name) {
        try {
            return window.localStorage.getItem(name)
        } catch (err) {
            localStore.error(err)
        }

        return null
    },
    parse: function parse(name) {
        try {
            return JSON.parse(localStore.get(name)) || {}
        } catch (err) {
            // noop
        }

        return null
    },
    set: function set(name, value) {
        try {
            window.localStorage.setItem(name, value)
        } catch (err) {
            localStore.error(err)
        }
    },
    remove: function remove(name) {
        try {
            window.localStorage.removeItem(name)
        } catch (err) {
            localStore.error(err)
        }
    },
}
var memoryStorage = {} // Storage that only lasts the length of the pageview if we don't want to use cookies

var memoryStore = {
    is_supported: function is_supported() {
        return true
    },
    error: function error(msg) {
        console$1.error('memoryStorage error: ' + msg)
    },
    parse: function parse(name) {
        return memoryStorage[name] || null
    },
    set: function set(name, value) {
        memoryStorage[name] = value
    },
    remove: function remove(name) {
        delete memoryStorage[name]
    },
}

/**
 * GDPR utils
 *
 * The General Data Protection Regulation (GDPR) is a regulation in EU law on data protection
 * and privacy for all individuals within the European Union. It addresses the export of personal
 * data outside the EU. The GDPR aims primarily to give control back to citizens and residents
 * over their personal data and to simplify the regulatory environment for international business
 * by unifying the regulation within the EU.
 *
 * This set of utilities is intended to enable opt in/out functionality in the PostHog JS SDK.
 * These functions are used internally by the SDK and are not intended to be publicly exposed.
 */
/**
 * A function used to capture a PostHog event (e.g. PostHogLib.capture)
 * @callback captureFunction
 * @param {String} event_name The name of the event. This can be anything the user does - 'Button Click', 'Sign Up', 'Item Purchased', etc.
 * @param {Object} [properties] A set of properties to include with the event you're sending. These describe the user who did the event or details about the event itself.
 * @param {Function} [callback] If provided, the callback function will be called after capturing the event.
 */

/** Public **/

var GDPR_DEFAULT_PERSISTENCE_PREFIX = '__ph_opt_in_out_'
/**
 * Opt the user in to data capturing and cookies/localstorage for the given token
 * @param {string} token - PostHog project capturing token
 * @param {Object} [options]
 * @param {captureFunction} [options.capture] - function used for capturing a PostHog event to record the opt-in action
 * @param {string} [options.captureEventName] - event name to be used for capturing the opt-in action
 * @param {Object} [options.captureProperties] - set of properties to be captured along with the opt-in action
 * @param {string} [options.persistenceType] Persistence mechanism used - cookie or localStorage
 * @param {string} [options.persistencePrefix=__ph_opt_in_out] - custom prefix to be used in the cookie/localstorage name
 * @param {Number} [options.cookieExpiration] - number of days until the opt-in cookie expires
 * @param {string} [options.cookieDomain] - custom cookie domain
 * @param {boolean} [options.crossSiteCookie] - whether the opt-in cookie is set as cross-site-enabled
 * @param {boolean} [options.crossSubdomainCookie] - whether the opt-in cookie is set as cross-subdomain or not
 * @param {boolean} [options.secureCookie] - whether the opt-in cookie is set as secure or not
 */

function optIn(token, options) {
    _optInOut(true, token, options)
}
/**
 * Opt the user out of data capturing and cookies/localstorage for the given token
 * @param {string} token - PostHog project capturing token
 * @param {Object} [options]
 * @param {string} [options.persistenceType] Persistence mechanism used - cookie or localStorage
 * @param {string} [options.persistencePrefix=__ph_opt_in_out] - custom prefix to be used in the cookie/localstorage name
 * @param {Number} [options.cookieExpiration] - number of days until the opt-out cookie expires
 * @param {string} [options.cookieDomain] - custom cookie domain
 * @param {boolean} [options.crossSiteCookie] - whether the opt-in cookie is set as cross-site-enabled
 * @param {boolean} [options.crossSubdomainCookie] - whether the opt-out cookie is set as cross-subdomain or not
 * @param {boolean} [options.secureCookie] - whether the opt-out cookie is set as secure or not
 */

function optOut(token, options) {
    _optInOut(false, token, options)
}
/**
 * Check whether the user has opted in to data capturing and cookies/localstorage for the given token
 * @param {string} token - PostHog project capturing token
 * @param {Object} [options]
 * @param {string} [options.persistenceType] Persistence mechanism used - cookie or localStorage
 * @param {string} [options.persistencePrefix=__ph_opt_in_out] - custom prefix to be used in the cookie/localstorage name
 * @returns {boolean} whether the user has opted in to the given opt type
 */

function hasOptedIn(token, options) {
    return _getStorageValue(token, options) === '1'
}
/**
 * Check whether the user has opted out of data capturing and cookies/localstorage for the given token
 * @param {string} token - PostHog project capturing token
 * @param {Object} [options]
 * @param {string} [options.persistenceType] Persistence mechanism used - cookie or localStorage
 * @param {string} [options.persistencePrefix=__ph_opt_in_out] - custom prefix to be used in the cookie/localstorage name
 * @param {boolean} [options.respectDnt] - flag to take browser DNT setting into account
 * @returns {boolean} whether the user has opted out of the given opt type
 */

function hasOptedOut(token, options) {
    if (_hasDoNotTrackFlagOn(options)) {
        return true
    }

    return _getStorageValue(token, options) === '0'
}
/**
 * Wrap a PostHogLib method with a check for whether the user is opted out of data capturing and cookies/localstorage for the given token
 * If the user has opted out, return early instead of executing the method.
 * If a callback argument was provided, execute it passing the 0 error code.
 * @param {function} method - wrapped method to be executed if the user has not opted out
 * @returns {*} the result of executing method OR undefined if the user has opted out
 */

function addOptOutCheckPostHogLib(method, silenceErrors) {
    return _addOptOutCheck(
        method,
        function (name) {
            return this.get_config(name)
        },
        silenceErrors
    )
}
/**
 * Wrap a PostHogPeople method with a check for whether the user is opted out of data capturing and cookies/localstorage for the given token
 * If the user has opted out, return early instead of executing the method.
 * If a callback argument was provided, execute it passing the 0 error code.
 * @param {function} method - wrapped method to be executed if the user has not opted out
 * @returns {*} the result of executing method OR undefined if the user has opted out
 */

function addOptOutCheckPostHogPeople(method, silenceErrors) {
    return _addOptOutCheck(
        method,
        function (name) {
            return this._get_config(name)
        },
        silenceErrors
    )
}
/**
 * Clear the user's opt in/out status of data capturing and cookies/localstorage for the given token
 * @param {string} token - PostHog project capturing token
 * @param {Object} [options]
 * @param {string} [options.persistenceType] Persistence mechanism used - cookie or localStorage
 * @param {string} [options.persistencePrefix=__ph_opt_in_out] - custom prefix to be used in the cookie/localstorage name
 * @param {Number} [options.cookieExpiration] - number of days until the opt-in cookie expires
 * @param {string} [options.cookieDomain] - custom cookie domain
 * @param {boolean} [options.crossSiteCookie] - whether the opt-in cookie is set as cross-site-enabled
 * @param {boolean} [options.crossSubdomainCookie] - whether the opt-in cookie is set as cross-subdomain or not
 * @param {boolean} [options.secureCookie] - whether the opt-in cookie is set as secure or not
 */

function clearOptInOut(token, options) {
    options = options || {}

    _getStorage(options).remove(_getStorageKey(token, options), !!options.crossSubdomainCookie, options.cookieDomain)
}
/** Private **/

/**
 * Get storage util
 * @param {Object} [options]
 * @param {string} [options.persistenceType]
 * @returns {object} either cookieStore or localStore
 */

function _getStorage(options) {
    options = options || {}
    return options.persistenceType === 'localStorage' ? localStore : cookieStore
}
/**
 * Get the name of the cookie that is used for the given opt type (capturing, cookie, etc.)
 * @param {string} token - PostHog project capturing token
 * @param {Object} [options]
 * @param {string} [options.persistencePrefix=__ph_opt_in_out] - custom prefix to be used in the cookie/localstorage name
 * @returns {string} the name of the cookie for the given opt type
 */

function _getStorageKey(token, options) {
    options = options || {}
    return (options.persistencePrefix || GDPR_DEFAULT_PERSISTENCE_PREFIX) + token
}
/**
 * Get the value of the cookie that is used for the given opt type (capturing, cookie, etc.)
 * @param {string} token - PostHog project capturing token
 * @param {Object} [options]
 * @param {string} [options.persistencePrefix=__ph_opt_in_out] - custom prefix to be used in the cookie/localstorage name
 * @returns {string} the value of the cookie for the given opt type
 */

function _getStorageValue(token, options) {
    return _getStorage(options).get(_getStorageKey(token, options))
}
/**
 * Check whether the user has set the DNT/doNotTrack setting to true in their browser
 * @param {Object} [options]
 * @param {string} [options.window] - alternate window object to check; used to force various DNT settings in browser tests
 * @param {boolean} [options.respectDnt] - flag to take browser DNT setting into account
 * @returns {boolean} whether the DNT setting is true
 */

function _hasDoNotTrackFlagOn(options) {
    if (options && options.respectDnt) {
        var win$1 = (options && options.window) || win
        var nav = win$1['navigator'] || {}
        var hasDntOn = false

        _.each(
            [
                nav['doNotTrack'], // standard
                nav['msDoNotTrack'],
                win$1['doNotTrack'],
            ],
            function (dntValue) {
                if (_.includes([true, 1, '1', 'yes'], dntValue)) {
                    hasDntOn = true
                }
            }
        )

        return hasDntOn
    }

    return false
}
/**
 * Set cookie/localstorage for the user indicating that they are opted in or out for the given opt type
 * @param {boolean} optValue - whether to opt the user in or out for the given opt type
 * @param {string} token - PostHog project capturing token
 * @param {Object} [options]
 * @param {captureFunction} [options.capture] - function used for capturing a PostHog event to record the opt-in action
 * @param {string} [options.captureEventName] - event name to be used for capturing the opt-in action
 * @param {Object} [options.captureProperties] - set of properties to be captured along with the opt-in action
 * @param {string} [options.persistencePrefix=__ph_opt_in_out] - custom prefix to be used in the cookie/localstorage name
 * @param {Number} [options.cookieExpiration] - number of days until the opt-in cookie expires
 * @param {string} [options.cookieDomain] - custom cookie domain
 * @param {boolean} [options.crossSiteCookie] - whether the opt-in cookie is set as cross-site-enabled
 * @param {boolean} [options.crossSubdomainCookie] - whether the opt-in cookie is set as cross-subdomain or not
 * @param {boolean} [options.secureCookie] - whether the opt-in cookie is set as secure or not
 */

function _optInOut(optValue, token, options) {
    if (!_.isString(token) || !token.length) {
        console.error('gdpr.' + (optValue ? 'optIn' : 'optOut') + ' called with an invalid token')
        return
    }

    options = options || {}

    _getStorage(options).set(
        _getStorageKey(token, options),
        optValue ? 1 : 0,
        _.isNumber(options.cookieExpiration) ? options.cookieExpiration : null,
        !!options.crossSubdomainCookie,
        !!options.secureCookie,
        !!options.crossSiteCookie,
        options.cookieDomain
    )

    if (options.capture && optValue) {
        // only capture event if opting in (optValue=true)
        options.capture(options.captureEventName || '$opt_in', options.captureProperties, {
            send_immediately: true,
        })
    }
}
/**
 * Wrap a method with a check for whether the user is opted out of data capturing and cookies/localstorage for the given token
 * If the user has opted out, return early instead of executing the method.
 * If a callback argument was provided, execute it passing the 0 error code.
 * @param {function} method - wrapped method to be executed if the user has not opted out
 * @param {function} getConfigValue - getter function for the PostHog API token and other options to be used with opt-out check
 * @returns {*} the result of executing method OR undefined if the user has opted out
 */

function _addOptOutCheck(method, getConfigValue, silenceErrors) {
    return function () {
        var optedOut = false

        try {
            var token = getConfigValue.call(this, 'token')
            var respectDnt = getConfigValue.call(this, 'respect_dnt')
            var persistenceType = getConfigValue.call(this, 'opt_out_capturing_persistence_type')
            var persistencePrefix = getConfigValue.call(this, 'opt_out_capturing_cookie_prefix')
            var win = getConfigValue.call(this, 'window') // used to override window during browser tests

            if (token) {
                // if there was an issue getting the token, continue method execution as normal
                optedOut = hasOptedOut(token, {
                    respectDnt: respectDnt,
                    persistenceType: persistenceType,
                    persistencePrefix: persistencePrefix,
                    window: win,
                })
            }
        } catch (err) {
            if (!silenceErrors) {
                console.error('Unexpected error when checking capturing opt-out status: ' + err)
            }
        }

        if (!optedOut) {
            return method.apply(this, arguments)
        }

        var callback = arguments[arguments.length - 1]

        if (typeof callback === 'function') {
            callback(0)
        }

        return
    }
}

/* eslint camelcase: "off" */
/** @const */

var SET_ACTION = '$set'
/** @const */

var SET_ONCE_ACTION = '$set_once' // Internal methods for posthog.people API.
// These methods shouldn't involve network I/O.

var apiActions = {
    set_action: function set_action(prop, to) {
        var data = {}
        var $set = {}

        if (_.isObject(prop)) {
            _.each(
                prop,
                function (v, k) {
                    if (!this._is_reserved_property(k)) {
                        $set[k] = v
                    }
                },
                this
            )
        } else {
            $set[prop] = to
        }

        data[SET_ACTION] = $set
        return data
    },
    set_once_action: function set_once_action(prop, to) {
        var data = {}
        var $set_once = {}

        if (_.isObject(prop)) {
            _.each(
                prop,
                function (v, k) {
                    if (!this._is_reserved_property(k)) {
                        $set_once[k] = v
                    }
                },
                this
            )
        } else {
            $set_once[prop] = to
        }

        data[SET_ONCE_ACTION] = $set_once
        return data
    },
}

/* eslint camelcase: "off" */
/**
 * PostHog People Object
 * @constructor
 */

var PostHogPeople = function PostHogPeople() {}

_.extend(PostHogPeople.prototype, apiActions)

PostHogPeople.prototype._init = function (posthog_instance) {
    this._posthog = posthog_instance
}
/*
 * Set properties on a user record.
 *
 * ### Usage:
 *
 *     posthog.people.set('gender', 'm');
 *
 *     // or set multiple properties at once
 *     posthog.people.set({
 *         'Company': 'Acme',
 *         'Plan': 'Premium',
 *         'Upgrade date': new Date()
 *     });
 *     // properties can be strings, integers, dates, or lists
 *
 * @param {Object|String} prop If a string, this is the name of the property. If an object, this is an associative array of names and values.
 * @param {*} [to] A value to set on the given property name
 * @param {Function} [callback] If provided, the callback will be called after captureing the event.
 */

PostHogPeople.prototype.set = addOptOutCheckPostHogPeople(function (prop, to, callback) {
    var data = this.set_action(prop, to)

    if (_.isObject(prop)) {
        callback = to
    } // make sure that the referrer info has been updated and saved

    if (this._get_config('save_referrer')) {
        this._posthog['persistence'].update_referrer_info(document.referrer)
    } // update $set object with default people properties

    data[SET_ACTION] = _.extend(
        {},
        _.info.people_properties(),
        this._posthog['persistence'].get_referrer_info(),
        data[SET_ACTION]
    )
    return this._send_request(data, callback)
})
/*
 * Set properties on a user record, only if they do not yet exist.
 * This will not overwrite previous people property values, unlike
 * people.set().
 *
 * ### Usage:
 *
 *     posthog.people.set_once('First Login Date', new Date());
 *
 *     // or set multiple properties at once
 *     posthog.people.set_once({
 *         'First Login Date': new Date(),
 *         'Starting Plan': 'Premium'
 *     });
 *
 *     // properties can be strings, integers or dates
 *
 * @param {Object|String} prop If a string, this is the name of the property. If an object, this is an associative array of names and values.
 * @param {*} [to] A value to set on the given property name
 * @param {Function} [callback] If provided, the callback will be called after captureing the event.
 */

PostHogPeople.prototype.set_once = addOptOutCheckPostHogPeople(function (prop, to, callback) {
    var data = this.set_once_action(prop, to)

    if (_.isObject(prop)) {
        callback = to
    }

    return this._send_request(data, callback)
})

PostHogPeople.prototype.toString = function () {
    return this._posthog.toString() + '.people'
}

PostHogPeople.prototype._send_request = function (data, callback) {
    data['$token'] = this._get_config('token')
    data['$distinct_id'] = this._posthog.get_distinct_id()

    var device_id = this._posthog.get_property('$device_id')

    var user_id = this._posthog.get_property('$user_id')

    var had_persisted_distinct_id = this._posthog.get_property('$had_persisted_distinct_id')

    if (device_id) {
        data['$device_id'] = device_id
    }

    if (user_id) {
        data['$user_id'] = user_id
    }

    if (had_persisted_distinct_id) {
        data['$had_persisted_distinct_id'] = had_persisted_distinct_id
    }

    var date_encoded_data = _.encodeDates(data)

    var truncated_data = _.copyAndTruncateStrings(date_encoded_data, 255)

    var json_data = JSON.stringify(date_encoded_data)

    var encoded_data = _.base64Encode(json_data)

    this._posthog._send_request(
        this._get_config('api_host') + '/engage/',
        {
            data: encoded_data,
        },
        this._posthog._prepare_callback(callback, truncated_data)
    )

    return truncated_data
}

PostHogPeople.prototype._get_config = function (conf_var) {
    return this._posthog.get_config(conf_var)
}

PostHogPeople.prototype._is_reserved_property = function (prop) {
    return (
        prop === '$distinct_id' ||
        prop === '$token' ||
        prop === '$device_id' ||
        prop === '$user_id' ||
        prop === '$had_persisted_distinct_id'
    )
} // PostHogPeople Exports

PostHogPeople.prototype['set'] = PostHogPeople.prototype.set
PostHogPeople.prototype['set_once'] = PostHogPeople.prototype.set_once
PostHogPeople.prototype['toString'] = PostHogPeople.prototype.toString

var PostHogFeatureFlags = /*#__PURE__*/ (function () {
    function PostHogFeatureFlags(instance) {
        _classCallCheck(this, PostHogFeatureFlags)

        this.instance = instance
        this._override_warning = false
    }

    _createClass(PostHogFeatureFlags, [
        {
            key: 'getFlags',
            value: function getFlags() {
                if (this.instance.get_property('$override_feature_flags')) {
                    if (!this._override_warning)
                        console.warn(
                            '[PostHog] Overriding feature flags! Feature flags from server were: ' +
                                JSON.stringify(this.instance.get_property('$active_feature_flags'))
                        )
                    this._override_warning = true
                    return this.instance.get_property('$override_feature_flags')
                }

                return this.instance.get_property('$active_feature_flags')
            },
        },
        {
            key: 'reloadFeatureFlags',
            value: function reloadFeatureFlags() {
                var _this = this

                var parseDecideResponse = function parseDecideResponse(response) {
                    if (response['featureFlags']) {
                        _this.instance.persistence &&
                            _this.instance.persistence.register({
                                $active_feature_flags: response['featureFlags'],
                            })
                    } else {
                        _this.instance.persistence && _this.instance.persistence.unregister('$active_feature_flags')
                    }
                }

                var token = this.instance.get_config('token')
                var json_data = JSON.stringify({
                    token: token,
                    distinct_id: this.instance.get_distinct_id(),
                })

                var encoded_data = _.base64Encode(json_data)

                this.instance._send_request(
                    this.instance.get_config('api_host') + '/decide/',
                    {
                        data: encoded_data,
                    },
                    {
                        method: 'POST',
                    },
                    this.instance._prepare_callback(parseDecideResponse)
                )
            },
            /*
             * See if feature flag is enabled for user.
             *
             * ### Usage:
             *
             *     if(posthog.isFeatureEnabled('beta-feature')) { // do something }
             *
             * @param {Object|String} prop Key of the feature flag.
             * @param {Object|String} options (optional) If {send_event: false}, we won't send an $feature_flag_call event to PostHog.
             */
        },
        {
            key: 'isFeatureEnabled',
            value: function isFeatureEnabled(key) {
                var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {}

                if (!this.getFlags()) {
                    console.warn('isFeatureEnabled for key "' + key + '" failed. Feature flags didn\'t load in time.')
                    return false
                }

                var flagEnabled = this.getFlags().indexOf(key) > -1

                if (options.send_event || !('send_event' in options)) {
                    this.instance.capture('$feature_flag_called', {
                        $feature_flag: key,
                        $feature_flag_response: flagEnabled,
                    })
                }

                return flagEnabled
            },
            /*
             * Override feature flags for debugging.
             *
             * ### Usage:
             *
             *     posthog.feature_flags.override(['beta-feature']) or posthog.feature_flags.override(false)
             *
             * @param {Object|String} prop Flags to override with.
             */
        },
        {
            key: 'override',
            value: function override(flags) {
                if (flags === false) return this.instance.persistence.unregister('$override_feature_flags')
                this.instance.persistence.register('$override_feature_flags', flags)
            },
        },
    ])

    return PostHogFeatureFlags
})()

/* eslint camelcase: "off" */
/*
 * Constants
 */

/** @const */

var SET_QUEUE_KEY = '__mps'
/** @const */

var SET_ONCE_QUEUE_KEY = '__mpso'
/** @const */

var UNSET_QUEUE_KEY = '__mpus'
/** @const */

var ADD_QUEUE_KEY = '__mpa'
/** @const */

var APPEND_QUEUE_KEY = '__mpap'
/** @const */

var REMOVE_QUEUE_KEY = '__mpr'
/** @const */

var UNION_QUEUE_KEY = '__mpu' // This key is deprecated, but we want to check for it to see whether aliasing is allowed.

/** @const */

var PEOPLE_DISTINCT_ID_KEY = '$people_distinct_id'
/** @const */

var ALIAS_ID_KEY = '__alias'
/** @const */

var CAMPAIGN_IDS_KEY = '__cmpns'
/** @const */

var EVENT_TIMERS_KEY = '__timers'
/** @const */

var SESSION_RECORDING_ENABLED = '$session_recording_enabled'
/** @const */

var SESSION_ID = '$sesid'
/** @const */

var RESERVED_PROPERTIES = [
    SET_QUEUE_KEY,
    SET_ONCE_QUEUE_KEY,
    UNSET_QUEUE_KEY,
    ADD_QUEUE_KEY,
    APPEND_QUEUE_KEY,
    REMOVE_QUEUE_KEY,
    UNION_QUEUE_KEY,
    PEOPLE_DISTINCT_ID_KEY,
    ALIAS_ID_KEY,
    CAMPAIGN_IDS_KEY,
    EVENT_TIMERS_KEY,
    SESSION_RECORDING_ENABLED,
    SESSION_ID,
]
/**
 * PostHog Persistence Object
 * @constructor
 */

var PostHogPersistence = function PostHogPersistence(config) {
    this['props'] = {}
    this.campaign_params_saved = false
    this['featureFlagEventHandlers'] = []

    if (config['persistence_name']) {
        this.name = 'ph_' + config['persistence_name']
    } else {
        this.name = 'ph_' + config['token'] + '_posthog'
    }

    var storage_type = config['persistence']

    if (storage_type !== 'cookie' && storage_type !== 'localStorage' && storage_type !== 'memory') {
        console$1.critical('Unknown persistence type ' + storage_type + '; falling back to cookie')
        storage_type = config['persistence'] = 'cookie'
    }

    if (storage_type === 'localStorage' && localStore.is_supported()) {
        this.storage = localStore
    } else if (storage_type === 'memory') {
        this.storage = memoryStore
    } else {
        this.storage = cookieStore
    }

    this.load()
    this.update_config(config)
    this.upgrade(config)
    this.save()
}

PostHogPersistence.prototype.addFeatureFlagsHandler = function (handler) {
    this.featureFlagEventHandlers.push(handler)
    return true
}

PostHogPersistence.prototype.receivedFeatureFlags = function (flags) {
    this.featureFlagEventHandlers.forEach(function (handler) {
        return handler(flags)
    })
}

PostHogPersistence.prototype.properties = function () {
    var p = {} // Filter out reserved properties

    _.each(this['props'], function (v, k) {
        if (!_.include(RESERVED_PROPERTIES, k)) {
            p[k] = v
        }
    })

    return p
}

PostHogPersistence.prototype.load = function () {
    if (this.disabled) {
        return
    }

    var entry = this.storage.parse(this.name)

    if (entry) {
        this['props'] = _.extend({}, entry)
    }
}

PostHogPersistence.prototype.upgrade = function (config) {
    var upgrade_from_old_lib = config['upgrade'],
        old_cookie_name,
        old_cookie

    if (upgrade_from_old_lib) {
        old_cookie_name = 'ph_super_properties' // Case where they had a custom cookie name before.

        if (typeof upgrade_from_old_lib === 'string') {
            old_cookie_name = upgrade_from_old_lib
        }

        old_cookie = this.storage.parse(old_cookie_name) // remove the cookie

        this.storage.remove(old_cookie_name)
        this.storage.remove(old_cookie_name, true)

        if (old_cookie) {
            this['props'] = _.extend(this['props'], old_cookie['all'], old_cookie['events'])
        }
    }

    if (!config['cookie_name'] && config['name'] !== 'posthog') {
        // special case to handle people with cookies of the form
        // ph_TOKEN_INSTANCENAME from the first release of this library
        old_cookie_name = 'ph_' + config['token'] + '_' + config['name']
        old_cookie = this.storage.parse(old_cookie_name)

        if (old_cookie) {
            this.storage.remove(old_cookie_name)
            this.storage.remove(old_cookie_name, true) // Save the prop values that were in the cookie from before -
            // this should only happen once as we delete the old one.

            this.register_once(old_cookie)
        }
    }

    if (this.storage !== cookieStore) {
        old_cookie = cookieStore.parse(this.name)
        cookieStore.remove(this.name)
        cookieStore.remove(this.name, true)

        if (old_cookie) {
            this.register_once(old_cookie)
        }
    }
}

PostHogPersistence.prototype.save = function () {
    if (this.disabled) {
        return
    }

    this._expire_notification_campaigns()

    this.storage.set(this.name, JSON.stringify(this['props']), this.expire_days, this.cross_subdomain, this.secure)
}

PostHogPersistence.prototype.remove = function () {
    // remove both domain and subdomain cookies
    this.storage.remove(this.name, false)
    this.storage.remove(this.name, true)
} // removes the storage entry and deletes all loaded data
// forced name for tests

PostHogPersistence.prototype.clear = function () {
    this.remove()
    this['props'] = {}
}
/**
 * @param {Object} props
 * @param {*=} default_value
 * @param {number=} days
 */

PostHogPersistence.prototype.register_once = function (props, default_value, days) {
    if (_.isObject(props)) {
        if (typeof default_value === 'undefined') {
            default_value = 'None'
        }

        this.expire_days = typeof days === 'undefined' ? this.default_expiry : days

        if (props && props.$active_feature_flags) {
            this.receivedFeatureFlags(props.$active_feature_flags)
        }

        _.each(
            props,
            function (val, prop) {
                if (!this['props'].hasOwnProperty(prop) || this['props'][prop] === default_value) {
                    this['props'][prop] = val
                }
            },
            this
        )

        this.save()
        return true
    }

    return false
}
/**
 * @param {Object} props
 * @param {number=} days
 */

PostHogPersistence.prototype.register = function (props, days) {
    if (_.isObject(props)) {
        this.expire_days = typeof days === 'undefined' ? this.default_expiry : days

        if (props && props.$active_feature_flags) {
            this.receivedFeatureFlags(props.$active_feature_flags)
        }

        _.extend(this['props'], props)

        this.save()
        return true
    }

    return false
}

PostHogPersistence.prototype.unregister = function (prop) {
    if (prop in this['props']) {
        delete this['props'][prop]
        this.save()

        if (prop === '$active_feature_flags') {
            this.receivedFeatureFlags([])
        }
    }
}

PostHogPersistence.prototype._expire_notification_campaigns = _.safewrap(function () {
    var campaigns_shown = this['props'][CAMPAIGN_IDS_KEY],
        EXPIRY_TIME = Config.DEBUG ? 60 * 1000 : 60 * 60 * 1000 // 1 minute (Config.DEBUG) / 1 hour (PDXN)

    if (!campaigns_shown) {
        return
    }

    for (var campaign_id in campaigns_shown) {
        if (1 * new Date() - campaigns_shown[campaign_id] > EXPIRY_TIME) {
            delete campaigns_shown[campaign_id]
        }
    }

    if (_.isEmptyObject(campaigns_shown)) {
        delete this['props'][CAMPAIGN_IDS_KEY]
    }
})

PostHogPersistence.prototype.update_campaign_params = function () {
    if (!this.campaign_params_saved) {
        this.register_once(_.info.campaignParams())
        this.campaign_params_saved = true
    }
}

PostHogPersistence.prototype.update_search_keyword = function (referrer) {
    this.register(_.info.searchInfo(referrer))
} // EXPORTED METHOD, we test this directly.

PostHogPersistence.prototype.update_referrer_info = function (referrer) {
    // If referrer doesn't exist, we want to note the fact that it was type-in traffic.
    // Register once, so first touch
    this.register_once(
        {
            $initial_referrer: referrer || '$direct',
            $initial_referring_domain: _.info.referringDomain(referrer) || '$direct',
        },
        ''
    ) // Register the current referrer but override if it's different, hence register

    this.register({
        $referrer: referrer || this['props']['$referrer'] || '$direct',
        $referring_domain: _.info.referringDomain(referrer) || this['props']['$referring_domain'] || '$direct',
    })
}

PostHogPersistence.prototype.get_referrer_info = function () {
    return _.strip_empty_properties({
        $initial_referrer: this['props']['$initial_referrer'],
        $initial_referring_domain: this['props']['$initial_referring_domain'],
    })
} // safely fills the passed in object with stored properties,
// does not override any properties defined in both
// returns the passed in object

PostHogPersistence.prototype.safe_merge = function (props) {
    _.each(this['props'], function (val, prop) {
        if (!(prop in props)) {
            props[prop] = val
        }
    })

    return props
}

PostHogPersistence.prototype.update_config = function (config) {
    this.default_expiry = this.expire_days = config['cookie_expiration']
    this.set_disabled(config['disable_persistence'])
    this.set_cross_subdomain(config['cross_subdomain_cookie'])
    this.set_secure(config['secure_cookie'])
}

PostHogPersistence.prototype.set_disabled = function (disabled) {
    this.disabled = disabled

    if (this.disabled) {
        this.remove()
    } else {
        this.save()
    }
}

PostHogPersistence.prototype.set_cross_subdomain = function (cross_subdomain) {
    if (cross_subdomain !== this.cross_subdomain) {
        this.cross_subdomain = cross_subdomain
        this.remove()
        this.save()
    }
}

PostHogPersistence.prototype.get_cross_subdomain = function () {
    return this.cross_subdomain
}

PostHogPersistence.prototype.set_secure = function (secure) {
    if (secure !== this.secure) {
        this.secure = secure ? true : false
        this.remove()
        this.save()
    }
}

PostHogPersistence.prototype.set_event_timer = function (event_name, timestamp) {
    var timers = this['props'][EVENT_TIMERS_KEY] || {}
    timers[event_name] = timestamp
    this['props'][EVENT_TIMERS_KEY] = timers
    this.save()
}

PostHogPersistence.prototype.remove_event_timer = function (event_name) {
    var timers = this['props'][EVENT_TIMERS_KEY] || {}
    var timestamp = timers[event_name]

    if (!_.isUndefined(timestamp)) {
        delete this['props'][EVENT_TIMERS_KEY][event_name]
        this.save()
    }

    return timestamp
}

var SESSION_CHANGE_THRESHOLD = 30 * 60 * 1000 // 30 mins

var sessionIdGenerator = function (persistence, timestamp) {
    var _ref = persistence['props'][SESSION_ID] || [0, null],
        _ref2 = _slicedToArray(_ref, 2),
        lastTimestamp = _ref2[0],
        sessionId = _ref2[1]

    if (Math.abs(timestamp - lastTimestamp) > SESSION_CHANGE_THRESHOLD) {
        sessionId = _.UUID()
    }

    persistence.register(_defineProperty({}, SESSION_ID, [timestamp, sessionId]))
    return sessionId
}

var BASE_ENDPOINT = '/e/'
var SessionRecording = /*#__PURE__*/ (function () {
    function SessionRecording(instance) {
        _classCallCheck(this, SessionRecording)

        this.instance = instance
        this.captureStarted = false
        this.snapshots = []
        this.emit = false
        this.endpoint = BASE_ENDPOINT
        this.rrwebStopper = null
    }

    _createClass(SessionRecording, [
        {
            key: 'startRecordingIfEnabled',
            value: function startRecordingIfEnabled() {
                if (this.instance.get_property(SESSION_RECORDING_ENABLED)) {
                    this._startCapture()
                }
            },
        },
        {
            key: 'afterDecideResponse',
            value: function afterDecideResponse(response) {
                if (this.instance.persistence) {
                    this.instance.persistence.register(
                        _defineProperty({}, SESSION_RECORDING_ENABLED, !!response['sessionRecording'])
                    )
                }

                if (response['sessionRecording']) {
                    if (response['sessionRecording'].endpoint) {
                        this.endpoint = response['sessionRecording'].endpoint
                    }

                    this.submitRecordings()
                }
            },
        },
        {
            key: 'submitRecordings',
            value: function submitRecordings() {
                var _this = this

                this.emit = true

                this._startCapture()

                this.snapshots.forEach(function (properties) {
                    return _this._captureSnapshot(properties)
                })
            },
        },
        {
            key: 'stopRecording',
            value: function stopRecording() {
                if (!this.captureStarted) {
                    return
                }

                if (this.rrwebStopper) {
                    this.rrwebStopper()
                    this.rrwebStopper = null
                }

                this.captureStarted = false
            },
        },
        {
            key: '_startCapture',
            value: function _startCapture() {
                if (!this.captureStarted && !this.instance.get_config('disable_session_recording')) {
                    this.captureStarted = true
                    loadScript(
                        this.instance.get_config('api_host') + '/static/recorder.js?v=' + Config.LIB_VERSION,
                        _.bind(this._onScriptLoaded, this)
                    )
                }
            },
        },
        {
            key: '_onScriptLoaded',
            value: function _onScriptLoaded() {
                var _this2 = this

                if (!this.captureStarted) {
                    return
                } // rrweb config info: https://github.com/rrweb-io/rrweb/blob/7d5d0033258d6c29599fb08412202d9a2c7b9413/src/record/index.ts#L28

                this.rrwebStopper = window.rrweb.record({
                    emit: function emit(data) {
                        var properties = {
                            $snapshot_data: data,
                            $session_id: sessionIdGenerator(_this2.instance.persistence, data.timestamp),
                        }

                        _this2.instance._captureMetrics.incr('rrweb-record')

                        _this2.instance._captureMetrics.incr('rrweb-record-'.concat(data.type))

                        if (_this2.emit) {
                            _this2._captureSnapshot(properties)
                        } else {
                            _this2.snapshots.push(properties)
                        }
                    },
                    blockClass: 'ph-no-capture',
                    // Does not capture the element at all
                    ignoreClass: 'ph-ignore-input', // Ignores content of input but still records the input element
                }) // :TRICKY: rrweb does not capture navigation within SPA-s, so hook into our $pageview events to get access to all events.
                //   Dropping the initial event is fine (it's always captured by rrweb).

                this.instance._addCaptureHook(function (eventName) {
                    if (eventName === '$pageview') {
                        window.rrweb.record.addCustomEvent('$pageview', {
                            href: window.location.href,
                        })
                    }
                })
            },
        },
        {
            key: '_captureSnapshot',
            value: function _captureSnapshot(properties) {
                // :TRICKY: Make sure we batch these requests, use a custom endpoint and don't truncate the strings.
                this.instance.capture('$snapshot', properties, {
                    transport: 'XHR',
                    method: 'POST',
                    endpoint: this.endpoint,
                    _forceCompression: true,
                    _noTruncate: true,
                    _batchKey: 'sessionRecording',
                    _metrics: {
                        rrweb_full_snapshot: properties.$snapshot_data.type === 2,
                    },
                })
            },
        },
    ])

    return SessionRecording
})()

var Toolbar = /*#__PURE__*/ (function () {
    function Toolbar(instance) {
        _classCallCheck(this, Toolbar)

        this.instance = instance
    }

    _createClass(Toolbar, [
        {
            key: 'afterDecideResponse',
            value: function afterDecideResponse(response) {
                var editorParams =
                    response['editorParams'] ||
                    (response['toolbarVersion']
                        ? {
                              toolbarVersion: response['toolbarVersion'],
                          }
                        : {})

                if (
                    response['isAuthenticated'] &&
                    editorParams['toolbarVersion'] &&
                    editorParams['toolbarVersion'].indexOf('toolbar') === 0
                ) {
                    this._loadEditor(
                        _objectSpread2(
                            _objectSpread2({}, editorParams),
                            {},
                            {
                                apiURL: this.instance.get_config('api_host'),
                            }
                        )
                    )

                    this.instance.set_config({
                        debug: true,
                    })
                }
            },
            /**
             * To load the visual editor, we need an access token and other state. That state comes from one of three places:
             * 1. In the URL hash params if the customer is using an old snippet
             * 2. From session storage under the key `editorParams` if the editor was initialized on a previous page
             */
        },
        {
            key: 'maybeLoadEditor',
            value: function maybeLoadEditor() {
                var location = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : window.location
                var localStorage =
                    arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : window.localStorage
                var history = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : window.history

                try {
                    var stateHash = _.getHashParam(location.hash, '__posthog') || _.getHashParam(location.hash, 'state')

                    var state = stateHash ? JSON.parse(decodeURIComponent(stateHash)) : null
                    var parseFromUrl = state && (state['action'] === 'mpeditor' || state['action'] === 'ph_authorize')
                    var editorParams

                    if (parseFromUrl) {
                        // happens if they are initializing the editor using an old snippet
                        editorParams = state

                        if (editorParams && Object.keys(editorParams).length > 0) {
                            localStorage.setItem('_postHogEditorParams', JSON.stringify(editorParams))

                            if (state['desiredHash']) {
                                // hash that was in the url before the redirect
                                location.hash = state['desiredHash']
                            } else if (history) {
                                history.replaceState('', document.title, location.pathname + location.search) // completely remove hash
                            } else {
                                location.hash = '' // clear hash (but leaves # unfortunately)
                            }
                        }
                    } else {
                        // get credentials from localStorage from a previous initialzation
                        editorParams = JSON.parse(localStorage.getItem('_postHogEditorParams') || '{}') // delete "add-action" or other intent from editorParams, otherwise we'll have the same intent
                        // every time we open the page (e.g. you just visiting your own site an hour later)

                        delete editorParams.userIntent
                    }

                    editorParams['apiURL'] = this.instance.get_config('api_host')

                    if (editorParams['token'] && this.instance.get_config('token') === editorParams['token']) {
                        this._loadEditor(editorParams)

                        return true
                    } else {
                        return false
                    }
                } catch (e) {
                    return false
                }
            },
        },
        {
            key: '_loadEditor',
            value: function _loadEditor(editorParams) {
                var _this = this

                if (!window['_postHogToolbarLoaded']) {
                    // only load the codeless event editor once, even if there are multiple instances of PostHogLib
                    window['_postHogToolbarLoaded'] = true
                    var host = editorParams['jsURL'] || editorParams['apiURL'] || this.instance.get_config('api_host')
                    var toolbarScript = 'toolbar.js'
                    var editorUrl =
                        host +
                        (host.endsWith('/') ? '' : '/') +
                        'static/' +
                        toolbarScript +
                        '?_ts=' +
                        new Date().getTime()
                    loadScript(editorUrl, function () {
                        window['ph_load_editor'](editorParams)
                    }) // Turbolinks doesn't fire an onload event but does replace the entire page, including the toolbar

                    _.register_event(window, 'turbolinks:load', function () {
                        window['_postHogToolbarLoaded'] = false

                        _this._loadEditor(editorParams)
                    })

                    return true
                }

                return false
            },
        },
    ])

    return Toolbar
})()

var RequestQueue = /*#__PURE__*/ (function () {
    function RequestQueue(captureMetrics, handlePollRequest) {
        var pollInterval = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 3000

        _classCallCheck(this, RequestQueue)

        this.captureMetrics = captureMetrics
        this.handlePollRequest = handlePollRequest
        this.isPolling = true // flag to continue to recursively poll or not

        this._event_queue = []
        this._empty_queue_count = 0 // to track empty polls

        this._poller = function () {} // to become interval for reference to clear later

        this._pollInterval = pollInterval
    }

    _createClass(RequestQueue, [
        {
            key: 'setPollInterval',
            value: function setPollInterval(interval) {
                this._pollInterval = interval // Reset interval if running already

                if (this.isPolling) {
                    this.poll()
                }
            },
        },
        {
            key: 'enqueue',
            value: function enqueue(url, data, options) {
                this.captureMetrics.incr('batch-enqueue')

                this._event_queue.push({
                    url: url,
                    data: data,
                    options: options,
                })

                if (!this.isPolling) {
                    this.isPolling = true
                    this.poll()
                }
            },
        },
        {
            key: 'poll',
            value: function poll() {
                var _this = this

                clearTimeout(this._poller)
                this._poller = setTimeout(function () {
                    if (_this._event_queue.length > 0) {
                        var requests = _this.formatQueue()

                        var _loop = function _loop(key) {
                            var _requests$key = requests[key],
                                url = _requests$key.url,
                                data = _requests$key.data,
                                options = _requests$key.options

                            _.each(data, function (_, dataKey) {
                                data[dataKey]['offset'] = Math.abs(data[dataKey]['timestamp'] - _this.getTime())
                                delete data[dataKey]['timestamp']
                            })

                            _this.handlePollRequest(url, data, options)

                            _this.captureMetrics.incr('batch-requests')

                            _this.captureMetrics.incr('batch-requests-'.concat(url.slice(url.length - 2)))

                            _this.captureMetrics.incr('batch-handle', data.length)

                            _this.captureMetrics.incr('batch-handle-'.concat(url.slice(url.length - 2)), data.length)
                        }

                        for (var key in requests) {
                            _loop(key)
                        }

                        _this._event_queue.length = 0 // flush the _event_queue
                    } else {
                        _this._empty_queue_count++
                    }
                    /**
                     * _empty_queue_count will increment each time the queue is polled
                     *  and it is empty. To avoid empty polling (user went idle, stepped away from comp)
                     *  we can turn it off with the isPolling flag.
                     *
                     * Polling will be re enabled when the next time PostHogLib.capture is called with
                     *  an event that should be added to the event queue.
                     */

                    if (_this._empty_queue_count > 4) {
                        _this.isPolling = false
                        _this._empty_queue_count = 0
                    }

                    if (_this.isPolling) {
                        _this.poll()
                    }
                }, this._pollInterval)
            },
        },
        {
            key: 'updateUnloadMetrics',
            value: function updateUnloadMetrics() {
                var requests = this.formatQueue()

                for (var key in requests) {
                    var _requests$key2 = requests[key],
                        url = _requests$key2.url,
                        data = _requests$key2.data
                    this.captureMetrics.incr('batch-unload-requests')
                    this.captureMetrics.incr('batch-unload-requests-'.concat(url.slice(url.length - 2)))
                    this.captureMetrics.incr('batch-unload', data.length)
                    this.captureMetrics.incr('batch-unload-'.concat(url.slice(url.length - 2)), data.length)
                }
            },
        },
        {
            key: 'unload',
            value: function unload() {
                clearTimeout(this._poller)
                var requests = this._event_queue.length > 0 ? this.formatQueue() : {}
                this._event_queue.length = 0

                for (var url in requests) {
                    var _requests$url = requests[url],
                        data = _requests$url.data,
                        options = _requests$url.options
                    this.handlePollRequest(
                        url,
                        data,
                        _objectSpread2(
                            _objectSpread2({}, options),
                            {},
                            {
                                transport: 'sendbeacon',
                            }
                        )
                    )
                }
            },
        },
        {
            key: 'formatQueue',
            value: function formatQueue() {
                var requests = {}

                _.each(this._event_queue, function (request) {
                    var url = request.url,
                        data = request.data,
                        options = request.options
                    var key = (options ? options._batchKey : null) || url

                    if (requests[key] === undefined) {
                        requests[key] = {
                            data: [],
                            url: url,
                            options: options,
                        }
                    } // :TRICKY: Metrics-only code

                    if (options && requests[key].options && requests[key].options._metrics) {
                        var _requests$key$options, _rrweb_full_snapshot

                        ;(_requests$key$options = requests[key].options._metrics)[
                            (_rrweb_full_snapshot = 'rrweb_full_snapshot')
                        ] || (_requests$key$options[_rrweb_full_snapshot] = options._metrics['rrweb_full_snapshot'])
                    }

                    requests[key].data.push(data)
                })

                return requests
            },
        },
        {
            key: 'getTime',
            value: function getTime() {
                return new Date().getTime()
            },
        },
    ])

    return RequestQueue
})()

var CaptureMetrics = /*#__PURE__*/ (function () {
    function CaptureMetrics(enabled, capture) {
        var getTime =
            arguments.length > 2 && arguments[2] !== undefined
                ? arguments[2]
                : function () {
                      return new Date().getTime()
                  }

        _classCallCheck(this, CaptureMetrics)

        this.enabled = enabled
        this.capture = capture
        this.getTime = getTime
        this.metrics = {}
        this.requests = {}
    }

    _createClass(CaptureMetrics, [
        {
            key: 'incr',
            value: function incr(key) {
                var by = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1

                if (this.enabled) {
                    key = 'phjs-'.concat(key)
                    this.metrics[key] = (this.metrics[key] || 0) + by
                }
            },
        },
        {
            key: 'decr',
            value: function decr(key) {
                if (this.enabled) {
                    key = 'phjs-'.concat(key)
                    this.metrics[key] = (this.metrics[key] || 0) - 1
                }
            },
        },
        {
            key: 'startRequest',
            value: function startRequest(payload) {
                if (this.enabled) {
                    var requestId = _.UUID()

                    this.requests[requestId] = [this.getTime(), payload]
                    return requestId
                }
            },
        },
        {
            key: 'finishRequest',
            value: function finishRequest(requestId) {
                if (this.enabled) {
                    var _this$requests$reques = _slicedToArray(this.requests[requestId], 2),
                        startTime = _this$requests$reques[0],
                        payload = _this$requests$reques[1]

                    payload['duration'] = this.getTime() - startTime
                    delete this.requests[requestId]
                    return payload
                }
            },
        },
        {
            key: 'markRequestFailed',
            value: function markRequestFailed(payload) {
                if (this.enabled) {
                    this.capture('$capture_failed_request', payload)
                }
            },
        },
        {
            key: 'captureInProgressRequests',
            value: function captureInProgressRequests() {
                var _this = this

                if (this.enabled) {
                    Object.keys(this.requests).forEach(function (requestId) {
                        var payload = _this.finishRequest(requestId)

                        _this.markRequestFailed(
                            _objectSpread2(
                                _objectSpread2({}, payload),
                                {},
                                {
                                    type: 'inflight_at_unload',
                                }
                            )
                        )
                    })
                }
            },
        },
    ])

    return CaptureMetrics
})()

// DEFLATE is a complex format; to read this code, you should probably check the RFC first:

var u8 = Uint8Array,
    u16 = Uint16Array,
    u32 = Uint32Array // fixed length extra bits

var fleb = new u8([
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    1,
    1,
    1,
    1,
    2,
    2,
    2,
    2,
    3,
    3,
    3,
    3,
    4,
    4,
    4,
    4,
    5,
    5,
    5,
    5,
    0,
    /* unused */
    0,
    0,
    /* impossible */
    0,
]) // fixed distance extra bits
// see fleb note

var fdeb = new u8([
    0,
    0,
    0,
    0,
    1,
    1,
    2,
    2,
    3,
    3,
    4,
    4,
    5,
    5,
    6,
    6,
    7,
    7,
    8,
    8,
    9,
    9,
    10,
    10,
    11,
    11,
    12,
    12,
    13,
    13,
    /* unused */
    0,
    0,
]) // code length index map

var clim = new u8([16, 17, 18, 0, 8, 7, 9, 6, 10, 5, 11, 4, 12, 3, 13, 2, 14, 1, 15]) // get base, reverse index map from extra bits

var freb = function freb(eb, start) {
    var b = new u16(31)

    for (var i = 0; i < 31; ++i) {
        b[i] = start += 1 << eb[i - 1]
    } // numbers here are at max 18 bits

    var r = new u32(b[30])

    for (var i = 1; i < 30; ++i) {
        for (var j = b[i]; j < b[i + 1]; ++j) {
            r[j] = ((j - b[i]) << 5) | i
        }
    }

    return [b, r]
}

var _a = freb(fleb, 2),
    fl = _a[0],
    revfl = _a[1] // we can ignore the fact that the other numbers are wrong; they never happen anyway

;(fl[28] = 258), (revfl[258] = 28)

var _b = freb(fdeb, 0),
    revfd = _b[1] // map of value to reverse (assuming 16 bits)

var rev = new u16(32768)

for (var i = 0; i < 32768; ++i) {
    // reverse table algorithm from SO
    var x = ((i & 0xaaaa) >>> 1) | ((i & 0x5555) << 1)
    x = ((x & 0xcccc) >>> 2) | ((x & 0x3333) << 2)
    x = ((x & 0xf0f0) >>> 4) | ((x & 0x0f0f) << 4)
    rev[i] = (((x & 0xff00) >>> 8) | ((x & 0x00ff) << 8)) >>> 1
} // create huffman tree from u8 "map": index -> code length for code index
// mb (max bits) must be at most 15
// TODO: optimize/split up?

var hMap = function hMap(cd, mb, r) {
    var s = cd.length // index

    var i = 0 // u16 "map": index -> # of codes with bit length = index

    var l = new u16(mb) // length of cd must be 288 (total # of codes)

    for (; i < s; ++i) {
        ++l[cd[i] - 1]
    } // u16 "map": index -> minimum code for bit length = index

    var le = new u16(mb)

    for (i = 0; i < mb; ++i) {
        le[i] = (le[i - 1] + l[i - 1]) << 1
    }

    var co

    if (r) {
        // u16 "map": index -> number of actual bits, symbol for code
        co = new u16(1 << mb) // bits to remove for reverser

        var rvb = 15 - mb

        for (i = 0; i < s; ++i) {
            // ignore 0 lengths
            if (cd[i]) {
                // num encoding both symbol and bits read
                var sv = (i << 4) | cd[i] // free bits

                var r_1 = mb - cd[i] // start value

                var v = le[cd[i] - 1]++ << r_1 // m is end value

                for (var m = v | ((1 << r_1) - 1); v <= m; ++v) {
                    // every 16 bit value starting with the code yields the same result
                    co[rev[v] >>> rvb] = sv
                }
            }
        }
    } else {
        co = new u16(s)

        for (i = 0; i < s; ++i) {
            co[i] = rev[le[cd[i] - 1]++] >>> (15 - cd[i])
        }
    }

    return co
} // fixed length tree

var flt = new u8(288)

for (var i = 0; i < 144; ++i) {
    flt[i] = 8
}

for (var i = 144; i < 256; ++i) {
    flt[i] = 9
}

for (var i = 256; i < 280; ++i) {
    flt[i] = 7
}

for (var i = 280; i < 288; ++i) {
    flt[i] = 8
} // fixed distance tree

var fdt = new u8(32)

for (var i = 0; i < 32; ++i) {
    fdt[i] = 5
} // fixed length map

var flm = hMap(flt, 9, 0),
    flrm = hMap(flt, 9, 1) // fixed distance map

var fdm = hMap(fdt, 5, 0),
    fdrm = hMap(fdt, 5, 1) // find max of array

var shft = function shft(p) {
    return (p >>> 3) + (p & 7 && 1)
} // typed array slice - allows garbage collector to free original reference,
// while being more compatible than .slice

var slc = function slc(v, s, e) {
    if (s == null || s < 0) s = 0
    if (e == null || e > v.length) e = v.length // can't use .constructor in case user-supplied

    var n = new (v instanceof u16 ? u16 : v instanceof u32 ? u32 : u8)(e - s)
    n.set(v.subarray(s, e))
    return n
} // expands raw DEFLATE data

var wbits = function wbits(d, p, v) {
    v <<= p & 7
    var o = p >>> 3
    d[o] |= v
    d[o + 1] |= v >>> 8
} // starting at p, write the minimum number of bits (>8) that can hold v to d

var wbits16 = function wbits16(d, p, v) {
    v <<= p & 7
    var o = p >>> 3
    d[o] |= v
    d[o + 1] |= v >>> 8
    d[o + 2] |= v >>> 16
} // creates code lengths from a frequency table

var hTree = function hTree(d, mb) {
    // Need extra info to make a tree
    var t = []

    for (var i = 0; i < d.length; ++i) {
        if (d[i])
            t.push({
                s: i,
                f: d[i],
            })
    }

    var s = t.length
    var t2 = t.slice()
    if (!s) return [new u8(0), 0]

    if (s == 1) {
        var v = new u8(t[0].s + 1)
        v[t[0].s] = 1
        return [v, 1]
    }

    t.sort(function (a, b) {
        return a.f - b.f
    }) // after i2 reaches last ind, will be stopped
    // freq must be greater than largest possible number of symbols

    t.push({
        s: -1,
        f: 25001,
    })
    var l = t[0],
        r = t[1],
        i0 = 0,
        i1 = 1,
        i2 = 2
    t[0] = {
        s: -1,
        f: l.f + r.f,
        l: l,
        r: r,
    } // efficient algorithm from UZIP.js
    // i0 is lookbehind, i2 is lookahead - after processing two low-freq
    // symbols that combined have high freq, will start processing i2 (high-freq,
    // non-composite) symbols instead
    // see https://reddit.com/r/photopea/comments/ikekht/uzipjs_questions/

    while (i1 != s - 1) {
        l = t[t[i0].f < t[i2].f ? i0++ : i2++]
        r = t[i0 != i1 && t[i0].f < t[i2].f ? i0++ : i2++]
        t[i1++] = {
            s: -1,
            f: l.f + r.f,
            l: l,
            r: r,
        }
    }

    var maxSym = t2[0].s

    for (var i = 1; i < s; ++i) {
        if (t2[i].s > maxSym) maxSym = t2[i].s
    } // code lengths

    var tr = new u16(maxSym + 1) // max bits in tree

    var mbt = ln(t[i1 - 1], tr, 0)

    if (mbt > mb) {
        // more algorithms from UZIP.js
        // TODO: find out how this code works (debt)
        //  ind    debt
        var i = 0,
            dt = 0 //    left            cost

        var lft = mbt - mb,
            cst = 1 << lft
        t2.sort(function (a, b) {
            return tr[b.s] - tr[a.s] || a.f - b.f
        })

        for (; i < s; ++i) {
            var i2_1 = t2[i].s

            if (tr[i2_1] > mb) {
                dt += cst - (1 << (mbt - tr[i2_1]))
                tr[i2_1] = mb
            } else break
        }

        dt >>>= lft

        while (dt > 0) {
            var i2_2 = t2[i].s
            if (tr[i2_2] < mb) dt -= 1 << (mb - tr[i2_2]++ - 1)
            else ++i
        }

        for (; i >= 0 && dt; --i) {
            var i2_3 = t2[i].s

            if (tr[i2_3] == mb) {
                --tr[i2_3]
                ++dt
            }
        }

        mbt = mb
    }

    return [new u8(tr), mbt]
} // get the max length and assign length codes

var ln = function ln(n, l, d) {
    return n.s == -1 ? Math.max(ln(n.l, l, d + 1), ln(n.r, l, d + 1)) : (l[n.s] = d)
} // length codes generation

var lc = function lc(c) {
    var s = c.length // Note that the semicolon was intentional

    while (s && !c[--s]) {}

    var cl = new u16(++s) //  ind      num         streak

    var cli = 0,
        cln = c[0],
        cls = 1

    var w = function w(v) {
        cl[cli++] = v
    }

    for (var i = 1; i <= s; ++i) {
        if (c[i] == cln && i != s) ++cls
        else {
            if (!cln && cls > 2) {
                for (; cls > 138; cls -= 138) {
                    w(32754)
                }

                if (cls > 2) {
                    w(cls > 10 ? ((cls - 11) << 5) | 28690 : ((cls - 3) << 5) | 12305)
                    cls = 0
                }
            } else if (cls > 3) {
                w(cln), --cls

                for (; cls > 6; cls -= 6) {
                    w(8304)
                }

                if (cls > 2) w(((cls - 3) << 5) | 8208), (cls = 0)
            }

            while (cls--) {
                w(cln)
            }

            cls = 1
            cln = c[i]
        }
    }

    return [cl.subarray(0, cli), s]
} // calculate the length of output from tree, code lengths

var clen = function clen(cf, cl) {
    var l = 0

    for (var i = 0; i < cl.length; ++i) {
        l += cf[i] * cl[i]
    }

    return l
} // writes a fixed block
// returns the new bit pos

var wfblk = function wfblk(out, pos, dat) {
    // no need to write 00 as type: TypedArray defaults to 0
    var s = dat.length
    var o = shft(pos + 2)
    out[o] = s & 255
    out[o + 1] = s >>> 8
    out[o + 2] = out[o] ^ 255
    out[o + 3] = out[o + 1] ^ 255

    for (var i = 0; i < s; ++i) {
        out[o + i + 4] = dat[i]
    }

    return (o + 4 + s) << 3
} // writes a block

var wblk = function wblk(dat, out, _final2, syms, lf, df, eb, li, bs, bl, p) {
    wbits(out, p++, _final2)
    ++lf[256]

    var _a = hTree(lf, 15),
        dlt = _a[0],
        mlb = _a[1]

    var _b = hTree(df, 15),
        ddt = _b[0],
        mdb = _b[1]

    var _c = lc(dlt),
        lclt = _c[0],
        nlc = _c[1]

    var _d = lc(ddt),
        lcdt = _d[0],
        ndc = _d[1]

    var lcfreq = new u16(19)

    for (var i = 0; i < lclt.length; ++i) {
        lcfreq[lclt[i] & 31]++
    }

    for (var i = 0; i < lcdt.length; ++i) {
        lcfreq[lcdt[i] & 31]++
    }

    var _e = hTree(lcfreq, 7),
        lct = _e[0],
        mlcb = _e[1]

    var nlcc = 19

    for (; nlcc > 4 && !lct[clim[nlcc - 1]]; --nlcc) {}

    var flen = (bl + 5) << 3
    var ftlen = clen(lf, flt) + clen(df, fdt) + eb
    var dtlen =
        clen(lf, dlt) +
        clen(df, ddt) +
        eb +
        14 +
        3 * nlcc +
        clen(lcfreq, lct) +
        (2 * lcfreq[16] + 3 * lcfreq[17] + 7 * lcfreq[18])
    if (flen <= ftlen && flen <= dtlen) return wfblk(out, p, dat.subarray(bs, bs + bl))
    var lm, ll, dm, dl
    wbits(out, p, 1 + (dtlen < ftlen)), (p += 2)

    if (dtlen < ftlen) {
        ;(lm = hMap(dlt, mlb, 0)), (ll = dlt), (dm = hMap(ddt, mdb, 0)), (dl = ddt)
        var llm = hMap(lct, mlcb, 0)
        wbits(out, p, nlc - 257)
        wbits(out, p + 5, ndc - 1)
        wbits(out, p + 10, nlcc - 4)
        p += 14

        for (var i = 0; i < nlcc; ++i) {
            wbits(out, p + 3 * i, lct[clim[i]])
        }

        p += 3 * nlcc
        var lcts = [lclt, lcdt]

        for (var it = 0; it < 2; ++it) {
            var clct = lcts[it]

            for (var i = 0; i < clct.length; ++i) {
                var len = clct[i] & 31
                wbits(out, p, llm[len]), (p += lct[len])
                if (len > 15) wbits(out, p, (clct[i] >>> 5) & 127), (p += clct[i] >>> 12)
            }
        }
    } else {
        ;(lm = flm), (ll = flt), (dm = fdm), (dl = fdt)
    }

    for (var i = 0; i < li; ++i) {
        if (syms[i] > 255) {
            var len = (syms[i] >>> 18) & 31
            wbits16(out, p, lm[len + 257]), (p += ll[len + 257])
            if (len > 7) wbits(out, p, (syms[i] >>> 23) & 31), (p += fleb[len])
            var dst = syms[i] & 31
            wbits16(out, p, dm[dst]), (p += dl[dst])
            if (dst > 3) wbits16(out, p, (syms[i] >>> 5) & 8191), (p += fdeb[dst])
        } else {
            wbits16(out, p, lm[syms[i]]), (p += ll[syms[i]])
        }
    }

    wbits16(out, p, lm[256])
    return p + ll[256]
} // deflate options (nice << 13) | chain

var deo = new u32([65540, 131080, 131088, 131104, 262176, 1048704, 1048832, 2114560, 2117632]) // empty

var et = new u8(0) // compresses data into a raw DEFLATE buffer

var dflt = function dflt(dat, lvl, plvl, pre, post, lst) {
    var s = dat.length
    var o = new u8(pre + s + 5 * (1 + Math.floor(s / 7000)) + post) // writing to this writes to the output buffer

    var w = o.subarray(pre, o.length - post)
    var pos = 0

    if (!lvl || s < 8) {
        for (var i = 0; i <= s; i += 65535) {
            // end
            var e = i + 65535

            if (e < s) {
                // write full block
                pos = wfblk(w, pos, dat.subarray(i, e))
            } else {
                // write final block
                w[i] = lst
                pos = wfblk(w, pos, dat.subarray(i, s))
            }
        }
    } else {
        var opt = deo[lvl - 1]
        var n = opt >>> 13,
            c = opt & 8191
        var msk_1 = (1 << plvl) - 1 //    prev 2-byte val map    curr 2-byte val map

        var prev = new u16(32768),
            head = new u16(msk_1 + 1)
        var bs1_1 = Math.ceil(plvl / 3),
            bs2_1 = 2 * bs1_1

        var hsh = function hsh(i) {
            return (dat[i] ^ (dat[i + 1] << bs1_1) ^ (dat[i + 2] << bs2_1)) & msk_1
        } // 24576 is an arbitrary number of maximum symbols per block
        // 424 buffer for last block

        var syms = new u32(25000) // length/literal freq   distance freq

        var lf = new u16(288),
            df = new u16(32) //  l/lcnt  exbits  index  l/lind  waitdx  bitpos

        var lc_1 = 0,
            eb = 0,
            i = 0,
            li = 0,
            wi = 0,
            bs = 0

        for (; i < s; ++i) {
            // hash value
            var hv = hsh(i) // index mod 32768

            var imod = i & 32767 // previous index with this value

            var pimod = head[hv]
            prev[imod] = pimod
            head[hv] = imod // We always should modify head and prev, but only add symbols if
            // this data is not yet processed ("wait" for wait index)

            if (wi <= i) {
                // bytes remaining
                var rem = s - i

                if ((lc_1 > 7000 || li > 24576) && rem > 423) {
                    pos = wblk(dat, w, 0, syms, lf, df, eb, li, bs, i - bs, pos)
                    ;(li = lc_1 = eb = 0), (bs = i)

                    for (var j = 0; j < 286; ++j) {
                        lf[j] = 0
                    }

                    for (var j = 0; j < 30; ++j) {
                        df[j] = 0
                    }
                } //  len    dist   chain

                var l = 2,
                    d = 0,
                    ch_1 = c,
                    dif = (imod - pimod) & 32767

                if (rem > 2 && hv == hsh(i - dif)) {
                    var maxn = Math.min(n, rem) - 1
                    var maxd = Math.min(32767, i) // max possible length
                    // not capped at dif because decompressors implement "rolling" index population

                    var ml = Math.min(258, rem)

                    while (dif <= maxd && --ch_1 && imod != pimod) {
                        if (dat[i + l] == dat[i + l - dif]) {
                            var nl = 0

                            for (; nl < ml && dat[i + nl] == dat[i + nl - dif]; ++nl) {}

                            if (nl > l) {
                                ;(l = nl), (d = dif) // break out early when we reach "nice" (we are satisfied enough)

                                if (nl > maxn) break // now, find the rarest 2-byte sequence within this
                                // length of literals and search for that instead.
                                // Much faster than just using the start

                                var mmd = Math.min(dif, nl - 2)
                                var md = 0

                                for (var j = 0; j < mmd; ++j) {
                                    var ti = (i - dif + j + 32768) & 32767
                                    var pti = prev[ti]
                                    var cd = (ti - pti + 32768) & 32767
                                    if (cd > md) (md = cd), (pimod = ti)
                                }
                            }
                        } // check the previous match

                        ;(imod = pimod), (pimod = prev[imod])
                        dif += (imod - pimod + 32768) & 32767
                    }
                } // d will be nonzero only when a match was found

                if (d) {
                    // store both dist and len data in one Uint32
                    // Make sure this is recognized as a len/dist with 28th bit (2^28)
                    syms[li++] = 268435456 | (revfl[l] << 18) | revfd[d]
                    var lin = revfl[l] & 31,
                        din = revfd[d] & 31
                    eb += fleb[lin] + fdeb[din]
                    ++lf[257 + lin]
                    ++df[din]
                    wi = i + l
                    ++lc_1
                } else {
                    syms[li++] = dat[i]
                    ++lf[dat[i]]
                }
            }
        }

        pos = wblk(dat, w, lst, syms, lf, df, eb, li, bs, i - bs, pos) // this is the easiest way to avoid needing to maintain state

        if (!lst) pos = wfblk(w, pos, et)
    }

    return slc(o, 0, pre + shft(pos) + post)
} // CRC32 table

var crct = new u32(256)

for (var i = 0; i < 256; ++i) {
    var c = i,
        k = 9

    while (--k) {
        c = (c & 1 && 0xedb88320) ^ (c >>> 1)
    }

    crct[i] = c
} // CRC32

var crc = function crc() {
    var c = 0xffffffff
    return {
        p: function p(d) {
            // closures have awful performance
            var cr = c

            for (var i = 0; i < d.length; ++i) {
                cr = crct[(cr & 255) ^ d[i]] ^ (cr >>> 8)
            }

            c = cr
        },
        d: function d() {
            return c ^ 0xffffffff
        },
    }
} // Alder32

var dopt = function dopt(dat, opt, pre, post, st) {
    return dflt(
        dat,
        opt.level == null ? 6 : opt.level,
        opt.mem == null ? Math.ceil(Math.max(8, Math.min(13, Math.log(dat.length))) * 1.5) : 12 + opt.mem,
        pre,
        post,
        !st
    )
} // Walmart object spread

var wbytes = function wbytes(d, b, v) {
    for (; v; ++b) {
        ;(d[b] = v), (v >>>= 8)
    }
} // gzip header

var gzh = function gzh(c, o) {
    var fn = o.filename
    ;(c[0] = 31), (c[1] = 139), (c[2] = 8), (c[8] = o.level < 2 ? 4 : o.level == 9 ? 2 : 0), (c[9] = 3) // assume Unix

    if (o.mtime != 0) wbytes(c, 4, Math.floor(new Date(o.mtime || Date.now()) / 1000))

    if (fn) {
        c[3] = 8

        for (var i = 0; i <= fn.length; ++i) {
            c[i + 10] = fn.charCodeAt(i)
        }
    }
} // gzip footer: -8 to -4 = CRC, -4 to -0 is length

var gzhl = function gzhl(o) {
    return 10 + ((o.filename && o.filename.length + 1) || 0)
} // zlib header
/**
 * Compresses data with GZIP
 * @param data The data to compress
 * @param opts The compression options
 * @returns The gzipped version of the data
 */

function gzipSync(data, opts) {
    if (opts === void 0) {
        opts = {}
    }

    var c = crc(),
        l = data.length
    c.p(data)
    var d = dopt(data, opts, gzhl(opts), 8),
        s = d.length
    return gzh(d, opts), wbytes(d, s - 8, c.d()), wbytes(d, s - 4, l), d
}
/**
 * Converts a string into a Uint8Array for use with compression/decompression methods
 * @param str The string to encode
 * @param latin1 Whether or not to interpret the data as Latin-1. This should
 *               not need to be true unless decoding a binary string.
 * @returns The string encoded in UTF-8/Latin-1 binary
 */

function strToU8(str, latin1) {
    var l = str.length
    if (!latin1 && typeof TextEncoder != 'undefined') return new TextEncoder().encode(str)
    var ar = new u8(str.length + (str.length >>> 1))
    var ai = 0

    var w = function w(v) {
        ar[ai++] = v
    }

    for (var i = 0; i < l; ++i) {
        if (ai + 5 > ar.length) {
            var n = new u8(ai + 8 + ((l - i) << 1))
            n.set(ar)
            ar = n
        }

        var c = str.charCodeAt(i)
        if (c < 128 || latin1) w(c)
        else if (c < 2048) w(192 | (c >>> 6)), w(128 | (c & 63))
        else if (c > 55295 && c < 57344)
            (c = (65536 + (c & (1023 << 10))) | (str.charCodeAt(++i) & 1023)),
                w(240 | (c >>> 18)),
                w(128 | ((c >>> 12) & 63)),
                w(128 | ((c >>> 6) & 63)),
                w(128 | (c & 63))
        else w(224 | (c >>> 12)), w(128 | ((c >>> 6) & 63)), w(128 | (c & 63))
    }

    return slc(ar, 0, ai)
}

function decideCompression(compressionSupport) {
    if (compressionSupport['gzip-js']) {
        return 'gzip-js'
    } else if (compressionSupport['lz64']) {
        return 'lz64'
    } else {
        return 'base64'
    }
}
function compressData(compression, jsonData, options) {
    if (compression === 'lz64') {
        return [
            {
                data: LZString.compressToBase64(jsonData),
                compression: 'lz64',
            },
            options,
        ]
    } else if (compression === 'gzip-js') {
        // :TRICKY: This returns an UInt8Array. We don't encode this to a string - returning a blob will do this for us.
        return [
            gzipSync(strToU8(jsonData), {
                mtime: 0,
            }),
            _objectSpread2(
                _objectSpread2({}, options),
                {},
                {
                    blob: true,
                    urlQueryArgs: {
                        compression: 'gzip-js',
                    },
                }
            ),
        ]
    } else {
        return [
            {
                data: _.base64Encode(jsonData),
            },
            options,
        ]
    }
}

var encodePostData = function encodePostData(data, options) {
    if (options.blob) {
        return new Blob([data.buffer], {
            type: 'text/plain',
        })
    } else if (options.sendBeacon) {
        var body = encodePostData(data, {
            method: 'POST',
        })
        return new Blob([body], {
            type: 'application/x-www-form-urlencoded',
        })
    } else if (options.method !== 'POST') {
        return null
    }

    var body_data

    if (Array.isArray(data)) {
        body_data = 'data=' + encodeURIComponent(data)
    } else {
        body_data = 'data=' + encodeURIComponent(data['data'])
    }

    if (data['compression']) {
        body_data += '&compression=' + data['compression']
    }

    return body_data
}
var xhr = function xhr(url, data, headers, options, captureMetrics, callback) {
    var req = new XMLHttpRequest()
    req.open(options.method, url, true)
    var body = encodePostData(data, options)
    captureMetrics.incr('_send_request')
    captureMetrics.incr('_send_request_inflight')
    var requestId = captureMetrics.startRequest(
        _objectSpread2(
            {
                data_size: _.isString(data) ? data.length : body.length,
                endpoint: url.slice(url.length - 2),
            },
            options._metrics
        )
    )

    _.each(headers, function (headerValue, headerName) {
        req.setRequestHeader(headerName, headerValue)
    })

    if (options.method === 'POST' && !options.blob) {
        req.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded')
    } // send the ph_optout cookie
    // withCredentials cannot be modified until after calling .open on Android and Mobile Safari

    req.withCredentials = true

    req.onreadystatechange = function () {
        if (req.readyState === 4) {
            captureMetrics.incr('xhr-response')
            captureMetrics.incr('xhr-response-'.concat(req.status))
            captureMetrics.decr('_send_request_inflight')

            var _data = captureMetrics.finishRequest(requestId) // XMLHttpRequest.DONE == 4, except in safari 4

            if (req.status === 200) {
                if (callback) {
                    var response

                    try {
                        response = JSON.parse(req.responseText)
                    } catch (e) {
                        console$1.error(e)
                        return
                    }

                    callback(response)
                }
            } else {
                var error = 'Bad HTTP status: ' + req.status + ' ' + req.statusText
                console$1.error(error)
                captureMetrics.markRequestFailed(
                    _objectSpread2(
                        _objectSpread2({}, _data),
                        {},
                        {
                            type: 'non_200',
                            status: req.status,
                            statusText: req.statusText,
                        }
                    )
                )

                if (callback) {
                    if (options.verbose) {
                        callback({
                            status: 0,
                            error: error,
                        })
                    } else {
                        callback(0)
                    }
                }
            }
        }
    }

    req.send(body)
}

/*
SIMPLE STYLE GUIDE:

this.x === public function
this._x === internal - only use within this file
this.__x === private - only use within the class

Globals should be all caps
*/

var init_type // MODULE or SNIPPET loader

var posthog_master // main posthog instance / object

var INIT_MODULE = 0
var INIT_SNIPPET = 1 // some globals for comparisons

var __NOOP = function __NOOP() {}

var __NOOPTIONS = {}
var PRIMARY_INSTANCE_NAME = 'posthog'
/*
 * Dynamic... constants? Is that an oxymoron?
 */
// http://hacks.mozilla.org/2009/07/cross-site-xmlhttprequest-with-cors/
// https://developer.mozilla.org/en-US/docs/DOM/XMLHttpRequest#withCredentials

var USE_XHR = win.XMLHttpRequest && 'withCredentials' in new XMLHttpRequest() // IE<10 does not support cross-origin XHR's but script tags
// with defer won't block window.onload; ENQUEUE_REQUESTS
// should only be true for Opera<12

var ENQUEUE_REQUESTS = !USE_XHR && userAgent.indexOf('MSIE') === -1 && userAgent.indexOf('Mozilla') === -1

var defaultConfig = function defaultConfig() {
    return {
        api_host: 'https://app.posthog.com',
        api_method: 'POST',
        api_transport: 'XHR',
        autocapture: true,
        cross_subdomain_cookie: document$1.location.hostname.indexOf('herokuapp.com') === -1,
        persistence: 'cookie',
        persistence_name: '',
        cookie_name: '',
        loaded: function loaded() {},
        store_google: true,
        save_referrer: true,
        test: false,
        verbose: false,
        img: false,
        capture_pageview: true,
        debug: false,
        cookie_expiration: 365,
        upgrade: false,
        disable_session_recording: false,
        disable_persistence: false,
        disable_cookie: false,
        secure_cookie: win.location.protocol === 'https:',
        ip: true,
        opt_out_capturing_by_default: false,
        opt_out_persistence_by_default: false,
        opt_out_capturing_persistence_type: 'localStorage',
        opt_out_capturing_cookie_prefix: null,
        property_blacklist: [],
        sanitize_properties: null,
        xhr_headers: {},
        // { header: value, header2: value }
        inapp_protocol: '//',
        inapp_link_new_window: false,
        request_batching: true,
        // Used for internal testing
        _onCapture: function _onCapture() {},
        _capture_metrics: false,
    }
}
/**
 * PostHog Library Object
 * @constructor
 */

var PostHogLib = function PostHogLib() {}
/**
 * create_mplib(token:string, config:object, name:string)
 *
 * This function is used by the init method of PostHogLib objects
 * as well as the main initializer at the end of the JSLib (that
 * initializes document.posthog as well as any additional instances
 * declared before this file has loaded).
 */

var create_mplib = function create_mplib(token, config, name) {
    var instance,
        target = name === PRIMARY_INSTANCE_NAME ? posthog_master : posthog_master[name]

    if (target && init_type === INIT_MODULE) {
        instance = target
    } else {
        if (target && !_.isArray(target)) {
            console$1.error('You have already initialized ' + name)
            return
        }

        instance = new PostHogLib()
    }

    instance._init(token, config, name)

    instance['people'] = new PostHogPeople()

    instance['people']._init(instance)

    instance.featureFlags = new PostHogFeatureFlags(instance) // This key is deprecated

    instance.feature_flags = instance.featureFlags
    instance.toolbar = new Toolbar(instance)
    instance.sessionRecording = new SessionRecording(instance)
    instance.sessionRecording.startRecordingIfEnabled() // if any instance on the page has debug = true, we set the
    // global debug to be true

    Config.DEBUG = Config.DEBUG || instance.get_config('debug')
    instance['__autocapture_enabled'] = instance.get_config('autocapture')

    if (instance.get_config('autocapture')) {
        var num_buckets = 100
        var num_enabled_buckets = 100

        if (!autocapture.enabledForProject(instance.get_config('token'), num_buckets, num_enabled_buckets)) {
            instance['__autocapture_enabled'] = false
            console$1.log('Not in active bucket: disabling Automatic Event Collection.')
        } else if (!autocapture.isBrowserSupported()) {
            instance['__autocapture_enabled'] = false
            console$1.log('Disabling Automatic Event Collection because this browser is not supported')
        } else {
            autocapture.init(instance)
        }
    } // if target is not defined, we called init after the lib already
    // loaded, so there won't be an array of things to execute

    if (!_.isUndefined(target) && _.isArray(target)) {
        // Crunch through the people queue first - we queue this data up &
        // flush on identify, so it's better to do all these operations first
        instance._execute_array.call(instance['people'], target['people'])

        instance._execute_array(target)
    }

    return instance
} // Initialization methods

/**
 * This function initializes a new instance of the PostHog capturing object.
 * All new instances are added to the main posthog object as sub properties (such as
 * posthog.library_name) and also returned by this function. To define a
 * second instance on the page, you would call:
 *
 *     posthog.init('new token', { your: 'config' }, 'library_name');
 *
 * and use it like so:
 *
 *     posthog.library_name.capture(...);
 *
 * @param {String} token   Your PostHog API token
 * @param {Object} [config]  A dictionary of config options to override. <a href="https://github.com/posthog/posthog-js/blob/6e0e873/src/posthog-core.js#L57-L91">See a list of default config options</a>.
 * @param {String} [name]    The name for the new posthog instance that you want created
 */

PostHogLib.prototype.init = function (token, config, name) {
    if (_.isUndefined(name)) {
        console$1.error('You must name your new library: init(token, config, name)')
        return
    }

    if (name === PRIMARY_INSTANCE_NAME) {
        console$1.error('You must initialize the main posthog object right after you include the PostHog js snippet')
        return
    }

    var instance = create_mplib(token, config, name)
    posthog_master[name] = instance

    instance._loaded()

    return instance
} // posthog._init(token:string, config:object, name:string)
//
// This function sets up the current instance of the posthog
// library.  The difference between this method and the init(...)
// method is this one initializes the actual instance, whereas the
// init(...) method sets up a new library and calls _init on it.
//

PostHogLib.prototype._init = function (token, config, name) {
    this['__loaded'] = true
    this['config'] = {}
    this['_triggered_notifs'] = []
    this['compression'] = {}
    this.set_config(
        _.extend({}, defaultConfig(), config, {
            name: name,
            token: token,
            callback_fn: (name === PRIMARY_INSTANCE_NAME ? name : PRIMARY_INSTANCE_NAME + '.' + name) + '._jsc',
        })
    )

    this['_jsc'] = function () {}

    this._captureMetrics = new CaptureMetrics(this.get_config('_capture_metrics'), _.bind(this.capture, this))
    this._requestQueue = new RequestQueue(this._captureMetrics, _.bind(this._handle_queued_event, this))
    this.__captureHooks = []
    this.__request_queue = []
    this['persistence'] = new PostHogPersistence(this['config'])

    this._gdpr_init()

    var uuid = _.UUID()

    if (!this.get_distinct_id()) {
        // There is no need to set the distinct id
        // or the device id if something was already stored
        // in the persitence
        this.register_once(
            {
                distinct_id: uuid,
                $device_id: uuid,
            },
            ''
        )
    } // Set up the window close event handler "unload"

    win.addEventListener && win.addEventListener('unload', this._handle_unload.bind(this))
} // Private methods

PostHogLib.prototype._loaded = function () {
    this.get_config('loaded')(this)

    this._start_queue_if_opted_in() // this happens after so a user can call identify in
    // the loaded callback

    if (this.get_config('capture_pageview')) {
        this.capture_pageview()
    }
}

PostHogLib.prototype._start_queue_if_opted_in = function () {
    if (!this.has_opted_out_capturing()) {
        if (this.get_config('request_batching')) {
            this._requestQueue.poll()
        }
    }
}

PostHogLib.prototype._dom_loaded = function () {
    if (!this.has_opted_out_capturing()) {
        _.each(
            this.__request_queue,
            function (item) {
                this._send_request.apply(this, item)
            },
            this
        )
    }

    delete this.__request_queue

    this._start_queue_if_opted_in()
}
/**
 * _prepare_callback() should be called by callers of _send_request for use
 * as the callback argument.
 *
 * If there is no callback, this returns null.
 * If we are going to make XHR/XDR requests, this returns a function.
 * If we are going to use script tags, this returns a string to use as the
 * callback GET param.
 */

PostHogLib.prototype._prepare_callback = function (callback, data) {
    if (_.isUndefined(callback)) {
        return null
    }

    if (USE_XHR) {
        var callback_function = function callback_function(response) {
            callback(response, data)
        }

        return callback_function
    } else {
        // if the user gives us a callback, we store as a random
        // property on this instances jsc function and update our
        // callback string to reflect that.
        var jsc = this['_jsc']
        var randomized_cb = '' + Math.floor(Math.random() * 100000000)
        var callback_string = this.get_config('callback_fn') + '[' + randomized_cb + ']'

        jsc[randomized_cb] = function (response) {
            delete jsc[randomized_cb]
            callback(response, data)
        }

        return callback_string
    }
}

PostHogLib.prototype._handle_unload = function () {
    if (!this.get_config('request_batching')) {
        if (this.get_config('capture_pageview')) {
            this.capture('$pageleave', null, {
                transport: 'sendbeacon',
            })
        }

        return
    }

    if (this.get_config('capture_pageview')) {
        this.capture('$pageleave')
    }

    if (this.get_config('_capture_metrics')) {
        this._requestQueue.updateUnloadMetrics()

        this.capture('$capture_metrics', this._captureMetrics.metrics)

        this._captureMetrics.captureInProgressRequests()
    }

    this._requestQueue.unload()
}

PostHogLib.prototype._handle_queued_event = function (url, data, options) {
    var jsonData = JSON.stringify(data)

    this.__compress_and_send_json_request(url, jsonData, options || __NOOPTIONS, __NOOP)
}

PostHogLib.prototype.__compress_and_send_json_request = function (url, jsonData, options, callback) {
    var _compressData = compressData(decideCompression(this.compression), jsonData, options),
        _compressData2 = _slicedToArray(_compressData, 2),
        data = _compressData2[0],
        _options = _compressData2[1]

    this._send_request(url, data, _options, callback)
}

PostHogLib.prototype._send_request = function (url, data, options, callback) {
    if (ENQUEUE_REQUESTS) {
        this.__request_queue.push(arguments)

        return
    }

    var DEFAULT_OPTIONS = {
        method: this.get_config('api_method'),
        transport: this.get_config('api_transport'),
        verbose: this.get_config('verbose'),
    }
    options = _.extend(DEFAULT_OPTIONS, options || {})

    if (!USE_XHR) {
        options.method = 'GET'
    }

    var useSendBeacon = win.navigator.sendBeacon && options.transport.toLowerCase() === 'sendbeacon'

    if (!USE_XHR) {
        if (callback) {
            data['callback'] = callback
        } else if (verbose_mode || this.get_config('test')) {
            // Verbose output (from verbose mode, or an error in test mode) is a json blob,
            // which by itself is not valid javascript. Without a callback, this verbose output will
            // cause an error when returned via jsonp, so we force a no-op callback param.
            // See the ECMA script spec: http://www.ecma-international.org/ecma-262/5.1/#sec-12.4
            data['callback'] = '(function(){})'
        }
    }

    var args = options.urlQueryArgs || {}
    args['ip'] = this.get_config('ip') ? 1 : 0
    args['_'] = new Date().getTime().toString()
    url += '?' + _.HTTPBuildQuery(args)

    if (_.isObject(data) && this.get_config('img')) {
        var img = document$1.createElement('img')
        img.src = url
        document$1.body.appendChild(img)
    } else if (useSendBeacon) {
        // beacon documentation https://w3c.github.io/beacon/
        // beacons format the message and use the type property
        // also no need to try catch as sendBeacon does not report errors
        //   and is defined as best effort attempt
        win.navigator.sendBeacon(
            url,
            encodePostData(
                data,
                _objectSpread2(
                    _objectSpread2({}, options),
                    {},
                    {
                        sendBeacon: true,
                    }
                )
            )
        )
    } else if (USE_XHR) {
        try {
            xhr(url, data, this.get_config('xhr_headers'), options, this._captureMetrics, callback)
        } catch (e) {
            console$1.error(e)
        }
    } else {
        var script = document$1.createElement('script')
        script.type = 'text/javascript'
        script.async = true
        script.defer = true
        script.src = url
        var s = document$1.getElementsByTagName('script')[0]
        s.parentNode.insertBefore(script, s)
    }
}
/**
 * _execute_array() deals with processing any posthog function
 * calls that were called before the PostHog library were loaded
 * (and are thus stored in an array so they can be called later)
 *
 * Note: we fire off all the posthog function calls && user defined
 * functions BEFORE we fire off posthog capturing calls. This is so
 * identify/register/set_config calls can properly modify early
 * capturing calls.
 *
 * @param {Array} array
 */

PostHogLib.prototype._execute_array = function (array) {
    var fn_name,
        alias_calls = [],
        other_calls = [],
        capturing_calls = []

    _.each(
        array,
        function (item) {
            if (item) {
                fn_name = item[0]

                if (_.isArray(fn_name)) {
                    capturing_calls.push(item) // chained call e.g. posthog.get_group().set()
                } else if (typeof item === 'function') {
                    item.call(this)
                } else if (_.isArray(item) && fn_name === 'alias') {
                    alias_calls.push(item)
                } else if (
                    _.isArray(item) &&
                    fn_name.indexOf('capture') !== -1 &&
                    typeof this[fn_name] === 'function'
                ) {
                    capturing_calls.push(item)
                } else {
                    other_calls.push(item)
                }
            }
        },
        this
    )

    var execute = function execute(calls, context) {
        _.each(
            calls,
            function (item) {
                if (_.isArray(item[0])) {
                    // chained call
                    var caller = context

                    _.each(item, function (call) {
                        caller = caller[call[0]].apply(caller, call.slice(1))
                    })
                } else {
                    this[item[0]].apply(this, item.slice(1))
                }
            },
            context
        )
    }

    execute(alias_calls, this)
    execute(other_calls, this)
    execute(capturing_calls, this)
}
/**
 * push() keeps the standard async-array-push
 * behavior around after the lib is loaded.
 * This is only useful for external integrations that
 * do not wish to rely on our convenience methods
 * (created in the snippet).
 *
 * ### Usage:
 *     posthog.push(['register', { a: 'b' }]);
 *
 * @param {Array} item A [function_name, args...] array to be executed
 */

PostHogLib.prototype.push = function (item) {
    this._execute_array([item])
}
/**
 * Capture an event. This is the most important and
 * frequently used PostHog function.
 *
 * ### Usage:
 *
 *     // capture an event named 'Registered'
 *     posthog.capture('Registered', {'Gender': 'Male', 'Age': 21});
 *
 *     // capture an event using navigator.sendBeacon
 *     posthog.capture('Left page', {'duration_seconds': 35}, {transport: 'sendBeacon'});
 *
 * @param {String} event_name The name of the event. This can be anything the user does - 'Button Click', 'Sign Up', 'Item Purchased', etc.
 * @param {Object} [properties] A set of properties to include with the event you're sending. These describe the user who did the event or details about the event itself.
 * @param {Object} [options] Optional configuration for this capture request.
 * @param {String} [options.transport] Transport method for network request ('XHR' or 'sendBeacon').
 * @param {Function} [callback] [Deprecated] If provided, the callback function will be called after capturing the event.
 */

PostHogLib.prototype.capture = addOptOutCheckPostHogLib(function (event_name, properties, options, callback) {
    this._captureMetrics.incr('capture')

    if (event_name === '$snapshot') {
        this._captureMetrics.incr('snapshot')
    }

    if (!callback && typeof options === 'function') {
        callback = options
        options = null
    }

    options = options || __NOOPTIONS
    var transport = options['transport'] // external API, don't minify 'transport' prop

    if (transport) {
        options.transport = transport // 'transport' prop name can be minified internally
    }

    if (typeof callback !== 'function') {
        callback = __NOOP
    } else {
        win.console.warn('WARNING! Calling posthog.capture with a callback is deprecated and will be removed soon!')
    }

    if (_.isUndefined(event_name)) {
        console$1.error('No event name provided to posthog.capture')
        return
    }

    if (_.isBlockedUA(userAgent)) {
        callback(0)
        return
    }

    var start_timestamp = this['persistence'].remove_event_timer(event_name) // update persistence

    this['persistence'].update_search_keyword(document$1.referrer)

    if (this.get_config('store_google')) {
        this['persistence'].update_campaign_params()
    }

    if (this.get_config('save_referrer')) {
        this['persistence'].update_referrer_info(document$1.referrer)
    }

    var data = {
        event: event_name,
        properties: this._calculate_event_properties(event_name, properties, start_timestamp),
    }

    if (event_name === '$identify' && options.$set) {
        data['$set'] = options['$set']
    }

    data = _.copyAndTruncateStrings(data, options._noTruncate ? null : 255)
    var jsonData = JSON.stringify(data)
    var url = this.get_config('api_host') + (options.endpoint || '/e/')

    var cb = this._prepare_callback(callback, data)

    var has_unique_traits = callback !== __NOOP || options !== __NOOPTIONS

    if (this.get_config('request_batching') && (!has_unique_traits || options._batchKey)) {
        data['timestamp'] = new Date()

        this._requestQueue.enqueue(url, data, options)
    } else {
        this.__compress_and_send_json_request(url, jsonData, options, cb)
    }

    this._invokeCaptureHooks(event_name)

    return data
})

PostHogLib.prototype._addCaptureHook = function (callback) {
    this.__captureHooks.push(callback)
}

PostHogLib.prototype._invokeCaptureHooks = function (eventName) {
    this.config._onCapture(eventName)

    _.each(this.__captureHooks, function (callback) {
        return callback(eventName)
    })
}

PostHogLib.prototype._calculate_event_properties = function (event_name, event_properties, start_timestamp) {
    // set defaults
    var properties = event_properties || {}
    properties['token'] = this.get_config('token')

    if (event_name === '$snapshot') {
        var persistenceProps = this.persistence.properties()
        properties['distinct_id'] = persistenceProps.distinct_id
        return properties
    } // set $duration if time_event was previously called for this event

    if (!_.isUndefined(start_timestamp)) {
        var duration_in_ms = new Date().getTime() - start_timestamp
        properties['$duration'] = parseFloat((duration_in_ms / 1000).toFixed(3))
    } // note: extend writes to the first object, so lets make sure we
    // don't write to the persistence properties object and info
    // properties object by passing in a new object
    // update properties with pageview info and super-properties

    properties = _.extend({}, _.info.properties(), this['persistence'].properties(), properties)
    var property_blacklist = this.get_config('property_blacklist')

    if (_.isArray(property_blacklist)) {
        _.each(property_blacklist, function (blacklisted_prop) {
            delete properties[blacklisted_prop]
        })
    } else {
        console$1.error('Invalid value for property_blacklist config: ' + property_blacklist)
    }

    var sanitize_properties = this.get_config('sanitize_properties')

    if (sanitize_properties) {
        properties = sanitize_properties(properties, event_name)
    }

    return properties
}
/**
 * Capture a page view event.
 * This function is called by default on page load unless the
 * capture_pageview configuration variable is false.
 *
 * @param {String} [page] The url of the page to record. If you don't include this, it defaults to the current url.
 * @api private
 */

PostHogLib.prototype.capture_pageview = function (page) {
    if (_.isUndefined(page)) {
        page = document$1.location.href
    }

    this.capture('$pageview')
}
/**
 * Register a set of super properties, which are included with all
 * events. This will overwrite previous super property values.
 *
 * ### Usage:
 *
 *     // register 'Gender' as a super property
 *     posthog.register({'Gender': 'Female'});
 *
 *     // register several super properties when a user signs up
 *     posthog.register({
 *         'Email': 'jdoe@example.com',
 *         'Account Type': 'Free'
 *     });
 *
 * @param {Object} properties An associative array of properties to store about the user
 * @param {Number} [days] How many days since the user's last visit to store the super properties
 */

PostHogLib.prototype.register = function (props, days) {
    this['persistence'].register(props, days)
}
/**
 * Register a set of super properties only once. This will not
 * overwrite previous super property values, unlike register().
 *
 * ### Usage:
 *
 *     // register a super property for the first time only
 *     posthog.register_once({
 *         'First Login Date': new Date().toISOString()
 *     });
 *
 * ### Notes:
 *
 * If default_value is specified, current super properties
 * with that value will be overwritten.
 *
 * @param {Object} properties An associative array of properties to store about the user
 * @param {*} [default_value] Value to override if already set in super properties (ex: 'False') Default: 'None'
 * @param {Number} [days] How many days since the users last visit to store the super properties
 */

PostHogLib.prototype.register_once = function (props, default_value, days) {
    this['persistence'].register_once(props, default_value, days)
}
/**
 * Delete a super property stored with the current user.
 *
 * @param {String} property The name of the super property to remove
 */

PostHogLib.prototype.unregister = function (property) {
    this['persistence'].unregister(property)
}

PostHogLib.prototype._register_single = function (prop, value) {
    var props = {}
    props[prop] = value
    this.register(props)
}
/*
 * See if feature flag is enabled for user.
 *
 * ### Usage:
 *
 *     if(posthog.isFeatureEnabled('beta-feature')) { // do something }
 *
 * @param {Object|String} prop Key of the feature flag.
 * @param {Object|String} options (optional) If {send_event: false}, we won't send an $feature_flag_call event to PostHog.
 */

PostHogLib.prototype.isFeatureEnabled = function (key) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {}
    return this.feature_flags.isFeatureEnabled(key, options)
}

PostHogLib.prototype.reloadFeatureFlags = function () {
    return this.feature_flags.reloadFeatureFlags()
}
/*
 * Register an event listener that runs when feature flags become available or when they change.
 * If there are flags, the listener is called immediately in addition to being called on future changes.
 *
 * ### Usage:
 *
 *     posthog.onFeatureFlags(function(featureFlags) { // do something })
 *
 * @param {Function} [callback] The callback function will be called once the feature flags are ready or when they are updated.
 *                              It'll return a list of feature flags enabled for the user.
 */

PostHogLib.prototype.onFeatureFlags = function (callback) {
    this.persistence.addFeatureFlagsHandler(callback)
    var flags = this.feature_flags.getFlags()

    if (flags) {
        callback(flags)
    }
}
/**
 * Identify a user with a unique ID instead of a PostHog
 * randomly generated distinct_id. If the method is never called,
 * then unique visitors will be identified by a UUID generated
 * the first time they visit the site.
 *
 * If user properties are passed, they are also sent to posthog.
 *
 * ### Usage:
 *
 *      posthog.identify('[user unique id]')
 *      posthog.identify('[user unique id]', { email: 'john@example.com' })
 *
 * ### Notes:
 *
 * You can call this function to overwrite a previously set
 * unique ID for the current user. PostHog cannot translate
 * between IDs at this time, so when you change a user's ID
 * they will appear to be a new user.
 *
 * When used alone, posthog.identify will change the user's
 * distinct_id to the unique ID provided. When used in tandem
 * with posthog.alias, it will allow you to identify based on
 * unique ID and map that back to the original, anonymous
 * distinct_id given to the user upon her first arrival to your
 * site (thus connecting anonymous pre-signup activity to
 * post-signup activity). Though the two work together, do not
 * call identify() at the same time as alias(). Calling the two
 * at the same time can cause a race condition, so it is best
 * practice to call identify on the original, anonymous ID
 * right after you've aliased it.
 *
 * @param {String} [unique_id] A string that uniquely identifies a user. If not provided, the distinct_id currently in the persistent store (cookie or localStorage) will be used.
 * @param {Object} [userProperties] Optional: An associative array of properties to store about the user
 */

PostHogLib.prototype.identify = function (new_distinct_id, userProperties) {
    //if the new_distinct_id has not been set ignore the identify event
    if (!new_distinct_id) {
        console$1.error('Unique user id has not been set in posthog.identify')
        return
    }

    this._captureMetrics.incr('identify')

    var previous_distinct_id = this.get_distinct_id()
    this.register({
        $user_id: new_distinct_id,
    })

    if (!this.get_property('$device_id')) {
        // The persisted distinct id might not actually be a device id at all
        // it might be a distinct id of the user from before
        var device_id = previous_distinct_id
        this.register_once(
            {
                $had_persisted_distinct_id: true,
                $device_id: device_id,
            },
            ''
        )
    } // identify only changes the distinct id if it doesn't match either the existing or the alias;
    // if it's new, blow away the alias as well.

    if (new_distinct_id !== previous_distinct_id && new_distinct_id !== this.get_property(ALIAS_ID_KEY)) {
        this.unregister(ALIAS_ID_KEY)
        this.register({
            distinct_id: new_distinct_id,
        })
    } // send an $identify event any time the distinct_id is changing - logic on the server
    // will determine whether or not to do anything with it.

    if (new_distinct_id !== previous_distinct_id) {
        this.capture(
            '$identify',
            {
                distinct_id: new_distinct_id,
                $anon_distinct_id: previous_distinct_id,
            },
            {
                $set: userProperties || {},
            }
        )
    } else if (userProperties) {
        this['people'].set(userProperties)
    }

    this.reloadFeatureFlags()
}
/**
 * Clears super properties and generates a new random distinct_id for this instance.
 * Useful for clearing data when a user logs out.
 */

PostHogLib.prototype.reset = function (reset_device_id) {
    var device_id = this.get_property('$device_id')
    this['persistence'].clear()

    var uuid = _.UUID()

    this.register_once(
        {
            distinct_id: uuid,
            $device_id: reset_device_id ? uuid : device_id,
        },
        ''
    )
}
/**
 * Returns the current distinct id of the user. This is either the id automatically
 * generated by the library or the id that has been passed by a call to identify().
 *
 * ### Notes:
 *
 * get_distinct_id() can only be called after the PostHog library has finished loading.
 * init() has a loaded function available to handle this automatically. For example:
 *
 *     // set distinct_id after the posthog library has loaded
 *     posthog.init('YOUR PROJECT TOKEN', {
 *         loaded: function(posthog) {
 *             distinct_id = posthog.get_distinct_id();
 *         }
 *     });
 */

PostHogLib.prototype.get_distinct_id = function () {
    return this.get_property('distinct_id')
}
/**
 * Create an alias, which PostHog will use to link two distinct_ids going forward (not retroactively).
 * Multiple aliases can map to the same original ID, but not vice-versa. Aliases can also be chained - the
 * following is a valid scenario:
 *
 *     posthog.alias('new_id', 'existing_id');
 *     ...
 *     posthog.alias('newer_id', 'new_id');
 *
 * If the original ID is not passed in, we will use the current distinct_id - probably the auto-generated GUID.
 *
 * ### Notes:
 *
 * The best practice is to call alias() when a unique ID is first created for a user
 * (e.g., when a user first registers for an account and provides an email address).
 * alias() should never be called more than once for a given user, except to
 * chain a newer ID to a previously new ID, as described above.
 *
 * @param {String} alias A unique identifier that you want to use for this user in the future.
 * @param {String} [original] The current identifier being used for this user.
 */

PostHogLib.prototype.alias = function (alias, original) {
    // If the $people_distinct_id key exists in persistence, there has been a previous
    // posthog.people.identify() call made for this user. It is VERY BAD to make an alias with
    // this ID, as it will duplicate users.
    if (alias === this.get_property(PEOPLE_DISTINCT_ID_KEY)) {
        console$1.critical('Attempting to create alias for existing People user - aborting.')
        return -2
    }

    var _this = this

    if (_.isUndefined(original)) {
        original = this.get_distinct_id()
    }

    if (alias !== original) {
        this._register_single(ALIAS_ID_KEY, alias)

        return this.capture(
            '$create_alias',
            {
                alias: alias,
                distinct_id: original,
            },
            function () {
                // Flush the people queue
                _this.identify(alias)
            }
        )
    } else {
        console$1.error('alias matches current distinct_id - skipping api call.')
        this.identify(alias)
        return -1
    }
}
/**
 * Update the configuration of a posthog library instance.
 *
 * The default config is:
 *
 *     {
 *       // Posthog host
 *       api_host: 'https://app.posthog.com',
 *
 *       // HTTP method for capturing requests
 *       api_method: 'POST'
 *
 *       // transport for sending requests ('XHR' or 'sendBeacon')
 *       // NB: sendBeacon should only be used for scenarios such as
 *       // page unload where a "best-effort" attempt to send is
 *       // acceptable; the sendBeacon API does not support callbacks
 *       // or any way to know the result of the request. PostHog
 *       // capturing via sendBeacon will not support any event-
 *       // batching or retry mechanisms.
 *       api_transport: 'XHR'
 *
 *       // super properties cookie expiration (in days)
 *       cookie_expiration: 365
 *
 *       // super properties span subdomains
 *       cross_subdomain_cookie: true
 *
 *       // debug mode
 *       debug: false
 *
 *       // if this is true, the posthog cookie or localStorage entry
 *       // will be deleted, and no user persistence will take place
 *       disable_persistence: false
 *
 *       // if this is true, PostHog will automatically determine
 *       // City, Region and Country data using the IP address of
 *       //the client
 *       ip: true
 *
 *       // opt users out of capturing by this PostHog instance by default
 *       opt_out_capturing_by_default: false
 *
 *       // opt users out of browser data storage by this PostHog instance by default
 *       opt_out_persistence_by_default: false
 *
 *       // persistence mechanism used by opt-in/opt-out methods - cookie
 *       // or localStorage - falls back to cookie if localStorage is unavailable
 *       opt_out_capturing_persistence_type: 'localStorage'
 *
 *       // customize the name of cookie/localStorage set by opt-in/opt-out methods
 *       opt_out_capturing_cookie_prefix: null
 *
 *       // type of persistent store for super properties (cookie/
 *       // localStorage) if set to 'localStorage', any existing
 *       // posthog cookie value with the same persistence_name
 *       // will be transferred to localStorage and deleted
 *       persistence: 'cookie'
 *
 *       // name for super properties persistent store
 *       persistence_name: ''
 *
 *       // names of properties/superproperties which should never
 *       // be sent with capture() calls
 *       property_blacklist: []
 *
 *       // if this is true, posthog cookies will be marked as
 *       // secure, meaning they will only be transmitted over https
 *       secure_cookie: false
 *
 *       // should we capture a page view on page load
 *       capture_pageview: true
 *
 *       // if you set upgrade to be true, the library will check for
 *       // a cookie from our old js library and import super
 *       // properties from it, then the old cookie is deleted
 *       // The upgrade config option only works in the initialization,
 *       // so make sure you set it when you create the library.
 *       upgrade: false
 *
 *       // if this is true, session recording is always disabled.
 *       disable_session_recording: false,
 *
 *       // extra HTTP request headers to set for each API request, in
 *       // the format {'Header-Name': value}
 *       xhr_headers: {}
 *
 *       // protocol for fetching in-app message resources, e.g.
 *       // 'https://' or 'http://'; defaults to '//' (which defers to the
 *       // current page's protocol)
 *       inapp_protocol: '//'
 *
 *       // whether to open in-app message link in new tab/window
 *       inapp_link_new_window: false
 *     }
 *
 *
 * @param {Object} config A dictionary of new configuration values to update
 */

PostHogLib.prototype.set_config = function (config) {
    if (_.isObject(config)) {
        _.extend(this['config'], config)

        if (!this.get_config('persistence_name')) {
            this['config']['persistence_name'] = this['config']['cookie_name']
        }

        if (!this.get_config('disable_persistence')) {
            this['config']['disable_persistence'] = this['config']['disable_cookie']
        }

        if (this['persistence']) {
            this['persistence'].update_config(this['config'])
        }

        Config.DEBUG = Config.DEBUG || this.get_config('debug')
    }
}
/**
 * returns the current config object for the library.
 */

PostHogLib.prototype.get_config = function (prop_name) {
    return this['config'][prop_name]
}
/**
 * Returns the value of the super property named property_name. If no such
 * property is set, get_property() will return the undefined value.
 *
 * ### Notes:
 *
 * get_property() can only be called after the PostHog library has finished loading.
 * init() has a loaded function available to handle this automatically. For example:
 *
 *     // grab value for 'user_id' after the posthog library has loaded
 *     posthog.init('YOUR PROJECT TOKEN', {
 *         loaded: function(posthog) {
 *             user_id = posthog.get_property('user_id');
 *         }
 *     });
 *
 * @param {String} property_name The name of the super property you want to retrieve
 */

PostHogLib.prototype.get_property = function (property_name) {
    return this['persistence']['props'][property_name]
}

PostHogLib.prototype.toString = function () {
    var name = this.get_config('name')

    if (name !== PRIMARY_INSTANCE_NAME) {
        name = PRIMARY_INSTANCE_NAME + '.' + name
    }

    return name
} // perform some housekeeping around GDPR opt-in/out state

PostHogLib.prototype._gdpr_init = function () {
    var is_localStorage_requested = this.get_config('opt_out_capturing_persistence_type') === 'localStorage' // try to convert opt-in/out cookies to localStorage if possible

    if (is_localStorage_requested && localStore.is_supported()) {
        if (
            !this.has_opted_in_capturing() &&
            this.has_opted_in_capturing({
                persistence_type: 'cookie',
            })
        ) {
            this.opt_in_capturing({
                enable_persistence: false,
            })
        }

        if (
            !this.has_opted_out_capturing() &&
            this.has_opted_out_capturing({
                persistence_type: 'cookie',
            })
        ) {
            this.opt_out_capturing({
                clear_persistence: false,
            })
        }

        this.clear_opt_in_out_capturing({
            persistence_type: 'cookie',
            enable_persistence: false,
        })
    } // check whether the user has already opted out - if so, clear & disable persistence

    if (this.has_opted_out_capturing()) {
        this._gdpr_update_persistence({
            clear_persistence: true,
        }) // check whether we should opt out by default
        // note: we don't clear persistence here by default since opt-out default state is often
        //       used as an initial state while GDPR information is being collected
    } else if (
        !this.has_opted_in_capturing() &&
        (this.get_config('opt_out_capturing_by_default') || cookieStore.get('ph_optout'))
    ) {
        cookieStore.remove('ph_optout')
        this.opt_out_capturing({
            clear_persistence: this.get_config('opt_out_persistence_by_default'),
        })
    }
}
/**
 * Enable or disable persistence based on options
 * only enable/disable if persistence is not already in this state
 * @param {boolean} [options.clear_persistence] If true, will delete all data stored by the sdk in persistence and disable it
 * @param {boolean} [options.enable_persistence] If true, will re-enable sdk persistence
 */

PostHogLib.prototype._gdpr_update_persistence = function (options) {
    var disabled

    if (options && options['clear_persistence']) {
        disabled = true
    } else if (options && options['enable_persistence']) {
        disabled = false
    } else {
        return
    }

    if (!this.get_config('disable_persistence') && this['persistence'].disabled !== disabled) {
        this['persistence'].set_disabled(disabled)
    }
} // call a base gdpr function after constructing the appropriate token and options args

PostHogLib.prototype._gdpr_call_func = function (func, options) {
    options = _.extend(
        {
            capture: _.bind(this.capture, this),
            persistence_type: this.get_config('opt_out_capturing_persistence_type'),
            cookie_prefix: this.get_config('opt_out_capturing_cookie_prefix'),
            cookie_expiration: this.get_config('cookie_expiration'),
            cross_subdomain_cookie: this.get_config('cross_subdomain_cookie'),
            secure_cookie: this.get_config('secure_cookie'),
        },
        options
    ) // check if localStorage can be used for recording opt out status, fall back to cookie if not

    if (!localStore.is_supported() && options['persistence_type'] === 'localStorage') {
        options['persistence_type'] = 'cookie'
    }

    return func(this.get_config('token'), {
        capture: options['capture'],
        captureEventName: options['capture_event_name'],
        captureProperties: options['capture_properties'],
        persistenceType: options['persistence_type'],
        persistencePrefix: options['cookie_prefix'],
        cookieExpiration: options['cookie_expiration'],
        crossSubdomainCookie: options['cross_subdomain_cookie'],
        secureCookie: options['secure_cookie'],
    })
}
/**
 * Opt the user in to data capturing and cookies/localstorage for this PostHog instance
 *
 * ### Usage
 *
 *     // opt user in
 *     posthog.opt_in_capturing();
 *
 *     // opt user in with specific event name, properties, cookie configuration
 *     posthog.opt_in_capturing({
 *         capture_event_name: 'User opted in',
 *         capture_event_properties: {
 *             'Email': 'jdoe@example.com'
 *         },
 *         cookie_expiration: 30,
 *         secure_cookie: true
 *     });
 *
 * @param {Object} [options] A dictionary of config options to override
 * @param {function} [options.capture] Function used for capturing a PostHog event to record the opt-in action (default is this PostHog instance's capture method)
 * @param {string} [options.capture_event_name=$opt_in] Event name to be used for capturing the opt-in action
 * @param {Object} [options.capture_properties] Set of properties to be captured along with the opt-in action
 * @param {boolean} [options.enable_persistence=true] If true, will re-enable sdk persistence
 * @param {string} [options.persistence_type=localStorage] Persistence mechanism used - cookie or localStorage - falls back to cookie if localStorage is unavailable
 * @param {string} [options.cookie_prefix=__ph_opt_in_out] Custom prefix to be used in the cookie/localstorage name
 * @param {Number} [options.cookie_expiration] Number of days until the opt-in cookie expires (overrides value specified in this PostHog instance's config)
 * @param {boolean} [options.cross_subdomain_cookie] Whether the opt-in cookie is set as cross-subdomain or not (overrides value specified in this PostHog instance's config)
 * @param {boolean} [options.secure_cookie] Whether the opt-in cookie is set as secure or not (overrides value specified in this PostHog instance's config)
 */

PostHogLib.prototype.opt_in_capturing = function (options) {
    options = _.extend(
        {
            enable_persistence: true,
        },
        options
    )

    this._gdpr_call_func(optIn, options)

    this._gdpr_update_persistence(options)
}

PostHogLib.prototype.opt_in_captureing = function (options) {
    deprecate_warning('opt_in_captureing')
    this.opt_in_capturing(options)
}
/**
 * Opt the user out of data capturing and cookies/localstorage for this PostHog instance
 *
 * ### Usage
 *
 *     // opt user out
 *     posthog.opt_out_capturing();
 *
 *     // opt user out with different cookie configuration from PostHog instance
 *     posthog.opt_out_capturing({
 *         cookie_expiration: 30,
 *         secure_cookie: true
 *     });
 *
 * @param {Object} [options] A dictionary of config options to override
 * @param {boolean} [options.clear_persistence=true] If true, will delete all data stored by the sdk in persistence
 * @param {string} [options.persistence_type=localStorage] Persistence mechanism used - cookie or localStorage - falls back to cookie if localStorage is unavailable
 * @param {string} [options.cookie_prefix=__ph_opt_in_out] Custom prefix to be used in the cookie/localstorage name
 * @param {Number} [options.cookie_expiration] Number of days until the opt-in cookie expires (overrides value specified in this PostHog instance's config)
 * @param {boolean} [options.cross_subdomain_cookie] Whether the opt-in cookie is set as cross-subdomain or not (overrides value specified in this PostHog instance's config)
 * @param {boolean} [options.secure_cookie] Whether the opt-in cookie is set as secure or not (overrides value specified in this PostHog instance's config)
 */

PostHogLib.prototype.opt_out_capturing = function (options) {
    options = _.extend(
        {
            clear_persistence: true,
        },
        options
    )

    this._gdpr_call_func(optOut, options)

    this._gdpr_update_persistence(options)
}

PostHogLib.prototype.opt_out_captureing = function (options) {
    deprecate_warning('opt_out_captureing')
    this.opt_out_capturing(options)
}
/**
 * Check whether the user has opted in to data capturing and cookies/localstorage for this PostHog instance
 *
 * ### Usage
 *
 *     var has_opted_in = posthog.has_opted_in_capturing();
 *     // use has_opted_in value
 *
 * @param {Object} [options] A dictionary of config options to override
 * @param {string} [options.persistence_type=localStorage] Persistence mechanism used - cookie or localStorage - falls back to cookie if localStorage is unavailable
 * @param {string} [options.cookie_prefix=__ph_opt_in_out] Custom prefix to be used in the cookie/localstorage name
 * @returns {boolean} current opt-in status
 */

PostHogLib.prototype.has_opted_in_capturing = function (options) {
    return this._gdpr_call_func(hasOptedIn, options)
}

PostHogLib.prototype.has_opted_in_captureing = function (options) {
    deprecate_warning('has_opted_in_captureing')
    return this.has_opted_in_capturing(options)
}
/**
 * Check whether the user has opted out of data capturing and cookies/localstorage for this PostHog instance
 *
 * ### Usage
 *
 *     var has_opted_out = posthog.has_opted_out_capturing();
 *     // use has_opted_out value
 *
 * @param {Object} [options] A dictionary of config options to override
 * @param {string} [options.persistence_type=localStorage] Persistence mechanism used - cookie or localStorage - falls back to cookie if localStorage is unavailable
 * @param {string} [options.cookie_prefix=__ph_opt_in_out] Custom prefix to be used in the cookie/localstorage name
 * @returns {boolean} current opt-out status
 */

PostHogLib.prototype.has_opted_out_capturing = function (options) {
    return this._gdpr_call_func(hasOptedOut, options)
}

PostHogLib.prototype.has_opted_out_captureing = function (options) {
    deprecate_warning('has_opted_out_captureing')
    return this.has_opted_out_capturing(options)
}
/**
 * Clear the user's opt in/out status of data capturing and cookies/localstorage for this PostHog instance
 *
 * ### Usage
 *
 *     // clear user's opt-in/out status
 *     posthog.clear_opt_in_out_capturing();
 *
 *     // clear user's opt-in/out status with specific cookie configuration - should match
 *     // configuration used when opt_in_capturing/opt_out_capturing methods were called.
 *     posthog.clear_opt_in_out_capturing({
 *         cookie_expiration: 30,
 *         secure_cookie: true
 *     });
 *
 * @param {Object} [options] A dictionary of config options to override
 * @param {boolean} [options.enable_persistence=true] If true, will re-enable sdk persistence
 * @param {string} [options.persistence_type=localStorage] Persistence mechanism used - cookie or localStorage - falls back to cookie if localStorage is unavailable
 * @param {string} [options.cookie_prefix=__ph_opt_in_out] Custom prefix to be used in the cookie/localstorage name
 * @param {Number} [options.cookie_expiration] Number of days until the opt-in cookie expires (overrides value specified in this PostHog instance's config)
 * @param {boolean} [options.cross_subdomain_cookie] Whether the opt-in cookie is set as cross-subdomain or not (overrides value specified in this PostHog instance's config)
 * @param {boolean} [options.secure_cookie] Whether the opt-in cookie is set as secure or not (overrides value specified in this PostHog instance's config)
 */

PostHogLib.prototype.clear_opt_in_out_capturing = function (options) {
    options = _.extend(
        {
            enable_persistence: true,
        },
        options
    )

    this._gdpr_call_func(clearOptInOut, options)

    this._gdpr_update_persistence(options)
}

PostHogLib.prototype.clear_opt_in_out_captureing = function (options) {
    deprecate_warning('clear_opt_in_out_captureing')
    this.clear_opt_in_out_capturing(options)
}
/**
 * Integrate Sentry with PostHog. This will add a direct link to the person in Sentry, and an $exception event in PostHog
 *
 * ### Usage
 *
 *     Sentry.init({
 *          dsn: 'https://example',
 *          integrations: [
 *              new posthog.SentryIntegration(posthog)
 *          ]
 *     })
 *
 * @param {Object} [posthog] The posthog object
 * @param {string} [organization] Optional: The Sentry organization, used to send a direct link from PostHog to Sentry
 * @param {Number} [projectId] Optional: The Sentry project id, used to send a direct link from PostHog to Sentry
 */

PostHogLib.prototype.sentry_integration = function (_posthog, organization, projectId) {
    // setupOnce gets called by Sentry when it intializes the plugin
    this.setupOnce = function (addGlobalEventProcessor) {
        addGlobalEventProcessor(function (event) {
            if (event.level !== 'error' || !_posthog.__loaded) return event
            if (!event.tags) event.tags = {}
            event.tags['PostHog URL'] = _posthog.config.api_host + '/person/' + _posthog.get_distinct_id()
            var data = {
                $sentry_event_id: event.event_id,
                $sentry_exception: event.exception,
            }
            if (organization && projectId)
                data['$sentry_url'] =
                    'https://sentry.io/organizations/' +
                    organization +
                    '/issues/?project=' +
                    projectId +
                    '&query=' +
                    event.event_id

            _posthog.capture('$exception', data)

            return event
        })
    }
}

function deprecate_warning(method) {
    win.console.warn(
        'WARNING! posthog.' +
            method +
            ' is deprecated and will be removed soon! Please use posthog.' +
            method.split('captureing').join('capturing') +
            ' instead (without the "e")!'
    )
}

PostHogLib.prototype.decodeLZ64 = LZString.decompressFromBase64 // EXPORTS (for closure compiler)
// PostHogLib Exports

PostHogLib.prototype['init'] = PostHogLib.prototype.init
PostHogLib.prototype['reset'] = PostHogLib.prototype.reset
PostHogLib.prototype['capture'] = PostHogLib.prototype.capture
PostHogLib.prototype['capture_pageview'] = PostHogLib.prototype.capture_pageview
PostHogLib.prototype['register'] = PostHogLib.prototype.register
PostHogLib.prototype['register_once'] = PostHogLib.prototype.register_once
PostHogLib.prototype['unregister'] = PostHogLib.prototype.unregister
PostHogLib.prototype['identify'] = PostHogLib.prototype.identify
PostHogLib.prototype['alias'] = PostHogLib.prototype.alias
PostHogLib.prototype['set_config'] = PostHogLib.prototype.set_config
PostHogLib.prototype['get_config'] = PostHogLib.prototype.get_config
PostHogLib.prototype['get_property'] = PostHogLib.prototype.get_property
PostHogLib.prototype['get_distinct_id'] = PostHogLib.prototype.get_distinct_id
PostHogLib.prototype['toString'] = PostHogLib.prototype.toString
PostHogLib.prototype['opt_out_captureing'] = PostHogLib.prototype.opt_out_captureing
PostHogLib.prototype['opt_in_captureing'] = PostHogLib.prototype.opt_in_captureing
PostHogLib.prototype['has_opted_out_captureing'] = PostHogLib.prototype.has_opted_out_captureing
PostHogLib.prototype['has_opted_in_captureing'] = PostHogLib.prototype.has_opted_in_captureing
PostHogLib.prototype['clear_opt_in_out_captureing'] = PostHogLib.prototype.clear_opt_in_out_captureing
PostHogLib.prototype['opt_out_capturing'] = PostHogLib.prototype.opt_out_capturing
PostHogLib.prototype['opt_in_capturing'] = PostHogLib.prototype.opt_in_capturing
PostHogLib.prototype['has_opted_out_capturing'] = PostHogLib.prototype.has_opted_out_capturing
PostHogLib.prototype['has_opted_in_capturing'] = PostHogLib.prototype.has_opted_in_capturing
PostHogLib.prototype['clear_opt_in_out_capturing'] = PostHogLib.prototype.clear_opt_in_out_capturing
PostHogLib.prototype['isFeatureEnabled'] = PostHogLib.prototype.isFeatureEnabled
PostHogLib.prototype['reloadFeatureFlags'] = PostHogLib.prototype.reloadFeatureFlags
PostHogLib.prototype['onFeatureFlags'] = PostHogLib.prototype.onFeatureFlags
PostHogLib.prototype['decodeLZ64'] = PostHogLib.prototype.decodeLZ64
PostHogLib.prototype['SentryIntegration'] = PostHogLib.prototype.sentry_integration
PostHogLib.prototype['LIB_VERSION'] = Config.LIB_VERSION // PostHogPersistence Exports

PostHogPersistence.prototype['properties'] = PostHogPersistence.prototype.properties
PostHogPersistence.prototype['update_search_keyword'] = PostHogPersistence.prototype.update_search_keyword
PostHogPersistence.prototype['update_referrer_info'] = PostHogPersistence.prototype.update_referrer_info
PostHogPersistence.prototype['get_cross_subdomain'] = PostHogPersistence.prototype.get_cross_subdomain
PostHogPersistence.prototype['clear'] = PostHogPersistence.prototype.clear

_.safewrap_class(PostHogLib, ['identify'])

var instances = {}

var extend_mp = function extend_mp() {
    // add all the sub posthog instances
    _.each(instances, function (instance, name) {
        if (name !== PRIMARY_INSTANCE_NAME) {
            posthog_master[name] = instance
        }
    }) // add private functions as _

    posthog_master['_'] = _
}

var override_ph_init_func = function override_ph_init_func() {
    // we override the snippets init function to handle the case where a
    // user initializes the posthog library after the script loads & runs
    posthog_master['init'] = function (token, config, name) {
        if (name) {
            // initialize a sub library
            if (!posthog_master[name]) {
                posthog_master[name] = instances[name] = create_mplib(token, config, name)

                posthog_master[name]._loaded()
            }

            return posthog_master[name]
        } else {
            var instance = posthog_master

            if (instances[PRIMARY_INSTANCE_NAME]) {
                // main posthog lib already initialized
                instance = instances[PRIMARY_INSTANCE_NAME]
            } else if (token) {
                // intialize the main posthog lib
                instance = create_mplib(token, config, PRIMARY_INSTANCE_NAME)

                instance._loaded()

                instances[PRIMARY_INSTANCE_NAME] = instance
            }

            posthog_master = instance

            if (init_type === INIT_SNIPPET) {
                win[PRIMARY_INSTANCE_NAME] = posthog_master
            }

            extend_mp()
        }
    }
}

var add_dom_loaded_handler = function add_dom_loaded_handler() {
    // Cross browser DOM Loaded support
    function dom_loaded_handler() {
        // function flag since we only want to execute this once
        if (dom_loaded_handler.done) {
            return
        }

        dom_loaded_handler.done = true
        ENQUEUE_REQUESTS = false

        _.each(instances, function (inst) {
            inst._dom_loaded()
        })
    }

    function do_scroll_check() {
        try {
            document$1.documentElement.doScroll('left')
        } catch (e) {
            setTimeout(do_scroll_check, 1)
            return
        }

        dom_loaded_handler()
    }

    if (document$1.addEventListener) {
        if (document$1.readyState === 'complete') {
            // safari 4 can fire the DOMContentLoaded event before loading all
            // external JS (including this file). you will see some copypasta
            // on the internet that checks for 'complete' and 'loaded', but
            // 'loaded' is an IE thing
            dom_loaded_handler()
        } else {
            document$1.addEventListener('DOMContentLoaded', dom_loaded_handler, false)
        }
    } else if (document$1.attachEvent) {
        // IE
        document$1.attachEvent('onreadystatechange', dom_loaded_handler) // check to make sure we arn't in a frame

        var toplevel = false

        try {
            toplevel = win.frameElement === null
        } catch (e) {
            // noop
        }

        if (document$1.documentElement.doScroll && toplevel) {
            do_scroll_check()
        }
    } // fallback handler, always will work

    _.register_event(win, 'load', dom_loaded_handler, true)
}
function init_as_module() {
    init_type = INIT_MODULE
    posthog_master = new PostHogLib()
    override_ph_init_func()
    posthog_master['init']()
    add_dom_loaded_handler()
    return posthog_master
}

/* eslint camelcase: "off" */
var posthog = init_as_module()

module.exports = posthog
