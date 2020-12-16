parcelRequire = (function (e, r, t, n) {
    var i,
        o = 'function' == typeof parcelRequire && parcelRequire,
        u = 'function' == typeof require && require
    function f(t, n) {
        if (!r[t]) {
            if (!e[t]) {
                var i = 'function' == typeof parcelRequire && parcelRequire
                if (!n && i) return i(t, !0)
                if (o) return o(t, !0)
                if (u && 'string' == typeof t) return u(t)
                var c = new Error("Cannot find module '" + t + "'")
                throw ((c.code = 'MODULE_NOT_FOUND'), c)
            }
            ;(p.resolve = function (r) {
                return e[t][1][r] || r
            }),
                (p.cache = {})
            var l = (r[t] = new f.Module(t))
            e[t][0].call(l.exports, p, l, l.exports, this)
        }
        return r[t].exports
        function p(e) {
            return f(p.resolve(e))
        }
    }
    ;(f.isParcelRequire = !0),
        (f.Module = function (e) {
            ;(this.id = e), (this.bundle = f), (this.exports = {})
        }),
        (f.modules = e),
        (f.cache = r),
        (f.parent = o),
        (f.register = function (r, t) {
            e[r] = [
                function (e, r) {
                    r.exports = t
                },
                {},
            ]
        })
    for (var c = 0; c < t.length; c++)
        try {
            f(t[c])
        } catch (e) {
            i || (i = e)
        }
    if (t.length) {
        var l = f(t[t.length - 1])
        'object' == typeof exports && 'undefined' != typeof module
            ? (module.exports = l)
            : 'function' == typeof define && define.amd
            ? define(function () {
                  return l
              })
            : n && (this[n] = l)
    }
    if (((parcelRequire = f), i)) throw i
    return f
})(
    {
        zdbk: [
            function (require, module, exports) {
                'use strict'
                Object.defineProperty(exports, '__esModule', { value: !0 }), (exports.LZString = void 0)
                var o = String.fromCharCode,
                    r = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=',
                    e = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+-$',
                    n = {}
                function t(o, r) {
                    if (!n[o]) {
                        n[o] = {}
                        for (var e = 0; e < o.length; e++) n[o][o.charAt(e)] = e
                    }
                    return n[o][r]
                }
                var s = {
                    compressToBase64: function (o) {
                        if (null == o) return ''
                        var e = s._compress(o, 6, function (o) {
                            return r.charAt(o)
                        })
                        switch (e.length % 4) {
                            default:
                            case 0:
                                return e
                            case 1:
                                return e + '==='
                            case 2:
                                return e + '=='
                            case 3:
                                return e + '='
                        }
                    },
                    decompressFromBase64: function (o) {
                        return null == o
                            ? ''
                            : '' == o
                            ? null
                            : s._decompress(o.length, 32, function (e) {
                                  return t(r, o.charAt(e))
                              })
                    },
                    compressToUTF16: function (r) {
                        return null == r
                            ? ''
                            : s._compress(r, 15, function (r) {
                                  return o(r + 32)
                              }) + ' '
                    },
                    decompressFromUTF16: function (o) {
                        return null == o
                            ? ''
                            : '' == o
                            ? null
                            : s._decompress(o.length, 16384, function (r) {
                                  return o.charCodeAt(r) - 32
                              })
                    },
                    compressToUint8Array: function (o) {
                        for (var r = s.compress(o), e = new Uint8Array(2 * r.length), n = 0, t = r.length; n < t; n++) {
                            var i = r.charCodeAt(n)
                            ;(e[2 * n] = i >>> 8), (e[2 * n + 1] = i % 256)
                        }
                        return e
                    },
                    decompressFromUint8Array: function (r) {
                        if (null == r) return s.decompress(r)
                        for (var e = new Array(r.length / 2), n = 0, t = e.length; n < t; n++)
                            e[n] = 256 * r[2 * n] + r[2 * n + 1]
                        var i = []
                        return (
                            e.forEach(function (r) {
                                i.push(o(r))
                            }),
                            s.decompress(i.join(''))
                        )
                    },
                    compressToEncodedURIComponent: function (o) {
                        return null == o
                            ? ''
                            : s._compress(o, 6, function (o) {
                                  return e.charAt(o)
                              })
                    },
                    decompressFromEncodedURIComponent: function (o) {
                        return null == o
                            ? ''
                            : '' == o
                            ? null
                            : ((o = o.replace(/ /g, '+')),
                              s._decompress(o.length, 32, function (r) {
                                  return t(e, o.charAt(r))
                              }))
                    },
                    compress: function (r) {
                        return s._compress(r, 16, function (r) {
                            return o(r)
                        })
                    },
                    _compress: function (o, r, e) {
                        if (null == o) return ''
                        var n,
                            t,
                            s,
                            i = {},
                            p = {},
                            c = '',
                            a = '',
                            u = '',
                            l = 2,
                            f = 3,
                            h = 2,
                            d = [],
                            m = 0,
                            v = 0
                        for (s = 0; s < o.length; s += 1)
                            if (
                                ((c = o.charAt(s)),
                                Object.prototype.hasOwnProperty.call(i, c) || ((i[c] = f++), (p[c] = !0)),
                                (a = u + c),
                                Object.prototype.hasOwnProperty.call(i, a))
                            )
                                u = a
                            else {
                                if (Object.prototype.hasOwnProperty.call(p, u)) {
                                    if (u.charCodeAt(0) < 256) {
                                        for (n = 0; n < h; n++)
                                            (m <<= 1), v == r - 1 ? ((v = 0), d.push(e(m)), (m = 0)) : v++
                                        for (t = u.charCodeAt(0), n = 0; n < 8; n++)
                                            (m = (m << 1) | (1 & t)),
                                                v == r - 1 ? ((v = 0), d.push(e(m)), (m = 0)) : v++,
                                                (t >>= 1)
                                    } else {
                                        for (t = 1, n = 0; n < h; n++)
                                            (m = (m << 1) | t),
                                                v == r - 1 ? ((v = 0), d.push(e(m)), (m = 0)) : v++,
                                                (t = 0)
                                        for (t = u.charCodeAt(0), n = 0; n < 16; n++)
                                            (m = (m << 1) | (1 & t)),
                                                v == r - 1 ? ((v = 0), d.push(e(m)), (m = 0)) : v++,
                                                (t >>= 1)
                                    }
                                    0 == --l && ((l = Math.pow(2, h)), h++), delete p[u]
                                } else
                                    for (t = i[u], n = 0; n < h; n++)
                                        (m = (m << 1) | (1 & t)),
                                            v == r - 1 ? ((v = 0), d.push(e(m)), (m = 0)) : v++,
                                            (t >>= 1)
                                0 == --l && ((l = Math.pow(2, h)), h++), (i[a] = f++), (u = String(c))
                            }
                        if ('' !== u) {
                            if (Object.prototype.hasOwnProperty.call(p, u)) {
                                if (u.charCodeAt(0) < 256) {
                                    for (n = 0; n < h; n++)
                                        (m <<= 1), v == r - 1 ? ((v = 0), d.push(e(m)), (m = 0)) : v++
                                    for (t = u.charCodeAt(0), n = 0; n < 8; n++)
                                        (m = (m << 1) | (1 & t)),
                                            v == r - 1 ? ((v = 0), d.push(e(m)), (m = 0)) : v++,
                                            (t >>= 1)
                                } else {
                                    for (t = 1, n = 0; n < h; n++)
                                        (m = (m << 1) | t), v == r - 1 ? ((v = 0), d.push(e(m)), (m = 0)) : v++, (t = 0)
                                    for (t = u.charCodeAt(0), n = 0; n < 16; n++)
                                        (m = (m << 1) | (1 & t)),
                                            v == r - 1 ? ((v = 0), d.push(e(m)), (m = 0)) : v++,
                                            (t >>= 1)
                                }
                                0 == --l && ((l = Math.pow(2, h)), h++), delete p[u]
                            } else
                                for (t = i[u], n = 0; n < h; n++)
                                    (m = (m << 1) | (1 & t)),
                                        v == r - 1 ? ((v = 0), d.push(e(m)), (m = 0)) : v++,
                                        (t >>= 1)
                            0 == --l && ((l = Math.pow(2, h)), h++)
                        }
                        for (t = 2, n = 0; n < h; n++)
                            (m = (m << 1) | (1 & t)), v == r - 1 ? ((v = 0), d.push(e(m)), (m = 0)) : v++, (t >>= 1)
                        for (;;) {
                            if (((m <<= 1), v == r - 1)) {
                                d.push(e(m))
                                break
                            }
                            v++
                        }
                        return d.join('')
                    },
                    decompress: function (o) {
                        return null == o
                            ? ''
                            : '' == o
                            ? null
                            : s._decompress(o.length, 32768, function (r) {
                                  return o.charCodeAt(r)
                              })
                    },
                    _decompress: function (r, e, n) {
                        var t,
                            s,
                            i,
                            p,
                            c,
                            a,
                            u,
                            l = [],
                            f = 4,
                            h = 4,
                            d = 3,
                            m = '',
                            v = [],
                            w = { val: n(0), position: e, index: 1 }
                        for (t = 0; t < 3; t += 1) l[t] = t
                        for (i = 0, c = Math.pow(2, 2), a = 1; a != c; )
                            (p = w.val & w.position),
                                (w.position >>= 1),
                                0 == w.position && ((w.position = e), (w.val = n(w.index++))),
                                (i |= (p > 0 ? 1 : 0) * a),
                                (a <<= 1)
                        switch (i) {
                            case 0:
                                for (i = 0, c = Math.pow(2, 8), a = 1; a != c; )
                                    (p = w.val & w.position),
                                        (w.position >>= 1),
                                        0 == w.position && ((w.position = e), (w.val = n(w.index++))),
                                        (i |= (p > 0 ? 1 : 0) * a),
                                        (a <<= 1)
                                u = o(i)
                                break
                            case 1:
                                for (i = 0, c = Math.pow(2, 16), a = 1; a != c; )
                                    (p = w.val & w.position),
                                        (w.position >>= 1),
                                        0 == w.position && ((w.position = e), (w.val = n(w.index++))),
                                        (i |= (p > 0 ? 1 : 0) * a),
                                        (a <<= 1)
                                u = o(i)
                                break
                            case 2:
                                return ''
                        }
                        for (l[3] = u, s = u, v.push(u); ; ) {
                            if (w.index > r) return ''
                            for (i = 0, c = Math.pow(2, d), a = 1; a != c; )
                                (p = w.val & w.position),
                                    (w.position >>= 1),
                                    0 == w.position && ((w.position = e), (w.val = n(w.index++))),
                                    (i |= (p > 0 ? 1 : 0) * a),
                                    (a <<= 1)
                            switch ((u = i)) {
                                case 0:
                                    for (i = 0, c = Math.pow(2, 8), a = 1; a != c; )
                                        (p = w.val & w.position),
                                            (w.position >>= 1),
                                            0 == w.position && ((w.position = e), (w.val = n(w.index++))),
                                            (i |= (p > 0 ? 1 : 0) * a),
                                            (a <<= 1)
                                    ;(l[h++] = o(i)), (u = h - 1), f--
                                    break
                                case 1:
                                    for (i = 0, c = Math.pow(2, 16), a = 1; a != c; )
                                        (p = w.val & w.position),
                                            (w.position >>= 1),
                                            0 == w.position && ((w.position = e), (w.val = n(w.index++))),
                                            (i |= (p > 0 ? 1 : 0) * a),
                                            (a <<= 1)
                                    ;(l[h++] = o(i)), (u = h - 1), f--
                                    break
                                case 2:
                                    return v.join('')
                            }
                            if ((0 == f && ((f = Math.pow(2, d)), d++), l[u])) m = l[u]
                            else {
                                if (u !== h) return null
                                m = s + s.charAt(0)
                            }
                            v.push(m), (l[h++] = s + m.charAt(0)), (s = m), 0 == --f && ((f = Math.pow(2, d)), d++)
                        }
                    },
                }
                exports.LZString = s
            },
            {},
        ],
        EHrm: [
            function (require, module, exports) {
                module.exports = {
                    name: 'posthog-js',
                    version: '1.8.0',
                    description: 'Posthog-js allows you to automatically capture usage and send events to PostHog.',
                    repository: 'https://github.com/PostHog/posthog-js',
                    author: 'hey@posthog.com',
                    license: 'MIT',
                    scripts: {
                        start: 'parcel watch src/loader-globals.js --out-file dist/array.js',
                        serve: 'parcel serve src/loader-globals.js --port 3001 --out-file dist/array.js',
                        build:
                            'yarn build-array && yarn build-module && yarn build-es-module && yarn process-types && yarn build-react',
                        'build-array': 'parcel build src/loader-globals.js --out-file dist/array.js --no-source-maps',
                        'build-module': 'rollup -i src/loader-module.js -f cjs -o dist/module.js -c rollup.config.js',
                        'build-es-module': 'rollup -i src/loader-module.js -f es -o dist/es.js -c rollup.config.js',
                        'build-react': 'cd react; yarn; cd ..; tsc -p react',
                        'process-types':
                            'mkdir -p dist; eslint src --ext .ts -c .eslintrc.ts.js --fix && tsc && cp -f src/*.d.ts dist/',
                        lint: 'eslint src --fix',
                        prepublishOnly: 'yarn lint && yarn test && yarn build',
                        test: 'jest',
                        'test-watch': 'jest --watch',
                        cypress: 'cypress open',
                    },
                    main: 'dist/module.js',
                    module: 'dist/es.js',
                    files: ['dist/*', 'react/dist/*'],
                    devDependencies: {
                        '@babel/core': '^7.0.0',
                        '@babel/preset-env': '^7.0.0',
                        '@rollup/plugin-babel': '^5.2.1',
                        '@rollup/plugin-json': '^4.1.0',
                        '@rollup/plugin-node-resolve': '^8.1.0',
                        '@typescript-eslint/eslint-plugin': '^3.5.0',
                        '@typescript-eslint/parser': '^3.5.0',
                        'babel-eslint': '^10.1.0',
                        'babel-jest': '^26.1.0',
                        cypress: '^6.1.0',
                        'eslint-plugin-prettier': '^3.1.4',
                        'eslint-plugin-react-hooks': '^4.2.0',
                        'eslint-plugin-react': '^7.21.5',
                        eslint: '^7.3.1',
                        given2: '^2.1.7',
                        husky: '^4.2.5',
                        jest: '^26.1.0',
                        'jsdom-global': '3.0.2',
                        jsdom: '16.2.2',
                        'lint-staged': '^10.2.11',
                        localStorage: '1.0.4',
                        parcel: '^1.12.4',
                        'posthog-js': 'link:.',
                        prettier: '^2.0.5',
                        rollup: '^2.18.2',
                        rrweb: '^0.9.9',
                        sinon: '9.0.2',
                        typescript: '^3.9.6',
                    },
                    husky: { hooks: { 'pre-commit': 'lint-staged' } },
                    'lint-staged': {
                        '*.{ts,tsx,js,json}': 'prettier --write',
                        '*.{ts,tsx}': ['eslint -c .eslintrc.ts.js --fix', 'tsc --noEmit --esModuleInterop --jsx react'],
                    },
                    jest: {
                        testPathIgnorePatterns: ['/node_modules/', '/cypress/'],
                        moduleFileExtensions: ['js', 'json'],
                        setupFilesAfterEnv: ['given2/setup'],
                        clearMocks: !0,
                    },
                    dependencies: { fflate: '^0.4.1' },
                }
            },
            {},
        ],
        itQ5: [
            function (require, module, exports) {
                'use strict'
                Object.defineProperty(exports, '__esModule', { value: !0 }), (exports.default = void 0)
                var e = require('../package.json'),
                    r = { DEBUG: !1, LIB_VERSION: e.version },
                    t = r
                exports.default = t
            },
            { '../package.json': 'EHrm' },
        ],
        FOZT: [
            function (require, module, exports) {
                'use strict'
                Object.defineProperty(exports, '__esModule', { value: !0 }),
                    (exports.document = exports.console = exports.userAgent = exports._ = exports.window = void 0)
                var e = n(require('./config'))
                function n(e) {
                    return e && e.__esModule ? e : { default: e }
                }
                var r = Array.prototype,
                    o = Function.prototype,
                    t = Object.prototype,
                    i = r.slice,
                    c = t.toString,
                    a = t.hasOwnProperty,
                    s = 'undefined' != typeof window ? window : {},
                    u = s.navigator || { userAgent: '' },
                    d = s.document || {},
                    l = u.userAgent
                ;(exports.userAgent = l), (exports.document = d), (exports.window = s)
                var f = o.bind,
                    p = r.forEach,
                    h = r.indexOf,
                    w = Array.isArray,
                    g = {},
                    v = {
                        trim: function (e) {
                            return e.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, '')
                        },
                    }
                exports._ = v
                var b = {
                    log: function () {
                        if (e.default.DEBUG && !v.isUndefined(window.console) && window.console)
                            try {
                                window.console.log.apply(window.console, arguments)
                            } catch (n) {
                                v.each(arguments, function (e) {
                                    window.console.log(e)
                                })
                            }
                    },
                    error: function () {
                        if (e.default.DEBUG && !v.isUndefined(window.console) && window.console) {
                            var n = ['PostHog error:'].concat(Array.prototype.slice.call(arguments))
                            try {
                                window.console.error.apply(window.console, n)
                            } catch (r) {
                                v.each(n, function (e) {
                                    window.console.error(e)
                                })
                            }
                        }
                    },
                    critical: function () {
                        if (!v.isUndefined(window.console) && window.console) {
                            var e = ['PostHog error:'].concat(Array.prototype.slice.call(arguments))
                            try {
                                window.console.error.apply(window.console, e)
                            } catch (n) {
                                v.each(e, function (e) {
                                    window.console.error(e)
                                })
                            }
                        }
                    },
                }
                ;(exports.console = b),
                    (v.bind = function (e, n) {
                        var r, o
                        if (f && e.bind === f) return f.apply(e, i.call(arguments, 1))
                        if (!v.isFunction(e)) throw new TypeError()
                        return (
                            (r = i.call(arguments, 2)),
                            (o = function () {
                                if (!(this instanceof o)) return e.apply(n, r.concat(i.call(arguments)))
                                var t = {}
                                t.prototype = e.prototype
                                var c = new t()
                                t.prototype = null
                                var a = e.apply(c, r.concat(i.call(arguments)))
                                return Object(a) === a ? a : c
                            })
                        )
                    }),
                    (v.bind_instance_methods = function (e) {
                        for (var n in e) 'function' == typeof e[n] && (e[n] = v.bind(e[n], e))
                    }),
                    (v.each = function (e, n, r) {
                        if (null != e)
                            if (p && e.forEach === p) e.forEach(n, r)
                            else if (e.length === +e.length) {
                                for (var o = 0, t = e.length; o < t; o++)
                                    if (o in e && n.call(r, e[o], o, e) === g) return
                            } else for (var i in e) if (a.call(e, i) && n.call(r, e[i], i, e) === g) return
                    }),
                    (v.extend = function (e) {
                        return (
                            v.each(i.call(arguments, 1), function (n) {
                                for (var r in n) void 0 !== n[r] && (e[r] = n[r])
                            }),
                            e
                        )
                    }),
                    (v.isArray =
                        w ||
                        function (e) {
                            return '[object Array]' === c.call(e)
                        }),
                    (v.isFunction = function (e) {
                        try {
                            return /^\s*\bfunction\b/.test(e)
                        } catch (n) {
                            return !1
                        }
                    }),
                    (v.include = function (e, n) {
                        var r = !1
                        return null === e
                            ? r
                            : h && e.indexOf === h
                            ? -1 != e.indexOf(n)
                            : (v.each(e, function (e) {
                                  if (r || (r = e === n)) return g
                              }),
                              r)
                    }),
                    (v.includes = function (e, n) {
                        return -1 !== e.indexOf(n)
                    }),
                    (v.isObject = function (e) {
                        return e === Object(e) && !v.isArray(e)
                    }),
                    (v.isEmptyObject = function (e) {
                        if (v.isObject(e)) {
                            for (var n in e) if (a.call(e, n)) return !1
                            return !0
                        }
                        return !1
                    }),
                    (v.isUndefined = function (e) {
                        return void 0 === e
                    }),
                    (v.isString = function (e) {
                        return '[object String]' == c.call(e)
                    }),
                    (v.isDate = function (e) {
                        return '[object Date]' == c.call(e)
                    }),
                    (v.isNumber = function (e) {
                        return '[object Number]' == c.call(e)
                    }),
                    (v.encodeDates = function (e) {
                        return (
                            v.each(e, function (n, r) {
                                v.isDate(n) ? (e[r] = v.formatDate(n)) : v.isObject(n) && (e[r] = v.encodeDates(n))
                            }),
                            e
                        )
                    }),
                    (v.timestamp = function () {
                        return (
                            (Date.now =
                                Date.now ||
                                function () {
                                    return +new Date()
                                }),
                            Date.now()
                        )
                    }),
                    (v.formatDate = function (e) {
                        function n(e) {
                            return e < 10 ? '0' + e : e
                        }
                        return (
                            e.getUTCFullYear() +
                            '-' +
                            n(e.getUTCMonth() + 1) +
                            '-' +
                            n(e.getUTCDate()) +
                            'T' +
                            n(e.getUTCHours()) +
                            ':' +
                            n(e.getUTCMinutes()) +
                            ':' +
                            n(e.getUTCSeconds())
                        )
                    }),
                    (v.safewrap = function (n) {
                        return function () {
                            try {
                                return n.apply(this, arguments)
                            } catch (r) {
                                b.critical(
                                    'Implementation error. Please turn on debug and contact support@posthog.com.'
                                ),
                                    e.default.DEBUG && b.critical(r)
                            }
                        }
                    }),
                    (v.safewrap_class = function (e, n) {
                        for (var r = 0; r < n.length; r++) e.prototype[n[r]] = v.safewrap(e.prototype[n[r]])
                    }),
                    (v.safewrap_instance_methods = function (e) {
                        for (var n in e) 'function' == typeof e[n] && (e[n] = v.safewrap(e[n]))
                    }),
                    (v.strip_empty_properties = function (e) {
                        var n = {}
                        return (
                            v.each(e, function (e, r) {
                                v.isString(e) && e.length > 0 && (n[r] = e)
                            }),
                            n
                        )
                    })
                var y = Symbol ? Symbol('__deepCircularCopyInProgress__') : '__deepCircularCopyInProgress__'
                function m(e, n) {
                    return e !== Object(e)
                        ? n
                            ? n(e)
                            : e
                        : y in e
                        ? void 0
                        : ((e[y] = !0),
                          v.isArray(e)
                              ? ((r = []),
                                v.each(e, function (e) {
                                    r.push(m(e, n))
                                }))
                              : ((r = {}),
                                v.each(e, function (e, o) {
                                    o !== y && (r[o] = m(e, n))
                                })),
                          delete e[y],
                          r)
                    var r
                }
                ;(v.copyAndTruncateStrings = function (e, n) {
                    return m(
                        e,
                        function (e) {
                            return 'string' == typeof e && null !== n && (e = e.slice(0, n)), e
                        },
                        {}
                    )
                }),
                    (v.base64Encode = function (e) {
                        var n,
                            r,
                            o,
                            t,
                            i,
                            c = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=',
                            a = 0,
                            s = 0,
                            u = '',
                            d = []
                        if (!e) return e
                        e = v.utf8Encode(e)
                        do {
                            ;(n =
                                ((i = (e.charCodeAt(a++) << 16) | (e.charCodeAt(a++) << 8) | e.charCodeAt(a++)) >> 18) &
                                63),
                                (r = (i >> 12) & 63),
                                (o = (i >> 6) & 63),
                                (t = 63 & i),
                                (d[s++] = c.charAt(n) + c.charAt(r) + c.charAt(o) + c.charAt(t))
                        } while (a < e.length)
                        switch (((u = d.join('')), e.length % 3)) {
                            case 1:
                                u = u.slice(0, -2) + '=='
                                break
                            case 2:
                                u = u.slice(0, -1) + '='
                        }
                        return u
                    }),
                    (v.utf8Encode = function (e) {
                        var n,
                            r,
                            o,
                            t,
                            i = ''
                        for (
                            n = r = 0, o = (e = (e + '').replace(/\r\n/g, '\n').replace(/\r/g, '\n')).length, t = 0;
                            t < o;
                            t++
                        ) {
                            var c = e.charCodeAt(t),
                                a = null
                            c < 128
                                ? r++
                                : (a =
                                      c > 127 && c < 2048
                                          ? String.fromCharCode((c >> 6) | 192, (63 & c) | 128)
                                          : String.fromCharCode(
                                                (c >> 12) | 224,
                                                ((c >> 6) & 63) | 128,
                                                (63 & c) | 128
                                            )),
                                null !== a && (r > n && (i += e.substring(n, r)), (i += a), (n = r = t + 1))
                        }
                        return r > n && (i += e.substring(n, e.length)), i
                    }),
                    (v.UUID = (function () {
                        var e = function () {
                            for (var e = 1 * new Date(), n = 0; e == 1 * new Date(); ) n++
                            return e.toString(16) + n.toString(16)
                        }
                        return function () {
                            var n = (window.screen.height * window.screen.width).toString(16)
                            return (
                                e() +
                                '-' +
                                Math.random().toString(16).replace('.', '') +
                                '-' +
                                (function () {
                                    var e,
                                        n,
                                        r = l,
                                        o = [],
                                        t = 0
                                    function i(e, n) {
                                        var r,
                                            t = 0
                                        for (r = 0; r < n.length; r++) t |= o[r] << (8 * r)
                                        return e ^ t
                                    }
                                    for (e = 0; e < r.length; e++)
                                        (n = r.charCodeAt(e)),
                                            o.unshift(255 & n),
                                            o.length >= 4 && ((t = i(t, o)), (o = []))
                                    return o.length > 0 && (t = i(t, o)), t.toString(16)
                                })() +
                                '-' +
                                n +
                                '-' +
                                e()
                            )
                        }
                    })()),
                    (v.isBlockedUA = function (e) {
                        return !!/(google web preview|baiduspider|yandexbot|bingbot|googlebot|yahoo! slurp)/i.test(e)
                    }),
                    (v.HTTPBuildQuery = function (e, n) {
                        var r,
                            o,
                            t = []
                        return (
                            v.isUndefined(n) && (n = '&'),
                            v.each(e, function (e, n) {
                                ;(r = encodeURIComponent(e.toString())),
                                    (o = encodeURIComponent(n)),
                                    (t[t.length] = o + '=' + r)
                            }),
                            t.join(n)
                        )
                    }),
                    (v.getQueryParam = function (e, n) {
                        n = n.replace(/[[]/, '\\[').replace(/[\]]/, '\\]')
                        var r = new RegExp('[\\?&]' + n + '=([^&#]*)').exec(e)
                        if (null === r || (r && 'string' != typeof r[1] && r[1].length)) return ''
                        var o = r[1]
                        try {
                            o = decodeURIComponent(o)
                        } catch (t) {
                            b.error('Skipping decoding for malformed query param: ' + o)
                        }
                        return o.replace(/\+/g, ' ')
                    }),
                    (v.getHashParam = function (e, n) {
                        var r = e.match(new RegExp(n + '=([^&]*)'))
                        return r ? r[1] : null
                    }),
                    (v.register_event = (function () {
                        function e(n) {
                            return (
                                n && ((n.preventDefault = e.preventDefault), (n.stopPropagation = e.stopPropagation)), n
                            )
                        }
                        return (
                            (e.preventDefault = function () {
                                this.returnValue = !1
                            }),
                            (e.stopPropagation = function () {
                                this.cancelBubble = !0
                            }),
                            function (n, r, o, t, i) {
                                if (n)
                                    if (n.addEventListener && !t) n.addEventListener(r, o, !!i)
                                    else {
                                        var c = 'on' + r,
                                            a = n[c]
                                        n[c] = (function (n, r, o) {
                                            return function (t) {
                                                if ((t = t || e(window.event))) {
                                                    var i,
                                                        c,
                                                        a = !0
                                                    return (
                                                        v.isFunction(o) && (i = o(t)),
                                                        (c = r.call(n, t)),
                                                        (!1 !== i && !1 !== c) || (a = !1),
                                                        a
                                                    )
                                                }
                                            }
                                        })(n, o, a)
                                    }
                                else b.error('No valid element provided to register_event')
                            }
                        )
                    })()),
                    (v.info = {
                        campaignParams: function () {
                            var e = 'utm_source utm_medium utm_campaign utm_content utm_term'.split(' '),
                                n = '',
                                r = {}
                            return (
                                v.each(e, function (e) {
                                    ;(n = v.getQueryParam(d.URL, e)).length && (r[e] = n)
                                }),
                                r
                            )
                        },
                        searchEngine: function (e) {
                            return 0 === e.search('https?://(.*)google.([^/?]*)')
                                ? 'google'
                                : 0 === e.search('https?://(.*)bing.com')
                                ? 'bing'
                                : 0 === e.search('https?://(.*)yahoo.com')
                                ? 'yahoo'
                                : 0 === e.search('https?://(.*)duckduckgo.com')
                                ? 'duckduckgo'
                                : null
                        },
                        searchInfo: function (e) {
                            var n = v.info.searchEngine(e),
                                r = 'yahoo' != n ? 'q' : 'p',
                                o = {}
                            if (null !== n) {
                                o.$search_engine = n
                                var t = v.getQueryParam(e, r)
                                t.length && (o.ph_keyword = t)
                            }
                            return o
                        },
                        browser: function (e, n, r) {
                            return (
                                (n = n || ''),
                                r || v.includes(e, ' OPR/')
                                    ? v.includes(e, 'Mini')
                                        ? 'Opera Mini'
                                        : 'Opera'
                                    : /(BlackBerry|PlayBook|BB10)/i.test(e)
                                    ? 'BlackBerry'
                                    : v.includes(e, 'IEMobile') || v.includes(e, 'WPDesktop')
                                    ? 'Internet Explorer Mobile'
                                    : v.includes(e, 'SamsungBrowser/')
                                    ? 'Samsung Internet'
                                    : v.includes(e, 'Edge') || v.includes(e, 'Edg/')
                                    ? 'Microsoft Edge'
                                    : v.includes(e, 'FBIOS')
                                    ? 'Facebook Mobile'
                                    : v.includes(e, 'Chrome')
                                    ? 'Chrome'
                                    : v.includes(e, 'CriOS')
                                    ? 'Chrome iOS'
                                    : v.includes(e, 'UCWEB') || v.includes(e, 'UCBrowser')
                                    ? 'UC Browser'
                                    : v.includes(e, 'FxiOS')
                                    ? 'Firefox iOS'
                                    : v.includes(n, 'Apple')
                                    ? v.includes(e, 'Mobile')
                                        ? 'Mobile Safari'
                                        : 'Safari'
                                    : v.includes(e, 'Android')
                                    ? 'Android Mobile'
                                    : v.includes(e, 'Konqueror')
                                    ? 'Konqueror'
                                    : v.includes(e, 'Firefox')
                                    ? 'Firefox'
                                    : v.includes(e, 'MSIE') || v.includes(e, 'Trident/')
                                    ? 'Internet Explorer'
                                    : v.includes(e, 'Gecko')
                                    ? 'Mozilla'
                                    : ''
                            )
                        },
                        browserVersion: function (e, n, r) {
                            var o = {
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
                            }[v.info.browser(e, n, r)]
                            if (void 0 === o) return null
                            var t = e.match(o)
                            return t ? parseFloat(t[t.length - 2]) : null
                        },
                        os: function () {
                            var e = l
                            return /Windows/i.test(e)
                                ? /Phone/.test(e) || /WPDesktop/.test(e)
                                    ? 'Windows Phone'
                                    : 'Windows'
                                : /(iPhone|iPad|iPod)/.test(e)
                                ? 'iOS'
                                : /Android/.test(e)
                                ? 'Android'
                                : /(BlackBerry|PlayBook|BB10)/i.test(e)
                                ? 'BlackBerry'
                                : /Mac/i.test(e)
                                ? 'Mac OS X'
                                : /Linux/.test(e)
                                ? 'Linux'
                                : /CrOS/.test(e)
                                ? 'Chrome OS'
                                : ''
                        },
                        device: function (e) {
                            return /Windows Phone/i.test(e) || /WPDesktop/.test(e)
                                ? 'Windows Phone'
                                : /iPad/.test(e)
                                ? 'iPad'
                                : /iPod/.test(e)
                                ? 'iPod Touch'
                                : /iPhone/.test(e)
                                ? 'iPhone'
                                : /(BlackBerry|PlayBook|BB10)/i.test(e)
                                ? 'BlackBerry'
                                : /Android/.test(e)
                                ? 'Android'
                                : ''
                        },
                        referringDomain: function (e) {
                            var n = e.split('/')
                            return n.length >= 3 ? n[2] : ''
                        },
                        properties: function () {
                            return v.extend(
                                v.strip_empty_properties({
                                    $os: v.info.os(),
                                    $browser: v.info.browser(l, u.vendor, window.opera),
                                    $device: v.info.device(l),
                                }),
                                {
                                    $current_url: window.location.href,
                                    $host: window.location.host,
                                    $pathname: window.location.pathname,
                                    $browser_version: v.info.browserVersion(l, u.vendor, window.opera),
                                    $screen_height: window.screen.height,
                                    $screen_width: window.screen.width,
                                    $lib: 'web',
                                    $lib_version: e.default.LIB_VERSION,
                                    $insert_id:
                                        Math.random().toString(36).substring(2, 10) +
                                        Math.random().toString(36).substring(2, 10),
                                    $time: v.timestamp() / 1e3,
                                }
                            )
                        },
                        people_properties: function () {
                            return v.extend(
                                v.strip_empty_properties({
                                    $os: v.info.os(),
                                    $browser: v.info.browser(l, u.vendor, window.opera),
                                }),
                                { $browser_version: v.info.browserVersion(l, u.vendor, window.opera) }
                            )
                        },
                    }),
                    (v.isObject = v.isObject),
                    (v.isBlockedUA = v.isBlockedUA),
                    (v.isEmptyObject = v.isEmptyObject),
                    (v.info = v.info),
                    (v.info.device = v.info.device),
                    (v.info.browser = v.info.browser),
                    (v.info.browserVersion = v.info.browserVersion),
                    (v.info.properties = v.info.properties)
            },
            { './config': 'itQ5' },
        ],
        RYfg: [
            function (require, module, exports) {
                'use strict'
                Object.defineProperty(exports, '__esModule', { value: !0 }),
                    (exports.getClassName = r),
                    (exports.getSafeText = n),
                    (exports.isElementNode = o),
                    (exports.isTag = s),
                    (exports.isTextNode = i),
                    (exports.shouldCaptureDomEvent = c),
                    (exports.shouldCaptureElement = u),
                    (exports.isSensitiveElement = p),
                    (exports.shouldCaptureValue = l),
                    (exports.loadScript = d),
                    (exports.usefulElements = void 0)
                var e = require('./utils')
                function t(e) {
                    return (t =
                        'function' == typeof Symbol && 'symbol' == typeof Symbol.iterator
                            ? function (e) {
                                  return typeof e
                              }
                            : function (e) {
                                  return e &&
                                      'function' == typeof Symbol &&
                                      e.constructor === Symbol &&
                                      e !== Symbol.prototype
                                      ? 'symbol'
                                      : typeof e
                              })(e)
                }
                function r(e) {
                    switch (t(e.className)) {
                        case 'string':
                            return e.className
                        case 'object':
                            return e.className.baseVal || e.getAttribute('class') || ''
                        default:
                            return ''
                    }
                }
                function n(t) {
                    var r = ''
                    return (
                        u(t) &&
                            !p(t) &&
                            t.childNodes &&
                            t.childNodes.length &&
                            e._.each(t.childNodes, function (t) {
                                i(t) &&
                                    t.textContent &&
                                    (r += e._.trim(t.textContent)
                                        .split(/(\s+)/)
                                        .filter(l)
                                        .join('')
                                        .replace(/[\r\n]/g, ' ')
                                        .replace(/[ ]+/g, ' ')
                                        .substring(0, 255))
                            }),
                        e._.trim(r)
                    )
                }
                function o(e) {
                    return e && 1 === e.nodeType
                }
                function s(e, t) {
                    return e && e.tagName && e.tagName.toLowerCase() === t.toLowerCase()
                }
                function i(e) {
                    return e && 3 === e.nodeType
                }
                var a = ['a', 'button', 'form', 'input', 'select', 'textarea', 'label']
                function c(e, t) {
                    if (!e || s(e, 'html') || !o(e)) return !1
                    for (var r = !1, n = [e], i = !0, c = e; c.parentNode && !s(c, 'body'); )
                        if (11 !== c.parentNode.nodeType) {
                            if (!(i = c.parentNode)) break
                            if (a.indexOf(i.tagName.toLowerCase()) > -1) r = !0
                            else {
                                var u = window.getComputedStyle(i)
                                u && 'pointer' === u.getPropertyValue('cursor') && (r = !0)
                            }
                            n.push(i), (c = i)
                        } else n.push(c.parentNode.host), (c = c.parentNode.host)
                    var p = window.getComputedStyle(e)
                    if (p && 'pointer' === p.getPropertyValue('cursor') && 'click' === t.type) return !0
                    var l = e.tagName.toLowerCase()
                    switch (l) {
                        case 'html':
                            return !1
                        case 'form':
                            return 'submit' === t.type
                        case 'input':
                            return 'change' === t.type || 'click' === t.type
                        case 'select':
                        case 'textarea':
                            return 'change' === t.type || 'click' === t.type
                        default:
                            return r
                                ? 'click' === t.type
                                : 'click' === t.type &&
                                      (a.indexOf(l) > -1 || 'true' === e.getAttribute('contenteditable'))
                    }
                }
                function u(t) {
                    for (var n = t; n.parentNode && !s(n, 'body'); n = n.parentNode) {
                        var o = r(n).split(' ')
                        if (e._.includes(o, 'ph-sensitive') || e._.includes(o, 'ph-no-capture')) return !1
                    }
                    if (e._.includes(r(t).split(' '), 'ph-include')) return !0
                    var i = t.type || ''
                    if ('string' == typeof i)
                        switch (i.toLowerCase()) {
                            case 'hidden':
                            case 'password':
                                return !1
                        }
                    var a = t.name || t.id || ''
                    if ('string' == typeof a) {
                        if (
                            /^cc|cardnum|ccnum|creditcard|csc|cvc|cvv|exp|pass|pwd|routing|seccode|securitycode|securitynum|socialsec|socsec|ssn/i.test(
                                a.replace(/[^a-zA-Z0-9]/g, '')
                            )
                        )
                            return !1
                    }
                    return !0
                }
                function p(e) {
                    return !!(
                        (s(e, 'input') && 'button' != e.type) ||
                        s(e, 'select') ||
                        s(e, 'textarea') ||
                        'true' === e.getAttribute('contenteditable')
                    )
                }
                function l(t) {
                    if (null === t || e._.isUndefined(t)) return !1
                    if ('string' == typeof t) {
                        t = e._.trim(t)
                        if (
                            /^(?:(4[0-9]{12}(?:[0-9]{3})?)|(5[1-5][0-9]{14})|(6(?:011|5[0-9]{2})[0-9]{12})|(3[47][0-9]{13})|(3(?:0[0-5]|[68][0-9])[0-9]{11})|((?:2131|1800|35[0-9]{3})[0-9]{11}))$/.test(
                                (t || '').replace(/[- ]/g, '')
                            )
                        )
                            return !1
                        if (/(^\d{3}-?\d{2}-?\d{4}$)/.test(t)) return !1
                    }
                    return !0
                }
                function d(e, t) {
                    var r = document.createElement('script')
                    ;(r.type = 'text/javascript'), (r.src = e), (r.onload = t)
                    var n = document.getElementsByTagName('script')
                    n.length > 0 ? n[0].parentNode.insertBefore(r, n[0]) : document.body.appendChild(r)
                }
                exports.usefulElements = a
            },
            { './utils': 'FOZT' },
        ],
        gR3r: [
            function (require, module, exports) {
                'use strict'
                Object.defineProperty(exports, '__esModule', { value: !0 }), (exports.autocapture = void 0)
                var e = require('./utils'),
                    t = require('./autocapture-utils')
                function n(e, t) {
                    var n
                    if ('undefined' == typeof Symbol || null == e[Symbol.iterator]) {
                        if (Array.isArray(e) || (n = r(e)) || (t && e && 'number' == typeof e.length)) {
                            n && (e = n)
                            var o = 0,
                                i = function () {}
                            return {
                                s: i,
                                n: function () {
                                    return o >= e.length ? { done: !0 } : { done: !1, value: e[o++] }
                                },
                                e: function (e) {
                                    throw e
                                },
                                f: i,
                            }
                        }
                        throw new TypeError(
                            'Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.'
                        )
                    }
                    var a,
                        s = !0,
                        u = !1
                    return {
                        s: function () {
                            n = e[Symbol.iterator]()
                        },
                        n: function () {
                            var e = n.next()
                            return (s = e.done), e
                        },
                        e: function (e) {
                            ;(u = !0), (a = e)
                        },
                        f: function () {
                            try {
                                s || null == n.return || n.return()
                            } finally {
                                if (u) throw a
                            }
                        },
                    }
                }
                function r(e, t) {
                    if (e) {
                        if ('string' == typeof e) return o(e, t)
                        var n = Object.prototype.toString.call(e).slice(8, -1)
                        return (
                            'Object' === n && e.constructor && (n = e.constructor.name),
                            'Map' === n || 'Set' === n
                                ? Array.from(e)
                                : 'Arguments' === n || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)
                                ? o(e, t)
                                : void 0
                        )
                    }
                }
                function o(e, t) {
                    ;(null == t || t > e.length) && (t = e.length)
                    for (var n = 0, r = new Array(t); n < t; n++) r[n] = e[n]
                    return r
                }
                var i = {
                    _initializedTokens: [],
                    _previousElementSibling: function (e) {
                        if (e.previousElementSibling) return e.previousElementSibling
                        do {
                            e = e.previousSibling
                        } while (e && !(0, t.isElementNode)(e))
                        return e
                    },
                    _getPropertiesFromElement: function (n) {
                        var r = n.tagName.toLowerCase(),
                            o = { tag_name: r }
                        t.usefulElements.indexOf(r) > -1 && (o.$el_text = (0, t.getSafeText)(n))
                        var i = (0, t.getClassName)(n)
                        i.length > 0 &&
                            (o.classes = i.split(' ').filter(function (e) {
                                return '' !== e
                            })),
                            e._.each(n.attributes, function (e) {
                                ;((0, t.isSensitiveElement)(n) && -1 === ['name', 'id', 'class'].indexOf(e.name)) ||
                                    ((0, t.shouldCaptureValue)(e.value) && (o['attr__' + e.name] = e.value))
                            })
                        for (var a = 1, s = 1, u = n; (u = this._previousElementSibling(u)); )
                            a++, u.tagName === n.tagName && s++
                        return (o.nth_child = a), (o.nth_of_type = s), o
                    },
                    _getDefaultProperties: function (e) {
                        return { $event_type: e, $ce_version: 1 }
                    },
                    _extractCustomPropertyValue: function (n) {
                        var r = []
                        return (
                            e._.each(document.querySelectorAll(n.css_selector), function (e) {
                                var n
                                ;['input', 'select'].indexOf(e.tagName.toLowerCase()) > -1
                                    ? (n = e.value)
                                    : e.textContent && (n = e.textContent),
                                    (0, t.shouldCaptureValue)(n) && r.push(n)
                            }),
                            r.join(', ')
                        )
                    },
                    _getCustomProperties: function (n) {
                        var r = {}
                        return (
                            e._.each(
                                this._customProperties,
                                function (o) {
                                    e._.each(
                                        o.event_selectors,
                                        function (i) {
                                            var a = document.querySelectorAll(i)
                                            e._.each(
                                                a,
                                                function (i) {
                                                    e._.includes(n, i) &&
                                                        (0, t.shouldCaptureElement)(i) &&
                                                        (r[o.name] = this._extractCustomPropertyValue(o))
                                                },
                                                this
                                            )
                                        },
                                        this
                                    )
                                },
                                this
                            ),
                            r
                        )
                    },
                    _getEventTarget: function (e) {
                        return void 0 === e.target ? e.srcElement : e.target.shadowRoot ? e.composedPath()[0] : e.target
                    },
                    _captureEvent: function (n, r) {
                        var o = this._getEventTarget(n)
                        if (((0, t.isTextNode)(o) && (o = o.parentNode), (0, t.shouldCaptureDomEvent)(o, n))) {
                            for (var i = [o], a = o; a.parentNode && !(0, t.isTag)(a, 'body'); )
                                11 !== a.parentNode.nodeType
                                    ? (i.push(a.parentNode), (a = a.parentNode))
                                    : (i.push(a.parentNode.host), (a = a.parentNode.host))
                            var s,
                                u = [],
                                c = !1
                            if (
                                (e._.each(
                                    i,
                                    function (n) {
                                        var r = (0, t.shouldCaptureElement)(n)
                                        'a' === n.tagName.toLowerCase() &&
                                            ((s = n.getAttribute('href')), (s = r && (0, t.shouldCaptureValue)(s) && s))
                                        var o = (0, t.getClassName)(n).split(' ')
                                        e._.includes(o, 'ph-no-capture') && (c = !0),
                                            u.push(this._getPropertiesFromElement(n))
                                    },
                                    this
                                ),
                                (u[0].$el_text = (0, t.getSafeText)(o)),
                                s && (u[0].attr__href = s),
                                c)
                            )
                                return !1
                            var l = e._.extend(
                                this._getDefaultProperties(n.type),
                                { $elements: u },
                                this._getCustomProperties(i)
                            )
                            return r.capture('$autocapture', l), !0
                        }
                    },
                    _navigate: function (e) {
                        window.location.href = e
                    },
                    _addDomEventHandlers: function (t) {
                        var n = e._.bind(function (e) {
                            ;(e = e || window.event), this._captureEvent(e, t)
                        }, this)
                        e._.register_event(document, 'submit', n, !1, !0),
                            e._.register_event(document, 'change', n, !1, !0),
                            e._.register_event(document, 'click', n, !1, !0)
                    },
                    _customProperties: {},
                    init: function (t) {
                        t.toolbar.maybeLoadEditor()
                        var r = t.get_config('token')
                        if (this._initializedTokens.indexOf(r) > -1)
                            console.log('autocapture already initialized for token "' + r + '"')
                        else {
                            this._initializedTokens.push(r)
                            var o = e._.bind(function (e) {
                                    if (!document || !document.body)
                                        return (
                                            console.log('document not ready yet, trying again in 500 milliseconds...'),
                                            void setTimeout(function () {
                                                o(e)
                                            }, 500)
                                        )
                                    if (
                                        (t.toolbar.afterDecideResponse(e),
                                        t.sessionRecording.afterDecideResponse(e),
                                        e && e.config && !0 === e.config.enable_collect_everything
                                            ? (e.custom_properties && (this._customProperties = e.custom_properties),
                                              this._addDomEventHandlers(t))
                                            : (t.__autocapture_enabled = !1),
                                        e.featureFlags
                                            ? t.persistence &&
                                              t.persistence.register({ $active_feature_flags: e.featureFlags })
                                            : t.persistence && t.persistence.unregister('$active_feature_flags'),
                                        e.supportedCompression)
                                    ) {
                                        var r,
                                            i = {},
                                            a = n(e.supportedCompression)
                                        try {
                                            for (a.s(); !(r = a.n()).done; ) {
                                                i[r.value] = !0
                                            }
                                        } catch (s) {
                                            a.e(s)
                                        } finally {
                                            a.f()
                                        }
                                        t.compression = i
                                    } else t.compression = {}
                                }, this),
                                i = JSON.stringify({ token: r, distinct_id: t.get_distinct_id() }),
                                a = e._.base64Encode(i)
                            t._send_request(
                                t.get_config('api_host') + '/decide/',
                                { data: a },
                                { method: 'POST' },
                                t._prepare_callback(o)
                            )
                        }
                    },
                    enabledForProject: function (t, n, r) {
                        ;(n = e._.isUndefined(n) ? 10 : n), (r = e._.isUndefined(r) ? 10 : r)
                        for (var o = 0, i = 0; i < t.length; i++) o += t.charCodeAt(i)
                        return o % n < r
                    },
                    isBrowserSupported: function () {
                        return e._.isFunction(document.querySelectorAll)
                    },
                }
                ;(exports.autocapture = i), e._.bind_instance_methods(i), e._.safewrap_instance_methods(i)
            },
            { './utils': 'FOZT', './autocapture-utils': 'RYfg' },
        ],
        KZ7Y: [
            function (require, module, exports) {
                'use strict'
                Object.defineProperty(exports, '__esModule', { value: !0 }),
                    (exports.memoryStore = exports.localStore = exports.cookieStore = void 0)
                var r = require('./utils'),
                    e = /[a-z0-9][a-z0-9-]+\.[a-z.]{2,6}$/i,
                    t = {
                        get: function (r) {
                            try {
                                for (var e = r + '=', t = document.cookie.split(';'), o = 0; o < t.length; o++) {
                                    for (var n = t[o]; ' ' == n.charAt(0); ) n = n.substring(1, n.length)
                                    if (0 === n.indexOf(e)) return decodeURIComponent(n.substring(e.length, n.length))
                                }
                            } catch (c) {}
                            return null
                        },
                        parse: function (r) {
                            var e
                            try {
                                e = JSON.parse(t.get(r)) || {}
                            } catch (o) {}
                            return e
                        },
                        set: function (r, t, o, n, c) {
                            try {
                                var a = '',
                                    u = '',
                                    i = ''
                                if (n) {
                                    var l = document.location.hostname.match(e),
                                        s = l ? l[0] : ''
                                    a = s ? '; domain=.' + s : ''
                                }
                                if (o) {
                                    var p = new Date()
                                    p.setTime(p.getTime() + 24 * o * 60 * 60 * 1e3),
                                        (u = '; expires=' + p.toGMTString())
                                }
                                c && (i = '; secure')
                                var m = r + '=' + encodeURIComponent(t) + u + '; path=/' + a + i
                                return (document.cookie = m), m
                            } catch (f) {
                                return
                            }
                        },
                        remove: function (r, e) {
                            try {
                                t.set(r, '', -1, e)
                            } catch (o) {
                                return
                            }
                        },
                    }
                exports.cookieStore = t
                var o = null,
                    n = {
                        is_supported: function () {
                            if (null !== o) return o
                            var e = !0
                            try {
                                var t = '__mplssupport__'
                                n.set(t, 'xyz'), 'xyz' !== n.get(t) && (e = !1), n.remove(t)
                            } catch (c) {
                                e = !1
                            }
                            return (
                                e || r.console.error('localStorage unsupported; falling back to cookie store'),
                                (o = e),
                                e
                            )
                        },
                        error: function (e) {
                            r.console.error('localStorage error: ' + e)
                        },
                        get: function (r) {
                            try {
                                return window.localStorage.getItem(r)
                            } catch (e) {
                                n.error(e)
                            }
                            return null
                        },
                        parse: function (r) {
                            try {
                                return JSON.parse(n.get(r)) || {}
                            } catch (e) {}
                            return null
                        },
                        set: function (r, e) {
                            try {
                                window.localStorage.setItem(r, e)
                            } catch (t) {
                                n.error(t)
                            }
                        },
                        remove: function (r) {
                            try {
                                window.localStorage.removeItem(r)
                            } catch (e) {
                                n.error(e)
                            }
                        },
                    }
                exports.localStore = n
                var c = {},
                    a = {
                        is_supported: function () {
                            return !0
                        },
                        error: function (e) {
                            r.console.error('memoryStorage error: ' + e)
                        },
                        parse: function (r) {
                            return c[r] || null
                        },
                        set: function (r, e) {
                            c[r] = e
                        },
                        remove: function (r) {
                            delete c[r]
                        },
                    }
                exports.memoryStore = a
            },
            { './utils': 'FOZT' },
        ],
        rxSh: [
            function (require, module, exports) {
                'use strict'
                Object.defineProperty(exports, '__esModule', { value: !0 }),
                    (exports.optIn = n),
                    (exports.optOut = r),
                    (exports.hasOptedIn = i),
                    (exports.hasOptedOut = c),
                    (exports.addOptOutCheckPostHogLib = u),
                    (exports.addOptOutCheckPostHogPeople = s),
                    (exports.clearOptInOut = p)
                var t = require('./utils'),
                    e = require('./storage'),
                    o = '__ph_opt_in_out_'
                function n(t, e) {
                    d(!0, t, e)
                }
                function r(t, e) {
                    d(!1, t, e)
                }
                function i(t, e) {
                    return '1' === f(t, e)
                }
                function c(t, e) {
                    return !!_(e) || '0' === f(t, e)
                }
                function u(t, e) {
                    return h(
                        t,
                        function (t) {
                            return this.get_config(t)
                        },
                        e
                    )
                }
                function s(t, e) {
                    return h(
                        t,
                        function (t) {
                            return this._get_config(t)
                        },
                        e
                    )
                }
                function p(t, e) {
                    a((e = e || {})).remove(l(t, e), !!e.crossSubdomainCookie, e.cookieDomain)
                }
                function a(t) {
                    return 'localStorage' === (t = t || {}).persistenceType ? e.localStore : e.cookieStore
                }
                function l(t, e) {
                    return ((e = e || {}).persistencePrefix || o) + t
                }
                function f(t, e) {
                    return a(e).get(l(t, e))
                }
                function _(e) {
                    if (e && e.respectDnt) {
                        var o = (e && e.window) || t.window,
                            n = o.navigator || {},
                            r = !1
                        return (
                            t._.each([n.doNotTrack, n.msDoNotTrack, o.doNotTrack], function (e) {
                                t._.includes([!0, 1, '1', 'yes'], e) && (r = !0)
                            }),
                            r
                        )
                    }
                    return !1
                }
                function d(e, o, n) {
                    t._.isString(o) && o.length
                        ? (a((n = n || {})).set(
                              l(o, n),
                              e ? 1 : 0,
                              t._.isNumber(n.cookieExpiration) ? n.cookieExpiration : null,
                              !!n.crossSubdomainCookie,
                              !!n.secureCookie,
                              !!n.crossSiteCookie,
                              n.cookieDomain
                          ),
                          n.capture &&
                              e &&
                              n.capture(n.captureEventName || '$opt_in', n.captureProperties, { send_immediately: !0 }))
                        : console.error('gdpr.' + (e ? 'optIn' : 'optOut') + ' called with an invalid token')
                }
                function h(t, e, o) {
                    return function () {
                        var n = !1
                        try {
                            var r = e.call(this, 'token'),
                                i = e.call(this, 'respect_dnt'),
                                u = e.call(this, 'opt_out_capturing_persistence_type'),
                                s = e.call(this, 'opt_out_capturing_cookie_prefix'),
                                p = e.call(this, 'window')
                            r && (n = c(r, { respectDnt: i, persistenceType: u, persistencePrefix: s, window: p }))
                        } catch (l) {
                            o || console.error('Unexpected error when checking capturing opt-out status: ' + l)
                        }
                        if (!n) return t.apply(this, arguments)
                        var a = arguments[arguments.length - 1]
                        'function' == typeof a && a(0)
                    }
                }
            },
            { './utils': 'FOZT', './storage': 'KZ7Y' },
        ],
        os8r: [
            function (require, module, exports) {
                'use strict'
                Object.defineProperty(exports, '__esModule', { value: !0 }),
                    (exports.apiActions = exports.SET_ACTION = void 0)
                var e = require('./utils'),
                    t = '$set'
                exports.SET_ACTION = t
                var r = '$set_once',
                    s = {
                        set_action: function (r, s) {
                            var i = {},
                                o = {}
                            return (
                                e._.isObject(r)
                                    ? e._.each(
                                          r,
                                          function (e, t) {
                                              this._is_reserved_property(t) || (o[t] = e)
                                          },
                                          this
                                      )
                                    : (o[r] = s),
                                (i[t] = o),
                                i
                            )
                        },
                        set_once_action: function (t, s) {
                            var i = {},
                                o = {}
                            return (
                                e._.isObject(t)
                                    ? e._.each(
                                          t,
                                          function (e, t) {
                                              this._is_reserved_property(t) || (o[t] = e)
                                          },
                                          this
                                      )
                                    : (o[t] = s),
                                (i[r] = o),
                                i
                            )
                        },
                    }
                exports.apiActions = s
            },
            { './utils': 'FOZT' },
        ],
        ecEG: [
            function (require, module, exports) {
                'use strict'
                Object.defineProperty(exports, '__esModule', { value: !0 }), (exports.PostHogPeople = void 0)
                var t = require('./gdpr-utils'),
                    e = require('./api-actions'),
                    o = require('./utils'),
                    i = function () {}
                ;(exports.PostHogPeople = i),
                    o._.extend(i.prototype, e.apiActions),
                    (i.prototype._init = function (t) {
                        this._posthog = t
                    }),
                    (i.prototype.set = (0, t.addOptOutCheckPostHogPeople)(function (t, i, r) {
                        var s = this.set_action(t, i)
                        return (
                            o._.isObject(t) && (r = i),
                            this._get_config('save_referrer') &&
                                this._posthog.persistence.update_referrer_info(document.referrer),
                            (s[e.SET_ACTION] = o._.extend(
                                {},
                                o._.info.people_properties(),
                                this._posthog.persistence.get_referrer_info(),
                                s[e.SET_ACTION]
                            )),
                            this._send_request(s, r)
                        )
                    })),
                    (i.prototype.set_once = (0, t.addOptOutCheckPostHogPeople)(function (t, e, i) {
                        var r = this.set_once_action(t, e)
                        return o._.isObject(t) && (i = e), this._send_request(r, i)
                    })),
                    (i.prototype.toString = function () {
                        return this._posthog.toString() + '.people'
                    }),
                    (i.prototype._send_request = function (t, e) {
                        ;(t.$token = this._get_config('token')), (t.$distinct_id = this._posthog.get_distinct_id())
                        var i = this._posthog.get_property('$device_id'),
                            r = this._posthog.get_property('$user_id'),
                            s = this._posthog.get_property('$had_persisted_distinct_id')
                        i && (t.$device_id = i), r && (t.$user_id = r), s && (t.$had_persisted_distinct_id = s)
                        var _ = o._.encodeDates(t),
                            p = o._.copyAndTruncateStrings(_, 255),
                            n = JSON.stringify(_),
                            d = o._.base64Encode(n)
                        return (
                            this._posthog._send_request(
                                this._get_config('api_host') + '/engage/',
                                { data: d },
                                this._posthog._prepare_callback(e, p)
                            ),
                            p
                        )
                    }),
                    (i.prototype._get_config = function (t) {
                        return this._posthog.get_config(t)
                    }),
                    (i.prototype._is_reserved_property = function (t) {
                        return (
                            '$distinct_id' === t ||
                            '$token' === t ||
                            '$device_id' === t ||
                            '$user_id' === t ||
                            '$had_persisted_distinct_id' === t
                        )
                    }),
                    (i.prototype.set = i.prototype.set),
                    (i.prototype.set_once = i.prototype.set_once),
                    (i.prototype.toString = i.prototype.toString)
            },
            { './gdpr-utils': 'rxSh', './api-actions': 'os8r', './utils': 'FOZT' },
        ],
        aVqC: [
            function (require, module, exports) {
                'use strict'
                Object.defineProperty(exports, '__esModule', { value: !0 }), (exports.PostHogFeatureFlags = void 0)
                var e = require('./utils')
                function t(e, t) {
                    if (!(e instanceof t)) throw new TypeError('Cannot call a class as a function')
                }
                function r(e, t) {
                    for (var r = 0; r < t.length; r++) {
                        var n = t[r]
                        ;(n.enumerable = n.enumerable || !1),
                            (n.configurable = !0),
                            'value' in n && (n.writable = !0),
                            Object.defineProperty(e, n.key, n)
                    }
                }
                function n(e, t, n) {
                    return t && r(e.prototype, t), n && r(e, n), e
                }
                var i = (function () {
                    function r(e) {
                        t(this, r), (this.instance = e), (this._override_warning = !1)
                    }
                    return (
                        n(r, [
                            {
                                key: 'getFlags',
                                value: function () {
                                    return this.instance.get_property('$override_feature_flags')
                                        ? (this._override_warning ||
                                              console.warn(
                                                  '[PostHog] Overriding feature flags! Feature flags from server were: ' +
                                                      JSON.stringify(
                                                          this.instance.get_property('$active_feature_flags')
                                                      )
                                              ),
                                          (this._override_warning = !0),
                                          this.instance.get_property('$override_feature_flags'))
                                        : this.instance.get_property('$active_feature_flags')
                                },
                            },
                            {
                                key: 'reloadFeatureFlags',
                                value: function () {
                                    var t = this,
                                        r = this.instance.get_config('token'),
                                        n = JSON.stringify({ token: r, distinct_id: this.instance.get_distinct_id() }),
                                        i = e._.base64Encode(n)
                                    this.instance._send_request(
                                        this.instance.get_config('api_host') + '/decide/',
                                        { data: i },
                                        { method: 'POST' },
                                        this.instance._prepare_callback(function (e) {
                                            e.featureFlags
                                                ? t.instance.persistence &&
                                                  t.instance.persistence.register({
                                                      $active_feature_flags: e.featureFlags,
                                                  })
                                                : t.instance.persistence &&
                                                  t.instance.persistence.unregister('$active_feature_flags')
                                        })
                                    )
                                },
                            },
                            {
                                key: 'isFeatureEnabled',
                                value: function (e) {
                                    var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {}
                                    if (!this.getFlags())
                                        return (
                                            console.warn(
                                                'isFeatureEnabled for key "' +
                                                    e +
                                                    '" failed. Feature flags didn\'t load in time.'
                                            ),
                                            !1
                                        )
                                    var r = this.getFlags().indexOf(e) > -1
                                    return (
                                        (!t.send_event && 'send_event' in t) ||
                                            this.instance.capture('$feature_flag_called', {
                                                $feature_flag: e,
                                                $feature_flag_response: r,
                                            }),
                                        r
                                    )
                                },
                            },
                            {
                                key: 'override',
                                value: function (e) {
                                    if (!1 === e) return this.instance.persistence.unregister('$override_feature_flags')
                                    this.instance.persistence.register('$override_feature_flags', e)
                                },
                            },
                        ]),
                        r
                    )
                })()
                exports.PostHogFeatureFlags = i
            },
            { './utils': 'FOZT' },
        ],
        MAdm: [
            function (require, module, exports) {
                'use strict'
                Object.defineProperty(exports, '__esModule', { value: !0 }),
                    (exports.SESSION_ID = exports.SESSION_RECORDING_ENABLED = exports.EVENT_TIMERS_KEY = exports.CAMPAIGN_IDS_KEY = exports.ALIAS_ID_KEY = exports.PEOPLE_DISTINCT_ID_KEY = exports.SET_ONCE_QUEUE_KEY = exports.SET_QUEUE_KEY = exports.PostHogPersistence = void 0)
                var e = s(require('./config')),
                    t = require('./utils'),
                    r = require('./storage')
                function s(e) {
                    return e && e.__esModule ? e : { default: e }
                }
                var i = '__mps'
                exports.SET_QUEUE_KEY = i
                var o = '__mpso'
                exports.SET_ONCE_QUEUE_KEY = o
                var a = '__mpus',
                    p = '__mpa',
                    n = '__mpap',
                    _ = '__mpr',
                    c = '__mpu',
                    h = '$people_distinct_id'
                exports.PEOPLE_DISTINCT_ID_KEY = h
                var u = '__alias'
                exports.ALIAS_ID_KEY = u
                var d = '__cmpns'
                exports.CAMPAIGN_IDS_KEY = d
                var f = '__timers'
                exports.EVENT_TIMERS_KEY = f
                var m = '$session_recording_enabled'
                exports.SESSION_RECORDING_ENABLED = m
                var g = '$sesid'
                exports.SESSION_ID = g
                var v = [i, o, a, p, n, _, c, h, u, d, f, m, g],
                    l = function (e) {
                        ;(this.props = {}),
                            (this.campaign_params_saved = !1),
                            (this.featureFlagEventHandlers = []),
                            e.persistence_name
                                ? (this.name = 'ph_' + e.persistence_name)
                                : (this.name = 'ph_' + e.token + '_posthog')
                        var s = e.persistence
                        'cookie' !== s &&
                            'localStorage' !== s &&
                            'memory' !== s &&
                            (t.console.critical('Unknown persistence type ' + s + '; falling back to cookie'),
                            (s = e.persistence = 'cookie')),
                            'localStorage' === s && r.localStore.is_supported()
                                ? (this.storage = r.localStore)
                                : (this.storage = 'memory' === s ? r.memoryStore : r.cookieStore),
                            this.load(),
                            this.update_config(e),
                            this.upgrade(e),
                            this.save()
                    }
                ;(exports.PostHogPersistence = l),
                    (l.prototype.addFeatureFlagsHandler = function (e) {
                        return this.featureFlagEventHandlers.push(e), !0
                    }),
                    (l.prototype.receivedFeatureFlags = function (e) {
                        this.featureFlagEventHandlers.forEach(function (t) {
                            return t(e)
                        })
                    }),
                    (l.prototype.properties = function () {
                        var e = {}
                        return (
                            t._.each(this.props, function (r, s) {
                                t._.include(v, s) || (e[s] = r)
                            }),
                            e
                        )
                    }),
                    (l.prototype.load = function () {
                        if (!this.disabled) {
                            var e = this.storage.parse(this.name)
                            e && (this.props = t._.extend({}, e))
                        }
                    }),
                    (l.prototype.upgrade = function (e) {
                        var s,
                            i,
                            o = e.upgrade
                        o &&
                            ((s = 'ph_super_properties'),
                            'string' == typeof o && (s = o),
                            (i = this.storage.parse(s)),
                            this.storage.remove(s),
                            this.storage.remove(s, !0),
                            i && (this.props = t._.extend(this.props, i.all, i.events))),
                            e.cookie_name ||
                                'posthog' === e.name ||
                                ((s = 'ph_' + e.token + '_' + e.name),
                                (i = this.storage.parse(s)) &&
                                    (this.storage.remove(s), this.storage.remove(s, !0), this.register_once(i))),
                            this.storage !== r.cookieStore &&
                                ((i = r.cookieStore.parse(this.name)),
                                r.cookieStore.remove(this.name),
                                r.cookieStore.remove(this.name, !0),
                                i && this.register_once(i))
                    }),
                    (l.prototype.save = function () {
                        this.disabled ||
                            (this._expire_notification_campaigns(),
                            this.storage.set(
                                this.name,
                                JSON.stringify(this.props),
                                this.expire_days,
                                this.cross_subdomain,
                                this.secure
                            ))
                    }),
                    (l.prototype.remove = function () {
                        this.storage.remove(this.name, !1), this.storage.remove(this.name, !0)
                    }),
                    (l.prototype.clear = function () {
                        this.remove(), (this.props = {})
                    }),
                    (l.prototype.register_once = function (e, r, s) {
                        return (
                            !!t._.isObject(e) &&
                            (void 0 === r && (r = 'None'),
                            (this.expire_days = void 0 === s ? this.default_expiry : s),
                            e && e.$active_feature_flags && this.receivedFeatureFlags(e.$active_feature_flags),
                            t._.each(
                                e,
                                function (e, t) {
                                    ;(this.props.hasOwnProperty(t) && this.props[t] !== r) || (this.props[t] = e)
                                },
                                this
                            ),
                            this.save(),
                            !0)
                        )
                    }),
                    (l.prototype.register = function (e, r) {
                        return (
                            !!t._.isObject(e) &&
                            ((this.expire_days = void 0 === r ? this.default_expiry : r),
                            e && e.$active_feature_flags && this.receivedFeatureFlags(e.$active_feature_flags),
                            t._.extend(this.props, e),
                            this.save(),
                            !0)
                        )
                    }),
                    (l.prototype.unregister = function (e) {
                        e in this.props &&
                            (delete this.props[e],
                            this.save(),
                            '$active_feature_flags' === e && this.receivedFeatureFlags([]))
                    }),
                    (l.prototype._expire_notification_campaigns = t._.safewrap(function () {
                        var r = this.props[d],
                            s = e.default.DEBUG ? 6e4 : 36e5
                        if (r) {
                            for (var i in r) 1 * new Date() - r[i] > s && delete r[i]
                            t._.isEmptyObject(r) && delete this.props[d]
                        }
                    })),
                    (l.prototype.update_campaign_params = function () {
                        this.campaign_params_saved ||
                            (this.register_once(t._.info.campaignParams()), (this.campaign_params_saved = !0))
                    }),
                    (l.prototype.update_search_keyword = function (e) {
                        this.register(t._.info.searchInfo(e))
                    }),
                    (l.prototype.update_referrer_info = function (e) {
                        this.register_once(
                            {
                                $initial_referrer: e || '$direct',
                                $initial_referring_domain: t._.info.referringDomain(e) || '$direct',
                            },
                            ''
                        ),
                            this.register({
                                $referrer: e || this.props.$referrer || '$direct',
                                $referring_domain:
                                    t._.info.referringDomain(e) || this.props.$referring_domain || '$direct',
                            })
                    }),
                    (l.prototype.get_referrer_info = function () {
                        return t._.strip_empty_properties({
                            $initial_referrer: this.props.$initial_referrer,
                            $initial_referring_domain: this.props.$initial_referring_domain,
                        })
                    }),
                    (l.prototype.safe_merge = function (e) {
                        return (
                            t._.each(this.props, function (t, r) {
                                r in e || (e[r] = t)
                            }),
                            e
                        )
                    }),
                    (l.prototype.update_config = function (e) {
                        ;(this.default_expiry = this.expire_days = e.cookie_expiration),
                            this.set_disabled(e.disable_persistence),
                            this.set_cross_subdomain(e.cross_subdomain_cookie),
                            this.set_secure(e.secure_cookie)
                    }),
                    (l.prototype.set_disabled = function (e) {
                        ;(this.disabled = e), this.disabled ? this.remove() : this.save()
                    }),
                    (l.prototype.set_cross_subdomain = function (e) {
                        e !== this.cross_subdomain && ((this.cross_subdomain = e), this.remove(), this.save())
                    }),
                    (l.prototype.get_cross_subdomain = function () {
                        return this.cross_subdomain
                    }),
                    (l.prototype.set_secure = function (e) {
                        e !== this.secure && ((this.secure = !!e), this.remove(), this.save())
                    }),
                    (l.prototype.set_event_timer = function (e, t) {
                        var r = this.props[f] || {}
                        ;(r[e] = t), (this.props[f] = r), this.save()
                    }),
                    (l.prototype.remove_event_timer = function (e) {
                        var r = (this.props[f] || {})[e]
                        return t._.isUndefined(r) || (delete this.props[f][e], this.save()), r
                    })
            },
            { './config': 'itQ5', './utils': 'FOZT', './storage': 'KZ7Y' },
        ],
        vjIe: [
            function (require, module, exports) {
                'use strict'
                Object.defineProperty(exports, '__esModule', { value: !0 }), (exports.default = void 0)
                var r = require('../posthog-persistence'),
                    e = require('../utils')
                function t(r, e, t) {
                    return (
                        e in r
                            ? Object.defineProperty(r, e, { value: t, enumerable: !0, configurable: !0, writable: !0 })
                            : (r[e] = t),
                        r
                    )
                }
                function n(r, e) {
                    return l(r) || u(r, e) || i(r, e) || o()
                }
                function o() {
                    throw new TypeError(
                        'Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.'
                    )
                }
                function i(r, e) {
                    if (r) {
                        if ('string' == typeof r) return a(r, e)
                        var t = Object.prototype.toString.call(r).slice(8, -1)
                        return (
                            'Object' === t && r.constructor && (t = r.constructor.name),
                            'Map' === t || 'Set' === t
                                ? Array.from(r)
                                : 'Arguments' === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t)
                                ? a(r, e)
                                : void 0
                        )
                    }
                }
                function a(r, e) {
                    ;(null == e || e > r.length) && (e = r.length)
                    for (var t = 0, n = new Array(e); t < e; t++) n[t] = r[t]
                    return n
                }
                function u(r, e) {
                    if ('undefined' != typeof Symbol && Symbol.iterator in Object(r)) {
                        var t = [],
                            n = !0,
                            o = !1,
                            i = void 0
                        try {
                            for (
                                var a, u = r[Symbol.iterator]();
                                !(n = (a = u.next()).done) && (t.push(a.value), !e || t.length !== e);
                                n = !0
                            );
                        } catch (l) {
                            ;(o = !0), (i = l)
                        } finally {
                            try {
                                n || null == u.return || u.return()
                            } finally {
                                if (o) throw i
                            }
                        }
                        return t
                    }
                }
                function l(r) {
                    if (Array.isArray(r)) return r
                }
                var c = 18e5,
                    f = function (o, i) {
                        var a = n(o.props[r.SESSION_ID] || [0, null], 2),
                            u = a[0],
                            l = a[1]
                        return Math.abs(i - u) > c && (l = e._.UUID()), o.register(t({}, r.SESSION_ID, [i, l])), l
                    }
                exports.default = f
            },
            { '../posthog-persistence': 'MAdm', '../utils': 'FOZT' },
        ],
        Z2N4: [
            function (require, module, exports) {
                'use strict'
                Object.defineProperty(exports, '__esModule', { value: !0 }), (exports.SessionRecording = void 0)
                var e = require('../autocapture-utils'),
                    t = require('../utils'),
                    n = require('../posthog-persistence'),
                    i = s(require('./sessionid')),
                    r = s(require('../config'))
                function s(e) {
                    return e && e.__esModule ? e : { default: e }
                }
                function o(e, t, n) {
                    return (
                        t in e
                            ? Object.defineProperty(e, t, { value: n, enumerable: !0, configurable: !0, writable: !0 })
                            : (e[t] = n),
                        e
                    )
                }
                function a(e, t) {
                    if (!(e instanceof t)) throw new TypeError('Cannot call a class as a function')
                }
                function c(e, t) {
                    for (var n = 0; n < t.length; n++) {
                        var i = t[n]
                        ;(i.enumerable = i.enumerable || !1),
                            (i.configurable = !0),
                            'value' in i && (i.writable = !0),
                            Object.defineProperty(e, i.key, i)
                    }
                }
                function u(e, t, n) {
                    return t && c(e.prototype, t), n && c(e, n), e
                }
                var p = '/e/',
                    d = (function () {
                        function s(e) {
                            a(this, s),
                                (this.instance = e),
                                (this.captureStarted = !1),
                                (this.snapshots = []),
                                (this.emit = !1),
                                (this.endpoint = p),
                                (this.rrwebStopper = null)
                        }
                        return (
                            u(s, [
                                {
                                    key: 'startRecordingIfEnabled',
                                    value: function () {
                                        this.instance.get_property(n.SESSION_RECORDING_ENABLED) && this._startCapture()
                                    },
                                },
                                {
                                    key: 'afterDecideResponse',
                                    value: function (e) {
                                        this.instance.persistence &&
                                            this.instance.persistence.register(
                                                o({}, n.SESSION_RECORDING_ENABLED, !!e.sessionRecording)
                                            ),
                                            e.sessionRecording &&
                                                (e.sessionRecording.endpoint &&
                                                    (this.endpoint = e.sessionRecording.endpoint),
                                                this.submitRecordings())
                                    },
                                },
                                {
                                    key: 'submitRecordings',
                                    value: function () {
                                        var e = this
                                        ;(this.emit = !0),
                                            this._startCapture(),
                                            this.snapshots.forEach(function (t) {
                                                return e._captureSnapshot(t)
                                            })
                                    },
                                },
                                {
                                    key: 'stopRecording',
                                    value: function () {
                                        this.captureStarted &&
                                            (this.rrwebStopper(),
                                            (this.rrwebStopper = null),
                                            (this.captureStarted = !1))
                                    },
                                },
                                {
                                    key: '_startCapture',
                                    value: function () {
                                        this.captureStarted ||
                                            this.instance.get_config('disable_session_recording') ||
                                            ((this.captureStarted = !0),
                                            (0, e.loadScript)(
                                                this.instance.get_config('api_host') +
                                                    '/static/recorder.js?v=' +
                                                    r.default.LIB_VERSION,
                                                t._.bind(this._onScriptLoaded, this)
                                            ))
                                    },
                                },
                                {
                                    key: '_onScriptLoaded',
                                    value: function () {
                                        var e = this
                                        ;(this.rrwebStopper = window.rrweb.record({
                                            emit: function (t) {
                                                var n = {
                                                    $snapshot_data: t,
                                                    $session_id: (0, i.default)(e.instance.persistence, t.timestamp),
                                                }
                                                e.instance._captureMetrics.incr('rrweb-record'),
                                                    e.instance._captureMetrics.incr('rrweb-record-'.concat(t.type)),
                                                    e.emit ? e._captureSnapshot(n) : e.snapshots.push(n)
                                            },
                                            blockClass: 'ph-no-capture',
                                            ignoreClass: 'ph-ignore-input',
                                        })),
                                            this.instance._addCaptureHook(function (e) {
                                                '$pageview' === e &&
                                                    window.rrweb.record.addCustomEvent('$pageview', {
                                                        href: window.location.href,
                                                    })
                                            })
                                    },
                                },
                                {
                                    key: '_captureSnapshot',
                                    value: function (e) {
                                        this.instance.capture('$snapshot', e, {
                                            transport: 'XHR',
                                            method: 'POST',
                                            endpoint: this.endpoint,
                                            _forceCompression: !0,
                                            _noTruncate: !0,
                                            _batchKey: 'sessionRecording',
                                            _metrics: { rrweb_full_snapshot: 2 === e.$snapshot_data.type },
                                        })
                                    },
                                },
                            ]),
                            s
                        )
                    })()
                exports.SessionRecording = d
            },
            {
                '../autocapture-utils': 'RYfg',
                '../utils': 'FOZT',
                '../posthog-persistence': 'MAdm',
                './sessionid': 'vjIe',
                '../config': 'itQ5',
            },
        ],
        ZEpJ: [
            function (require, module, exports) {
                'use strict'
                Object.defineProperty(exports, '__esModule', { value: !0 }), (exports.Toolbar = void 0)
                var e = require('../autocapture-utils'),
                    t = require('../utils')
                function o(e, t) {
                    var o = Object.keys(e)
                    if (Object.getOwnPropertySymbols) {
                        var r = Object.getOwnPropertySymbols(e)
                        t &&
                            (r = r.filter(function (t) {
                                return Object.getOwnPropertyDescriptor(e, t).enumerable
                            })),
                            o.push.apply(o, r)
                    }
                    return o
                }
                function r(e) {
                    for (var t = 1; t < arguments.length; t++) {
                        var r = null != arguments[t] ? arguments[t] : {}
                        t % 2
                            ? o(Object(r), !0).forEach(function (t) {
                                  n(e, t, r[t])
                              })
                            : Object.getOwnPropertyDescriptors
                            ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r))
                            : o(Object(r)).forEach(function (t) {
                                  Object.defineProperty(e, t, Object.getOwnPropertyDescriptor(r, t))
                              })
                    }
                    return e
                }
                function n(e, t, o) {
                    return (
                        t in e
                            ? Object.defineProperty(e, t, { value: o, enumerable: !0, configurable: !0, writable: !0 })
                            : (e[t] = o),
                        e
                    )
                }
                function i(e, t) {
                    if (!(e instanceof t)) throw new TypeError('Cannot call a class as a function')
                }
                function a(e, t) {
                    for (var o = 0; o < t.length; o++) {
                        var r = t[o]
                        ;(r.enumerable = r.enumerable || !1),
                            (r.configurable = !0),
                            'value' in r && (r.writable = !0),
                            Object.defineProperty(e, r.key, r)
                    }
                }
                function s(e, t, o) {
                    return t && a(e.prototype, t), o && a(e, o), e
                }
                var c = (function () {
                    function o(e) {
                        i(this, o), (this.instance = e)
                    }
                    return (
                        s(o, [
                            {
                                key: 'afterDecideResponse',
                                value: function (e) {
                                    var t =
                                        e.editorParams || (e.toolbarVersion ? { toolbarVersion: e.toolbarVersion } : {})
                                    e.isAuthenticated &&
                                        t.toolbarVersion &&
                                        0 === t.toolbarVersion.indexOf('toolbar') &&
                                        (this._loadEditor(
                                            r(r({}, t), {}, { apiURL: this.instance.get_config('api_host') })
                                        ),
                                        this.instance.set_config({ debug: !0 }))
                                },
                            },
                            {
                                key: 'maybeLoadEditor',
                                value: function () {
                                    var e =
                                            arguments.length > 0 && void 0 !== arguments[0]
                                                ? arguments[0]
                                                : window.location,
                                        o =
                                            arguments.length > 1 && void 0 !== arguments[1]
                                                ? arguments[1]
                                                : window.localStorage,
                                        r =
                                            arguments.length > 2 && void 0 !== arguments[2]
                                                ? arguments[2]
                                                : window.history
                                    try {
                                        var n,
                                            i =
                                                t._.getHashParam(e.hash, '__posthog') ||
                                                t._.getHashParam(e.hash, 'state'),
                                            a = i ? JSON.parse(decodeURIComponent(i)) : null
                                        return (
                                            a && ('mpeditor' === a.action || 'ph_authorize' === a.action)
                                                ? (n = a) &&
                                                  Object.keys(n).length > 0 &&
                                                  (o.setItem('_postHogEditorParams', JSON.stringify(n)),
                                                  a.desiredHash
                                                      ? (e.hash = a.desiredHash)
                                                      : r
                                                      ? r.replaceState('', document.title, e.pathname + e.search)
                                                      : (e.hash = ''))
                                                : delete (n = JSON.parse(o.getItem('_postHogEditorParams') || '{}'))
                                                      .userIntent,
                                            (n.apiURL = this.instance.get_config('api_host')),
                                            !(!n.token || this.instance.get_config('token') !== n.token) &&
                                                (this._loadEditor(n), !0)
                                        )
                                    } catch (s) {
                                        return !1
                                    }
                                },
                            },
                            {
                                key: '_loadEditor',
                                value: function (o) {
                                    var r = this
                                    if (!window._postHogToolbarLoaded) {
                                        window._postHogToolbarLoaded = !0
                                        var n = o.jsURL || o.apiURL || this.instance.get_config('api_host'),
                                            i =
                                                n +
                                                (n.endsWith('/') ? '' : '/') +
                                                'static/toolbar.js?_ts=' +
                                                new Date().getTime()
                                        return (
                                            (0, e.loadScript)(i, function () {
                                                window.ph_load_editor(o)
                                            }),
                                            t._.register_event(window, 'turbolinks:load', function () {
                                                ;(window._postHogToolbarLoaded = !1), r._loadEditor(o)
                                            }),
                                            !0
                                        )
                                    }
                                    return !1
                                },
                            },
                        ]),
                        o
                    )
                })()
                exports.Toolbar = c
            },
            { '../autocapture-utils': 'RYfg', '../utils': 'FOZT' },
        ],
        Je4H: [
            function (require, module, exports) {
                'use strict'
                Object.defineProperty(exports, '__esModule', { value: !0 }), (exports.RequestQueue = void 0)
                var e = require('./utils')
                function t(e, t) {
                    var n = Object.keys(e)
                    if (Object.getOwnPropertySymbols) {
                        var r = Object.getOwnPropertySymbols(e)
                        t &&
                            (r = r.filter(function (t) {
                                return Object.getOwnPropertyDescriptor(e, t).enumerable
                            })),
                            n.push.apply(n, r)
                    }
                    return n
                }
                function n(e) {
                    for (var n = 1; n < arguments.length; n++) {
                        var i = null != arguments[n] ? arguments[n] : {}
                        n % 2
                            ? t(Object(i), !0).forEach(function (t) {
                                  r(e, t, i[t])
                              })
                            : Object.getOwnPropertyDescriptors
                            ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(i))
                            : t(Object(i)).forEach(function (t) {
                                  Object.defineProperty(e, t, Object.getOwnPropertyDescriptor(i, t))
                              })
                    }
                    return e
                }
                function r(e, t, n) {
                    return (
                        t in e
                            ? Object.defineProperty(e, t, { value: n, enumerable: !0, configurable: !0, writable: !0 })
                            : (e[t] = n),
                        e
                    )
                }
                function i(e, t) {
                    if (!(e instanceof t)) throw new TypeError('Cannot call a class as a function')
                }
                function u(e, t) {
                    for (var n = 0; n < t.length; n++) {
                        var r = t[n]
                        ;(r.enumerable = r.enumerable || !1),
                            (r.configurable = !0),
                            'value' in r && (r.writable = !0),
                            Object.defineProperty(e, r.key, r)
                    }
                }
                function o(e, t, n) {
                    return t && u(e.prototype, t), n && u(e, n), e
                }
                var l = (function () {
                    function t(e, n) {
                        var r = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : 3e3
                        i(this, t),
                            (this.captureMetrics = e),
                            (this.handlePollRequest = n),
                            (this.isPolling = !0),
                            (this._event_queue = []),
                            (this._empty_queue_count = 0),
                            (this._poller = function () {}),
                            (this._pollInterval = r)
                    }
                    return (
                        o(t, [
                            {
                                key: 'setPollInterval',
                                value: function (e) {
                                    ;(this._pollInterval = e), this.isPolling && this.poll()
                                },
                            },
                            {
                                key: 'enqueue',
                                value: function (e, t, n) {
                                    this.captureMetrics.incr('batch-enqueue'),
                                        this._event_queue.push({ url: e, data: t, options: n }),
                                        this.isPolling || ((this.isPolling = !0), this.poll())
                                },
                            },
                            {
                                key: 'poll',
                                value: function () {
                                    var t = this
                                    clearTimeout(this._poller),
                                        (this._poller = setTimeout(function () {
                                            if (t._event_queue.length > 0) {
                                                var n = t.formatQueue(),
                                                    r = function (r) {
                                                        var i = n[r],
                                                            u = i.url,
                                                            o = i.data,
                                                            l = i.options
                                                        e._.each(o, function (e, n) {
                                                            ;(o[n].offset = Math.abs(o[n].timestamp - t.getTime())),
                                                                delete o[n].timestamp
                                                        }),
                                                            t.handlePollRequest(u, o, l),
                                                            t.captureMetrics.incr('batch-requests'),
                                                            t.captureMetrics.incr(
                                                                'batch-requests-'.concat(u.slice(u.length - 2))
                                                            ),
                                                            t.captureMetrics.incr('batch-handle', o.length),
                                                            t.captureMetrics.incr(
                                                                'batch-handle-'.concat(u.slice(u.length - 2)),
                                                                o.length
                                                            )
                                                    }
                                                for (var i in n) r(i)
                                                t._event_queue.length = 0
                                            } else t._empty_queue_count++
                                            t._empty_queue_count > 4 &&
                                                ((t.isPolling = !1), (t._empty_queue_count = 0)),
                                                t.isPolling && t.poll()
                                        }, this._pollInterval))
                                },
                            },
                            {
                                key: 'updateUnloadMetrics',
                                value: function () {
                                    var e = this.formatQueue()
                                    for (var t in e) {
                                        var n = e[t],
                                            r = n.url,
                                            i = n.data
                                        this.captureMetrics.incr('batch-unload-requests'),
                                            this.captureMetrics.incr(
                                                'batch-unload-requests-'.concat(r.slice(r.length - 2))
                                            ),
                                            this.captureMetrics.incr('batch-unload', i.length),
                                            this.captureMetrics.incr(
                                                'batch-unload-'.concat(r.slice(r.length - 2)),
                                                i.length
                                            )
                                    }
                                },
                            },
                            {
                                key: 'unload',
                                value: function () {
                                    clearTimeout(this._poller)
                                    var e = this._event_queue.length > 0 ? this.formatQueue() : {}
                                    for (var t in ((this._event_queue.length = 0), e)) {
                                        var r = e[t],
                                            i = r.data,
                                            u = r.options
                                        this.handlePollRequest(t, i, n(n({}, u), {}, { transport: 'sendbeacon' }))
                                    }
                                },
                            },
                            {
                                key: 'formatQueue',
                                value: function () {
                                    var t = {}
                                    return (
                                        e._.each(this._event_queue, function (e) {
                                            var n,
                                                r = e.url,
                                                i = e.data,
                                                u = e.options,
                                                o = (u ? u._batchKey : null) || r
                                            ;(void 0 === t[o] && (t[o] = { data: [], url: r, options: u }),
                                            u && t[o].options && t[o].options._metrics) &&
                                                ((n = t[o].options._metrics)['rrweb_full_snapshot'] ||
                                                    (n.rrweb_full_snapshot = u._metrics.rrweb_full_snapshot))
                                            t[o].data.push(i)
                                        }),
                                        t
                                    )
                                },
                            },
                            {
                                key: 'getTime',
                                value: function () {
                                    return new Date().getTime()
                                },
                            },
                        ]),
                        t
                    )
                })()
                exports.RequestQueue = l
            },
            { './utils': 'FOZT' },
        ],
        TeHW: [
            function (require, module, exports) {
                'use strict'
                Object.defineProperty(exports, '__esModule', { value: !0 }), (exports.CaptureMetrics = void 0)
                var e = require('./utils')
                function t(e, t) {
                    var r = Object.keys(e)
                    if (Object.getOwnPropertySymbols) {
                        var n = Object.getOwnPropertySymbols(e)
                        t &&
                            (n = n.filter(function (t) {
                                return Object.getOwnPropertyDescriptor(e, t).enumerable
                            })),
                            r.push.apply(r, n)
                    }
                    return r
                }
                function r(e) {
                    for (var r = 1; r < arguments.length; r++) {
                        var i = null != arguments[r] ? arguments[r] : {}
                        r % 2
                            ? t(Object(i), !0).forEach(function (t) {
                                  n(e, t, i[t])
                              })
                            : Object.getOwnPropertyDescriptors
                            ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(i))
                            : t(Object(i)).forEach(function (t) {
                                  Object.defineProperty(e, t, Object.getOwnPropertyDescriptor(i, t))
                              })
                    }
                    return e
                }
                function n(e, t, r) {
                    return (
                        t in e
                            ? Object.defineProperty(e, t, { value: r, enumerable: !0, configurable: !0, writable: !0 })
                            : (e[t] = r),
                        e
                    )
                }
                function i(e, t) {
                    return c(e) || s(e, t) || a(e, t) || o()
                }
                function o() {
                    throw new TypeError(
                        'Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.'
                    )
                }
                function a(e, t) {
                    if (e) {
                        if ('string' == typeof e) return u(e, t)
                        var r = Object.prototype.toString.call(e).slice(8, -1)
                        return (
                            'Object' === r && e.constructor && (r = e.constructor.name),
                            'Map' === r || 'Set' === r
                                ? Array.from(e)
                                : 'Arguments' === r || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r)
                                ? u(e, t)
                                : void 0
                        )
                    }
                }
                function u(e, t) {
                    ;(null == t || t > e.length) && (t = e.length)
                    for (var r = 0, n = new Array(t); r < t; r++) n[r] = e[r]
                    return n
                }
                function s(e, t) {
                    if ('undefined' != typeof Symbol && Symbol.iterator in Object(e)) {
                        var r = [],
                            n = !0,
                            i = !1,
                            o = void 0
                        try {
                            for (
                                var a, u = e[Symbol.iterator]();
                                !(n = (a = u.next()).done) && (r.push(a.value), !t || r.length !== t);
                                n = !0
                            );
                        } catch (s) {
                            ;(i = !0), (o = s)
                        } finally {
                            try {
                                n || null == u.return || u.return()
                            } finally {
                                if (i) throw o
                            }
                        }
                        return r
                    }
                }
                function c(e) {
                    if (Array.isArray(e)) return e
                }
                function l(e, t) {
                    if (!(e instanceof t)) throw new TypeError('Cannot call a class as a function')
                }
                function f(e, t) {
                    for (var r = 0; r < t.length; r++) {
                        var n = t[r]
                        ;(n.enumerable = n.enumerable || !1),
                            (n.configurable = !0),
                            'value' in n && (n.writable = !0),
                            Object.defineProperty(e, n.key, n)
                    }
                }
                function h(e, t, r) {
                    return t && f(e.prototype, t), r && f(e, r), e
                }
                var b = (function () {
                    function t(e, r) {
                        var n =
                            arguments.length > 2 && void 0 !== arguments[2]
                                ? arguments[2]
                                : function () {
                                      return new Date().getTime()
                                  }
                        l(this, t),
                            (this.enabled = e),
                            (this.capture = r),
                            (this.getTime = n),
                            (this.metrics = {}),
                            (this.requests = {})
                    }
                    return (
                        h(t, [
                            {
                                key: 'incr',
                                value: function (e) {
                                    var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 1
                                    this.enabled &&
                                        ((e = 'phjs-'.concat(e)), (this.metrics[e] = (this.metrics[e] || 0) + t))
                                },
                            },
                            {
                                key: 'decr',
                                value: function (e) {
                                    this.enabled &&
                                        ((e = 'phjs-'.concat(e)), (this.metrics[e] = (this.metrics[e] || 0) - 1))
                                },
                            },
                            {
                                key: 'startRequest',
                                value: function (t) {
                                    if (this.enabled) {
                                        var r = e._.UUID()
                                        return (this.requests[r] = [this.getTime(), t]), r
                                    }
                                },
                            },
                            {
                                key: 'finishRequest',
                                value: function (e) {
                                    if (this.enabled) {
                                        var t = i(this.requests[e], 2),
                                            r = t[0],
                                            n = t[1]
                                        return (n.duration = this.getTime() - r), delete this.requests[e], n
                                    }
                                },
                            },
                            {
                                key: 'markRequestFailed',
                                value: function (e) {
                                    this.enabled && this.capture('$capture_failed_request', e)
                                },
                            },
                            {
                                key: 'captureInProgressRequests',
                                value: function () {
                                    var e = this
                                    this.enabled &&
                                        Object.keys(this.requests).forEach(function (t) {
                                            var n = e.finishRequest(t)
                                            e.markRequestFailed(r(r({}, n), {}, { type: 'inflight_at_unload' }))
                                        })
                                },
                            },
                        ]),
                        t
                    )
                })()
                exports.CaptureMetrics = b
            },
            { './utils': 'FOZT' },
        ],
        UJm1: [
            function (require, module, exports) {
                'use strict'
                Object.defineProperty(exports, '__esModule', { value: !0 }),
                    (exports.deflate = At),
                    (exports.deflateSync = Mt),
                    (exports.inflate = Ct),
                    (exports.inflateSync = Dt),
                    (exports.compress = exports.gzip = Ut),
                    (exports.compressSync = exports.gzipSync = It),
                    (exports.gunzip = Et),
                    (exports.gunzipSync = Tt),
                    (exports.zlib = Rt),
                    (exports.zlibSync = _t),
                    (exports.unzlib = Pt),
                    (exports.unzlibSync = Wt),
                    (exports.decompress = Jt),
                    (exports.decompressSync = Kt),
                    (exports.strToU8 = Qt),
                    (exports.strFromU8 = Vt),
                    (exports.zip = rn),
                    (exports.zipSync = en),
                    (exports.unzip = on),
                    (exports.unzipSync = an),
                    (exports.AsyncDecompress = exports.Decompress = exports.AsyncUnzlib = exports.Unzlib = exports.AsyncZlib = exports.Zlib = exports.AsyncGunzip = exports.Gunzip = exports.AsyncCompress = exports.AsyncGzip = exports.Compress = exports.Gzip = exports.AsyncInflate = exports.Inflate = exports.AsyncDeflate = exports.Deflate = void 0)
                var t = {},
                    n = function (n, r, e, o, i) {
                        var a = t[r] || (t[r] = URL.createObjectURL(new Blob([n], { type: 'text/javascript' }))),
                            f = new Worker(a)
                        return (
                            (f.onerror = function (t) {
                                return i(t.error, null)
                            }),
                            (f.onmessage = function (t) {
                                return i(null, t.data)
                            }),
                            f.postMessage(e, o),
                            f
                        )
                    },
                    r = Uint8Array,
                    e = Uint16Array,
                    o = Uint32Array,
                    i = new r([
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
                        0,
                        0,
                        0,
                    ]),
                    a = new r([
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
                        0,
                        0,
                    ]),
                    f = new r([16, 17, 18, 0, 8, 7, 9, 6, 10, 5, 11, 4, 12, 3, 13, 2, 14, 1, 15]),
                    s = function (t, n) {
                        for (var r = new e(31), i = 0; i < 31; ++i) r[i] = n += 1 << t[i - 1]
                        var a = new o(r[30])
                        for (i = 1; i < 30; ++i) for (var f = r[i]; f < r[i + 1]; ++f) a[f] = ((f - r[i]) << 5) | i
                        return [r, a]
                    },
                    u = s(i, 2),
                    c = u[0],
                    l = u[1]
                ;(c[28] = 258), (l[258] = 28)
                for (var h = s(a, 0), p = h[0], v = h[1], d = new e(32768), g = 0; g < 32768; ++g) {
                    var w = ((43690 & g) >>> 1) | ((21845 & g) << 1)
                    ;(w = ((61680 & (w = ((52428 & w) >>> 2) | ((13107 & w) << 2))) >>> 4) | ((3855 & w) << 4)),
                        (d[g] = (((65280 & w) >>> 8) | ((255 & w) << 8)) >>> 1)
                }
                var y = function (t, n, r) {
                        for (var o = t.length, i = 0, a = new e(n); i < o; ++i) ++a[t[i] - 1]
                        var f,
                            s = new e(n)
                        for (i = 0; i < n; ++i) s[i] = (s[i - 1] + a[i - 1]) << 1
                        if (r) {
                            f = new e(1 << n)
                            var u = 15 - n
                            for (i = 0; i < o; ++i)
                                if (t[i])
                                    for (
                                        var c = (i << 4) | t[i],
                                            l = n - t[i],
                                            h = s[t[i] - 1]++ << l,
                                            p = h | ((1 << l) - 1);
                                        h <= p;
                                        ++h
                                    )
                                        f[d[h] >>> u] = c
                        } else for (f = new e(o), i = 0; i < o; ++i) f[i] = d[s[t[i] - 1]++] >>> (15 - t[i])
                        return f
                    },
                    m = new r(288)
                for (g = 0; g < 144; ++g) m[g] = 8
                for (g = 144; g < 256; ++g) m[g] = 9
                for (g = 256; g < 280; ++g) m[g] = 7
                for (g = 280; g < 288; ++g) m[g] = 8
                var x = new r(32)
                for (g = 0; g < 32; ++g) x[g] = 5
                var b = y(m, 9, 0),
                    z = y(m, 9, 1),
                    A = y(x, 5, 0),
                    M = y(x, 5, 1),
                    S = function (t) {
                        for (var n = t[0], r = 1; r < t.length; ++r) t[r] > n && (n = t[r])
                        return n
                    },
                    k = function (t, n, r) {
                        var e = n >>> 3
                        return ((t[e] | (t[e + 1] << 8)) >>> (7 & n)) & r
                    },
                    C = function (t, n) {
                        var r = n >>> 3
                        return (t[r] | (t[r + 1] << 8) | (t[r + 2] << 16)) >>> (7 & n)
                    },
                    D = function (t) {
                        return (t >>> 3) + (7 & t && 1)
                    },
                    G = function (t, n, i) {
                        ;(null == n || n < 0) && (n = 0), (null == i || i > t.length) && (i = t.length)
                        var a = new (t instanceof e ? e : t instanceof o ? o : r)(i - n)
                        return a.set(t.subarray(n, i)), a
                    },
                    O = function (t, n, e) {
                        var o = !e || e.i
                        e || (e = {})
                        var s = t.length,
                            u = !n || !o
                        n || (n = new r(3 * s))
                        var l = function (t) {
                                var e = n.length
                                if (t > e) {
                                    var o = new r(Math.max(e << 1, t))
                                    o.set(n), (n = o)
                                }
                            },
                            h = e.f || 0,
                            v = e.p || 0,
                            d = e.b || 0,
                            g = e.l,
                            w = e.d,
                            m = e.m,
                            x = e.n
                        if (h && !g) return n
                        var b = s << 3
                        do {
                            if (!g) {
                                e.f = h = k(t, v, 1)
                                var A = k(t, v + 1, 3)
                                if (((v += 3), !A)) {
                                    var O = t[(B = D(v) + 4) - 4] | (t[B - 3] << 8),
                                        U = B + O
                                    if (U > s) {
                                        if (o) throw 'unexpected EOF'
                                        break
                                    }
                                    u && l(d + O), n.set(t.subarray(B, U), d), (e.b = d += O), (e.p = v = U << 3)
                                    continue
                                }
                                if (1 == A) (g = z), (w = M), (m = 9), (x = 5)
                                else {
                                    if (2 != A) throw 'invalid block type'
                                    var I = k(t, v, 31) + 257,
                                        F = k(t, v + 10, 15) + 4,
                                        Z = I + k(t, v + 5, 31) + 1
                                    v += 14
                                    for (var E = new r(Z), T = new r(19), j = 0; j < F; ++j)
                                        T[f[j]] = k(t, v + 3 * j, 7)
                                    v += 3 * F
                                    var L = S(T),
                                        R = (1 << L) - 1
                                    if (!o && v + Z * (L + 7) > b) break
                                    var _ = y(T, L, 1)
                                    for (j = 0; j < Z; ) {
                                        var B,
                                            H = _[k(t, v, R)]
                                        if (((v += 15 & H), (B = H >>> 4) < 16)) E[j++] = B
                                        else {
                                            var P = 0,
                                                W = 0
                                            for (
                                                16 == B
                                                    ? ((W = 3 + k(t, v, 3)), (v += 2), (P = E[j - 1]))
                                                    : 17 == B
                                                    ? ((W = 3 + k(t, v, 7)), (v += 3))
                                                    : 18 == B && ((W = 11 + k(t, v, 127)), (v += 7));
                                                W--;

                                            )
                                                E[j++] = P
                                        }
                                    }
                                    var Y = E.subarray(0, I),
                                        q = E.subarray(I)
                                    ;(m = S(Y)), (x = S(q)), (g = y(Y, m, 1)), (w = y(q, x, 1))
                                }
                                if (v > b) throw 'unexpected EOF'
                            }
                            u && l(d + 131072)
                            for (var J = (1 << m) - 1, K = (1 << x) - 1, N = m + x + 18; o || v + N < b; ) {
                                var Q = (P = g[C(t, v) & J]) >>> 4
                                if ((v += 15 & P) > b) throw 'unexpected EOF'
                                if (!P) throw 'invalid length/literal'
                                if (Q < 256) n[d++] = Q
                                else {
                                    if (256 == Q) {
                                        g = null
                                        break
                                    }
                                    var V = Q - 254
                                    if (Q > 264) {
                                        var X = i[(j = Q - 257)]
                                        ;(V = k(t, v, (1 << X) - 1) + c[j]), (v += X)
                                    }
                                    var $ = w[C(t, v) & K],
                                        tt = $ >>> 4
                                    if (!$) throw 'invalid distance'
                                    v += 15 & $
                                    q = p[tt]
                                    if (tt > 3) {
                                        X = a[tt]
                                        ;(q += C(t, v) & ((1 << X) - 1)), (v += X)
                                    }
                                    if (v > b) throw 'unexpected EOF'
                                    u && l(d + 131072)
                                    for (var nt = d + V; d < nt; d += 4)
                                        (n[d] = n[d - q]),
                                            (n[d + 1] = n[d + 1 - q]),
                                            (n[d + 2] = n[d + 2 - q]),
                                            (n[d + 3] = n[d + 3 - q])
                                    d = nt
                                }
                            }
                            ;(e.l = g), (e.p = v), (e.b = d), g && ((h = 1), (e.m = m), (e.d = w), (e.n = x))
                        } while (!h)
                        return d == n.length ? n : G(n, 0, d)
                    },
                    U = function (t, n, r) {
                        r <<= 7 & n
                        var e = n >>> 3
                        ;(t[e] |= r), (t[e + 1] |= r >>> 8)
                    },
                    I = function (t, n, r) {
                        r <<= 7 & n
                        var e = n >>> 3
                        ;(t[e] |= r), (t[e + 1] |= r >>> 8), (t[e + 2] |= r >>> 16)
                    },
                    F = function (t, n) {
                        for (var o = [], i = 0; i < t.length; ++i) t[i] && o.push({ s: i, f: t[i] })
                        var a = o.length,
                            f = o.slice()
                        if (!a) return [new r(0), 0]
                        if (1 == a) {
                            var s = new r(o[0].s + 1)
                            return (s[o[0].s] = 1), [s, 1]
                        }
                        o.sort(function (t, n) {
                            return t.f - n.f
                        }),
                            o.push({ s: -1, f: 25001 })
                        var u = o[0],
                            c = o[1],
                            l = 0,
                            h = 1,
                            p = 2
                        for (o[0] = { s: -1, f: u.f + c.f, l: u, r: c }; h != a - 1; )
                            (u = o[o[l].f < o[p].f ? l++ : p++]),
                                (c = o[l != h && o[l].f < o[p].f ? l++ : p++]),
                                (o[h++] = { s: -1, f: u.f + c.f, l: u, r: c })
                        var v = f[0].s
                        for (i = 1; i < a; ++i) f[i].s > v && (v = f[i].s)
                        var d = new e(v + 1),
                            g = Z(o[h - 1], d, 0)
                        if (g > n) {
                            i = 0
                            var w = 0,
                                y = g - n,
                                m = 1 << y
                            for (
                                f.sort(function (t, n) {
                                    return d[n.s] - d[t.s] || t.f - n.f
                                });
                                i < a;
                                ++i
                            ) {
                                var x = f[i].s
                                if (!(d[x] > n)) break
                                ;(w += m - (1 << (g - d[x]))), (d[x] = n)
                            }
                            for (w >>>= y; w > 0; ) {
                                var b = f[i].s
                                d[b] < n ? (w -= 1 << (n - d[b]++ - 1)) : ++i
                            }
                            for (; i >= 0 && w; --i) {
                                var z = f[i].s
                                d[z] == n && (--d[z], ++w)
                            }
                            g = n
                        }
                        return [new r(d), g]
                    },
                    Z = function (t, n, r) {
                        return -1 == t.s ? Math.max(Z(t.l, n, r + 1), Z(t.r, n, r + 1)) : (n[t.s] = r)
                    },
                    E = function (t) {
                        for (var n = t.length; n && !t[--n]; );
                        for (
                            var r = new e(++n),
                                o = 0,
                                i = t[0],
                                a = 1,
                                f = function (t) {
                                    r[o++] = t
                                },
                                s = 1;
                            s <= n;
                            ++s
                        )
                            if (t[s] == i && s != n) ++a
                            else {
                                if (!i && a > 2) {
                                    for (; a > 138; a -= 138) f(32754)
                                    a > 2 && (f(a > 10 ? ((a - 11) << 5) | 28690 : ((a - 3) << 5) | 12305), (a = 0))
                                } else if (a > 3) {
                                    for (f(i), --a; a > 6; a -= 6) f(8304)
                                    a > 2 && (f(((a - 3) << 5) | 8208), (a = 0))
                                }
                                for (; a--; ) f(i)
                                ;(a = 1), (i = t[s])
                            }
                        return [r.subarray(0, o), n]
                    },
                    T = function (t, n) {
                        for (var r = 0, e = 0; e < n.length; ++e) r += t[e] * n[e]
                        return r
                    },
                    j = function (t, n, r) {
                        var e = r.length,
                            o = D(n + 2)
                        ;(t[o] = 255 & e), (t[o + 1] = e >>> 8), (t[o + 2] = 255 ^ t[o]), (t[o + 3] = 255 ^ t[o + 1])
                        for (var i = 0; i < e; ++i) t[o + i + 4] = r[i]
                        return (o + 4 + e) << 3
                    },
                    L = function (t, n, r, o, s, u, c, l, h, p, v) {
                        U(n, v++, r), ++s[256]
                        for (
                            var d = F(s, 15),
                                g = d[0],
                                w = d[1],
                                z = F(u, 15),
                                M = z[0],
                                S = z[1],
                                k = E(g),
                                C = k[0],
                                D = k[1],
                                G = E(M),
                                O = G[0],
                                Z = G[1],
                                L = new e(19),
                                R = 0;
                            R < C.length;
                            ++R
                        )
                            L[31 & C[R]]++
                        for (R = 0; R < O.length; ++R) L[31 & O[R]]++
                        for (var _ = F(L, 7), B = _[0], H = _[1], P = 19; P > 4 && !B[f[P - 1]]; --P);
                        var W,
                            Y,
                            q,
                            J,
                            K = (p + 5) << 3,
                            N = T(s, m) + T(u, x) + c,
                            Q = T(s, g) + T(u, M) + c + 14 + 3 * P + T(L, B) + (2 * L[16] + 3 * L[17] + 7 * L[18])
                        if (K <= N && K <= Q) return j(n, v, t.subarray(h, h + p))
                        if ((U(n, v, 1 + (Q < N)), (v += 2), Q < N)) {
                            ;(W = y(g, w, 0)), (Y = g), (q = y(M, S, 0)), (J = M)
                            var V = y(B, H, 0)
                            U(n, v, D - 257), U(n, v + 5, Z - 1), U(n, v + 10, P - 4), (v += 14)
                            for (R = 0; R < P; ++R) U(n, v + 3 * R, B[f[R]])
                            v += 3 * P
                            for (var X = [C, O], $ = 0; $ < 2; ++$) {
                                var tt = X[$]
                                for (R = 0; R < tt.length; ++R) {
                                    var nt = 31 & tt[R]
                                    U(n, v, V[nt]),
                                        (v += B[nt]),
                                        nt > 15 && (U(n, v, (tt[R] >>> 5) & 127), (v += tt[R] >>> 12))
                                }
                            }
                        } else (W = b), (Y = m), (q = A), (J = x)
                        for (R = 0; R < l; ++R)
                            if (o[R] > 255) {
                                nt = (o[R] >>> 18) & 31
                                I(n, v, W[nt + 257]),
                                    (v += Y[nt + 257]),
                                    nt > 7 && (U(n, v, (o[R] >>> 23) & 31), (v += i[nt]))
                                var rt = 31 & o[R]
                                I(n, v, q[rt]), (v += J[rt]), rt > 3 && (I(n, v, (o[R] >>> 5) & 8191), (v += a[rt]))
                            } else I(n, v, W[o[R]]), (v += Y[o[R]])
                        return I(n, v, W[256]), v + Y[256]
                    },
                    R = new o([65540, 131080, 131088, 131104, 262176, 1048704, 1048832, 2114560, 2117632]),
                    _ = new r(0),
                    B = function (t, n, f, s, u, c) {
                        var h = t.length,
                            p = new r(s + h + 5 * (1 + Math.floor(h / 7e3)) + u),
                            d = p.subarray(s, p.length - u),
                            g = 0
                        if (!n || h < 8)
                            for (var w = 0; w <= h; w += 65535) {
                                var y = w + 65535
                                y < h ? (g = j(d, g, t.subarray(w, y))) : ((d[w] = c), (g = j(d, g, t.subarray(w, h))))
                            }
                        else {
                            for (
                                var m = R[n - 1],
                                    x = m >>> 13,
                                    b = 8191 & m,
                                    z = (1 << f) - 1,
                                    A = new e(32768),
                                    M = new e(z + 1),
                                    S = Math.ceil(f / 3),
                                    k = 2 * S,
                                    C = function (n) {
                                        return (t[n] ^ (t[n + 1] << S) ^ (t[n + 2] << k)) & z
                                    },
                                    O = new o(25e3),
                                    U = new e(288),
                                    I = new e(32),
                                    F = 0,
                                    Z = 0,
                                    E = ((w = 0), 0),
                                    T = 0,
                                    B = 0;
                                w < h;
                                ++w
                            ) {
                                var H = C(w),
                                    P = 32767 & w,
                                    W = M[H]
                                if (((A[P] = W), (M[H] = P), T <= w)) {
                                    var Y = h - w
                                    if ((F > 7e3 || E > 24576) && Y > 423) {
                                        ;(g = L(t, d, 0, O, U, I, Z, E, B, w - B, g)), (E = F = Z = 0), (B = w)
                                        for (var q = 0; q < 286; ++q) U[q] = 0
                                        for (q = 0; q < 30; ++q) I[q] = 0
                                    }
                                    var J = 2,
                                        K = 0,
                                        N = b,
                                        Q = (P - W) & 32767
                                    if (Y > 2 && H == C(w - Q))
                                        for (
                                            var V = Math.min(x, Y) - 1, X = Math.min(32767, w), $ = Math.min(258, Y);
                                            Q <= X && --N && P != W;

                                        ) {
                                            if (t[w + J] == t[w + J - Q]) {
                                                for (var tt = 0; tt < $ && t[w + tt] == t[w + tt - Q]; ++tt);
                                                if (tt > J) {
                                                    if (((J = tt), (K = Q), tt > V)) break
                                                    var nt = Math.min(Q, tt - 2),
                                                        rt = 0
                                                    for (q = 0; q < nt; ++q) {
                                                        var et = (w - Q + q + 32768) & 32767,
                                                            ot = (et - A[et] + 32768) & 32767
                                                        ot > rt && ((rt = ot), (W = et))
                                                    }
                                                }
                                            }
                                            Q += ((P = W) - (W = A[P]) + 32768) & 32767
                                        }
                                    if (K) {
                                        O[E++] = 268435456 | (l[J] << 18) | v[K]
                                        var it = 31 & l[J],
                                            at = 31 & v[K]
                                        ;(Z += i[it] + a[at]), ++U[257 + it], ++I[at], (T = w + J), ++F
                                    } else (O[E++] = t[w]), ++U[t[w]]
                                }
                            }
                            ;(g = L(t, d, c, O, U, I, Z, E, B, w - B, g)), c || (g = j(d, g, _))
                        }
                        return G(p, 0, s + D(g) + u)
                    },
                    H = new o(256)
                for (g = 0; g < 256; ++g) {
                    for (var P = g, W = 9; --W; ) P = (1 & P && 3988292384) ^ (P >>> 1)
                    H[g] = P
                }
                var Y = function () {
                        var t = 4294967295
                        return {
                            p: function (n) {
                                for (var r = t, e = 0; e < n.length; ++e) r = H[(255 & r) ^ n[e]] ^ (r >>> 8)
                                t = r
                            },
                            d: function () {
                                return 4294967295 ^ t
                            },
                        }
                    },
                    q = function () {
                        var t = 1,
                            n = 0
                        return {
                            p: function (r) {
                                for (var e = t, o = n, i = r.length, a = 0; a != i; ) {
                                    for (var f = Math.min(a + 5552, i); a < f; ++a) o += e += r[a]
                                    ;(e %= 65521), (o %= 65521)
                                }
                                ;(t = e), (n = o)
                            },
                            d: function () {
                                return ((255 & t) << 24) | ((t >>> 8) << 16) | ((255 & n) << 8) | (n >>> 8)
                            },
                        }
                    },
                    J = function (t, n, r, e, o) {
                        return B(
                            t,
                            null == n.level ? 6 : n.level,
                            null == n.mem ? Math.ceil(1.5 * Math.max(8, Math.min(13, Math.log(t.length)))) : 12 + n.mem,
                            r,
                            e,
                            !o
                        )
                    },
                    K = function (t, n) {
                        var r = {}
                        for (var e in t) r[e] = t[e]
                        for (var e in n) r[e] = n[e]
                        return r
                    },
                    N = function (t, n, r) {
                        for (
                            var e = t(),
                                o = t.toString(),
                                i = o
                                    .slice(o.indexOf('[') + 1, o.lastIndexOf(']'))
                                    .replace(/ /g, '')
                                    .split(','),
                                a = 0;
                            a < e.length;
                            ++a
                        ) {
                            var f = e[a],
                                s = i[a]
                            if ('function' == typeof f) {
                                n += ';' + s + '='
                                var u = f.toString()
                                if (f.prototype)
                                    if (-1 != u.indexOf('[native code]')) n += u.slice(9, u.indexOf('(', 11))
                                    else
                                        for (var c in ((n += u), f.prototype))
                                            n += ';' + s + '.prototype.' + c + '=' + f.prototype[c].toString()
                                else n += u
                            } else r[s] = f
                        }
                        return [n, r]
                    },
                    Q = function (t) {
                        for (var n in t.data[0]) self[n] = t.data[0][n]
                        onmessage = new Function('return ' + t.data[1])()
                    },
                    V = [],
                    X = function (t) {
                        var n = []
                        for (var i in t)
                            (t[i] instanceof r || t[i] instanceof e || t[i] instanceof o) &&
                                n.push((t[i] = new t[i].constructor(t[i])).buffer)
                        return n
                    },
                    $ = function (t, r, e, o) {
                        var i
                        if (!V[e]) {
                            for (var a = '', f = {}, s = t.length - 1, u = 0; u < s; ++u)
                                (a = (i = N(t[u], a, f))[0]), (f = i[1])
                            V[e] = N(t[s], a, f)
                        }
                        var c = K({}, V[e][1])
                        return n(V[e][0] + ';onmessage=' + Q.toString(), e, [c, r.toString()], X(c), o)
                    },
                    tt = function () {
                        return [r, e, o, i, a, f, c, p, z, M, d, y, S, k, C, D, G, O, Dt, at, ft]
                    },
                    nt = function () {
                        return [
                            r,
                            e,
                            o,
                            i,
                            a,
                            f,
                            l,
                            v,
                            b,
                            m,
                            A,
                            x,
                            d,
                            R,
                            _,
                            y,
                            U,
                            I,
                            F,
                            Z,
                            E,
                            T,
                            j,
                            L,
                            D,
                            G,
                            B,
                            J,
                            Mt,
                            at,
                        ]
                    },
                    rt = function () {
                        return [vt, wt, pt, Y, H]
                    },
                    et = function () {
                        return [dt, gt]
                    },
                    ot = function () {
                        return [yt, pt, q]
                    },
                    it = function () {
                        return [mt]
                    },
                    at = function (t) {
                        return postMessage(t, [t.buffer])
                    },
                    ft = function (t) {
                        return t && t.size && new r(t.size)
                    },
                    st = function (t, n, e, o, i, a) {
                        var f = $(e, o, i, function (t, n) {
                            f.terminate(), a(t, n)
                        })
                        return (
                            n.consume || (t = new r(t)),
                            f.postMessage([t, n], [t.buffer]),
                            function () {
                                f.terminate()
                            }
                        )
                    },
                    ut = function (t) {
                        return (
                            (t.ondata = function (t, n) {
                                return postMessage([t, n], [t.buffer])
                            }),
                            function (n) {
                                return t.push(n.data[0], n.data[1])
                            }
                        )
                    },
                    ct = function (t, n, r, e, o) {
                        var i,
                            a = $(t, e, o, function (t, r) {
                                t
                                    ? (a.terminate(), n.ondata.call(n, t))
                                    : (r[1] && a.terminate(), n.ondata.call(n, t, r[0], r[1]))
                            })
                        a.postMessage(r),
                            (n.push = function (t, r) {
                                if (i) throw 'stream finished'
                                if (!n.ondata) throw 'no stream handler'
                                a.postMessage([t, (i = r)], [t.buffer])
                            }),
                            (n.terminate = function () {
                                a.terminate()
                            })
                    },
                    lt = function (t, n) {
                        return t[n] | (t[n + 1] << 8)
                    },
                    ht = function (t, n) {
                        return t[n] | (t[n + 1] << 8) | (t[n + 2] << 16) | (t[n + 3] << 24)
                    },
                    pt = function (t, n, r) {
                        for (; r; ++n) (t[n] = r), (r >>>= 8)
                    },
                    vt = function (t, n) {
                        var r = n.filename
                        if (
                            ((t[0] = 31),
                            (t[1] = 139),
                            (t[2] = 8),
                            (t[8] = n.level < 2 ? 4 : 9 == n.level ? 2 : 0),
                            (t[9] = 3),
                            0 != n.mtime && pt(t, 4, Math.floor(new Date(n.mtime || Date.now()) / 1e3)),
                            r)
                        ) {
                            t[3] = 8
                            for (var e = 0; e <= r.length; ++e) t[e + 10] = r.charCodeAt(e)
                        }
                    },
                    dt = function (t) {
                        if (31 != t[0] || 139 != t[1] || 8 != t[2]) throw 'invalid gzip data'
                        var n = t[3],
                            r = 10
                        4 & n && (r += t[10] | (2 + (t[11] << 8)))
                        for (var e = ((n >> 3) & 1) + ((n >> 4) & 1); e > 0; e -= !t[r++]);
                        return r + (2 & n)
                    },
                    gt = function (t) {
                        var n = t.length
                        return t[n - 4] | (t[n - 3] << 8) | (t[n - 2] << 16) | (t[n - 1] << 24)
                    },
                    wt = function (t) {
                        return 10 + ((t.filename && t.filename.length + 1) || 0)
                    },
                    yt = function (t, n) {
                        var r = n.level,
                            e = 0 == r ? 0 : r < 6 ? 1 : 9 == r ? 3 : 2
                        ;(t[0] = 120), (t[1] = (e << 6) | (e ? 32 - 2 * e : 1))
                    },
                    mt = function (t) {
                        if (8 != (15 & t[0]) || t[0] >>> 4 > 7 || ((t[0] << 8) | t[1]) % 31) throw 'invalid zlib data'
                        if (32 & t[1]) throw 'invalid zlib data: preset dictionaries not supported'
                    }
                function xt(t, n) {
                    return n || 'function' != typeof t || ((n = t), (t = {})), (this.ondata = n), t
                }
                var bt = (function () {
                    function t(t, n) {
                        n || 'function' != typeof t || ((n = t), (t = {})), (this.ondata = n), (this.o = t || {})
                    }
                    return (
                        (t.prototype.p = function (t, n) {
                            this.ondata(J(t, this.o, 0, 0, !n), n)
                        }),
                        (t.prototype.push = function (t, n) {
                            if (this.d) throw 'stream finished'
                            if (!this.ondata) throw 'no stream handler'
                            ;(this.d = n), this.p(t, n || !1)
                        }),
                        t
                    )
                })()
                exports.Deflate = bt
                var zt = (function () {
                    return function (t, n) {
                        ct(
                            [
                                nt,
                                function () {
                                    return [ut, bt]
                                },
                            ],
                            this,
                            xt.call(this, t, n),
                            function (t) {
                                var n = new bt(t.data)
                                onmessage = ut(n)
                            },
                            6
                        )
                    }
                })()
                function At(t, n, r) {
                    if ((r || ((r = n), (n = {})), 'function' != typeof r)) throw 'no callback'
                    return st(
                        t,
                        n,
                        [nt],
                        function (t) {
                            return at(Mt(t.data[0], t.data[1]))
                        },
                        0,
                        r
                    )
                }
                function Mt(t, n) {
                    return void 0 === n && (n = {}), J(t, n, 0, 0)
                }
                exports.AsyncDeflate = zt
                var St = (function () {
                    function t(t) {
                        ;(this.s = {}), (this.p = new r(0)), (this.ondata = t)
                    }
                    return (
                        (t.prototype.e = function (t) {
                            if (this.d) throw 'stream finished'
                            if (!this.ondata) throw 'no stream handler'
                            var n = this.p.length,
                                e = new r(n + t.length)
                            e.set(this.p), e.set(t, n), (this.p = e)
                        }),
                        (t.prototype.c = function (t, n) {
                            this.d = this.s.i = n
                            var r = this.s.b,
                                e = O(this.p, this.o, this.s)
                            this.ondata(G(e, r, this.s.b), n || !1),
                                (this.o = G(e, this.s.b - 32768)),
                                (this.s.b = 32768),
                                (this.p = G(this.p, this.s.p >>> 3)),
                                (this.s.p &= 7)
                        }),
                        (t.prototype.push = function (t, n) {
                            this.e(t), this.c(t, n)
                        }),
                        t
                    )
                })()
                exports.Inflate = St
                var kt = (function () {
                    return function (t) {
                        ;(this.ondata = t),
                            ct(
                                [
                                    tt,
                                    function () {
                                        return [ut, St]
                                    },
                                ],
                                this,
                                0,
                                function () {
                                    var t = new St()
                                    onmessage = ut(t)
                                },
                                7
                            )
                    }
                })()
                function Ct(t, n, r) {
                    if ((r || ((r = n), (n = {})), 'function' != typeof r)) throw 'no callback'
                    return st(
                        t,
                        n,
                        [tt],
                        function (t) {
                            return at(Dt(t.data[0], ft(t.data[1])))
                        },
                        1,
                        r
                    )
                }
                function Dt(t, n) {
                    return O(t, n)
                }
                exports.AsyncInflate = kt
                var Gt = (function () {
                    function t(t, n) {
                        ;(this.c = Y()), (this.l = 0), (this.v = 1), bt.call(this, t, n)
                    }
                    return (
                        (t.prototype.push = function (t, n) {
                            bt.prototype.push.call(this, t, n)
                        }),
                        (t.prototype.p = function (t, n) {
                            this.c.p(t), (this.l += t.length)
                            var r = J(t, this.o, this.v && wt(this.o), n && 8, !n)
                            this.v && (vt(r, this.o), (this.v = 0)),
                                n && (pt(r, r.length - 8, this.c.d()), pt(r, r.length - 4, this.l)),
                                this.ondata(r, n)
                        }),
                        t
                    )
                })()
                exports.Compress = exports.Gzip = Gt
                var Ot = (function () {
                    return function (t, n) {
                        ct(
                            [
                                nt,
                                rt,
                                function () {
                                    return [ut, bt, Gt]
                                },
                            ],
                            this,
                            xt.call(this, t, n),
                            function (t) {
                                var n = new Gt(t.data)
                                onmessage = ut(n)
                            },
                            8
                        )
                    }
                })()
                function Ut(t, n, r) {
                    if ((r || ((r = n), (n = {})), 'function' != typeof r)) throw 'no callback'
                    return st(
                        t,
                        n,
                        [
                            nt,
                            rt,
                            function () {
                                return [It]
                            },
                        ],
                        function (t) {
                            return at(It(t.data[0], t.data[1]))
                        },
                        2,
                        r
                    )
                }
                function It(t, n) {
                    void 0 === n && (n = {})
                    var r = Y(),
                        e = t.length
                    r.p(t)
                    var o = J(t, n, wt(n), 8),
                        i = o.length
                    return vt(o, n), pt(o, i - 8, r.d()), pt(o, i - 4, e), o
                }
                exports.AsyncCompress = exports.AsyncGzip = Ot
                var Ft = (function () {
                    function t(t) {
                        ;(this.v = 1), St.call(this, t)
                    }
                    return (
                        (t.prototype.push = function (t, n) {
                            if ((St.prototype.e.call(this, t), this.v)) {
                                var r = dt(this.p)
                                if (r >= this.p.length && !n) return
                                ;(this.p = this.p.subarray(r)), (this.v = 0)
                            }
                            if (n) {
                                if (this.p.length < 8) throw 'invalid gzip stream'
                                this.p = this.p.subarray(0, -8)
                            }
                            St.prototype.c.call(this, t, n)
                        }),
                        t
                    )
                })()
                exports.Gunzip = Ft
                var Zt = (function () {
                    return function (t) {
                        ;(this.ondata = t),
                            ct(
                                [
                                    tt,
                                    et,
                                    function () {
                                        return [ut, St, Ft]
                                    },
                                ],
                                this,
                                0,
                                function () {
                                    var t = new Ft()
                                    onmessage = ut(t)
                                },
                                9
                            )
                    }
                })()
                function Et(t, n, r) {
                    if ((r || ((r = n), (n = {})), 'function' != typeof r)) throw 'no callback'
                    return st(
                        t,
                        n,
                        [
                            tt,
                            et,
                            function () {
                                return [Tt]
                            },
                        ],
                        function (t) {
                            return at(Tt(t.data[0]))
                        },
                        3,
                        r
                    )
                }
                function Tt(t, n) {
                    return O(t.subarray(dt(t), -8), n || new r(gt(t)))
                }
                exports.AsyncGunzip = Zt
                var jt = (function () {
                    function t(t, n) {
                        ;(this.c = q()), (this.v = 1), bt.call(this, t, n)
                    }
                    return (
                        (t.prototype.push = function (t, n) {
                            bt.prototype.push.call(this, t, n)
                        }),
                        (t.prototype.p = function (t, n) {
                            this.c.p(t)
                            var r = J(t, this.o, this.v && 2, n && 4, !n)
                            this.v && (yt(r, this.o), (this.v = 0)),
                                n && pt(r, r.length - 4, this.c.d()),
                                this.ondata(r, n)
                        }),
                        t
                    )
                })()
                exports.Zlib = jt
                var Lt = (function () {
                    return function (t, n) {
                        ct(
                            [
                                nt,
                                ot,
                                function () {
                                    return [ut, bt, jt]
                                },
                            ],
                            this,
                            xt.call(this, t, n),
                            function (t) {
                                var n = new jt(t.data)
                                onmessage = ut(n)
                            },
                            10
                        )
                    }
                })()
                function Rt(t, n, r) {
                    if ((r || ((r = n), (n = {})), 'function' != typeof r)) throw 'no callback'
                    return st(
                        t,
                        n,
                        [
                            nt,
                            ot,
                            function () {
                                return [_t]
                            },
                        ],
                        function (t) {
                            return at(_t(t.data[0], t.data[1]))
                        },
                        4,
                        r
                    )
                }
                function _t(t, n) {
                    void 0 === n && (n = {})
                    var r = q()
                    r.p(t)
                    var e = J(t, n, 2, 4)
                    return yt(e, n), pt(e, e.length - 4, r.d()), e
                }
                exports.AsyncZlib = Lt
                var Bt = (function () {
                    function t(t) {
                        ;(this.v = 1), St.call(this, t)
                    }
                    return (
                        (t.prototype.push = function (t, n) {
                            if ((St.prototype.e.call(this, t), this.v)) {
                                if (this.p.length < 2 && !n) return
                                ;(this.p = this.p.subarray(2)), (this.v = 0)
                            }
                            if (n) {
                                if (this.p.length < 8) throw 'invalid zlib stream'
                                this.p = this.p.subarray(0, -4)
                            }
                            St.prototype.c.call(this, t, n)
                        }),
                        t
                    )
                })()
                exports.Unzlib = Bt
                var Ht = (function () {
                    return function (t) {
                        ;(this.ondata = t),
                            ct(
                                [
                                    tt,
                                    it,
                                    function () {
                                        return [ut, St, Bt]
                                    },
                                ],
                                this,
                                0,
                                function () {
                                    var t = new Bt()
                                    onmessage = ut(t)
                                },
                                11
                            )
                    }
                })()
                function Pt(t, n, r) {
                    if ((r || ((r = n), (n = {})), 'function' != typeof r)) throw 'no callback'
                    return st(
                        t,
                        n,
                        [
                            tt,
                            it,
                            function () {
                                return [Wt]
                            },
                        ],
                        function (t) {
                            return at(Wt(t.data[0], ft(t.data[1])))
                        },
                        5,
                        r
                    )
                }
                function Wt(t, n) {
                    return O((mt(t), t.subarray(2, -4)), n)
                }
                exports.AsyncUnzlib = Ht
                var Yt = (function () {
                    function t(t) {
                        ;(this.G = Ft), (this.I = St), (this.Z = Bt), (this.ondata = t)
                    }
                    return (
                        (t.prototype.push = function (t, n) {
                            if (!this.ondata) throw 'no stream handler'
                            if (this.s) this.s.push(t, n)
                            else {
                                if (this.p && this.p.length) {
                                    var e = new r(this.p.length + t.length)
                                    e.set(this.p), e.set(t, this.p.length)
                                } else this.p = t
                                if (this.p.length > 2) {
                                    var o = this,
                                        i = function () {
                                            o.ondata.apply(o, arguments)
                                        }
                                    ;(this.s =
                                        31 == this.p[0] && 139 == this.p[1] && 8 == this.p[2]
                                            ? new this.G(i)
                                            : 8 != (15 & this.p[0]) ||
                                              this.p[0] >> 4 > 7 ||
                                              ((this.p[0] << 8) | this.p[1]) % 31
                                            ? new this.I(i)
                                            : new this.Z(i)),
                                        this.s.push(this.p, n),
                                        (this.p = null)
                                }
                            }
                        }),
                        t
                    )
                })()
                exports.Decompress = Yt
                var qt = (function () {
                    function t(t) {
                        ;(this.G = Zt), (this.I = kt), (this.Z = Ht), (this.ondata = t)
                    }
                    return (
                        (t.prototype.push = function (t, n) {
                            Yt.prototype.push.call(this, t, n)
                        }),
                        t
                    )
                })()
                function Jt(t, n, r) {
                    if ((r || ((r = n), (n = {})), 'function' != typeof r)) throw 'no callback'
                    return 31 == t[0] && 139 == t[1] && 8 == t[2]
                        ? Et(t, n, r)
                        : 8 != (15 & t[0]) || t[0] >> 4 > 7 || ((t[0] << 8) | t[1]) % 31
                        ? Ct(t, n, r)
                        : Pt(t, n, r)
                }
                function Kt(t, n) {
                    return 31 == t[0] && 139 == t[1] && 8 == t[2]
                        ? Tt(t, n)
                        : 8 != (15 & t[0]) || t[0] >> 4 > 7 || ((t[0] << 8) | t[1]) % 31
                        ? Dt(t, n)
                        : Wt(t, n)
                }
                exports.AsyncDecompress = qt
                var Nt = function (t, n, e, o) {
                    for (var i in t) {
                        var a = t[i],
                            f = n + i
                        a instanceof r
                            ? (e[f] = [a, o])
                            : Array.isArray(a)
                            ? (e[f] = [a[0], K(o, a[1])])
                            : Nt(a, f + '/', e, o)
                    }
                }
                function Qt(t, n) {
                    var e = t.length
                    if (!n && 'undefined' != typeof TextEncoder) return new TextEncoder().encode(t)
                    for (
                        var o = new r(t.length + (t.length >>> 1)),
                            i = 0,
                            a = function (t) {
                                o[i++] = t
                            },
                            f = 0;
                        f < e;
                        ++f
                    ) {
                        if (i + 5 > o.length) {
                            var s = new r(i + 8 + ((e - f) << 1))
                            s.set(o), (o = s)
                        }
                        var u = t.charCodeAt(f)
                        u < 128 || n
                            ? a(u)
                            : u < 2048
                            ? (a(192 | (u >>> 6)), a(128 | (63 & u)))
                            : u > 55295 && u < 57344
                            ? (a(240 | ((u = (65536 + (1047552 & u)) | (1023 & t.charCodeAt(++f))) >>> 18)),
                              a(128 | ((u >>> 12) & 63)),
                              a(128 | ((u >>> 6) & 63)),
                              a(128 | (63 & u)))
                            : (a(224 | (u >>> 12)), a(128 | ((u >>> 6) & 63)), a(128 | (63 & u)))
                    }
                    return G(o, 0, i)
                }
                function Vt(t, n) {
                    var r = ''
                    if (!n && 'undefined' != typeof TextDecoder) return new TextDecoder().decode(t)
                    for (var e = 0; e < t.length; ) {
                        var o = t[e++]
                        o < 128 || n
                            ? (r += String.fromCharCode(o))
                            : o < 224
                            ? (r += String.fromCharCode(((31 & o) << 6) | (63 & t[e++])))
                            : o < 240
                            ? (r += String.fromCharCode(((15 & o) << 12) | ((63 & t[e++]) << 6) | (63 & t[e++])))
                            : ((o =
                                  (((15 & o) << 18) | ((63 & t[e++]) << 12) | ((63 & t[e++]) << 6) | (63 & t[e++])) -
                                  65536),
                              (r += String.fromCharCode(55296 | (o >> 10), 56320 | (1023 & o))))
                    }
                    return r
                }
                var Xt = function (t, n) {
                        return n + 30 + lt(t, n + 26) + lt(t, n + 28)
                    },
                    $t = function (t, n) {
                        var r = 2048 & lt(t, n + 8),
                            e = lt(t, n + 10),
                            o = ht(t, n + 20),
                            i = ht(t, n + 24),
                            a = lt(t, n + 28)
                        return [
                            o,
                            e,
                            i,
                            Vt(t.subarray(n + 46, n + 46 + a), !r),
                            n + 46 + a + lt(t, n + 30) + lt(t, n + 32),
                            ht(t, n + 42),
                        ]
                    },
                    tn = function (t, n, r, e, o, i, a, f, s, u) {
                        var c = i.length,
                            l = e.length
                        pt(t, n, null != s ? 33639248 : 67324752),
                            (n += 4),
                            null != s && ((t[n] = 20), (n += 2)),
                            (t[n] = 20),
                            (n += 2),
                            (t[n++] = 8 == u && (1 == f.level ? 6 : f.level < 6 ? 4 : 9 == f.level ? 2 : 0)),
                            (t[n++] = a && 8),
                            (t[n] = u),
                            (n += 2)
                        var h = new Date(f.mtime || Date.now()),
                            p = h.getFullYear() - 1980
                        if (p < 0 || p > 119) throw 'date not in range 1980-2099'
                        pt(
                            t,
                            n,
                            (p << 25) |
                                ((h.getMonth() + 1) << 21) |
                                (h.getDate() << 16) |
                                (h.getHours() << 11) |
                                (h.getMinutes() << 5) |
                                (h.getSeconds() >>> 1)
                        ),
                            pt(t, (n += 4), r),
                            pt(t, n + 4, l),
                            pt(t, n + 8, o),
                            pt(t, n + 12, c),
                            (n += 16),
                            null != s && (pt(t, (n += 10), s), (n += 4)),
                            t.set(i, n),
                            (n += c),
                            null == s && t.set(e, n)
                    },
                    nn = function (t, n, r, e, o) {
                        pt(t, n, 101010256), pt(t, n + 8, r), pt(t, n + 10, r), pt(t, n + 12, e), pt(t, n + 16, o)
                    }
                function rn(t, n, e) {
                    if ((e || ((e = n), (n = {})), 'function' != typeof e)) throw 'no callback'
                    var o = {}
                    Nt(t, '', o, n)
                    var i = Object.keys(o),
                        a = i.length,
                        f = 0,
                        s = 0,
                        u = a,
                        c = new Array(a),
                        l = [],
                        h = function () {
                            for (var t = 0; t < l.length; ++t) l[t]()
                        },
                        p = function () {
                            var t = new r(s + 22),
                                n = f,
                                o = s - f
                            s = 0
                            for (var i = 0; i < u; ++i) {
                                var a = c[i]
                                try {
                                    tn(t, s, a.c, a.d, a.m, a.n, a.u, a.p, null, a.t),
                                        tn(t, f, a.c, a.d, a.m, a.n, a.u, a.p, s, a.t),
                                        (f += 46 + a.n.length),
                                        (s += 30 + a.n.length + a.d.length)
                                } catch (l) {
                                    return e(l, null)
                                }
                            }
                            nn(t, f, c.length, o, n), e(null, t)
                        }
                    a || p()
                    for (
                        var v = function (t) {
                                var n = i[t],
                                    r = o[n],
                                    u = r[0],
                                    v = r[1],
                                    d = Y(),
                                    g = u.length
                                d.p(u)
                                var w = Qt(n),
                                    y = w.length,
                                    m = 0 == v.level ? 0 : 8,
                                    x = function (r, o) {
                                        if (r) h(), e(r, null)
                                        else {
                                            var i = o.length
                                            ;(c[t] = { t: m, d: o, m: g, c: d.d(), u: n.length != i, n: w, p: v }),
                                                (f += 30 + y + i),
                                                (s += 76 + 2 * y + i),
                                                --a || p()
                                        }
                                    }
                                if ((w.length > 65535 && x('filename too long', null), m))
                                    if (g < 16e4)
                                        try {
                                            x(null, Mt(u, v))
                                        } catch (b) {
                                            x(b, null)
                                        }
                                    else l.push(At(u, v, x))
                                else x(null, u)
                            },
                            d = 0;
                        d < u;
                        ++d
                    )
                        v(d)
                    return h
                }
                function en(t, n) {
                    void 0 === n && (n = {})
                    var e = {},
                        o = []
                    Nt(t, '', e, n)
                    var i = 0,
                        a = 0
                    for (var f in e) {
                        var s = e[f],
                            u = s[0],
                            c = s[1],
                            l = 0 == c.level ? 0 : 8,
                            h = Qt(f),
                            p = h.length
                        if (h.length > 65535) throw 'filename too long'
                        var v = l ? Mt(u, c) : u,
                            d = v.length,
                            g = Y()
                        g.p(u),
                            o.push({ t: l, d: v, m: u.length, c: g.d(), u: f.length != p, n: h, o: i, p: c }),
                            (i += 30 + p + d),
                            (a += 76 + 2 * p + d)
                    }
                    for (var w = new r(a + 22), y = i, m = a - i, x = 0; x < o.length; ++x) {
                        var b = o[x]
                        tn(w, b.o, b.c, b.d, b.m, b.n, b.u, b.p, null, b.t),
                            tn(w, i, b.c, b.d, b.m, b.n, b.u, b.p, b.o, b.t),
                            (i += 46 + b.n.length)
                    }
                    return nn(w, i, o.length, m, y), w
                }
                function on(t, n) {
                    if ('function' != typeof n) throw 'no callback'
                    for (
                        var e = [],
                            o = function () {
                                for (var t = 0; t < e.length; ++t) e[t]()
                            },
                            i = {},
                            a = t.length - 22;
                        101010256 != ht(t, a);
                        --a
                    )
                        if (!a || t.length - a > 65558) return void n('invalid zip file', null)
                    var f = lt(t, a + 8)
                    f || n(null, {})
                    for (
                        var s = f,
                            u = ht(t, a + 16),
                            c = function (e) {
                                var s = $t(t, u),
                                    c = s[0],
                                    l = s[1],
                                    h = s[2],
                                    p = s[3],
                                    v = s[4],
                                    d = s[5],
                                    g = Xt(t, d)
                                u = v
                                var w = function (t, r) {
                                    t ? (o(), n(t, null)) : ((i[p] = r), --f || n(null, i))
                                }
                                if (l)
                                    if (8 == l) {
                                        var y = t.subarray(g, g + c)
                                        if (c < 32e4)
                                            try {
                                                w(null, Dt(y, new r(h)))
                                            } catch (a) {
                                                w(a, null)
                                            }
                                        else Ct(y, { size: h }, w)
                                    } else w('unknown compression type ' + l, null)
                                else w(null, G(t, g, g + c))
                            },
                            l = 0;
                        l < s;
                        ++l
                    )
                        c()
                    return o
                }
                function an(t) {
                    for (var n = {}, e = t.length - 22; 101010256 != ht(t, e); --e)
                        if (!e || t.length - e > 65558) throw 'invalid zip file'
                    var o = lt(t, e + 8)
                    if (!o) return {}
                    for (var i = ht(t, e + 16), a = 0; a < o; ++a) {
                        var f = $t(t, i),
                            s = f[0],
                            u = f[1],
                            c = f[2],
                            l = f[3],
                            h = f[4],
                            p = f[5],
                            v = Xt(t, p)
                        if (((i = h), u)) {
                            if (8 != u) throw 'unknown compression type ' + u
                            n[l] = Dt(t.subarray(v, v + s), new r(c))
                        } else n[l] = G(t, v, v + s)
                    }
                    return n
                }
            },
            {},
        ],
        Ie9M: [
            function (require, module, exports) {
                'use strict'
                Object.defineProperty(exports, '__esModule', { value: !0 }),
                    (exports.decideCompression = s),
                    (exports.compressData = c)
                var e = require('./lz-string'),
                    r = require('fflate'),
                    t = require('./utils')
                function n(e, r) {
                    var t = Object.keys(e)
                    if (Object.getOwnPropertySymbols) {
                        var n = Object.getOwnPropertySymbols(e)
                        r &&
                            (n = n.filter(function (r) {
                                return Object.getOwnPropertyDescriptor(e, r).enumerable
                            })),
                            t.push.apply(t, n)
                    }
                    return t
                }
                function o(e) {
                    for (var r = 1; r < arguments.length; r++) {
                        var t = null != arguments[r] ? arguments[r] : {}
                        r % 2
                            ? n(Object(t), !0).forEach(function (r) {
                                  i(e, r, t[r])
                              })
                            : Object.getOwnPropertyDescriptors
                            ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t))
                            : n(Object(t)).forEach(function (r) {
                                  Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r))
                              })
                    }
                    return e
                }
                function i(e, r, t) {
                    return (
                        r in e
                            ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 })
                            : (e[r] = t),
                        e
                    )
                }
                function s(e) {
                    return e['gzip-js'] ? 'gzip-js' : e.lz64 ? 'lz64' : 'base64'
                }
                function c(n, i, s) {
                    return 'lz64' === n
                        ? [{ data: e.LZString.compressToBase64(i), compression: 'lz64' }, s]
                        : 'gzip-js' === n
                        ? [
                              (0, r.gzipSync)((0, r.strToU8)(i), { mtime: 0 }),
                              o(o({}, s), {}, { blob: !0, urlQueryArgs: { compression: 'gzip-js' } }),
                          ]
                        : [{ data: t._.base64Encode(i) }, s]
                }
            },
            { './lz-string': 'zdbk', fflate: 'UJm1', './utils': 'FOZT' },
        ],
        tOu2: [
            function (require, module, exports) {
                'use strict'
                Object.defineProperty(exports, '__esModule', { value: !0 }),
                    (exports.xhr = exports.encodePostData = void 0)
                var e = require('./utils')
                function t(e, t) {
                    var r = Object.keys(e)
                    if (Object.getOwnPropertySymbols) {
                        var n = Object.getOwnPropertySymbols(e)
                        t &&
                            (n = n.filter(function (t) {
                                return Object.getOwnPropertyDescriptor(e, t).enumerable
                            })),
                            r.push.apply(r, n)
                    }
                    return r
                }
                function r(e) {
                    for (var r = 1; r < arguments.length; r++) {
                        var o = null != arguments[r] ? arguments[r] : {}
                        r % 2
                            ? t(Object(o), !0).forEach(function (t) {
                                  n(e, t, o[t])
                              })
                            : Object.getOwnPropertyDescriptors
                            ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(o))
                            : t(Object(o)).forEach(function (t) {
                                  Object.defineProperty(e, t, Object.getOwnPropertyDescriptor(o, t))
                              })
                    }
                    return e
                }
                function n(e, t, r) {
                    return (
                        t in e
                            ? Object.defineProperty(e, t, { value: r, enumerable: !0, configurable: !0, writable: !0 })
                            : (e[t] = r),
                        e
                    )
                }
                var o = function e(t, r) {
                    if (r.blob) return new Blob([t.buffer], { type: 'text/plain' })
                    if (r.sendBeacon) {
                        var n = e(t, { method: 'POST' })
                        return new Blob([n], { type: 'application/x-www-form-urlencoded' })
                    }
                    return 'POST' !== r.method
                        ? null
                        : ((o = Array.isArray(t)
                              ? 'data=' + encodeURIComponent(t)
                              : 'data=' + encodeURIComponent(t.data)),
                          t.compression && (o += '&compression=' + t.compression),
                          o)
                    var o
                }
                exports.encodePostData = o
                var s = function (t, n, s, a, i, c) {
                    var u = new XMLHttpRequest()
                    u.open(a.method, t, !0)
                    var p = o(n, a)
                    i.incr('_send_request'), i.incr('_send_request_inflight')
                    var d = i.startRequest(
                        r(
                            { data_size: e._.isString(n) ? n.length : p.length, endpoint: t.slice(t.length - 2) },
                            a._metrics
                        )
                    )
                    e._.each(s, function (e, t) {
                        u.setRequestHeader(t, e)
                    }),
                        'POST' !== a.method ||
                            a.blob ||
                            u.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded'),
                        (u.withCredentials = !0),
                        (u.onreadystatechange = function () {
                            if (4 === u.readyState) {
                                i.incr('xhr-response'),
                                    i.incr('xhr-response-'.concat(u.status)),
                                    i.decr('_send_request_inflight')
                                var t = i.finishRequest(d)
                                if (200 === u.status) {
                                    if (c) {
                                        var n
                                        try {
                                            n = JSON.parse(u.responseText)
                                        } catch (s) {
                                            return void e.console.error(s)
                                        }
                                        c(n)
                                    }
                                } else {
                                    var o = 'Bad HTTP status: ' + u.status + ' ' + u.statusText
                                    e.console.error(o),
                                        i.markRequestFailed(
                                            r(
                                                r({}, t),
                                                {},
                                                { type: 'non_200', status: u.status, statusText: u.statusText }
                                            )
                                        ),
                                        c && (a.verbose ? c({ status: 0, error: o }) : c(0))
                                }
                            }
                        }),
                        u.send(p)
                }
                exports.xhr = s
            },
            { './utils': 'FOZT' },
        ],
        ok3T: [
            function (require, module, exports) {
                'use strict'
                Object.defineProperty(exports, '__esModule', { value: !0 }),
                    (exports.init_from_snippet = N),
                    (exports.init_as_module = R),
                    (exports.PostHogLib = void 0)
                var e,
                    t,
                    o = require('./lz-string'),
                    i = y(require('./config')),
                    r = require('./utils'),
                    n = require('./autocapture'),
                    s = require('./posthog-people'),
                    p = require('./posthog-featureflags'),
                    c = require('./posthog-persistence'),
                    a = require('./extensions/sessionrecording'),
                    _ = require('./extensions/toolbar'),
                    u = require('./gdpr-utils'),
                    d = require('./storage'),
                    g = require('./request-queue'),
                    l = require('./capture-metrics'),
                    h = require('./compression'),
                    f = require('./send-request')
                function y(e) {
                    return e && e.__esModule ? e : { default: e }
                }
                function v(e, t) {
                    var o = Object.keys(e)
                    if (Object.getOwnPropertySymbols) {
                        var i = Object.getOwnPropertySymbols(e)
                        t &&
                            (i = i.filter(function (t) {
                                return Object.getOwnPropertyDescriptor(e, t).enumerable
                            })),
                            o.push.apply(o, i)
                    }
                    return o
                }
                function b(e) {
                    for (var t = 1; t < arguments.length; t++) {
                        var o = null != arguments[t] ? arguments[t] : {}
                        t % 2
                            ? v(Object(o), !0).forEach(function (t) {
                                  m(e, t, o[t])
                              })
                            : Object.getOwnPropertyDescriptors
                            ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(o))
                            : v(Object(o)).forEach(function (t) {
                                  Object.defineProperty(e, t, Object.getOwnPropertyDescriptor(o, t))
                              })
                    }
                    return e
                }
                function m(e, t, o) {
                    return (
                        t in e
                            ? Object.defineProperty(e, t, { value: o, enumerable: !0, configurable: !0, writable: !0 })
                            : (e[t] = o),
                        e
                    )
                }
                function w(e, t) {
                    return x(e) || O(e, t) || q(e, t) || k()
                }
                function k() {
                    throw new TypeError(
                        'Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.'
                    )
                }
                function q(e, t) {
                    if (e) {
                        if ('string' == typeof e) return P(e, t)
                        var o = Object.prototype.toString.call(e).slice(8, -1)
                        return (
                            'Object' === o && e.constructor && (o = e.constructor.name),
                            'Map' === o || 'Set' === o
                                ? Array.from(e)
                                : 'Arguments' === o || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(o)
                                ? P(e, t)
                                : void 0
                        )
                    }
                }
                function P(e, t) {
                    ;(null == t || t > e.length) && (t = e.length)
                    for (var o = 0, i = new Array(t); o < t; o++) i[o] = e[o]
                    return i
                }
                function O(e, t) {
                    if ('undefined' != typeof Symbol && Symbol.iterator in Object(e)) {
                        var o = [],
                            i = !0,
                            r = !1,
                            n = void 0
                        try {
                            for (
                                var s, p = e[Symbol.iterator]();
                                !(i = (s = p.next()).done) && (o.push(s.value), !t || o.length !== t);
                                i = !0
                            );
                        } catch (c) {
                            ;(r = !0), (n = c)
                        } finally {
                            try {
                                i || null == p.return || p.return()
                            } finally {
                                if (r) throw n
                            }
                        }
                        return o
                    }
                }
                function x(e) {
                    if (Array.isArray(e)) return e
                }
                var E = 0,
                    S = 1,
                    j = function () {},
                    A = {},
                    F = 'posthog',
                    H = r.window.XMLHttpRequest && 'withCredentials' in new XMLHttpRequest(),
                    I = !H && -1 === r.userAgent.indexOf('MSIE') && -1 === r.userAgent.indexOf('Mozilla'),
                    $ = function () {
                        return {
                            api_host: 'https://app.posthog.com',
                            api_method: 'POST',
                            api_transport: 'XHR',
                            autocapture: !0,
                            cross_subdomain_cookie: -1 === r.document.location.hostname.indexOf('herokuapp.com'),
                            persistence: 'cookie',
                            persistence_name: '',
                            cookie_name: '',
                            loaded: function () {},
                            store_google: !0,
                            save_referrer: !0,
                            test: !1,
                            verbose: !1,
                            img: !1,
                            capture_pageview: !0,
                            debug: !1,
                            cookie_expiration: 365,
                            upgrade: !1,
                            disable_session_recording: !1,
                            disable_persistence: !1,
                            disable_cookie: !1,
                            secure_cookie: 'https:' === r.window.location.protocol,
                            ip: !0,
                            opt_out_capturing_by_default: !1,
                            opt_out_persistence_by_default: !1,
                            opt_out_capturing_persistence_type: 'localStorage',
                            opt_out_capturing_cookie_prefix: null,
                            property_blacklist: [],
                            sanitize_properties: null,
                            xhr_headers: {},
                            inapp_protocol: '//',
                            inapp_link_new_window: !1,
                            request_batching: !0,
                            _onCapture: function () {},
                            _capture_metrics: !1,
                        }
                    },
                    D = function () {}
                exports.PostHogLib = D
                var L = function (o, c, u) {
                    var d,
                        g = u === F ? t : t[u]
                    if (g && e === E) d = g
                    else {
                        if (g && !r._.isArray(g)) return void r.console.error('You have already initialized ' + u)
                        d = new D()
                    }
                    if (
                        (d._init(o, c, u),
                        (d.people = new s.PostHogPeople()),
                        d.people._init(d),
                        (d.featureFlags = new p.PostHogFeatureFlags(d)),
                        (d.feature_flags = d.featureFlags),
                        (d.toolbar = new _.Toolbar(d)),
                        (d.sessionRecording = new a.SessionRecording(d)),
                        d.sessionRecording.startRecordingIfEnabled(),
                        (i.default.DEBUG = i.default.DEBUG || d.get_config('debug')),
                        (d.__autocapture_enabled = d.get_config('autocapture')),
                        d.get_config('autocapture'))
                    ) {
                        n.autocapture.enabledForProject(d.get_config('token'), 100, 100)
                            ? n.autocapture.isBrowserSupported()
                                ? n.autocapture.init(d)
                                : ((d.__autocapture_enabled = !1),
                                  r.console.log(
                                      'Disabling Automatic Event Collection because this browser is not supported'
                                  ))
                            : ((d.__autocapture_enabled = !1),
                              r.console.log('Not in active bucket: disabling Automatic Event Collection.'))
                    }
                    return (
                        !r._.isUndefined(g) &&
                            r._.isArray(g) &&
                            (d._execute_array.call(d.people, g.people), d._execute_array(g)),
                        d
                    )
                }
                function U(e) {
                    r.window.console.warn(
                        'WARNING! posthog.' +
                            e +
                            ' is deprecated and will be removed soon! Please use posthog.' +
                            e.split('captureing').join('capturing') +
                            ' instead (without the "e")!'
                    )
                }
                ;(D.prototype.init = function (e, o, i) {
                    if (r._.isUndefined(i)) r.console.error('You must name your new library: init(token, config, name)')
                    else {
                        if (i !== F) {
                            var n = L(e, o, i)
                            return (t[i] = n), n._loaded(), n
                        }
                        r.console.error(
                            'You must initialize the main posthog object right after you include the PostHog js snippet'
                        )
                    }
                }),
                    (D.prototype._init = function (e, t, o) {
                        ;(this.__loaded = !0),
                            (this.config = {}),
                            (this._triggered_notifs = []),
                            (this.compression = {}),
                            this.set_config(
                                r._.extend({}, $(), t, {
                                    name: o,
                                    token: e,
                                    callback_fn: (o === F ? o : F + '.' + o) + '._jsc',
                                })
                            ),
                            (this._jsc = function () {}),
                            (this._captureMetrics = new l.CaptureMetrics(
                                this.get_config('_capture_metrics'),
                                r._.bind(this.capture, this)
                            )),
                            (this._requestQueue = new g.RequestQueue(
                                this._captureMetrics,
                                r._.bind(this._handle_queued_event, this)
                            )),
                            (this.__captureHooks = []),
                            (this.__request_queue = []),
                            (this.persistence = new c.PostHogPersistence(this.config)),
                            this._gdpr_init()
                        var i = r._.UUID()
                        this.get_distinct_id() || this.register_once({ distinct_id: i, $device_id: i }, ''),
                            r.window.addEventListener &&
                                r.window.addEventListener('unload', this._handle_unload.bind(this))
                    }),
                    (D.prototype._loaded = function () {
                        this.get_config('loaded')(this),
                            this._start_queue_if_opted_in(),
                            this.get_config('capture_pageview') && this.capture_pageview()
                    }),
                    (D.prototype._start_queue_if_opted_in = function () {
                        this.has_opted_out_capturing() ||
                            (this.get_config('request_batching') && this._requestQueue.poll())
                    }),
                    (D.prototype._dom_loaded = function () {
                        this.has_opted_out_capturing() ||
                            r._.each(
                                this.__request_queue,
                                function (e) {
                                    this._send_request.apply(this, e)
                                },
                                this
                            ),
                            delete this.__request_queue,
                            this._start_queue_if_opted_in()
                    }),
                    (D.prototype._prepare_callback = function (e, t) {
                        if (r._.isUndefined(e)) return null
                        if (H) {
                            return function (o) {
                                e(o, t)
                            }
                        }
                        var o = this._jsc,
                            i = '' + Math.floor(1e8 * Math.random()),
                            n = this.get_config('callback_fn') + '[' + i + ']'
                        return (
                            (o[i] = function (r) {
                                delete o[i], e(r, t)
                            }),
                            n
                        )
                    }),
                    (D.prototype._handle_unload = function () {
                        this.get_config('request_batching')
                            ? (this.get_config('capture_pageview') && this.capture('$pageleave'),
                              this.get_config('_capture_metrics') &&
                                  (this._requestQueue.updateUnloadMetrics(),
                                  this.capture('$capture_metrics', this._captureMetrics.metrics),
                                  this._captureMetrics.captureInProgressRequests()),
                              this._requestQueue.unload())
                            : this.get_config('capture_pageview') &&
                              this.capture('$pageleave', null, { transport: 'sendbeacon' })
                    }),
                    (D.prototype._handle_queued_event = function (e, t, o) {
                        var i = JSON.stringify(t)
                        this.__compress_and_send_json_request(e, i, o || A, j)
                    }),
                    (D.prototype.__compress_and_send_json_request = function (e, t, o, i) {
                        var r = w((0, h.compressData)((0, h.decideCompression)(this.compression), t, o), 2),
                            n = r[0],
                            s = r[1]
                        this._send_request(e, n, s, i)
                    }),
                    (D.prototype._send_request = function (e, t, o, i) {
                        if (I) this.__request_queue.push(arguments)
                        else {
                            var n = {
                                method: this.get_config('api_method'),
                                transport: this.get_config('api_transport'),
                                verbose: this.get_config('verbose'),
                            }
                            ;(o = r._.extend(n, o || {})), H || (o.method = 'GET')
                            var s = r.window.navigator.sendBeacon && 'sendbeacon' === o.transport.toLowerCase()
                            H ||
                                (i
                                    ? (t.callback = i)
                                    : (verbose_mode || this.get_config('test')) && (t.callback = '(function(){})'))
                            var p = o.urlQueryArgs || {}
                            if (
                                ((p.ip = this.get_config('ip') ? 1 : 0),
                                (p._ = new Date().getTime().toString()),
                                (e += '?' + r._.HTTPBuildQuery(p)),
                                r._.isObject(t) && this.get_config('img'))
                            ) {
                                var c = r.document.createElement('img')
                                ;(c.src = e), r.document.body.appendChild(c)
                            } else if (s)
                                r.window.navigator.sendBeacon(
                                    e,
                                    (0, f.encodePostData)(t, b(b({}, o), {}, { sendBeacon: !0 }))
                                )
                            else if (H)
                                try {
                                    ;(0, f.xhr)(e, t, this.get_config('xhr_headers'), o, this._captureMetrics, i)
                                } catch (u) {
                                    r.console.error(u)
                                }
                            else {
                                var a = r.document.createElement('script')
                                ;(a.type = 'text/javascript'), (a.async = !0), (a.defer = !0), (a.src = e)
                                var _ = r.document.getElementsByTagName('script')[0]
                                _.parentNode.insertBefore(a, _)
                            }
                        }
                    }),
                    (D.prototype._execute_array = function (e) {
                        var t,
                            o = [],
                            i = [],
                            n = []
                        r._.each(
                            e,
                            function (e) {
                                e &&
                                    ((t = e[0]),
                                    r._.isArray(t)
                                        ? n.push(e)
                                        : 'function' == typeof e
                                        ? e.call(this)
                                        : r._.isArray(e) && 'alias' === t
                                        ? o.push(e)
                                        : r._.isArray(e) && -1 !== t.indexOf('capture') && 'function' == typeof this[t]
                                        ? n.push(e)
                                        : i.push(e))
                            },
                            this
                        )
                        var s = function (e, t) {
                            r._.each(
                                e,
                                function (e) {
                                    if (r._.isArray(e[0])) {
                                        var o = t
                                        r._.each(e, function (e) {
                                            o = o[e[0]].apply(o, e.slice(1))
                                        })
                                    } else this[e[0]].apply(this, e.slice(1))
                                },
                                t
                            )
                        }
                        s(o, this), s(i, this), s(n, this)
                    }),
                    (D.prototype.push = function (e) {
                        this._execute_array([e])
                    }),
                    (D.prototype.capture = (0, u.addOptOutCheckPostHogLib)(function (e, t, o, i) {
                        this._captureMetrics.incr('capture'),
                            '$snapshot' === e && this._captureMetrics.incr('snapshot'),
                            i || 'function' != typeof o || ((i = o), (o = null))
                        var n = (o = o || A).transport
                        if (
                            (n && (o.transport = n),
                            'function' != typeof i
                                ? (i = j)
                                : r.window.console.warn(
                                      'WARNING! Calling posthog.capture with a callback is deprecated and will be removed soon!'
                                  ),
                            r._.isUndefined(e))
                        )
                            r.console.error('No event name provided to posthog.capture')
                        else {
                            if (!r._.isBlockedUA(r.userAgent)) {
                                var s = this.persistence.remove_event_timer(e)
                                this.persistence.update_search_keyword(r.document.referrer),
                                    this.get_config('store_google') && this.persistence.update_campaign_params(),
                                    this.get_config('save_referrer') &&
                                        this.persistence.update_referrer_info(r.document.referrer)
                                var p = { event: e, properties: this._calculate_event_properties(e, t, s) }
                                '$identify' === e && o.$set && (p.$set = o.$set),
                                    (p = r._.copyAndTruncateStrings(p, o._noTruncate ? null : 255))
                                var c = JSON.stringify(p),
                                    a = this.get_config('api_host') + (o.endpoint || '/e/'),
                                    _ = this._prepare_callback(i, p),
                                    u = i !== j || o !== A
                                return (
                                    !this.get_config('request_batching') || (u && !o._batchKey)
                                        ? this.__compress_and_send_json_request(a, c, o, _)
                                        : ((p.timestamp = new Date()), this._requestQueue.enqueue(a, p, o)),
                                    this._invokeCaptureHooks(e),
                                    p
                                )
                            }
                            i(0)
                        }
                    })),
                    (D.prototype._addCaptureHook = function (e) {
                        this.__captureHooks.push(e)
                    }),
                    (D.prototype._invokeCaptureHooks = function (e) {
                        this.config._onCapture(e),
                            r._.each(this.__captureHooks, function (t) {
                                return t(e)
                            })
                    }),
                    (D.prototype._calculate_event_properties = function (e, t, o) {
                        var i = t || {}
                        if (((i.token = this.get_config('token')), '$snapshot' === e)) {
                            var n = this.persistence.properties()
                            return (i.distinct_id = n.distinct_id), i
                        }
                        if (!r._.isUndefined(o)) {
                            var s = new Date().getTime() - o
                            i.$duration = parseFloat((s / 1e3).toFixed(3))
                        }
                        i = r._.extend({}, r._.info.properties(), this.persistence.properties(), i)
                        var p = this.get_config('property_blacklist')
                        r._.isArray(p)
                            ? r._.each(p, function (e) {
                                  delete i[e]
                              })
                            : r.console.error('Invalid value for property_blacklist config: ' + p)
                        var c = this.get_config('sanitize_properties')
                        return c && (i = c(i, e)), i
                    }),
                    (D.prototype.capture_pageview = function (e) {
                        r._.isUndefined(e) && (e = r.document.location.href), this.capture('$pageview')
                    }),
                    (D.prototype.register = function (e, t) {
                        this.persistence.register(e, t)
                    }),
                    (D.prototype.register_once = function (e, t, o) {
                        this.persistence.register_once(e, t, o)
                    }),
                    (D.prototype.unregister = function (e) {
                        this.persistence.unregister(e)
                    }),
                    (D.prototype._register_single = function (e, t) {
                        var o = {}
                        ;(o[e] = t), this.register(o)
                    }),
                    (D.prototype.isFeatureEnabled = function (e) {
                        var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {}
                        return this.feature_flags.isFeatureEnabled(e, t)
                    }),
                    (D.prototype.reloadFeatureFlags = function () {
                        return this.feature_flags.reloadFeatureFlags()
                    }),
                    (D.prototype.onFeatureFlags = function (e) {
                        this.persistence.addFeatureFlagsHandler(e)
                        var t = this.feature_flags.getFlags()
                        t && e(t)
                    }),
                    (D.prototype.identify = function (e, t) {
                        if (e) {
                            this._captureMetrics.incr('identify')
                            var o = this.get_distinct_id()
                            if ((this.register({ $user_id: e }), !this.get_property('$device_id'))) {
                                var i = o
                                this.register_once({ $had_persisted_distinct_id: !0, $device_id: i }, '')
                            }
                            e !== o &&
                                e !== this.get_property(c.ALIAS_ID_KEY) &&
                                (this.unregister(c.ALIAS_ID_KEY), this.register({ distinct_id: e })),
                                e !== o
                                    ? this.capture(
                                          '$identify',
                                          { distinct_id: e, $anon_distinct_id: o },
                                          { $set: t || {} }
                                      )
                                    : t && this.people.set(t),
                                this.reloadFeatureFlags()
                        } else r.console.error('Unique user id has not been set in posthog.identify')
                    }),
                    (D.prototype.reset = function (e) {
                        var t = this.get_property('$device_id')
                        this.persistence.clear()
                        var o = r._.UUID()
                        this.register_once({ distinct_id: o, $device_id: e ? o : t }, '')
                    }),
                    (D.prototype.get_distinct_id = function () {
                        return this.get_property('distinct_id')
                    }),
                    (D.prototype.alias = function (e, t) {
                        if (e === this.get_property(c.PEOPLE_DISTINCT_ID_KEY))
                            return (
                                r.console.critical('Attempting to create alias for existing People user - aborting.'),
                                -2
                            )
                        var o = this
                        return (
                            r._.isUndefined(t) && (t = this.get_distinct_id()),
                            e !== t
                                ? (this._register_single(c.ALIAS_ID_KEY, e),
                                  this.capture('$create_alias', { alias: e, distinct_id: t }, function () {
                                      o.identify(e)
                                  }))
                                : (r.console.error('alias matches current distinct_id - skipping api call.'),
                                  this.identify(e),
                                  -1)
                        )
                    }),
                    (D.prototype.set_config = function (e) {
                        r._.isObject(e) &&
                            (r._.extend(this.config, e),
                            this.get_config('persistence_name') ||
                                (this.config.persistence_name = this.config.cookie_name),
                            this.get_config('disable_persistence') ||
                                (this.config.disable_persistence = this.config.disable_cookie),
                            this.persistence && this.persistence.update_config(this.config),
                            (i.default.DEBUG = i.default.DEBUG || this.get_config('debug')))
                    }),
                    (D.prototype.get_config = function (e) {
                        return this.config[e]
                    }),
                    (D.prototype.get_property = function (e) {
                        return this.persistence.props[e]
                    }),
                    (D.prototype.toString = function () {
                        var e = this.get_config('name')
                        return e !== F && (e = F + '.' + e), e
                    }),
                    (D.prototype._gdpr_init = function () {
                        'localStorage' === this.get_config('opt_out_capturing_persistence_type') &&
                            d.localStore.is_supported() &&
                            (!this.has_opted_in_capturing() &&
                                this.has_opted_in_capturing({ persistence_type: 'cookie' }) &&
                                this.opt_in_capturing({ enable_persistence: !1 }),
                            !this.has_opted_out_capturing() &&
                                this.has_opted_out_capturing({ persistence_type: 'cookie' }) &&
                                this.opt_out_capturing({ clear_persistence: !1 }),
                            this.clear_opt_in_out_capturing({ persistence_type: 'cookie', enable_persistence: !1 })),
                            this.has_opted_out_capturing()
                                ? this._gdpr_update_persistence({ clear_persistence: !0 })
                                : this.has_opted_in_capturing() ||
                                  (!this.get_config('opt_out_capturing_by_default') &&
                                      !d.cookieStore.get('ph_optout')) ||
                                  (d.cookieStore.remove('ph_optout'),
                                  this.opt_out_capturing({
                                      clear_persistence: this.get_config('opt_out_persistence_by_default'),
                                  }))
                    }),
                    (D.prototype._gdpr_update_persistence = function (e) {
                        var t
                        if (e && e.clear_persistence) t = !0
                        else {
                            if (!e || !e.enable_persistence) return
                            t = !1
                        }
                        this.get_config('disable_persistence') ||
                            this.persistence.disabled === t ||
                            this.persistence.set_disabled(t)
                    }),
                    (D.prototype._gdpr_call_func = function (e, t) {
                        return (
                            (t = r._.extend(
                                {
                                    capture: r._.bind(this.capture, this),
                                    persistence_type: this.get_config('opt_out_capturing_persistence_type'),
                                    cookie_prefix: this.get_config('opt_out_capturing_cookie_prefix'),
                                    cookie_expiration: this.get_config('cookie_expiration'),
                                    cross_subdomain_cookie: this.get_config('cross_subdomain_cookie'),
                                    secure_cookie: this.get_config('secure_cookie'),
                                },
                                t
                            )),
                            d.localStore.is_supported() ||
                                'localStorage' !== t.persistence_type ||
                                (t.persistence_type = 'cookie'),
                            e(this.get_config('token'), {
                                capture: t.capture,
                                captureEventName: t.capture_event_name,
                                captureProperties: t.capture_properties,
                                persistenceType: t.persistence_type,
                                persistencePrefix: t.cookie_prefix,
                                cookieExpiration: t.cookie_expiration,
                                crossSubdomainCookie: t.cross_subdomain_cookie,
                                secureCookie: t.secure_cookie,
                            })
                        )
                    }),
                    (D.prototype.opt_in_capturing = function (e) {
                        ;(e = r._.extend({ enable_persistence: !0 }, e)),
                            this._gdpr_call_func(u.optIn, e),
                            this._gdpr_update_persistence(e)
                    }),
                    (D.prototype.opt_in_captureing = function (e) {
                        U('opt_in_captureing'), this.opt_in_capturing(e)
                    }),
                    (D.prototype.opt_out_capturing = function (e) {
                        ;(e = r._.extend({ clear_persistence: !0 }, e)),
                            this._gdpr_call_func(u.optOut, e),
                            this._gdpr_update_persistence(e)
                    }),
                    (D.prototype.opt_out_captureing = function (e) {
                        U('opt_out_captureing'), this.opt_out_capturing(e)
                    }),
                    (D.prototype.has_opted_in_capturing = function (e) {
                        return this._gdpr_call_func(u.hasOptedIn, e)
                    }),
                    (D.prototype.has_opted_in_captureing = function (e) {
                        return U('has_opted_in_captureing'), this.has_opted_in_capturing(e)
                    }),
                    (D.prototype.has_opted_out_capturing = function (e) {
                        return this._gdpr_call_func(u.hasOptedOut, e)
                    }),
                    (D.prototype.has_opted_out_captureing = function (e) {
                        return U('has_opted_out_captureing'), this.has_opted_out_capturing(e)
                    }),
                    (D.prototype.clear_opt_in_out_capturing = function (e) {
                        ;(e = r._.extend({ enable_persistence: !0 }, e)),
                            this._gdpr_call_func(u.clearOptInOut, e),
                            this._gdpr_update_persistence(e)
                    }),
                    (D.prototype.clear_opt_in_out_captureing = function (e) {
                        U('clear_opt_in_out_captureing'), this.clear_opt_in_out_capturing(e)
                    }),
                    (D.prototype.sentry_integration = function (e, t, o) {
                        this.setupOnce = function (i) {
                            i(function (i) {
                                if ('error' !== i.level || !e.__loaded) return i
                                i.tags || (i.tags = {}),
                                    (i.tags['PostHog URL'] = e.config.api_host + '/person/' + e.get_distinct_id())
                                var r = { $sentry_event_id: i.event_id, $sentry_exception: i.exception }
                                return (
                                    t &&
                                        o &&
                                        (r.$sentry_url =
                                            'https://sentry.io/organizations/' +
                                            t +
                                            '/issues/?project=' +
                                            o +
                                            '&query=' +
                                            i.event_id),
                                    e.capture('$exception', r),
                                    i
                                )
                            })
                        }
                    }),
                    (D.prototype.decodeLZ64 = o.LZString.decompressFromBase64),
                    (D.prototype.init = D.prototype.init),
                    (D.prototype.reset = D.prototype.reset),
                    (D.prototype.capture = D.prototype.capture),
                    (D.prototype.capture_pageview = D.prototype.capture_pageview),
                    (D.prototype.register = D.prototype.register),
                    (D.prototype.register_once = D.prototype.register_once),
                    (D.prototype.unregister = D.prototype.unregister),
                    (D.prototype.identify = D.prototype.identify),
                    (D.prototype.alias = D.prototype.alias),
                    (D.prototype.set_config = D.prototype.set_config),
                    (D.prototype.get_config = D.prototype.get_config),
                    (D.prototype.get_property = D.prototype.get_property),
                    (D.prototype.get_distinct_id = D.prototype.get_distinct_id),
                    (D.prototype.toString = D.prototype.toString),
                    (D.prototype.opt_out_captureing = D.prototype.opt_out_captureing),
                    (D.prototype.opt_in_captureing = D.prototype.opt_in_captureing),
                    (D.prototype.has_opted_out_captureing = D.prototype.has_opted_out_captureing),
                    (D.prototype.has_opted_in_captureing = D.prototype.has_opted_in_captureing),
                    (D.prototype.clear_opt_in_out_captureing = D.prototype.clear_opt_in_out_captureing),
                    (D.prototype.opt_out_capturing = D.prototype.opt_out_capturing),
                    (D.prototype.opt_in_capturing = D.prototype.opt_in_capturing),
                    (D.prototype.has_opted_out_capturing = D.prototype.has_opted_out_capturing),
                    (D.prototype.has_opted_in_capturing = D.prototype.has_opted_in_capturing),
                    (D.prototype.clear_opt_in_out_capturing = D.prototype.clear_opt_in_out_capturing),
                    (D.prototype.isFeatureEnabled = D.prototype.isFeatureEnabled),
                    (D.prototype.reloadFeatureFlags = D.prototype.reloadFeatureFlags),
                    (D.prototype.onFeatureFlags = D.prototype.onFeatureFlags),
                    (D.prototype.decodeLZ64 = D.prototype.decodeLZ64),
                    (D.prototype.SentryIntegration = D.prototype.sentry_integration),
                    (D.prototype.LIB_VERSION = i.default.LIB_VERSION),
                    (c.PostHogPersistence.prototype.properties = c.PostHogPersistence.prototype.properties),
                    (c.PostHogPersistence.prototype.update_search_keyword =
                        c.PostHogPersistence.prototype.update_search_keyword),
                    (c.PostHogPersistence.prototype.update_referrer_info =
                        c.PostHogPersistence.prototype.update_referrer_info),
                    (c.PostHogPersistence.prototype.get_cross_subdomain =
                        c.PostHogPersistence.prototype.get_cross_subdomain),
                    (c.PostHogPersistence.prototype.clear = c.PostHogPersistence.prototype.clear),
                    r._.safewrap_class(D, ['identify'])
                var M = {},
                    C = function () {
                        r._.each(M, function (e, o) {
                            o !== F && (t[o] = e)
                        }),
                            (t._ = r._)
                    },
                    B = function () {
                        t.init = function (o, i, n) {
                            if (n) return t[n] || ((t[n] = M[n] = L(o, i, n)), t[n]._loaded()), t[n]
                            var s = t
                            M[F] ? (s = M[F]) : o && ((s = L(o, i, F))._loaded(), (M[F] = s)),
                                (t = s),
                                e === S && (r.window[F] = t),
                                C()
                        }
                    },
                    T = function () {
                        function e() {
                            e.done ||
                                ((e.done = !0),
                                (I = !1),
                                r._.each(M, function (e) {
                                    e._dom_loaded()
                                }))
                        }
                        if (r.document.addEventListener)
                            'complete' === r.document.readyState
                                ? e()
                                : r.document.addEventListener('DOMContentLoaded', e, !1)
                        else if (r.document.attachEvent) {
                            r.document.attachEvent('onreadystatechange', e)
                            var t = !1
                            try {
                                t = null === r.window.frameElement
                            } catch (o) {}
                            r.document.documentElement.doScroll &&
                                t &&
                                (function t() {
                                    try {
                                        r.document.documentElement.doScroll('left')
                                    } catch (o) {
                                        return void setTimeout(t, 1)
                                    }
                                    e()
                                })()
                        }
                        r._.register_event(r.window, 'load', e, !0)
                    }
                function N() {
                    ;(e = S),
                        r._.isUndefined(r.window.posthog) && (r.window.posthog = []),
                        (t = r.window.posthog).__loaded || (t.config && t.persistence)
                            ? r.console.error('PostHog library has already been downloaded at least once.')
                            : (r._.each(t._i, function (e) {
                                  e && r._.isArray(e) && (M[e[e.length - 1]] = L.apply(this, e))
                              }),
                              B(),
                              t.init(),
                              r._.each(M, function (e) {
                                  e._loaded()
                              }),
                              T())
                }
                function R() {
                    return (e = E), (t = new D()), B(), t.init(), T(), t
                }
            },
            {
                './lz-string': 'zdbk',
                './config': 'itQ5',
                './utils': 'FOZT',
                './autocapture': 'gR3r',
                './posthog-people': 'ecEG',
                './posthog-featureflags': 'aVqC',
                './posthog-persistence': 'MAdm',
                './extensions/sessionrecording': 'Z2N4',
                './extensions/toolbar': 'ZEpJ',
                './gdpr-utils': 'rxSh',
                './storage': 'KZ7Y',
                './request-queue': 'Je4H',
                './capture-metrics': 'TeHW',
                './compression': 'Ie9M',
                './send-request': 'tOu2',
            },
        ],
        e2xX: [
            function (require, module, exports) {
                'use strict'
                var r = require('./posthog-core')
                ;(0, r.init_from_snippet)()
            },
            { './posthog-core': 'ok3T' },
        ],
    },
    {},
    ['e2xX'],
    null
)
