import {
  __commonJS
} from "./chunk-RSJERJUL.js";

// node_modules/openai/node_modules/axios/lib/helpers/bind.js
var require_bind = __commonJS({
  "node_modules/openai/node_modules/axios/lib/helpers/bind.js"(exports, module) {
    "use strict";
    module.exports = function bind(fn, thisArg) {
      return function wrap() {
        var args = new Array(arguments.length);
        for (var i = 0; i < args.length; i++) {
          args[i] = arguments[i];
        }
        return fn.apply(thisArg, args);
      };
    };
  }
});

// node_modules/openai/node_modules/axios/lib/utils.js
var require_utils = __commonJS({
  "node_modules/openai/node_modules/axios/lib/utils.js"(exports, module) {
    "use strict";
    var bind = require_bind();
    var toString = Object.prototype.toString;
    function isArray(val) {
      return Array.isArray(val);
    }
    function isUndefined(val) {
      return typeof val === "undefined";
    }
    function isBuffer(val) {
      return val !== null && !isUndefined(val) && val.constructor !== null && !isUndefined(val.constructor) && typeof val.constructor.isBuffer === "function" && val.constructor.isBuffer(val);
    }
    function isArrayBuffer(val) {
      return toString.call(val) === "[object ArrayBuffer]";
    }
    function isFormData(val) {
      return toString.call(val) === "[object FormData]";
    }
    function isArrayBufferView(val) {
      var result;
      if (typeof ArrayBuffer !== "undefined" && ArrayBuffer.isView) {
        result = ArrayBuffer.isView(val);
      } else {
        result = val && val.buffer && isArrayBuffer(val.buffer);
      }
      return result;
    }
    function isString(val) {
      return typeof val === "string";
    }
    function isNumber(val) {
      return typeof val === "number";
    }
    function isObject(val) {
      return val !== null && typeof val === "object";
    }
    function isPlainObject(val) {
      if (toString.call(val) !== "[object Object]") {
        return false;
      }
      var prototype = Object.getPrototypeOf(val);
      return prototype === null || prototype === Object.prototype;
    }
    function isDate(val) {
      return toString.call(val) === "[object Date]";
    }
    function isFile(val) {
      return toString.call(val) === "[object File]";
    }
    function isBlob(val) {
      return toString.call(val) === "[object Blob]";
    }
    function isFunction(val) {
      return toString.call(val) === "[object Function]";
    }
    function isStream(val) {
      return isObject(val) && isFunction(val.pipe);
    }
    function isURLSearchParams(val) {
      return toString.call(val) === "[object URLSearchParams]";
    }
    function trim(str) {
      return str.trim ? str.trim() : str.replace(/^\s+|\s+$/g, "");
    }
    function isStandardBrowserEnv() {
      if (typeof navigator !== "undefined" && (navigator.product === "ReactNative" || navigator.product === "NativeScript" || navigator.product === "NS")) {
        return false;
      }
      return typeof window !== "undefined" && typeof document !== "undefined";
    }
    function forEach(obj, fn) {
      if (obj === null || typeof obj === "undefined") {
        return;
      }
      if (typeof obj !== "object") {
        obj = [obj];
      }
      if (isArray(obj)) {
        for (var i = 0, l = obj.length; i < l; i++) {
          fn.call(null, obj[i], i, obj);
        }
      } else {
        for (var key in obj) {
          if (Object.prototype.hasOwnProperty.call(obj, key)) {
            fn.call(null, obj[key], key, obj);
          }
        }
      }
    }
    function merge() {
      var result = {};
      function assignValue(val, key) {
        if (isPlainObject(result[key]) && isPlainObject(val)) {
          result[key] = merge(result[key], val);
        } else if (isPlainObject(val)) {
          result[key] = merge({}, val);
        } else if (isArray(val)) {
          result[key] = val.slice();
        } else {
          result[key] = val;
        }
      }
      for (var i = 0, l = arguments.length; i < l; i++) {
        forEach(arguments[i], assignValue);
      }
      return result;
    }
    function extend(a, b, thisArg) {
      forEach(b, function assignValue(val, key) {
        if (thisArg && typeof val === "function") {
          a[key] = bind(val, thisArg);
        } else {
          a[key] = val;
        }
      });
      return a;
    }
    function stripBOM(content) {
      if (content.charCodeAt(0) === 65279) {
        content = content.slice(1);
      }
      return content;
    }
    module.exports = {
      isArray,
      isArrayBuffer,
      isBuffer,
      isFormData,
      isArrayBufferView,
      isString,
      isNumber,
      isObject,
      isPlainObject,
      isUndefined,
      isDate,
      isFile,
      isBlob,
      isFunction,
      isStream,
      isURLSearchParams,
      isStandardBrowserEnv,
      forEach,
      merge,
      extend,
      trim,
      stripBOM
    };
  }
});

// node_modules/openai/node_modules/axios/lib/helpers/buildURL.js
var require_buildURL = __commonJS({
  "node_modules/openai/node_modules/axios/lib/helpers/buildURL.js"(exports, module) {
    "use strict";
    var utils = require_utils();
    function encode(val) {
      return encodeURIComponent(val).replace(/%3A/gi, ":").replace(/%24/g, "$").replace(/%2C/gi, ",").replace(/%20/g, "+").replace(/%5B/gi, "[").replace(/%5D/gi, "]");
    }
    module.exports = function buildURL(url, params, paramsSerializer) {
      if (!params) {
        return url;
      }
      var serializedParams;
      if (paramsSerializer) {
        serializedParams = paramsSerializer(params);
      } else if (utils.isURLSearchParams(params)) {
        serializedParams = params.toString();
      } else {
        var parts = [];
        utils.forEach(params, function serialize(val, key) {
          if (val === null || typeof val === "undefined") {
            return;
          }
          if (utils.isArray(val)) {
            key = key + "[]";
          } else {
            val = [val];
          }
          utils.forEach(val, function parseValue(v) {
            if (utils.isDate(v)) {
              v = v.toISOString();
            } else if (utils.isObject(v)) {
              v = JSON.stringify(v);
            }
            parts.push(encode(key) + "=" + encode(v));
          });
        });
        serializedParams = parts.join("&");
      }
      if (serializedParams) {
        var hashmarkIndex = url.indexOf("#");
        if (hashmarkIndex !== -1) {
          url = url.slice(0, hashmarkIndex);
        }
        url += (url.indexOf("?") === -1 ? "?" : "&") + serializedParams;
      }
      return url;
    };
  }
});

// node_modules/openai/node_modules/axios/lib/core/InterceptorManager.js
var require_InterceptorManager = __commonJS({
  "node_modules/openai/node_modules/axios/lib/core/InterceptorManager.js"(exports, module) {
    "use strict";
    var utils = require_utils();
    function InterceptorManager() {
      this.handlers = [];
    }
    InterceptorManager.prototype.use = function use(fulfilled, rejected, options) {
      this.handlers.push({
        fulfilled,
        rejected,
        synchronous: options ? options.synchronous : false,
        runWhen: options ? options.runWhen : null
      });
      return this.handlers.length - 1;
    };
    InterceptorManager.prototype.eject = function eject(id) {
      if (this.handlers[id]) {
        this.handlers[id] = null;
      }
    };
    InterceptorManager.prototype.forEach = function forEach(fn) {
      utils.forEach(this.handlers, function forEachHandler(h) {
        if (h !== null) {
          fn(h);
        }
      });
    };
    module.exports = InterceptorManager;
  }
});

// node_modules/openai/node_modules/axios/lib/helpers/normalizeHeaderName.js
var require_normalizeHeaderName = __commonJS({
  "node_modules/openai/node_modules/axios/lib/helpers/normalizeHeaderName.js"(exports, module) {
    "use strict";
    var utils = require_utils();
    module.exports = function normalizeHeaderName(headers, normalizedName) {
      utils.forEach(headers, function processHeader(value, name) {
        if (name !== normalizedName && name.toUpperCase() === normalizedName.toUpperCase()) {
          headers[normalizedName] = value;
          delete headers[name];
        }
      });
    };
  }
});

// node_modules/openai/node_modules/axios/lib/core/enhanceError.js
var require_enhanceError = __commonJS({
  "node_modules/openai/node_modules/axios/lib/core/enhanceError.js"(exports, module) {
    "use strict";
    module.exports = function enhanceError(error, config, code, request, response) {
      error.config = config;
      if (code) {
        error.code = code;
      }
      error.request = request;
      error.response = response;
      error.isAxiosError = true;
      error.toJSON = function toJSON() {
        return {
          // Standard
          message: this.message,
          name: this.name,
          // Microsoft
          description: this.description,
          number: this.number,
          // Mozilla
          fileName: this.fileName,
          lineNumber: this.lineNumber,
          columnNumber: this.columnNumber,
          stack: this.stack,
          // Axios
          config: this.config,
          code: this.code,
          status: this.response && this.response.status ? this.response.status : null
        };
      };
      return error;
    };
  }
});

// node_modules/openai/node_modules/axios/lib/defaults/transitional.js
var require_transitional = __commonJS({
  "node_modules/openai/node_modules/axios/lib/defaults/transitional.js"(exports, module) {
    "use strict";
    module.exports = {
      silentJSONParsing: true,
      forcedJSONParsing: true,
      clarifyTimeoutError: false
    };
  }
});

// node_modules/openai/node_modules/axios/lib/core/createError.js
var require_createError = __commonJS({
  "node_modules/openai/node_modules/axios/lib/core/createError.js"(exports, module) {
    "use strict";
    var enhanceError = require_enhanceError();
    module.exports = function createError(message, config, code, request, response) {
      var error = new Error(message);
      return enhanceError(error, config, code, request, response);
    };
  }
});

// node_modules/openai/node_modules/axios/lib/core/settle.js
var require_settle = __commonJS({
  "node_modules/openai/node_modules/axios/lib/core/settle.js"(exports, module) {
    "use strict";
    var createError = require_createError();
    module.exports = function settle(resolve, reject, response) {
      var validateStatus = response.config.validateStatus;
      if (!response.status || !validateStatus || validateStatus(response.status)) {
        resolve(response);
      } else {
        reject(createError(
          "Request failed with status code " + response.status,
          response.config,
          null,
          response.request,
          response
        ));
      }
    };
  }
});

// node_modules/openai/node_modules/axios/lib/helpers/cookies.js
var require_cookies = __commonJS({
  "node_modules/openai/node_modules/axios/lib/helpers/cookies.js"(exports, module) {
    "use strict";
    var utils = require_utils();
    module.exports = utils.isStandardBrowserEnv() ? (
      // Standard browser envs support document.cookie
      function standardBrowserEnv() {
        return {
          write: function write(name, value, expires, path, domain, secure) {
            var cookie = [];
            cookie.push(name + "=" + encodeURIComponent(value));
            if (utils.isNumber(expires)) {
              cookie.push("expires=" + new Date(expires).toGMTString());
            }
            if (utils.isString(path)) {
              cookie.push("path=" + path);
            }
            if (utils.isString(domain)) {
              cookie.push("domain=" + domain);
            }
            if (secure === true) {
              cookie.push("secure");
            }
            document.cookie = cookie.join("; ");
          },
          read: function read(name) {
            var match = document.cookie.match(new RegExp("(^|;\\s*)(" + name + ")=([^;]*)"));
            return match ? decodeURIComponent(match[3]) : null;
          },
          remove: function remove(name) {
            this.write(name, "", Date.now() - 864e5);
          }
        };
      }()
    ) : (
      // Non standard browser env (web workers, react-native) lack needed support.
      function nonStandardBrowserEnv() {
        return {
          write: function write() {
          },
          read: function read() {
            return null;
          },
          remove: function remove() {
          }
        };
      }()
    );
  }
});

// node_modules/openai/node_modules/axios/lib/helpers/isAbsoluteURL.js
var require_isAbsoluteURL = __commonJS({
  "node_modules/openai/node_modules/axios/lib/helpers/isAbsoluteURL.js"(exports, module) {
    "use strict";
    module.exports = function isAbsoluteURL(url) {
      return /^([a-z][a-z\d+\-.]*:)?\/\//i.test(url);
    };
  }
});

// node_modules/openai/node_modules/axios/lib/helpers/combineURLs.js
var require_combineURLs = __commonJS({
  "node_modules/openai/node_modules/axios/lib/helpers/combineURLs.js"(exports, module) {
    "use strict";
    module.exports = function combineURLs(baseURL, relativeURL) {
      return relativeURL ? baseURL.replace(/\/+$/, "") + "/" + relativeURL.replace(/^\/+/, "") : baseURL;
    };
  }
});

// node_modules/openai/node_modules/axios/lib/core/buildFullPath.js
var require_buildFullPath = __commonJS({
  "node_modules/openai/node_modules/axios/lib/core/buildFullPath.js"(exports, module) {
    "use strict";
    var isAbsoluteURL = require_isAbsoluteURL();
    var combineURLs = require_combineURLs();
    module.exports = function buildFullPath(baseURL, requestedURL) {
      if (baseURL && !isAbsoluteURL(requestedURL)) {
        return combineURLs(baseURL, requestedURL);
      }
      return requestedURL;
    };
  }
});

// node_modules/openai/node_modules/axios/lib/helpers/parseHeaders.js
var require_parseHeaders = __commonJS({
  "node_modules/openai/node_modules/axios/lib/helpers/parseHeaders.js"(exports, module) {
    "use strict";
    var utils = require_utils();
    var ignoreDuplicateOf = [
      "age",
      "authorization",
      "content-length",
      "content-type",
      "etag",
      "expires",
      "from",
      "host",
      "if-modified-since",
      "if-unmodified-since",
      "last-modified",
      "location",
      "max-forwards",
      "proxy-authorization",
      "referer",
      "retry-after",
      "user-agent"
    ];
    module.exports = function parseHeaders(headers) {
      var parsed = {};
      var key;
      var val;
      var i;
      if (!headers) {
        return parsed;
      }
      utils.forEach(headers.split("\n"), function parser(line) {
        i = line.indexOf(":");
        key = utils.trim(line.substr(0, i)).toLowerCase();
        val = utils.trim(line.substr(i + 1));
        if (key) {
          if (parsed[key] && ignoreDuplicateOf.indexOf(key) >= 0) {
            return;
          }
          if (key === "set-cookie") {
            parsed[key] = (parsed[key] ? parsed[key] : []).concat([val]);
          } else {
            parsed[key] = parsed[key] ? parsed[key] + ", " + val : val;
          }
        }
      });
      return parsed;
    };
  }
});

