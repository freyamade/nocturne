/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/dist";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _amber = __webpack_require__(1);

var _amber2 = _interopRequireDefault(_amber);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

if (!Date.prototype.toGranite) {
  (function () {

    function pad(number) {
      if (number < 10) {
        return '0' + number;
      }
      return number;
    }

    Date.prototype.toGranite = function () {
      return this.getUTCFullYear() + '-' + pad(this.getUTCMonth() + 1) + '-' + pad(this.getUTCDate()) + ' ' + pad(this.getUTCHours()) + ':' + pad(this.getUTCMinutes()) + ':' + pad(this.getUTCSeconds());
    };
  })();

  $(document).ready(function () {
    $('.tabs').tabs();
  });
}

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var EVENTS = {
  join: 'join',
  leave: 'leave',
  message: 'message'
};
var STALE_CONNECTION_THRESHOLD_SECONDS = 100;
var SOCKET_POLLING_RATE = 10000;

/**
 * Returns a numeric value for the current time
 */
var now = function now() {
  return new Date().getTime();
};

/**
 * Returns the difference between the current time and passed `time` in seconds
 * @param {Number|Date} time - A numeric time or date object
 */
var secondsSince = function secondsSince(time) {
  return (now() - time) / 1000;
};

/**
 * Class for channel related functions (joining, leaving, subscribing and sending messages)
 */

var Channel = exports.Channel = function () {
  /**
   * @param {String} topic - topic to subscribe to
   * @param {Socket} socket - A Socket instance
   */
  function Channel(topic, socket) {
    _classCallCheck(this, Channel);

    this.topic = topic;
    this.socket = socket;
    this.onMessageHandlers = [];
  }

  /**
   * Join a channel, subscribe to all channels messages
   */


  _createClass(Channel, [{
    key: 'join',
    value: function join() {
      this.socket.ws.send(JSON.stringify({ event: EVENTS.join, topic: this.topic }));
    }

    /**
     * Leave a channel, stop subscribing to channel messages
     */

  }, {
    key: 'leave',
    value: function leave() {
      this.socket.ws.send(JSON.stringify({ event: EVENTS.leave, topic: this.topic }));
    }

    /**
     * Calls all message handlers with a matching subject
     */

  }, {
    key: 'handleMessage',
    value: function handleMessage(msg) {
      this.onMessageHandlers.forEach(function (handler) {
        if (handler.subject === msg.subject) handler.callback(msg.payload);
      });
    }

    /**
     * Subscribe to a channel subject
     * @param {String} subject - subject to listen for: `msg:new`
     * @param {function} callback - callback function when a new message arrives
     */

  }, {
    key: 'on',
    value: function on(subject, callback) {
      this.onMessageHandlers.push({ subject: subject, callback: callback });
    }

    /**
     * Send a new message to the channel
     * @param {String} subject - subject to send message to: `msg:new`
     * @param {Object} payload - payload object: `{message: 'hello'}`
     */

  }, {
    key: 'push',
    value: function push(subject, payload) {
      this.socket.ws.send(JSON.stringify({ event: EVENTS.message, topic: this.topic, subject: subject, payload: payload }));
    }
  }]);

  return Channel;
}();

/**
 * Class for maintaining connection with server and maintaining channels list
 */


