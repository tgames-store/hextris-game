"use strict";(function(exports){exports.stringify=function(e){return JSON.stringify(e,(function(e,t){return t instanceof Function||"function"==typeof t?t.toString():t instanceof RegExp?"_PxEgEr_"+t:t}))},exports.parse=function(str,date2obj){var iso8061=!!date2obj&&/^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2}):(\d{2}(?:\.\d*)?)Z$/;return JSON.parse(str,(function(key,value){var prefix;return"string"!=typeof value||value.length<8?value:(prefix=value.substring(0,8),iso8061&&value.match(iso8061)?new Date(value):"function"===prefix?eval("("+value+")"):"_PxEgEr_"===prefix?eval(value.slice(8)):value)}))},exports.clone=function(e,t){return exports.parse(exports.stringify(e),t)}})("undefined"==typeof exports?window.JSONfn={}:exports);