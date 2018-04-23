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

document.addEventListener('DOMContentLoaded', init, false);

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
}

function init() {
  // Initialise the materialize stuff that needs to be initialised
  // Get all tab elements on the page and initialise them
  document.querySelectorAll('.tabs').forEach(function (e) {
    M.Tabs.init(e);
  });
  // Initialise the sidenav
  M.Sidenav.init(document.querySelector('.sidenav'));
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgYmYxZGNkYjI2NGZlMGE2MTAxOTIiLCJ3ZWJwYWNrOi8vLy4vc3JjL2Fzc2V0cy9qYXZhc2NyaXB0cy9tYWluLmpzIiwid2VicGFjazovLy8uL2xpYi9hbWJlci9hc3NldHMvanMvYW1iZXIuanMiXSwibmFtZXMiOlsiZG9jdW1lbnQiLCJhZGRFdmVudExpc3RlbmVyIiwiaW5pdCIsIkRhdGUiLCJwcm90b3R5cGUiLCJ0b0dyYW5pdGUiLCJwYWQiLCJudW1iZXIiLCJnZXRVVENGdWxsWWVhciIsImdldFVUQ01vbnRoIiwiZ2V0VVRDRGF0ZSIsImdldFVUQ0hvdXJzIiwiZ2V0VVRDTWludXRlcyIsImdldFVUQ1NlY29uZHMiLCJxdWVyeVNlbGVjdG9yQWxsIiwiZm9yRWFjaCIsIk0iLCJUYWJzIiwiZSIsIlNpZGVuYXYiLCJxdWVyeVNlbGVjdG9yIiwiRVZFTlRTIiwiam9pbiIsImxlYXZlIiwibWVzc2FnZSIsIlNUQUxFX0NPTk5FQ1RJT05fVEhSRVNIT0xEX1NFQ09ORFMiLCJTT0NLRVRfUE9MTElOR19SQVRFIiwibm93IiwiZ2V0VGltZSIsInNlY29uZHNTaW5jZSIsInRpbWUiLCJDaGFubmVsIiwidG9waWMiLCJzb2NrZXQiLCJvbk1lc3NhZ2VIYW5kbGVycyIsIndzIiwic2VuZCIsIkpTT04iLCJzdHJpbmdpZnkiLCJldmVudCIsIm1zZyIsImhhbmRsZXIiLCJzdWJqZWN0IiwiY2FsbGJhY2siLCJwYXlsb2FkIiwicHVzaCIsIlNvY2tldCIsImVuZHBvaW50IiwiY2hhbm5lbHMiLCJsYXN0UGluZyIsInJlY29ubmVjdFRyaWVzIiwiYXR0ZW1wdFJlY29ubmVjdCIsImNsZWFyVGltZW91dCIsInJlY29ubmVjdFRpbWVvdXQiLCJzZXRUaW1lb3V0IiwiY29ubmVjdCIsInBhcmFtcyIsIl9yZWNvbm5lY3QiLCJfcmVjb25uZWN0SW50ZXJ2YWwiLCJwb2xsaW5nVGltZW91dCIsIl9jb25uZWN0aW9uSXNTdGFsZSIsIl9wb2xsIiwiX3N0YXJ0UG9sbGluZyIsIm9wdHMiLCJsb2NhdGlvbiIsIndpbmRvdyIsImhvc3RuYW1lIiwicG9ydCIsInByb3RvY29sIiwiT2JqZWN0IiwiYXNzaWduIiwiUHJvbWlzZSIsInJlc29sdmUiLCJyZWplY3QiLCJXZWJTb2NrZXQiLCJvbm1lc3NhZ2UiLCJoYW5kbGVNZXNzYWdlIiwib25jbG9zZSIsIm9ub3BlbiIsIl9yZXNldCIsImNsb3NlIiwiY2hhbm5lbCIsImRhdGEiLCJfaGFuZGxlUGluZyIsInBhcnNlZF9tc2ciLCJwYXJzZSIsIm1vZHVsZSIsImV4cG9ydHMiLCJlbGVtZW50IiwicHJldmVudERlZmF1bHQiLCJnZXRBdHRyaWJ1dGUiLCJjb25maXJtIiwiZm9ybSIsImNyZWF0ZUVsZW1lbnQiLCJpbnB1dCIsInNldEF0dHJpYnV0ZSIsImFwcGVuZENoaWxkIiwiYm9keSIsInN1Ym1pdCJdLCJtYXBwaW5ncyI6IjtBQUFBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOzs7QUFHQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFLO0FBQ0w7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxtQ0FBMkIsMEJBQTBCLEVBQUU7QUFDdkQseUNBQWlDLGVBQWU7QUFDaEQ7QUFDQTtBQUNBOztBQUVBO0FBQ0EsOERBQXNELCtEQUErRDs7QUFFckg7QUFDQTs7QUFFQTtBQUNBOzs7Ozs7Ozs7O0FDN0RBOzs7Ozs7QUFFQUEsU0FBU0MsZ0JBQVQsQ0FBMEIsa0JBQTFCLEVBQThDQyxJQUE5QyxFQUFvRCxLQUFwRDs7QUFFQSxJQUFJLENBQUNDLEtBQUtDLFNBQUwsQ0FBZUMsU0FBcEIsRUFBK0I7QUFDNUIsZUFBVzs7QUFFVixhQUFTQyxHQUFULENBQWFDLE1BQWIsRUFBcUI7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VUFBSWpFLFVBQVVnRSxRQUFRRSxZQUFSLENBQXFCLGNBQXJCLEtBQXdDLGVBQXREO0FBQ0EsVUFBSUMsUUFBUW5FLE9BQVIsQ0FBSixFQUFzQjtBQUNsQixZQUFJb0UsT0FBTzVGLFNBQVM2RixhQUFULENBQXVCLE1BQXZCLENBQVg7QUFDQSxZQUFJQyxRQUFROUYsU0FBUzZGLGFBQVQsQ0FBdUIsT0FBdkIsQ0FBWjtBQUNBRCxhQUFLRyxZQUFMLENBQWtCLFFBQWxCLEVBQTRCUCxRQUFRRSxZQUFSLENBQXFCLE1BQXJCLENBQTVCO0FBQ0FFLGFBQUtHLFlBQUwsQ0FBa0IsUUFBbEIsRUFBNEIsTUFBNUI7QUFDQUQsY0FBTUMsWUFBTixDQUFtQixNQUFuQixFQUEyQixRQUEzQjtBQUNBRCxjQUFNQyxZQUFOLENBQW1CLE1BQW5CLEVBQTJCLFNBQTNCO0FBQ0FELGNBQU1DLFlBQU4sQ0FBbUIsT0FBbkIsRUFBNEIsUUFBNUI7QUFDQUgsYUFBS0ksV0FBTCxDQUFpQkYsS0FBakI7QUFDQTlGLGlCQUFTaUcsSUFBVCxDQUFjRCxXQUFkLENBQTBCSixJQUExQjtBQUNBQSxhQUFLTSxNQUFMO0FBQ0g7QUFDRCxhQUFPLEtBQVA7QUFDSCxLQWhCRDtBQWlCSCxHQWxCRDtBQW1CSCxDQXBCRCxFIiwiZmlsZSI6Im1haW4uYnVuZGxlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcbiBcdFx0fVxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0aTogbW9kdWxlSWQsXG4gXHRcdFx0bDogZmFsc2UsXG4gXHRcdFx0ZXhwb3J0czoge31cbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gZGVmaW5lIGdldHRlciBmdW5jdGlvbiBmb3IgaGFybW9ueSBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBuYW1lLCBnZXR0ZXIpIHtcbiBcdFx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBuYW1lKSkge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBuYW1lLCB7XG4gXHRcdFx0XHRjb25maWd1cmFibGU6IGZhbHNlLFxuIFx0XHRcdFx0ZW51bWVyYWJsZTogdHJ1ZSxcbiBcdFx0XHRcdGdldDogZ2V0dGVyXG4gXHRcdFx0fSk7XG4gXHRcdH1cbiBcdH07XG5cbiBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbiBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4gXHRcdHJldHVybiBnZXR0ZXI7XG4gXHR9O1xuXG4gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiL2Rpc3RcIjtcblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSAwKTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyB3ZWJwYWNrL2Jvb3RzdHJhcCBiZjFkY2RiMjY0ZmUwYTYxMDE5MiIsImltcG9ydCBBbWJlciBmcm9tICdhbWJlcidcblxuZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignRE9NQ29udGVudExvYWRlZCcsIGluaXQsIGZhbHNlKTtcblxuaWYgKCFEYXRlLnByb3RvdHlwZS50b0dyYW5pdGUpIHtcbiAgKGZ1bmN0aW9uKCkge1xuXG4gICAgZnVuY3Rpb24gcGFkKG51bWJlcikge1xuICAgICAgaWYgKG51bWJlciA8IDEwKSB7XG4gICAgICAgIHJldHVybiAnMCcgKyBudW1iZXI7XG4gICAgICB9XG4gICAgICByZXR1cm4gbnVtYmVyO1xuICAgIH1cblxuICAgIERhdGUucHJvdG90eXBlLnRvR3Jhbml0ZSA9IGZ1bmN0aW9uKCkge1xuICAgICAgcmV0dXJuIHRoaXMuZ2V0VVRDRnVsbFllYXIoKSArXG4gICAgICAgICctJyArIHBhZCh0aGlzLmdldFVUQ01vbnRoKCkgKyAxKSArXG4gICAgICAgICctJyArIHBhZCh0aGlzLmdldFVUQ0RhdGUoKSkgK1xuICAgICAgICAnICcgKyBwYWQodGhpcy5nZXRVVENIb3VycygpKSArXG4gICAgICAgICc6JyArIHBhZCh0aGlzLmdldFVUQ01pbnV0ZXMoKSkgK1xuICAgICAgICAnOicgKyBwYWQodGhpcy5nZXRVVENTZWNvbmRzKCkpICA7XG4gICAgfTtcblxuICB9KCkpO1xufVxuXG5mdW5jdGlvbiBpbml0KCkge1xuICAgIC8vIEluaXRpYWxpc2UgdGhlIG1hdGVyaWFsaXplIHN0dWZmIHRoYXQgbmVlZHMgdG8gYmUgaW5pdGlhbGlzZWRcbiAgICAvLyBHZXQgYWxsIHRhYiBlbGVtZW50cyBvbiB0aGUgcGFnZSBhbmQgaW5pdGlhbGlzZSB0aGVtXG4gICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLnRhYnMnKS5mb3JFYWNoKGUgPT4ge1xuICAgICAgICBNLlRhYnMuaW5pdChlKTtcbiAgICB9KVxuICAgIC8vIEluaXRpYWxpc2UgdGhlIHNpZGVuYXZcbiAgICBNLlNpZGVuYXYuaW5pdChkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuc2lkZW5hdicpKTtcbn1cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9hc3NldHMvamF2YXNjcmlwdHMvbWFpbi5qcyIsImNvbnN0IEVWRU5UUyA9IHtcbiAgam9pbjogJ2pvaW4nLFxuICBsZWF2ZTogJ2xlYXZlJyxcbiAgbWVzc2FnZTogJ21lc3NhZ2UnXG59XG5jb25zdCBTVEFMRV9DT05ORUNUSU9OX1RIUkVTSE9MRF9TRUNPTkRTID0gMTAwXG5jb25zdCBTT0NLRVRfUE9MTElOR19SQVRFID0gMTAwMDBcblxuLyoqXG4gKiBSZXR1cm5zIGEgbnVtZXJpYyB2YWx1ZSBmb3IgdGhlIGN1cnJlbnQgdGltZVxuICovXG5sZXQgbm93ID0gKCkgPT4ge1xuICByZXR1cm4gbmV3IERhdGUoKS5nZXRUaW1lKClcbn1cblxuLyoqXG4gKiBSZXR1cm5zIHRoZSBkaWZmZXJlbmNlIGJldHdlZW4gdGhlIGN1cnJlbnQgdGltZSBhbmQgcGFzc2VkIGB0aW1lYCBpbiBzZWNvbmRzXG4gKiBAcGFyYW0ge051bWJlcnxEYXRlfSB0aW1lIC0gQSBudW1lcmljIHRpbWUgb3IgZGF0ZSBvYmplY3RcbiAqL1xubGV0IHNlY29uZHNTaW5jZSA9ICh0aW1lKSA9PiB7XG4gIHJldHVybiAobm93KCkgLSB0aW1lKSAvIDEwMDBcbn1cblxuLyoqXG4gKiBDbGFzcyBmb3IgY2hhbm5lbCByZWxhdGVkIGZ1bmN0aW9ucyAoam9pbmluZywgbGVhdmluZywgc3Vic2NyaWJpbmcgYW5kIHNlbmRpbmcgbWVzc2FnZXMpXG4gKi9cbmV4cG9ydCBjbGFzcyBDaGFubmVsIHtcbiAgLyoqXG4gICAqIEBwYXJhbSB7U3RyaW5nfSB0b3BpYyAtIHRvcGljIHRvIHN1YnNjcmliZSB0b1xuICAgKiBAcGFyYW0ge1NvY2tldH0gc29ja2V0IC0gQSBTb2NrZXQgaW5zdGFuY2VcbiAgICovXG4gIGNvbnN0cnVjdG9yKHRvcGljLCBzb2NrZXQpIHtcbiAgICB0aGlzLnRvcGljID0gdG9waWNcbiAgICB0aGlzLnNvY2tldCA9IHNvY2tldFxuICAgIHRoaXMub25NZXNzYWdlSGFuZGxlcnMgPSBbXVxuICB9XG5cbiAgLyoqXG4gICAqIEpvaW4gYSBjaGFubmVsLCBzdWJzY3JpYmUgdG8gYWxsIGNoYW5uZWxzIG1lc3NhZ2VzXG4gICAqL1xuICBqb2luKCkge1xuICAgIHRoaXMuc29ja2V0LndzLnNlbmQoSlNPTi5zdHJpbmdpZnkoeyBldmVudDogRVZFTlRTLmpvaW4sIHRvcGljOiB0aGlzLnRvcGljIH0pKVxuICB9XG5cbiAgLyoqXG4gICAqIExlYXZlIGEgY2hhbm5lbCwgc3RvcCBzdWJzY3JpYmluZyB0byBjaGFubmVsIG1lc3NhZ2VzXG4gICAqL1xuICBsZWF2ZSgpIHtcbiAgICB0aGlzLnNvY2tldC53cy5zZW5kKEpTT04uc3RyaW5naWZ5KHsgZXZlbnQ6IEVWRU5UUy5sZWF2ZSwgdG9waWM6IHRoaXMudG9waWMgfSkpXG4gIH1cblxuICAvKipcbiAgICogQ2FsbHMgYWxsIG1lc3NhZ2UgaGFuZGxlcnMgd2l0aCBhIG1hdGNoaW5nIHN1YmplY3RcbiAgICovXG4gIGhhbmRsZU1lc3NhZ2UobXNnKSB7XG4gICAgdGhpcy5vbk1lc3NhZ2VIYW5kbGVycy5mb3JFYWNoKChoYW5kbGVyKSA9PiB7XG4gICAgICBpZiAoaGFuZGxlci5zdWJqZWN0ID09PSBtc2cuc3ViamVjdCkgaGFuZGxlci5jYWxsYmFjayhtc2cucGF5bG9hZClcbiAgICB9KVxuICB9XG5cbiAgLyoqXG4gICAqIFN1YnNjcmliZSB0byBhIGNoYW5uZWwgc3ViamVjdFxuICAgKiBAcGFyYW0ge1N0cmluZ30gc3ViamVjdCAtIHN1YmplY3QgdG8gbGlzdGVuIGZvcjogYG1zZzpuZXdgXG4gICAqIEBwYXJhbSB7ZnVuY3Rpb259IGNhbGxiYWNrIC0gY2FsbGJhY2sgZnVuY3Rpb24gd2hlbiBhIG5ldyBtZXNzYWdlIGFycml2ZXNcbiAgICovXG4gIG9uKHN1YmplY3QsIGNhbGxiYWNrKSB7XG4gICAgdGhpcy5vbk1lc3NhZ2VIYW5kbGVycy5wdXNoKHsgc3ViamVjdDogc3ViamVjdCwgY2FsbGJhY2s6IGNhbGxiYWNrIH0pXG4gIH1cblxuICAvKipcbiAgICogU2VuZCBhIG5ldyBtZXNzYWdlIHRvIHRoZSBjaGFubmVsXG4gICAqIEBwYXJhbSB7U3RyaW5nfSBzdWJqZWN0IC0gc3ViamVjdCB0byBzZW5kIG1lc3NhZ2UgdG86IGBtc2c6bmV3YFxuICAgKiBAcGFyYW0ge09iamVjdH0gcGF5bG9hZCAtIHBheWxvYWQgb2JqZWN0OiBge21lc3NhZ2U6ICdoZWxsbyd9YFxuICAgKi9cbiAgcHVzaChzdWJqZWN0LCBwYXlsb2FkKSB7XG4gICAgdGhpcy5zb2NrZXQud3Muc2VuZChKU09OLnN0cmluZ2lmeSh7IGV2ZW50OiBFVkVOVFMubWVzc2FnZSwgdG9waWM6IHRoaXMudG9waWMsIHN1YmplY3Q6IHN1YmplY3QsIHBheWxvYWQ6IHBheWxvYWQgfSkpXG4gIH1cbn1cblxuLyoqXG4gKiBDbGFzcyBmb3IgbWFpbnRhaW5pbmcgY29ubmVjdGlvbiB3aXRoIHNlcnZlciBhbmQgbWFpbnRhaW5pbmcgY2hhbm5lbHMgbGlzdFxuICovXG5leHBvcnQgY2xhc3MgU29ja2V0IHtcbiAgLyoqXG4gICAqIEBwYXJhbSB7U3RyaW5nfSBlbmRwb2ludCAtIFdlYnNvY2tldCBlbmRwb250IHVzZWQgaW4gcm91dGVzLmNyIGZpbGVcbiAgICovXG4gIGNvbnN0cnVjdG9yKGVuZHBvaW50KSB7XG4gICAgdGhpcy5lbmRwb2ludCA9IGVuZHBvaW50XG4gICAgdGhpcy53cyA9IG51bGxcbiAgICB0aGlzLmNoYW5uZWxzID0gW11cbiAgICB0aGlzLmxhc3RQaW5nID0gbm93KClcbiAgICB0aGlzLnJlY29ubmVjdFRyaWVzID0gMFxuICAgIHRoaXMuYXR0ZW1wdFJlY29ubmVjdCA9IHRydWVcbiAgfVxuXG4gIC8qKlxuICAgKiBSZXR1cm5zIHdoZXRoZXIgb3Igbm90IHRoZSBsYXN0IHJlY2VpdmVkIHBpbmcgaGFzIGJlZW4gcGFzdCB0aGUgdGhyZXNob2xkXG4gICAqL1xuICBfY29ubmVjdGlvbklzU3RhbGUoKSB7XG4gICAgcmV0dXJuIHNlY29uZHNTaW5jZSh0aGlzLmxhc3RQaW5nKSA+IFNUQUxFX0NPTk5FQ1RJT05fVEhSRVNIT0xEX1NFQ09ORFNcbiAgfVxuXG4gIC8qKlxuICAgKiBUcmllcyB0byByZWNvbm5lY3QgdG8gdGhlIHdlYnNvY2tldCBzZXJ2ZXIgdXNpbmcgYSByZWN1cnNpdmUgdGltZW91dFxuICAgKi9cbiAgX3JlY29ubmVjdCgpIHtcbiAgICBjbGVhclRpbWVvdXQodGhpcy5yZWNvbm5lY3RUaW1lb3V0KVxuICAgIHRoaXMucmVjb25uZWN0VGltZW91dCA9IHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgdGhpcy5yZWNvbm5lY3RUcmllcysrXG4gICAgICB0aGlzLmNvbm5lY3QodGhpcy5wYXJhbXMpXG4gICAgICB0aGlzLl9yZWNvbm5lY3QoKVxuICAgIH0sIHRoaXMuX3JlY29ubmVjdEludGVydmFsKCkpXG4gIH1cblxuICAvKipcbiAgICogUmV0dXJucyBhbiBpbmNyZW1lbnRpbmcgdGltZW91dCBpbnRlcnZhbCBiYXNlZCBhcm91bmQgdGhlIG51bWJlciBvZiByZWNvbm5lY3Rpb24gcmV0cmllc1xuICAgKi9cbiAgX3JlY29ubmVjdEludGVydmFsKCkge1xuICAgIHJldHVybiBbMTAwMCwgMjAwMCwgNTAwMCwgMTAwMDBdW3RoaXMucmVjb25uZWN0VHJpZXNdIHx8IDEwMDAwXG4gIH1cblxuICAvKipcbiAgICogU2V0cyBhIHJlY3Vyc2l2ZSB0aW1lb3V0IHRvIGNoZWNrIGlmIHRoZSBjb25uZWN0aW9uIGlzIHN0YWxlXG4gICAqL1xuICBfcG9sbCgpIHtcbiAgICB0aGlzLnBvbGxpbmdUaW1lb3V0ID0gc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICBpZiAodGhpcy5fY29ubmVjdGlvbklzU3RhbGUoKSkge1xuICAgICAgICB0aGlzLl9yZWNvbm5lY3QoKVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhpcy5fcG9sbCgpXG4gICAgICB9XG4gICAgfSwgU09DS0VUX1BPTExJTkdfUkFURSlcbiAgfVxuXG4gIC8qKlxuICAgKiBDbGVhciBwb2xsaW5nIHRpbWVvdXQgYW5kIHN0YXJ0IHBvbGxpbmdcbiAgICovXG4gIF9zdGFydFBvbGxpbmcoKSB7XG4gICAgY2xlYXJUaW1lb3V0KHRoaXMucG9sbGluZ1RpbWVvdXQpXG4gICAgdGhpcy5fcG9sbCgpXG4gIH1cblxuICAvKipcbiAgICogU2V0cyBgbGFzdFBpbmdgIHRvIHRoZSBjdXJlbnQgdGltZVxuICAgKi9cbiAgX2hhbmRsZVBpbmcoKSB7XG4gICAgdGhpcy5sYXN0UGluZyA9IG5vdygpXG4gIH1cblxuICAvKipcbiAgICogQ2xlYXJzIHJlY29ubmVjdCB0aW1lb3V0LCByZXNldHMgdmFyaWFibGVzIGFuIHN0YXJ0cyBwb2xsaW5nXG4gICAqL1xuICBfcmVzZXQoKSB7XG4gICAgY2xlYXJUaW1lb3V0KHRoaXMucmVjb25uZWN0VGltZW91dClcbiAgICB0aGlzLnJlY29ubmVjdFRyaWVzID0gMFxuICAgIHRoaXMuYXR0ZW1wdFJlY29ubmVjdCA9IHRydWVcbiAgICB0aGlzLl9zdGFydFBvbGxpbmcoKVxuICB9XG5cbiAgLyoqXG4gICAqIENvbm5lY3QgdGhlIHNvY2tldCB0byB0aGUgc2VydmVyLCBhbmQgYmluZHMgdG8gbmF0aXZlIHdzIGZ1bmN0aW9uc1xuICAgKiBAcGFyYW0ge09iamVjdH0gcGFyYW1zIC0gT3B0aW9uYWwgcGFyYW1ldGVyc1xuICAgKiBAcGFyYW0ge1N0cmluZ30gcGFyYW1zLmxvY2F0aW9uIC0gSG9zdG5hbWUgdG8gY29ubmVjdCB0bywgZGVmYXVsdHMgdG8gYHdpbmRvdy5sb2NhdGlvbi5ob3N0bmFtZWBcbiAgICogQHBhcmFtIHtTdHJpbmd9IHBhcm1hcy5wb3J0IC0gUG9ydCB0byBjb25uZWN0IHRvLCBkZWZhdWx0cyB0byBgd2luZG93LmxvY2F0aW9uLnBvcnRgXG4gICAqIEBwYXJhbSB7U3RyaW5nfSBwYXJhbXMucHJvdG9jb2wgLSBQcm90b2NvbCB0byB1c2UsIGVpdGhlciAnd3NzJyBvciAnd3MnXG4gICAqL1xuICBjb25uZWN0KHBhcmFtcykge1xuICAgIHRoaXMucGFyYW1zID0gcGFyYW1zXG5cbiAgICBsZXQgb3B0cyA9IHtcbiAgICAgIGxvY2F0aW9uOiB3aW5kb3cubG9jYXRpb24uaG9zdG5hbWUsXG4gICAgICBwb3J0OiB3aW5kb3cubG9jYXRpb24ucG9ydCxcbiAgICAgIHByb3RvY29sOiB3aW5kb3cubG9jYXRpb24ucHJvdG9jb2wgPT09ICdodHRwczonID8gJ3dzczonIDogJ3dzOicsXG4gICAgfVxuXG4gICAgaWYgKHBhcmFtcykgT2JqZWN0LmFzc2lnbihvcHRzLCBwYXJhbXMpXG4gICAgaWYgKG9wdHMucG9ydCkgb3B0cy5sb2NhdGlvbiArPSBgOiR7b3B0cy5wb3J0fWBcblxuICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICB0aGlzLndzID0gbmV3IFdlYlNvY2tldChgJHtvcHRzLnByb3RvY29sfS8vJHtvcHRzLmxvY2F0aW9ufSR7dGhpcy5lbmRwb2ludH1gKVxuICAgICAgdGhpcy53cy5vbm1lc3NhZ2UgPSAobXNnKSA9PiB7IHRoaXMuaGFuZGxlTWVzc2FnZShtc2cpIH1cbiAgICAgIHRoaXMud3Mub25jbG9zZSA9ICgpID0+IHtcbiAgICAgICAgaWYgKHRoaXMuYXR0ZW1wdFJlY29ubmVjdCkgdGhpcy5fcmVjb25uZWN0KClcbiAgICAgIH1cbiAgICAgIHRoaXMud3Mub25vcGVuID0gKCkgPT4ge1xuICAgICAgICB0aGlzLl9yZXNldCgpXG4gICAgICAgIHJlc29sdmUoKVxuICAgICAgfVxuICAgIH0pXG4gIH1cblxuICAvKipcbiAgICogQ2xvc2VzIHRoZSBzb2NrZXQgY29ubmVjdGlvbiBwZXJtYW5lbnRseVxuICAgKi9cbiAgZGlzY29ubmVjdCgpIHtcbiAgICB0aGlzLmF0dGVtcHRSZWNvbm5lY3QgPSBmYWxzZVxuICAgIGNsZWFyVGltZW91dCh0aGlzLnBvbGxpbmdUaW1lb3V0KVxuICAgIGNsZWFyVGltZW91dCh0aGlzLnJlY29ubmVjdFRpbWVvdXQpXG4gICAgdGhpcy53cy5jbG9zZSgpXG4gIH1cblxuICAvKipcbiAgICogQWRkcyBhIG5ldyBjaGFubmVsIHRvIHRoZSBzb2NrZXQgY2hhbm5lbHMgbGlzdFxuICAgKiBAcGFyYW0ge1N0cmluZ30gdG9waWMgLSBUb3BpYyBmb3IgdGhlIGNoYW5uZWw6IGBjaGF0X3Jvb206MTIzYFxuICAgKi9cbiAgY2hhbm5lbCh0b3BpYykge1xuICAgIGxldCBjaGFubmVsID0gbmV3IENoYW5uZWwodG9waWMsIHRoaXMpXG4gICAgdGhpcy5jaGFubmVscy5wdXNoKGNoYW5uZWwpXG4gICAgcmV0dXJuIGNoYW5uZWxcbiAgfVxuXG4gIC8qKlxuICAgKiBNZXNzYWdlIGhhbmRsZXIgZm9yIG1lc3NhZ2VzIHJlY2VpdmVkXG4gICAqIEBwYXJhbSB7TWVzc2FnZUV2ZW50fSBtc2cgLSBNZXNzYWdlIHJlY2VpdmVkIGZyb20gd3NcbiAgICovXG4gIGhhbmRsZU1lc3NhZ2UobXNnKSB7XG4gICAgaWYgKG1zZy5kYXRhID09PSBcInBpbmdcIikgcmV0dXJuIHRoaXMuX2hhbmRsZVBpbmcoKVxuXG4gICAgbGV0IHBhcnNlZF9tc2cgPSBKU09OLnBhcnNlKG1zZy5kYXRhKVxuICAgIHRoaXMuY2hhbm5lbHMuZm9yRWFjaCgoY2hhbm5lbCkgPT4ge1xuICAgICAgaWYgKGNoYW5uZWwudG9waWMgPT09IHBhcnNlZF9tc2cudG9waWMpIGNoYW5uZWwuaGFuZGxlTWVzc2FnZShwYXJzZWRfbXNnKVxuICAgIH0pXG4gIH1cbn1cblxubW9kdWxlLmV4cG9ydHMgPSB7XG4gIFNvY2tldDogU29ja2V0XG59XG5cblxuLyoqXG4gKiBBbGxvd3MgZGVsZXRlIGxpbmtzIHRvIHBvc3QgZm9yIHNlY3VyaXR5IGFuZCBlYXNlIG9mIHVzZSBzaW1pbGFyIHRvIFJhaWxzIGpxdWVyeV91anNcbiAqL1xuZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcIkRPTUNvbnRlbnRMb2FkZWRcIiwgZnVuY3Rpb24gKCkge1xuICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXCJhW2RhdGEtbWV0aG9kPSdkZWxldGUnXVwiKS5mb3JFYWNoKGZ1bmN0aW9uIChlbGVtZW50KSB7XG4gICAgICAgIGVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIGZ1bmN0aW9uIChlKSB7XG4gICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICB2YXIgbWVzc2FnZSA9IGVsZW1lbnQuZ2V0QXR0cmlidXRlKFwiZGF0YS1jb25maXJtXCIpIHx8IFwiQXJlIHlvdSBzdXJlP1wiO1xuICAgICAgICAgICAgaWYgKGNvbmZpcm0obWVzc2FnZSkpIHtcbiAgICAgICAgICAgICAgICB2YXIgZm9ybSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJmb3JtXCIpO1xuICAgICAgICAgICAgICAgIHZhciBpbnB1dCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJpbnB1dFwiKTtcbiAgICAgICAgICAgICAgICBmb3JtLnNldEF0dHJpYnV0ZShcImFjdGlvblwiLCBlbGVtZW50LmdldEF0dHJpYnV0ZShcImhyZWZcIikpO1xuICAgICAgICAgICAgICAgIGZvcm0uc2V0QXR0cmlidXRlKFwibWV0aG9kXCIsIFwiUE9TVFwiKTtcbiAgICAgICAgICAgICAgICBpbnB1dC5zZXRBdHRyaWJ1dGUoXCJ0eXBlXCIsIFwiaGlkZGVuXCIpO1xuICAgICAgICAgICAgICAgIGlucHV0LnNldEF0dHJpYnV0ZShcIm5hbWVcIiwgXCJfbWV0aG9kXCIpO1xuICAgICAgICAgICAgICAgIGlucHV0LnNldEF0dHJpYnV0ZShcInZhbHVlXCIsIFwiREVMRVRFXCIpO1xuICAgICAgICAgICAgICAgIGZvcm0uYXBwZW5kQ2hpbGQoaW5wdXQpO1xuICAgICAgICAgICAgICAgIGRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQoZm9ybSk7XG4gICAgICAgICAgICAgICAgZm9ybS5zdWJtaXQoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfSlcbiAgICB9KVxufSk7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9saWIvYW1iZXIvYXNzZXRzL2pzL2FtYmVyLmpzIl0sInNvdXJjZVJvb3QiOiIifQ==