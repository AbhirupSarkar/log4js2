(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["log4js"] = factory();
	else
		root["log4js"] = factory();
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	/*istanbul ignore next*/'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.LogAppender = exports.LogLevel = undefined;
	exports.configure = configure;
	/*istanbul ignore next*/exports.addAppender = addAppender;
	/*istanbul ignore next*/exports.getLogger = getLogger;
	/*istanbul ignore next*/exports.setLogLevel = setLogLevel;

	var /*istanbul ignore next*/_formatter = __webpack_require__(1);

	/*istanbul ignore next*/
	var formatter = _interopRequireWildcard(_formatter);

	var /*istanbul ignore next*/_utility = __webpack_require__(3);

	/*istanbul ignore next*/
	var utility = _interopRequireWildcard(_utility);

	var /*istanbul ignore next*/_appender = __webpack_require__(7);

	var /*istanbul ignore next*/_logger = __webpack_require__(8);

	var /*istanbul ignore next*/_logLevel = __webpack_require__(4);

	var /*istanbul ignore next*/_consoleAppender = __webpack_require__(9);

	/*istanbul ignore next*/
	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

	/**
	 * log4js <https://github.com/anigenero/log4js>
	 *
	 * Copyright 2016 Robin Schultz <http://anigenero.com>
	 * Released under the MIT License
	 */

	/**
	 * Holds the definition for the appender closure
	 *
	 * @typedef {{ append : function (number, LOG_EVENT), isActive : function(),
	 *          setLogLevel : function(number), setLayout : function(string) }}
	 */
	let APPENDER;

	/**
	 * @typedef {{ allowAppenderInjection : boolean, appenders : Array.<APPENDER>,
	 * 			application : Object, loggers : Array.<LogAppender>, layout : string }}
	 */
	let CONFIG_PARAMS;

	/**
	 * The name of the main logger. We use this in case no logger is specified
	 * @const
	 */
	const _MAIN_LOGGER = 'main';

	/**
	 * The default appenders that should be included if no appenders are specified
	 * @const
	 */
	const _DEFAULT_APPENDERS = [{
	    'appender': /*istanbul ignore next*/_consoleAppender.ConsoleAppender,
	    'level': /*istanbul ignore next*/_logLevel.LogLevel.INFO
	}];

	/**
	 * The default configuration for log4js2. If no configuration is specified, then this
	 * configuration will be injected
	 * @const
	 */
	const _DEFAULT_CONFIG = {
	    'allowAppenderInjection': true,
	    'appenders': _DEFAULT_APPENDERS,
	    'loggers': [{
	        'level': /*istanbul ignore next*/_logLevel.LogLevel.INFO
	    }],
	    'layout': '%d [%p] %c - %m'
	};

	/**
	 * The methods that an appender must contain
	 * @const
	 */
	const _APPENDER_METHODS = ['append', 'getName', 'isActive', 'setLogLevel', 'setLayout'];

	/** @type {Object} */
	let _appenders = {};
	/** @type {?CONFIG_PARAMS} */
	let _configuration = null;
	/** @type {boolean} */
	let _finalized = false;
	/** @type {Object} */
	let _loggers = {};

	/**
	 * Configures the logger
	 *
	 * @function
	 * @memberOf log4js
	 *
	 * @params {CONFIG_PARAMS} config
	 */
	function configure(config) {

	    if (_finalized) {
	        console.error('Could not configure - already in use');
	        return;
	    }

	    if (!_configuration) {
	        _configuration = {};
	    }

	    // set the default layout
	    if (!config.layout && !_configuration.layout) {
	        _configuration.layout = _DEFAULT_CONFIG.layout;
	    } else if (config.layout) {
	        _configuration.layout = config.layout;
	    }

	    // configure the appenders
	    _configureAppenders(config.appenders);
	    // configure the loggers
	    _configureLoggers(config.loggers);
	}

	/**
	 * Configures appenders
	 *
	 * @private
	 * @function
	 *
	 * @param {Array.<LogAppender|function>} appenders
	 */
	let _configureAppenders = function (appenders) {

	    if (!(appenders instanceof Array)) {
	        appenders = _DEFAULT_APPENDERS;
	    }

	    appenders.forEach(appender => {
	        if (appender instanceof Function) {
	            addAppender(appender);
	        }
	    });
	};

	/**
	 * Configures the loggers
	 *
	 * @private
	 * @function
	 *
	 * @param {Array.<Object>} loggers
	 */
	let _configureLoggers = function (loggers) {

	    if (!(loggers instanceof Array)) {
	        throw new Error('Invalid loggers');
	    }

	    loggers.forEach(function (logger) {

	        if (!logger.layout || typeof logger.layout !== 'string') {
	            logger.layout = _configuration.layout;
	        }

	        logger.tag = logger.tag || _MAIN_LOGGER;
	        logger.logLevel = logger.logLevel || /*istanbul ignore next*/_logLevel.LogLevel.ERROR;

	        _loggers[logger.tag] = _getAppendersForLogger(logger.logLevel, logger.layout);
	    });
	};

	/**
	 * Gets the appenders for the level and layout
	 *
	 * @private
	 * @function
	 *
	 * @param {number} logLevel
	 * @param {string} layout
	 *
	 * @returns {Array}
	 */
	let _getAppendersForLogger = function (logLevel, layout) {

	    let logger;
	    let appenderList = [];

	    Object.keys(_appenders).forEach(function (key) {

	        logger = _appenders[key].prototype instanceof /*istanbul ignore next*/_appender.LogAppender ? new _appenders[key]() : _appenders[key]();

	        logger.setLogLevel(logLevel);
	        logger.setLayout(layout);

	        appenderList.push(logger);
	    });

	    return appenderList;
	};

	/**
	 * Adds an appender to the appender queue. If the stack is finalized, and
	 * the allowAppenderInjection is set to false, then the event will not be
	 * appended
	 *
	 * @function
	 * @memberOf log4js
	 *
	 * @params {LogAppender} appender
	 */
	function addAppender(appender) {

	    if (_finalized && !_configuration.allowAppenderInjection) {
	        console.error('Cannot add appender when configuration finalized');
	        return;
	    }

	    _validateAppender(appender);

	    // only put the appender into the set if it doesn't exist already
	    if (!_appenders[appender.name]) {
	        _appenders[appender.name] = appender;
	    }
	}

	/**
	 * Validates that the appender
	 *
	 * @private
	 * @function
	 *
	 * @params {APPENDER} appender
	 * @throws {Error} if the appender is invalid
	 */
	let _validateAppender = function (appender) {

	    // if we are running ES6, we can make sure it extends LogAppender
	    // otherwise, it must be a function
	    if (appender.prototype instanceof /*istanbul ignore next*/_appender.LogAppender) {
	        return;
	    } else if (!(appender instanceof Function)) {
	        throw new Error('Invalid appender: not a function or class LogAppender');
	    }

	    // instantiate the appender function
	    let appenderObj = appender();

	    // ensure that the appender methods are present (and are functions)
	    _APPENDER_METHODS.forEach(function (element) {
	        if (appenderObj[element] == undefined || !(appenderObj[element] instanceof Function)) {
	            throw new Error(`Invalid appender: missing/invalid method: ${ element }`);
	        }
	    });
	};

	/**
	 * Appends the log event
	 *
	 * @private
	 * @function
	 *
	 * @param {Object} logEvent
	 */
	function _append(logEvent) {

	    // finalize the configuration to make sure no other appender can be injected (if set)
	    _finalized = true;

	    // cycle through each appender for the logger and append the logging event
	    (_loggers[logEvent.logger] || _loggers[_MAIN_LOGGER]).forEach(function (logger) {
	        if (logger.isActive(logEvent.level)) {
	            logger.append(logEvent);
	        }
	    });
	}

	/**
	 * Handles creating the logger and returning it
	 *
	 * @function
	 * @memberOf log4js
	 *
	 * @param {function|string=} context
	 *
	 * @return {Logger}
	 */
	function getLogger(context) {

	    // we need to initialize if we haven't
	    if (!_configuration) {
	        configure(_DEFAULT_CONFIG);
	    }

	    // determine the context
	    if (typeof context != 'string') {

	        if (typeof context == 'function') {
	            context = utility.getFunctionName(context);
	        } else if (typeof context == 'object') {

	            context = utility.getFunctionName(context.constructor);

	            if (context == 'Object') {
	                context = 'anonymous';
	            }
	        } else {
	            context = _MAIN_LOGGER;
	        }
	    }

	    return new /*istanbul ignore next*/_logger.Logger(context, {
	        'append': _append
	    });
	}

	/**
	 * Sets the log level for all appenders of a logger, or specified logger
	 *
	 * @function
	 * @memberOf log4js
	 *
	 * @param {number} logLevel
	 * @param {string=} logger
	 */
	function setLogLevel(logLevel, logger) {

	    if (logLevel instanceof Number) {

	        if (logger) {
	            if (_loggers[logger]) {
	                _loggers[logger].setLogLevel(logLevel);
	            }
	        } else {
	            for (let key in _loggers) {
	                if (_loggers.hasOwnProperty(key)) {
	                    _loggers[key].forEach(function (appender) {
	                        appender.setLogLevel(logLevel);
	                    });
	                }
	            }
	        }
	    }
	}

	addAppender( /*istanbul ignore next*/_consoleAppender.ConsoleAppender);

	/*istanbul ignore next*/exports.LogLevel = _logLevel.LogLevel;
	/*istanbul ignore next*/exports.LogAppender = _appender.LogAppender;
	//# sourceMappingURL=data:application/json;base64,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QURNLENBQVAsQ0ExQmtDO0NBQTVCOzs7Ozs7Ozs7OztBQTJDQSxTQUFTLFdBQVQsQ0FBcUIsUUFBckIsRUFBK0IsTUFBL0IsRUFBdUM7O0FBRTFDLFFBQUksb0JBQW9CLE1BQXBCLEVBQTRCOztBQUU1QixZQUFJLE1BQUosRUFBWTtBQUNSLGdCQUFJLFNBQVMsTUFBVCxDQUFKLEVBQXNCO0FBQ2xCLHlCQUFTLE1BQVQsRUFBaUIsV0FBakIsQ0FBNkIsUUFBN0IsRUFEa0I7YUFBdEI7U0FESixNQUlPO0FBQ0gsaUJBQUssSUFBSSxHQUFKLElBQVcsUUFBaEIsRUFBMEI7QUFDdEIsb0JBQUksU0FBUyxjQUFULENBQXdCLEdBQXhCLENBQUosRUFBa0M7QUFDOUIsNkJBQVMsR0FBVCxFQUFjLE9BQWQsQ0FBc0IsVUFBVSxRQUFWLEVBQW9CO0FBQ3RDLGlDQUFTLFdBQVQsQ0FBcUIsUUFBckIsRUFEc0M7cUJBQXBCLENBQXRCLENBRDhCO2lCQUFsQzthQURKO1NBTEo7S0FGSjtDQUZHOztBQXNCUDs7Z0NBRVM7Z0NBQ0EiLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcclxuICogbG9nNGpzIDxodHRwczovL2dpdGh1Yi5jb20vYW5pZ2VuZXJvL2xvZzRqcz5cclxuICpcclxuICogQ29weXJpZ2h0IDIwMTYgUm9iaW4gU2NodWx0eiA8aHR0cDovL2FuaWdlbmVyby5jb20+XHJcbiAqIFJlbGVhc2VkIHVuZGVyIHRoZSBNSVQgTGljZW5zZVxyXG4gKi9cclxuXHJcbi8qKlxyXG4gKiBIb2xkcyB0aGUgZGVmaW5pdGlvbiBmb3IgdGhlIGFwcGVuZGVyIGNsb3N1cmVcclxuICpcclxuICogQHR5cGVkZWYge3sgYXBwZW5kIDogZnVuY3Rpb24gKG51bWJlciwgTE9HX0VWRU5UKSwgaXNBY3RpdmUgOiBmdW5jdGlvbigpLFxyXG4gKiAgICAgICAgICBzZXRMb2dMZXZlbCA6IGZ1bmN0aW9uKG51bWJlciksIHNldExheW91dCA6IGZ1bmN0aW9uKHN0cmluZykgfX1cclxuICovXHJcbmxldCBBUFBFTkRFUjtcclxuXHJcbi8qKlxyXG4gKiBAdHlwZWRlZiB7eyBhbGxvd0FwcGVuZGVySW5qZWN0aW9uIDogYm9vbGVhbiwgYXBwZW5kZXJzIDogQXJyYXkuPEFQUEVOREVSPixcclxuICogXHRcdFx0YXBwbGljYXRpb24gOiBPYmplY3QsIGxvZ2dlcnMgOiBBcnJheS48TG9nQXBwZW5kZXI+LCBsYXlvdXQgOiBzdHJpbmcgfX1cclxuICovXHJcbmxldCBDT05GSUdfUEFSQU1TO1xyXG5cclxuaW1wb3J0ICogYXMgZm9ybWF0dGVyIGZyb20gJy4vZm9ybWF0dGVyJztcclxuaW1wb3J0ICogYXMgdXRpbGl0eSBmcm9tICcuL3V0aWxpdHknO1xyXG5pbXBvcnQge0xvZ0FwcGVuZGVyfSBmcm9tICcuL2FwcGVuZGVyL2FwcGVuZGVyJztcclxuaW1wb3J0IHtMb2dnZXJ9IGZyb20gJy4vbG9nZ2VyL2xvZ2dlcic7XHJcbmltcG9ydCB7TG9nTGV2ZWx9IGZyb20gJy4vY29uc3QvbG9nTGV2ZWwnO1xyXG5pbXBvcnQge0NvbnNvbGVBcHBlbmRlcn0gZnJvbSAnLi9hcHBlbmRlci9jb25zb2xlQXBwZW5kZXInO1xyXG5cclxuLyoqXHJcbiAqIFRoZSBuYW1lIG9mIHRoZSBtYWluIGxvZ2dlci4gV2UgdXNlIHRoaXMgaW4gY2FzZSBubyBsb2dnZXIgaXMgc3BlY2lmaWVkXHJcbiAqIEBjb25zdFxyXG4gKi9cclxuY29uc3QgX01BSU5fTE9HR0VSID0gJ21haW4nO1xyXG5cclxuLyoqXHJcbiAqIFRoZSBkZWZhdWx0IGFwcGVuZGVycyB0aGF0IHNob3VsZCBiZSBpbmNsdWRlZCBpZiBubyBhcHBlbmRlcnMgYXJlIHNwZWNpZmllZFxyXG4gKiBAY29uc3RcclxuICovXHJcbmNvbnN0IF9ERUZBVUxUX0FQUEVOREVSUyA9IFt7XHJcbiAgICAnYXBwZW5kZXInIDogQ29uc29sZUFwcGVuZGVyLFxyXG4gICAgJ2xldmVsJyA6IExvZ0xldmVsLklORk9cclxufV07XHJcblxyXG4vKipcclxuICogVGhlIGRlZmF1bHQgY29uZmlndXJhdGlvbiBmb3IgbG9nNGpzMi4gSWYgbm8gY29uZmlndXJhdGlvbiBpcyBzcGVjaWZpZWQsIHRoZW4gdGhpc1xyXG4gKiBjb25maWd1cmF0aW9uIHdpbGwgYmUgaW5qZWN0ZWRcclxuICogQGNvbnN0XHJcbiAqL1xyXG5jb25zdCBfREVGQVVMVF9DT05GSUcgPSB7XHJcbiAgICAnYWxsb3dBcHBlbmRlckluamVjdGlvbicgOiB0cnVlLFxyXG4gICAgJ2FwcGVuZGVycycgOiBfREVGQVVMVF9BUFBFTkRFUlMsXHJcbiAgICAnbG9nZ2VycycgOiBbe1xyXG4gICAgICAgICdsZXZlbCcgOiBMb2dMZXZlbC5JTkZPXHJcbiAgICB9XSxcclxuICAgICdsYXlvdXQnIDogJyVkIFslcF0gJWMgLSAlbSdcclxufTtcclxuXHJcbi8qKlxyXG4gKiBUaGUgbWV0aG9kcyB0aGF0IGFuIGFwcGVuZGVyIG11c3QgY29udGFpblxyXG4gKiBAY29uc3RcclxuICovXHJcbmNvbnN0IF9BUFBFTkRFUl9NRVRIT0RTID0gWydhcHBlbmQnLCAnZ2V0TmFtZScsICdpc0FjdGl2ZScsICdzZXRMb2dMZXZlbCcsICdzZXRMYXlvdXQnXTtcclxuXHJcbi8qKiBAdHlwZSB7T2JqZWN0fSAqL1xyXG5sZXQgX2FwcGVuZGVycyA9IHt9O1xyXG4vKiogQHR5cGUgez9DT05GSUdfUEFSQU1TfSAqL1xyXG5sZXQgX2NvbmZpZ3VyYXRpb24gPSBudWxsO1xyXG4vKiogQHR5cGUge2Jvb2xlYW59ICovXHJcbmxldCBfZmluYWxpemVkID0gZmFsc2U7XHJcbi8qKiBAdHlwZSB7T2JqZWN0fSAqL1xyXG5sZXQgX2xvZ2dlcnMgPSB7fTtcclxuXHJcbi8qKlxyXG4gKiBDb25maWd1cmVzIHRoZSBsb2dnZXJcclxuICpcclxuICogQGZ1bmN0aW9uXHJcbiAqIEBtZW1iZXJPZiBsb2c0anNcclxuICpcclxuICogQHBhcmFtcyB7Q09ORklHX1BBUkFNU30gY29uZmlnXHJcbiAqL1xyXG5leHBvcnQgZnVuY3Rpb24gY29uZmlndXJlKGNvbmZpZykge1xyXG5cclxuXHRpZiAoX2ZpbmFsaXplZCkge1xyXG5cdFx0Y29uc29sZS5lcnJvcignQ291bGQgbm90IGNvbmZpZ3VyZSAtIGFscmVhZHkgaW4gdXNlJyk7XHJcblx0XHRyZXR1cm47XHJcblx0fVxyXG5cclxuXHRpZiAoIV9jb25maWd1cmF0aW9uKSB7XHJcbiAgICAgICAgX2NvbmZpZ3VyYXRpb24gPSB7fTtcclxuICAgIH1cclxuXHJcbiAgICAvLyBzZXQgdGhlIGRlZmF1bHQgbGF5b3V0XHJcbiAgICBpZiAoIWNvbmZpZy5sYXlvdXQgJiYgIV9jb25maWd1cmF0aW9uLmxheW91dCkge1xyXG4gICAgICAgIF9jb25maWd1cmF0aW9uLmxheW91dCA9IF9ERUZBVUxUX0NPTkZJRy5sYXlvdXQ7XHJcbiAgICB9IGVsc2UgaWYgKGNvbmZpZy5sYXlvdXQpIHtcclxuICAgICAgICBfY29uZmlndXJhdGlvbi5sYXlvdXQgPSBjb25maWcubGF5b3V0O1xyXG4gICAgfVxyXG5cclxuXHQvLyBjb25maWd1cmUgdGhlIGFwcGVuZGVyc1xyXG5cdF9jb25maWd1cmVBcHBlbmRlcnMoY29uZmlnLmFwcGVuZGVycyk7XHJcbiAgICAvLyBjb25maWd1cmUgdGhlIGxvZ2dlcnNcclxuICAgIF9jb25maWd1cmVMb2dnZXJzKGNvbmZpZy5sb2dnZXJzKTtcclxuXHJcbn1cclxuXHJcbi8qKlxyXG4gKiBDb25maWd1cmVzIGFwcGVuZGVyc1xyXG4gKlxyXG4gKiBAcHJpdmF0ZVxyXG4gKiBAZnVuY3Rpb25cclxuICpcclxuICogQHBhcmFtIHtBcnJheS48TG9nQXBwZW5kZXJ8ZnVuY3Rpb24+fSBhcHBlbmRlcnNcclxuICovXHJcbmxldCBfY29uZmlndXJlQXBwZW5kZXJzID0gZnVuY3Rpb24gKGFwcGVuZGVycykge1xyXG5cclxuICAgIGlmICghKGFwcGVuZGVycyBpbnN0YW5jZW9mIEFycmF5KSkge1xyXG4gICAgICAgIGFwcGVuZGVycyA9IF9ERUZBVUxUX0FQUEVOREVSUztcclxuICAgIH1cclxuXHJcbiAgICBhcHBlbmRlcnMuZm9yRWFjaChhcHBlbmRlciA9PiB7XHJcbiAgICAgICAgaWYgKGFwcGVuZGVyIGluc3RhbmNlb2YgRnVuY3Rpb24pIHtcclxuICAgICAgICAgICAgYWRkQXBwZW5kZXIoYXBwZW5kZXIpO1xyXG4gICAgICAgIH1cclxuICAgIH0pO1xyXG5cclxufTtcclxuXHJcbi8qKlxyXG4gKiBDb25maWd1cmVzIHRoZSBsb2dnZXJzXHJcbiAqXHJcbiAqIEBwcml2YXRlXHJcbiAqIEBmdW5jdGlvblxyXG4gKlxyXG4gKiBAcGFyYW0ge0FycmF5LjxPYmplY3Q+fSBsb2dnZXJzXHJcbiAqL1xyXG5sZXQgX2NvbmZpZ3VyZUxvZ2dlcnMgPSBmdW5jdGlvbiAobG9nZ2Vycykge1xyXG5cclxuXHRpZiAoIShsb2dnZXJzIGluc3RhbmNlb2YgQXJyYXkpKSB7XHJcblx0XHR0aHJvdyBuZXcgRXJyb3IoJ0ludmFsaWQgbG9nZ2VycycpO1xyXG5cdH1cclxuXHJcbiAgICBsb2dnZXJzLmZvckVhY2goZnVuY3Rpb24gKGxvZ2dlcikge1xyXG5cclxuICAgICAgICBpZiAoIWxvZ2dlci5sYXlvdXQgfHwgdHlwZW9mIGxvZ2dlci5sYXlvdXQgIT09ICdzdHJpbmcnKSB7XHJcbiAgICAgICAgICAgIGxvZ2dlci5sYXlvdXQgPSBfY29uZmlndXJhdGlvbi5sYXlvdXQ7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBsb2dnZXIudGFnID0gbG9nZ2VyLnRhZyB8fCBfTUFJTl9MT0dHRVI7XHJcbiAgICAgICAgbG9nZ2VyLmxvZ0xldmVsID0gbG9nZ2VyLmxvZ0xldmVsIHx8IExvZ0xldmVsLkVSUk9SO1xyXG5cclxuICAgICAgICBfbG9nZ2Vyc1tsb2dnZXIudGFnXSA9IF9nZXRBcHBlbmRlcnNGb3JMb2dnZXIobG9nZ2VyLmxvZ0xldmVsLCBsb2dnZXIubGF5b3V0KTtcclxuXHJcbiAgICB9KTtcclxuXHJcbn07XHJcblxyXG4vKipcclxuICogR2V0cyB0aGUgYXBwZW5kZXJzIGZvciB0aGUgbGV2ZWwgYW5kIGxheW91dFxyXG4gKlxyXG4gKiBAcHJpdmF0ZVxyXG4gKiBAZnVuY3Rpb25cclxuICpcclxuICogQHBhcmFtIHtudW1iZXJ9IGxvZ0xldmVsXHJcbiAqIEBwYXJhbSB7c3RyaW5nfSBsYXlvdXRcclxuICpcclxuICogQHJldHVybnMge0FycmF5fVxyXG4gKi9cclxubGV0IF9nZXRBcHBlbmRlcnNGb3JMb2dnZXIgPSBmdW5jdGlvbiAobG9nTGV2ZWwsIGxheW91dCkge1xyXG5cclxuICAgIGxldCBsb2dnZXI7XHJcbiAgICBsZXQgYXBwZW5kZXJMaXN0ID0gW107XHJcblxyXG4gICAgT2JqZWN0LmtleXMoX2FwcGVuZGVycykuZm9yRWFjaChmdW5jdGlvbiAoa2V5KSB7XHJcblxyXG4gICAgICAgIGxvZ2dlciA9IChfYXBwZW5kZXJzW2tleV0ucHJvdG90eXBlIGluc3RhbmNlb2YgTG9nQXBwZW5kZXIpID8gbmV3IF9hcHBlbmRlcnNba2V5XSgpIDogX2FwcGVuZGVyc1trZXldKCk7XHJcblxyXG4gICAgICAgIGxvZ2dlci5zZXRMb2dMZXZlbChsb2dMZXZlbCk7XHJcbiAgICAgICAgbG9nZ2VyLnNldExheW91dChsYXlvdXQpO1xyXG5cclxuICAgICAgICBhcHBlbmRlckxpc3QucHVzaChsb2dnZXIpO1xyXG5cclxuICAgIH0pO1xyXG5cclxuXHRyZXR1cm4gYXBwZW5kZXJMaXN0O1xyXG5cclxufTtcclxuXHJcbi8qKlxyXG4gKiBBZGRzIGFuIGFwcGVuZGVyIHRvIHRoZSBhcHBlbmRlciBxdWV1ZS4gSWYgdGhlIHN0YWNrIGlzIGZpbmFsaXplZCwgYW5kXHJcbiAqIHRoZSBhbGxvd0FwcGVuZGVySW5qZWN0aW9uIGlzIHNldCB0byBmYWxzZSwgdGhlbiB0aGUgZXZlbnQgd2lsbCBub3QgYmVcclxuICogYXBwZW5kZWRcclxuICpcclxuICogQGZ1bmN0aW9uXHJcbiAqIEBtZW1iZXJPZiBsb2c0anNcclxuICpcclxuICogQHBhcmFtcyB7TG9nQXBwZW5kZXJ9IGFwcGVuZGVyXHJcbiAqL1xyXG5leHBvcnQgZnVuY3Rpb24gYWRkQXBwZW5kZXIoYXBwZW5kZXIpIHtcclxuXHJcblx0aWYgKF9maW5hbGl6ZWQgJiYgIV9jb25maWd1cmF0aW9uLmFsbG93QXBwZW5kZXJJbmplY3Rpb24pIHtcclxuXHRcdGNvbnNvbGUuZXJyb3IoJ0Nhbm5vdCBhZGQgYXBwZW5kZXIgd2hlbiBjb25maWd1cmF0aW9uIGZpbmFsaXplZCcpO1xyXG5cdFx0cmV0dXJuO1xyXG5cdH1cclxuXHJcbiAgICBfdmFsaWRhdGVBcHBlbmRlcihhcHBlbmRlcik7XHJcblxyXG4gICAgLy8gb25seSBwdXQgdGhlIGFwcGVuZGVyIGludG8gdGhlIHNldCBpZiBpdCBkb2Vzbid0IGV4aXN0IGFscmVhZHlcclxuICAgIGlmICghX2FwcGVuZGVyc1thcHBlbmRlci5uYW1lXSkge1xyXG4gICAgICAgIF9hcHBlbmRlcnNbYXBwZW5kZXIubmFtZV0gPSBhcHBlbmRlcjtcclxuICAgIH1cclxuXHJcbn1cclxuXHJcbi8qKlxyXG4gKiBWYWxpZGF0ZXMgdGhhdCB0aGUgYXBwZW5kZXJcclxuICpcclxuICogQHByaXZhdGVcclxuICogQGZ1bmN0aW9uXHJcbiAqXHJcbiAqIEBwYXJhbXMge0FQUEVOREVSfSBhcHBlbmRlclxyXG4gKiBAdGhyb3dzIHtFcnJvcn0gaWYgdGhlIGFwcGVuZGVyIGlzIGludmFsaWRcclxuICovXHJcbmxldCBfdmFsaWRhdGVBcHBlbmRlciA9IGZ1bmN0aW9uIChhcHBlbmRlcikge1xyXG5cclxuICAgIC8vIGlmIHdlIGFyZSBydW5uaW5nIEVTNiwgd2UgY2FuIG1ha2Ugc3VyZSBpdCBleHRlbmRzIExvZ0FwcGVuZGVyXHJcbiAgICAvLyBvdGhlcndpc2UsIGl0IG11c3QgYmUgYSBmdW5jdGlvblxyXG4gICAgaWYgKGFwcGVuZGVyLnByb3RvdHlwZSBpbnN0YW5jZW9mIExvZ0FwcGVuZGVyKSB7XHJcbiAgICAgICAgcmV0dXJuO1xyXG4gICAgfSBlbHNlIGlmICghKGFwcGVuZGVyIGluc3RhbmNlb2YgRnVuY3Rpb24pKSB7XHJcblx0XHR0aHJvdyBuZXcgRXJyb3IoJ0ludmFsaWQgYXBwZW5kZXI6IG5vdCBhIGZ1bmN0aW9uIG9yIGNsYXNzIExvZ0FwcGVuZGVyJyk7XHJcblx0fVxyXG5cclxuXHQvLyBpbnN0YW50aWF0ZSB0aGUgYXBwZW5kZXIgZnVuY3Rpb25cclxuXHRsZXQgYXBwZW5kZXJPYmogPSBhcHBlbmRlcigpO1xyXG5cclxuICAgIC8vIGVuc3VyZSB0aGF0IHRoZSBhcHBlbmRlciBtZXRob2RzIGFyZSBwcmVzZW50IChhbmQgYXJlIGZ1bmN0aW9ucylcclxuICAgIF9BUFBFTkRFUl9NRVRIT0RTLmZvckVhY2goZnVuY3Rpb24gKGVsZW1lbnQpIHtcclxuICAgICAgICBpZiAoYXBwZW5kZXJPYmpbZWxlbWVudF0gPT0gdW5kZWZpbmVkIHx8ICEoYXBwZW5kZXJPYmpbZWxlbWVudF0gaW5zdGFuY2VvZiBGdW5jdGlvbikpIHtcclxuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKGBJbnZhbGlkIGFwcGVuZGVyOiBtaXNzaW5nL2ludmFsaWQgbWV0aG9kOiAke2VsZW1lbnR9YCk7XHJcbiAgICAgICAgfVxyXG4gICAgfSk7XHJcblxyXG59O1xyXG5cclxuLyoqXHJcbiAqIEFwcGVuZHMgdGhlIGxvZyBldmVudFxyXG4gKlxyXG4gKiBAcHJpdmF0ZVxyXG4gKiBAZnVuY3Rpb25cclxuICpcclxuICogQHBhcmFtIHtPYmplY3R9IGxvZ0V2ZW50XHJcbiAqL1xyXG5mdW5jdGlvbiBfYXBwZW5kKGxvZ0V2ZW50KSB7XHJcblxyXG5cdC8vIGZpbmFsaXplIHRoZSBjb25maWd1cmF0aW9uIHRvIG1ha2Ugc3VyZSBubyBvdGhlciBhcHBlbmRlciBjYW4gYmUgaW5qZWN0ZWQgKGlmIHNldClcclxuXHRfZmluYWxpemVkID0gdHJ1ZTtcclxuXHJcbiAgICAvLyBjeWNsZSB0aHJvdWdoIGVhY2ggYXBwZW5kZXIgZm9yIHRoZSBsb2dnZXIgYW5kIGFwcGVuZCB0aGUgbG9nZ2luZyBldmVudFxyXG4gICAgKF9sb2dnZXJzW2xvZ0V2ZW50LmxvZ2dlcl0gfHwgX2xvZ2dlcnNbX01BSU5fTE9HR0VSXSkuZm9yRWFjaChmdW5jdGlvbiAobG9nZ2VyKSB7XHJcbiAgICAgICAgaWYgKGxvZ2dlci5pc0FjdGl2ZShsb2dFdmVudC5sZXZlbCkpIHtcclxuICAgICAgICAgICAgbG9nZ2VyLmFwcGVuZChsb2dFdmVudCk7XHJcbiAgICAgICAgfVxyXG4gICAgfSk7XHJcblxyXG59XHJcblxyXG4vKipcclxuICogSGFuZGxlcyBjcmVhdGluZyB0aGUgbG9nZ2VyIGFuZCByZXR1cm5pbmcgaXRcclxuICpcclxuICogQGZ1bmN0aW9uXHJcbiAqIEBtZW1iZXJPZiBsb2c0anNcclxuICpcclxuICogQHBhcmFtIHtmdW5jdGlvbnxzdHJpbmc9fSBjb250ZXh0XHJcbiAqXHJcbiAqIEByZXR1cm4ge0xvZ2dlcn1cclxuICovXHJcbmV4cG9ydCBmdW5jdGlvbiBnZXRMb2dnZXIoY29udGV4dCkge1xyXG5cclxuXHQvLyB3ZSBuZWVkIHRvIGluaXRpYWxpemUgaWYgd2UgaGF2ZW4ndFxyXG5cdGlmICghX2NvbmZpZ3VyYXRpb24pIHtcclxuXHRcdGNvbmZpZ3VyZShfREVGQVVMVF9DT05GSUcpO1xyXG5cdH1cclxuXHJcbiAgICAvLyBkZXRlcm1pbmUgdGhlIGNvbnRleHRcclxuICAgIGlmICh0eXBlb2YgY29udGV4dCAhPSAnc3RyaW5nJykge1xyXG5cclxuICAgICAgICBpZiAodHlwZW9mIGNvbnRleHQgPT0gJ2Z1bmN0aW9uJykge1xyXG4gICAgICAgICAgICBjb250ZXh0ID0gdXRpbGl0eS5nZXRGdW5jdGlvbk5hbWUoY29udGV4dCk7XHJcbiAgICAgICAgfSBlbHNlIGlmICh0eXBlb2YgY29udGV4dCA9PSAnb2JqZWN0Jykge1xyXG5cclxuICAgICAgICAgICAgY29udGV4dCA9IHV0aWxpdHkuZ2V0RnVuY3Rpb25OYW1lKGNvbnRleHQuY29uc3RydWN0b3IpO1xyXG5cclxuICAgICAgICAgICAgaWYgKGNvbnRleHQgPT0gJ09iamVjdCcpIHtcclxuICAgICAgICAgICAgICAgIGNvbnRleHQgPSAnYW5vbnltb3VzJztcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBjb250ZXh0ID0gX01BSU5fTE9HR0VSO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICB9XHJcblxyXG5cdHJldHVybiBuZXcgTG9nZ2VyKGNvbnRleHQsIHtcclxuXHRcdCdhcHBlbmQnIDogX2FwcGVuZFxyXG5cdH0pO1xyXG5cclxufVxyXG5cclxuXHJcblxyXG4vKipcclxuICogU2V0cyB0aGUgbG9nIGxldmVsIGZvciBhbGwgYXBwZW5kZXJzIG9mIGEgbG9nZ2VyLCBvciBzcGVjaWZpZWQgbG9nZ2VyXHJcbiAqXHJcbiAqIEBmdW5jdGlvblxyXG4gKiBAbWVtYmVyT2YgbG9nNGpzXHJcbiAqXHJcbiAqIEBwYXJhbSB7bnVtYmVyfSBsb2dMZXZlbFxyXG4gKiBAcGFyYW0ge3N0cmluZz19IGxvZ2dlclxyXG4gKi9cclxuZXhwb3J0IGZ1bmN0aW9uIHNldExvZ0xldmVsKGxvZ0xldmVsLCBsb2dnZXIpIHtcclxuXHJcbiAgICBpZiAobG9nTGV2ZWwgaW5zdGFuY2VvZiBOdW1iZXIpIHtcclxuXHJcbiAgICAgICAgaWYgKGxvZ2dlcikge1xyXG4gICAgICAgICAgICBpZiAoX2xvZ2dlcnNbbG9nZ2VyXSkge1xyXG4gICAgICAgICAgICAgICAgX2xvZ2dlcnNbbG9nZ2VyXS5zZXRMb2dMZXZlbChsb2dMZXZlbCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBmb3IgKGxldCBrZXkgaW4gX2xvZ2dlcnMpIHtcclxuICAgICAgICAgICAgICAgIGlmIChfbG9nZ2Vycy5oYXNPd25Qcm9wZXJ0eShrZXkpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgX2xvZ2dlcnNba2V5XS5mb3JFYWNoKGZ1bmN0aW9uIChhcHBlbmRlcikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBhcHBlbmRlci5zZXRMb2dMZXZlbChsb2dMZXZlbCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgfVxyXG5cclxufVxyXG5cclxuYWRkQXBwZW5kZXIoQ29uc29sZUFwcGVuZGVyKTtcclxuXHJcbmV4cG9ydCB7IExvZ0xldmVsIH07XHJcbmV4cG9ydCB7IExvZ0FwcGVuZGVyIH07XHJcbiJdfQ==

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	/*istanbul ignore next*/'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.preCompile = preCompile;
	/*istanbul ignore next*/exports.format = format;

	var /*istanbul ignore next*/_dateFormatter = __webpack_require__(2);

	var /*istanbul ignore next*/_utility = __webpack_require__(3);

	/*istanbul ignore next*/
	var utility = _interopRequireWildcard(_utility);

	var /*istanbul ignore next*/_logLevel = __webpack_require__(4);

	/*istanbul ignore next*/
	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

	/** @const */
	const _COMMAND_REGEX = /%([a-z,A-Z]+)(?=\{|)/;

	/** @type {Object} */
	/**
	 * log4js <https://github.com/anigenero/log4js>
	 *
	 * Copyright 2016-present Robin Schultz <http://anigenero.com>
	 * Released under the MIT License
	 */

	let _compiledLayouts = {};

	/**
	 * @function
	 * @memberOf formatter
	 *
	 * @param {LOG_EVENT} logEvent
	 *
	 * @return {string}
	 */
	let _formatLogger = function (logEvent) {
	  return logEvent.logger;
	};

	/**
	 * @function
	 * @memberOf formatter
	 *
	 * @param {LOG_EVENT} logEvent
	 * @param {Array.<string>} params
	 *
	 * @return {string}
	 */
	let _formatDate = function (logEvent, params) {
	  return (/*istanbul ignore next*/(0, _dateFormatter.dateFormat)(logEvent.date, params[0])
	  );
	};

	/**
	 * @function
	 * @memberOf formatter
	 *
	 * @param {LOG_EVENT} logEvent
	 *
	 * @return {string}
	 */
	let _formatException = function (logEvent) {

	  let message = '';

	  if (logEvent.error != null) {

	    if (logEvent.error.stack != undefined) {
	      let stacks = logEvent.error.stack.split(/\n/g);
	      stacks.forEach(function (stack) {
	        message += `\t${ stack }\n`;
	      });
	    } else if (logEvent.error.message != null && logEvent.error.message != '') {
	      message += `\t${ logEvent.error.name }: ${ logEvent.error.message }\n`;
	    }
	  }

	  return message;
	};

	/**
	 * Formats the file (e.g. test.js) to the file
	 *
	 * @private
	 * @function
	 * @memberOf formatter
	 *
	 * @param {LOG_EVENT} logEvent
	 */
	let _formatFile = function (logEvent) {

	  if (!logEvent.file) {
	    _getFileDetails(logEvent);
	  }

	  return logEvent.file;
	};

	/**
	 * @function
	 * @memberOf formatter
	 *
	 * @param {LOG_EVENT} logEvent
	 *
	 * @return {string}
	 */
	let _formatLineNumber = function (logEvent) {

	  if (!logEvent.lineNumber) {
	    _getFileDetails(logEvent);
	  }

	  return `${ logEvent.lineNumber }`;
	};

	/**
	 * @function
	 * @memberOf formatter
	 *
	 * @param {LOG_EVENT} logEvent
	 * @param {Array.<string>} params
	 *
	 * @return {string}
	 */
	let _formatMapMessage = function (logEvent, params) {
	  let message = null;
	  if (logEvent.properties) {

	    message = [];
	    for (let key in logEvent.properties) {
	      if (params[0]) {
	        if (params[0] == key) {
	          message.push(logEvent.properties[key]);
	        }
	      } else {
	        message.push('{' + key + ',' + logEvent.properties[key] + '}');
	      }
	    }

	    return '{' + message.join(',') + '}';
	  }
	  return message;
	};

	/**
	 * @function
	 * @memberOf formatter
	 *
	 * @param {LOG_EVENT} logEvent
	 *
	 * @return {string}
	 */
	let _formatLogMessage = function (logEvent) {
	  return logEvent.message;
	};

	/**
	 * @function
	 * @memberOf formatter
	 *
	 * @param {LOG_EVENT} logEvent
	 *
	 * @return {string}
	 */
	let _formatMethodName = function (logEvent) {
	  return utility.getFunctionName(logEvent.method);
	};

	/**
	 * @private
	 * @function
	 * @memberOf formatter
	 */
	let _formatLineSeparator = function () {
	  return '\n';
	};

	/**
	 * @function
	 * @memberOf formatter
	 *
	 * @param {LOG_EVENT} logEvent
	 *
	 * @return {string}
	 */
	let _formatLevel = function (logEvent) {

	  switch (logEvent.level) {

	    case /*istanbul ignore next*/_logLevel.LogLevel.FATAL:
	      return 'FATAL';
	    case /*istanbul ignore next*/_logLevel.LogLevel.ERROR:
	      return 'ERROR';
	    case /*istanbul ignore next*/_logLevel.LogLevel.WARN:
	      return 'WARN';
	    case /*istanbul ignore next*/_logLevel.LogLevel.INFO:
	      return 'INFO';
	    case /*istanbul ignore next*/_logLevel.LogLevel.DEBUG:
	      return 'DEBUG';
	    case /*istanbul ignore next*/_logLevel.LogLevel.TRACE:
	    default:
	      return 'TRACE';

	  }
	};

	/**
	 * @function
	 * @memberOf formatter
	 *
	 * @param {LOG_EVENT} logEvent
	 *
	 * @return {string}
	 */
	let _formatRelative = function (logEvent) {
	  return '' + logEvent.relative;
	};

	/**
	 * @function
	 * @memberOf formatter
	 *
	 * @param {LOG_EVENT} logEvent
	 *
	 * @return {string}
	 */
	let _formatSequenceNumber = function (logEvent) {
	  return '' + logEvent.sequence;
	};

	let _formatters = {
	  'c|logger': _formatLogger,
	  'd|date': _formatDate,
	  'ex|exception|throwable': _formatException,
	  'F|file': _formatFile,
	  'K|map|MAP': _formatMapMessage,
	  'L|line': _formatLineNumber,
	  'm|msg|message': _formatLogMessage,
	  'M|method': _formatMethodName,
	  'n': _formatLineSeparator,
	  'p|level': _formatLevel,
	  'r|relative': _formatRelative,
	  'sn|sequenceNumber': _formatSequenceNumber
	};

	/**
	 * Get the compiled layout for the specified layout string. If the compiled layout does not
	 * exist, then we want to create it.
	 *
	 * @function
	 * @memberOf formatter
	 *
	 * @param {string} layout
	 *
	 * @return {Array.<string|function>}
	 */
	let _getCompiledLayout = function (layout) {

	  if (_compiledLayouts[layout]) {
	    return _compiledLayouts[layout];
	  }

	  return _compileLayout(layout);
	};

	/**
	 * Compiles a layout into an array. The array contains functions
	 *
	 * @function
	 * @memberOf formatter
	 *
	 * @param {string} layout
	 *
	 * @return {Array.<string|function>}
	 */
	let _compileLayout = function (layout) {

	  let index = layout.indexOf('%');
	  let currentFormatString = '';
	  let formatArray = [];

	  if (index != 0) {
	    formatArray.push(layout.substring(0, index));
	  }

	  do {

	    let startIndex = index;
	    let endIndex = index = layout.indexOf('%', index + 1);

	    if (endIndex < 0) {
	      currentFormatString = layout.substring(startIndex);
	    } else {
	      currentFormatString = layout.substring(startIndex, endIndex);
	    }

	    formatArray.push(_getFormatterObject(currentFormatString));
	  } while (index > -1);

	  // set the format array to the specified compiled layout
	  _compiledLayouts[layout] = formatArray;

	  return formatArray;
	};

	/**
	 * @function
	 * @memberOf formatter
	 *
	 * @param {string} formatString
	 *
	 * @return {Object|string}
	 */
	let _getFormatterObject = function (formatString) {

	  let result = _COMMAND_REGEX.exec(formatString);
	  if (result != null && result.length == 2) {

	    let formatter = _getFormatterFunction(result[1]);
	    if (!formatter) {
	      return null;
	    }

	    let params = _getLayoutTagParams(formatString);

	    let after = '';
	    let endIndex = formatString.lastIndexOf('}');
	    if (endIndex != -1) {
	      after = formatString.substring(endIndex + 1);
	    } else {
	      after = formatString.substring(result.index + result[1].length + 1);
	    }

	    return {
	      'formatter': formatter,
	      'params': params,
	      'after': after
	    };
	  }

	  return formatString;
	};

	/**
	 * Determines what formatter function has been configured
	 *
	 * @function
	 * @memberOf formatter
	 *
	 * @param {string} command
	 *
	 * @return {?string}
	 */
	let _getFormatterFunction = function (command) {

	  let regex;
	  for (let key in _formatters) {
	    if (_formatters.hasOwnProperty(key)) {
	      regex = new RegExp('^(' + key + ')$');
	      if (regex.exec(command)) {
	        return _formatters[key];
	      }
	    }
	  }

	  return null;
	};

	/**
	 * Gets the layout tag params associated with the layout tag. So, for example, '%d{yyyy-MM-dd}`
	 * would output an array of ['yyyy-MM-dd']
	 *
	 * @private
	 * @function
	 *
	 * @param {string} command
	 *
	 * @return {Array.<string>}
	 */
	let _getLayoutTagParams = function (command) {

	  let params = [];
	  let result = command.match(/\{([^}]*)(?=})/g);
	  if (result != null) {
	    for (let i = 0; i < result.length; i++) {
	      params.push(result[i].substring(1));
	    }
	  }

	  return params;
	};

	/**
	 * Handles formatting the log event using the specified formatter array
	 *
	 * @private
	 * @function
	 *
	 * @param {Array.<function|string>} formatter
	 * @param {LOG_EVENT} logEvent
	 *
	 * @return {string}
	 */
	let _formatLogEvent = function (formatter, logEvent) {

	  let response;
	  let message = '';
	  let count = formatter.length;
	  for (let i = 0; i < count; i++) {
	    if (formatter[i] !== null) {

	      if (formatter[i] instanceof Object) {

	        response = formatter[i].formatter(logEvent, formatter[i].params);
	        if (response != null) {
	          message += response;
	        }
	        message += formatter[i].after;
	      } else {
	        message += formatter[i];
	      }
	    }
	  }

	  return message.trim();
	};

	/**
	 *
	 * @private
	 * @function
	 * @memberOf formatter
	 *
	 * @param {LOG_EVENT} logEvent
	 */
	let _getFileDetails = function (logEvent) {

	  if (logEvent.logErrorStack) {

	    let parts = logEvent.logErrorStack.stack.split(/\n/g);
	    let file = parts[3];
	    file = file.replace(/at (.*\(|)(file|http|https|)(:|)(\/|)*/, '');
	    file = file.replace(')', '');
	    file = file.replace(typeof location !== 'undefined' ? location.host : '', '').trim();

	    let fileParts = file.split(/\:/g);

	    logEvent.column = fileParts.pop();
	    logEvent.lineNumber = fileParts.pop();

	    if (true) {
	      let path = __webpack_require__(5);
	      let appDir = path.dirname(__webpack_require__.c[0].filename);
	      logEvent.filename = fileParts.join(':').replace(appDir, '').replace(/(\\|\/)/, '');
	    } else {
	      logEvent.filename = fileParts.join(':');
	    }
	  } else {

	    logEvent.column = '?';
	    logEvent.filename = 'anonymous';
	    logEvent.lineNumber = '?';
	  }
	};

	/**
	 * @function
	 * @memberOf formatter
	 *
	 * @param {string} layout
	 *
	 * @return {string}
	 */
	function preCompile(layout) {
	  _getCompiledLayout(layout);
	}

	/**
	 * @function
	 * @memberOf formatter
	 *
	 * @param {string} layout
	 * @param {LOG_EVENT} logEvent
	 *
	 * @return {string}
	 */
	function format(layout, logEvent) {
	  return _formatLogEvent(_getCompiledLayout(layout), logEvent);
	}
	//# sourceMappingURL=data:application/json;base64,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UyxRQUFULEdBQW9CLFdBQXBCLENBSE07QUFJTixhQUFTLFVBQVQsR0FBc0IsR0FBdEIsQ0FKTTtHQXJCUDtDQUZxQjs7Ozs7Ozs7OztBQXlDZixTQUFTLFVBQVQsQ0FBb0IsTUFBcEIsRUFBNEI7QUFDbEMscUJBQW1CLE1BQW5CLEVBRGtDO0NBQTVCOzs7Ozs7Ozs7OztBQWFBLFNBQVMsTUFBVCxDQUFnQixNQUFoQixFQUF3QixRQUF4QixFQUFrQztBQUN4QyxTQUFPLGdCQUFnQixtQkFBbUIsTUFBbkIsQ0FBaEIsRUFBNEMsUUFBNUMsQ0FBUCxDQUR3QztDQUFsQyIsImZpbGUiOiJmb3JtYXR0ZXIuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcclxuICogbG9nNGpzIDxodHRwczovL2dpdGh1Yi5jb20vYW5pZ2VuZXJvL2xvZzRqcz5cclxuICpcclxuICogQ29weXJpZ2h0IDIwMTYtcHJlc2VudCBSb2JpbiBTY2h1bHR6IDxodHRwOi8vYW5pZ2VuZXJvLmNvbT5cclxuICogUmVsZWFzZWQgdW5kZXIgdGhlIE1JVCBMaWNlbnNlXHJcbiAqL1xyXG5cclxuaW1wb3J0IHtkYXRlRm9ybWF0fSBmcm9tICcuL2RhdGVGb3JtYXR0ZXInO1xyXG5pbXBvcnQgKiBhcyB1dGlsaXR5IGZyb20gJy4vdXRpbGl0eSc7XHJcbmltcG9ydCB7TG9nTGV2ZWx9IGZyb20gJy4vY29uc3QvbG9nTGV2ZWwnO1xyXG5cclxuLyoqIEBjb25zdCAqL1xyXG5jb25zdCBfQ09NTUFORF9SRUdFWCA9IC8lKFthLXosQS1aXSspKD89XFx7fCkvO1xyXG5cclxuLyoqIEB0eXBlIHtPYmplY3R9ICovXHJcbmxldCBfY29tcGlsZWRMYXlvdXRzID0ge307XHJcblxyXG4vKipcclxuICogQGZ1bmN0aW9uXHJcbiAqIEBtZW1iZXJPZiBmb3JtYXR0ZXJcclxuICpcclxuICogQHBhcmFtIHtMT0dfRVZFTlR9IGxvZ0V2ZW50XHJcbiAqXHJcbiAqIEByZXR1cm4ge3N0cmluZ31cclxuICovXHJcbmxldCBfZm9ybWF0TG9nZ2VyID0gZnVuY3Rpb24gKGxvZ0V2ZW50KSB7XHJcblx0cmV0dXJuIGxvZ0V2ZW50LmxvZ2dlcjtcclxufTtcclxuXHJcbi8qKlxyXG4gKiBAZnVuY3Rpb25cclxuICogQG1lbWJlck9mIGZvcm1hdHRlclxyXG4gKlxyXG4gKiBAcGFyYW0ge0xPR19FVkVOVH0gbG9nRXZlbnRcclxuICogQHBhcmFtIHtBcnJheS48c3RyaW5nPn0gcGFyYW1zXHJcbiAqXHJcbiAqIEByZXR1cm4ge3N0cmluZ31cclxuICovXHJcbmxldCBfZm9ybWF0RGF0ZSA9IGZ1bmN0aW9uIChsb2dFdmVudCwgcGFyYW1zKSB7XHJcblx0cmV0dXJuIGRhdGVGb3JtYXQobG9nRXZlbnQuZGF0ZSwgcGFyYW1zWzBdKTtcclxufTtcclxuXHJcbi8qKlxyXG4gKiBAZnVuY3Rpb25cclxuICogQG1lbWJlck9mIGZvcm1hdHRlclxyXG4gKlxyXG4gKiBAcGFyYW0ge0xPR19FVkVOVH0gbG9nRXZlbnRcclxuICpcclxuICogQHJldHVybiB7c3RyaW5nfVxyXG4gKi9cclxubGV0IF9mb3JtYXRFeGNlcHRpb24gPSBmdW5jdGlvbiAobG9nRXZlbnQpIHtcclxuXHJcbiAgICBsZXQgbWVzc2FnZSA9ICcnO1xyXG5cclxuICAgIGlmIChsb2dFdmVudC5lcnJvciAhPSBudWxsKSB7XHJcblxyXG5cdFx0aWYgKGxvZ0V2ZW50LmVycm9yLnN0YWNrICE9IHVuZGVmaW5lZCkge1xyXG5cdFx0XHRsZXQgc3RhY2tzID0gbG9nRXZlbnQuZXJyb3Iuc3RhY2suc3BsaXQoL1xcbi9nKTtcclxuICAgICAgICAgICAgc3RhY2tzLmZvckVhY2goZnVuY3Rpb24gKHN0YWNrKSB7XHJcbiAgICAgICAgICAgICAgICBtZXNzYWdlICs9IGBcXHQke3N0YWNrfVxcbmA7XHJcbiAgICAgICAgICAgIH0pO1xyXG5cdFx0fSBlbHNlIGlmIChsb2dFdmVudC5lcnJvci5tZXNzYWdlICE9IG51bGwgJiYgbG9nRXZlbnQuZXJyb3IubWVzc2FnZSAhPSAnJykge1xyXG5cdFx0XHRtZXNzYWdlICs9IGBcXHQke2xvZ0V2ZW50LmVycm9yLm5hbWV9OiAke2xvZ0V2ZW50LmVycm9yLm1lc3NhZ2V9XFxuYDtcclxuXHRcdH1cclxuXHJcblx0fVxyXG5cclxuXHRyZXR1cm4gbWVzc2FnZTtcclxuXHJcbn07XHJcblxyXG4vKipcclxuICogRm9ybWF0cyB0aGUgZmlsZSAoZS5nLiB0ZXN0LmpzKSB0byB0aGUgZmlsZVxyXG4gKlxyXG4gKiBAcHJpdmF0ZVxyXG4gKiBAZnVuY3Rpb25cclxuICogQG1lbWJlck9mIGZvcm1hdHRlclxyXG4gKlxyXG4gKiBAcGFyYW0ge0xPR19FVkVOVH0gbG9nRXZlbnRcclxuICovXHJcbmxldCBfZm9ybWF0RmlsZSA9IGZ1bmN0aW9uIChsb2dFdmVudCkge1xyXG5cclxuICAgIGlmICghbG9nRXZlbnQuZmlsZSkge1xyXG5cdFx0X2dldEZpbGVEZXRhaWxzKGxvZ0V2ZW50KTtcclxuXHR9XHJcblxyXG5cdHJldHVybiBsb2dFdmVudC5maWxlO1xyXG5cclxufTtcclxuXHJcbi8qKlxyXG4gKiBAZnVuY3Rpb25cclxuICogQG1lbWJlck9mIGZvcm1hdHRlclxyXG4gKlxyXG4gKiBAcGFyYW0ge0xPR19FVkVOVH0gbG9nRXZlbnRcclxuICpcclxuICogQHJldHVybiB7c3RyaW5nfVxyXG4gKi9cclxubGV0IF9mb3JtYXRMaW5lTnVtYmVyID0gZnVuY3Rpb24gKGxvZ0V2ZW50KSB7XHJcblxyXG4gICAgaWYgKCFsb2dFdmVudC5saW5lTnVtYmVyKSB7XHJcblx0XHRfZ2V0RmlsZURldGFpbHMobG9nRXZlbnQpO1xyXG5cdH1cclxuXHJcblx0cmV0dXJuIGAke2xvZ0V2ZW50LmxpbmVOdW1iZXJ9YDtcclxuXHJcbn07XHJcblxyXG4vKipcclxuICogQGZ1bmN0aW9uXHJcbiAqIEBtZW1iZXJPZiBmb3JtYXR0ZXJcclxuICpcclxuICogQHBhcmFtIHtMT0dfRVZFTlR9IGxvZ0V2ZW50XHJcbiAqIEBwYXJhbSB7QXJyYXkuPHN0cmluZz59IHBhcmFtc1xyXG4gKlxyXG4gKiBAcmV0dXJuIHtzdHJpbmd9XHJcbiAqL1xyXG5sZXQgX2Zvcm1hdE1hcE1lc3NhZ2UgPSBmdW5jdGlvbiAobG9nRXZlbnQsIHBhcmFtcykge1xyXG5cdGxldCBtZXNzYWdlID0gbnVsbDtcclxuXHRpZiAobG9nRXZlbnQucHJvcGVydGllcykge1xyXG5cclxuXHRcdG1lc3NhZ2UgPSBbXTtcclxuXHRcdGZvciAobGV0IGtleSBpbiBsb2dFdmVudC5wcm9wZXJ0aWVzKSB7XHJcblx0XHRcdGlmIChwYXJhbXNbMF0pIHtcclxuXHRcdFx0XHRpZiAocGFyYW1zWzBdID09IGtleSkge1xyXG5cdFx0XHRcdFx0bWVzc2FnZS5wdXNoKGxvZ0V2ZW50LnByb3BlcnRpZXNba2V5XSk7XHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9IGVsc2Uge1xyXG5cdFx0XHRcdG1lc3NhZ2UucHVzaCgneycgKyBrZXkgKyAnLCcgKyBsb2dFdmVudC5wcm9wZXJ0aWVzW2tleV0gKyAnfScpO1xyXG5cdFx0XHR9XHJcblx0XHR9XHJcblxyXG5cdFx0cmV0dXJuICd7JyArIG1lc3NhZ2Uuam9pbignLCcpICsgJ30nO1xyXG5cclxuXHR9XHJcblx0cmV0dXJuIG1lc3NhZ2U7XHJcbn07XHJcblxyXG4vKipcclxuICogQGZ1bmN0aW9uXHJcbiAqIEBtZW1iZXJPZiBmb3JtYXR0ZXJcclxuICpcclxuICogQHBhcmFtIHtMT0dfRVZFTlR9IGxvZ0V2ZW50XHJcbiAqXHJcbiAqIEByZXR1cm4ge3N0cmluZ31cclxuICovXHJcbmxldCBfZm9ybWF0TG9nTWVzc2FnZSA9IGZ1bmN0aW9uIChsb2dFdmVudCkge1xyXG5cdHJldHVybiBsb2dFdmVudC5tZXNzYWdlO1xyXG59O1xyXG5cclxuLyoqXHJcbiAqIEBmdW5jdGlvblxyXG4gKiBAbWVtYmVyT2YgZm9ybWF0dGVyXHJcbiAqXHJcbiAqIEBwYXJhbSB7TE9HX0VWRU5UfSBsb2dFdmVudFxyXG4gKlxyXG4gKiBAcmV0dXJuIHtzdHJpbmd9XHJcbiAqL1xyXG5sZXQgX2Zvcm1hdE1ldGhvZE5hbWUgPSBmdW5jdGlvbiAobG9nRXZlbnQpIHtcclxuXHRyZXR1cm4gdXRpbGl0eS5nZXRGdW5jdGlvbk5hbWUobG9nRXZlbnQubWV0aG9kKTtcclxufTtcclxuXHJcbi8qKlxyXG4gKiBAcHJpdmF0ZVxyXG4gKiBAZnVuY3Rpb25cclxuICogQG1lbWJlck9mIGZvcm1hdHRlclxyXG4gKi9cclxubGV0IF9mb3JtYXRMaW5lU2VwYXJhdG9yID0gZnVuY3Rpb24gKCkge1xyXG5cdHJldHVybiAnXFxuJztcclxufTtcclxuXHJcbi8qKlxyXG4gKiBAZnVuY3Rpb25cclxuICogQG1lbWJlck9mIGZvcm1hdHRlclxyXG4gKlxyXG4gKiBAcGFyYW0ge0xPR19FVkVOVH0gbG9nRXZlbnRcclxuICpcclxuICogQHJldHVybiB7c3RyaW5nfVxyXG4gKi9cclxubGV0IF9mb3JtYXRMZXZlbCA9IGZ1bmN0aW9uIChsb2dFdmVudCkge1xyXG5cclxuICAgIHN3aXRjaCAobG9nRXZlbnQubGV2ZWwpIHtcclxuXHJcbiAgICAgICAgY2FzZSBMb2dMZXZlbC5GQVRBTDpcclxuICAgICAgICAgICAgcmV0dXJuICdGQVRBTCc7XHJcbiAgICAgICAgY2FzZSBMb2dMZXZlbC5FUlJPUjpcclxuICAgICAgICAgICAgcmV0dXJuICdFUlJPUic7XHJcbiAgICAgICAgY2FzZSBMb2dMZXZlbC5XQVJOOlxyXG4gICAgICAgICAgICByZXR1cm4gJ1dBUk4nO1xyXG4gICAgICAgIGNhc2UgTG9nTGV2ZWwuSU5GTzpcclxuICAgICAgICAgICAgcmV0dXJuICdJTkZPJztcclxuICAgICAgICBjYXNlIExvZ0xldmVsLkRFQlVHOlxyXG4gICAgICAgICAgICByZXR1cm4gJ0RFQlVHJztcclxuICAgICAgICBjYXNlIExvZ0xldmVsLlRSQUNFOlxyXG4gICAgICAgIGRlZmF1bHQ6XHJcbiAgICAgICAgICAgIHJldHVybiAnVFJBQ0UnO1xyXG5cclxuICAgIH1cclxuXHJcbn07XHJcblxyXG4vKipcclxuICogQGZ1bmN0aW9uXHJcbiAqIEBtZW1iZXJPZiBmb3JtYXR0ZXJcclxuICpcclxuICogQHBhcmFtIHtMT0dfRVZFTlR9IGxvZ0V2ZW50XHJcbiAqXHJcbiAqIEByZXR1cm4ge3N0cmluZ31cclxuICovXHJcbmxldCBfZm9ybWF0UmVsYXRpdmUgPSBmdW5jdGlvbiAobG9nRXZlbnQpIHtcclxuXHRyZXR1cm4gJycgKyBsb2dFdmVudC5yZWxhdGl2ZTtcclxufTtcclxuXHJcbi8qKlxyXG4gKiBAZnVuY3Rpb25cclxuICogQG1lbWJlck9mIGZvcm1hdHRlclxyXG4gKlxyXG4gKiBAcGFyYW0ge0xPR19FVkVOVH0gbG9nRXZlbnRcclxuICpcclxuICogQHJldHVybiB7c3RyaW5nfVxyXG4gKi9cclxubGV0IF9mb3JtYXRTZXF1ZW5jZU51bWJlciA9IGZ1bmN0aW9uIChsb2dFdmVudCkge1xyXG5cdHJldHVybiAnJyArIGxvZ0V2ZW50LnNlcXVlbmNlO1xyXG59O1xyXG5cclxubGV0IF9mb3JtYXR0ZXJzID0ge1xyXG5cdCdjfGxvZ2dlcicgOiBfZm9ybWF0TG9nZ2VyLFxyXG5cdCdkfGRhdGUnIDogX2Zvcm1hdERhdGUsXHJcblx0J2V4fGV4Y2VwdGlvbnx0aHJvd2FibGUnIDogX2Zvcm1hdEV4Y2VwdGlvbixcclxuXHQnRnxmaWxlJyA6IF9mb3JtYXRGaWxlLFxyXG5cdCdLfG1hcHxNQVAnIDogX2Zvcm1hdE1hcE1lc3NhZ2UsXHJcblx0J0x8bGluZScgOiBfZm9ybWF0TGluZU51bWJlcixcclxuXHQnbXxtc2d8bWVzc2FnZScgOiBfZm9ybWF0TG9nTWVzc2FnZSxcclxuXHQnTXxtZXRob2QnIDogX2Zvcm1hdE1ldGhvZE5hbWUsXHJcblx0J24nIDogX2Zvcm1hdExpbmVTZXBhcmF0b3IsXHJcblx0J3B8bGV2ZWwnIDogX2Zvcm1hdExldmVsLFxyXG5cdCdyfHJlbGF0aXZlJyA6IF9mb3JtYXRSZWxhdGl2ZSxcclxuXHQnc258c2VxdWVuY2VOdW1iZXInIDogX2Zvcm1hdFNlcXVlbmNlTnVtYmVyXHJcbn07XHJcblxyXG4vKipcclxuICogR2V0IHRoZSBjb21waWxlZCBsYXlvdXQgZm9yIHRoZSBzcGVjaWZpZWQgbGF5b3V0IHN0cmluZy4gSWYgdGhlIGNvbXBpbGVkIGxheW91dCBkb2VzIG5vdFxyXG4gKiBleGlzdCwgdGhlbiB3ZSB3YW50IHRvIGNyZWF0ZSBpdC5cclxuICpcclxuICogQGZ1bmN0aW9uXHJcbiAqIEBtZW1iZXJPZiBmb3JtYXR0ZXJcclxuICpcclxuICogQHBhcmFtIHtzdHJpbmd9IGxheW91dFxyXG4gKlxyXG4gKiBAcmV0dXJuIHtBcnJheS48c3RyaW5nfGZ1bmN0aW9uPn1cclxuICovXHJcbmxldCBfZ2V0Q29tcGlsZWRMYXlvdXQgPSBmdW5jdGlvbiAobGF5b3V0KSB7XHJcblxyXG5cdGlmIChfY29tcGlsZWRMYXlvdXRzW2xheW91dF0pIHtcclxuXHRcdHJldHVybiBfY29tcGlsZWRMYXlvdXRzW2xheW91dF07XHJcblx0fVxyXG5cclxuXHRyZXR1cm4gX2NvbXBpbGVMYXlvdXQobGF5b3V0KTtcclxuXHJcbn07XHJcblxyXG4vKipcclxuICogQ29tcGlsZXMgYSBsYXlvdXQgaW50byBhbiBhcnJheS4gVGhlIGFycmF5IGNvbnRhaW5zIGZ1bmN0aW9uc1xyXG4gKlxyXG4gKiBAZnVuY3Rpb25cclxuICogQG1lbWJlck9mIGZvcm1hdHRlclxyXG4gKlxyXG4gKiBAcGFyYW0ge3N0cmluZ30gbGF5b3V0XHJcbiAqXHJcbiAqIEByZXR1cm4ge0FycmF5LjxzdHJpbmd8ZnVuY3Rpb24+fVxyXG4gKi9cclxubGV0IF9jb21waWxlTGF5b3V0ID0gZnVuY3Rpb24gKGxheW91dCkge1xyXG5cclxuXHRsZXQgaW5kZXggPSBsYXlvdXQuaW5kZXhPZignJScpO1xyXG5cdGxldCBjdXJyZW50Rm9ybWF0U3RyaW5nID0gJyc7XHJcblx0bGV0IGZvcm1hdEFycmF5ID0gW107XHJcblxyXG5cdGlmIChpbmRleCAhPSAwKSB7XHJcblx0XHRmb3JtYXRBcnJheS5wdXNoKGxheW91dC5zdWJzdHJpbmcoMCwgaW5kZXgpKTtcclxuXHR9XHJcblxyXG5cdGRvIHtcclxuXHJcblx0XHRsZXQgc3RhcnRJbmRleCA9IGluZGV4O1xyXG5cdFx0bGV0IGVuZEluZGV4ID0gaW5kZXggPSBsYXlvdXQuaW5kZXhPZignJScsIGluZGV4ICsgMSk7XHJcblxyXG5cdFx0aWYgKGVuZEluZGV4IDwgMCkge1xyXG5cdFx0XHRjdXJyZW50Rm9ybWF0U3RyaW5nID0gbGF5b3V0LnN1YnN0cmluZyhzdGFydEluZGV4KTtcclxuXHRcdH0gZWxzZSB7XHJcblx0XHRcdGN1cnJlbnRGb3JtYXRTdHJpbmcgPSBsYXlvdXQuc3Vic3RyaW5nKHN0YXJ0SW5kZXgsIGVuZEluZGV4KTtcclxuXHRcdH1cclxuXHJcblx0XHRmb3JtYXRBcnJheS5wdXNoKF9nZXRGb3JtYXR0ZXJPYmplY3QoY3VycmVudEZvcm1hdFN0cmluZykpO1xyXG5cclxuXHR9IHdoaWxlIChpbmRleCA+IC0xKTtcclxuXHJcbiAgICAvLyBzZXQgdGhlIGZvcm1hdCBhcnJheSB0byB0aGUgc3BlY2lmaWVkIGNvbXBpbGVkIGxheW91dFxyXG5cdF9jb21waWxlZExheW91dHNbbGF5b3V0XSA9IGZvcm1hdEFycmF5O1xyXG5cclxuXHRyZXR1cm4gZm9ybWF0QXJyYXk7XHJcblxyXG59O1xyXG5cclxuLyoqXHJcbiAqIEBmdW5jdGlvblxyXG4gKiBAbWVtYmVyT2YgZm9ybWF0dGVyXHJcbiAqXHJcbiAqIEBwYXJhbSB7c3RyaW5nfSBmb3JtYXRTdHJpbmdcclxuICpcclxuICogQHJldHVybiB7T2JqZWN0fHN0cmluZ31cclxuICovXHJcbmxldCBfZ2V0Rm9ybWF0dGVyT2JqZWN0ID0gZnVuY3Rpb24gKGZvcm1hdFN0cmluZykge1xyXG5cclxuXHRsZXQgcmVzdWx0ID0gX0NPTU1BTkRfUkVHRVguZXhlYyhmb3JtYXRTdHJpbmcpO1xyXG5cdGlmIChyZXN1bHQgIT0gbnVsbCAmJiByZXN1bHQubGVuZ3RoID09IDIpIHtcclxuXHJcblx0XHRsZXQgZm9ybWF0dGVyID0gX2dldEZvcm1hdHRlckZ1bmN0aW9uKHJlc3VsdFsxXSk7XHJcblx0XHRpZiAoIWZvcm1hdHRlcikge1xyXG5cdFx0XHRyZXR1cm4gbnVsbDtcclxuXHRcdH1cclxuXHJcblx0XHRsZXQgcGFyYW1zID0gX2dldExheW91dFRhZ1BhcmFtcyhmb3JtYXRTdHJpbmcpO1xyXG5cclxuXHRcdGxldCBhZnRlciA9ICcnO1xyXG5cdFx0bGV0IGVuZEluZGV4ID0gZm9ybWF0U3RyaW5nLmxhc3RJbmRleE9mKCd9Jyk7XHJcblx0XHRpZiAoZW5kSW5kZXggIT0gLTEpIHtcclxuXHRcdFx0YWZ0ZXIgPSBmb3JtYXRTdHJpbmcuc3Vic3RyaW5nKGVuZEluZGV4ICsgMSk7XHJcblx0XHR9IGVsc2Uge1xyXG5cdFx0XHRhZnRlciA9IGZvcm1hdFN0cmluZy5zdWJzdHJpbmcocmVzdWx0LmluZGV4ICsgcmVzdWx0WzFdLmxlbmd0aCArIDEpO1xyXG5cdFx0fVxyXG5cclxuXHRcdHJldHVybiB7XHJcblx0XHRcdCdmb3JtYXR0ZXInIDogZm9ybWF0dGVyLFxyXG5cdFx0XHQncGFyYW1zJyA6IHBhcmFtcyxcclxuXHRcdFx0J2FmdGVyJyA6IGFmdGVyXHJcblx0XHR9O1xyXG5cclxuXHR9XHJcblxyXG5cdHJldHVybiBmb3JtYXRTdHJpbmc7XHJcblxyXG59O1xyXG5cclxuLyoqXHJcbiAqIERldGVybWluZXMgd2hhdCBmb3JtYXR0ZXIgZnVuY3Rpb24gaGFzIGJlZW4gY29uZmlndXJlZFxyXG4gKlxyXG4gKiBAZnVuY3Rpb25cclxuICogQG1lbWJlck9mIGZvcm1hdHRlclxyXG4gKlxyXG4gKiBAcGFyYW0ge3N0cmluZ30gY29tbWFuZFxyXG4gKlxyXG4gKiBAcmV0dXJuIHs/c3RyaW5nfVxyXG4gKi9cclxubGV0IF9nZXRGb3JtYXR0ZXJGdW5jdGlvbiA9IGZ1bmN0aW9uIChjb21tYW5kKSB7XHJcblxyXG5cdGxldCByZWdleDtcclxuXHRmb3IgKGxldCBrZXkgaW4gX2Zvcm1hdHRlcnMpIHtcclxuICAgICAgICBpZiAoX2Zvcm1hdHRlcnMuaGFzT3duUHJvcGVydHkoa2V5KSkge1xyXG4gICAgICAgICAgICByZWdleCA9IG5ldyBSZWdFeHAoJ14oJyArIGtleSArICcpJCcpO1xyXG4gICAgICAgICAgICBpZiAocmVnZXguZXhlYyhjb21tYW5kKSkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIF9mb3JtYXR0ZXJzW2tleV07XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblx0fVxyXG5cclxuXHRyZXR1cm4gbnVsbDtcclxuXHJcbn07XHJcblxyXG4vKipcclxuICogR2V0cyB0aGUgbGF5b3V0IHRhZyBwYXJhbXMgYXNzb2NpYXRlZCB3aXRoIHRoZSBsYXlvdXQgdGFnLiBTbywgZm9yIGV4YW1wbGUsICclZHt5eXl5LU1NLWRkfWBcclxuICogd291bGQgb3V0cHV0IGFuIGFycmF5IG9mIFsneXl5eS1NTS1kZCddXHJcbiAqXHJcbiAqIEBwcml2YXRlXHJcbiAqIEBmdW5jdGlvblxyXG4gKlxyXG4gKiBAcGFyYW0ge3N0cmluZ30gY29tbWFuZFxyXG4gKlxyXG4gKiBAcmV0dXJuIHtBcnJheS48c3RyaW5nPn1cclxuICovXHJcbmxldCBfZ2V0TGF5b3V0VGFnUGFyYW1zID0gZnVuY3Rpb24gKGNvbW1hbmQpIHtcclxuXHJcblx0bGV0IHBhcmFtcyA9IFtdO1xyXG5cdGxldCByZXN1bHQgPSBjb21tYW5kLm1hdGNoKC9cXHsoW159XSopKD89fSkvZyk7XHJcblx0aWYgKHJlc3VsdCAhPSBudWxsKSB7XHJcblx0XHRmb3IgKGxldCBpID0gMDsgaSA8IHJlc3VsdC5sZW5ndGg7IGkrKykge1xyXG5cdFx0XHRwYXJhbXMucHVzaChyZXN1bHRbaV0uc3Vic3RyaW5nKDEpKTtcclxuXHRcdH1cclxuXHR9XHJcblxyXG5cdHJldHVybiBwYXJhbXM7XHJcblxyXG59O1xyXG5cclxuLyoqXHJcbiAqIEhhbmRsZXMgZm9ybWF0dGluZyB0aGUgbG9nIGV2ZW50IHVzaW5nIHRoZSBzcGVjaWZpZWQgZm9ybWF0dGVyIGFycmF5XHJcbiAqXHJcbiAqIEBwcml2YXRlXHJcbiAqIEBmdW5jdGlvblxyXG4gKlxyXG4gKiBAcGFyYW0ge0FycmF5LjxmdW5jdGlvbnxzdHJpbmc+fSBmb3JtYXR0ZXJcclxuICogQHBhcmFtIHtMT0dfRVZFTlR9IGxvZ0V2ZW50XHJcbiAqXHJcbiAqIEByZXR1cm4ge3N0cmluZ31cclxuICovXHJcbmxldCBfZm9ybWF0TG9nRXZlbnQgPSBmdW5jdGlvbiAoZm9ybWF0dGVyLCBsb2dFdmVudCkge1xyXG5cclxuXHRsZXQgcmVzcG9uc2U7XHJcblx0bGV0IG1lc3NhZ2UgPSAnJztcclxuXHRsZXQgY291bnQgPSBmb3JtYXR0ZXIubGVuZ3RoO1xyXG5cdGZvciAobGV0IGkgPSAwOyBpIDwgY291bnQ7IGkrKykge1xyXG5cdFx0aWYgKGZvcm1hdHRlcltpXSAhPT0gbnVsbCkge1xyXG5cclxuXHRcdFx0aWYgKGZvcm1hdHRlcltpXSBpbnN0YW5jZW9mIE9iamVjdCkge1xyXG5cclxuXHRcdFx0XHRyZXNwb25zZSA9IGZvcm1hdHRlcltpXS5mb3JtYXR0ZXIobG9nRXZlbnQsIGZvcm1hdHRlcltpXS5wYXJhbXMpO1xyXG5cdFx0XHRcdGlmIChyZXNwb25zZSAhPSBudWxsKSB7XHJcblx0XHRcdFx0XHRtZXNzYWdlICs9IHJlc3BvbnNlO1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0XHRtZXNzYWdlICs9IGZvcm1hdHRlcltpXS5hZnRlcjtcclxuXHJcblx0XHRcdH0gZWxzZSB7XHJcblx0XHRcdFx0bWVzc2FnZSArPSBmb3JtYXR0ZXJbaV07XHJcblx0XHRcdH1cclxuXHJcblx0XHR9XHJcblx0fVxyXG5cclxuXHRyZXR1cm4gbWVzc2FnZS50cmltKCk7XHJcblxyXG59O1xyXG5cclxuLyoqXHJcbiAqXHJcbiAqIEBwcml2YXRlXHJcbiAqIEBmdW5jdGlvblxyXG4gKiBAbWVtYmVyT2YgZm9ybWF0dGVyXHJcbiAqXHJcbiAqIEBwYXJhbSB7TE9HX0VWRU5UfSBsb2dFdmVudFxyXG4gKi9cclxubGV0IF9nZXRGaWxlRGV0YWlscyA9IGZ1bmN0aW9uIChsb2dFdmVudCkge1xyXG5cclxuXHRpZiAobG9nRXZlbnQubG9nRXJyb3JTdGFjaykge1xyXG5cclxuXHRcdGxldCBwYXJ0cyA9IGxvZ0V2ZW50LmxvZ0Vycm9yU3RhY2suc3RhY2suc3BsaXQoL1xcbi9nKTtcclxuXHRcdGxldCBmaWxlID0gcGFydHNbM107XHJcblx0XHRmaWxlID0gZmlsZS5yZXBsYWNlKC9hdCAoLipcXCh8KShmaWxlfGh0dHB8aHR0cHN8KSg6fCkoXFwvfCkqLywgJycpO1xyXG5cdFx0ZmlsZSA9IGZpbGUucmVwbGFjZSgnKScsICcnKTtcclxuXHRcdGZpbGUgPSBmaWxlLnJlcGxhY2UoKHR5cGVvZiBsb2NhdGlvbiAhPT0gJ3VuZGVmaW5lZCcpID8gbG9jYXRpb24uaG9zdCA6ICcnLCAnJykudHJpbSgpO1xyXG5cclxuXHRcdGxldCBmaWxlUGFydHMgPSBmaWxlLnNwbGl0KC9cXDovZyk7XHJcblxyXG5cdFx0bG9nRXZlbnQuY29sdW1uID0gZmlsZVBhcnRzLnBvcCgpO1xyXG5cdFx0bG9nRXZlbnQubGluZU51bWJlciA9IGZpbGVQYXJ0cy5wb3AoKTtcclxuXHJcblx0XHRpZiAodHlwZW9mIGRlZmluZSAhPT0gJ3VuZGVmaW5lZCcpIHtcclxuXHRcdFx0bGV0IHBhdGggPSByZXF1aXJlKCdwYXRoJyk7XHJcblx0XHRcdGxldCBhcHBEaXIgPSBwYXRoLmRpcm5hbWUocmVxdWlyZS5tYWluLmZpbGVuYW1lKTtcclxuXHRcdFx0bG9nRXZlbnQuZmlsZW5hbWUgPSBmaWxlUGFydHMuam9pbignOicpLnJlcGxhY2UoYXBwRGlyLCAnJykucmVwbGFjZSgvKFxcXFx8XFwvKS8sICcnKTtcclxuXHRcdH0gZWxzZSB7XHJcblx0XHRcdGxvZ0V2ZW50LmZpbGVuYW1lID0gZmlsZVBhcnRzLmpvaW4oJzonKTtcclxuXHRcdH1cclxuXHJcblx0fSBlbHNlIHtcclxuXHJcblx0XHRsb2dFdmVudC5jb2x1bW4gPSAnPyc7XHJcblx0XHRsb2dFdmVudC5maWxlbmFtZSA9ICdhbm9ueW1vdXMnO1xyXG5cdFx0bG9nRXZlbnQubGluZU51bWJlciA9ICc/JztcclxuXHJcblx0fVxyXG5cclxufTtcclxuXHJcbi8qKlxyXG4gKiBAZnVuY3Rpb25cclxuICogQG1lbWJlck9mIGZvcm1hdHRlclxyXG4gKlxyXG4gKiBAcGFyYW0ge3N0cmluZ30gbGF5b3V0XHJcbiAqXHJcbiAqIEByZXR1cm4ge3N0cmluZ31cclxuICovXHJcbmV4cG9ydCBmdW5jdGlvbiBwcmVDb21waWxlKGxheW91dCkge1xyXG5cdF9nZXRDb21waWxlZExheW91dChsYXlvdXQpO1xyXG59XHJcblxyXG4vKipcclxuICogQGZ1bmN0aW9uXHJcbiAqIEBtZW1iZXJPZiBmb3JtYXR0ZXJcclxuICpcclxuICogQHBhcmFtIHtzdHJpbmd9IGxheW91dFxyXG4gKiBAcGFyYW0ge0xPR19FVkVOVH0gbG9nRXZlbnRcclxuICpcclxuICogQHJldHVybiB7c3RyaW5nfVxyXG4gKi9cclxuZXhwb3J0IGZ1bmN0aW9uIGZvcm1hdChsYXlvdXQsIGxvZ0V2ZW50KSB7XHJcblx0cmV0dXJuIF9mb3JtYXRMb2dFdmVudChfZ2V0Q29tcGlsZWRMYXlvdXQobGF5b3V0KSwgbG9nRXZlbnQpO1xyXG59XHJcbiJdfQ==

/***/ },
/* 2 */
/***/ function(module, exports) {

	/*istanbul ignore next*/'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	exports.dateFormat = dateFormat;
	/**
	 * log4js <https://github.com/anigenero/log4js2>
	 *
	 * Copyright 2016-present Robin Schultz <http://anigenero.com>
	 * Released under the MIT License
	 */

	let i18n = {
		'd': ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
		'm': ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec', 'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
	};

	const TOKEN = /d{1,4}|M{1,4}|yy(?:yy)?|([HhmsAa])\1?|[LloSZ]|'[^']*'|'[^']*'/g;
	const TIMEZONE = /\b(?:[PMCEA][SDP]T|(?:Pacific|Mountain|Central|Eastern|Atlantic) (?:Standard|Daylight|Prevailing) Time|(?:GMT|UTC)(?:[-+]\d{4})?)\b/g;
	const TIMEZONE_CLIP = /[^-+\dA-Z]/g;

	/**
	 * Predefined DATE formats (specified by logj2)
	 * @private
	 * @type {{DEFAULT: string, ABSOLUTE: string, COMPACT: string, DATE: string, ISO8601: string, ISO8601_BASIC: string}}
	 */
	const _PREDEFINED = {
		'DEFAULT': 'yyyy-MM-dd HH:mm:ss,S',
		'ABSOLUTE': 'HH:MM:ss,S',
		'COMPACT': 'yyyyMMddHHmmssS',
		'DATE': 'dd MMM yyyy HH:mm:ss,S',
		'ISO8601': 'yyyy-MM-ddTHH:mm:ss,S',
		'ISO8601_BASIC': 'yyyyMMddTHHmmss,S'
	};

	/**
	 * Pads numbers in the date format
	 *
	 * @param value
	 * @param length
	 *
	 * @returns {?string}
	 */
	function pad(value, length) {

		value = String(value);
		length = length || 2;

		while (value.length < length) {
			value = '0' + value;
		}

		return value;
	}

	/**
	 * Formats the date
	 * @param date
	 * @param mask
	 * @returns {string}
	 */
	function dateFormat(date, mask) {

		if (_PREDEFINED[mask]) {
			mask = _PREDEFINED[mask];
		} else {
			mask = String(mask || _PREDEFINED.DEFAULT);
		}

		// check if the date format is set for UTC
		let isUTC = mask.slice(0, 4) == 'UTC:';
		if (isUTC) {
			mask = mask.slice(4);
		}

		let prefix = isUTC ? 'getUTC' : 'get';
		let day = date[prefix + 'Day']();
		let month = date[prefix + 'Month']();
		let fullYear = date[prefix + 'FullYear']();
		let hours = date[prefix + 'Hours']();
		let minutes = date[prefix + 'Minutes']();
		let seconds = date[prefix + 'Seconds']();
		let milliseconds = date[prefix + 'Milliseconds']();
		let offset = isUTC ? 0 : date.getTimezoneOffset();

		let flags = {
			'd': date.getDate(),
			'dd': pad(date.getDate()),
			'ddd': i18n.d[day],
			'dddd': i18n.d[day + 7],
			'M': month + 1,
			'MM': pad(month + 1),
			'MMM': i18n.m[month],
			'MMMM': i18n.m[month + 12],
			'yy': String(fullYear).slice(2),
			'yyyy': fullYear,
			'h': hours % 12 || 12,
			'hh': pad(hours % 12 || 12),
			'H': hours,
			'HH': pad(hours),
			'm': minutes,
			'mm': pad(minutes),
			's': seconds,
			'ss': pad(seconds),
			'S': pad(milliseconds, 1),
			'a': hours < 12 ? 'a' : 'p',
			'aa': hours < 12 ? 'am' : 'pm',
			'A': hours < 12 ? 'A' : 'P',
			'AA': hours < 12 ? 'AM' : 'PM',
			'Z': isUTC ? 'UTC' : (String(date).match(TIMEZONE) || ['']).pop().replace(TIMEZONE_CLIP, ''),
			'o': (offset > 0 ? '-' : '+') + pad(Math.floor(Math.abs(offset) / 60) * 100 + Math.abs(offset) % 60, 4)
		};

		return mask.replace(TOKEN, function ($0) {
			return $0 in flags ? flags[$0] : $0;
		});
	}
	//# sourceMappingURL=data:application/json;base64,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VCxJQUFtQixFQUFuQixDQUFYLEdBQW9DLEdBQXBDLEdBQTBDLEtBQUssR0FBTCxDQUFTLE1BQVQsSUFBbUIsRUFBbkIsRUFBdUIsQ0FBckUsQ0FBM0I7RUF6QkgsQ0F4QmtDOztBQW9EdEMsUUFBTyxLQUFLLE9BQUwsQ0FBYSxLQUFiLEVBQW9CLFVBQVUsRUFBVixFQUFjO0FBQ3hDLFNBQU8sTUFBTSxLQUFOLEdBQWMsTUFBTSxFQUFOLENBQWQsR0FBMEIsRUFBMUIsQ0FEaUM7RUFBZCxDQUEzQixDQXBEc0M7Q0FBaEMiLCJmaWxlIjoiZGF0ZUZvcm1hdHRlci5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxyXG4gKiBsb2c0anMgPGh0dHBzOi8vZ2l0aHViLmNvbS9hbmlnZW5lcm8vbG9nNGpzMj5cclxuICpcclxuICogQ29weXJpZ2h0IDIwMTYtcHJlc2VudCBSb2JpbiBTY2h1bHR6IDxodHRwOi8vYW5pZ2VuZXJvLmNvbT5cclxuICogUmVsZWFzZWQgdW5kZXIgdGhlIE1JVCBMaWNlbnNlXHJcbiAqL1xyXG5cclxubGV0IGkxOG4gPSB7XHJcblx0J2QnIDogWyAnU3VuJywgJ01vbicsICdUdWUnLCAnV2VkJywgJ1RodScsICdGcmknLCAnU2F0JywgJ1N1bmRheScsICdNb25kYXknLFxyXG5cdFx0J1R1ZXNkYXknLCAnV2VkbmVzZGF5JywgJ1RodXJzZGF5JywgJ0ZyaWRheScsICdTYXR1cmRheScgXSxcclxuXHQnbScgOiBbICdKYW4nLCAnRmViJywgJ01hcicsICdBcHInLCAnTWF5JywgJ0p1bicsICdKdWwnLCAnQXVnJywgJ1NlcCcsXHJcblx0XHQnT2N0JywgJ05vdicsICdEZWMnLCAnSmFudWFyeScsICdGZWJydWFyeScsICdNYXJjaCcsICdBcHJpbCcsICdNYXknLCAnSnVuZScsXHJcblx0XHQnSnVseScsICdBdWd1c3QnLCAnU2VwdGVtYmVyJywgJ09jdG9iZXInLCAnTm92ZW1iZXInLCAnRGVjZW1iZXInIF1cclxufTtcclxuXHJcbmNvbnN0IFRPS0VOID0gL2R7MSw0fXxNezEsNH18eXkoPzp5eSk/fChbSGhtc0FhXSlcXDE/fFtMbG9TWl18J1teJ10qJ3wnW14nXSonL2c7XHJcbmNvbnN0IFRJTUVaT05FID0gL1xcYig/OltQTUNFQV1bU0RQXVR8KD86UGFjaWZpY3xNb3VudGFpbnxDZW50cmFsfEVhc3Rlcm58QXRsYW50aWMpICg/OlN0YW5kYXJkfERheWxpZ2h0fFByZXZhaWxpbmcpIFRpbWV8KD86R01UfFVUQykoPzpbLStdXFxkezR9KT8pXFxiL2c7XHJcbmNvbnN0IFRJTUVaT05FX0NMSVAgPSAvW14tK1xcZEEtWl0vZztcclxuXHJcbi8qKlxyXG4gKiBQcmVkZWZpbmVkIERBVEUgZm9ybWF0cyAoc3BlY2lmaWVkIGJ5IGxvZ2oyKVxyXG4gKiBAcHJpdmF0ZVxyXG4gKiBAdHlwZSB7e0RFRkFVTFQ6IHN0cmluZywgQUJTT0xVVEU6IHN0cmluZywgQ09NUEFDVDogc3RyaW5nLCBEQVRFOiBzdHJpbmcsIElTTzg2MDE6IHN0cmluZywgSVNPODYwMV9CQVNJQzogc3RyaW5nfX1cclxuICovXHJcbmNvbnN0IF9QUkVERUZJTkVEID0ge1xyXG4gICAgJ0RFRkFVTFQnIDogJ3l5eXktTU0tZGQgSEg6bW06c3MsUycsXHJcbiAgICAnQUJTT0xVVEUnIDogJ0hIOk1NOnNzLFMnLFxyXG4gICAgJ0NPTVBBQ1QnIDogJ3l5eXlNTWRkSEhtbXNzUycsXHJcbiAgICAnREFURScgOiAnZGQgTU1NIHl5eXkgSEg6bW06c3MsUycsXHJcbiAgICAnSVNPODYwMScgOiAneXl5eS1NTS1kZFRISDptbTpzcyxTJyxcclxuICAgICdJU084NjAxX0JBU0lDJyA6ICd5eXl5TU1kZFRISG1tc3MsUydcclxufTtcclxuXHJcbi8qKlxyXG4gKiBQYWRzIG51bWJlcnMgaW4gdGhlIGRhdGUgZm9ybWF0XHJcbiAqXHJcbiAqIEBwYXJhbSB2YWx1ZVxyXG4gKiBAcGFyYW0gbGVuZ3RoXHJcbiAqXHJcbiAqIEByZXR1cm5zIHs/c3RyaW5nfVxyXG4gKi9cclxuZnVuY3Rpb24gcGFkKHZhbHVlLCBsZW5ndGgpIHtcclxuXHJcbiAgICB2YWx1ZSA9IFN0cmluZyh2YWx1ZSk7XHJcblx0bGVuZ3RoID0gbGVuZ3RoIHx8IDI7XHJcblxyXG4gICAgd2hpbGUgKHZhbHVlLmxlbmd0aCA8IGxlbmd0aCkge1xyXG5cdFx0dmFsdWUgPSAnMCcgKyB2YWx1ZTtcclxuXHR9XHJcblxyXG5cdHJldHVybiB2YWx1ZTtcclxuXHJcbn1cclxuXHJcbi8qKlxyXG4gKiBGb3JtYXRzIHRoZSBkYXRlXHJcbiAqIEBwYXJhbSBkYXRlXHJcbiAqIEBwYXJhbSBtYXNrXHJcbiAqIEByZXR1cm5zIHtzdHJpbmd9XHJcbiAqL1xyXG5leHBvcnQgZnVuY3Rpb24gZGF0ZUZvcm1hdChkYXRlLCBtYXNrKSB7XHJcblxyXG4gICAgaWYgKF9QUkVERUZJTkVEW21hc2tdKSB7XHJcbiAgICAgICAgbWFzayA9IF9QUkVERUZJTkVEW21hc2tdO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgICBtYXNrID0gU3RyaW5nKG1hc2sgfHwgX1BSRURFRklORUQuREVGQVVMVCk7XHJcbiAgICB9XHJcblxyXG4gICAgLy8gY2hlY2sgaWYgdGhlIGRhdGUgZm9ybWF0IGlzIHNldCBmb3IgVVRDXHJcbiAgICBsZXQgaXNVVEMgPSAobWFzay5zbGljZSgwLCA0KSA9PSAnVVRDOicpO1xyXG5cdGlmIChpc1VUQykge1xyXG5cdFx0bWFzayA9IG1hc2suc2xpY2UoNCk7XHJcblx0fVxyXG5cclxuXHRsZXQgcHJlZml4ID0gaXNVVEMgPyAnZ2V0VVRDJyA6ICdnZXQnO1xyXG5cdGxldCBkYXkgPSBkYXRlW3ByZWZpeCArICdEYXknXSgpO1xyXG5cdGxldCBtb250aCA9IGRhdGVbcHJlZml4ICsgJ01vbnRoJ10oKTtcclxuXHRsZXQgZnVsbFllYXIgPSBkYXRlW3ByZWZpeCArICdGdWxsWWVhciddKCk7XHJcblx0bGV0IGhvdXJzID0gZGF0ZVtwcmVmaXggKyAnSG91cnMnXSgpO1xyXG5cdGxldCBtaW51dGVzID0gZGF0ZVtwcmVmaXggKyAnTWludXRlcyddKCk7XHJcblx0bGV0IHNlY29uZHMgPSBkYXRlW3ByZWZpeCArICdTZWNvbmRzJ10oKTtcclxuXHRsZXQgbWlsbGlzZWNvbmRzID0gZGF0ZVtwcmVmaXggKyAnTWlsbGlzZWNvbmRzJ10oKTtcclxuXHRsZXQgb2Zmc2V0ID0gaXNVVEMgPyAwIDogZGF0ZS5nZXRUaW1lem9uZU9mZnNldCgpO1xyXG5cclxuXHRsZXQgZmxhZ3MgPSB7XHJcblx0XHQnZCcgOiBkYXRlLmdldERhdGUoKSxcclxuXHRcdCdkZCcgOiBwYWQoZGF0ZS5nZXREYXRlKCkpLFxyXG5cdFx0J2RkZCcgOiBpMThuLmRbZGF5XSxcclxuXHRcdCdkZGRkJyA6IGkxOG4uZFtkYXkgKyA3XSxcclxuXHRcdCdNJyA6IG1vbnRoICsgMSxcclxuXHRcdCdNTScgOiBwYWQobW9udGggKyAxKSxcclxuXHRcdCdNTU0nIDogaTE4bi5tW21vbnRoXSxcclxuXHRcdCdNTU1NJyA6IGkxOG4ubVttb250aCArIDEyXSxcclxuXHRcdCd5eScgOiBTdHJpbmcoZnVsbFllYXIpLnNsaWNlKDIpLFxyXG5cdFx0J3l5eXknIDogZnVsbFllYXIsXHJcblx0XHQnaCcgOiBob3VycyAlIDEyIHx8IDEyLFxyXG5cdFx0J2hoJyA6IHBhZChob3VycyAlIDEyIHx8IDEyKSxcclxuXHRcdCdIJyA6IGhvdXJzLFxyXG5cdFx0J0hIJyA6IHBhZChob3VycyksXHJcblx0XHQnbScgOiBtaW51dGVzLFxyXG5cdFx0J21tJyA6IHBhZChtaW51dGVzKSxcclxuXHRcdCdzJyA6IHNlY29uZHMsXHJcblx0XHQnc3MnIDogcGFkKHNlY29uZHMpLFxyXG5cdFx0J1MnIDogcGFkKG1pbGxpc2Vjb25kcywgMSksXHJcblx0XHQnYScgOiBob3VycyA8IDEyID8gJ2EnIDogJ3AnLFxyXG5cdFx0J2FhJyA6IGhvdXJzIDwgMTIgPyAnYW0nIDogJ3BtJyxcclxuXHRcdCdBJyA6IGhvdXJzIDwgMTIgPyAnQScgOiAnUCcsXHJcblx0XHQnQUEnIDogaG91cnMgPCAxMiA/ICdBTScgOiAnUE0nLFxyXG5cdFx0J1onIDogaXNVVEMgPyAnVVRDJyA6IChTdHJpbmcoZGF0ZSkubWF0Y2goVElNRVpPTkUpIHx8IFsgJycgXSkucG9wKCkucmVwbGFjZShUSU1FWk9ORV9DTElQLCAnJyksXHJcblx0XHQnbycgOiAob2Zmc2V0ID4gMCA/ICctJyA6ICcrJykgKyBwYWQoTWF0aC5mbG9vcihNYXRoLmFicyhvZmZzZXQpIC8gNjApICogMTAwICsgTWF0aC5hYnMob2Zmc2V0KSAlIDYwLCA0KVxyXG5cdH07XHJcblxyXG5cdHJldHVybiBtYXNrLnJlcGxhY2UoVE9LRU4sIGZ1bmN0aW9uICgkMCkge1xyXG5cdFx0cmV0dXJuICQwIGluIGZsYWdzID8gZmxhZ3NbJDBdIDogJDA7XHJcblx0fSk7XHJcblxyXG59XHJcbiJdfQ==

/***/ },
/* 3 */
/***/ function(module, exports) {

	/*istanbul ignore next*/'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.getFunctionName = getFunctionName;
	/**
	 * Gets the function name of the specified function
	 *
	 * @function
	 *
	 * @param func
	 *
	 * @returns {string}
	 */
	function getFunctionName(func) {

	    // get the name of the function
	    let name = func.toString().substring('function '.length);
	    name = name.substring(0, name.indexOf('('));

	    // if the string is not empty
	    return name && name.trim() ? name : 'anonymous';
	}
	//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInV0aWxpdHkuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7UUFTZ0I7Ozs7Ozs7Ozs7QUFBVCxTQUFTLGVBQVQsQ0FBeUIsSUFBekIsRUFBK0I7OztBQUdsQyxRQUFJLE9BQU8sS0FBSyxRQUFMLEdBQWdCLFNBQWhCLENBQTBCLFlBQVksTUFBWixDQUFqQyxDQUg4QjtBQUlsQyxXQUFPLEtBQUssU0FBTCxDQUFlLENBQWYsRUFBa0IsS0FBSyxPQUFMLENBQWEsR0FBYixDQUFsQixDQUFQOzs7QUFKa0MsV0FPM0IsSUFBQyxJQUFRLEtBQUssSUFBTCxFQUFSLEdBQXVCLElBQXhCLEdBQStCLFdBQS9CLENBUDJCO0NBQS9CIiwiZmlsZSI6InV0aWxpdHkuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcclxuICogR2V0cyB0aGUgZnVuY3Rpb24gbmFtZSBvZiB0aGUgc3BlY2lmaWVkIGZ1bmN0aW9uXHJcbiAqXHJcbiAqIEBmdW5jdGlvblxyXG4gKlxyXG4gKiBAcGFyYW0gZnVuY1xyXG4gKlxyXG4gKiBAcmV0dXJucyB7c3RyaW5nfVxyXG4gKi9cclxuZXhwb3J0IGZ1bmN0aW9uIGdldEZ1bmN0aW9uTmFtZShmdW5jKSB7XHJcblxyXG4gICAgLy8gZ2V0IHRoZSBuYW1lIG9mIHRoZSBmdW5jdGlvblxyXG4gICAgbGV0IG5hbWUgPSBmdW5jLnRvU3RyaW5nKCkuc3Vic3RyaW5nKCdmdW5jdGlvbiAnLmxlbmd0aCk7XHJcbiAgICBuYW1lID0gbmFtZS5zdWJzdHJpbmcoMCwgbmFtZS5pbmRleE9mKCcoJykpO1xyXG5cclxuICAgIC8vIGlmIHRoZSBzdHJpbmcgaXMgbm90IGVtcHR5XHJcbiAgICByZXR1cm4gKG5hbWUgJiYgbmFtZS50cmltKCkpID8gbmFtZSA6ICdhbm9ueW1vdXMnO1xyXG5cclxufVxyXG4iXX0=

/***/ },
/* 4 */
/***/ function(module, exports) {

	/*istanbul ignore next*/'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	/**
	 * log4js <https://github.com/anigenero/log4js>
	 *
	 * Copyright 2016-present Robin Schultz <http://anigenero.com>
	 * Released under the MIT License
	 */

	/**
	 * @type {{OFF: number, FATAL: number, ERROR: number, WARN: number, INFO: number, DEBUG: number, TRACE: number, ALL: number}}
	 */
	const LogLevel = /*istanbul ignore next*/exports.LogLevel = {
	  'OFF': 0,
	  'FATAL': 100,
	  'ERROR': 200,
	  'WARN': 300,
	  'INFO': 400,
	  'DEBUG': 500,
	  'TRACE': 600,
	  'ALL': 2147483647
	};
	//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNvbnN0XFxsb2dMZXZlbC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7QUFVTyxNQUFNLHNEQUFXO0FBQ3BCLFNBQVEsQ0FBUjtBQUNBLFdBQVUsR0FBVjtBQUNBLFdBQVUsR0FBVjtBQUNBLFVBQVMsR0FBVDtBQUNBLFVBQVMsR0FBVDtBQUNBLFdBQVUsR0FBVjtBQUNBLFdBQVUsR0FBVjtBQUNBLFNBQVEsVUFBUjtDQVJTIiwiZmlsZSI6ImNvbnN0XFxsb2dMZXZlbC5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxyXG4gKiBsb2c0anMgPGh0dHBzOi8vZ2l0aHViLmNvbS9hbmlnZW5lcm8vbG9nNGpzPlxyXG4gKlxyXG4gKiBDb3B5cmlnaHQgMjAxNi1wcmVzZW50IFJvYmluIFNjaHVsdHogPGh0dHA6Ly9hbmlnZW5lcm8uY29tPlxyXG4gKiBSZWxlYXNlZCB1bmRlciB0aGUgTUlUIExpY2Vuc2VcclxuICovXHJcblxyXG4vKipcclxuICogQHR5cGUge3tPRkY6IG51bWJlciwgRkFUQUw6IG51bWJlciwgRVJST1I6IG51bWJlciwgV0FSTjogbnVtYmVyLCBJTkZPOiBudW1iZXIsIERFQlVHOiBudW1iZXIsIFRSQUNFOiBudW1iZXIsIEFMTDogbnVtYmVyfX1cclxuICovXHJcbmV4cG9ydCBjb25zdCBMb2dMZXZlbCA9IHtcclxuICAgICdPRkYnIDogMCxcclxuICAgICdGQVRBTCcgOiAxMDAsXHJcbiAgICAnRVJST1InIDogMjAwLFxyXG4gICAgJ1dBUk4nIDogMzAwLFxyXG4gICAgJ0lORk8nIDogNDAwLFxyXG4gICAgJ0RFQlVHJyA6IDUwMCxcclxuICAgICdUUkFDRScgOiA2MDAsXHJcbiAgICAnQUxMJyA6IDIxNDc0ODM2NDdcclxufTtcclxuIl19

/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {// Copyright Joyent, Inc. and other Node contributors.
	//
	// Permission is hereby granted, free of charge, to any person obtaining a
	// copy of this software and associated documentation files (the
	// "Software"), to deal in the Software without restriction, including
	// without limitation the rights to use, copy, modify, merge, publish,
	// distribute, sublicense, and/or sell copies of the Software, and to permit
	// persons to whom the Software is furnished to do so, subject to the
	// following conditions:
	//
	// The above copyright notice and this permission notice shall be included
	// in all copies or substantial portions of the Software.
	//
	// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
	// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
	// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
	// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
	// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
	// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
	// USE OR OTHER DEALINGS IN THE SOFTWARE.

	// resolves . and .. elements in a path array with directory names there
	// must be no slashes, empty elements, or device names (c:\) in the array
	// (so also no leading and trailing slashes - it does not distinguish
	// relative and absolute paths)
	function normalizeArray(parts, allowAboveRoot) {
	  // if the path tries to go above the root, `up` ends up > 0
	  var up = 0;
	  for (var i = parts.length - 1; i >= 0; i--) {
	    var last = parts[i];
	    if (last === '.') {
	      parts.splice(i, 1);
	    } else if (last === '..') {
	      parts.splice(i, 1);
	      up++;
	    } else if (up) {
	      parts.splice(i, 1);
	      up--;
	    }
	  }

	  // if the path is allowed to go above the root, restore leading ..s
	  if (allowAboveRoot) {
	    for (; up--; up) {
	      parts.unshift('..');
	    }
	  }

	  return parts;
	}

	// Split a filename into [root, dir, basename, ext], unix version
	// 'root' is just a slash, or nothing.
	var splitPathRe =
	    /^(\/?|)([\s\S]*?)((?:\.{1,2}|[^\/]+?|)(\.[^.\/]*|))(?:[\/]*)$/;
	var splitPath = function(filename) {
	  return splitPathRe.exec(filename).slice(1);
	};

	// path.resolve([from ...], to)
	// posix version
	exports.resolve = function() {
	  var resolvedPath = '',
	      resolvedAbsolute = false;

	  for (var i = arguments.length - 1; i >= -1 && !resolvedAbsolute; i--) {
	    var path = (i >= 0) ? arguments[i] : process.cwd();

	    // Skip empty and invalid entries
	    if (typeof path !== 'string') {
	      throw new TypeError('Arguments to path.resolve must be strings');
	    } else if (!path) {
	      continue;
	    }

	    resolvedPath = path + '/' + resolvedPath;
	    resolvedAbsolute = path.charAt(0) === '/';
	  }

	  // At this point the path should be resolved to a full absolute path, but
	  // handle relative paths to be safe (might happen when process.cwd() fails)

	  // Normalize the path
	  resolvedPath = normalizeArray(filter(resolvedPath.split('/'), function(p) {
	    return !!p;
	  }), !resolvedAbsolute).join('/');

	  return ((resolvedAbsolute ? '/' : '') + resolvedPath) || '.';
	};

	// path.normalize(path)
	// posix version
	exports.normalize = function(path) {
	  var isAbsolute = exports.isAbsolute(path),
	      trailingSlash = substr(path, -1) === '/';

	  // Normalize the path
	  path = normalizeArray(filter(path.split('/'), function(p) {
	    return !!p;
	  }), !isAbsolute).join('/');

	  if (!path && !isAbsolute) {
	    path = '.';
	  }
	  if (path && trailingSlash) {
	    path += '/';
	  }

	  return (isAbsolute ? '/' : '') + path;
	};

	// posix version
	exports.isAbsolute = function(path) {
	  return path.charAt(0) === '/';
	};

	// posix version
	exports.join = function() {
	  var paths = Array.prototype.slice.call(arguments, 0);
	  return exports.normalize(filter(paths, function(p, index) {
	    if (typeof p !== 'string') {
	      throw new TypeError('Arguments to path.join must be strings');
	    }
	    return p;
	  }).join('/'));
	};


	// path.relative(from, to)
	// posix version
	exports.relative = function(from, to) {
	  from = exports.resolve(from).substr(1);
	  to = exports.resolve(to).substr(1);

	  function trim(arr) {
	    var start = 0;
	    for (; start < arr.length; start++) {
	      if (arr[start] !== '') break;
	    }

	    var end = arr.length - 1;
	    for (; end >= 0; end--) {
	      if (arr[end] !== '') break;
	    }

	    if (start > end) return [];
	    return arr.slice(start, end - start + 1);
	  }

	  var fromParts = trim(from.split('/'));
	  var toParts = trim(to.split('/'));

	  var length = Math.min(fromParts.length, toParts.length);
	  var samePartsLength = length;
	  for (var i = 0; i < length; i++) {
	    if (fromParts[i] !== toParts[i]) {
	      samePartsLength = i;
	      break;
	    }
	  }

	  var outputParts = [];
	  for (var i = samePartsLength; i < fromParts.length; i++) {
	    outputParts.push('..');
	  }

	  outputParts = outputParts.concat(toParts.slice(samePartsLength));

	  return outputParts.join('/');
	};

	exports.sep = '/';
	exports.delimiter = ':';

	exports.dirname = function(path) {
	  var result = splitPath(path),
	      root = result[0],
	      dir = result[1];

	  if (!root && !dir) {
	    // No dirname whatsoever
	    return '.';
	  }

	  if (dir) {
	    // It has a dirname, strip trailing slash
	    dir = dir.substr(0, dir.length - 1);
	  }

	  return root + dir;
	};


	exports.basename = function(path, ext) {
	  var f = splitPath(path)[2];
	  // TODO: make this comparison case-insensitive on windows?
	  if (ext && f.substr(-1 * ext.length) === ext) {
	    f = f.substr(0, f.length - ext.length);
	  }
	  return f;
	};


	exports.extname = function(path) {
	  return splitPath(path)[3];
	};

	function filter (xs, f) {
	    if (xs.filter) return xs.filter(f);
	    var res = [];
	    for (var i = 0; i < xs.length; i++) {
	        if (f(xs[i], i, xs)) res.push(xs[i]);
	    }
	    return res;
	}

	// String.prototype.substr - negative index don't work in IE8
	var substr = 'ab'.substr(-1) === 'b'
	    ? function (str, start, len) { return str.substr(start, len) }
	    : function (str, start, len) {
	        if (start < 0) start = str.length + start;
	        return str.substr(start, len);
	    }
	;

	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(6)))

/***/ },
/* 6 */
/***/ function(module, exports) {

	// shim for using process in browser

	var process = module.exports = {};
	var queue = [];
	var draining = false;
	var currentQueue;
	var queueIndex = -1;

	function cleanUpNextTick() {
	    draining = false;
	    if (currentQueue.length) {
	        queue = currentQueue.concat(queue);
	    } else {
	        queueIndex = -1;
	    }
	    if (queue.length) {
	        drainQueue();
	    }
	}

	function drainQueue() {
	    if (draining) {
	        return;
	    }
	    var timeout = setTimeout(cleanUpNextTick);
	    draining = true;

	    var len = queue.length;
	    while(len) {
	        currentQueue = queue;
	        queue = [];
	        while (++queueIndex < len) {
	            if (currentQueue) {
	                currentQueue[queueIndex].run();
	            }
	        }
	        queueIndex = -1;
	        len = queue.length;
	    }
	    currentQueue = null;
	    draining = false;
	    clearTimeout(timeout);
	}

	process.nextTick = function (fun) {
	    var args = new Array(arguments.length - 1);
	    if (arguments.length > 1) {
	        for (var i = 1; i < arguments.length; i++) {
	            args[i - 1] = arguments[i];
	        }
	    }
	    queue.push(new Item(fun, args));
	    if (queue.length === 1 && !draining) {
	        setTimeout(drainQueue, 0);
	    }
	};

	// v8 likes predictible objects
	function Item(fun, array) {
	    this.fun = fun;
	    this.array = array;
	}
	Item.prototype.run = function () {
	    this.fun.apply(null, this.array);
	};
	process.title = 'browser';
	process.browser = true;
	process.env = {};
	process.argv = [];
	process.version = ''; // empty string to avoid regexp issues
	process.versions = {};

	function noop() {}

	process.on = noop;
	process.addListener = noop;
	process.once = noop;
	process.off = noop;
	process.removeListener = noop;
	process.removeAllListeners = noop;
	process.emit = noop;

	process.binding = function (name) {
	    throw new Error('process.binding is not supported');
	};

	process.cwd = function () { return '/' };
	process.chdir = function (dir) {
	    throw new Error('process.chdir is not supported');
	};
	process.umask = function() { return 0; };


/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	/*istanbul ignore next*/'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.LogAppender = undefined;

	var /*istanbul ignore next*/_formatter = __webpack_require__(1);

	class LogAppender {

	    /**
	     * Gets the name of the appender (e.g. 'console')
	     * @returns {null}
	     */
	    static get name() {
	        return null;
	    }

	    /**
	     * Returns whether or not the appender is active
	     * @returns {boolean}
	     */
	    isActive() {
	        return true;
	    }

	    /**
	     * Appends the log
	     * @param {Object} logEvent
	     */
	    append(logEvent) {}
	    // stub


	    /**
	     * Gets the current log level
	     * @returns {number}
	     */
	    getLogLevel() {
	        return this.logLevel;
	    }

	    /**
	     * Sets the log level of the appender
	     * @param {number} logLevel
	     */
	    setLogLevel(logLevel) {
	        this.logLevel = logLevel;
	    }

	    /**
	     * Sets the layout of the appender
	     * @param {string} layout
	     */
	    setLayout(layout) {
	        this.layout = layout;
	    }

	    /**
	     * Gets the layout associated with the appender
	     * @returns {string}
	     */
	    getLayout() {
	        return this.layout;
	    }

	    /**
	     * Formats the log event using the layout provided
	     * @param {Object} logEvent
	     */
	    format(logEvent) {
	        return (/*istanbul ignore next*/(0, _formatter.format)(this.getLayout(), logEvent)
	        );
	    }

	}
	/*istanbul ignore next*/exports.LogAppender = LogAppender;
	//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcGVuZGVyXFxhcHBlbmRlci5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7O0FBQUE7O0FBRU8sTUFBTSxXQUFOLENBQWtCOzs7Ozs7QUFNckIsZUFBVyxJQUFYLEdBQWtCO0FBQ2QsZUFBTyxJQUFQLENBRGM7S0FBbEI7Ozs7OztBQU5xQixZQWNyQixHQUFXO0FBQ1AsZUFBTyxJQUFQLENBRE87S0FBWDs7Ozs7O0FBZHFCLFVBc0JyQixDQUFPLFFBQVAsRUFBaUI7Ozs7Ozs7O0FBQWpCLGVBUUEsR0FBYztBQUNWLGVBQU8sS0FBSyxRQUFMLENBREc7S0FBZDs7Ozs7O0FBOUJxQixlQXNDckIsQ0FBWSxRQUFaLEVBQXNCO0FBQ2xCLGFBQUssUUFBTCxHQUFnQixRQUFoQixDQURrQjtLQUF0Qjs7Ozs7O0FBdENxQixhQThDckIsQ0FBVSxNQUFWLEVBQWtCO0FBQ2QsYUFBSyxNQUFMLEdBQWMsTUFBZCxDQURjO0tBQWxCOzs7Ozs7QUE5Q3FCLGFBc0RyQixHQUFZO0FBQ1IsZUFBTyxLQUFLLE1BQUwsQ0FEQztLQUFaOzs7Ozs7QUF0RHFCLFVBOERyQixDQUFPLFFBQVAsRUFBaUI7QUFDYixlQUFPLGdEQUFPLEtBQUssU0FBTCxFQUFQLEVBQXlCLFFBQXpCLENBQVA7VUFEYTtLQUFqQjs7Q0E5REc7Z0NBQU0iLCJmaWxlIjoiYXBwZW5kZXJcXGFwcGVuZGVyLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtmb3JtYXR9IGZyb20gJy4uL2Zvcm1hdHRlcic7XHJcblxyXG5leHBvcnQgY2xhc3MgTG9nQXBwZW5kZXIge1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogR2V0cyB0aGUgbmFtZSBvZiB0aGUgYXBwZW5kZXIgKGUuZy4gJ2NvbnNvbGUnKVxyXG4gICAgICogQHJldHVybnMge251bGx9XHJcbiAgICAgKi9cclxuICAgIHN0YXRpYyBnZXQgbmFtZSgpIHtcclxuICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFJldHVybnMgd2hldGhlciBvciBub3QgdGhlIGFwcGVuZGVyIGlzIGFjdGl2ZVxyXG4gICAgICogQHJldHVybnMge2Jvb2xlYW59XHJcbiAgICAgKi9cclxuICAgIGlzQWN0aXZlKCkge1xyXG4gICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQXBwZW5kcyB0aGUgbG9nXHJcbiAgICAgKiBAcGFyYW0ge09iamVjdH0gbG9nRXZlbnRcclxuICAgICAqL1xyXG4gICAgYXBwZW5kKGxvZ0V2ZW50KSB7XHJcbiAgICAgICAgLy8gc3R1YlxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogR2V0cyB0aGUgY3VycmVudCBsb2cgbGV2ZWxcclxuICAgICAqIEByZXR1cm5zIHtudW1iZXJ9XHJcbiAgICAgKi9cclxuICAgIGdldExvZ0xldmVsKCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLmxvZ0xldmVsO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogU2V0cyB0aGUgbG9nIGxldmVsIG9mIHRoZSBhcHBlbmRlclxyXG4gICAgICogQHBhcmFtIHtudW1iZXJ9IGxvZ0xldmVsXHJcbiAgICAgKi9cclxuICAgIHNldExvZ0xldmVsKGxvZ0xldmVsKSB7XHJcbiAgICAgICAgdGhpcy5sb2dMZXZlbCA9IGxvZ0xldmVsO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogU2V0cyB0aGUgbGF5b3V0IG9mIHRoZSBhcHBlbmRlclxyXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IGxheW91dFxyXG4gICAgICovXHJcbiAgICBzZXRMYXlvdXQobGF5b3V0KSB7XHJcbiAgICAgICAgdGhpcy5sYXlvdXQgPSBsYXlvdXQ7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBHZXRzIHRoZSBsYXlvdXQgYXNzb2NpYXRlZCB3aXRoIHRoZSBhcHBlbmRlclxyXG4gICAgICogQHJldHVybnMge3N0cmluZ31cclxuICAgICAqL1xyXG4gICAgZ2V0TGF5b3V0KCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLmxheW91dDtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEZvcm1hdHMgdGhlIGxvZyBldmVudCB1c2luZyB0aGUgbGF5b3V0IHByb3ZpZGVkXHJcbiAgICAgKiBAcGFyYW0ge09iamVjdH0gbG9nRXZlbnRcclxuICAgICAqL1xyXG4gICAgZm9ybWF0KGxvZ0V2ZW50KSB7XHJcbiAgICAgICAgcmV0dXJuIGZvcm1hdCh0aGlzLmdldExheW91dCgpLCBsb2dFdmVudCk7XHJcbiAgICB9XHJcblxyXG59XHJcbiJdfQ==

/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	/*istanbul ignore next*/'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	exports.Logger = Logger;

	var /*istanbul ignore next*/_logLevel = __webpack_require__(4);

	/**
	 * Holds the definition for the log event object
	 *
	 * @typedef {{ date : number, error : Object, filename: string, lineNumber: ?string, column: ?string,
	 *      logErrorStack : Object, file : String, level : number, logger : string, message : string,
	 *      method : Function, properties : Object=, relative : number, sequence : number }}
	 */
	let LOG_EVENT; /**
	                * log4js <https://github.com/anigenero/log4js>
	                *
	                * Copyright 2016-present Robin Schultz <http://anigenero.com>
	                * Released under the MIT License
	                */

	function Logger(context, appenderObj) {

		/** @type {string} */
		let _logContext = context;
		/** @typeof {number} */
		let _logSequence = 1;
		/** @typeof {number} */
		let _relative = new Date().getTime();

		/**
	  * Logs an error event
	     *
	     * @function
	     * @memberOf Logger
	  */
		this.error = function () {
			appenderObj.append(_constructLogEvent( /*istanbul ignore next*/_logLevel.LogLevel.ERROR, arguments));
		};

		/**
	  * Logs a warning
	     *
	     * @function
	     * @memberOf Logger
	  */
		this.warn = function () {
			appenderObj.append(_constructLogEvent( /*istanbul ignore next*/_logLevel.LogLevel.WARN, arguments));
		};

		/**
	  * Logs an info level event
	     *
	     * @function
	     * @memberOf Logger
	  */
		this.info = function () {
			appenderObj.append(_constructLogEvent( /*istanbul ignore next*/_logLevel.LogLevel.INFO, arguments));
		};

		/**
	  * Logs a debug event
	     *
	     * @function
	     * @memberOf Logger
	  */
		this.debug = function () {
			appenderObj.append(_constructLogEvent( /*istanbul ignore next*/_logLevel.LogLevel.DEBUG, arguments));
		};

		/**
	  * Logs a trace event
	     *
	     * @function
	     * @memberOf Logger
	  */
		this.trace = function () {
			appenderObj.append(_constructLogEvent( /*istanbul ignore next*/_logLevel.LogLevel.TRACE, arguments));
		};

		/**
	  * @function
	  *
	  * @param {number} level
	  * @param {Array.<Object>} args
	  *
	  * @return {LOG_EVENT}
	  */
		function _constructLogEvent(level, args) {

			let logTime = new Date();
			let error = null;

			// this looks horrible, but this is the only way to catch the stack for IE to later parse the stack
			try {
				throw new Error();
			} catch (e) {
				error = e;
			}

			let loggingEvent = {
				'date': logTime,
				'error': null,
				'logErrorStack': error,
				'file': null,
				'level': level,
				'lineNumber': null,
				'logger': _logContext,
				'message': '',
				'method': !_isStrict() ? args.callee.caller : 0,
				'properties': undefined,
				'relative': logTime.getTime() - _relative,
				'sequence': _logSequence++
			};

			let messageStubs = 0;
			for (let i = 0; i < args.length; i++) {

				if (i === 0) {
					loggingEvent.message = args[i];
					let stubs = /\{}/g.exec(loggingEvent.message);
					messageStubs = stubs instanceof Array ? stubs.length : 0;
				} else if (messageStubs > 0) {
					loggingEvent.message = loggingEvent.message.replace(/\{}/, args[i]);
					messageStubs--;
				} else if (args[i] instanceof Error) {
					loggingEvent.error = args[i];
				} else {
					loggingEvent.properties = args[i];
				}
			}

			return loggingEvent;
		}

		/**
	  * Returns whether or not the script is in strict mode
	  *
	  * @private
	  * @function
	  *
	  * @returns {boolean}
	  */
		let _isStrict = function () {
			return !this;
		};

		return this;
	}
	//# sourceMappingURL=data:application/json;base64,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QkFBYSxVQUFiLEdBQTBCLEtBQUssQ0FBTCxDQUExQixDQURNO0lBRkE7R0FUUjs7QUFpQkEsU0FBTyxZQUFQLENBN0N3QztFQUF6Qzs7Ozs7Ozs7OztBQW5FNEMsS0E0SHhDLFlBQVksWUFBWTtBQUNyQixTQUFPLENBQUMsSUFBRCxDQURjO0VBQVosQ0E1SDRCOztBQWdJNUMsUUFBTyxJQUFQLENBaEk0QztDQUF0QyIsImZpbGUiOiJsb2dnZXJcXGxvZ2dlci5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxyXG4gKiBsb2c0anMgPGh0dHBzOi8vZ2l0aHViLmNvbS9hbmlnZW5lcm8vbG9nNGpzPlxyXG4gKlxyXG4gKiBDb3B5cmlnaHQgMjAxNi1wcmVzZW50IFJvYmluIFNjaHVsdHogPGh0dHA6Ly9hbmlnZW5lcm8uY29tPlxyXG4gKiBSZWxlYXNlZCB1bmRlciB0aGUgTUlUIExpY2Vuc2VcclxuICovXHJcblxyXG5pbXBvcnQge0xvZ0xldmVsfSBmcm9tICcuLi9jb25zdC9sb2dMZXZlbCc7XHJcblxyXG4vKipcclxuICogSG9sZHMgdGhlIGRlZmluaXRpb24gZm9yIHRoZSBsb2cgZXZlbnQgb2JqZWN0XHJcbiAqXHJcbiAqIEB0eXBlZGVmIHt7IGRhdGUgOiBudW1iZXIsIGVycm9yIDogT2JqZWN0LCBmaWxlbmFtZTogc3RyaW5nLCBsaW5lTnVtYmVyOiA/c3RyaW5nLCBjb2x1bW46ID9zdHJpbmcsXHJcbiAqICAgICAgbG9nRXJyb3JTdGFjayA6IE9iamVjdCwgZmlsZSA6IFN0cmluZywgbGV2ZWwgOiBudW1iZXIsIGxvZ2dlciA6IHN0cmluZywgbWVzc2FnZSA6IHN0cmluZyxcclxuICogICAgICBtZXRob2QgOiBGdW5jdGlvbiwgcHJvcGVydGllcyA6IE9iamVjdD0sIHJlbGF0aXZlIDogbnVtYmVyLCBzZXF1ZW5jZSA6IG51bWJlciB9fVxyXG4gKi9cclxubGV0IExPR19FVkVOVDtcclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBMb2dnZXIoY29udGV4dCwgYXBwZW5kZXJPYmopIHtcclxuXHJcbiAgICAvKiogQHR5cGUge3N0cmluZ30gKi9cclxuICAgIGxldCBfbG9nQ29udGV4dCA9IGNvbnRleHQ7XHJcbiAgICAvKiogQHR5cGVvZiB7bnVtYmVyfSAqL1xyXG4gICAgbGV0IF9sb2dTZXF1ZW5jZSA9IDE7XHJcblx0LyoqIEB0eXBlb2Yge251bWJlcn0gKi9cclxuXHRsZXQgX3JlbGF0aXZlID0gKG5ldyBEYXRlKCkpLmdldFRpbWUoKTtcclxuXHJcblx0LyoqXHJcblx0ICogTG9ncyBhbiBlcnJvciBldmVudFxyXG4gICAgICpcclxuICAgICAqIEBmdW5jdGlvblxyXG4gICAgICogQG1lbWJlck9mIExvZ2dlclxyXG5cdCAqL1xyXG5cdHRoaXMuZXJyb3IgPSBmdW5jdGlvbiAoKSB7XHJcblx0XHRhcHBlbmRlck9iai5hcHBlbmQoX2NvbnN0cnVjdExvZ0V2ZW50KExvZ0xldmVsLkVSUk9SLCBhcmd1bWVudHMpKTtcclxuXHR9O1xyXG5cclxuXHQvKipcclxuXHQgKiBMb2dzIGEgd2FybmluZ1xyXG4gICAgICpcclxuICAgICAqIEBmdW5jdGlvblxyXG4gICAgICogQG1lbWJlck9mIExvZ2dlclxyXG5cdCAqL1xyXG5cdHRoaXMud2FybiA9IGZ1bmN0aW9uICgpIHtcclxuXHRcdGFwcGVuZGVyT2JqLmFwcGVuZChfY29uc3RydWN0TG9nRXZlbnQoTG9nTGV2ZWwuV0FSTiwgYXJndW1lbnRzKSk7XHJcblx0fTtcclxuXHJcblx0LyoqXHJcblx0ICogTG9ncyBhbiBpbmZvIGxldmVsIGV2ZW50XHJcbiAgICAgKlxyXG4gICAgICogQGZ1bmN0aW9uXHJcbiAgICAgKiBAbWVtYmVyT2YgTG9nZ2VyXHJcblx0ICovXHJcblx0dGhpcy5pbmZvID0gZnVuY3Rpb24gKCkge1xyXG5cdFx0YXBwZW5kZXJPYmouYXBwZW5kKF9jb25zdHJ1Y3RMb2dFdmVudChMb2dMZXZlbC5JTkZPLCBhcmd1bWVudHMpKTtcclxuXHR9O1xyXG5cclxuXHQvKipcclxuXHQgKiBMb2dzIGEgZGVidWcgZXZlbnRcclxuICAgICAqXHJcbiAgICAgKiBAZnVuY3Rpb25cclxuICAgICAqIEBtZW1iZXJPZiBMb2dnZXJcclxuXHQgKi9cclxuXHR0aGlzLmRlYnVnID0gZnVuY3Rpb24gKCkge1xyXG5cdFx0YXBwZW5kZXJPYmouYXBwZW5kKF9jb25zdHJ1Y3RMb2dFdmVudChMb2dMZXZlbC5ERUJVRywgYXJndW1lbnRzKSk7XHJcblx0fTtcclxuXHJcblx0LyoqXHJcblx0ICogTG9ncyBhIHRyYWNlIGV2ZW50XHJcbiAgICAgKlxyXG4gICAgICogQGZ1bmN0aW9uXHJcbiAgICAgKiBAbWVtYmVyT2YgTG9nZ2VyXHJcblx0ICovXHJcblx0dGhpcy50cmFjZSA9IGZ1bmN0aW9uICgpIHtcclxuXHRcdGFwcGVuZGVyT2JqLmFwcGVuZChfY29uc3RydWN0TG9nRXZlbnQoTG9nTGV2ZWwuVFJBQ0UsIGFyZ3VtZW50cykpO1xyXG5cdH07XHJcblxyXG5cdC8qKlxyXG5cdCAqIEBmdW5jdGlvblxyXG5cdCAqXHJcblx0ICogQHBhcmFtIHtudW1iZXJ9IGxldmVsXHJcblx0ICogQHBhcmFtIHtBcnJheS48T2JqZWN0Pn0gYXJnc1xyXG5cdCAqXHJcblx0ICogQHJldHVybiB7TE9HX0VWRU5UfVxyXG5cdCAqL1xyXG5cdGZ1bmN0aW9uIF9jb25zdHJ1Y3RMb2dFdmVudChsZXZlbCwgYXJncykge1xyXG5cclxuXHRcdGxldCBsb2dUaW1lID0gbmV3IERhdGUoKTtcclxuXHRcdGxldCBlcnJvciA9IG51bGw7XHJcblxyXG5cdFx0Ly8gdGhpcyBsb29rcyBob3JyaWJsZSwgYnV0IHRoaXMgaXMgdGhlIG9ubHkgd2F5IHRvIGNhdGNoIHRoZSBzdGFjayBmb3IgSUUgdG8gbGF0ZXIgcGFyc2UgdGhlIHN0YWNrXHJcblx0XHR0cnkge1xyXG5cdFx0XHR0aHJvdyBuZXcgRXJyb3IoKTtcclxuXHRcdH0gY2F0Y2ggKGUpIHtcclxuXHRcdFx0ZXJyb3IgPSBlO1xyXG5cdFx0fVxyXG5cclxuXHRcdGxldCBsb2dnaW5nRXZlbnQgPSB7XHJcblx0XHRcdCdkYXRlJyA6IGxvZ1RpbWUsXHJcblx0XHRcdCdlcnJvcicgOiBudWxsLFxyXG5cdFx0XHQnbG9nRXJyb3JTdGFjaycgOiBlcnJvcixcclxuXHRcdFx0J2ZpbGUnIDogbnVsbCxcclxuXHRcdFx0J2xldmVsJyA6IGxldmVsLFxyXG5cdFx0XHQnbGluZU51bWJlcicgOiBudWxsLFxyXG5cdFx0XHQnbG9nZ2VyJyA6IF9sb2dDb250ZXh0LFxyXG5cdFx0XHQnbWVzc2FnZScgOiAnJyxcclxuXHRcdFx0J21ldGhvZCcgOiAhX2lzU3RyaWN0KCkgPyBhcmdzLmNhbGxlZS5jYWxsZXIgOiAwLFxyXG5cdFx0XHQncHJvcGVydGllcycgOiB1bmRlZmluZWQsXHJcblx0XHRcdCdyZWxhdGl2ZScgOiBsb2dUaW1lLmdldFRpbWUoKSAtIF9yZWxhdGl2ZSxcclxuXHRcdFx0J3NlcXVlbmNlJyA6IF9sb2dTZXF1ZW5jZSsrXHJcblx0XHR9O1xyXG5cclxuXHRcdGxldCBtZXNzYWdlU3R1YnMgPSAwO1xyXG5cdFx0Zm9yIChsZXQgaSA9IDA7IGkgPCBhcmdzLmxlbmd0aDsgaSsrKSB7XHJcblxyXG5cdFx0XHRpZiAoaSA9PT0gMCkge1xyXG5cdFx0XHRcdGxvZ2dpbmdFdmVudC5tZXNzYWdlID0gYXJnc1tpXTtcclxuXHRcdFx0XHRsZXQgc3R1YnMgPSAoL1xce30vZykuZXhlYyhsb2dnaW5nRXZlbnQubWVzc2FnZSk7XHJcblx0XHRcdFx0bWVzc2FnZVN0dWJzID0gKHN0dWJzIGluc3RhbmNlb2YgQXJyYXkpID8gc3R1YnMubGVuZ3RoIDogMDtcclxuXHRcdFx0fSBlbHNlIGlmIChtZXNzYWdlU3R1YnMgPiAwKSB7XHJcblx0XHRcdFx0bG9nZ2luZ0V2ZW50Lm1lc3NhZ2UgPSBsb2dnaW5nRXZlbnQubWVzc2FnZS5yZXBsYWNlKC9cXHt9LywgYXJnc1tpXSk7XHJcblx0XHRcdFx0bWVzc2FnZVN0dWJzLS07XHJcblx0XHRcdH0gZWxzZSBpZiAoYXJnc1tpXSBpbnN0YW5jZW9mIEVycm9yKSB7XHJcblx0XHRcdFx0bG9nZ2luZ0V2ZW50LmVycm9yID0gYXJnc1tpXTtcclxuXHRcdFx0fSBlbHNlIHtcclxuXHRcdFx0XHRsb2dnaW5nRXZlbnQucHJvcGVydGllcyA9IGFyZ3NbaV07XHJcblx0XHRcdH1cclxuXHJcblx0XHR9XHJcblxyXG5cdFx0cmV0dXJuIGxvZ2dpbmdFdmVudDtcclxuXHJcblx0fVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogUmV0dXJucyB3aGV0aGVyIG9yIG5vdCB0aGUgc2NyaXB0IGlzIGluIHN0cmljdCBtb2RlXHJcbiAgICAgKlxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqIEBmdW5jdGlvblxyXG4gICAgICpcclxuICAgICAqIEByZXR1cm5zIHtib29sZWFufVxyXG4gICAgICovXHJcblx0bGV0IF9pc1N0cmljdCA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICByZXR1cm4gIXRoaXM7XHJcbiAgICB9O1xyXG5cclxuXHRyZXR1cm4gdGhpcztcclxuXHJcbn1cclxuIl19

/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	/*istanbul ignore next*/'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	exports.ConsoleAppender = undefined;

	var /*istanbul ignore next*/_appender = __webpack_require__(7);

	var /*istanbul ignore next*/_logLevel = __webpack_require__(4);

	/**
	 * log4js <https://github.com/anigenero/log4js>
	 *
	 * Copyright 2016-present Robin Schultz <http://anigenero.com>
	 * Released under the MIT License
	 */

	class ConsoleAppender extends /*istanbul ignore next*/_appender.LogAppender {

		static get name() {
			return 'console';
		}

		/**
	  * Appends the log event
	  * @param logEvent
	  */
		append(logEvent) {
			if (logEvent.level <= this.getLogLevel()) {
				this._appendToConsole(logEvent);
			}
		}

		/**
	  * @private
	  * @function
	  *
	  * @param {LOG_EVENT} logEvent
	  */
		_appendToConsole(logEvent) {

			let message = this.format(logEvent);

			if (logEvent.level == /*istanbul ignore next*/_logLevel.LogLevel.ERROR) {
				console.error(message);
			} else if (logEvent.level == /*istanbul ignore next*/_logLevel.LogLevel.WARN) {
				console.warn(message);
			} else if (logEvent.level == /*istanbul ignore next*/_logLevel.LogLevel.INFO) {
				console.info(message);
			} else if ([/*istanbul ignore next*/_logLevel.LogLevel.DEBUG, /*istanbul ignore next*/_logLevel.LogLevel.TRACE].indexOf(logEvent.level) > -1) {
				console.log(message);
			}
		}

	}
	/*istanbul ignore next*/exports.ConsoleAppender = ConsoleAppender;
	//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcGVuZGVyXFxjb25zb2xlQXBwZW5kZXIuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7OztBQU9BOztBQUNBOzs7Ozs7Ozs7QUFFTyxNQUFNLGVBQU4sdURBQTBDOztBQUU3QyxZQUFXLElBQVgsR0FBa0I7QUFDZCxTQUFPLFNBQVAsQ0FEYztFQUFsQjs7Ozs7O0FBRjZDLE9BVTdDLENBQU8sUUFBUCxFQUFpQjtBQUNiLE1BQUksU0FBUyxLQUFULElBQWtCLEtBQUssV0FBTCxFQUFsQixFQUFzQztBQUN0QyxRQUFLLGdCQUFMLENBQXNCLFFBQXRCLEVBRHNDO0dBQTFDO0VBREo7Ozs7Ozs7O0FBVjZDLGlCQXNCaEQsQ0FBaUIsUUFBakIsRUFBMkI7O0FBRTFCLE1BQUksVUFBVSxLQUFLLE1BQUwsQ0FBWSxRQUFaLENBQVYsQ0FGc0I7O0FBSTFCLE1BQUksU0FBUyxLQUFULElBQWtCLDJDQUFTLEtBQVQsRUFBZ0I7QUFDckMsV0FBUSxLQUFSLENBQWMsT0FBZCxFQURxQztHQUF0QyxNQUVPLElBQUksU0FBUyxLQUFULElBQWtCLDJDQUFTLElBQVQsRUFBZTtBQUMzQyxXQUFRLElBQVIsQ0FBYSxPQUFiLEVBRDJDO0dBQXJDLE1BRUEsSUFBSSxTQUFTLEtBQVQsSUFBa0IsMkNBQVMsSUFBVCxFQUFlO0FBQzNDLFdBQVEsSUFBUixDQUFhLE9BQWIsRUFEMkM7R0FBckMsTUFFQSxJQUFJLENBQUMsMkNBQVMsS0FBVCxFQUFnQiwyQ0FBUyxLQUFULENBQWpCLENBQWlDLE9BQWpDLENBQXlDLFNBQVMsS0FBVCxDQUF6QyxHQUEyRCxDQUFDLENBQUQsRUFBSTtBQUN6RSxXQUFRLEdBQVIsQ0FBWSxPQUFaLEVBRHlFO0dBQW5FO0VBVlI7O0NBdEJNO2dDQUFNIiwiZmlsZSI6ImFwcGVuZGVyXFxjb25zb2xlQXBwZW5kZXIuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcclxuICogbG9nNGpzIDxodHRwczovL2dpdGh1Yi5jb20vYW5pZ2VuZXJvL2xvZzRqcz5cclxuICpcclxuICogQ29weXJpZ2h0IDIwMTYtcHJlc2VudCBSb2JpbiBTY2h1bHR6IDxodHRwOi8vYW5pZ2VuZXJvLmNvbT5cclxuICogUmVsZWFzZWQgdW5kZXIgdGhlIE1JVCBMaWNlbnNlXHJcbiAqL1xyXG5cclxuaW1wb3J0IHtMb2dBcHBlbmRlcn0gZnJvbSAnLi9hcHBlbmRlcic7XHJcbmltcG9ydCB7TG9nTGV2ZWx9IGZyb20gJy4uL2NvbnN0L2xvZ0xldmVsJztcclxuXHJcbmV4cG9ydCBjbGFzcyBDb25zb2xlQXBwZW5kZXIgZXh0ZW5kcyBMb2dBcHBlbmRlciB7XHJcblxyXG4gICAgc3RhdGljIGdldCBuYW1lKCkge1xyXG4gICAgICAgIHJldHVybiAnY29uc29sZSc7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBBcHBlbmRzIHRoZSBsb2cgZXZlbnRcclxuICAgICAqIEBwYXJhbSBsb2dFdmVudFxyXG4gICAgICovXHJcbiAgICBhcHBlbmQobG9nRXZlbnQpIHtcclxuICAgICAgICBpZiAobG9nRXZlbnQubGV2ZWwgPD0gdGhpcy5nZXRMb2dMZXZlbCgpKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX2FwcGVuZFRvQ29uc29sZShsb2dFdmVudCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuXHQvKipcclxuXHQgKiBAcHJpdmF0ZVxyXG5cdCAqIEBmdW5jdGlvblxyXG5cdCAqXHJcblx0ICogQHBhcmFtIHtMT0dfRVZFTlR9IGxvZ0V2ZW50XHJcblx0ICovXHJcblx0X2FwcGVuZFRvQ29uc29sZShsb2dFdmVudCkge1xyXG5cclxuXHRcdGxldCBtZXNzYWdlID0gdGhpcy5mb3JtYXQobG9nRXZlbnQpO1xyXG5cclxuXHRcdGlmIChsb2dFdmVudC5sZXZlbCA9PSBMb2dMZXZlbC5FUlJPUikge1xyXG5cdFx0XHRjb25zb2xlLmVycm9yKG1lc3NhZ2UpO1xyXG5cdFx0fSBlbHNlIGlmIChsb2dFdmVudC5sZXZlbCA9PSBMb2dMZXZlbC5XQVJOKSB7XHJcblx0XHRcdGNvbnNvbGUud2FybihtZXNzYWdlKTtcclxuXHRcdH0gZWxzZSBpZiAobG9nRXZlbnQubGV2ZWwgPT0gTG9nTGV2ZWwuSU5GTykge1xyXG5cdFx0XHRjb25zb2xlLmluZm8obWVzc2FnZSk7XHJcblx0XHR9IGVsc2UgaWYgKFtMb2dMZXZlbC5ERUJVRywgTG9nTGV2ZWwuVFJBQ0VdLmluZGV4T2YobG9nRXZlbnQubGV2ZWwpID4gLTEpIHtcclxuXHRcdFx0Y29uc29sZS5sb2cobWVzc2FnZSk7XHJcblx0XHR9XHJcblxyXG5cdH1cclxuXHJcbn1cclxuIl19

/***/ }
/******/ ])
});
;