var Socket = exports.Socket = function () {
  /**
   * @param {String} endpoint - Websocket endpont used in routes.cr file
   */
  function Socket(endpoint) {
    _classCallCheck(this, Socket);

    this.endpoint = endpoint;
    this.ws = null;
    this.channels = [];
    this.lastPing = now();
    this.reconnectTries = 0;
    this.attemptReconnect = true;
  }

  /**
   * Returns whether or not the last received ping has been past the threshold
   */


  _createClass(Socket, [{
    key: '_connectionIsStale',
    value: function _connectionIsStale() {
      return secondsSince(this.lastPing) > STALE_CONNECTION_THRESHOLD_SECONDS;
    }

    /**
     * Tries to reconnect to the websocket server using a recursive timeout
     */

  }, {
    key: '_reconnect',
    value: function _reconnect() {
      var _this = this;

      clearTimeout(this.reconnectTimeout);
      this.reconnectTimeout = setTimeout(function () {
        _this.reconnectTries++;
        _this.connect(_this.params);
        _this._reconnect();
      }, this._reconnectInterval());
    }

    /**
     * Returns an incrementing timeout interval based around the number of reconnection retries
     */

  }, {
    key: '_reconnectInterval',
    value: function _reconnectInterval() {
      return [1000, 2000, 5000, 10000][this.reconnectTries] || 10000;
    }

    /**
     * Sets a recursive timeout to check if the connection is stale
     */

  }, {
    key: '_poll',
    value: function _poll() {
      var _this2 = this;

      this.pollingTimeout = setTimeout(function () {
        if (_this2._connectionIsStale()) {
          _this2._reconnect();
        } else {
          _this2._poll();
        }
      }, SOCKET_POLLING_RATE);
    }

    /**
     * Clear polling timeout and start polling
     */

  }, {
    key: '_startPolling',
    value: function _startPolling() {
      clearTimeout(this.pollingTimeout);
      this._poll();
    }

    /**
     * Sets `lastPing` to the curent time
     */

  }, {
    key: '_handlePing',
    value: function _handlePing() {
      this.lastPing = now();
    }

    /**
     * Clears reconnect timeout, resets variables an starts polling
     */

  }, {
    key: '_reset',
    value: function _reset() {
      clearTimeout(this.reconnectTimeout);
      this.reconnectTries = 0;
      this.attemptReconnect = true;
      this._startPolling();
    }

    /**
     * Connect the socket to the server, and binds to native ws functions
     * @param {Object} params - Optional parameters
     * @param {String} params.location - Hostname to connect to, defaults to `window.location.hostname`
     * @param {String} parmas.port - Port to connect to, defaults to `window.location.port`
     * @param {String} params.protocol - Protocol to use, either 'wss' or 'ws'
     */

  }, {
    key: 'connect',
    value: function connect(params) {
      var _this3 = this;

      this.params = params;

      var opts = {
        location: window.location.hostname,
        port: window.location.port,
        protocol: window.location.protocol === 'https:' ? 'wss:' : 'ws:'
      };

      if (params) Object.assign(opts, params);
      if (opts.port) opts.location += ':' + opts.port;

      return new Promise(function (resolve, reject) {
        _this3.ws = new WebSocket(opts.protocol + '//' + opts.location + _this3.endpoint);
        _this3.ws.onmessage = function (msg) {
          _this3.handleMessage(msg);
        };
        _this3.ws.onclose = function () {
          if (_this3.attemptReconnect) _this3._reconnect();
        };
        _this3.ws.onopen = function () {
          _this3._reset();
          resolve();
        };
      });
    }

    /**
     * Closes the socket connection permanently
     */

  }, {
    key: 'disconnect',
    value: function disconnect() {
      this.attemptReconnect = false;
      clearTimeout(this.pollingTimeout);
      clearTimeout(this.reconnectTimeout);
      this.ws.close();
    }

    /**
     * Adds a new channel to the socket channels list
     * @param {String} topic - Topic for the channel: `chat_room:123`
     */

  }, {
    key: 'channel',
    value: function channel(topic) {
      var channel = new Channel(topic, this);
      this.channels.push(channel);
      return channel;
    }

    /**
     * Message handler for messages received
     * @param {MessageEvent} msg - Message received from ws
     */

  }, {
    key: 'handleMessage',
    value: function handleMessage(msg) {
      if (msg.data === "ping") return this._handlePing();

      var parsed_msg = JSON.parse(msg.data);
      this.channels.forEach(function (channel) {
        if (channel.topic === parsed_msg.topic) channel.handleMessage(parsed_msg);
      });
    }
  }]);

  return Socket;
}();

module.exports = {
  Socket: Socket

  /**
   * Allows delete links to post for security and ease of use similar to Rails jquery_ujs
   */
};document.addEventListener("DOMContentLoaded", function () {
  document.querySelectorAll("a[data-method='delete']").forEach(function (element) {
    element.addEventListener("click", function (e) {
      e.preventDefault();
      var message = element.getAttribute("data-confirm") || "Are you sure?";
      if (confirm(message)) {
        var form = document.createElement("form");
        var input = document.createElement("input");
        form.setAttribute("action", element.getAttribute("href"));
        form.setAttribute("method", "POST");
        input.setAttribute("type", "hidden");
        input.setAttribute("name", "_method");
        input.setAttribute("value", "DELETE");
        form.appendChild(input);
        document.body.appendChild(form);
        form.submit();
      }
      return false;
    });
  });
});

