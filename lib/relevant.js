(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define("relevant", [], factory);
	else if(typeof exports === 'object')
		exports["relevant"] = factory();
	else
		root["relevant"] = factory();
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
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
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
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
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
  Copyright 2017, Atul Moglewar

  Permission to use, copy, modify, and/or distribute this
  software for any purpose with or without fee is hereby
  granted, provided that the above copyright notice and
  this permission notice appear in all copies.

  THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS
  ALL WARRANTIES WITH REGARD TO THIS SOFTWARE INCLUDING ALL
  IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS. IN NO
  EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
  INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES 
  WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, 
  WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR OTHER 
  TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE
  USE OR PERFORMANCE OF THIS SOFTWARE.
*/

var Relevant = function () {
  function Relevant() {
    _classCallCheck(this, Relevant);

    this.idCounter = 1;
    this.elementDisplay = {};
    this.groupIdAndKeys = {};
    this.visitRelevant(this.cacheRelevantAttributes);
  }

  _createClass(Relevant, [{
    key: "showSpecificFromGroup",
    value: function showSpecificFromGroup(relevantName) {
      var groupId = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "data-relevant-key-group-none";

      var keys = this.groupIdAndKeys[groupId];
      if (keys && keys.indexOf(relevantName) !== -1) {
        this.visitRelevant(function (element) {
          var rn = element.getAttribute("data-relevant-key").toLowerCase();
          var rgid = this.getRelevantGroupId(element);
          if (rgid === groupId) {
            if (relevantName === rn) {
              element.style.display = this.getOriginalDisplay(element);
            } else {
              element.style.display = 'none';
            }
          }
        });
      }
    }
  }, {
    key: "showSpecificFromGroups",
    value: function showSpecificFromGroups(namesAndGroups) {
      var showSpecific = this.showSpecificFromGroup.bind(this);
      namesAndGroups.forEach(function (ng) {
        showSpecific(ng.name, ng.group);
      });
    }
  }, {
    key: "showAll",
    value: function showAll() {
      this.visitRelevant(function (element) {
        element.style.display = this.getOriginalDisplay(element);
      });
    }
  }, {
    key: "cacheRelevantAttributes",
    value: function cacheRelevantAttributes(element) {
      this.saveOriginalDisplay(element);
      this.saveGroupIdsAndKeys(element);
    }
  }, {
    key: "getOriginalDisplay",
    value: function getOriginalDisplay(element) {
      var id = element.getAttribute('data-relevant-odid');
      return id ? this.elementDisplay[id] : '';
    }
  }, {
    key: "saveOriginalDisplay",
    value: function saveOriginalDisplay(element) {
      var originalDisplay = element.style.display;
      if (originalDisplay) {
        var id = element.getAttribute('data-relevant-odid');
        if (!id) {
          element.setAttribute('data-relevant-odid', this.idCounter.toString());
          this.elementDisplay[this.idCounter] = originalDisplay;
          this.idCounter++;
        }
      }
    }
  }, {
    key: "saveGroupIdsAndKeys",
    value: function saveGroupIdsAndKeys(element) {
      var rgid = this.getRelevantGroupId(element);
      var keys = this.getUpdatedRelevantKeys(element, rgid);
      this.groupIdAndKeys[rgid] = keys;
    }
  }, {
    key: "getUpdatedRelevantKeys",
    value: function getUpdatedRelevantKeys(element, rgid) {
      var rn = element.getAttribute("data-relevant-key").toLowerCase();
      var keys = this.groupIdAndKeys[rgid];
      if (!keys) {
        keys = [];
      }
      if (keys.indexOf(rn) === -1) {
        keys.push(rn);
      }
      return keys;
    }
  }, {
    key: "getRelevantGroupId",
    value: function getRelevantGroupId(element) {
      var rgid = element.getAttribute("data-relevant-key-group");
      if (!rgid) {
        rgid = "data-relevant-key-group-none";
      }
      return rgid.toLowerCase();
    }
  }, {
    key: "visitRelevant",
    value: function visitRelevant(decorator) {
      var query = "[data-relevant-key]";
      var relevantElements = document.querySelectorAll(query);
      for (var i = 0; i < relevantElements.length; i++) {
        decorator.bind(this)(relevantElements[i]);
      }
    }
  }]);

  return Relevant;
}();

exports.default = Relevant;

/***/ })
/******/ ]);
});
//# sourceMappingURL=relevant.js.map