// node_modules/openai/node_modules/axios/lib/helpers/isURLSameOrigin.js
var require_isURLSameOrigin = __commonJS({
  "node_modules/openai/node_modules/axios/lib/helpers/isURLSameOrigin.js"(exports, module) {
    "use strict";
    var utils = require_utils();
    module.exports = utils.isStandardBrowserEnv() ? (
      // Standard browser envs have full support of the APIs needed to test
      // whether the request URL is of the same origin as current location.
      function standardBrowserEnv() {
        var msie = /(msie|trident)/i.test(navigator.userAgent);
        var urlParsingNode = document.createElement("a");
        var originURL;
        function resolveURL(url) {
          var href = url;
          if (msie) {
            urlParsingNode.setAttribute("href", href);
            href = urlParsingNode.href;
          }
          urlParsingNode.setAttribute("href", href);
          return {
            href: urlParsingNode.href,
            protocol: urlParsingNode.protocol ? urlParsingNode.protocol.replace(/:$/, "") : "",
            host: urlParsingNode.host,
            search: urlParsingNode.search ? urlParsingNode.search.replace(/^\?/, "") : "",
            hash: urlParsingNode.hash ? urlParsingNode.hash.replace(/^#/, "") : "",
            hostname: urlParsingNode.hostname,
            port: urlParsingNode.port,
            pathname: urlParsingNode.pathname.charAt(0) === "/" ? urlParsingNode.pathname : "/" + urlParsingNode.pathname
          };
        }
        originURL = resolveURL(window.location.href);
        return function isURLSameOrigin(requestURL) {
          var parsed = utils.isString(requestURL) ? resolveURL(requestURL) : requestURL;
          return parsed.protocol === originURL.protocol && parsed.host === originURL.host;
        };
      }()
    ) : (
      // Non standard browser envs (web workers, react-native) lack needed support.
      function nonStandardBrowserEnv() {
        return function isURLSameOrigin() {
          return true;
        };
      }()
    );
  }
});

// node_modules/openai/node_modules/axios/lib/cancel/Cancel.js
var require_Cancel = __commonJS({
  "node_modules/openai/node_modules/axios/lib/cancel/Cancel.js"(exports, module) {
    "use strict";
    function Cancel(message) {
      this.message = message;
    }
    Cancel.prototype.toString = function toString() {
      return "Cancel" + (this.message ? ": " + this.message : "");
    };
    Cancel.prototype.__CANCEL__ = true;
    module.exports = Cancel;
  }
});

// node_modules/openai/node_modules/axios/lib/adapters/xhr.js
var require_xhr = __commonJS({
  "node_modules/openai/node_modules/axios/lib/adapters/xhr.js"(exports, module) {
    "use strict";
    var utils = require_utils();
    var settle = require_settle();
    var cookies = require_cookies();
    var buildURL = require_buildURL();
    var buildFullPath = require_buildFullPath();
    var parseHeaders = require_parseHeaders();
    var isURLSameOrigin = require_isURLSameOrigin();
    var createError = require_createError();
    var transitionalDefaults = require_transitional();
    var Cancel = require_Cancel();
    module.exports = function xhrAdapter(config) {
      return new Promise(function dispatchXhrRequest(resolve, reject) {
        var requestData = config.data;
        var requestHeaders = config.headers;
        var responseType = config.responseType;
        var onCanceled;
        function done() {
          if (config.cancelToken) {
            config.cancelToken.unsubscribe(onCanceled);
          }
          if (config.signal) {
            config.signal.removeEventListener("abort", onCanceled);
          }
        }
        if (utils.isFormData(requestData)) {
          delete requestHeaders["Content-Type"];
        }
        var request = new XMLHttpRequest();
        if (config.auth) {
          var username = config.auth.username || "";
          var password = config.auth.password ? unescape(encodeURIComponent(config.auth.password)) : "";
          requestHeaders.Authorization = "Basic " + btoa(username + ":" + password);
        }
        var fullPath = buildFullPath(config.baseURL, config.url);
        request.open(config.method.toUpperCase(), buildURL(fullPath, config.params, config.paramsSerializer), true);
        request.timeout = config.timeout;
        function onloadend() {
          if (!request) {
            return;
          }
          var responseHeaders = "getAllResponseHeaders" in request ? parseHeaders(request.getAllResponseHeaders()) : null;
          var responseData = !responseType || responseType === "text" || responseType === "json" ? request.responseText : request.response;
          var response = {
            data: responseData,
            status: request.status,
            statusText: request.statusText,
            headers: responseHeaders,
            config,
            request
          };
          settle(function _resolve(value) {
            resolve(value);
            done();
          }, function _reject(err) {
            reject(err);
            done();
          }, response);
          request = null;
        }
        if ("onloadend" in request) {
          request.onloadend = onloadend;
        } else {
          request.onreadystatechange = function handleLoad() {
            if (!request || request.readyState !== 4) {
              return;
            }
            if (request.status === 0 && !(request.responseURL && request.responseURL.indexOf("file:") === 0)) {
              return;
            }
            setTimeout(onloadend);
          };
        }
        request.onabort = function handleAbort() {
          if (!request) {
            return;
          }
          reject(createError("Request aborted", config, "ECONNABORTED", request));
          request = null;
        };
        request.onerror = function handleError() {
          reject(createError("Network Error", config, null, request));
          request = null;
        };
        request.ontimeout = function handleTimeout() {
          var timeoutErrorMessage = config.timeout ? "timeout of " + config.timeout + "ms exceeded" : "timeout exceeded";
          var transitional = config.transitional || transitionalDefaults;
          if (config.timeoutErrorMessage) {
            timeoutErrorMessage = config.timeoutErrorMessage;
          }
          reject(createError(
            timeoutErrorMessage,
            config,
            transitional.clarifyTimeoutError ? "ETIMEDOUT" : "ECONNABORTED",
            request
          ));
          request = null;
        };
        if (utils.isStandardBrowserEnv()) {
          var xsrfValue = (config.withCredentials || isURLSameOrigin(fullPath)) && config.xsrfCookieName ? cookies.read(config.xsrfCookieName) : void 0;
          if (xsrfValue) {
            requestHeaders[config.xsrfHeaderName] = xsrfValue;
          }
        }
        if ("setRequestHeader" in request) {
          utils.forEach(requestHeaders, function setRequestHeader(val, key) {
            if (typeof requestData === "undefined" && key.toLowerCase() === "content-type") {
              delete requestHeaders[key];
            } else {
              request.setRequestHeader(key, val);
            }
          });
        }
        if (!utils.isUndefined(config.withCredentials)) {
          request.withCredentials = !!config.withCredentials;
        }
        if (responseType && responseType !== "json") {
          request.responseType = config.responseType;
        }
        if (typeof config.onDownloadProgress === "function") {
          request.addEventListener("progress", config.onDownloadProgress);
        }
        if (typeof config.onUploadProgress === "function" && request.upload) {
          request.upload.addEventListener("progress", config.onUploadProgress);
        }
        if (config.cancelToken || config.signal) {
          onCanceled = function(cancel) {
            if (!request) {
              return;
            }
            reject(!cancel || cancel && cancel.type ? new Cancel("canceled") : cancel);
            request.abort();
            request = null;
          };
          config.cancelToken && config.cancelToken.subscribe(onCanceled);
          if (config.signal) {
            config.signal.aborted ? onCanceled() : config.signal.addEventListener("abort", onCanceled);
          }
        }
        if (!requestData) {
          requestData = null;
        }
        request.send(requestData);
      });
    };
  }
});

// node_modules/openai/node_modules/axios/lib/defaults/index.js
var require_defaults = __commonJS({
  "node_modules/openai/node_modules/axios/lib/defaults/index.js"(exports, module) {
    "use strict";
    var utils = require_utils();
    var normalizeHeaderName = require_normalizeHeaderName();
    var enhanceError = require_enhanceError();
    var transitionalDefaults = require_transitional();
    var DEFAULT_CONTENT_TYPE = {
      "Content-Type": "application/x-www-form-urlencoded"
    };
    function setContentTypeIfUnset(headers, value) {
      if (!utils.isUndefined(headers) && utils.isUndefined(headers["Content-Type"])) {
        headers["Content-Type"] = value;
      }
    }
    function getDefaultAdapter() {
      var adapter;
      if (typeof XMLHttpRequest !== "undefined") {
        adapter = require_xhr();
      } else if (typeof process !== "undefined" && Object.prototype.toString.call(process) === "[object process]") {
        adapter = require_xhr();
      }
      return adapter;
    }
    function stringifySafely(rawValue, parser, encoder) {
      if (utils.isString(rawValue)) {
        try {
          (parser || JSON.parse)(rawValue);
          return utils.trim(rawValue);
        } catch (e) {
          if (e.name !== "SyntaxError") {
            throw e;
          }
        }
      }
      return (encoder || JSON.stringify)(rawValue);
    }
    var defaults = {
      transitional: transitionalDefaults,
      adapter: getDefaultAdapter(),
      transformRequest: [function transformRequest(data, headers) {
        normalizeHeaderName(headers, "Accept");
        normalizeHeaderName(headers, "Content-Type");
        if (utils.isFormData(data) || utils.isArrayBuffer(data) || utils.isBuffer(data) || utils.isStream(data) || utils.isFile(data) || utils.isBlob(data)) {
          return data;
        }
        if (utils.isArrayBufferView(data)) {
          return data.buffer;
        }
        if (utils.isURLSearchParams(data)) {
          setContentTypeIfUnset(headers, "application/x-www-form-urlencoded;charset=utf-8");
          return data.toString();
        }
        if (utils.isObject(data) || headers && headers["Content-Type"] === "application/json") {
          setContentTypeIfUnset(headers, "application/json");
          return stringifySafely(data);
        }
        return data;
      }],
      transformResponse: [function transformResponse(data) {
        var transitional = this.transitional || defaults.transitional;
        var silentJSONParsing = transitional && transitional.silentJSONParsing;
        var forcedJSONParsing = transitional && transitional.forcedJSONParsing;
        var strictJSONParsing = !silentJSONParsing && this.responseType === "json";
        if (strictJSONParsing || forcedJSONParsing && utils.isString(data) && data.length) {
          try {
            return JSON.parse(data);
          } catch (e) {
            if (strictJSONParsing) {
              if (e.name === "SyntaxError") {
                throw enhanceError(e, this, "E_JSON_PARSE");
              }
              throw e;
            }
          }
        }
        return data;
      }],
      /**
       * A timeout in milliseconds to abort a request. If set to 0 (default) a
       * timeout is not created.
       */
      timeout: 0,
      xsrfCookieName: "XSRF-TOKEN",
      xsrfHeaderName: "X-XSRF-TOKEN",
      maxContentLength: -1,
      maxBodyLength: -1,
      validateStatus: function validateStatus(status) {
        return status >= 200 && status < 300;
      },
      headers: {
        common: {
          "Accept": "application/json, text/plain, */*"
        }
      }
    };
    utils.forEach(["delete", "get", "head"], function forEachMethodNoData(method) {
      defaults.headers[method] = {};
    });
    utils.forEach(["post", "put", "patch"], function forEachMethodWithData(method) {
      defaults.headers[method] = utils.merge(DEFAULT_CONTENT_TYPE);
    });
    module.exports = defaults;
  }
});

// node_modules/openai/node_modules/axios/lib/core/transformData.js
var require_transformData = __commonJS({
  "node_modules/openai/node_modules/axios/lib/core/transformData.js"(exports, module) {
    "use strict";
    var utils = require_utils();
    var defaults = require_defaults();
    module.exports = function transformData(data, headers, fns) {
      var context = this || defaults;
      utils.forEach(fns, function transform(fn) {
        data = fn.call(context, data, headers);
      });
      return data;
    };
  }
});

// node_modules/openai/node_modules/axios/lib/cancel/isCancel.js
var require_isCancel = __commonJS({
  "node_modules/openai/node_modules/axios/lib/cancel/isCancel.js"(exports, module) {
    "use strict";
    module.exports = function isCancel(value) {
      return !!(value && value.__CANCEL__);
    };
  }
});

// node_modules/openai/node_modules/axios/lib/core/dispatchRequest.js
var require_dispatchRequest = __commonJS({
  "node_modules/openai/node_modules/axios/lib/core/dispatchRequest.js"(exports, module) {
    "use strict";
    var utils = require_utils();
    var transformData = require_transformData();
    var isCancel = require_isCancel();
    var defaults = require_defaults();
    var Cancel = require_Cancel();
    function throwIfCancellationRequested(config) {
      if (config.cancelToken) {
        config.cancelToken.throwIfRequested();
      }
      if (config.signal && config.signal.aborted) {
        throw new Cancel("canceled");
      }
    }
    module.exports = function dispatchRequest(config) {
      throwIfCancellationRequested(config);
      config.headers = config.headers || {};
      config.data = transformData.call(
        config,
        config.data,
        config.headers,
        config.transformRequest
      );
      config.headers = utils.merge(
        config.headers.common || {},
        config.headers[config.method] || {},
        config.headers
      );
      utils.forEach(
        ["delete", "get", "head", "post", "put", "patch", "common"],
        function cleanHeaderConfig(method) {
          delete config.headers[method];
        }
      );
      var adapter = config.adapter || defaults.adapter;
      return adapter(config).then(function onAdapterResolution(response) {
        throwIfCancellationRequested(config);
        response.data = transformData.call(
          config,
          response.data,
          response.headers,
          config.transformResponse
        );
        return response;
      }, function onAdapterRejection(reason) {
        if (!isCancel(reason)) {
          throwIfCancellationRequested(config);
          if (reason && reason.response) {
            reason.response.data = transformData.call(
              config,
              reason.response.data,
              reason.response.headers,
              config.transformResponse
            );
          }
        }
        return Promise.reject(reason);
      });
    };
  }
});

// node_modules/openai/node_modules/axios/lib/core/mergeConfig.js
var require_mergeConfig = __commonJS({
  "node_modules/openai/node_modules/axios/lib/core/mergeConfig.js"(exports, module) {
    "use strict";
    var utils = require_utils();
    module.exports = function mergeConfig(config1, config2) {
      config2 = config2 || {};
      var config = {};
      function getMergedValue(target, source) {
        if (utils.isPlainObject(target) && utils.isPlainObject(source)) {
          return utils.merge(target, source);
        } else if (utils.isPlainObject(source)) {
          return utils.merge({}, source);
        } else if (utils.isArray(source)) {
          return source.slice();
        }
        return source;
      }
      function mergeDeepProperties(prop) {
        if (!utils.isUndefined(config2[prop])) {
          return getMergedValue(config1[prop], config2[prop]);
        } else if (!utils.isUndefined(config1[prop])) {
          return getMergedValue(void 0, config1[prop]);
        }
      }
      function valueFromConfig2(prop) {
        if (!utils.isUndefined(config2[prop])) {
          return getMergedValue(void 0, config2[prop]);
        }
      }
      function defaultToConfig2(prop) {
        if (!utils.isUndefined(config2[prop])) {
          return getMergedValue(void 0, config2[prop]);
        } else if (!utils.isUndefined(config1[prop])) {
          return getMergedValue(void 0, config1[prop]);
        }
      }
      function mergeDirectKeys(prop) {
        if (prop in config2) {
          return getMergedValue(config1[prop], config2[prop]);
        } else if (prop in config1) {
          return getMergedValue(void 0, config1[prop]);
        }
      }
      var mergeMap = {
        "url": valueFromConfig2,
        "method": valueFromConfig2,
        "data": valueFromConfig2,
        "baseURL": defaultToConfig2,
        "transformRequest": defaultToConfig2,
        "transformResponse": defaultToConfig2,
        "paramsSerializer": defaultToConfig2,
        "timeout": defaultToConfig2,
        "timeoutMessage": defaultToConfig2,
        "withCredentials": defaultToConfig2,
        "adapter": defaultToConfig2,
        "responseType": defaultToConfig2,
        "xsrfCookieName": defaultToConfig2,
        "xsrfHeaderName": defaultToConfig2,
        "onUploadProgress": defaultToConfig2,
        "onDownloadProgress": defaultToConfig2,
        "decompress": defaultToConfig2,
        "maxContentLength": defaultToConfig2,
        "maxBodyLength": defaultToConfig2,
        "transport": defaultToConfig2,
        "httpAgent": defaultToConfig2,
        "httpsAgent": defaultToConfig2,
        "cancelToken": defaultToConfig2,
        "socketPath": defaultToConfig2,
        "responseEncoding": defaultToConfig2,
        "validateStatus": mergeDirectKeys
      };
      utils.forEach(Object.keys(config1).concat(Object.keys(config2)), function computeConfigValue(prop) {
        var merge = mergeMap[prop] || mergeDeepProperties;
        var configValue = merge(prop);
        utils.isUndefined(configValue) && merge !== mergeDirectKeys || (config[prop] = configValue);
      });
      return config;
    };
  }
});

// node_modules/openai/node_modules/axios/lib/env/data.js
var require_data = __commonJS({
  "node_modules/openai/node_modules/axios/lib/env/data.js"(exports, module) {
    module.exports = {
      "version": "0.26.1"
    };
  }
});

// node_modules/openai/node_modules/axios/lib/helpers/validator.js
var require_validator = __commonJS({
  "node_modules/openai/node_modules/axios/lib/helpers/validator.js"(exports, module) {
    "use strict";
    var VERSION = require_data().version;
    var validators = {};
    ["object", "boolean", "number", "function", "string", "symbol"].forEach(function(type, i) {
      validators[type] = function validator(thing) {
        return typeof thing === type || "a" + (i < 1 ? "n " : " ") + type;
      };
    });
    var deprecatedWarnings = {};
    validators.transitional = function transitional(validator, version, message) {
      function formatMessage(opt, desc) {
        return "[Axios v" + VERSION + "] Transitional option '" + opt + "'" + desc + (message ? ". " + message : "");
      }
      return function(value, opt, opts) {
        if (validator === false) {
          throw new Error(formatMessage(opt, " has been removed" + (version ? " in " + version : "")));
        }
        if (version && !deprecatedWarnings[opt]) {
          deprecatedWarnings[opt] = true;
          console.warn(
            formatMessage(
              opt,
              " has been deprecated since v" + version + " and will be removed in the near future"
            )
          );
        }
        return validator ? validator(value, opt, opts) : true;
      };
    };
    function assertOptions(options, schema, allowUnknown) {
      if (typeof options !== "object") {
        throw new TypeError("options must be an object");
      }
      var keys = Object.keys(options);
      var i = keys.length;
      while (i-- > 0) {
        var opt = keys[i];
        var validator = schema[opt];
        if (validator) {
          var value = options[opt];
          var result = value === void 0 || validator(value, opt, options);
          if (result !== true) {
            throw new TypeError("option " + opt + " must be " + result);
          }
          continue;
        }
        if (allowUnknown !== true) {
          throw Error("Unknown option " + opt);
        }
      }
    }
    module.exports = {
      assertOptions,
      validators
    };
  }
});

// node_modules/openai/node_modules/axios/lib/core/Axios.js
var require_Axios = __commonJS({
  "node_modules/openai/node_modules/axios/lib/core/Axios.js"(exports, module) {
    "use strict";
    var utils = require_utils();
    var buildURL = require_buildURL();
    var InterceptorManager = require_InterceptorManager();
    var dispatchRequest = require_dispatchRequest();
    var mergeConfig = require_mergeConfig();
    var validator = require_validator();
    var validators = validator.validators;
    function Axios(instanceConfig) {
      this.defaults = instanceConfig;
      this.interceptors = {
        request: new InterceptorManager(),
        response: new InterceptorManager()
      };
    }
    Axios.prototype.request = function request(configOrUrl, config) {
      if (typeof configOrUrl === "string") {
        config = config || {};
        config.url = configOrUrl;
      } else {
        config = configOrUrl || {};
      }
      config = mergeConfig(this.defaults, config);
      if (config.method) {
        config.method = config.method.toLowerCase();
      } else if (this.defaults.method) {
        config.method = this.defaults.method.toLowerCase();
      } else {
        config.method = "get";
      }
      var transitional = config.transitional;
      if (transitional !== void 0) {
        validator.assertOptions(transitional, {
          silentJSONParsing: validators.transitional(validators.boolean),
          forcedJSONParsing: validators.transitional(validators.boolean),
          clarifyTimeoutError: validators.transitional(validators.boolean)
        }, false);
      }
      var requestInterceptorChain = [];
      var synchronousRequestInterceptors = true;
      this.interceptors.request.forEach(function unshiftRequestInterceptors(interceptor) {
        if (typeof interceptor.runWhen === "function" && interceptor.runWhen(config) === false) {
          return;
        }
        synchronousRequestInterceptors = synchronousRequestInterceptors && interceptor.synchronous;
        requestInterceptorChain.unshift(interceptor.fulfilled, interceptor.rejected);
      });
      var responseInterceptorChain = [];
      this.interceptors.response.forEach(function pushResponseInterceptors(interceptor) {
        responseInterceptorChain.push(interceptor.fulfilled, interceptor.rejected);
      });
      var promise;
      if (!synchronousRequestInterceptors) {
        var chain = [dispatchRequest, void 0];
        Array.prototype.unshift.apply(chain, requestInterceptorChain);
        chain = chain.concat(responseInterceptorChain);
        promise = Promise.resolve(config);
        while (chain.length) {
          promise = promise.then(chain.shift(), chain.shift());
        }
        return promise;
      }
      var newConfig = config;
      while (requestInterceptorChain.length) {
        var onFulfilled = requestInterceptorChain.shift();
        var onRejected = requestInterceptorChain.shift();
        try {
          newConfig = onFulfilled(newConfig);
        } catch (error) {
          onRejected(error);
          break;
        }
      }
      try {
        promise = dispatchRequest(newConfig);
      } catch (error) {
        return Promise.reject(error);
      }
      while (responseInterceptorChain.length) {
        promise = promise.then(responseInterceptorChain.shift(), responseInterceptorChain.shift());
      }
      return promise;
    };
    Axios.prototype.getUri = function getUri(config) {
      config = mergeConfig(this.defaults, config);
      return buildURL(config.url, config.params, config.paramsSerializer).replace(/^\?/, "");
    };
    utils.forEach(["delete", "get", "head", "options"], function forEachMethodNoData(method) {
      Axios.prototype[method] = function(url, config) {
        return this.request(mergeConfig(config || {}, {
          method,
          url,
          data: (config || {}).data
        }));
      };
    });
    utils.forEach(["post", "put", "patch"], function forEachMethodWithData(method) {
      Axios.prototype[method] = function(url, data, config) {
        return this.request(mergeConfig(config || {}, {
          method,
          url,
          data
        }));
      };
    });
    module.exports = Axios;
  }
});

// node_modules/openai/node_modules/axios/lib/cancel/CancelToken.js
var require_CancelToken = __commonJS({
  "node_modules/openai/node_modules/axios/lib/cancel/CancelToken.js"(exports, module) {
    "use strict";
    var Cancel = require_Cancel();
    function CancelToken(executor) {
      if (typeof executor !== "function") {
        throw new TypeError("executor must be a function.");
      }
      var resolvePromise;
      this.promise = new Promise(function promiseExecutor(resolve) {
        resolvePromise = resolve;
      });
      var token = this;
      this.promise.then(function(cancel) {
        if (!token._listeners)
          return;
        var i;
        var l = token._listeners.length;
        for (i = 0; i < l; i++) {
          token._listeners[i](cancel);
        }
        token._listeners = null;
      });
      this.promise.then = function(onfulfilled) {
        var _resolve;
        var promise = new Promise(function(resolve) {
          token.subscribe(resolve);
          _resolve = resolve;
        }).then(onfulfilled);
        promise.cancel = function reject() {
          token.unsubscribe(_resolve);
        };
        return promise;
      };
      executor(function cancel(message) {
        if (token.reason) {
          return;
        }
        token.reason = new Cancel(message);
        resolvePromise(token.reason);
      });
    }
    CancelToken.prototype.throwIfRequested = function throwIfRequested() {
      if (this.reason) {
        throw this.reason;
      }
    };
    CancelToken.prototype.subscribe = function subscribe(listener) {
      if (this.reason) {
        listener(this.reason);
        return;
      }
      if (this._listeners) {
        this._listeners.push(listener);
      } else {
        this._listeners = [listener];
      }
    };
    CancelToken.prototype.unsubscribe = function unsubscribe(listener) {
      if (!this._listeners) {
        return;
      }
      var index = this._listeners.indexOf(listener);
      if (index !== -1) {
        this._listeners.splice(index, 1);
      }
    };
    CancelToken.source = function source() {
      var cancel;
      var token = new CancelToken(function executor(c) {
        cancel = c;
      });
      return {
        token,
        cancel
      };
    };
    module.exports = CancelToken;
  }
});

// node_modules/openai/node_modules/axios/lib/helpers/spread.js
var require_spread = __commonJS({
  "node_modules/openai/node_modules/axios/lib/helpers/spread.js"(exports, module) {
    "use strict";
    module.exports = function spread(callback) {
      return function wrap(arr) {
        return callback.apply(null, arr);
      };
    };
  }
});

// node_modules/openai/node_modules/axios/lib/helpers/isAxiosError.js
var require_isAxiosError = __commonJS({
  "node_modules/openai/node_modules/axios/lib/helpers/isAxiosError.js"(exports, module) {
    "use strict";
    var utils = require_utils();
    module.exports = function isAxiosError(payload) {
      return utils.isObject(payload) && payload.isAxiosError === true;
    };
  }
});

// node_modules/openai/node_modules/axios/lib/axios.js
var require_axios = __commonJS({
  "node_modules/openai/node_modules/axios/lib/axios.js"(exports, module) {
    "use strict";
    var utils = require_utils();
    var bind = require_bind();
    var Axios = require_Axios();
    var mergeConfig = require_mergeConfig();
    var defaults = require_defaults();
    function createInstance(defaultConfig) {
      var context = new Axios(defaultConfig);
      var instance = bind(Axios.prototype.request, context);
      utils.extend(instance, Axios.prototype, context);
      utils.extend(instance, context);
      instance.create = function create(instanceConfig) {
        return createInstance(mergeConfig(defaultConfig, instanceConfig));
      };
      return instance;
    }
    var axios = createInstance(defaults);
    axios.Axios = Axios;
    axios.Cancel = require_Cancel();
    axios.CancelToken = require_CancelToken();
    axios.isCancel = require_isCancel();
    axios.VERSION = require_data().version;
    axios.all = function all(promises) {
      return Promise.all(promises);
    };
    axios.spread = require_spread();
    axios.isAxiosError = require_isAxiosError();
    module.exports = axios;
    module.exports.default = axios;
  }
});

// node_modules/openai/node_modules/axios/index.js
var require_axios2 = __commonJS({
  "node_modules/openai/node_modules/axios/index.js"(exports, module) {
    module.exports = require_axios();
  }
});

// node_modules/openai/dist/base.js
var require_base = __commonJS({
  "node_modules/openai/dist/base.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.RequiredError = exports.BaseAPI = exports.COLLECTION_FORMATS = exports.BASE_PATH = void 0;
    var axios_1 = require_axios2();
    exports.BASE_PATH = "https://api.openai.com/v1".replace(/\/+$/, "");
    exports.COLLECTION_FORMATS = {
      csv: ",",
      ssv: " ",
      tsv: "	",
      pipes: "|"
    };
    var BaseAPI = class {
      constructor(configuration, basePath = exports.BASE_PATH, axios = axios_1.default) {
        this.basePath = basePath;
        this.axios = axios;
        if (configuration) {
          this.configuration = configuration;
          this.basePath = configuration.basePath || this.basePath;
        }
      }
    };
    exports.BaseAPI = BaseAPI;
    var RequiredError = class extends Error {
      constructor(field, msg) {
        super(msg);
        this.field = field;
        this.name = "RequiredError";
      }
    };
    exports.RequiredError = RequiredError;
  }
});