/***/ })
/******/ ]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgNzVhNTdkZTc3NDUxN2NkMTlmODkiLCJ3ZWJwYWNrOi8vLy4vc3JjL2Fzc2V0cy9qYXZhc2NyaXB0cy9tYWluLmpzIiwid2VicGFjazovLy8uL2xpYi9hbWJlci9hc3NldHMvanMvYW1iZXIuanMiXSwibmFtZXMiOlsiRGF0ZSIsInByb3RvdHlwZSIsInRvR3Jhbml0ZSIsInBhZCIsIm51bWJlciIsImdldFVUQ0Z1bGxZZWFyIiwiZ2V0VVRDTW9udGgiLCJnZXRVVENEYXRlIiwiZ2V0VVRDSG91cnMiLCJnZXRVVENNaW51dGVzIiwiZ2V0VVRDU2Vjb25kcyIsIiQiLCJkb2N1bWVudCIsInJlYWR5IiwidGFicyIsIkVWRU5UUyIsImpvaW4iLCJsZWF2ZSIsIm1lc3NhZ2UiLCJTVEFMRV9DT05ORUNUSU9OX1RIUkVTSE9MRF9TRUNPTkRTIiwiU09DS0VUX1BPTExJTkdfUkFURSIsIm5vdyIsImdldFRpbWUiLCJzZWNvbmRzU2luY2UiLCJ0aW1lIiwiQ2hhbm5lbCIsInRvcGljIiwic29ja2V0Iiwib25NZXNzYWdlSGFuZGxlcnMiLCJ3cyIsInNlbmQiLCJKU09OIiwic3RyaW5naWZ5IiwiZXZlbnQiLCJtc2ciLCJmb3JFYWNoIiwiaGFuZGxlciIsInN1YmplY3QiLCJjYWxsYmFjayIsInBheWxvYWQiLCJwdXNoIiwiU29ja2V0IiwiZW5kcG9pbnQiLCJjaGFubmVscyIsImxhc3RQaW5nIiwicmVjb25uZWN0VHJpZXMiLCJhdHRlbXB0UmVjb25uZWN0IiwiY2xlYXJUaW1lb3V0IiwicmVjb25uZWN0VGltZW91dCIsInNldFRpbWVvdXQiLCJjb25uZWN0IiwicGFyYW1zIiwiX3JlY29ubmVjdCIsIl9yZWNvbm5lY3RJbnRlcnZhbCIsInBvbGxpbmdUaW1lb3V0IiwiX2Nvbm5lY3Rpb25Jc1N0YWxlIiwiX3BvbGwiLCJfc3RhcnRQb2xsaW5nIiwib3B0cyIsImxvY2F0aW9uIiwid2luZG93IiwiaG9zdG5hbWUiLCJwb3J0IiwicHJvdG9jb2wiLCJPYmplY3QiLCJhc3NpZ24iLCJQcm9taXNlIiwicmVzb2x2ZSIsInJlamVjdCIsIldlYlNvY2tldCIsIm9ubWVzc2FnZSIsImhhbmRsZU1lc3NhZ2UiLCJvbmNsb3NlIiwib25vcGVuIiwiX3Jlc2V0IiwiY2xvc2UiLCJjaGFubmVsIiwiZGF0YSIsIl9oYW5kbGVQaW5nIiwicGFyc2VkX21zZyIsInBhcnNlIiwibW9kdWxlIiwiZXhwb3J0cyIsImFkZEV2ZW50TGlzdGVuZXIiLCJxdWVyeVNlbGVjdG9yQWxsIiwiZWxlbWVudCIsImUiLCJwcmV2ZW50RGVmYXVsdCIsImdldEF0dHJpYnV0ZSIsImNvbmZpcm0iLCJmb3JtIiwiY3JlYXRlRWxlbWVudCIsImlucHV0Iiwic2V0QXR0cmlidXRlIiwiYXBwZW5kQ2hpbGQiLCJib2R5Iiwic3VibWl0Il0sIm1hcHBpbmdzIjoiO0FBQUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQUs7QUFDTDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLG1DQUEyQiwwQkFBMEIsRUFBRTtBQUN2RCx5Q0FBaUMsZUFBZTtBQUNoRDtBQUNBO0FBQ0E7O0FBRUE7QUFDQSw4REFBc0QsK0RBQStEOztBQUVySDtBQUNBOztBQUVBO0FBQ0E7Ozs7Ozs7Ozs7QUM3REE7Ozs7OztBQUVBLElBQUksQ0FBQ0EsS0FBS0MsU0FBTCxDQUFlQyxTQUFwQixFQUErQjtBQUM1QixlQUFXOztBQUVWLGFBQVNDLEdBQVQsQ0FBYUMsTUFBYixFQUFxQjtBQUNuQixVQUFJQSxTQUFTLEVBQWIsRUFBaUI7QUFDZixlQUFPLE1BQU1BLE1BQWI7QUFDRDtBQUNELGFBQU9BLE1BQVA7QUFDRDs7QUFFREos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UUcsWUFBUixDQUFxQixNQUFyQixDQUE1QjtBQUNBRSxhQUFLRyxZQUFMLENBQWtCLFFBQWxCLEVBQTRCLE1BQTVCO0FBQ0FELGNBQU1DLFlBQU4sQ0FBbUIsTUFBbkIsRUFBMkIsUUFBM0I7QUFDQUQsY0FBTUMsWUFBTixDQUFtQixNQUFuQixFQUEyQixTQUEzQjtBQUNBRCxjQUFNQyxZQUFOLENBQW1CLE9BQW5CLEVBQTRCLFFBQTVCO0FBQ0FILGFBQUtJLFdBQUwsQ0FBaUJGLEtBQWpCO0FBQ0FoRixpQkFBU21GLElBQVQsQ0FBY0QsV0FBZCxDQUEwQkosSUFBMUI7QUFDQUEsYUFBS00sTUFBTDtBQUNIO0FBQ0QsYUFBTyxLQUFQO0FBQ0gsS0FoQkQ7QUFpQkgsR0FsQkQ7QUFtQkgsQ0FwQkQsRSIsImZpbGUiOiJtYWluLmJ1bmRsZS5qcyIsInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKSB7XG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG4gXHRcdH1cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGk6IG1vZHVsZUlkLFxuIFx0XHRcdGw6IGZhbHNlLFxuIFx0XHRcdGV4cG9ydHM6IHt9XG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmwgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwge1xuIFx0XHRcdFx0Y29uZmlndXJhYmxlOiBmYWxzZSxcbiBcdFx0XHRcdGVudW1lcmFibGU6IHRydWUsXG4gXHRcdFx0XHRnZXQ6IGdldHRlclxuIFx0XHRcdH0pO1xuIFx0XHR9XG4gXHR9O1xuXG4gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuIFx0XHRyZXR1cm4gZ2V0dGVyO1xuIFx0fTtcblxuIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIi9kaXN0XCI7XG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oX193ZWJwYWNrX3JlcXVpcmVfXy5zID0gMCk7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gd2VicGFjay9ib290c3RyYXAgNzVhNTdkZTc3NDUxN2NkMTlmODkiLCJpbXBvcnQgQW1iZXIgZnJvbSAnYW1iZXInXG5cbmlmICghRGF0ZS5wcm90b3R5cGUudG9HcmFuaXRlKSB7XG4gIChmdW5jdGlvbigpIHtcblxuICAgIGZ1bmN0aW9uIHBhZChudW1iZXIpIHtcbiAgICAgIGlmIChudW1iZXIgPCAxMCkge1xuICAgICAgICByZXR1cm4gJzAnICsgbnVtYmVyO1xuICAgICAgfVxuICAgICAgcmV0dXJuIG51bWJlcjtcbiAgICB9XG5cbiAgICBEYXRlLnByb3RvdHlwZS50b0dyYW5pdGUgPSBmdW5jdGlvbigpIHtcbiAgICAgIHJldHVybiB0aGlzLmdldFVUQ0Z1bGxZZWFyKCkgK1xuICAgICAgICAnLScgKyBwYWQodGhpcy5nZXRVVENNb250aCgpICsgMSkgK1xuICAgICAgICAnLScgKyBwYWQodGhpcy5nZXRVVENEYXRlKCkpICtcbiAgICAgICAgJyAnICsgcGFkKHRoaXMuZ2V0VVRDSG91cnMoKSkgK1xuICAgICAgICAnOicgKyBwYWQodGhpcy5nZXRVVENNaW51dGVzKCkpICtcbiAgICAgICAgJzonICsgcGFkKHRoaXMuZ2V0VVRDU2Vjb25kcygpKSAgO1xuICAgIH07XG5cbiAgfSgpKTtcblxuICAkKGRvY3VtZW50KS5yZWFkeSgoKSA9PiB7XG4gICAgJCgnLnRhYnMnKS50YWJzKCk7XG4gIH0pO1xufVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL2Fzc2V0cy9qYXZhc2NyaXB0cy9tYWluLmpzIiwiY29uc3QgRVZFTlRTID0ge1xuICBqb2luOiAnam9pbicsXG4gIGxlYXZlOiAnbGVhdmUnLFxuICBtZXNzYWdlOiAnbWVzc2FnZSdcbn1cbmNvbnN0IFNUQUxFX0NPTk5FQ1RJT05fVEhSRVNIT0xEX1NFQ09ORFMgPSAxMDBcbmNvbnN0IFNPQ0tFVF9QT0xMSU5HX1JBVEUgPSAxMDAwMFxuXG4vKipcbiAqIFJldHVybnMgYSBudW1lcmljIHZhbHVlIGZvciB0aGUgY3VycmVudCB0aW1lXG4gKi9cbmxldCBub3cgPSAoKSA9PiB7XG4gIHJldHVybiBuZXcgRGF0ZSgpLmdldFRpbWUoKVxufVxuXG4vKipcbiAqIFJldHVybnMgdGhlIGRpZmZlcmVuY2UgYmV0d2VlbiB0aGUgY3VycmVudCB0aW1lIGFuZCBwYXNzZWQgYHRpbWVgIGluIHNlY29uZHNcbiAqIEBwYXJhbSB7TnVtYmVyfERhdGV9IHRpbWUgLSBBIG51bWVyaWMgdGltZSBvciBkYXRlIG9iamVjdFxuICovXG5sZXQgc2Vjb25kc1NpbmNlID0gKHRpbWUpID0+IHtcbiAgcmV0dXJuIChub3coKSAtIHRpbWUpIC8gMTAwMFxufVxuXG4vKipcbiAqIENsYXNzIGZvciBjaGFubmVsIHJlbGF0ZWQgZnVuY3Rpb25zIChqb2luaW5nLCBsZWF2aW5nLCBzdWJzY3JpYmluZyBhbmQgc2VuZGluZyBtZXNzYWdlcylcbiAqL1xuZXhwb3J0IGNsYXNzIENoYW5uZWwge1xuICAvKipcbiAgICogQHBhcmFtIHtTdHJpbmd9IHRvcGljIC0gdG9waWMgdG8gc3Vic2NyaWJlIHRvXG4gICAqIEBwYXJhbSB7U29ja2V0fSBzb2NrZXQgLSBBIFNvY2tldCBpbnN0YW5jZVxuICAgKi9cbiAgY29uc3RydWN0b3IodG9waWMsIHNvY2tldCkge1xuICAgIHRoaXMudG9waWMgPSB0b3BpY1xuICAgIHRoaXMuc29ja2V0ID0gc29ja2V0XG4gICAgdGhpcy5vbk1lc3NhZ2VIYW5kbGVycyA9IFtdXG4gIH1cblxuICAvKipcbiAgICogSm9pbiBhIGNoYW5uZWwsIHN1YnNjcmliZSB0byBhbGwgY2hhbm5lbHMgbWVzc2FnZXNcbiAgICovXG4gIGpvaW4oKSB7XG4gICAgdGhpcy5zb2NrZXQud3Muc2VuZChKU09OLnN0cmluZ2lmeSh7IGV2ZW50OiBFVkVOVFMuam9pbiwgdG9waWM6IHRoaXMudG9waWMgfSkpXG4gIH1cblxuICAvKipcbiAgICogTGVhdmUgYSBjaGFubmVsLCBzdG9wIHN1YnNjcmliaW5nIHRvIGNoYW5uZWwgbWVzc2FnZXNcbiAgICovXG4gIGxlYXZlKCkge1xuICAgIHRoaXMuc29ja2V0LndzLnNlbmQoSlNPTi5zdHJpbmdpZnkoeyBldmVudDogRVZFTlRTLmxlYXZlLCB0b3BpYzogdGhpcy50b3BpYyB9KSlcbiAgfVxuXG4gIC8qKlxuICAgKiBDYWxscyBhbGwgbWVzc2FnZSBoYW5kbGVycyB3aXRoIGEgbWF0Y2hpbmcgc3ViamVjdFxuICAgKi9cbiAgaGFuZGxlTWVzc2FnZShtc2cpIHtcbiAgICB0aGlzLm9uTWVzc2FnZUhhbmRsZXJzLmZvckVhY2goKGhhbmRsZXIpID0+IHtcbiAgICAgIGlmIChoYW5kbGVyLnN1YmplY3QgPT09IG1zZy5zdWJqZWN0KSBoYW5kbGVyLmNhbGxiYWNrKG1zZy5wYXlsb2FkKVxuICAgIH0pXG4gIH1cblxuICAvKipcbiAgICogU3Vic2NyaWJlIHRvIGEgY2hhbm5lbCBzdWJqZWN0XG4gICAqIEBwYXJhbSB7U3RyaW5nfSBzdWJqZWN0IC0gc3ViamVjdCB0byBsaXN0ZW4gZm9yOiBgbXNnOm5ld2BcbiAgICogQHBhcmFtIHtmdW5jdGlvbn0gY2FsbGJhY2sgLSBjYWxsYmFjayBmdW5jdGlvbiB3aGVuIGEgbmV3IG1lc3NhZ2UgYXJyaXZlc1xuICAgKi9cbiAgb24oc3ViamVjdCwgY2FsbGJhY2spIHtcbiAgICB0aGlzLm9uTWVzc2FnZUhhbmRsZXJzLnB1c2goeyBzdWJqZWN0OiBzdWJqZWN0LCBjYWxsYmFjazogY2FsbGJhY2sgfSlcbiAgfVxuXG4gIC8qKlxuICAgKiBTZW5kIGEgbmV3IG1lc3NhZ2UgdG8gdGhlIGNoYW5uZWxcbiAgICogQHBhcmFtIHtTdHJpbmd9IHN1YmplY3QgLSBzdWJqZWN0IHRvIHNlbmQgbWVzc2FnZSB0bzogYG1zZzpuZXdgXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBwYXlsb2FkIC0gcGF5bG9hZCBvYmplY3Q6IGB7bWVzc2FnZTogJ2hlbGxvJ31gXG4gICAqL1xuICBwdXNoKHN1YmplY3QsIHBheWxvYWQpIHtcbiAgICB0aGlzLnNvY2tldC53cy5zZW5kKEpTT04uc3RyaW5naWZ5KHsgZXZlbnQ6IEVWRU5UUy5tZXNzYWdlLCB0b3BpYzogdGhpcy50b3BpYywgc3ViamVjdDogc3ViamVjdCwgcGF5bG9hZDogcGF5bG9hZCB9KSlcbiAgfVxufVxuXG4vKipcbiAqIENsYXNzIGZvciBtYWludGFpbmluZyBjb25uZWN0aW9uIHdpdGggc2VydmVyIGFuZCBtYWludGFpbmluZyBjaGFubmVscyBsaXN0XG4gKi9cbmV4cG9ydCBjbGFzcyBTb2NrZXQge1xuICAvKipcbiAgICogQHBhcmFtIHtTdHJpbmd9IGVuZHBvaW50IC0gV2Vic29ja2V0IGVuZHBvbnQgdXNlZCBpbiByb3V0ZXMuY3IgZmlsZVxuICAgKi9cbiAgY29uc3RydWN0b3IoZW5kcG9pbnQpIHtcbiAgICB0aGlzLmVuZHBvaW50ID0gZW5kcG9pbnRcbiAgICB0aGlzLndzID0gbnVsbFxuICAgIHRoaXMuY2hhbm5lbHMgPSBbXVxuICAgIHRoaXMubGFzdFBpbmcgPSBub3coKVxuICAgIHRoaXMucmVjb25uZWN0VHJpZXMgPSAwXG4gICAgdGhpcy5hdHRlbXB0UmVjb25uZWN0ID0gdHJ1ZVxuICB9XG5cbiAgLyoqXG4gICAqIFJldHVybnMgd2hldGhlciBvciBub3QgdGhlIGxhc3QgcmVjZWl2ZWQgcGluZyBoYXMgYmVlbiBwYXN0IHRoZSB0aHJlc2hvbGRcbiAgICovXG4gIF9jb25uZWN0aW9uSXNTdGFsZSgpIHtcbiAgICByZXR1cm4gc2Vjb25kc1NpbmNlKHRoaXMubGFzdFBpbmcpID4gU1RBTEVfQ09OTkVDVElPTl9USFJFU0hPTERfU0VDT05EU1xuICB9XG5cbiAgLyoqXG4gICAqIFRyaWVzIHRvIHJlY29ubmVjdCB0byB0aGUgd2Vic29ja2V0IHNlcnZlciB1c2luZyBhIHJlY3Vyc2l2ZSB0aW1lb3V0XG4gICAqL1xuICBfcmVjb25uZWN0KCkge1xuICAgIGNsZWFyVGltZW91dCh0aGlzLnJlY29ubmVjdFRpbWVvdXQpXG4gICAgdGhpcy5yZWNvbm5lY3RUaW1lb3V0ID0gc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICB0aGlzLnJlY29ubmVjdFRyaWVzKytcbiAgICAgIHRoaXMuY29ubmVjdCh0aGlzLnBhcmFtcylcbiAgICAgIHRoaXMuX3JlY29ubmVjdCgpXG4gICAgfSwgdGhpcy5fcmVjb25uZWN0SW50ZXJ2YWwoKSlcbiAgfVxuXG4gIC8qKlxuICAgKiBSZXR1cm5zIGFuIGluY3JlbWVudGluZyB0aW1lb3V0IGludGVydmFsIGJhc2VkIGFyb3VuZCB0aGUgbnVtYmVyIG9mIHJlY29ubmVjdGlvbiByZXRyaWVzXG4gICAqL1xuICBfcmVjb25uZWN0SW50ZXJ2YWwoKSB7XG4gICAgcmV0dXJuIFsxMDAwLCAyMDAwLCA1MDAwLCAxMDAwMF1bdGhpcy5yZWNvbm5lY3RUcmllc10gfHwgMTAwMDBcbiAgfVxuXG4gIC8qKlxuICAgKiBTZXRzIGEgcmVjdXJzaXZlIHRpbWVvdXQgdG8gY2hlY2sgaWYgdGhlIGNvbm5lY3Rpb24gaXMgc3RhbGVcbiAgICovXG4gIF9wb2xsKCkge1xuICAgIHRoaXMucG9sbGluZ1RpbWVvdXQgPSBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgIGlmICh0aGlzLl9jb25uZWN0aW9uSXNTdGFsZSgpKSB7XG4gICAgICAgIHRoaXMuX3JlY29ubmVjdCgpXG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aGlzLl9wb2xsKClcbiAgICAgIH1cbiAgICB9LCBTT0NLRVRfUE9MTElOR19SQVRFKVxuICB9XG5cbiAgLyoqXG4gICAqIENsZWFyIHBvbGxpbmcgdGltZW91dCBhbmQgc3RhcnQgcG9sbGluZ1xuICAgKi9cbiAgX3N0YXJ0UG9sbGluZygpIHtcbiAgICBjbGVhclRpbWVvdXQodGhpcy5wb2xsaW5nVGltZW91dClcbiAgICB0aGlzLl9wb2xsKClcbiAgfVxuXG4gIC8qKlxuICAgKiBTZXRzIGBsYXN0UGluZ2AgdG8gdGhlIGN1cmVudCB0aW1lXG4gICAqL1xuICBfaGFuZGxlUGluZygpIHtcbiAgICB0aGlzLmxhc3RQaW5nID0gbm93KClcbiAgfVxuXG4gIC8qKlxuICAgKiBDbGVhcnMgcmVjb25uZWN0IHRpbWVvdXQsIHJlc2V0cyB2YXJpYWJsZXMgYW4gc3RhcnRzIHBvbGxpbmdcbiAgICovXG4gIF9yZXNldCgpIHtcbiAgICBjbGVhclRpbWVvdXQodGhpcy5yZWNvbm5lY3RUaW1lb3V0KVxuICAgIHRoaXMucmVjb25uZWN0VHJpZXMgPSAwXG4gICAgdGhpcy5hdHRlbXB0UmVjb25uZWN0ID0gdHJ1ZVxuICAgIHRoaXMuX3N0YXJ0UG9sbGluZygpXG4gIH1cblxuICAvKipcbiAgICogQ29ubmVjdCB0aGUgc29ja2V0IHRvIHRoZSBzZXJ2ZXIsIGFuZCBiaW5kcyB0byBuYXRpdmUgd3MgZnVuY3Rpb25zXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBwYXJhbXMgLSBPcHRpb25hbCBwYXJhbWV0ZXJzXG4gICAqIEBwYXJhbSB7U3RyaW5nfSBwYXJhbXMubG9jYXRpb24gLSBIb3N0bmFtZSB0byBjb25uZWN0IHRvLCBkZWZhdWx0cyB0byBgd2luZG93LmxvY2F0aW9uLmhvc3RuYW1lYFxuICAgKiBAcGFyYW0ge1N0cmluZ30gcGFybWFzLnBvcnQgLSBQb3J0IHRvIGNvbm5lY3QgdG8sIGRlZmF1bHRzIHRvIGB3aW5kb3cubG9jYXRpb24ucG9ydGBcbiAgICogQHBhcmFtIHtTdHJpbmd9IHBhcmFtcy5wcm90b2NvbCAtIFByb3RvY29sIHRvIHVzZSwgZWl0aGVyICd3c3MnIG9yICd3cydcbiAgICovXG4gIGNvbm5lY3QocGFyYW1zKSB7XG4gICAgdGhpcy5wYXJhbXMgPSBwYXJhbXNcblxuICAgIGxldCBvcHRzID0ge1xuICAgICAgbG9jYXRpb246IHdpbmRvdy5sb2NhdGlvbi5ob3N0bmFtZSxcbiAgICAgIHBvcnQ6IHdpbmRvdy5sb2NhdGlvbi5wb3J0LFxuICAgICAgcHJvdG9jb2w6IHdpbmRvdy5sb2NhdGlvbi5wcm90b2NvbCA9PT0gJ2h0dHBzOicgPyAnd3NzOicgOiAnd3M6JyxcbiAgICB9XG5cbiAgICBpZiAocGFyYW1zKSBPYmplY3QuYXNzaWduKG9wdHMsIHBhcmFtcylcbiAgICBpZiAob3B0cy5wb3J0KSBvcHRzLmxvY2F0aW9uICs9IGA6JHtvcHRzLnBvcnR9YFxuXG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgIHRoaXMud3MgPSBuZXcgV2ViU29ja2V0KGAke29wdHMucHJvdG9jb2x9Ly8ke29wdHMubG9jYXRpb259JHt0aGlzLmVuZHBvaW50fWApXG4gICAgICB0aGlzLndzLm9ubWVzc2FnZSA9IChtc2cpID0+IHsgdGhpcy5oYW5kbGVNZXNzYWdlKG1zZykgfVxuICAgICAgdGhpcy53cy5vbmNsb3NlID0gKCkgPT4ge1xuICAgICAgICBpZiAodGhpcy5hdHRlbXB0UmVjb25uZWN0KSB0aGlzLl9yZWNvbm5lY3QoKVxuICAgICAgfVxuICAgICAgdGhpcy53cy5vbm9wZW4gPSAoKSA9PiB7XG4gICAgICAgIHRoaXMuX3Jlc2V0KClcbiAgICAgICAgcmVzb2x2ZSgpXG4gICAgICB9XG4gICAgfSlcbiAgfVxuXG4gIC8qKlxuICAgKiBDbG9zZXMgdGhlIHNvY2tldCBjb25uZWN0aW9uIHBlcm1hbmVudGx5XG4gICAqL1xuICBkaXNjb25uZWN0KCkge1xuICAgIHRoaXMuYXR0ZW1wdFJlY29ubmVjdCA9IGZhbHNlXG4gICAgY2xlYXJUaW1lb3V0KHRoaXMucG9sbGluZ1RpbWVvdXQpXG4gICAgY2xlYXJUaW1lb3V0KHRoaXMucmVjb25uZWN0VGltZW91dClcbiAgICB0aGlzLndzLmNsb3NlKClcbiAgfVxuXG4gIC8qKlxuICAgKiBBZGRzIGEgbmV3IGNoYW5uZWwgdG8gdGhlIHNvY2tldCBjaGFubmVscyBsaXN0XG4gICAqIEBwYXJhbSB7U3RyaW5nfSB0b3BpYyAtIFRvcGljIGZvciB0aGUgY2hhbm5lbDogYGNoYXRfcm9vbToxMjNgXG4gICAqL1xuICBjaGFubmVsKHRvcGljKSB7XG4gICAgbGV0IGNoYW5uZWwgPSBuZXcgQ2hhbm5lbCh0b3BpYywgdGhpcylcbiAgICB0aGlzLmNoYW5uZWxzLnB1c2goY2hhbm5lbClcbiAgICByZXR1cm4gY2hhbm5lbFxuICB9XG5cbiAgLyoqXG4gICAqIE1lc3NhZ2UgaGFuZGxlciBmb3IgbWVzc2FnZXMgcmVjZWl2ZWRcbiAgICogQHBhcmFtIHtNZXNzYWdlRXZlbnR9IG1zZyAtIE1lc3NhZ2UgcmVjZWl2ZWQgZnJvbSB3c1xuICAgKi9cbiAgaGFuZGxlTWVzc2FnZShtc2cpIHtcbiAgICBpZiAobXNnLmRhdGEgPT09IFwicGluZ1wiKSByZXR1cm4gdGhpcy5faGFuZGxlUGluZygpXG5cbiAgICBsZXQgcGFyc2VkX21zZyA9IEpTT04ucGFyc2UobXNnLmRhdGEpXG4gICAgdGhpcy5jaGFubmVscy5mb3JFYWNoKChjaGFubmVsKSA9PiB7XG4gICAgICBpZiAoY2hhbm5lbC50b3BpYyA9PT0gcGFyc2VkX21zZy50b3BpYykgY2hhbm5lbC5oYW5kbGVNZXNzYWdlKHBhcnNlZF9tc2cpXG4gICAgfSlcbiAgfVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgU29ja2V0OiBTb2NrZXRcbn1cblxuXG4vKipcbiAqIEFsbG93cyBkZWxldGUgbGlua3MgdG8gcG9zdCBmb3Igc2VjdXJpdHkgYW5kIGVhc2Ugb2YgdXNlIHNpbWlsYXIgdG8gUmFpbHMganF1ZXJ5X3Vqc1xuICovXG5kb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKFwiRE9NQ29udGVudExvYWRlZFwiLCBmdW5jdGlvbiAoKSB7XG4gICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcImFbZGF0YS1tZXRob2Q9J2RlbGV0ZSddXCIpLmZvckVhY2goZnVuY3Rpb24gKGVsZW1lbnQpIHtcbiAgICAgICAgZWxlbWVudC5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgZnVuY3Rpb24gKGUpIHtcbiAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgIHZhciBtZXNzYWdlID0gZWxlbWVudC5nZXRBdHRyaWJ1dGUoXCJkYXRhLWNvbmZpcm1cIikgfHwgXCJBcmUgeW91IHN1cmU/XCI7XG4gICAgICAgICAgICBpZiAoY29uZmlybShtZXNzYWdlKSkge1xuICAgICAgICAgICAgICAgIHZhciBmb3JtID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImZvcm1cIik7XG4gICAgICAgICAgICAgICAgdmFyIGlucHV0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImlucHV0XCIpO1xuICAgICAgICAgICAgICAgIGZvcm0uc2V0QXR0cmlidXRlKFwiYWN0aW9uXCIsIGVsZW1lbnQuZ2V0QXR0cmlidXRlKFwiaHJlZlwiKSk7XG4gICAgICAgICAgICAgICAgZm9ybS5zZXRBdHRyaWJ1dGUoXCJtZXRob2RcIiwgXCJQT1NUXCIpO1xuICAgICAgICAgICAgICAgIGlucHV0LnNldEF0dHJpYnV0ZShcInR5cGVcIiwgXCJoaWRkZW5cIik7XG4gICAgICAgICAgICAgICAgaW5wdXQuc2V0QXR0cmlidXRlKFwibmFtZVwiLCBcIl9tZXRob2RcIik7XG4gICAgICAgICAgICAgICAgaW5wdXQuc2V0QXR0cmlidXRlKFwidmFsdWVcIiwgXCJERUxFVEVcIik7XG4gICAgICAgICAgICAgICAgZm9ybS5hcHBlbmRDaGlsZChpbnB1dCk7XG4gICAgICAgICAgICAgICAgZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZChmb3JtKTtcbiAgICAgICAgICAgICAgICBmb3JtLnN1Ym1pdCgpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9KVxuICAgIH0pXG59KTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2xpYi9hbWJlci9hc3NldHMvanMvYW1iZXIuanMiXSwic291cmNlUm9vdCI6IiJ9