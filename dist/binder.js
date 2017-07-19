var Binder =
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
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 2);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

const AbstractHandler = __webpack_require__(3);

class CallbackHandler extends AbstractHandler {
  constructor(model, prop, $el, event, callback) {
    super(model, prop, $el, event);
    this.handle = callback;
  }
};

module.exports = CallbackHandler;

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

const AbstractRender = __webpack_require__(4);

class CallbackRender extends AbstractRender {
  constructor(model, prop, $el, callback) {
    super(model, prop, $el);
    this.render = callback;
  }
};

module.exports = CallbackRender;

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = {
  Handler: {
    CallbackHandler: __webpack_require__(0),
    ValueHandler: __webpack_require__(9),
    RadioHandler: __webpack_require__(15),
    CheckboxHandler: __webpack_require__(18),
    TextHandler: __webpack_require__(21),
    SelectHandler: __webpack_require__(24)
  },
  Render: {
    CallbackRender: __webpack_require__(1),
    AttributeRender: __webpack_require__(12),
    ValueRender: __webpack_require__(10),
    HtmlRender: __webpack_require__(14),
    RadioRender: __webpack_require__(16),
    CheckboxRender: __webpack_require__(19),
    TextRender: __webpack_require__(22),
    SelectRender: __webpack_require__(25)
  },
  CompositeBinder: __webpack_require__(27),
  CallbackBinder: __webpack_require__(5),
  AttributeBinder: __webpack_require__(11),
  ValueBinder: __webpack_require__(8),
  HtmlBinder: __webpack_require__(13),
  RadioBinder: __webpack_require__(17),
  CheckboxBinder: __webpack_require__(20),
  TextBinder: __webpack_require__(23),
  SelectBinder: __webpack_require__(26)
};

/***/ }),
/* 3 */
/***/ (function(module, exports) {

class AbstractHandler {
  constructor(model, prop, $el, event) {
    this.model = model;
    this.prop = prop;
    this.$el = $el;
    this.event = event;
  }

  bind() {
    this.$el.on(this.event, this.sync.bind(this));

    return this;
  }

  unbind() {
    this.$el.off(this.event, this.sync.bind(this));

    return this;
  }

  prepare(value) {
    return value;
  }

  sync(event) {
    let value = this.handle(event);
    value = this.prepare(value);

    this.model.set(this.prop, value);

    return this;
  }

  handle(event) {}
};

module.exports = AbstractHandler;

/***/ }),
/* 4 */
/***/ (function(module, exports) {

class AbstractRender {
  constructor(model, prop, $el) {
    this.model = model;
    this.prop = prop;
    this.$el = $el;
  }

  bind() {
    this.model.on('change:' + this.prop, this.sync.bind(this));

    return this;
  }

  unbind() {
    this.model.off('change:' + this.prop, this.sync.bind(this));

    return this;
  }

  prepare(value) {
    return value;
  }

  sync() {
    let value = this.model.get(this.prop);
    value = this.prepare(value);
    this.render(value);

    return this;
  }

  render(value) {}
};

module.exports = AbstractRender;

/***/ }),
/* 5 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
const AbstractBinder = __webpack_require__(6);
const CallbackHandler = __webpack_require__(0);
const CallbackRender = __webpack_require__(1);

class CallbackBinder extends AbstractBinder {
  constructor(model, prop, $el, event, handle, render) {
    super(handle ? new CallbackHandler(model, prop, $el, event, handle) : null, render ? new CallbackRender(model, prop, $el, render) : null);
  }
};

module.exports = CallbackBinder;

/***/ }),
/* 6 */
/***/ (function(module, exports) {

class AbstractBinder {
  constructor(handler, render) {
    this.handler = handler;
    this.render = render;
  }

  bind() {
    if (this.handler) {
      this.handler.bind();
    }
    if (this.render) {
      this.render.bind();
    }

    return this;
  }

  unbind() {
    if (this.handler) {
      this.handler.unbind();
    }
    if (this.render) {
      this.render.unbind();
    }

    return this;
  }
};

module.exports = AbstractBinder;

/***/ }),
/* 7 */,
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

const AbstractBinder = __webpack_require__(6);
const ValueHandler = __webpack_require__(9);
const ValueRender = __webpack_require__(10);

class ValueBinder extends AbstractBinder {
  constructor(model, prop, $el, event = 'change') {
    super(new ValueHandler(model, prop, $el, event), new ValueRender(model, prop, $el));
  }
};

module.exports = ValueBinder;

/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

const AbstractHandler = __webpack_require__(3);

class ValueHandler extends AbstractHandler {
  constructor(model, prop, $el, event = 'change') {
    super(model, prop, $el, event);
  }

  handle(event) {
    return this.$el.val();
  }
};

module.exports = ValueHandler;

/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

const AbstractRender = __webpack_require__(4);

class ValueRender extends AbstractRender {
  render(value) {
    this.$el.val(value);
  }
};

module.exports = ValueRender;

/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

const AbstractBinder = __webpack_require__(6);
const AttributeRender = __webpack_require__(12);

class AttributeBinder extends AbstractBinder {
  constructor(model, prop, $el, attribute) {
    super(null, new AttributeRender(model, prop, $el, attribute));
  }
};

module.exports = AttributeBinder;

/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

const AbstractRender = __webpack_require__(4);

class AttributeRender extends AbstractRender {
  constructor(model, prop, $el, attribute) {
    super(model, prop, $el);
    this.attribute = attribute;
  }

  render(value) {
    this.$el.attr(this.attribute, value);
  }
};

module.exports = AttributeRender;

/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

const AbstractBinder = __webpack_require__(6);
const HtmlRender = __webpack_require__(14);

class HtmlBinder extends AbstractBinder {
  constructor(model, prop, $el) {
    super(null, new HtmlRender(model, prop, $el));
  }
};

module.exports = HtmlBinder;

/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

const AbstractRender = __webpack_require__(4);

class HtmlRender extends AbstractRender {
  render(value) {
    this.$el.html(value);
  }
};

module.exports = HtmlRender;

/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

const AbstractHandler = __webpack_require__(3);

class RadioHandler extends AbstractHandler {
  constructor(model, prop, $el, event = 'change') {
    super(model, prop, $el, event);
  }

  handle(event) {
    const $checked = this.$el.filter(':checked');
    return $checked.length ? $checked.val() : null;
  }
};

module.exports = RadioHandler;

/***/ }),
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

const AbstractRender = __webpack_require__(4);

class RadioRender extends AbstractRender {
  render(value) {
    if (value === null) {
      this.$el.prop('checked', false);
      return;
    }
    this.$el.filter('[value="' + value + '"]').prop('checked', true);
  }
};

module.exports = RadioRender;

/***/ }),
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

