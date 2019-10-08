var EntryPoint =
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
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
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
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ({

/***/ "./Scripts/es6/Device.js":
/*!*******************************!*\
  !*** ./Scripts/es6/Device.js ***!
  \*******************************/
/*! exports provided: Device */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"Device\", function() { return Device; });\nclass Device {\n    constructor(title, serial) {\n        this.title = title;\n        this.serial = serial;\n    }\n}\n\n//# sourceURL=webpack://EntryPoint/./Scripts/es6/Device.js?");

/***/ }),

/***/ "./Scripts/es6/DeviceFactory.js":
/*!**************************************!*\
  !*** ./Scripts/es6/DeviceFactory.js ***!
  \**************************************/
/*! exports provided: DeviceFactory */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"DeviceFactory\", function() { return DeviceFactory; });\n/* harmony import */ var _Device__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Device */ \"./Scripts/es6/Device.js\");\n\n\nclass DeviceFactory {\n    refreshDevicesList() {\n        console.log(\"refreshDevicesList()\");\n        $.ajax({\n            url: \"http://localhost:63005/api/devices\",\n            type: \"GET\",\n            success: function (data) {\n                let res = JSON.parse(data);\n                res.forEach(device => {\n                    DeviceFactory.Devices.push(new _Device__WEBPACK_IMPORTED_MODULE_0__[\"Device\"](device.Title, device.Serial));\n                });\n            },\n            error: function (err) {\n                console.log(`error ajax: ${JSON.stringify(err, null, 4)}`);\n            },\n            complete: function () {}\n        });\n    }\n}\n\nDeviceFactory.Devices = [];\n\n//# sourceURL=webpack://EntryPoint/./Scripts/es6/DeviceFactory.js?");

/***/ }),

/***/ "./Scripts/es6/Map.js":
/*!****************************!*\
  !*** ./Scripts/es6/Map.js ***!
  \****************************/
/*! exports provided: Map */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"Map\", function() { return Map; });\nclass Map {\n    constructor() {\n        this.currentMap = null;\n        this.traceIsDisplayed = false;\n    }\n\n    init() {\n        this.currentMap = new google.maps.Map(document.getElementById('map'), {\n            center: { lng: 35.0163, lat: 48.4671 },\n            zoom: 12\n        });\n    }\n\n    setCurrentTrace(point_1, point_2) {\n        if (this.traceIsDisplayed) selectedPath.setMap(null);\n\n        let selectedPath = new google.maps.Polyline({\n            path: [point_1, point_2],\n            geodesic: true,\n            strokeColor: '#5100f1',\n            strokeOpacity: 1.0,\n            strokeWeight: 8\n        });\n\n        selectedPath.setMap(this.currentMap);\n    }\n}\n\n//# sourceURL=webpack://EntryPoint/./Scripts/es6/Map.js?");

/***/ }),

/***/ "./Scripts/es6/main.js":
/*!*****************************!*\
  !*** ./Scripts/es6/main.js ***!
  \*****************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _Map__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Map */ \"./Scripts/es6/Map.js\");\n/* harmony import */ var _DeviceFactory__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./DeviceFactory */ \"./Scripts/es6/DeviceFactory.js\");\n\n\n\n(function () {})();\n\n$(document).ready(function () {\n    switch ($(\"div[data-view]\").attr(\"data-view\")) {\n        case \"dashboard.index\":\n            {\n                dashboardIndex();\n                break;\n            }\n    }\n});\n\nfunction dashboardIndex() {\n\n    let map = new _Map__WEBPACK_IMPORTED_MODULE_0__[\"Map\"]();\n    map.init();\n\n    let df = new _DeviceFactory__WEBPACK_IMPORTED_MODULE_1__[\"DeviceFactory\"]();\n    df.refreshDevicesList();\n\n    console.log(_DeviceFactory__WEBPACK_IMPORTED_MODULE_1__[\"DeviceFactory\"].Devices);\n\n    let searchButton;\n    let playerRangeInput;\n    let playerPlay;\n    let playerPause;\n    let btnOpenDeviceList;\n}\n\n//# sourceURL=webpack://EntryPoint/./Scripts/es6/main.js?");

/***/ }),

/***/ 0:
/*!***********************************!*\
  !*** multi ./Scripts/es6/main.js ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("module.exports = __webpack_require__(/*! ./Scripts/es6/main.js */\"./Scripts/es6/main.js\");\n\n\n//# sourceURL=webpack://EntryPoint/multi_./Scripts/es6/main.js?");

/***/ })

/******/ });