// node_modules/openai/dist/common.js
var require_common = __commonJS({
  "node_modules/openai/dist/common.js"(exports) {
    "use strict";
    var __awaiter = exports && exports.__awaiter || function(thisArg, _arguments, P, generator) {
      function adopt(value) {
        return value instanceof P ? value : new P(function(resolve) {
          resolve(value);
        });
      }
      return new (P || (P = Promise))(function(resolve, reject) {
        function fulfilled(value) {
          try {
            step(generator.next(value));
          } catch (e) {
            reject(e);
          }
        }
        function rejected(value) {
          try {
            step(generator["throw"](value));
          } catch (e) {
            reject(e);
          }
        }
        function step(result) {
          result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
        }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
      });
    };
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.createRequestFunction = exports.toPathString = exports.serializeDataIfNeeded = exports.setSearchParams = exports.setOAuthToObject = exports.setBearerAuthToObject = exports.setBasicAuthToObject = exports.setApiKeyToObject = exports.assertParamExists = exports.DUMMY_BASE_URL = void 0;
    var base_1 = require_base();
    exports.DUMMY_BASE_URL = "https://example.com";
    exports.assertParamExists = function(functionName, paramName, paramValue) {
      if (paramValue === null || paramValue === void 0) {
        throw new base_1.RequiredError(paramName, `Required parameter ${paramName} was null or undefined when calling ${functionName}.`);
      }
    };
    exports.setApiKeyToObject = function(object, keyParamName, configuration) {
      return __awaiter(this, void 0, void 0, function* () {
        if (configuration && configuration.apiKey) {
          const localVarApiKeyValue = typeof configuration.apiKey === "function" ? yield configuration.apiKey(keyParamName) : yield configuration.apiKey;
          object[keyParamName] = localVarApiKeyValue;
        }
      });
    };
    exports.setBasicAuthToObject = function(object, configuration) {
      if (configuration && (configuration.username || configuration.password)) {
        object["auth"] = { username: configuration.username, password: configuration.password };
      }
    };
    exports.setBearerAuthToObject = function(object, configuration) {
      return __awaiter(this, void 0, void 0, function* () {
        if (configuration && configuration.accessToken) {
          const accessToken = typeof configuration.accessToken === "function" ? yield configuration.accessToken() : yield configuration.accessToken;
          object["Authorization"] = "Bearer " + accessToken;
        }
      });
    };
    exports.setOAuthToObject = function(object, name, scopes, configuration) {
      return __awaiter(this, void 0, void 0, function* () {
        if (configuration && configuration.accessToken) {
          const localVarAccessTokenValue = typeof configuration.accessToken === "function" ? yield configuration.accessToken(name, scopes) : yield configuration.accessToken;
          object["Authorization"] = "Bearer " + localVarAccessTokenValue;
        }
      });
    };
    function setFlattenedQueryParams(urlSearchParams, parameter, key = "") {
      if (parameter == null)
        return;
      if (typeof parameter === "object") {
        if (Array.isArray(parameter)) {
          parameter.forEach((item) => setFlattenedQueryParams(urlSearchParams, item, key));
        } else {
          Object.keys(parameter).forEach((currentKey) => setFlattenedQueryParams(urlSearchParams, parameter[currentKey], `${key}${key !== "" ? "." : ""}${currentKey}`));
        }
      } else {
        if (urlSearchParams.has(key)) {
          urlSearchParams.append(key, parameter);
        } else {
          urlSearchParams.set(key, parameter);
        }
      }
    }
    exports.setSearchParams = function(url, ...objects) {
      const searchParams = new URLSearchParams(url.search);
      setFlattenedQueryParams(searchParams, objects);
      url.search = searchParams.toString();
    };
    exports.serializeDataIfNeeded = function(value, requestOptions, configuration) {
      const nonString = typeof value !== "string";
      const needsSerialization = nonString && configuration && configuration.isJsonMime ? configuration.isJsonMime(requestOptions.headers["Content-Type"]) : nonString;
      return needsSerialization ? JSON.stringify(value !== void 0 ? value : {}) : value || "";
    };
    exports.toPathString = function(url) {
      return url.pathname + url.search + url.hash;
    };
    exports.createRequestFunction = function(axiosArgs, globalAxios, BASE_PATH, configuration) {
      return (axios = globalAxios, basePath = BASE_PATH) => {
        const axiosRequestArgs = Object.assign(Object.assign({}, axiosArgs.options), { url: ((configuration === null || configuration === void 0 ? void 0 : configuration.basePath) || basePath) + axiosArgs.url });
        return axios.request(axiosRequestArgs);
      };
    };
  }
});