const AbstractBinder = __webpack_require__(6);
const RadioHandler = __webpack_require__(15);
const RadioRender = __webpack_require__(16);

class RadioBinder extends AbstractBinder {
  constructor(model, prop, $el, event = 'change') {
    super(new RadioHandler(model, prop, $el, event), new RadioRender(model, prop, $el));
  }
};

module.exports = RadioBinder;

/***/ }),
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

const AbstractHandler = __webpack_require__(3);

class CheckboxHandler extends AbstractHandler {
  constructor(model, prop, $el, event = 'change') {
    super(model, prop, $el, event);
  }

  handle(event) {
    return this.$el.prop('checked') ? this.$el.val() : null;
  }
};

module.exports = CheckboxHandler;

/***/ }),
/* 19 */
/***/ (function(module, exports, __webpack_require__) {

const AbstractRender = __webpack_require__(4);

class CheckboxRender extends AbstractRender {
  render(value) {
    this.$el.prop('checked', value !== null);
  }
};

module.exports = CheckboxRender;

/***/ }),
/* 20 */
/***/ (function(module, exports, __webpack_require__) {

const AbstractBinder = __webpack_require__(6);
const CheckboxHandler = __webpack_require__(18);
const CheckboxRender = __webpack_require__(19);

class CheckboxBinder extends AbstractBinder {
  constructor(model, prop, $el, event = 'change') {
    super(new CheckboxHandler(model, prop, $el, event), new CheckboxRender(model, prop, $el));
  }
};

module.exports = CheckboxBinder;

/***/ }),
/* 21 */
/***/ (function(module, exports, __webpack_require__) {

const ValueHandler = __webpack_require__(9);

class TextHandler extends ValueHandler {};

module.exports = TextHandler;

/***/ }),
/* 22 */
/***/ (function(module, exports, __webpack_require__) {

const ValueRender = __webpack_require__(10);

class TextRender extends ValueRender {};

module.exports = TextRender;

/***/ }),
/* 23 */
/***/ (function(module, exports, __webpack_require__) {

const AbstractBinder = __webpack_require__(6);
const TextHandler = __webpack_require__(21);
const TextRender = __webpack_require__(22);

class TextBinder extends AbstractBinder {
  constructor(model, prop, $el, event = 'change') {
    super(new TextHandler(model, prop, $el, event), new TextRender(model, prop, $el));
  }
};

module.exports = TextBinder;

/***/ }),
/* 24 */
/***/ (function(module, exports, __webpack_require__) {

const ValueHandler = __webpack_require__(9);

class SelectHandler extends ValueHandler {};

module.exports = SelectHandler;

/***/ }),
/* 25 */
/***/ (function(module, exports, __webpack_require__) {

const ValueRender = __webpack_require__(10);

class SelectRender extends ValueRender {};

module.exports = SelectRender;

/***/ }),
/* 26 */
/***/ (function(module, exports, __webpack_require__) {

const AbstractBinder = __webpack_require__(6);
const SelectHandler = __webpack_require__(24);
const SelectRender = __webpack_require__(25);

class SelectBinder extends AbstractBinder {
  constructor(model, prop, $el, event = 'change') {
    super(new SelectHandler(model, prop, $el, event), new SelectRender(model, prop, $el));
  }
};

module.exports = SelectBinder;

/***/ }),
/* 27 */
/***/ (function(module, exports) {

class CompositeBinder {
  constructor(binders) {
    this.binders = binders;
  }

  bind() {
    this.binders.forEach(binder => binder.bind());

    return this;
  }

  unbind() {
    this.binders.forEach(binder => binder.unbind());

    return this;
  }

  syncView() {
    this.binders.filter(binder => binder.render && typeof binder.render == 'object').forEach(binder => binder.render.sync());

    return this;
  }

  syncModel() {
    this.binders.filter(binder => binder.handler && typeof binder.handler == 'object').forEach(binder => binder.handler.sync());

    return this;
  }
};

module.exports = CompositeBinder;

/***/ })
/******/ ]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgMjlkM2NjZmE3MTE3YzAzOGM2YTAiLCJ3ZWJwYWNrOi8vLy4vc3JjL0hhbmRsZXIvQ2FsbGJhY2tIYW5kbGVyLmpzIiwid2VicGFjazovLy8uL3NyYy9SZW5kZXIvQ2FsbGJhY2tSZW5kZXIuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL0JpbmRlci5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvSGFuZGxlci9BYnN0cmFjdEhhbmRsZXIuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL1JlbmRlci9BYnN0cmFjdFJlbmRlci5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvQ2FsbGJhY2tCaW5kZXIuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL0Fic3RyYWN0QmluZGVyLmpzIiwid2VicGFjazovLy8uL3NyYy9WYWx1ZUJpbmRlci5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvSGFuZGxlci9WYWx1ZUhhbmRsZXIuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL1JlbmRlci9WYWx1ZVJlbmRlci5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvQXR0cmlidXRlQmluZGVyLmpzIiwid2VicGFjazovLy8uL3NyYy9SZW5kZXIvQXR0cmlidXRlUmVuZGVyLmpzIiwid2VicGFjazovLy8uL3NyYy9IdG1sQmluZGVyLmpzIiwid2VicGFjazovLy8uL3NyYy9SZW5kZXIvSHRtbFJlbmRlci5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvSGFuZGxlci9SYWRpb0hhbmRsZXIuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL1JlbmRlci9SYWRpb1JlbmRlci5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvUmFkaW9CaW5kZXIuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL0hhbmRsZXIvQ2hlY2tib3hIYW5kbGVyLmpzIiwid2VicGFjazovLy8uL3NyYy9SZW5kZXIvQ2hlY2tib3hSZW5kZXIuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL0NoZWNrYm94QmluZGVyLmpzIiwid2VicGFjazovLy8uL3NyYy9IYW5kbGVyL1RleHRIYW5kbGVyLmpzIiwid2VicGFjazovLy8uL3NyYy9SZW5kZXIvVGV4dFJlbmRlci5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvVGV4dEJpbmRlci5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvSGFuZGxlci9TZWxlY3RIYW5kbGVyLmpzIiwid2VicGFjazovLy8uL3NyYy9SZW5kZXIvU2VsZWN0UmVuZGVyLmpzIiwid2VicGFjazovLy8uL3NyYy9TZWxlY3RCaW5kZXIuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL0NvbXBvc2l0ZUJpbmRlci5qcyJdLCJuYW1lcyI6WyJBYnN0cmFjdEhhbmRsZXIiLCJyZXF1aXJlIiwiQ2FsbGJhY2tIYW5kbGVyIiwiY29uc3RydWN0b3IiLCJtb2RlbCIsInByb3AiLCIkZWwiLCJldmVudCIsImNhbGxiYWNrIiwiaGFuZGxlIiwibW9kdWxlIiwiZXhwb3J0cyIsIkFic3RyYWN0UmVuZGVyIiwiQ2FsbGJhY2tSZW5kZXIiLCJyZW5kZXIiLCJIYW5kbGVyIiwiVmFsdWVIYW5kbGVyIiwiUmFkaW9IYW5kbGVyIiwiQ2hlY2tib3hIYW5kbGVyIiwiVGV4dEhhbmRsZXIiLCJTZWxlY3RIYW5kbGVyIiwiUmVuZGVyIiwiQXR0cmlidXRlUmVuZGVyIiwiVmFsdWVSZW5kZXIiLCJIdG1sUmVuZGVyIiwiUmFkaW9SZW5kZXIiLCJDaGVja2JveFJlbmRlciIsIlRleHRSZW5kZXIiLCJTZWxlY3RSZW5kZXIiLCJDb21wb3NpdGVCaW5kZXIiLCJDYWxsYmFja0JpbmRlciIsIkF0dHJpYnV0ZUJpbmRlciIsIlZhbHVlQmluZGVyIiwiSHRtbEJpbmRlciIsIlJhZGlvQmluZGVyIiwiQ2hlY2tib3hCaW5kZXIiLCJUZXh0QmluZGVyIiwiU2VsZWN0QmluZGVyIiwiYmluZCIsIm9uIiwic3luYyIsInVuYmluZCIsIm9mZiIsInByZXBhcmUiLCJ2YWx1ZSIsInNldCIsImdldCIsIkFic3RyYWN0QmluZGVyIiwiaGFuZGxlciIsInZhbCIsImF0dHJpYnV0ZSIsImF0dHIiLCJodG1sIiwiJGNoZWNrZWQiLCJmaWx0ZXIiLCJsZW5ndGgiLCJiaW5kZXJzIiwiZm9yRWFjaCIsImJpbmRlciIsInN5bmNWaWV3Iiwic3luY01vZGVsIl0sIm1hcHBpbmdzIjoiOztBQUFBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOzs7QUFHQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFLO0FBQ0w7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxtQ0FBMkIsMEJBQTBCLEVBQUU7QUFDdkQseUNBQWlDLGVBQWU7QUFDaEQ7QUFDQTtBQUNBOztBQUVBO0FBQ0EsOERBQXNELCtEQUErRDs7QUFFckg7QUFDQTs7QUFFQTtBQUNBOzs7Ozs7O0FDN0RBLE1BQU1BLGtCQUFrQixtQkFBQUMsQ0FBUSxDQUFSLENBQXhCOztBQUVBLE1BQU1DLGVBQU4sU0FBOEJGLGVBQTlCLENBQTZDO0FBQzNDRyxjQUFZQyxLQUFaLEVBQW1CQyxJQUFuQixFQUF5QkMsR0FBekIsRUFBOEJDLEtBQTlCLEVBQXFDQyxRQUFyQyxFQUE4QztBQUM1QyxVQUFNSixLQUFOLEVBQWFDLElBQWIsRUFBbUJDLEdBQW5CLEVBQXdCQyxLQUF4QjtBQUNBLFNBQUtFLE1BQUwsR0FBY0QsUUFBZDtBQUNEO0FBSjBDLENBSzVDOztBQUVERSxPQUFPQyxPQUFQLEdBQWlCVCxlQUFqQixDOzs7Ozs7QUNUQSxNQUFNVSxpQkFBaUIsbUJBQUFYLENBQVEsQ0FBUixDQUF2Qjs7QUFFQSxNQUFNWSxjQUFOLFNBQTZCRCxjQUE3QixDQUEyQztBQUN6Q1QsY0FBWUMsS0FBWixFQUFtQkMsSUFBbkIsRUFBeUJDLEdBQXpCLEVBQThCRSxRQUE5QixFQUF1QztBQUNyQyxVQUFNSixLQUFOLEVBQWFDLElBQWIsRUFBbUJDLEdBQW5CO0FBQ0EsU0FBS1EsTUFBTCxHQUFj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QUFvQ0MsS0FBcEMsQ0FERixFQUVFLElBQUlxQixZQUFKLENBQWlCeEIsS0FBakIsRUFBd0JDLElBQXhCLEVBQThCQyxHQUE5QixDQUZGO0FBSUQ7QUFOc0MsQ0FPeEM7O0FBRURJLE9BQU9DLE9BQVAsR0FBaUIwQixZQUFqQixDOzs7Ozs7QUNiQSxNQUFNUixlQUFOLENBQXFCO0FBQ25CMUIsY0FBWXFELE9BQVosRUFBb0I7QUFDbEIsU0FBS0EsT0FBTCxHQUFlQSxPQUFmO0FBQ0Q7O0FBRURsQixTQUFNO0FBQ0osU0FBS2tCLE9BQUwsQ0FBYUMsT0FBYixDQUFxQkMsVUFBVUEsT0FBT3BCLElBQVAsRUFBL0I7O0FBRUEsV0FBTyxJQUFQO0FBQ0Q7O0FBRURHLFdBQVE7QUFDTixTQUFLZSxPQUFMLENBQWFDLE9BQWIsQ0FBcUJDLFVBQVVBLE9BQU9qQixNQUFQLEVBQS9COztBQUVBLFdBQU8sSUFBUDtBQUNEOztBQUVEa0IsYUFBVTtBQUNSLFNBQUtILE9BQUwsQ0FDR0YsTUFESCxDQUNVSSxVQUFVQSxPQUFPNUMsTUFBUCxJQUFpQixPQUFPNEMsT0FBTzVDLE1BQWQsSUFBd0IsUUFEN0QsRUFFRzJDLE9BRkgsQ0FFV0MsVUFBVUEsT0FBTzVDLE1BQVAsQ0FBYzBCLElBQWQsRUFGckI7O0FBSUEsV0FBTyxJQUFQO0FBQ0Q7O0FBRURvQixjQUFXO0FBQ1QsU0FBS0osT0FBTCxDQUNHRixNQURILENBQ1VJLFVBQVVBLE9BQU9WLE9BQVAsSUFBa0IsT0FBT1UsT0FBT1YsT0FBZCxJQUF5QixRQUQvRCxFQUVHUyxPQUZILENBRVdDLFVBQVVBLE9BQU9WLE9BQVAsQ0FBZVIsSUFBZixFQUZyQjs7QUFJQSxXQUFPLElBQVA7QUFDRDtBQS9Ca0IsQ0FnQ3BCOztBQUVEOUIsT0FBT0MsT0FBUCxHQUFpQmtCLGVBQWpCLEMiLCJmaWxlIjoiYmluZGVyLmpzIiwic291cmNlc0NvbnRlbnQiOlsiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcbiBcdFx0fVxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0aTogbW9kdWxlSWQsXG4gXHRcdFx0bDogZmFsc2UsXG4gXHRcdFx0ZXhwb3J0czoge31cbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gZGVmaW5lIGdldHRlciBmdW5jdGlvbiBmb3IgaGFybW9ueSBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBuYW1lLCBnZXR0ZXIpIHtcbiBcdFx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBuYW1lKSkge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBuYW1lLCB7XG4gXHRcdFx0XHRjb25maWd1cmFibGU6IGZhbHNlLFxuIFx0XHRcdFx0ZW51bWVyYWJsZTogdHJ1ZSxcbiBcdFx0XHRcdGdldDogZ2V0dGVyXG4gXHRcdFx0fSk7XG4gXHRcdH1cbiBcdH07XG5cbiBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbiBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4gXHRcdHJldHVybiBnZXR0ZXI7XG4gXHR9O1xuXG4gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oX193ZWJwYWNrX3JlcXVpcmVfXy5zID0gMik7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gd2VicGFjay9ib290c3RyYXAgMjlkM2NjZmE3MTE3YzAzOGM2YTAiLCJjb25zdCBBYnN0cmFjdEhhbmRsZXIgPSByZXF1aXJlKCcuL0Fic3RyYWN0SGFuZGxlcicpO1xuXG5jbGFzcyBDYWxsYmFja0hhbmRsZXIgZXh0ZW5kcyBBYnN0cmFjdEhhbmRsZXJ7XG4gIGNvbnN0cnVjdG9yKG1vZGVsLCBwcm9wLCAkZWwsIGV2ZW50LCBjYWxsYmFjayl7XG4gICAgc3VwZXIobW9kZWwsIHByb3AsICRlbCwgZXZlbnQpO1xuICAgIHRoaXMuaGFuZGxlID0gY2FsbGJhY2s7XG4gIH1cbn07XG5cbm1vZHVsZS5leHBvcnRzID0gQ2FsbGJhY2tIYW5kbGVyO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL0hhbmRsZXIvQ2FsbGJhY2tIYW5kbGVyLmpzIiwiY29uc3QgQWJzdHJhY3RSZW5kZXIgPSByZXF1aXJlKCcuL0Fic3RyYWN0UmVuZGVyJyk7XG5cbmNsYXNzIENhbGxiYWNrUmVuZGVyIGV4dGVuZHMgQWJzdHJhY3RSZW5kZXJ7XG4gIGNvbnN0cnVjdG9yKG1vZGVsLCBwcm9wLCAkZWwsIGNhbGxiYWNrKXtcbiAgICBzdXBlcihtb2RlbCwgcHJvcCwgJGVsKTtcbiAgICB0aGlzLnJlbmRlciA9IGNhbGxiYWNrO1xuICB9XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IENhbGxiYWNrUmVuZGVyO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL1JlbmRlci9DYWxsYmFja1JlbmRlci5qcyIsIm1vZHVsZS5leHBvcnRzID0ge1xuICBIYW5kbGVyOiB7XG4gICAgQ2FsbGJhY2tIYW5kbGVyOiByZXF1aXJlKCcuL0hhbmRsZXIvQ2FsbGJhY2tIYW5kbGVyJyksXG4gICAgVmFsdWVIYW5kbGVyOiByZXF1aXJlKCcuL0hhbmRsZXIvVmFsdWVIYW5kbGVyJyksXG4gICAgUmFkaW9IYW5kbGVyOiByZXF1aXJlKCcuL0hhbmRsZXIvUmFkaW9IYW5kbGVyJyksXG4gICAgQ2hlY2tib3hIYW5kbGVyOiByZXF1aXJlKCcuL0hhbmRsZXIvQ2hlY2tib3hIYW5kbGVyJyksXG4gICAgVGV4dEhhbmRsZXI6IHJlcXVpcmUoJy4vSGFuZGxlci9UZXh0SGFuZGxlcicpLFxuICAgIFNlbGVjdEhhbmRsZXI6IHJlcXVpcmUoJy4vSGFuZGxlci9TZWxlY3RIYW5kbGVyJylcbiAgfSxcbiAgUmVuZGVyOiB7XG4gICAgQ2FsbGJhY2tSZW5kZXI6IHJlcXVpcmUoJy4vUmVuZGVyL0NhbGxiYWNrUmVuZGVyJyksXG4gICAgQXR0cmlidXRlUmVuZGVyOiByZXF1aXJlKCcuL1JlbmRlci9BdHRyaWJ1dGVSZW5kZXInKSxcbiAgICBWYWx1ZVJlbmRlcjogcmVxdWlyZSgnLi9SZW5kZXIvVmFsdWVSZW5kZXInKSxcbiAgICBIdG1sUmVuZGVyOiByZXF1aXJlKCcuL1JlbmRlci9IdG1sUmVuZGVyJyksXG4gICAgUmFkaW9SZW5kZXI6IHJlcXVpcmUoJy4vUmVuZGVyL1JhZGlvUmVuZGVyJyksXG4gICAgQ2hlY2tib3hSZW5kZXI6IHJlcXVpcmUoJy4vUmVuZGVyL0NoZWNrYm94UmVuZGVyJyksXG4gICAgVGV4dFJlbmRlcjogcmVxdWlyZSgnLi9SZW5kZXIvVGV4dFJlbmRlcicpLFxuICAgIFNlbGVjdFJlbmRlcjogcmVxdWlyZSgnLi9SZW5kZXIvU2VsZWN0UmVuZGVyJylcbiAgfSxcbiAgQ29tcG9zaXRlQmluZGVyOiByZXF1aXJlKCcuL0NvbXBvc2l0ZUJpbmRlcicpLFxuICBDYWxsYmFja0JpbmRlcjogcmVxdWlyZSgnLi9DYWxsYmFja0JpbmRlcicpLFxuICBBdHRyaWJ1dGVCaW5kZXI6IHJlcXVpcmUoJy4vQXR0cmlidXRlQmluZGVyJyksXG4gIFZhbHVlQmluZGVyOiByZXF1aXJlKCcuL1ZhbHVlQmluZGVyJyksXG4gIEh0bWxCaW5kZXI6IHJlcXVpcmUoJy4vSHRtbEJpbmRlcicpLFxuICBSYWRpb0JpbmRlcjogcmVxdWlyZSgnLi9SYWRpb0JpbmRlcicpLFxuICBDaGVja2JveEJpbmRlcjogcmVxdWlyZSgnLi9DaGVja2JveEJpbmRlcicpLFxuICBUZXh0QmluZGVyOiByZXF1aXJlKCcuL1RleHRCaW5kZXInKSxcbiAgU2VsZWN0QmluZGVyOiByZXF1aXJlKCcuL1NlbGVjdEJpbmRlcicpXG59O1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL0JpbmRlci5qcyIsImNsYXNzIEFic3RyYWN0SGFuZGxlcntcbiAgY29uc3RydWN0b3IobW9kZWwsIHByb3AsICRlbCwgZXZlbnQpe1xuICAgIHRoaXMubW9kZWwgPSBtb2RlbDtcbiAgICB0aGlzLnByb3AgPSBwcm9wO1xuICAgIHRoaXMuJGVsID0gJGVsO1xuICAgIHRoaXMuZXZlbnQgPSBldmVudDtcbiAgfVxuXG4gIGJpbmQoKXtcbiAgICB0aGlzLiRlbC5vbih0aGlzLmV2ZW50LCB0aGlzLnN5bmMuYmluZCh0aGlzKSk7XG5cbiAgICByZXR1cm4gdGhpcztcbiAgfVxuXG4gIHVuYmluZCgpe1xuICAgIHRoaXMuJGVsLm9mZih0aGlzLmV2ZW50LCB0aGlzLnN5bmMuYmluZCh0aGlzKSk7XG5cbiAgICByZXR1cm4gdGhpcztcbiAgfVxuXG4gIHByZXBhcmUodmFsdWUpe1xuICAgIHJldHVybiB2YWx1ZTtcbiAgfVxuXG4gIHN5bmMoZXZlbnQpe1xuICAgIGxldCB2YWx1ZSA9IHRoaXMuaGFuZGxlKGV2ZW50KTtcbiAgICB2YWx1ZSA9IHRoaXMucHJlcGFyZSh2YWx1ZSk7XG5cbiAgICB0aGlzLm1vZGVsLnNldCh0aGlzLnByb3AsIHZhbHVlKTtcblxuICAgIHJldHVybiB0aGlzO1xuICB9XG5cbiAgaGFuZGxlKGV2ZW50KXtcbiAgfVxufTtcblxubW9kdWxlLmV4cG9ydHMgPSBBYnN0cmFjdEhhbmRsZXI7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvSGFuZGxlci9BYnN0cmFjdEhhbmRsZXIuanMiLCJjbGFzcyBBYnN0cmFjdFJlbmRlcntcbiAgY29uc3RydWN0b3IobW9kZWwsIHByb3AsICRlbCl7XG4gICAgdGhpcy5tb2RlbCA9IG1vZGVsO1xuICAgIHRoaXMucHJvcCA9IHByb3A7XG4gICAgdGhpcy4kZWwgPSAkZWw7XG4gIH1cblxuICBiaW5kKCl7XG4gICAgdGhpcy5tb2RlbC5vbignY2hhbmdlOicgKyB0aGlzLnByb3AsIHRoaXMuc3luYy5iaW5kKHRoaXMpKTtcblxuICAgIHJldHVybiB0aGlzO1xuICB9XG5cbiAgdW5iaW5kKCl7XG4gICAgdGhpcy5tb2RlbC5vZmYoJ2NoYW5nZTonICsgdGhpcy5wcm9wLCB0aGlzLnN5bmMuYmluZCh0aGlzKSk7XG5cbiAgICByZXR1cm4gdGhpcztcbiAgfVxuXG4gIHByZXBhcmUodmFsdWUpe1xuICAgIHJldHVybiB2YWx1ZTtcbiAgfVxuXG4gIHN5bmMoKXtcbiAgICBsZXQgdmFsdWUgPSB0aGlzLm1vZGVsLmdldCh0aGlzLnByb3ApO1xuICAgIHZhbHVlID0gdGhpcy5wcmVwYXJlKHZhbHVlKTtcbiAgICB0aGlzLnJlbmRlcih2YWx1ZSk7XG5cbiAgICByZXR1cm4gdGhpcztcbiAgfVxuXG4gIHJlbmRlcih2YWx1ZSl7XG4gIH1cbn07XG5cbm1vZHVsZS5leHBvcnRzID0gQWJzdHJhY3RSZW5kZXI7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvUmVuZGVyL0Fic3RyYWN0UmVuZGVyLmpzIiwiY29uc3QgQWJzdHJhY3RCaW5kZXIgPSByZXF1aXJlKCcuL0Fic3RyYWN0QmluZGVyJyk7XG5jb25zdCBDYWxsYmFja0hhbmRsZXIgPSByZXF1aXJlKCcuL0hhbmRsZXIvQ2FsbGJhY2tIYW5kbGVyJyk7XG5jb25zdCBDYWxsYmFja1JlbmRlciA9IHJlcXVpcmUoJy4vUmVuZGVyL0NhbGxiYWNrUmVuZGVyJyk7XG5cbmNsYXNzIENhbGxiYWNrQmluZGVyIGV4dGVuZHMgQWJzdHJhY3RCaW5kZXJ7XG4gIGNvbnN0cnVjdG9yKG1vZGVsLCBwcm9wLCAkZWwsIGV2ZW50LCBoYW5kbGUsIHJlbmRlcil7XG4gICAgc3VwZXIoXG4gICAgICBoYW5kbGU/IG5ldyBDYWxsYmFja0hhbmRsZXIobW9kZWwsIHByb3AsICRlbCwgZXZlbnQsIGhhbmRsZSkgOiBudWxsLFxuICAgICAgcmVuZGVyPyBuZXcgQ2FsbGJhY2tSZW5kZXIobW9kZWwsIHByb3AsICRlbCwgcmVuZGVyKSA6IG51bGxcbiAgICApO1xuICB9XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IENhbGxiYWNrQmluZGVyO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL0NhbGxiYWNrQmluZGVyLmpzIiwiY2xhc3MgQWJzdHJhY3RCaW5kZXJ7XG4gIGNvbnN0cnVjdG9yKGhhbmRsZXIsIHJlbmRlcil7XG4gICAgdGhpcy5oYW5kbGVyID0gaGFuZGxlcjtcbiAgICB0aGlzLnJlbmRlciA9IHJlbmRlcjtcbiAgfVxuXG4gIGJpbmQoKXtcbiAgICBpZih0aGlzLmhhbmRsZXIpe1xuICAgICAgdGhpcy5oYW5kbGVyLmJpbmQoKTtcbiAgICB9XG4gICAgaWYodGhpcy5yZW5kZXIpe1xuICAgICAgdGhpcy5yZW5kZXIuYmluZCgpO1xuICAgIH1cblxuICAgIHJldHVybiB0aGlzO1xuICB9XG5cbiAgdW5iaW5kKCl7XG4gICAgaWYodGhpcy5oYW5kbGVyKXtcbiAgICAgIHRoaXMuaGFuZGxlci51bmJpbmQoKTtcbiAgICB9XG4gICAgaWYodGhpcy5yZW5kZXIpe1xuICAgICAgdGhpcy5yZW5kZXIudW5iaW5kKCk7XG4gICAgfVxuXG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cbn07XG5cbm1vZHVsZS5leHBvcnRzID0gQWJzdHJhY3RCaW5kZXI7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvQWJzdHJhY3RCaW5kZXIuanMiLCJjb25zdCBBYnN0cmFjdEJpbmRlciA9IHJlcXVpcmUoJy4vQWJzdHJhY3RCaW5kZXInKTtcbmNvbnN0IFZhbHVlSGFuZGxlciA9IHJlcXVpcmUoJy4vSGFuZGxlci9WYWx1ZUhhbmRsZXInKTtcbmNvbnN0IFZhbHVlUmVuZGVyID0gcmVxdWlyZSgnLi9SZW5kZXIvVmFsdWVSZW5kZXInKTtcblxuY2xhc3MgVmFsdWVCaW5kZXIgZXh0ZW5kcyBBYnN0cmFjdEJpbmRlcntcbiAgY29uc3RydWN0b3IobW9kZWwsIHByb3AsICRlbCwgZXZlbnQgPSAnY2hhbmdlJyl7XG4gICAgc3VwZXIoXG4gICAgICBuZXcgVmFsdWVIYW5kbGVyKG1vZGVsLCBwcm9wLCAkZWwsIGV2ZW50KSxcbiAgICAgIG5ldyBWYWx1ZVJlbmRlcihtb2RlbCwgcHJvcCwgJGVsKVxuICAgICk7XG4gIH1cbn07XG5cbm1vZHVsZS5leHBvcnRzID0gVmFsdWVCaW5kZXI7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvVmFsdWVCaW5kZXIuanMiLCJjb25zdCBBYnN0cmFjdEhhbmRsZXIgPSByZXF1aXJlKCcuL0Fic3RyYWN0SGFuZGxlcicpO1xuXG5jbGFzcyBWYWx1ZUhhbmRsZXIgZXh0ZW5kcyBBYnN0cmFjdEhhbmRsZXJ7XG4gIGNvbnN0cnVjdG9yKG1vZGVsLCBwcm9wLCAkZWwsIGV2ZW50ID0gJ2NoYW5nZScpe1xuICAgIHN1cGVyKG1vZGVsLCBwcm9wLCAkZWwsIGV2ZW50KTtcbiAgfVxuXG4gIGhhbmRsZShldmVudCl7XG4gICAgcmV0dXJuIHRoaXMuJGVsLnZhbCgpO1xuICB9XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IFZhbHVlSGFuZGxlcjtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9IYW5kbGVyL1ZhbHVlSGFuZGxlci5qcyIsImNvbnN0IEFic3RyYWN0UmVuZGVyID0gcmVxdWlyZSgnLi9BYnN0cmFjdFJlbmRlcicpO1xuXG5jbGFzcyBWYWx1ZVJlbmRlciBleHRlbmRzIEFic3RyYWN0UmVuZGVye1xuICByZW5kZXIodmFsdWUpe1xuICAgIHRoaXMuJGVsLnZhbCh2YWx1ZSk7XG4gIH1cbn07XG5cbm1vZHVsZS5leHBvcnRzID0gVmFsdWVSZW5kZXI7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvUmVuZGVyL1ZhbHVlUmVuZGVyLmpzIiwiY29uc3QgQWJzdHJhY3RCaW5kZXIgPSByZXF1aXJlKCcuL0Fic3RyYWN0QmluZGVyJyk7XG5jb25zdCBBdHRyaWJ1dGVSZW5kZXIgPSByZXF1aXJlKCcuL1JlbmRlci9BdHRyaWJ1dGVSZW5kZXInKTtcblxuY2xhc3MgQXR0cmlidXRlQmluZGVyIGV4dGVuZHMgQWJzdHJhY3RCaW5kZXJ7XG4gIGNvbnN0cnVjdG9yKG1vZGVsLCBwcm9wLCAkZWwsIGF0dHJpYnV0ZSl7XG4gICAgc3VwZXIoXG4gICAgICBudWxsLFxuICAgICAgbmV3IEF0dHJpYnV0ZVJlbmRlcihtb2RlbCwgcHJvcCwgJGVsLCBhdHRyaWJ1dGUpXG4gICAgKTtcbiAgfVxufTtcblxubW9kdWxlLmV4cG9ydHMgPSBBdHRyaWJ1dGVCaW5kZXI7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvQXR0cmlidXRlQmluZGVyLmpzIiwiY29uc3QgQWJzdHJhY3RSZW5kZXIgPSByZXF1aXJlKCcuL0Fic3RyYWN0UmVuZGVyJyk7XG5cbmNsYXNzIEF0dHJpYnV0ZVJlbmRlciBleHRlbmRzIEFic3RyYWN0UmVuZGVye1xuICBjb25zdHJ1Y3Rvcihtb2RlbCwgcHJvcCwgJGVsLCBhdHRyaWJ1dGUpe1xuICAgIHN1cGVyKG1vZGVsLCBwcm9wLCAkZWwpO1xuICAgIHRoaXMuYXR0cmlidXRlID0gYXR0cmlidXRlO1xuICB9XG5cbiAgcmVuZGVyKHZhbHVlKXtcbiAgICB0aGlzLiRlbC5hdHRyKHRoaXMuYXR0cmlidXRlLCB2YWx1ZSk7XG4gIH1cbn07XG5cbm1vZHVsZS5leHBvcnRzID0gQXR0cmlidXRlUmVuZGVyO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL1JlbmRlci9BdHRyaWJ1dGVSZW5kZXIuanMiLCJjb25zdCBBYnN0cmFjdEJpbmRlciA9IHJlcXVpcmUoJy4vQWJzdHJhY3RCaW5kZXInKTtcbmNvbnN0IEh0bWxSZW5kZXIgPSByZXF1aXJlKCcuL1JlbmRlci9IdG1sUmVuZGVyJyk7XG5cbmNsYXNzIEh0bWxCaW5kZXIgZXh0ZW5kcyBBYnN0cmFjdEJpbmRlcntcbiAgY29uc3RydWN0b3IobW9kZWwsIHByb3AsICRlbCl7XG4gICAgc3VwZXIoXG4gICAgICBudWxsLFxuICAgICAgbmV3IEh0bWxSZW5kZXIobW9kZWwsIHByb3AsICRlbClcbiAgICApO1xuICB9XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IEh0bWxCaW5kZXI7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvSHRtbEJpbmRlci5qcyIsImNvbnN0IEFic3RyYWN0UmVuZGVyID0gcmVxdWlyZSgnLi9BYnN0cmFjdFJlbmRlcicpO1xuXG5jbGFzcyBIdG1sUmVuZGVyIGV4dGVuZHMgQWJzdHJhY3RSZW5kZXJ7XG4gIHJlbmRlcih2YWx1ZSl7XG4gICAgdGhpcy4kZWwuaHRtbCh2YWx1ZSk7XG4gIH1cbn07XG5cbm1vZHVsZS5leHBvcnRzID0gSHRtbFJlbmRlcjtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9SZW5kZXIvSHRtbFJlbmRlci5qcyIsImNvbnN0IEFic3RyYWN0SGFuZGxlciA9IHJlcXVpcmUoJy4vQWJzdHJhY3RIYW5kbGVyJyk7XG5cbmNsYXNzIFJhZGlvSGFuZGxlciBleHRlbmRzIEFic3RyYWN0SGFuZGxlcntcbiAgY29uc3RydWN0b3IobW9kZWwsIHByb3AsICRlbCwgZXZlbnQgPSAnY2hhbmdlJyl7XG4gICAgc3VwZXIobW9kZWwsIHByb3AsICRlbCwgZXZlbnQpO1xuICB9XG5cbiAgaGFuZGxlKGV2ZW50KXtcbiAgICBjb25zdCAkY2hlY2tlZCA9IHRoaXMuJGVsLmZpbHRlcignOmNoZWNrZWQnKTtcbiAgICByZXR1cm4gJGNoZWNrZWQubGVuZ3RoPyAkY2hlY2tlZC52YWwoKSA6IG51bGw7XG4gIH1cbn07XG5cbm1vZHVsZS5leHBvcnRzID0gUmFkaW9IYW5kbGVyO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL0hhbmRsZXIvUmFkaW9IYW5kbGVyLmpzIiwiY29uc3QgQWJzdHJhY3RSZW5kZXIgPSByZXF1aXJlKCcuL0Fic3RyYWN0UmVuZGVyJyk7XG5cbmNsYXNzIFJhZGlvUmVuZGVyIGV4dGVuZHMgQWJzdHJhY3RSZW5kZXJ7XG4gIHJlbmRlcih2YWx1ZSl7XG4gICAgaWYodmFsdWUgPT09IG51bGwpe1xuICAgICAgdGhpcy4kZWwucHJvcCgnY2hlY2tlZCcsIGZhbHNlKTtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgdGhpcy4kZWwuZmlsdGVyKCdbdmFsdWU9XCInICsgdmFsdWUgKyAnXCJdJykucHJvcCgnY2hlY2tlZCcsIHRydWUpO1xuICB9XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IFJhZGlvUmVuZGVyO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL1JlbmRlci9SYWRpb1JlbmRlci5qcyIsImNvbnN0IEFic3RyYWN0QmluZGVyID0gcmVxdWlyZSgnLi9BYnN0cmFjdEJpbmRlcicpO1xuY29uc3QgUmFkaW9IYW5kbGVyID0gcmVxdWlyZSgnLi9IYW5kbGVyL1JhZGlvSGFuZGxlcicpO1xuY29uc3QgUmFkaW9SZW5kZXIgPSByZXF1aXJlKCcuL1JlbmRlci9SYWRpb1JlbmRlcicpO1xuXG5jbGFzcyBSYWRpb0JpbmRlciBleHRlbmRzIEFic3RyYWN0QmluZGVye1xuICBjb25zdHJ1Y3Rvcihtb2RlbCwgcHJvcCwgJGVsLCBldmVudCA9ICdjaGFuZ2UnKXtcbiAgICBzdXBlcihcbiAgICAgIG5ldyBSYWRpb0hhbmRsZXIobW9kZWwsIHByb3AsICRlbCwgZXZlbnQpLFxuICAgICAgbmV3IFJhZGlvUmVuZGVyKG1vZGVsLCBwcm9wLCAkZWwpXG4gICAgKTtcbiAgfVxufTtcblxubW9kdWxlLmV4cG9ydHMgPSBSYWRpb0JpbmRlcjtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9SYWRpb0JpbmRlci5qcyIsImNvbnN0IEFic3RyYWN0SGFuZGxlciA9IHJlcXVpcmUoJy4vQWJzdHJhY3RIYW5kbGVyJyk7XG5cbmNsYXNzIENoZWNrYm94SGFuZGxlciBleHRlbmRzIEFic3RyYWN0SGFuZGxlcntcbiAgY29uc3RydWN0b3IobW9kZWwsIHByb3AsICRlbCwgZXZlbnQgPSAnY2hhbmdlJyl7XG4gICAgc3VwZXIobW9kZWwsIHByb3AsICRlbCwgZXZlbnQpO1xuICB9XG5cbiAgaGFuZGxlKGV2ZW50KXtcbiAgICByZXR1cm4gdGhpcy4kZWwucHJvcCgnY2hlY2tlZCcpPyB0aGlzLiRlbC52YWwoKSA6IG51bGw7XG4gIH1cbn07XG5cbm1vZHVsZS5leHBvcnRzID0gQ2hlY2tib3hIYW5kbGVyO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL0hhbmRsZXIvQ2hlY2tib3hIYW5kbGVyLmpzIiwiY29uc3QgQWJzdHJhY3RSZW5kZXIgPSByZXF1aXJlKCcuL0Fic3RyYWN0UmVuZGVyJyk7XG5cbmNsYXNzIENoZWNrYm94UmVuZGVyIGV4dGVuZHMgQWJzdHJhY3RSZW5kZXJ7XG4gIHJlbmRlcih2YWx1ZSl7XG4gICAgdGhpcy4kZWwucHJvcCgnY2hlY2tlZCcsIHZhbHVlICE9PSBudWxsKTtcbiAgfVxufTtcblxubW9kdWxlLmV4cG9ydHMgPSBDaGVja2JveFJlbmRlcjtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9SZW5kZXIvQ2hlY2tib3hSZW5kZXIuanMiLCJjb25zdCBBYnN0cmFjdEJpbmRlciA9IHJlcXVpcmUoJy4vQWJzdHJhY3RCaW5kZXInKTtcbmNvbnN0IENoZWNrYm94SGFuZGxlciA9IHJlcXVpcmUoJy4vSGFuZGxlci9DaGVja2JveEhhbmRsZXInKTtcbmNvbnN0IENoZWNrYm94UmVuZGVyID0gcmVxdWlyZSgnLi9SZW5kZXIvQ2hlY2tib3hSZW5kZXInKTtcblxuY2xhc3MgQ2hlY2tib3hCaW5kZXIgZXh0ZW5kcyBBYnN0cmFjdEJpbmRlcntcbiAgY29uc3RydWN0b3IobW9kZWwsIHByb3AsICRlbCwgZXZlbnQgPSAnY2hhbmdlJyl7XG4gICAgc3VwZXIoXG4gICAgICBuZXcgQ2hlY2tib3hIYW5kbGVyKG1vZGVsLCBwcm9wLCAkZWwsIGV2ZW50KSxcbiAgICAgIG5ldyBDaGVja2JveFJlbmRlcihtb2RlbCwgcHJvcCwgJGVsKVxuICAgICk7XG4gIH1cbn07XG5cbm1vZHVsZS5leHBvcnRzID0gQ2hlY2tib3hCaW5kZXI7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvQ2hlY2tib3hCaW5kZXIuanMiLCJjb25zdCBWYWx1ZUhhbmRsZXIgPSByZXF1aXJlKCcuL1ZhbHVlSGFuZGxlcicpO1xuXG5jbGFzcyBUZXh0SGFuZGxlciBleHRlbmRzIFZhbHVlSGFuZGxlcntcbn07XG5cbm1vZHVsZS5leHBvcnRzID0gVGV4dEhhbmRsZXI7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvSGFuZGxlci9UZXh0SGFuZGxlci5qcyIsImNvbnN0IFZhbHVlUmVuZGVyID0gcmVxdWlyZSgnLi9WYWx1ZVJlbmRlcicpO1xuXG5jbGFzcyBUZXh0UmVuZGVyIGV4dGVuZHMgVmFsdWVSZW5kZXJ7XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IFRleHRSZW5kZXI7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvUmVuZGVyL1RleHRSZW5kZXIuanMiLCJjb25zdCBBYnN0cmFjdEJpbmRlciA9IHJlcXVpcmUoJy4vQWJzdHJhY3RCaW5kZXInKTtcbmNvbnN0IFRleHRIYW5kbGVyID0gcmVxdWlyZSgnLi9IYW5kbGVyL1RleHRIYW5kbGVyJyk7XG5jb25zdCBUZXh0UmVuZGVyID0gcmVxdWlyZSgnLi9SZW5kZXIvVGV4dFJlbmRlcicpO1xuXG5jbGFzcyBUZXh0QmluZGVyIGV4dGVuZHMgQWJzdHJhY3RCaW5kZXJ7XG4gIGNvbnN0cnVjdG9yKG1vZGVsLCBwcm9wLCAkZWwsIGV2ZW50ID0gJ2NoYW5nZScpe1xuICAgIHN1cGVyKFxuICAgICAgbmV3IFRleHRIYW5kbGVyKG1vZGVsLCBwcm9wLCAkZWwsIGV2ZW50KSxcbiAgICAgIG5ldyBUZXh0UmVuZGVyKG1vZGVsLCBwcm9wLCAkZWwpXG4gICAgKTtcbiAgfVxufTtcblxubW9kdWxlLmV4cG9ydHMgPSBUZXh0QmluZGVyO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL1RleHRCaW5kZXIuanMiLCJjb25zdCBWYWx1ZUhhbmRsZXIgPSByZXF1aXJlKCcuL1ZhbHVlSGFuZGxlcicpO1xuXG5jbGFzcyBTZWxlY3RIYW5kbGVyIGV4dGVuZHMgVmFsdWVIYW5kbGVye1xufTtcblxubW9kdWxlLmV4cG9ydHMgPSBTZWxlY3RIYW5kbGVyO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL0hhbmRsZXIvU2VsZWN0SGFuZGxlci5qcyIsImNvbnN0IFZhbHVlUmVuZGVyID0gcmVxdWlyZSgnLi9WYWx1ZVJlbmRlcicpO1xuXG5jbGFzcyBTZWxlY3RSZW5kZXIgZXh0ZW5kcyBWYWx1ZVJlbmRlcntcbn07XG5cbm1vZHVsZS5leHBvcnRzID0gU2VsZWN0UmVuZGVyO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL1JlbmRlci9TZWxlY3RSZW5kZXIuanMiLCJjb25zdCBBYnN0cmFjdEJpbmRlciA9IHJlcXVpcmUoJy4vQWJzdHJhY3RCaW5kZXInKTtcbmNvbnN0IFNlbGVjdEhhbmRsZXIgPSByZXF1aXJlKCcuL0hhbmRsZXIvU2VsZWN0SGFuZGxlcicpO1xuY29uc3QgU2VsZWN0UmVuZGVyID0gcmVxdWlyZSgnLi9SZW5kZXIvU2VsZWN0UmVuZGVyJyk7XG5cbmNsYXNzIFNlbGVjdEJpbmRlciBleHRlbmRzIEFic3RyYWN0QmluZGVye1xuICBjb25zdHJ1Y3Rvcihtb2RlbCwgcHJvcCwgJGVsLCBldmVudCA9ICdjaGFuZ2UnKXtcbiAgICBzdXBlcihcbiAgICAgIG5ldyBTZWxlY3RIYW5kbGVyKG1vZGVsLCBwcm9wLCAkZWwsIGV2ZW50KSxcbiAgICAgIG5ldyBTZWxlY3RSZW5kZXIobW9kZWwsIHByb3AsICRlbClcbiAgICApO1xuICB9XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IFNlbGVjdEJpbmRlcjtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9TZWxlY3RCaW5kZXIuanMiLCJjbGFzcyBDb21wb3NpdGVCaW5kZXJ7XG4gIGNvbnN0cnVjdG9yKGJpbmRlcnMpe1xuICAgIHRoaXMuYmluZGVycyA9IGJpbmRlcnM7XG4gIH1cblxuICBiaW5kKCl7XG4gICAgdGhpcy5iaW5kZXJzLmZvckVhY2goYmluZGVyID0+IGJpbmRlci5iaW5kKCkpO1xuXG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cblxuICB1bmJpbmQoKXtcbiAgICB0aGlzLmJpbmRlcnMuZm9yRWFjaChiaW5kZXIgPT4gYmluZGVyLnVuYmluZCgpKTtcblxuICAgIHJldHVybiB0aGlzO1xuICB9XG5cbiAgc3luY1ZpZXcoKXtcbiAgICB0aGlzLmJpbmRlcnNcbiAgICAgIC5maWx0ZXIoYmluZGVyID0+IGJpbmRlci5yZW5kZXIgJiYgdHlwZW9mIGJpbmRlci5yZW5kZXIgPT0gJ29iamVjdCcpXG4gICAgICAuZm9yRWFjaChiaW5kZXIgPT4gYmluZGVyLnJlbmRlci5zeW5jKCkpO1xuXG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cblxuICBzeW5jTW9kZWwoKXtcbiAgICB0aGlzLmJpbmRlcnNcbiAgICAgIC5maWx0ZXIoYmluZGVyID0+IGJpbmRlci5oYW5kbGVyICYmIHR5cGVvZiBiaW5kZXIuaGFuZGxlciA9PSAnb2JqZWN0JylcbiAgICAgIC5mb3JFYWNoKGJpbmRlciA9PiBiaW5kZXIuaGFuZGxlci5zeW5jKCkpO1xuXG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cbn07XG5cbm1vZHVsZS5leHBvcnRzID0gQ29tcG9zaXRlQmluZGVyO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL0NvbXBvc2l0ZUJpbmRlci5qcyJdLCJzb3VyY2VSb290IjoiIn0=