// node_modules/openai/dist/api.js
var require_api = __commonJS({
  "node_modules/openai/dist/api.js"(exports) {
    "use strict";
    var __awaiter = exports && exports.__awaiter || function(thisArg, _arguments, P, generator) {
      function adopt(value) {
        return value instanceof P ? value : new P(function(resolve) {
          resolve(value);
        });
      }
      return new (P || (P = Promise))(function(resolve, reject) {
        function fulfilled(value) {
          try {
            step(generator.next(value));
          } catch (e) {
            reject(e);
          }
        }
        function rejected(value) {
          try {
            step(generator["throw"](value));
          } catch (e) {
            reject(e);
          }
        }
        function step(result) {
          result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
        }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
      });
    };
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.OpenAIApi = exports.OpenAIApiFactory = exports.OpenAIApiFp = exports.OpenAIApiAxiosParamCreator = exports.CreateImageRequestResponseFormatEnum = exports.CreateImageRequestSizeEnum = exports.ChatCompletionResponseMessageRoleEnum = exports.ChatCompletionRequestMessageRoleEnum = void 0;
    var axios_1 = require_axios2();
    var common_1 = require_common();
    var base_1 = require_base();
    exports.ChatCompletionRequestMessageRoleEnum = {
      System: "system",
      User: "user",
      Assistant: "assistant"
    };
    exports.ChatCompletionResponseMessageRoleEnum = {
      System: "system",
      User: "user",
      Assistant: "assistant"
    };
    exports.CreateImageRequestSizeEnum = {
      _256x256: "256x256",
      _512x512: "512x512",
      _1024x1024: "1024x1024"
    };
    exports.CreateImageRequestResponseFormatEnum = {
      Url: "url",
      B64Json: "b64_json"
    };
    exports.OpenAIApiAxiosParamCreator = function(configuration) {
      return {
        /**
         *
         * @summary Immediately cancel a fine-tune job.
         * @param {string} fineTuneId The ID of the fine-tune job to cancel
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        cancelFineTune: (fineTuneId, options = {}) => __awaiter(this, void 0, void 0, function* () {
          common_1.assertParamExists("cancelFineTune", "fineTuneId", fineTuneId);
          const localVarPath = `/fine-tunes/{fine_tune_id}/cancel`.replace(`{${"fine_tune_id"}}`, encodeURIComponent(String(fineTuneId)));
          const localVarUrlObj = new URL(localVarPath, common_1.DUMMY_BASE_URL);
          let baseOptions;
          if (configuration) {
            baseOptions = configuration.baseOptions;
          }
          const localVarRequestOptions = Object.assign(Object.assign({ method: "POST" }, baseOptions), options);
          const localVarHeaderParameter = {};
          const localVarQueryParameter = {};
          common_1.setSearchParams(localVarUrlObj, localVarQueryParameter);
          let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
          localVarRequestOptions.headers = Object.assign(Object.assign(Object.assign({}, localVarHeaderParameter), headersFromBaseOptions), options.headers);
          return {
            url: common_1.toPathString(localVarUrlObj),
            options: localVarRequestOptions
          };
        }),
        /**
         *
         * @summary Answers the specified question using the provided documents and examples.  The endpoint first [searches](/docs/api-reference/searches) over provided documents or files to find relevant context. The relevant context is combined with the provided examples and question to create the prompt for [completion](/docs/api-reference/completions).
         * @param {CreateAnswerRequest} createAnswerRequest
         * @param {*} [options] Override http request option.
         * @deprecated
         * @throws {RequiredError}
         */
        createAnswer: (createAnswerRequest, options = {}) => __awaiter(this, void 0, void 0, function* () {
          common_1.assertParamExists("createAnswer", "createAnswerRequest", createAnswerRequest);
          const localVarPath = `/answers`;
          const localVarUrlObj = new URL(localVarPath, common_1.DUMMY_BASE_URL);
          let baseOptions;
          if (configuration) {
            baseOptions = configuration.baseOptions;
          }
          const localVarRequestOptions = Object.assign(Object.assign({ method: "POST" }, baseOptions), options);
          const localVarHeaderParameter = {};
          const localVarQueryParameter = {};
          localVarHeaderParameter["Content-Type"] = "application/json";
          common_1.setSearchParams(localVarUrlObj, localVarQueryParameter);
          let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
          localVarRequestOptions.headers = Object.assign(Object.assign(Object.assign({}, localVarHeaderParameter), headersFromBaseOptions), options.headers);
          localVarRequestOptions.data = common_1.serializeDataIfNeeded(createAnswerRequest, localVarRequestOptions, configuration);
          return {
            url: common_1.toPathString(localVarUrlObj),
            options: localVarRequestOptions
          };
        }),
        /**
         *
         * @summary Creates a completion for the chat message
         * @param {CreateChatCompletionRequest} createChatCompletionRequest
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        createChatCompletion: (createChatCompletionRequest, options = {}) => __awaiter(this, void 0, void 0, function* () {
          common_1.assertParamExists("createChatCompletion", "createChatCompletionRequest", createChatCompletionRequest);
          const localVarPath = `/chat/completions`;
          const localVarUrlObj = new URL(localVarPath, common_1.DUMMY_BASE_URL);
          let baseOptions;
          if (configuration) {
            baseOptions = configuration.baseOptions;
          }
          const localVarRequestOptions = Object.assign(Object.assign({ method: "POST" }, baseOptions), options);
          const localVarHeaderParameter = {};
          const localVarQueryParameter = {};
          localVarHeaderParameter["Content-Type"] = "application/json";
          common_1.setSearchParams(localVarUrlObj, localVarQueryParameter);
          let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
          localVarRequestOptions.headers = Object.assign(Object.assign(Object.assign({}, localVarHeaderParameter), headersFromBaseOptions), options.headers);
          localVarRequestOptions.data = common_1.serializeDataIfNeeded(createChatCompletionRequest, localVarRequestOptions, configuration);
          return {
            url: common_1.toPathString(localVarUrlObj),
            options: localVarRequestOptions
          };
        }),
        /**
         *
         * @summary Classifies the specified `query` using provided examples.  The endpoint first [searches](/docs/api-reference/searches) over the labeled examples to select the ones most relevant for the particular query. Then, the relevant examples are combined with the query to construct a prompt to produce the final label via the [completions](/docs/api-reference/completions) endpoint.  Labeled examples can be provided via an uploaded `file`, or explicitly listed in the request using the `examples` parameter for quick tests and small scale use cases.
         * @param {CreateClassificationRequest} createClassificationRequest
         * @param {*} [options] Override http request option.
         * @deprecated
         * @throws {RequiredError}
         */
        createClassification: (createClassificationRequest, options = {}) => __awaiter(this, void 0, void 0, function* () {
          common_1.assertParamExists("createClassification", "createClassificationRequest", createClassificationRequest);
          const localVarPath = `/classifications`;
          const localVarUrlObj = new URL(localVarPath, common_1.DUMMY_BASE_URL);
          let baseOptions;
          if (configuration) {
            baseOptions = configuration.baseOptions;
          }
          const localVarRequestOptions = Object.assign(Object.assign({ method: "POST" }, baseOptions), options);
          const localVarHeaderParameter = {};
          const localVarQueryParameter = {};
          localVarHeaderParameter["Content-Type"] = "application/json";
          common_1.setSearchParams(localVarUrlObj, localVarQueryParameter);
          let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
          localVarRequestOptions.headers = Object.assign(Object.assign(Object.assign({}, localVarHeaderParameter), headersFromBaseOptions), options.headers);
          localVarRequestOptions.data = common_1.serializeDataIfNeeded(createClassificationRequest, localVarRequestOptions, configuration);
          return {
            url: common_1.toPathString(localVarUrlObj),
            options: localVarRequestOptions
          };
        }),
        /**
         *
         * @summary Creates a completion for the provided prompt and parameters
         * @param {CreateCompletionRequest} createCompletionRequest
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        createCompletion: (createCompletionRequest, options = {}) => __awaiter(this, void 0, void 0, function* () {
          common_1.assertParamExists("createCompletion", "createCompletionRequest", createCompletionRequest);
          const localVarPath = `/completions`;
          const localVarUrlObj = new URL(localVarPath, common_1.DUMMY_BASE_URL);
          let baseOptions;
          if (configuration) {
            baseOptions = configuration.baseOptions;
          }
          const localVarRequestOptions = Object.assign(Object.assign({ method: "POST" }, baseOptions), options);
          const localVarHeaderParameter = {};
          const localVarQueryParameter = {};
          localVarHeaderParameter["Content-Type"] = "application/json";
          common_1.setSearchParams(localVarUrlObj, localVarQueryParameter);
          let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
          localVarRequestOptions.headers = Object.assign(Object.assign(Object.assign({}, localVarHeaderParameter), headersFromBaseOptions), options.headers);
          localVarRequestOptions.data = common_1.serializeDataIfNeeded(createCompletionRequest, localVarRequestOptions, configuration);
          return {
            url: common_1.toPathString(localVarUrlObj),
            options: localVarRequestOptions
          };
        }),
        /**
         *
         * @summary Creates a new edit for the provided input, instruction, and parameters.
         * @param {CreateEditRequest} createEditRequest
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        createEdit: (createEditRequest, options = {}) => __awaiter(this, void 0, void 0, function* () {
          common_1.assertParamExists("createEdit", "createEditRequest", createEditRequest);
          const localVarPath = `/edits`;
          const localVarUrlObj = new URL(localVarPath, common_1.DUMMY_BASE_URL);
          let baseOptions;
          if (configuration) {
            baseOptions = configuration.baseOptions;
          }
          const localVarRequestOptions = Object.assign(Object.assign({ method: "POST" }, baseOptions), options);
          const localVarHeaderParameter = {};
          const localVarQueryParameter = {};
          localVarHeaderParameter["Content-Type"] = "application/json";
          common_1.setSearchParams(localVarUrlObj, localVarQueryParameter);
          let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
          localVarRequestOptions.headers = Object.assign(Object.assign(Object.assign({}, localVarHeaderParameter), headersFromBaseOptions), options.headers);
          localVarRequestOptions.data = common_1.serializeDataIfNeeded(createEditRequest, localVarRequestOptions, configuration);
          return {
            url: common_1.toPathString(localVarUrlObj),
            options: localVarRequestOptions
          };
        }),
        /**
         *
         * @summary Creates an embedding vector representing the input text.
         * @param {CreateEmbeddingRequest} createEmbeddingRequest
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        createEmbedding: (createEmbeddingRequest, options = {}) => __awaiter(this, void 0, void 0, function* () {
          common_1.assertParamExists("createEmbedding", "createEmbeddingRequest", createEmbeddingRequest);
          const localVarPath = `/embeddings`;
          const localVarUrlObj = new URL(localVarPath, common_1.DUMMY_BASE_URL);
          let baseOptions;
          if (configuration) {
            baseOptions = configuration.baseOptions;
          }
          const localVarRequestOptions = Object.assign(Object.assign({ method: "POST" }, baseOptions), options);
          const localVarHeaderParameter = {};
          const localVarQueryParameter = {};
          localVarHeaderParameter["Content-Type"] = "application/json";
          common_1.setSearchParams(localVarUrlObj, localVarQueryParameter);
          let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
          localVarRequestOptions.headers = Object.assign(Object.assign(Object.assign({}, localVarHeaderParameter), headersFromBaseOptions), options.headers);
          localVarRequestOptions.data = common_1.serializeDataIfNeeded(createEmbeddingRequest, localVarRequestOptions, configuration);
          return {
            url: common_1.toPathString(localVarUrlObj),
            options: localVarRequestOptions
          };
        }),
        /**
         *
         * @summary Upload a file that contains document(s) to be used across various endpoints/features. Currently, the size of all the files uploaded by one organization can be up to 1 GB. Please contact us if you need to increase the storage limit.
         * @param {File} file Name of the [JSON Lines](https://jsonlines.readthedocs.io/en/latest/) file to be uploaded.  If the &#x60;purpose&#x60; is set to \\\&quot;fine-tune\\\&quot;, each line is a JSON record with \\\&quot;prompt\\\&quot; and \\\&quot;completion\\\&quot; fields representing your [training examples](/docs/guides/fine-tuning/prepare-training-data).
         * @param {string} purpose The intended purpose of the uploaded documents.  Use \\\&quot;fine-tune\\\&quot; for [Fine-tuning](/docs/api-reference/fine-tunes). This allows us to validate the format of the uploaded file.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        createFile: (file, purpose, options = {}) => __awaiter(this, void 0, void 0, function* () {
          common_1.assertParamExists("createFile", "file", file);
          common_1.assertParamExists("createFile", "purpose", purpose);
          const localVarPath = `/files`;
          const localVarUrlObj = new URL(localVarPath, common_1.DUMMY_BASE_URL);
          let baseOptions;
          if (configuration) {
            baseOptions = configuration.baseOptions;
          }
          const localVarRequestOptions = Object.assign(Object.assign({ method: "POST" }, baseOptions), options);
          const localVarHeaderParameter = {};
          const localVarQueryParameter = {};
          const localVarFormParams = new (configuration && configuration.formDataCtor || FormData)();
          if (file !== void 0) {
            localVarFormParams.append("file", file);
          }
          if (purpose !== void 0) {
            localVarFormParams.append("purpose", purpose);
          }
          localVarHeaderParameter["Content-Type"] = "multipart/form-data";
          common_1.setSearchParams(localVarUrlObj, localVarQueryParameter);
          let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
          localVarRequestOptions.headers = Object.assign(Object.assign(Object.assign(Object.assign({}, localVarHeaderParameter), localVarFormParams.getHeaders()), headersFromBaseOptions), options.headers);
          localVarRequestOptions.data = localVarFormParams;
          return {
            url: common_1.toPathString(localVarUrlObj),
            options: localVarRequestOptions
          };
        }),
        /**
         *
         * @summary Creates a job that fine-tunes a specified model from a given dataset.  Response includes details of the enqueued job including job status and the name of the fine-tuned models once complete.  [Learn more about Fine-tuning](/docs/guides/fine-tuning)
         * @param {CreateFineTuneRequest} createFineTuneRequest
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        createFineTune: (createFineTuneRequest, options = {}) => __awaiter(this, void 0, void 0, function* () {
          common_1.assertParamExists("createFineTune", "createFineTuneRequest", createFineTuneRequest);
          const localVarPath = `/fine-tunes`;
          const localVarUrlObj = new URL(localVarPath, common_1.DUMMY_BASE_URL);
          let baseOptions;
          if (configuration) {
            baseOptions = configuration.baseOptions;
          }
          const localVarRequestOptions = Object.assign(Object.assign({ method: "POST" }, baseOptions), options);
          const localVarHeaderParameter = {};
          const localVarQueryParameter = {};
          localVarHeaderParameter["Content-Type"] = "application/json";
          common_1.setSearchParams(localVarUrlObj, localVarQueryParameter);
          let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
          localVarRequestOptions.headers = Object.assign(Object.assign(Object.assign({}, localVarHeaderParameter), headersFromBaseOptions), options.headers);
          localVarRequestOptions.data = common_1.serializeDataIfNeeded(createFineTuneRequest, localVarRequestOptions, configuration);
          return {
            url: common_1.toPathString(localVarUrlObj),
            options: localVarRequestOptions
          };
        }),
        /**
         *
         * @summary Creates an image given a prompt.
         * @param {CreateImageRequest} createImageRequest
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        createImage: (createImageRequest, options = {}) => __awaiter(this, void 0, void 0, function* () {
          common_1.assertParamExists("createImage", "createImageRequest", createImageRequest);
          const localVarPath = `/images/generations`;
          const localVarUrlObj = new URL(localVarPath, common_1.DUMMY_BASE_URL);
          let baseOptions;
          if (configuration) {
            baseOptions = configuration.baseOptions;
          }
          const localVarRequestOptions = Object.assign(Object.assign({ method: "POST" }, baseOptions), options);
          const localVarHeaderParameter = {};
          const localVarQueryParameter = {};
          localVarHeaderParameter["Content-Type"] = "application/json";
          common_1.setSearchParams(localVarUrlObj, localVarQueryParameter);
          let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
          localVarRequestOptions.headers = Object.assign(Object.assign(Object.assign({}, localVarHeaderParameter), headersFromBaseOptions), options.headers);
          localVarRequestOptions.data = common_1.serializeDataIfNeeded(createImageRequest, localVarRequestOptions, configuration);
          return {
            url: common_1.toPathString(localVarUrlObj),
            options: localVarRequestOptions
          };
        }),
        /**
         *
         * @summary Creates an edited or extended image given an original image and a prompt.
         * @param {File} image The image to edit. Must be a valid PNG file, less than 4MB, and square. If mask is not provided, image must have transparency, which will be used as the mask.
         * @param {string} prompt A text description of the desired image(s). The maximum length is 1000 characters.
         * @param {File} [mask] An additional image whose fully transparent areas (e.g. where alpha is zero) indicate where &#x60;image&#x60; should be edited. Must be a valid PNG file, less than 4MB, and have the same dimensions as &#x60;image&#x60;.
         * @param {number} [n] The number of images to generate. Must be between 1 and 10.
         * @param {string} [size] The size of the generated images. Must be one of &#x60;256x256&#x60;, &#x60;512x512&#x60;, or &#x60;1024x1024&#x60;.
         * @param {string} [responseFormat] The format in which the generated images are returned. Must be one of &#x60;url&#x60; or &#x60;b64_json&#x60;.
         * @param {string} [user] A unique identifier representing your end-user, which can help OpenAI to monitor and detect abuse. [Learn more](/docs/guides/safety-best-practices/end-user-ids).
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        createImageEdit: (image, prompt, mask, n, size, responseFormat, user, options = {}) => __awaiter(this, void 0, void 0, function* () {
          common_1.assertParamExists("createImageEdit", "image", image);
          common_1.assertParamExists("createImageEdit", "prompt", prompt);
          const localVarPath = `/images/edits`;
          const localVarUrlObj = new URL(localVarPath, common_1.DUMMY_BASE_URL);
          let baseOptions;
          if (configuration) {
            baseOptions = configuration.baseOptions;
          }
          const localVarRequestOptions = Object.assign(Object.assign({ method: "POST" }, baseOptions), options);
          const localVarHeaderParameter = {};
          const localVarQueryParameter = {};
          const localVarFormParams = new (configuration && configuration.formDataCtor || FormData)();
          if (image !== void 0) {
            localVarFormParams.append("image", image);
          }
          if (mask !== void 0) {
            localVarFormParams.append("mask", mask);
          }
          if (prompt !== void 0) {
            localVarFormParams.append("prompt", prompt);
          }
          if (n !== void 0) {
            localVarFormParams.append("n", n);
          }
          if (size !== void 0) {
            localVarFormParams.append("size", size);
          }
          if (responseFormat !== void 0) {
            localVarFormParams.append("response_format", responseFormat);
          }
          if (user !== void 0) {
            localVarFormParams.append("user", user);
          }
          localVarHeaderParameter["Content-Type"] = "multipart/form-data";
          common_1.setSearchParams(localVarUrlObj, localVarQueryParameter);
          let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
          localVarRequestOptions.headers = Object.assign(Object.assign(Object.assign(Object.assign({}, localVarHeaderParameter), localVarFormParams.getHeaders()), headersFromBaseOptions), options.headers);
          localVarRequestOptions.data = localVarFormParams;
          return {
            url: common_1.toPathString(localVarUrlObj),
            options: localVarRequestOptions
          };
        }),
        /**
         *
         * @summary Creates a variation of a given image.
         * @param {File} image The image to use as the basis for the variation(s). Must be a valid PNG file, less than 4MB, and square.
         * @param {number} [n] The number of images to generate. Must be between 1 and 10.
         * @param {string} [size] The size of the generated images. Must be one of &#x60;256x256&#x60;, &#x60;512x512&#x60;, or &#x60;1024x1024&#x60;.
         * @param {string} [responseFormat] The format in which the generated images are returned. Must be one of &#x60;url&#x60; or &#x60;b64_json&#x60;.
         * @param {string} [user] A unique identifier representing your end-user, which can help OpenAI to monitor and detect abuse. [Learn more](/docs/guides/safety-best-practices/end-user-ids).
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        createImageVariation: (image, n, size, responseFormat, user, options = {}) => __awaiter(this, void 0, void 0, function* () {
          common_1.assertParamExists("createImageVariation", "image", image);
          const localVarPath = `/images/variations`;
          const localVarUrlObj = new URL(localVarPath, common_1.DUMMY_BASE_URL);
          let baseOptions;
          if (configuration) {
            baseOptions = configuration.baseOptions;
          }
          const localVarRequestOptions = Object.assign(Object.assign({ method: "POST" }, baseOptions), options);
          const localVarHeaderParameter = {};
          const localVarQueryParameter = {};
          const localVarFormParams = new (configuration && configuration.formDataCtor || FormData)();
          if (image !== void 0) {
            localVarFormParams.append("image", image);
          }
          if (n !== void 0) {
            localVarFormParams.append("n", n);
          }
          if (size !== void 0) {
            localVarFormParams.append("size", size);
          }
          if (responseFormat !== void 0) {
            localVarFormParams.append("response_format", responseFormat);
          }
          if (user !== void 0) {
            localVarFormParams.append("user", user);
          }
          localVarHeaderParameter["Content-Type"] = "multipart/form-data";
          common_1.setSearchParams(localVarUrlObj, localVarQueryParameter);
          let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
          localVarRequestOptions.headers = Object.assign(Object.assign(Object.assign(Object.assign({}, localVarHeaderParameter), localVarFormParams.getHeaders()), headersFromBaseOptions), options.headers);
          localVarRequestOptions.data = localVarFormParams;
          return {
            url: common_1.toPathString(localVarUrlObj),
            options: localVarRequestOptions
          };
        }),
        /**
         *
         * @summary Classifies if text violates OpenAI\'s Content Policy
         * @param {CreateModerationRequest} createModerationRequest
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        createModeration: (createModerationRequest, options = {}) => __awaiter(this, void 0, void 0, function* () {
          common_1.assertParamExists("createModeration", "createModerationRequest", createModerationRequest);
          const localVarPath = `/moderations`;
          const localVarUrlObj = new URL(localVarPath, common_1.DUMMY_BASE_URL);
          let baseOptions;
          if (configuration) {
            baseOptions = configuration.baseOptions;
          }
          const localVarRequestOptions = Object.assign(Object.assign({ method: "POST" }, baseOptions), options);
          const localVarHeaderParameter = {};
          const localVarQueryParameter = {};
          localVarHeaderParameter["Content-Type"] = "application/json";
          common_1.setSearchParams(localVarUrlObj, localVarQueryParameter);
          let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
          localVarRequestOptions.headers = Object.assign(Object.assign(Object.assign({}, localVarHeaderParameter), headersFromBaseOptions), options.headers);
          localVarRequestOptions.data = common_1.serializeDataIfNeeded(createModerationRequest, localVarRequestOptions, configuration);
          return {
            url: common_1.toPathString(localVarUrlObj),
            options: localVarRequestOptions
          };
        }),
        /**
         *
         * @summary The search endpoint computes similarity scores between provided query and documents. Documents can be passed directly to the API if there are no more than 200 of them.  To go beyond the 200 document limit, documents can be processed offline and then used for efficient retrieval at query time. When `file` is set, the search endpoint searches over all the documents in the given file and returns up to the `max_rerank` number of documents. These documents will be returned along with their search scores.  The similarity score is a positive score that usually ranges from 0 to 300 (but can sometimes go higher), where a score above 200 usually means the document is semantically similar to the query.
         * @param {string} engineId The ID of the engine to use for this request.  You can select one of &#x60;ada&#x60;, &#x60;babbage&#x60;, &#x60;curie&#x60;, or &#x60;davinci&#x60;.
         * @param {CreateSearchRequest} createSearchRequest
         * @param {*} [options] Override http request option.
         * @deprecated
         * @throws {RequiredError}
         */
        createSearch: (engineId, createSearchRequest, options = {}) => __awaiter(this, void 0, void 0, function* () {
          common_1.assertParamExists("createSearch", "engineId", engineId);
          common_1.assertParamExists("createSearch", "createSearchRequest", createSearchRequest);
          const localVarPath = `/engines/{engine_id}/search`.replace(`{${"engine_id"}}`, encodeURIComponent(String(engineId)));
          const localVarUrlObj = new URL(localVarPath, common_1.DUMMY_BASE_URL);
          let baseOptions;
          if (configuration) {
            baseOptions = configuration.baseOptions;
          }
          const localVarRequestOptions = Object.assign(Object.assign({ method: "POST" }, baseOptions), options);
          const localVarHeaderParameter = {};
          const localVarQueryParameter = {};
          localVarHeaderParameter["Content-Type"] = "application/json";
          common_1.setSearchParams(localVarUrlObj, localVarQueryParameter);
          let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
          localVarRequestOptions.headers = Object.assign(Object.assign(Object.assign({}, localVarHeaderParameter), headersFromBaseOptions), options.headers);
          localVarRequestOptions.data = common_1.serializeDataIfNeeded(createSearchRequest, localVarRequestOptions, configuration);
          return {
            url: common_1.toPathString(localVarUrlObj),
            options: localVarRequestOptions
          };
        }),
        /**
         *
         * @summary Transcribes audio into the input language.
         * @param {File} file The audio file to transcribe, in one of these formats: mp3, mp4, mpeg, mpga, m4a, wav, or webm.
         * @param {string} model ID of the model to use. Only &#x60;whisper-1&#x60; is currently available.
         * @param {string} [prompt] An optional text to guide the model\\\&#39;s style or continue a previous audio segment. The [prompt](/docs/guides/speech-to-text/prompting) should match the audio language.
         * @param {string} [responseFormat] The format of the transcript output, in one of these options: json, text, srt, verbose_json, or vtt.
         * @param {number} [temperature] The sampling temperature, between 0 and 1. Higher values like 0.8 will make the output more random, while lower values like 0.2 will make it more focused and deterministic. If set to 0, the model will use [log probability](https://en.wikipedia.org/wiki/Log_probability) to automatically increase the temperature until certain thresholds are hit.
         * @param {string} [language] The language of the input audio. Supplying the input language in [ISO-639-1](https://en.wikipedia.org/wiki/List_of_ISO_639-1_codes) format will improve accuracy and latency.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        createTranscription: (file, model, prompt, responseFormat, temperature, language, options = {}) => __awaiter(this, void 0, void 0, function* () {
          common_1.assertParamExists("createTranscription", "file", file);
          common_1.assertParamExists("createTranscription", "model", model);
          const localVarPath = `/audio/transcriptions`;
          const localVarUrlObj = new URL(localVarPath, common_1.DUMMY_BASE_URL);
          let baseOptions;
          if (configuration) {
            baseOptions = configuration.baseOptions;
          }
          const localVarRequestOptions = Object.assign(Object.assign({ method: "POST" }, baseOptions), options);
          const localVarHeaderParameter = {};
          const localVarQueryParameter = {};
          const localVarFormParams = new (configuration && configuration.formDataCtor || FormData)();
          if (file !== void 0) {
            localVarFormParams.append("file", file);
          }
          if (model !== void 0) {
            localVarFormParams.append("model", model);
          }
          if (prompt !== void 0) {
            localVarFormParams.append("prompt", prompt);
          }
          if (responseFormat !== void 0) {
            localVarFormParams.append("response_format", responseFormat);
          }
          if (temperature !== void 0) {
            localVarFormParams.append("temperature", temperature);
          }
          if (language !== void 0) {
            localVarFormParams.append("language", language);
          }
          localVarHeaderParameter["Content-Type"] = "multipart/form-data";
          common_1.setSearchParams(localVarUrlObj, localVarQueryParameter);
          let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
          localVarRequestOptions.headers = Object.assign(Object.assign(Object.assign(Object.assign({}, localVarHeaderParameter), localVarFormParams.getHeaders()), headersFromBaseOptions), options.headers);
          localVarRequestOptions.data = localVarFormParams;
          return {
            url: common_1.toPathString(localVarUrlObj),
            options: localVarRequestOptions
          };
        }),
        /**
         *
         * @summary Translates audio into into English.
         * @param {File} file The audio file to translate, in one of these formats: mp3, mp4, mpeg, mpga, m4a, wav, or webm.
         * @param {string} model ID of the model to use. Only &#x60;whisper-1&#x60; is currently available.
         * @param {string} [prompt] An optional text to guide the model\\\&#39;s style or continue a previous audio segment. The [prompt](/docs/guides/speech-to-text/prompting) should be in English.
         * @param {string} [responseFormat] The format of the transcript output, in one of these options: json, text, srt, verbose_json, or vtt.
         * @param {number} [temperature] The sampling temperature, between 0 and 1. Higher values like 0.8 will make the output more random, while lower values like 0.2 will make it more focused and deterministic. If set to 0, the model will use [log probability](https://en.wikipedia.org/wiki/Log_probability) to automatically increase the temperature until certain thresholds are hit.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        createTranslation: (file, model, prompt, responseFormat, temperature, options = {}) => __awaiter(this, void 0, void 0, function* () {
          common_1.assertParamExists("createTranslation", "file", file);
          common_1.assertParamExists("createTranslation", "model", model);
          const localVarPath = `/audio/translations`;
          const localVarUrlObj = new URL(localVarPath, common_1.DUMMY_BASE_URL);
          let baseOptions;
          if (configuration) {
            baseOptions = configuration.baseOptions;
          }
          const localVarRequestOptions = Object.assign(Object.assign({ method: "POST" }, baseOptions), options);
          const localVarHeaderParameter = {};
          const localVarQueryParameter = {};
          const localVarFormParams = new (configuration && configuration.formDataCtor || FormData)();
          if (file !== void 0) {
            localVarFormParams.append("file", file);
          }
          if (model !== void 0) {
            localVarFormParams.append("model", model);
          }
          if (prompt !== void 0) {
            localVarFormParams.append("prompt", prompt);
          }
          if (responseFormat !== void 0) {
            localVarFormParams.append("response_format", responseFormat);
          }
          if (temperature !== void 0) {
            localVarFormParams.append("temperature", temperature);
          }
          localVarHeaderParameter["Content-Type"] = "multipart/form-data";
          common_1.setSearchParams(localVarUrlObj, localVarQueryParameter);
          let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
          localVarRequestOptions.headers = Object.assign(Object.assign(Object.assign(Object.assign({}, localVarHeaderParameter), localVarFormParams.getHeaders()), headersFromBaseOptions), options.headers);
          localVarRequestOptions.data = localVarFormParams;
          return {
            url: common_1.toPathString(localVarUrlObj),
            options: localVarRequestOptions
          };
        }),
        /**
         *
         * @summary Delete a file.
         * @param {string} fileId The ID of the file to use for this request
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        deleteFile: (fileId, options = {}) => __awaiter(this, void 0, void 0, function* () {
          common_1.assertParamExists("deleteFile", "fileId", fileId);
          const localVarPath = `/files/{file_id}`.replace(`{${"file_id"}}`, encodeURIComponent(String(fileId)));
          const localVarUrlObj = new URL(localVarPath, common_1.DUMMY_BASE_URL);
          let baseOptions;
          if (configuration) {
            baseOptions = configuration.baseOptions;
          }
          const localVarRequestOptions = Object.assign(Object.assign({ method: "DELETE" }, baseOptions), options);
          const localVarHeaderParameter = {};
          const localVarQueryParameter = {};
          common_1.setSearchParams(localVarUrlObj, localVarQueryParameter);
          let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
          localVarRequestOptions.headers = Object.assign(Object.assign(Object.assign({}, localVarHeaderParameter), headersFromBaseOptions), options.headers);
          return {
            url: common_1.toPathString(localVarUrlObj),
            options: localVarRequestOptions
          };
        }),
        /**
         *
         * @summary Delete a fine-tuned model. You must have the Owner role in your organization.
         * @param {string} model The model to delete
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        deleteModel: (model, options = {}) => __awaiter(this, void 0, void 0, function* () {
          common_1.assertParamExists("deleteModel", "model", model);
          const localVarPath = `/models/{model}`.replace(`{${"model"}}`, encodeURIComponent(String(model)));
          const localVarUrlObj = new URL(localVarPath, common_1.DUMMY_BASE_URL);
          let baseOptions;
          if (configuration) {
            baseOptions = configuration.baseOptions;
          }
          const localVarRequestOptions = Object.assign(Object.assign({ method: "DELETE" }, baseOptions), options);
          const localVarHeaderParameter = {};
          const localVarQueryParameter = {};
          common_1.setSearchParams(localVarUrlObj, localVarQueryParameter);
          let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
          localVarRequestOptions.headers = Object.assign(Object.assign(Object.assign({}, localVarHeaderParameter), headersFromBaseOptions), options.headers);
          return {
            url: common_1.toPathString(localVarUrlObj),
            options: localVarRequestOptions
          };
        }),
        /**
         *
         * @summary Returns the contents of the specified file
         * @param {string} fileId The ID of the file to use for this request
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        downloadFile: (fileId, options = {}) => __awaiter(this, void 0, void 0, function* () {
          common_1.assertParamExists("downloadFile", "fileId", fileId);
          const localVarPath = `/files/{file_id}/content`.replace(`{${"file_id"}}`, encodeURIComponent(String(fileId)));
          const localVarUrlObj = new URL(localVarPath, common_1.DUMMY_BASE_URL);
          let baseOptions;
          if (configuration) {
            baseOptions = configuration.baseOptions;
          }
          const localVarRequestOptions = Object.assign(Object.assign({ method: "GET" }, baseOptions), options);
          const localVarHeaderParameter = {};
          const localVarQueryParameter = {};
          common_1.setSearchParams(localVarUrlObj, localVarQueryParameter);
          let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
          localVarRequestOptions.headers = Object.assign(Object.assign(Object.assign({}, localVarHeaderParameter), headersFromBaseOptions), options.headers);
          return {
            url: common_1.toPathString(localVarUrlObj),
            options: localVarRequestOptions
          };
        }),
        /**
         *
         * @summary Lists the currently available (non-finetuned) models, and provides basic information about each one such as the owner and availability.
         * @param {*} [options] Override http request option.
         * @deprecated
         * @throws {RequiredError}
         */
        listEngines: (options = {}) => __awaiter(this, void 0, void 0, function* () {
          const localVarPath = `/engines`;
          const localVarUrlObj = new URL(localVarPath, common_1.DUMMY_BASE_URL);
          let baseOptions;
          if (configuration) {
            baseOptions = configuration.baseOptions;
          }
          const localVarRequestOptions = Object.assign(Object.assign({ method: "GET" }, baseOptions), options);
          const localVarHeaderParameter = {};
          const localVarQueryParameter = {};
          common_1.setSearchParams(localVarUrlObj, localVarQueryParameter);
          let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
          localVarRequestOptions.headers = Object.assign(Object.assign(Object.assign({}, localVarHeaderParameter), headersFromBaseOptions), options.headers);
          return {
            url: common_1.toPathString(localVarUrlObj),
            options: localVarRequestOptions
          };
        }),
        /**
         *
         * @summary Returns a list of files that belong to the user\'s organization.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        listFiles: (options = {}) => __awaiter(this, void 0, void 0, function* () {
          const localVarPath = `/files`;
          const localVarUrlObj = new URL(localVarPath, common_1.DUMMY_BASE_URL);
          let baseOptions;
          if (configuration) {
            baseOptions = configuration.baseOptions;
          }
          const localVarRequestOptions = Object.assign(Object.assign({ method: "GET" }, baseOptions), options);
          const localVarHeaderParameter = {};
          const localVarQueryParameter = {};
          common_1.setSearchParams(localVarUrlObj, localVarQueryParameter);
          let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
          localVarRequestOptions.headers = Object.assign(Object.assign(Object.assign({}, localVarHeaderParameter), headersFromBaseOptions), options.headers);
          return {
            url: common_1.toPathString(localVarUrlObj),
            options: localVarRequestOptions
          };
        }),
        /**
         *
         * @summary Get fine-grained status updates for a fine-tune job.
         * @param {string} fineTuneId The ID of the fine-tune job to get events for.
         * @param {boolean} [stream] Whether to stream events for the fine-tune job. If set to true, events will be sent as data-only [server-sent events](https://developer.mozilla.org/en-US/docs/Web/API/Server-sent_events/Using_server-sent_events#Event_stream_format) as they become available. The stream will terminate with a &#x60;data: [DONE]&#x60; message when the job is finished (succeeded, cancelled, or failed).  If set to false, only events generated so far will be returned.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        listFineTuneEvents: (fineTuneId, stream, options = {}) => __awaiter(this, void 0, void 0, function* () {
          common_1.assertParamExists("listFineTuneEvents", "fineTuneId", fineTuneId);
          const localVarPath = `/fine-tunes/{fine_tune_id}/events`.replace(`{${"fine_tune_id"}}`, encodeURIComponent(String(fineTuneId)));
          const localVarUrlObj = new URL(localVarPath, common_1.DUMMY_BASE_URL);
          let baseOptions;
          if (configuration) {
            baseOptions = configuration.baseOptions;
          }
          const localVarRequestOptions = Object.assign(Object.assign({ method: "GET" }, baseOptions), options);
          const localVarHeaderParameter = {};
          const localVarQueryParameter = {};
          if (stream !== void 0) {
            localVarQueryParameter["stream"] = stream;
          }
          common_1.setSearchParams(localVarUrlObj, localVarQueryParameter);
          let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
          localVarRequestOptions.headers = Object.assign(Object.assign(Object.assign({}, localVarHeaderParameter), headersFromBaseOptions), options.headers);
          return {
            url: common_1.toPathString(localVarUrlObj),
            options: localVarRequestOptions
          };
        }),
        /**
         *
         * @summary List your organization\'s fine-tuning jobs
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        listFineTunes: (options = {}) => __awaiter(this, void 0, void 0, function* () {
          const localVarPath = `/fine-tunes`;
          const localVarUrlObj = new URL(localVarPath, common_1.DUMMY_BASE_URL);
          let baseOptions;
          if (configuration) {
            baseOptions = configuration.baseOptions;
          }
          const localVarRequestOptions = Object.assign(Object.assign({ method: "GET" }, baseOptions), options);
          const localVarHeaderParameter = {};
          const localVarQueryParameter = {};
          common_1.setSearchParams(localVarUrlObj, localVarQueryParameter);
          let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
          localVarRequestOptions.headers = Object.assign(Object.assign(Object.assign({}, localVarHeaderParameter), headersFromBaseOptions), options.headers);
          return {
            url: common_1.toPathString(localVarUrlObj),
            options: localVarRequestOptions
          };
        }),
        /**
         *
         * @summary Lists the currently available models, and provides basic information about each one such as the owner and availability.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        listModels: (options = {}) => __awaiter(this, void 0, void 0, function* () {
          const localVarPath = `/models`;
          const localVarUrlObj = new URL(localVarPath, common_1.DUMMY_BASE_URL);
          let baseOptions;
          if (configuration) {
            baseOptions = configuration.baseOptions;
          }
          const localVarRequestOptions = Object.assign(Object.assign({ method: "GET" }, baseOptions), options);
          const localVarHeaderParameter = {};
          const localVarQueryParameter = {};
          common_1.setSearchParams(localVarUrlObj, localVarQueryParameter);
          let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
          localVarRequestOptions.headers = Object.assign(Object.assign(Object.assign({}, localVarHeaderParameter), headersFromBaseOptions), options.headers);
          return {
            url: common_1.toPathString(localVarUrlObj),
            options: localVarRequestOptions
          };
        }),
        /**
         *
         * @summary Retrieves a model instance, providing basic information about it such as the owner and availability.
         * @param {string} engineId The ID of the engine to use for this request
         * @param {*} [options] Override http request option.
         * @deprecated
         * @throws {RequiredError}
         */
        retrieveEngine: (engineId, options = {}) => __awaiter(this, void 0, void 0, function* () {
          common_1.assertParamExists("retrieveEngine", "engineId", engineId);
          const localVarPath = `/engines/{engine_id}`.replace(`{${"engine_id"}}`, encodeURIComponent(String(engineId)));
          const localVarUrlObj = new URL(localVarPath, common_1.DUMMY_BASE_URL);
          let baseOptions;
          if (configuration) {
            baseOptions = configuration.baseOptions;
          }
          const localVarRequestOptions = Object.assign(Object.assign({ method: "GET" }, baseOptions), options);
          const localVarHeaderParameter = {};
          const localVarQueryParameter = {};
          common_1.setSearchParams(localVarUrlObj, localVarQueryParameter);
          let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
          localVarRequestOptions.headers = Object.assign(Object.assign(Object.assign({}, localVarHeaderParameter), headersFromBaseOptions), options.headers);
          return {
            url: common_1.toPathString(localVarUrlObj),
            options: localVarRequestOptions
          };
        }),
        /**
         *
         * @summary Returns information about a specific file.
         * @param {string} fileId The ID of the file to use for this request
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        retrieveFile: (fileId, options = {}) => __awaiter(this, void 0, void 0, function* () {
          common_1.assertParamExists("retrieveFile", "fileId", fileId);
          const localVarPath = `/files/{file_id}`.replace(`{${"file_id"}}`, encodeURIComponent(String(fileId)));
          const localVarUrlObj = new URL(localVarPath, common_1.DUMMY_BASE_URL);
          let baseOptions;
          if (configuration) {
            baseOptions = configuration.baseOptions;
          }
          const localVarRequestOptions = Object.assign(Object.assign({ method: "GET" }, baseOptions), options);
          const localVarHeaderParameter = {};
          const localVarQueryParameter = {};
          common_1.setSearchParams(localVarUrlObj, localVarQueryParameter);
          let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
          localVarRequestOptions.headers = Object.assign(Object.assign(Object.assign({}, localVarHeaderParameter), headersFromBaseOptions), options.headers);
          return {
            url: common_1.toPathString(localVarUrlObj),
            options: localVarRequestOptions
          };
        }),
        /**
         *
         * @summary Gets info about the fine-tune job.  [Learn more about Fine-tuning](/docs/guides/fine-tuning)
         * @param {string} fineTuneId The ID of the fine-tune job
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        retrieveFineTune: (fineTuneId, options = {}) => __awaiter(this, void 0, void 0, function* () {
          common_1.assertParamExists("retrieveFineTune", "fineTuneId", fineTuneId);
          const localVarPath = `/fine-tunes/{fine_tune_id}`.replace(`{${"fine_tune_id"}}`, encodeURIComponent(String(fineTuneId)));
          const localVarUrlObj = new URL(localVarPath, common_1.DUMMY_BASE_URL);
          let baseOptions;
          if (configuration) {
            baseOptions = configuration.baseOptions;
          }
          const localVarRequestOptions = Object.assign(Object.assign({ method: "GET" }, baseOptions), options);
          const localVarHeaderParameter = {};
          const localVarQueryParameter = {};
          common_1.setSearchParams(localVarUrlObj, localVarQueryParameter);
          let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
          localVarRequestOptions.headers = Object.assign(Object.assign(Object.assign({}, localVarHeaderParameter), headersFromBaseOptions), options.headers);
          return {
            url: common_1.toPathString(localVarUrlObj),
            options: localVarRequestOptions
          };
        }),
        /**
         *
         * @summary Retrieves a model instance, providing basic information about the model such as the owner and permissioning.
         * @param {string} model The ID of the model to use for this request
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        retrieveModel: (model, options = {}) => __awaiter(this, void 0, void 0, function* () {
          common_1.assertParamExists("retrieveModel", "model", model);
          const localVarPath = `/models/{model}`.replace(`{${"model"}}`, encodeURIComponent(String(model)));
          const localVarUrlObj = new URL(localVarPath, common_1.DUMMY_BASE_URL);
          let baseOptions;
          if (configuration) {
            baseOptions = configuration.baseOptions;
          }
          const localVarRequestOptions = Object.assign(Object.assign({ method: "GET" }, baseOptions), options);
          const localVarHeaderParameter = {};
          const localVarQueryParameter = {};
          common_1.setSearchParams(localVarUrlObj, localVarQueryParameter);
          let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
          localVarRequestOptions.headers = Object.assign(Object.assign(Object.assign({}, localVarHeaderParameter), headersFromBaseOptions), options.headers);
          return {
            url: common_1.toPathString(localVarUrlObj),
            options: localVarRequestOptions
          };
        })
      };
    };
    exports.OpenAIApiFp = function(configuration) {
      const localVarAxiosParamCreator = exports.OpenAIApiAxiosParamCreator(configuration);
      return {
        /**
         *
         * @summary Immediately cancel a fine-tune job.
         * @param {string} fineTuneId The ID of the fine-tune job to cancel
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        cancelFineTune(fineTuneId, options) {
          return __awaiter(this, void 0, void 0, function* () {
            const localVarAxiosArgs = yield localVarAxiosParamCreator.cancelFineTune(fineTuneId, options);
            return common_1.createRequestFunction(localVarAxiosArgs, axios_1.default, base_1.BASE_PATH, configuration);
          });
        },
        /**
         *
         * @summary Answers the specified question using the provided documents and examples.  The endpoint first [searches](/docs/api-reference/searches) over provided documents or files to find relevant context. The relevant context is combined with the provided examples and question to create the prompt for [completion](/docs/api-reference/completions).
         * @param {CreateAnswerRequest} createAnswerRequest
         * @param {*} [options] Override http request option.
         * @deprecated
         * @throws {RequiredError}
         */
        createAnswer(createAnswerRequest, options) {
          return __awaiter(this, void 0, void 0, function* () {
            const localVarAxiosArgs = yield localVarAxiosParamCreator.createAnswer(createAnswerRequest, options);
            return common_1.createRequestFunction(localVarAxiosArgs, axios_1.default, base_1.BASE_PATH, configuration);
          });
        },
        /**
         *
         * @summary Creates a completion for the chat message
         * @param {CreateChatCompletionRequest} createChatCompletionRequest
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        createChatCompletion(createChatCompletionRequest, options) {
          return __awaiter(this, void 0, void 0, function* () {
            const localVarAxiosArgs = yield localVarAxiosParamCreator.createChatCompletion(createChatCompletionRequest, options);
            return common_1.createRequestFunction(localVarAxiosArgs, axios_1.default, base_1.BASE_PATH, configuration);
          });
        },
        /**
         *
         * @summary Classifies the specified `query` using provided examples.  The endpoint first [searches](/docs/api-reference/searches) over the labeled examples to select the ones most relevant for the particular query. Then, the relevant examples are combined with the query to construct a prompt to produce the final label via the [completions](/docs/api-reference/completions) endpoint.  Labeled examples can be provided via an uploaded `file`, or explicitly listed in the request using the `examples` parameter for quick tests and small scale use cases.
         * @param {CreateClassificationRequest} createClassificationRequest
         * @param {*} [options] Override http request option.
         * @deprecated
         * @throws {RequiredError}
         */
        createClassification(createClassificationRequest, options) {
          return __awaiter(this, void 0, void 0, function* () {
            const localVarAxiosArgs = yield localVarAxiosParamCreator.createClassification(createClassificationRequest, options);
            return common_1.createRequestFunction(localVarAxiosArgs, axios_1.default, base_1.BASE_PATH, configuration);
          });
        },
        /**
         *
         * @summary Creates a completion for the provided prompt and parameters
         * @param {CreateCompletionRequest} createCompletionRequest
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        createCompletion(createCompletionRequest, options) {
          return __awaiter(this, void 0, void 0, function* () {
            const localVarAxiosArgs = yield localVarAxiosParamCreator.createCompletion(createCompletionRequest, options);
            return common_1.createRequestFunction(localVarAxiosArgs, axios_1.default, base_1.BASE_PATH, configuration);
          });
        },
        /**
         *
         * @summary Creates a new edit for the provided input, instruction, and parameters.
         * @param {CreateEditRequest} createEditRequest
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        createEdit(createEditRequest, options) {
          return __awaiter(this, void 0, void 0, function* () {
            const localVarAxiosArgs = yield localVarAxiosParamCreator.createEdit(createEditRequest, options);
            return common_1.createRequestFunction(localVarAxiosArgs, axios_1.default, base_1.BASE_PATH, configuration);
          });
        },
        /**
         *
         * @summary Creates an embedding vector representing the input text.
         * @param {CreateEmbeddingRequest} createEmbeddingRequest
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        createEmbedding(createEmbeddingRequest, options) {
          return __awaiter(this, void 0, void 0, function* () {
            const localVarAxiosArgs = yield localVarAxiosParamCreator.createEmbedding(createEmbeddingRequest, options);
            return common_1.createRequestFunction(localVarAxiosArgs, axios_1.default, base_1.BASE_PATH, configuration);
          });
        },
        /**
         *
         * @summary Upload a file that contains document(s) to be used across various endpoints/features. Currently, the size of all the files uploaded by one organization can be up to 1 GB. Please contact us if you need to increase the storage limit.
         * @param {File} file Name of the [JSON Lines](https://jsonlines.readthedocs.io/en/latest/) file to be uploaded.  If the &#x60;purpose&#x60; is set to \\\&quot;fine-tune\\\&quot;, each line is a JSON record with \\\&quot;prompt\\\&quot; and \\\&quot;completion\\\&quot; fields representing your [training examples](/docs/guides/fine-tuning/prepare-training-data).
         * @param {string} purpose The intended purpose of the uploaded documents.  Use \\\&quot;fine-tune\\\&quot; for [Fine-tuning](/docs/api-reference/fine-tunes). This allows us to validate the format of the uploaded file.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        createFile(file, purpose, options) {
          return __awaiter(this, void 0, void 0, function* () {
            const localVarAxiosArgs = yield localVarAxiosParamCreator.createFile(file, purpose, options);
            return common_1.createRequestFunction(localVarAxiosArgs, axios_1.default, base_1.BASE_PATH, configuration);
          });
        },
        /**
         *
         * @summary Creates a job that fine-tunes a specified model from a given dataset.  Response includes details of the enqueued job including job status and the name of the fine-tuned models once complete.  [Learn more about Fine-tuning](/docs/guides/fine-tuning)
         * @param {CreateFineTuneRequest} createFineTuneRequest
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        createFineTune(createFineTuneRequest, options) {
          return __awaiter(this, void 0, void 0, function* () {
            const localVarAxiosArgs = yield localVarAxiosParamCreator.createFineTune(createFineTuneRequest, options);
            return common_1.createRequestFunction(localVarAxiosArgs, axios_1.default, base_1.BASE_PATH, configuration);
          });
        },
        /**
         *
         * @summary Creates an image given a prompt.
         * @param {CreateImageRequest} createImageRequest
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        createImage(createImageRequest, options) {
          return __awaiter(this, void 0, void 0, function* () {
            const localVarAxiosArgs = yield localVarAxiosParamCreator.createImage(createImageRequest, options);
            return common_1.createRequestFunction(localVarAxiosArgs, axios_1.default, base_1.BASE_PATH, configuration);
          });
        },
        /**
         *
         * @summary Creates an edited or extended image given an original image and a prompt.
         * @param {File} image The image to edit. Must be a valid PNG file, less than 4MB, and square. If mask is not provided, image must have transparency, which will be used as the mask.
         * @param {string} prompt A text description of the desired image(s). The maximum length is 1000 characters.
         * @param {File} [mask] An additional image whose fully transparent areas (e.g. where alpha is zero) indicate where &#x60;image&#x60; should be edited. Must be a valid PNG file, less than 4MB, and have the same dimensions as &#x60;image&#x60;.
         * @param {number} [n] The number of images to generate. Must be between 1 and 10.
         * @param {string} [size] The size of the generated images. Must be one of &#x60;256x256&#x60;, &#x60;512x512&#x60;, or &#x60;1024x1024&#x60;.
         * @param {string} [responseFormat] The format in which the generated images are returned. Must be one of &#x60;url&#x60; or &#x60;b64_json&#x60;.
         * @param {string} [user] A unique identifier representing your end-user, which can help OpenAI to monitor and detect abuse. [Learn more](/docs/guides/safety-best-practices/end-user-ids).
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        createImageEdit(image, prompt, mask, n, size, responseFormat, user, options) {
          return __awaiter(this, void 0, void 0, function* () {
            const localVarAxiosArgs = yield localVarAxiosParamCreator.createImageEdit(image, prompt, mask, n, size, responseFormat, user, options);
            return common_1.createRequestFunction(localVarAxiosArgs, axios_1.default, base_1.BASE_PATH, configuration);
          });
        },
        /**
         *
         * @summary Creates a variation of a given image.
         * @param {File} image The image to use as the basis for the variation(s). Must be a valid PNG file, less than 4MB, and square.
         * @param {number} [n] The number of images to generate. Must be between 1 and 10.
         * @param {string} [size] The size of the generated images. Must be one of &#x60;256x256&#x60;, &#x60;512x512&#x60;, or &#x60;1024x1024&#x60;.
         * @param {string} [responseFormat] The format in which the generated images are returned. Must be one of &#x60;url&#x60; or &#x60;b64_json&#x60;.
         * @param {string} [user] A unique identifier representing your end-user, which can help OpenAI to monitor and detect abuse. [Learn more](/docs/guides/safety-best-practices/end-user-ids).
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        createImageVariation(image, n, size, responseFormat, user, options) {
          return __awaiter(this, void 0, void 0, function* () {
            const localVarAxiosArgs = yield localVarAxiosParamCreator.createImageVariation(image, n, size, responseFormat, user, options);
            return common_1.createRequestFunction(localVarAxiosArgs, axios_1.default, base_1.BASE_PATH, configuration);
          });
        },
        /**
         *
         * @summary Classifies if text violates OpenAI\'s Content Policy
         * @param {CreateModerationRequest} createModerationRequest
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        createModeration(createModerationRequest, options) {
          return __awaiter(this, void 0, void 0, function* () {
            const localVarAxiosArgs = yield localVarAxiosParamCreator.createModeration(createModerationRequest, options);
            return common_1.createRequestFunction(localVarAxiosArgs, axios_1.default, base_1.BASE_PATH, configuration);
          });
        },
        /**
         *
         * @summary The search endpoint computes similarity scores between provided query and documents. Documents can be passed directly to the API if there are no more than 200 of them.  To go beyond the 200 document limit, documents can be processed offline and then used for efficient retrieval at query time. When `file` is set, the search endpoint searches over all the documents in the given file and returns up to the `max_rerank` number of documents. These documents will be returned along with their search scores.  The similarity score is a positive score that usually ranges from 0 to 300 (but can sometimes go higher), where a score above 200 usually means the document is semantically similar to the query.
         * @param {string} engineId The ID of the engine to use for this request.  You can select one of &#x60;ada&#x60;, &#x60;babbage&#x60;, &#x60;curie&#x60;, or &#x60;davinci&#x60;.
         * @param {CreateSearchRequest} createSearchRequest
         * @param {*} [options] Override http request option.
         * @deprecated
         * @throws {RequiredError}
         */
        createSearch(engineId, createSearchRequest, options) {
          return __awaiter(this, void 0, void 0, function* () {
            const localVarAxiosArgs = yield localVarAxiosParamCreator.createSearch(engineId, createSearchRequest, options);
            return common_1.createRequestFunction(localVarAxiosArgs, axios_1.default, base_1.BASE_PATH, configuration);
          });
        },
        /**
         *
         * @summary Transcribes audio into the input language.
         * @param {File} file The audio file to transcribe, in one of these formats: mp3, mp4, mpeg, mpga, m4a, wav, or webm.
         * @param {string} model ID of the model to use. Only &#x60;whisper-1&#x60; is currently available.
         * @param {string} [prompt] An optional text to guide the model\\\&#39;s style or continue a previous audio segment. The [prompt](/docs/guides/speech-to-text/prompting) should match the audio language.
         * @param {string} [responseFormat] The format of the transcript output, in one of these options: json, text, srt, verbose_json, or vtt.
         * @param {number} [temperature] The sampling temperature, between 0 and 1. Higher values like 0.8 will make the output more random, while lower values like 0.2 will make it more focused and deterministic. If set to 0, the model will use [log probability](https://en.wikipedia.org/wiki/Log_probability) to automatically increase the temperature until certain thresholds are hit.
         * @param {string} [language] The language of the input audio. Supplying the input language in [ISO-639-1](https://en.wikipedia.org/wiki/List_of_ISO_639-1_codes) format will improve accuracy and latency.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        createTranscription(file, model, prompt, responseFormat, temperature, language, options) {
          return __awaiter(this, void 0, void 0, function* () {
            const localVarAxiosArgs = yield localVarAxiosParamCreator.createTranscription(file, model, prompt, responseFormat, temperature, language, options);
            return common_1.createRequestFunction(localVarAxiosArgs, axios_1.default, base_1.BASE_PATH, configuration);
          });
        },
        /**
         *
         * @summary Translates audio into into English.
         * @param {File} file The audio file to translate, in one of these formats: mp3, mp4, mpeg, mpga, m4a, wav, or webm.
         * @param {string} model ID of the model to use. Only &#x60;whisper-1&#x60; is currently available.
         * @param {string} [prompt] An optional text to guide the model\\\&#39;s style or continue a previous audio segment. The [prompt](/docs/guides/speech-to-text/prompting) should be in English.
         * @param {string} [responseFormat] The format of the transcript output, in one of these options: json, text, srt, verbose_json, or vtt.
         * @param {number} [temperature] The sampling temperature, between 0 and 1. Higher values like 0.8 will make the output more random, while lower values like 0.2 will make it more focused and deterministic. If set to 0, the model will use [log probability](https://en.wikipedia.org/wiki/Log_probability) to automatically increase the temperature until certain thresholds are hit.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        createTranslation(file, model, prompt, responseFormat, temperature, options) {
          return __awaiter(this, void 0, void 0, function* () {
            const localVarAxiosArgs = yield localVarAxiosParamCreator.createTranslation(file, model, prompt, responseFormat, temperature, options);
            return common_1.createRequestFunction(localVarAxiosArgs, axios_1.default, base_1.BASE_PATH, configuration);
          });
        },
        /**
         *
         * @summary Delete a file.
         * @param {string} fileId The ID of the file to use for this request
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        deleteFile(fileId, options) {
          return __awaiter(this, void 0, void 0, function* () {
            const localVarAxiosArgs = yield localVarAxiosParamCreator.deleteFile(fileId, options);
            return common_1.createRequestFunction(localVarAxiosArgs, axios_1.default, base_1.BASE_PATH, configuration);
          });
        },
        /**
         *
         * @summary Delete a fine-tuned model. You must have the Owner role in your organization.
         * @param {string} model The model to delete
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        deleteModel(model, options) {
          return __awaiter(this, void 0, void 0, function* () {
            const localVarAxiosArgs = yield localVarAxiosParamCreator.deleteModel(model, options);
            return common_1.createRequestFunction(localVarAxiosArgs, axios_1.default, base_1.BASE_PATH, configuration);
          });
        },
        /**
         *
         * @summary Returns the contents of the specified file
         * @param {string} fileId The ID of the file to use for this request
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        downloadFile(fileId, options) {
          return __awaiter(this, void 0, void 0, function* () {
            const localVarAxiosArgs = yield localVarAxiosParamCreator.downloadFile(fileId, options);
            return common_1.createRequestFunction(localVarAxiosArgs, axios_1.default, base_1.BASE_PATH, configuration);
          });
        },
        /**
         *
         * @summary Lists the currently available (non-finetuned) models, and provides basic information about each one such as the owner and availability.
         * @param {*} [options] Override http request option.
         * @deprecated
         * @throws {RequiredError}
         */
        listEngines(options) {
          return __awaiter(this, void 0, void 0, function* () {
            const localVarAxiosArgs = yield localVarAxiosParamCreator.listEngines(options);
            return common_1.createRequestFunction(localVarAxiosArgs, axios_1.default, base_1.BASE_PATH, configuration);
          });
        },
        /**
         *
         * @summary Returns a list of files that belong to the user\'s organization.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        listFiles(options) {
          return __awaiter(this, void 0, void 0, function* () {
            const localVarAxiosArgs = yield localVarAxiosParamCreator.listFiles(options);
            return common_1.createRequestFunction(localVarAxiosArgs, axios_1.default, base_1.BASE_PATH, configuration);
          });
        },
        /**
         *
         * @summary Get fine-grained status updates for a fine-tune job.
         * @param {string} fineTuneId The ID of the fine-tune job to get events for.
         * @param {boolean} [stream] Whether to stream events for the fine-tune job. If set to true, events will be sent as data-only [server-sent events](https://developer.mozilla.org/en-US/docs/Web/API/Server-sent_events/Using_server-sent_events#Event_stream_format) as they become available. The stream will terminate with a &#x60;data: [DONE]&#x60; message when the job is finished (succeeded, cancelled, or failed).  If set to false, only events generated so far will be returned.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        listFineTuneEvents(fineTuneId, stream, options) {
          return __awaiter(this, void 0, void 0, function* () {
            const localVarAxiosArgs = yield localVarAxiosParamCreator.listFineTuneEvents(fineTuneId, stream, options);
            return common_1.createRequestFunction(localVarAxiosArgs, axios_1.default, base_1.BASE_PATH, configuration);
          });
        },
        /**
         *
         * @summary List your organization\'s fine-tuning jobs
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        listFineTunes(options) {
          return __awaiter(this, void 0, void 0, function* () {
            const localVarAxiosArgs = yield localVarAxiosParamCreator.listFineTunes(options);
            return common_1.createRequestFunction(localVarAxiosArgs, axios_1.default, base_1.BASE_PATH, configuration);
          });
        },
        /**
         *
         * @summary Lists the currently available models, and provides basic information about each one such as the owner and availability.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        listModels(options) {
          return __awaiter(this, void 0, void 0, function* () {
            const localVarAxiosArgs = yield localVarAxiosParamCreator.listModels(options);
            return common_1.createRequestFunction(localVarAxiosArgs, axios_1.default, base_1.BASE_PATH, configuration);
          });
        },
        /**
         *
         * @summary Retrieves a model instance, providing basic information about it such as the owner and availability.
         * @param {string} engineId The ID of the engine to use for this request
         * @param {*} [options] Override http request option.
         * @deprecated
         * @throws {RequiredError}
         */
        retrieveEngine(engineId, options) {
          return __awaiter(this, void 0, void 0, function* () {
            const localVarAxiosArgs = yield localVarAxiosParamCreator.retrieveEngine(engineId, options);
            return common_1.createRequestFunction(localVarAxiosArgs, axios_1.default, base_1.BASE_PATH, configuration);
          });
        },
        /**
         *
         * @summary Returns information about a specific file.
         * @param {string} fileId The ID of the file to use for this request
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        retrieveFile(fileId, options) {
          return __awaiter(this, void 0, void 0, function* () {
            const localVarAxiosArgs = yield localVarAxiosParamCreator.retrieveFile(fileId, options);
            return common_1.createRequestFunction(localVarAxiosArgs, axios_1.default, base_1.BASE_PATH, configuration);
          });
        },
        /**
         *
         * @summary Gets info about the fine-tune job.  [Learn more about Fine-tuning](/docs/guides/fine-tuning)
         * @param {string} fineTuneId The ID of the fine-tune job
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        retrieveFineTune(fineTuneId, options) {
          return __awaiter(this, void 0, void 0, function* () {
            const localVarAxiosArgs = yield localVarAxiosParamCreator.retrieveFineTune(fineTuneId, options);
            return common_1.createRequestFunction(localVarAxiosArgs, axios_1.default, base_1.BASE_PATH, configuration);
          });
        },
        /**
         *
         * @summary Retrieves a model instance, providing basic information about the model such as the owner and permissioning.
         * @param {string} model The ID of the model to use for this request
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        retrieveModel(model, options) {
          return __awaiter(this, void 0, void 0, function* () {
            const localVarAxiosArgs = yield localVarAxiosParamCreator.retrieveModel(model, options);
            return common_1.createRequestFunction(localVarAxiosArgs, axios_1.default, base_1.BASE_PATH, configuration);
          });
        }
      };
    };
    exports.OpenAIApiFactory = function(configuration, basePath, axios) {
      const localVarFp = exports.OpenAIApiFp(configuration);
      return {
        /**
         *
         * @summary Immediately cancel a fine-tune job.
         * @param {string} fineTuneId The ID of the fine-tune job to cancel
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        cancelFineTune(fineTuneId, options) {
          return localVarFp.cancelFineTune(fineTuneId, options).then((request) => request(axios, basePath));
        },
        /**
         *
         * @summary Answers the specified question using the provided documents and examples.  The endpoint first [searches](/docs/api-reference/searches) over provided documents or files to find relevant context. The relevant context is combined with the provided examples and question to create the prompt for [completion](/docs/api-reference/completions).
         * @param {CreateAnswerRequest} createAnswerRequest
         * @param {*} [options] Override http request option.
         * @deprecated
         * @throws {RequiredError}
         */
        createAnswer(createAnswerRequest, options) {
          return localVarFp.createAnswer(createAnswerRequest, options).then((request) => request(axios, basePath));
        },
        /**
         *
         * @summary Creates a completion for the chat message
         * @param {CreateChatCompletionRequest} createChatCompletionRequest
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        createChatCompletion(createChatCompletionRequest, options) {
          return localVarFp.createChatCompletion(createChatCompletionRequest, options).then((request) => request(axios, basePath));
        },
        /**
         *
         * @summary Classifies the specified `query` using provided examples.  The endpoint first [searches](/docs/api-reference/searches) over the labeled examples to select the ones most relevant for the particular query. Then, the relevant examples are combined with the query to construct a prompt to produce the final label via the [completions](/docs/api-reference/completions) endpoint.  Labeled examples can be provided via an uploaded `file`, or explicitly listed in the request using the `examples` parameter for quick tests and small scale use cases.
         * @param {CreateClassificationRequest} createClassificationRequest
         * @param {*} [options] Override http request option.
         * @deprecated
         * @throws {RequiredError}
         */
        createClassification(createClassificationRequest, options) {
          return localVarFp.createClassification(createClassificationRequest, options).then((request) => request(axios, basePath));
        },
        /**
         *
         * @summary Creates a completion for the provided prompt and parameters
         * @param {CreateCompletionRequest} createCompletionRequest
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        createCompletion(createCompletionRequest, options) {
          return localVarFp.createCompletion(createCompletionRequest, options).then((request) => request(axios, basePath));
        },
        /**
         *
         * @summary Creates a new edit for the provided input, instruction, and parameters.
         * @param {CreateEditRequest} createEditRequest
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        createEdit(createEditRequest, options) {
          return localVarFp.createEdit(createEditRequest, options).then((request) => request(axios, basePath));
        },
        /**
         *
         * @summary Creates an embedding vector representing the input text.
         * @param {CreateEmbeddingRequest} createEmbeddingRequest
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        createEmbedding(createEmbeddingRequest, options) {
          return localVarFp.createEmbedding(createEmbeddingRequest, options).then((request) => request(axios, basePath));
        },
        /**
         *
         * @summary Upload a file that contains document(s) to be used across various endpoints/features. Currently, the size of all the files uploaded by one organization can be up to 1 GB. Please contact us if you need to increase the storage limit.
         * @param {File} file Name of the [JSON Lines](https://jsonlines.readthedocs.io/en/latest/) file to be uploaded.  If the &#x60;purpose&#x60; is set to \\\&quot;fine-tune\\\&quot;, each line is a JSON record with \\\&quot;prompt\\\&quot; and \\\&quot;completion\\\&quot; fields representing your [training examples](/docs/guides/fine-tuning/prepare-training-data).
         * @param {string} purpose The intended purpose of the uploaded documents.  Use \\\&quot;fine-tune\\\&quot; for [Fine-tuning](/docs/api-reference/fine-tunes). This allows us to validate the format of the uploaded file.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        createFile(file, purpose, options) {
          return localVarFp.createFile(file, purpose, options).then((request) => request(axios, basePath));
        },
        /**
         *
         * @summary Creates a job that fine-tunes a specified model from a given dataset.  Response includes details of the enqueued job including job status and the name of the fine-tuned models once complete.  [Learn more about Fine-tuning](/docs/guides/fine-tuning)
         * @param {CreateFineTuneRequest} createFineTuneRequest
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        createFineTune(createFineTuneRequest, options) {
          return localVarFp.createFineTune(createFineTuneRequest, options).then((request) => request(axios, basePath));
        },
        /**
         *
         * @summary Creates an image given a prompt.
         * @param {CreateImageRequest} createImageRequest
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        createImage(createImageRequest, options) {
          return localVarFp.createImage(createImageRequest, options).then((request) => request(axios, basePath));
        },
        /**
         *
         * @summary Creates an edited or extended image given an original image and a prompt.
         * @param {File} image The image to edit. Must be a valid PNG file, less than 4MB, and square. If mask is not provided, image must have transparency, which will be used as the mask.
         * @param {string} prompt A text description of the desired image(s). The maximum length is 1000 characters.
         * @param {File} [mask] An additional image whose fully transparent areas (e.g. where alpha is zero) indicate where &#x60;image&#x60; should be edited. Must be a valid PNG file, less than 4MB, and have the same dimensions as &#x60;image&#x60;.
         * @param {number} [n] The number of images to generate. Must be between 1 and 10.
         * @param {string} [size] The size of the generated images. Must be one of &#x60;256x256&#x60;, &#x60;512x512&#x60;, or &#x60;1024x1024&#x60;.
         * @param {string} [responseFormat] The format in which the generated images are returned. Must be one of &#x60;url&#x60; or &#x60;b64_json&#x60;.
         * @param {string} [user] A unique identifier representing your end-user, which can help OpenAI to monitor and detect abuse. [Learn more](/docs/guides/safety-best-practices/end-user-ids).
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        createImageEdit(image, prompt, mask, n, size, responseFormat, user, options) {
          return localVarFp.createImageEdit(image, prompt, mask, n, size, responseFormat, user, options).then((request) => request(axios, basePath));
        },
        /**
         *
         * @summary Creates a variation of a given image.
         * @param {File} image The image to use as the basis for the variation(s). Must be a valid PNG file, less than 4MB, and square.
         * @param {number} [n] The number of images to generate. Must be between 1 and 10.
         * @param {string} [size] The size of the generated images. Must be one of &#x60;256x256&#x60;, &#x60;512x512&#x60;, or &#x60;1024x1024&#x60;.
         * @param {string} [responseFormat] The format in which the generated images are returned. Must be one of &#x60;url&#x60; or &#x60;b64_json&#x60;.
         * @param {string} [user] A unique identifier representing your end-user, which can help OpenAI to monitor and detect abuse. [Learn more](/docs/guides/safety-best-practices/end-user-ids).
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        createImageVariation(image, n, size, responseFormat, user, options) {
          return localVarFp.createImageVariation(image, n, size, responseFormat, user, options).then((request) => request(axios, basePath));
        },
        /**
         *
         * @summary Classifies if text violates OpenAI\'s Content Policy
         * @param {CreateModerationRequest} createModerationRequest
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        createModeration(createModerationRequest, options) {
          return localVarFp.createModeration(createModerationRequest, options).then((request) => request(axios, basePath));
        },
        /**
         *
         * @summary The search endpoint computes similarity scores between provided query and documents. Documents can be passed directly to the API if there are no more than 200 of them.  To go beyond the 200 document limit, documents can be processed offline and then used for efficient retrieval at query time. When `file` is set, the search endpoint searches over all the documents in the given file and returns up to the `max_rerank` number of documents. These documents will be returned along with their search scores.  The similarity score is a positive score that usually ranges from 0 to 300 (but can sometimes go higher), where a score above 200 usually means the document is semantically similar to the query.
         * @param {string} engineId The ID of the engine to use for this request.  You can select one of &#x60;ada&#x60;, &#x60;babbage&#x60;, &#x60;curie&#x60;, or &#x60;davinci&#x60;.
         * @param {CreateSearchRequest} createSearchRequest
         * @param {*} [options] Override http request option.
         * @deprecated
         * @throws {RequiredError}
         */
        createSearch(engineId, createSearchRequest, options) {
          return localVarFp.createSearch(engineId, createSearchRequest, options).then((request) => request(axios, basePath));
        },
        /**
         *
         * @summary Transcribes audio into the input language.
         * @param {File} file The audio file to transcribe, in one of these formats: mp3, mp4, mpeg, mpga, m4a, wav, or webm.
         * @param {string} model ID of the model to use. Only &#x60;whisper-1&#x60; is currently available.
         * @param {string} [prompt] An optional text to guide the model\\\&#39;s style or continue a previous audio segment. The [prompt](/docs/guides/speech-to-text/prompting) should match the audio language.
         * @param {string} [responseFormat] The format of the transcript output, in one of these options: json, text, srt, verbose_json, or vtt.
         * @param {number} [temperature] The sampling temperature, between 0 and 1. Higher values like 0.8 will make the output more random, while lower values like 0.2 will make it more focused and deterministic. If set to 0, the model will use [log probability](https://en.wikipedia.org/wiki/Log_probability) to automatically increase the temperature until certain thresholds are hit.
         * @param {string} [language] The language of the input audio. Supplying the input language in [ISO-639-1](https://en.wikipedia.org/wiki/List_of_ISO_639-1_codes) format will improve accuracy and latency.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        createTranscription(file, model, prompt, responseFormat, temperature, language, options) {
          return localVarFp.createTranscription(file, model, prompt, responseFormat, temperature, language, options).then((request) => request(axios, basePath));
        },
        /**
         *
         * @summary Translates audio into into English.
         * @param {File} file The audio file to translate, in one of these formats: mp3, mp4, mpeg, mpga, m4a, wav, or webm.
         * @param {string} model ID of the model to use. Only &#x60;whisper-1&#x60; is currently available.
         * @param {string} [prompt] An optional text to guide the model\\\&#39;s style or continue a previous audio segment. The [prompt](/docs/guides/speech-to-text/prompting) should be in English.
         * @param {string} [responseFormat] The format of the transcript output, in one of these options: json, text, srt, verbose_json, or vtt.
         * @param {number} [temperature] The sampling temperature, between 0 and 1. Higher values like 0.8 will make the output more random, while lower values like 0.2 will make it more focused and deterministic. If set to 0, the model will use [log probability](https://en.wikipedia.org/wiki/Log_probability) to automatically increase the temperature until certain thresholds are hit.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        createTranslation(file, model, prompt, responseFormat, temperature, options) {
          return localVarFp.createTranslation(file, model, prompt, responseFormat, temperature, options).then((request) => request(axios, basePath));
        },
        /**
         *
         * @summary Delete a file.
         * @param {string} fileId The ID of the file to use for this request
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        deleteFile(fileId, options) {
          return localVarFp.deleteFile(fileId, options).then((request) => request(axios, basePath));
        },
        /**
         *
         * @summary Delete a fine-tuned model. You must have the Owner role in your organization.
         * @param {string} model The model to delete
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        deleteModel(model, options) {
          return localVarFp.deleteModel(model, options).then((request) => request(axios, basePath));
        },
        /**
         *
         * @summary Returns the contents of the specified file
         * @param {string} fileId The ID of the file to use for this request
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        downloadFile(fileId, options) {
          return localVarFp.downloadFile(fileId, options).then((request) => request(axios, basePath));
        },
        /**
         *
         * @summary Lists the currently available (non-finetuned) models, and provides basic information about each one such as the owner and availability.
         * @param {*} [options] Override http request option.
         * @deprecated
         * @throws {RequiredError}
         */
        listEngines(options) {
          return localVarFp.listEngines(options).then((request) => request(axios, basePath));
        },
        /**
         *
         * @summary Returns a list of files that belong to the user\'s organization.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        listFiles(options) {
          return localVarFp.listFiles(options).then((request) => request(axios, basePath));
        },
        /**
         *
         * @summary Get fine-grained status updates for a fine-tune job.
         * @param {string} fineTuneId The ID of the fine-tune job to get events for.
         * @param {boolean} [stream] Whether to stream events for the fine-tune job. If set to true, events will be sent as data-only [server-sent events](https://developer.mozilla.org/en-US/docs/Web/API/Server-sent_events/Using_server-sent_events#Event_stream_format) as they become available. The stream will terminate with a &#x60;data: [DONE]&#x60; message when the job is finished (succeeded, cancelled, or failed).  If set to false, only events generated so far will be returned.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        listFineTuneEvents(fineTuneId, stream, options) {
          return localVarFp.listFineTuneEvents(fineTuneId, stream, options).then((request) => request(axios, basePath));
        },
        /**
         *
         * @summary List your organization\'s fine-tuning jobs
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        listFineTunes(options) {
          return localVarFp.listFineTunes(options).then((request) => request(axios, basePath));
        },
        /**
         *
         * @summary Lists the currently available models, and provides basic information about each one such as the owner and availability.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        listModels(options) {
          return localVarFp.listModels(options).then((request) => request(axios, basePath));
        },
        /**
         *
         * @summary Retrieves a model instance, providing basic information about it such as the owner and availability.
         * @param {string} engineId The ID of the engine to use for this request
         * @param {*} [options] Override http request option.
         * @deprecated
         * @throws {RequiredError}
         */
        retrieveEngine(engineId, options) {
          return localVarFp.retrieveEngine(engineId, options).then((request) => request(axios, basePath));
        },
        /**
         *
         * @summary Returns information about a specific file.
         * @param {string} fileId The ID of the file to use for this request
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        retrieveFile(fileId, options) {
          return localVarFp.retrieveFile(fileId, options).then((request) => request(axios, basePath));
        },
        /**
         *
         * @summary Gets info about the fine-tune job.  [Learn more about Fine-tuning](/docs/guides/fine-tuning)
         * @param {string} fineTuneId The ID of the fine-tune job
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        retrieveFineTune(fineTuneId, options) {
          return localVarFp.retrieveFineTune(fineTuneId, options).then((request) => request(axios, basePath));
        },
        /**
         *
         * @summary Retrieves a model instance, providing basic information about the model such as the owner and permissioning.
         * @param {string} model The ID of the model to use for this request
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        retrieveModel(model, options) {
          return localVarFp.retrieveModel(model, options).then((request) => request(axios, basePath));
        }
      };
    };
    var OpenAIApi = class extends base_1.BaseAPI {
      /**
       *
       * @summary Immediately cancel a fine-tune job.
       * @param {string} fineTuneId The ID of the fine-tune job to cancel
       * @param {*} [options] Override http request option.
       * @throws {RequiredError}
       * @memberof OpenAIApi
       */
      cancelFineTune(fineTuneId, options) {
        return exports.OpenAIApiFp(this.configuration).cancelFineTune(fineTuneId, options).then((request) => request(this.axios, this.basePath));
      }
      /**
       *
       * @summary Answers the specified question using the provided documents and examples.  The endpoint first [searches](/docs/api-reference/searches) over provided documents or files to find relevant context. The relevant context is combined with the provided examples and question to create the prompt for [completion](/docs/api-reference/completions).
       * @param {CreateAnswerRequest} createAnswerRequest
       * @param {*} [options] Override http request option.
       * @deprecated
       * @throws {RequiredError}
       * @memberof OpenAIApi
       */
      createAnswer(createAnswerRequest, options) {
        return exports.OpenAIApiFp(this.configuration).createAnswer(createAnswerRequest, options).then((request) => request(this.axios, this.basePath));
      }
      /**
       *
       * @summary Creates a completion for the chat message
       * @param {CreateChatCompletionRequest} createChatCompletionRequest
       * @param {*} [options] Override http request option.
       * @throws {RequiredError}
       * @memberof OpenAIApi
       */
      createChatCompletion(createChatCompletionRequest, options) {
        return exports.OpenAIApiFp(this.configuration).createChatCompletion(createChatCompletionRequest, options).then((request) => request(this.axios, this.basePath));
      }
      /**
       *
       * @summary Classifies the specified `query` using provided examples.  The endpoint first [searches](/docs/api-reference/searches) over the labeled examples to select the ones most relevant for the particular query. Then, the relevant examples are combined with the query to construct a prompt to produce the final label via the [completions](/docs/api-reference/completions) endpoint.  Labeled examples can be provided via an uploaded `file`, or explicitly listed in the request using the `examples` parameter for quick tests and small scale use cases.
       * @param {CreateClassificationRequest} createClassificationRequest
       * @param {*} [options] Override http request option.
       * @deprecated
       * @throws {RequiredError}
       * @memberof OpenAIApi
       */
      createClassification(createClassificationRequest, options) {
        return exports.OpenAIApiFp(this.configuration).createClassification(createClassificationRequest, options).then((request) => request(this.axios, this.basePath));
      }
      /**
       *
       * @summary Creates a completion for the provided prompt and parameters
       * @param {CreateCompletionRequest} createCompletionRequest
       * @param {*} [options] Override http request option.
       * @throws {RequiredError}
       * @memberof OpenAIApi
       */
      createCompletion(createCompletionRequest, options) {
        return exports.OpenAIApiFp(this.configuration).createCompletion(createCompletionRequest, options).then((request) => request(this.axios, this.basePath));
      }
      /**
       *
       * @summary Creates a new edit for the provided input, instruction, and parameters.
       * @param {CreateEditRequest} createEditRequest
       * @param {*} [options] Override http request option.
       * @throws {RequiredError}
       * @memberof OpenAIApi
       */
      createEdit(createEditRequest, options) {
        return exports.OpenAIApiFp(this.configuration).createEdit(createEditRequest, options).then((request) => request(this.axios, this.basePath));
      }
      /**
       *
       * @summary Creates an embedding vector representing the input text.
       * @param {CreateEmbeddingRequest} createEmbeddingRequest
       * @param {*} [options] Override http request option.
       * @throws {RequiredError}
       * @memberof OpenAIApi
       */
      createEmbedding(createEmbeddingRequest, options) {
        return exports.OpenAIApiFp(this.configuration).createEmbedding(createEmbeddingRequest, options).then((request) => request(this.axios, this.basePath));
      }
      /**
       *
       * @summary Upload a file that contains document(s) to be used across various endpoints/features. Currently, the size of all the files uploaded by one organization can be up to 1 GB. Please contact us if you need to increase the storage limit.
       * @param {File} file Name of the [JSON Lines](https://jsonlines.readthedocs.io/en/latest/) file to be uploaded.  If the &#x60;purpose&#x60; is set to \\\&quot;fine-tune\\\&quot;, each line is a JSON record with \\\&quot;prompt\\\&quot; and \\\&quot;completion\\\&quot; fields representing your [training examples](/docs/guides/fine-tuning/prepare-training-data).
       * @param {string} purpose The intended purpose of the uploaded documents.  Use \\\&quot;fine-tune\\\&quot; for [Fine-tuning](/docs/api-reference/fine-tunes). This allows us to validate the format of the uploaded file.
       * @param {*} [options] Override http request option.
       * @throws {RequiredError}
       * @memberof OpenAIApi
       */
      createFile(file, purpose, options) {
        return exports.OpenAIApiFp(this.configuration).createFile(file, purpose, options).then((request) => request(this.axios, this.basePath));
      }
      /**
       *
       * @summary Creates a job that fine-tunes a specified model from a given dataset.  Response includes details of the enqueued job including job status and the name of the fine-tuned models once complete.  [Learn more about Fine-tuning](/docs/guides/fine-tuning)
       * @param {CreateFineTuneRequest} createFineTuneRequest
       * @param {*} [options] Override http request option.
       * @throws {RequiredError}
       * @memberof OpenAIApi
       */
      createFineTune(createFineTuneRequest, options) {
        return exports.OpenAIApiFp(this.configuration).createFineTune(createFineTuneRequest, options).then((request) => request(this.axios, this.basePath));
      }
      /**
       *
       * @summary Creates an image given a prompt.
       * @param {CreateImageRequest} createImageRequest
       * @param {*} [options] Override http request option.
       * @throws {RequiredError}
       * @memberof OpenAIApi
       */
      createImage(createImageRequest, options) {
        return exports.OpenAIApiFp(this.configuration).createImage(createImageRequest, options).then((request) => request(this.axios, this.basePath));
      }
      /**
       *
       * @summary Creates an edited or extended image given an original image and a prompt.
       * @param {File} image The image to edit. Must be a valid PNG file, less than 4MB, and square. If mask is not provided, image must have transparency, which will be used as the mask.
       * @param {string} prompt A text description of the desired image(s). The maximum length is 1000 characters.
       * @param {File} [mask] An additional image whose fully transparent areas (e.g. where alpha is zero) indicate where &#x60;image&#x60; should be edited. Must be a valid PNG file, less than 4MB, and have the same dimensions as &#x60;image&#x60;.
       * @param {number} [n] The number of images to generate. Must be between 1 and 10.
       * @param {string} [size] The size of the generated images. Must be one of &#x60;256x256&#x60;, &#x60;512x512&#x60;, or &#x60;1024x1024&#x60;.
       * @param {string} [responseFormat] The format in which the generated images are returned. Must be one of &#x60;url&#x60; or &#x60;b64_json&#x60;.
       * @param {string} [user] A unique identifier representing your end-user, which can help OpenAI to monitor and detect abuse. [Learn more](/docs/guides/safety-best-practices/end-user-ids).
       * @param {*} [options] Override http request option.
       * @throws {RequiredError}
       * @memberof OpenAIApi
       */
      createImageEdit(image, prompt, mask, n, size, responseFormat, user, options) {
        return exports.OpenAIApiFp(this.configuration).createImageEdit(image, prompt, mask, n, size, responseFormat, user, options).then((request) => request(this.axios, this.basePath));
      }
      /**
       *
       * @summary Creates a variation of a given image.
       * @param {File} image The image to use as the basis for the variation(s). Must be a valid PNG file, less than 4MB, and square.
       * @param {number} [n] The number of images to generate. Must be between 1 and 10.
       * @param {string} [size] The size of the generated images. Must be one of &#x60;256x256&#x60;, &#x60;512x512&#x60;, or &#x60;1024x1024&#x60;.
       * @param {string} [responseFormat] The format in which the generated images are returned. Must be one of &#x60;url&#x60; or &#x60;b64_json&#x60;.
       * @param {string} [user] A unique identifier representing your end-user, which can help OpenAI to monitor and detect abuse. [Learn more](/docs/guides/safety-best-practices/end-user-ids).
       * @param {*} [options] Override http request option.
       * @throws {RequiredError}
       * @memberof OpenAIApi
       */
      createImageVariation(image, n, size, responseFormat, user, options) {
        return exports.OpenAIApiFp(this.configuration).createImageVariation(image, n, size, responseFormat, user, options).then((request) => request(this.axios, this.basePath));
      }
      /**
       *
       * @summary Classifies if text violates OpenAI\'s Content Policy
       * @param {CreateModerationRequest} createModerationRequest
       * @param {*} [options] Override http request option.
       * @throws {RequiredError}
       * @memberof OpenAIApi
       */
      createModeration(createModerationRequest, options) {
        return exports.OpenAIApiFp(this.configuration).createModeration(createModerationRequest, options).then((request) => request(this.axios, this.basePath));
      }
      /**
       *
       * @summary The search endpoint computes similarity scores between provided query and documents. Documents can be passed directly to the API if there are no more than 200 of them.  To go beyond the 200 document limit, documents can be processed offline and then used for efficient retrieval at query time. When `file` is set, the search endpoint searches over all the documents in the given file and returns up to the `max_rerank` number of documents. These documents will be returned along with their search scores.  The similarity score is a positive score that usually ranges from 0 to 300 (but can sometimes go higher), where a score above 200 usually means the document is semantically similar to the query.
       * @param {string} engineId The ID of the engine to use for this request.  You can select one of &#x60;ada&#x60;, &#x60;babbage&#x60;, &#x60;curie&#x60;, or &#x60;davinci&#x60;.
       * @param {CreateSearchRequest} createSearchRequest
       * @param {*} [options] Override http request option.
       * @deprecated
       * @throws {RequiredError}
       * @memberof OpenAIApi
       */
      createSearch(engineId, createSearchRequest, options) {
        return exports.OpenAIApiFp(this.configuration).createSearch(engineId, createSearchRequest, options).then((request) => request(this.axios, this.basePath));
      }
      /**
       *
       * @summary Transcribes audio into the input language.
       * @param {File} file The audio file to transcribe, in one of these formats: mp3, mp4, mpeg, mpga, m4a, wav, or webm.
       * @param {string} model ID of the model to use. Only &#x60;whisper-1&#x60; is currently available.
       * @param {string} [prompt] An optional text to guide the model\\\&#39;s style or continue a previous audio segment. The [prompt](/docs/guides/speech-to-text/prompting) should match the audio language.
       * @param {string} [responseFormat] The format of the transcript output, in one of these options: json, text, srt, verbose_json, or vtt.
       * @param {number} [temperature] The sampling temperature, between 0 and 1. Higher values like 0.8 will make the output more random, while lower values like 0.2 will make it more focused and deterministic. If set to 0, the model will use [log probability](https://en.wikipedia.org/wiki/Log_probability) to automatically increase the temperature until certain thresholds are hit.
       * @param {string} [language] The language of the input audio. Supplying the input language in [ISO-639-1](https://en.wikipedia.org/wiki/List_of_ISO_639-1_codes) format will improve accuracy and latency.
       * @param {*} [options] Override http request option.
       * @throws {RequiredError}
       * @memberof OpenAIApi
       */
      createTranscription(file, model, prompt, responseFormat, temperature, language, options) {
        return exports.OpenAIApiFp(this.configuration).createTranscription(file, model, prompt, responseFormat, temperature, language, options).then((request) => request(this.axios, this.basePath));
      }
      /**
       *
       * @summary Translates audio into into English.
       * @param {File} file The audio file to translate, in one of these formats: mp3, mp4, mpeg, mpga, m4a, wav, or webm.
       * @param {string} model ID of the model to use. Only &#x60;whisper-1&#x60; is currently available.
       * @param {string} [prompt] An optional text to guide the model\\\&#39;s style or continue a previous audio segment. The [prompt](/docs/guides/speech-to-text/prompting) should be in English.
       * @param {string} [responseFormat] The format of the transcript output, in one of these options: json, text, srt, verbose_json, or vtt.
       * @param {number} [temperature] The sampling temperature, between 0 and 1. Higher values like 0.8 will make the output more random, while lower values like 0.2 will make it more focused and deterministic. If set to 0, the model will use [log probability](https://en.wikipedia.org/wiki/Log_probability) to automatically increase the temperature until certain thresholds are hit.
       * @param {*} [options] Override http request option.
       * @throws {RequiredError}
       * @memberof OpenAIApi
       */
      createTranslation(file, model, prompt, responseFormat, temperature, options) {
        return exports.OpenAIApiFp(this.configuration).createTranslation(file, model, prompt, responseFormat, temperature, options).then((request) => request(this.axios, this.basePath));
      }
      /**
       *
       * @summary Delete a file.
       * @param {string} fileId The ID of the file to use for this request
       * @param {*} [options] Override http request option.
       * @throws {RequiredError}
       * @memberof OpenAIApi
       */
      deleteFile(fileId, options) {
        return exports.OpenAIApiFp(this.configuration).deleteFile(fileId, options).then((request) => request(this.axios, this.basePath));
      }
      /**
       *
       * @summary Delete a fine-tuned model. You must have the Owner role in your organization.
       * @param {string} model The model to delete
       * @param {*} [options] Override http request option.
       * @throws {RequiredError}
       * @memberof OpenAIApi
       */
      deleteModel(model, options) {
        return exports.OpenAIApiFp(this.configuration).deleteModel(model, options).then((request) => request(this.axios, this.basePath));
      }
      /**
       *
       * @summary Returns the contents of the specified file
       * @param {string} fileId The ID of the file to use for this request
       * @param {*} [options] Override http request option.
       * @throws {RequiredError}
       * @memberof OpenAIApi
       */
      downloadFile(fileId, options) {
        return exports.OpenAIApiFp(this.configuration).downloadFile(fileId, options).then((request) => request(this.axios, this.basePath));
      }
      /**
       *
       * @summary Lists the currently available (non-finetuned) models, and provides basic information about each one such as the owner and availability.
       * @param {*} [options] Override http request option.
       * @deprecated
       * @throws {RequiredError}
       * @memberof OpenAIApi
       */
      listEngines(options) {
        return exports.OpenAIApiFp(this.configuration).listEngines(options).then((request) => request(this.axios, this.basePath));
      }
      /**
       *
       * @summary Returns a list of files that belong to the user\'s organization.
       * @param {*} [options] Override http request option.
       * @throws {RequiredError}
       * @memberof OpenAIApi
       */
      listFiles(options) {
        return exports.OpenAIApiFp(this.configuration).listFiles(options).then((request) => request(this.axios, this.basePath));
      }
      /**
       *
       * @summary Get fine-grained status updates for a fine-tune job.
       * @param {string} fineTuneId The ID of the fine-tune job to get events for.
       * @param {boolean} [stream] Whether to stream events for the fine-tune job. If set to true, events will be sent as data-only [server-sent events](https://developer.mozilla.org/en-US/docs/Web/API/Server-sent_events/Using_server-sent_events#Event_stream_format) as they become available. The stream will terminate with a &#x60;data: [DONE]&#x60; message when the job is finished (succeeded, cancelled, or failed).  If set to false, only events generated so far will be returned.
       * @param {*} [options] Override http request option.
       * @throws {RequiredError}
       * @memberof OpenAIApi
       */
      listFineTuneEvents(fineTuneId, stream, options) {
        return exports.OpenAIApiFp(this.configuration).listFineTuneEvents(fineTuneId, stream, options).then((request) => request(this.axios, this.basePath));
      }
      /**
       *
       * @summary List your organization\'s fine-tuning jobs
       * @param {*} [options] Override http request option.
       * @throws {RequiredError}
       * @memberof OpenAIApi
       */
      listFineTunes(options) {
        return exports.OpenAIApiFp(this.configuration).listFineTunes(options).then((request) => request(this.axios, this.basePath));
      }
      /**
       *
       * @summary Lists the currently available models, and provides basic information about each one such as the owner and availability.
       * @param {*} [options] Override http request option.
       * @throws {RequiredError}
       * @memberof OpenAIApi
       */
      listModels(options) {
        return exports.OpenAIApiFp(this.configuration).listModels(options).then((request) => request(this.axios, this.basePath));
      }
      /**
       *
       * @summary Retrieves a model instance, providing basic information about it such as the owner and availability.
       * @param {string} engineId The ID of the engine to use for this request
       * @param {*} [options] Override http request option.
       * @deprecated
       * @throws {RequiredError}
       * @memberof OpenAIApi
       */
      retrieveEngine(engineId, options) {
        return exports.OpenAIApiFp(this.configuration).retrieveEngine(engineId, options).then((request) => request(this.axios, this.basePath));
      }
      /**
       *
       * @summary Returns information about a specific file.
       * @param {string} fileId The ID of the file to use for this request
       * @param {*} [options] Override http request option.
       * @throws {RequiredError}
       * @memberof OpenAIApi
       */
      retrieveFile(fileId, options) {
        return exports.OpenAIApiFp(this.configuration).retrieveFile(fileId, options).then((request) => request(this.axios, this.basePath));
      }
      /**
       *
       * @summary Gets info about the fine-tune job.  [Learn more about Fine-tuning](/docs/guides/fine-tuning)
       * @param {string} fineTuneId The ID of the fine-tune job
       * @param {*} [options] Override http request option.
       * @throws {RequiredError}
       * @memberof OpenAIApi
       */
      retrieveFineTune(fineTuneId, options) {
        return exports.OpenAIApiFp(this.configuration).retrieveFineTune(fineTuneId, options).then((request) => request(this.axios, this.basePath));
      }
      /**
       *
       * @summary Retrieves a model instance, providing basic information about the model such as the owner and permissioning.
       * @param {string} model The ID of the model to use for this request
       * @param {*} [options] Override http request option.
       * @throws {RequiredError}
       * @memberof OpenAIApi
       */
      retrieveModel(model, options) {
        return exports.OpenAIApiFp(this.configuration).retrieveModel(model, options).then((request) => request(this.axios, this.basePath));
      }
    };
    exports.OpenAIApi = OpenAIApi;
  }
});

// node_modules/openai/package.json
var require_package = __commonJS({
  "node_modules/openai/package.json"(exports, module) {
    module.exports = {
      name: "openai",
      version: "3.2.1",
      description: "Node.js library for the OpenAI API",
      repository: {
        type: "git",
        url: "git@github.com:openai/openai-node.git"
      },
      keywords: [
        "openai",
        "open",
        "ai",
        "gpt-3",
        "gpt3"
      ],
      author: "OpenAI",
      license: "MIT",
      main: "./dist/index.js",
      types: "./dist/index.d.ts",
      scripts: {
        build: "tsc --outDir dist/"
      },
      dependencies: {
        axios: "^0.26.0",
        "form-data": "^4.0.0"
      },
      devDependencies: {
        "@types/node": "^12.11.5",
        typescript: "^3.6.4"
      }
    };
  }
});

// node_modules/form-data/lib/browser.js
var require_browser = __commonJS({
  "node_modules/form-data/lib/browser.js"(exports, module) {
    module.exports = typeof self == "object" ? self.FormData : window.FormData;
  }
});

// node_modules/openai/dist/configuration.js
var require_configuration = __commonJS({
  "node_modules/openai/dist/configuration.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.Configuration = void 0;
    var packageJson = require_package();
    var Configuration = class {
      constructor(param = {}) {
        this.apiKey = param.apiKey;
        this.organization = param.organization;
        this.username = param.username;
        this.password = param.password;
        this.accessToken = param.accessToken;
        this.basePath = param.basePath;
        this.baseOptions = param.baseOptions;
        this.formDataCtor = param.formDataCtor;
        if (!this.baseOptions) {
          this.baseOptions = {};
        }
        this.baseOptions.headers = Object.assign({ "User-Agent": `OpenAI/NodeJS/${packageJson.version}`, "Authorization": `Bearer ${this.apiKey}` }, this.baseOptions.headers);
        if (this.organization) {
          this.baseOptions.headers["OpenAI-Organization"] = this.organization;
        }
        if (!this.formDataCtor) {
          this.formDataCtor = require_browser();
        }
      }
      /**
       * Check if the given MIME is a JSON MIME.
       * JSON MIME examples:
       *   application/json
       *   application/json; charset=UTF8
       *   APPLICATION/JSON
       *   application/vnd.company+json
       * @param mime - MIME (Multipurpose Internet Mail Extensions)
       * @return True if the given MIME is JSON, false otherwise.
       */
      isJsonMime(mime) {
        const jsonMime = new RegExp("^(application/json|[^;/ 	]+/[^;/ 	]+[+]json)[ 	]*(;.*)?$", "i");
        return mime !== null && (jsonMime.test(mime) || mime.toLowerCase() === "application/json-patch+json");
      }
    };
    exports.Configuration = Configuration;
  }
});

// node_modules/openai/dist/index.js
var require_dist = __commonJS({
  "node_modules/openai/dist/index.js"(exports) {
    var __createBinding = exports && exports.__createBinding || (Object.create ? function(o, m, k, k2) {
      if (k2 === void 0)
        k2 = k;
      Object.defineProperty(o, k2, { enumerable: true, get: function() {
        return m[k];
      } });
    } : function(o, m, k, k2) {
      if (k2 === void 0)
        k2 = k;
      o[k2] = m[k];
    });
    var __exportStar = exports && exports.__exportStar || function(m, exports2) {
      for (var p in m)
        if (p !== "default" && !exports2.hasOwnProperty(p))
          __createBinding(exports2, m, p);
    };
    Object.defineProperty(exports, "__esModule", { value: true });
    __exportStar(require_api(), exports);
    __exportStar(require_configuration(), exports);
  }
});
export default require_dist();
//# sourceMappingURL=openai.js.map
