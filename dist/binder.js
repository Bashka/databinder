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
/******/ 	return __webpack_require__(__webpack_require__.s = 18);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
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
/* 1 */
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
/* 2 */
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
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

const AbstractHandler = __webpack_require__(2);

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
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

const AbstractRender = __webpack_require__(1);

class ValueRender extends AbstractRender {
  render(value) {
    this.$el.val(value);
  }
};

module.exports = ValueRender;

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

const AbstractHandler = __webpack_require__(2);

class CallbackHandler extends AbstractHandler {
  constructor(model, prop, $el, event, callback) {
    super(model, prop, $el, event);
    this.handle = callback;
  }
};

module.exports = CallbackHandler;

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

const AbstractHandler = __webpack_require__(2);

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
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

const AbstractHandler = __webpack_require__(2);

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
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

const ValueHandler = __webpack_require__(3);

class TextHandler extends ValueHandler {};

module.exports = TextHandler;

/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

const ValueHandler = __webpack_require__(3);

class SelectHandler extends ValueHandler {};

module.exports = SelectHandler;

/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

const AbstractRender = __webpack_require__(1);

class CallbackRender extends AbstractRender {
  constructor(model, prop, $el, callback) {
    super(model, prop, $el);
    this.render = callback;
  }
};

module.exports = CallbackRender;

/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

const AbstractRender = __webpack_require__(1);

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
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

const AbstractRender = __webpack_require__(1);

class HtmlRender extends AbstractRender {
  render(value) {
    this.$el.html(value);
  }
};

module.exports = HtmlRender;

/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

const AbstractRender = __webpack_require__(1);

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
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

const AbstractRender = __webpack_require__(1);

class CheckboxRender extends AbstractRender {
  render(value) {
    this.$el.prop('checked', value !== null);
  }
};

module.exports = CheckboxRender;

/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

const ValueRender = __webpack_require__(4);

class TextRender extends ValueRender {};

module.exports = TextRender;

/***/ }),
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

const ValueRender = __webpack_require__(4);

class SelectRender extends ValueRender {};

module.exports = SelectRender;

/***/ }),
/* 17 */
/***/ (function(module, exports) {

class CompositeBinder {
  constructor(binders) {
    this.binders = binders;
  }

  add(binder) {
    this.binders.push(binder);
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

/***/ }),
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = {
  Handler: {
    CallbackHandler: __webpack_require__(5),
    ValueHandler: __webpack_require__(3),
    RadioHandler: __webpack_require__(6),
    CheckboxHandler: __webpack_require__(7),
    TextHandler: __webpack_require__(8),
    SelectHandler: __webpack_require__(9)
  },
  Render: {
    CallbackRender: __webpack_require__(10),
    AttributeRender: __webpack_require__(11),
    ValueRender: __webpack_require__(4),
    HtmlRender: __webpack_require__(12),
    RadioRender: __webpack_require__(13),
    CheckboxRender: __webpack_require__(14),
    TextRender: __webpack_require__(15),
    SelectRender: __webpack_require__(16)
  },
  BinderFactory: __webpack_require__(19),
  CompositeBinder: __webpack_require__(17),
  CallbackBinder: __webpack_require__(20),
  AttributeBinder: __webpack_require__(21),
  ValueBinder: __webpack_require__(22),
  HtmlBinder: __webpack_require__(23),
  RadioBinder: __webpack_require__(24),
  CheckboxBinder: __webpack_require__(25),
  TextBinder: __webpack_require__(26),
  SelectBinder: __webpack_require__(27)
};

/***/ }),
/* 19 */
/***/ (function(module, exports, __webpack_require__) {

const CompositeBinder = __webpack_require__(17);
const HtmlBinder = __webpack_require__(23);
const ValueBinder = __webpack_require__(22);
const RadioBinder = __webpack_require__(24);
const CheckboxBinder = __webpack_require__(25);
const TextBinder = __webpack_require__(26);
const SelectBinder = __webpack_require__(27);

class BinderFactory {
  constructor(model, $el) {
    this.model = model;
    this.$el = $el;
  }

  resolveBinder($el) {
    switch ($el.prop('tagName')) {
      case 'INPUT':
        switch ($el.attr('type')) {
          case 'radio':
            return RadioBinder;
            break;
          case 'checkbox':
            return CheckboxBinder;
            break;
          case 'text':
            return TextBinder;
            break;
          default:
            return ValueBinder;
        }
        break;
      case 'TEXTAREA':
        return TextBinder;
        break;
      case 'SELECT':
        return SelectBinder;
        break;
      default:
        return HtmlBinder;
    }
  }

  prepareOption(option) {
    if (!Array.isArray(option)) {
      option = [option];
    }

    return option.map(function (option) {
      if (typeof option == 'string') {
        option = {
          selector: option
        };
      }
      if (typeof option.$el != 'object') {
        option.$el = this.$el.find(option.selector);
      }
      if (typeof option.binder != 'function') {
        option.binder = this.resolveBinder(option.$el);
      }

      return option;
    }.bind(this));
  }

  expandBinder(binder, option) {
    if (typeof binder.handler == 'object') {
      if (typeof option.event == 'string') {
        binder.handler.event = option.event;
      }
      if (typeof option.handle == 'function') {
        binder.handler.prepare = option.handle;
      }
    }
    if (typeof binder.render == 'object') {
      if (typeof option.attribute == 'string') {
        binder.render.attribute = option.attribute;
      }
      if (typeof option.render == 'function') {
        binder.render.prepare = option.render;
      }
    }
  }

  build(options) {
    let bindings = [];
    for (var prop in options) {
      let option = this.prepareOption(options[prop]);

      for (var i in option) {
        let binder = new (Function.prototype.bind.apply(option[i].binder, [null, this.model, prop, option[i].$el]))();
        this.expandBinder(binder, option[i]);

        bindings.push(binder);
      }
    }

    return new CompositeBinder(bindings);
  }
};

module.exports = BinderFactory;

/***/ }),
/* 20 */
/***/ (function(module, exports, __webpack_require__) {

const AbstractBinder = __webpack_require__(0);
const CallbackHandler = __webpack_require__(5);
const CallbackRender = __webpack_require__(10);

class CallbackBinder extends AbstractBinder {
  constructor(model, prop, $el, event, handle, render) {
    super(handle ? new CallbackHandler(model, prop, $el, event, handle) : null, render ? new CallbackRender(model, prop, $el, render) : null);
  }
};

module.exports = CallbackBinder;

/***/ }),
/* 21 */
/***/ (function(module, exports, __webpack_require__) {

const AbstractBinder = __webpack_require__(0);
const AttributeRender = __webpack_require__(11);

class AttributeBinder extends AbstractBinder {
  constructor(model, prop, $el, attribute) {
    super(null, new AttributeRender(model, prop, $el, attribute));
  }
};

module.exports = AttributeBinder;

/***/ }),
/* 22 */
/***/ (function(module, exports, __webpack_require__) {

const AbstractBinder = __webpack_require__(0);
const ValueHandler = __webpack_require__(3);
const ValueRender = __webpack_require__(4);

class ValueBinder extends AbstractBinder {
  constructor(model, prop, $el, event = 'change') {
    super(new ValueHandler(model, prop, $el, event), new ValueRender(model, prop, $el));
  }
};

module.exports = ValueBinder;

/***/ }),
/* 23 */
/***/ (function(module, exports, __webpack_require__) {

const AbstractBinder = __webpack_require__(0);
const HtmlRender = __webpack_require__(12);

class HtmlBinder extends AbstractBinder {
  constructor(model, prop, $el) {
    super(null, new HtmlRender(model, prop, $el));
  }
};

module.exports = HtmlBinder;

/***/ }),
/* 24 */
/***/ (function(module, exports, __webpack_require__) {

const AbstractBinder = __webpack_require__(0);
const RadioHandler = __webpack_require__(6);
const RadioRender = __webpack_require__(13);

class RadioBinder extends AbstractBinder {
  constructor(model, prop, $el, event = 'change') {
    super(new RadioHandler(model, prop, $el, event), new RadioRender(model, prop, $el));
  }
};

module.exports = RadioBinder;

/***/ }),
/* 25 */
/***/ (function(module, exports, __webpack_require__) {

const AbstractBinder = __webpack_require__(0);
const CheckboxHandler = __webpack_require__(7);
const CheckboxRender = __webpack_require__(14);

class CheckboxBinder extends AbstractBinder {
  constructor(model, prop, $el, event = 'change') {
    super(new CheckboxHandler(model, prop, $el, event), new CheckboxRender(model, prop, $el));
  }
};

module.exports = CheckboxBinder;

/***/ }),
/* 26 */
/***/ (function(module, exports, __webpack_require__) {

const AbstractBinder = __webpack_require__(0);
const TextHandler = __webpack_require__(8);
const TextRender = __webpack_require__(15);

class TextBinder extends AbstractBinder {
  constructor(model, prop, $el, event = 'change') {
    super(new TextHandler(model, prop, $el, event), new TextRender(model, prop, $el));
  }
};

module.exports = TextBinder;

/***/ }),
/* 27 */
/***/ (function(module, exports, __webpack_require__) {

const AbstractBinder = __webpack_require__(0);
const SelectHandler = __webpack_require__(9);
const SelectRender = __webpack_require__(16);

class SelectBinder extends AbstractBinder {
  constructor(model, prop, $el, event = 'change') {
    super(new SelectHandler(model, prop, $el, event), new SelectRender(model, prop, $el));
  }
};

module.exports = SelectBinder;

/***/ })
/******/ ]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgYmJkM2FhZGMzZWQ0YzBlMzE2YTAiLCJ3ZWJwYWNrOi8vLy4vc3JjL0Fic3RyYWN0QmluZGVyLmpzIiwid2VicGFjazovLy8uL3NyYy9SZW5kZXIvQWJzdHJhY3RSZW5kZXIuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL0hhbmRsZXIvQWJzdHJhY3RIYW5kbGVyLmpzIiwid2VicGFjazovLy8uL3NyYy9IYW5kbGVyL1ZhbHVlSGFuZGxlci5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvUmVuZGVyL1ZhbHVlUmVuZGVyLmpzIiwid2VicGFjazovLy8uL3NyYy9IYW5kbGVyL0NhbGxiYWNrSGFuZGxlci5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvSGFuZGxlci9SYWRpb0hhbmRsZXIuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL0hhbmRsZXIvQ2hlY2tib3hIYW5kbGVyLmpzIiwid2VicGFjazovLy8uL3NyYy9IYW5kbGVyL1RleHRIYW5kbGVyLmpzIiwid2VicGFjazovLy8uL3NyYy9IYW5kbGVyL1NlbGVjdEhhbmRsZXIuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL1JlbmRlci9DYWxsYmFja1JlbmRlci5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvUmVuZGVyL0F0dHJpYnV0ZVJlbmRlci5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvUmVuZGVyL0h0bWxSZW5kZXIuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL1JlbmRlci9SYWRpb1JlbmRlci5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvUmVuZGVyL0NoZWNrYm94UmVuZGVyLmpzIiwid2VicGFjazovLy8uL3NyYy9SZW5kZXIvVGV4dFJlbmRlci5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvUmVuZGVyL1NlbGVjdFJlbmRlci5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvQ29tcG9zaXRlQmluZGVyLmpzIiwid2VicGFjazovLy8uL3NyYy9CaW5kZXIuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL0JpbmRlckZhY3RvcnkuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL0NhbGxiYWNrQmluZGVyLmpzIiwid2VicGFjazovLy8uL3NyYy9BdHRyaWJ1dGVCaW5kZXIuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL1ZhbHVlQmluZGVyLmpzIiwid2VicGFjazovLy8uL3NyYy9IdG1sQmluZGVyLmpzIiwid2VicGFjazovLy8uL3NyYy9SYWRpb0JpbmRlci5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvQ2hlY2tib3hCaW5kZXIuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL1RleHRCaW5kZXIuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL1NlbGVjdEJpbmRlci5qcyJdLCJuYW1lcyI6WyJBYnN0cmFjdEJpbmRlciIsImNvbnN0cnVjdG9yIiwiaGFuZGxlciIsInJlbmRlciIsImJpbmQiLCJ1bmJpbmQiLCJtb2R1bGUiLCJleHBvcnRzIiwiQWJzdHJhY3RSZW5kZXIiLCJtb2RlbCIsInByb3AiLCIkZWwiLCJvbiIsInN5bmMiLCJvZmYiLCJwcmVwYXJlIiwidmFsdWUiLCJnZXQiLCJBYnN0cmFjdEhhbmRsZXIiLCJldmVudCIsImhhbmRsZSIsInNldCIsInJlcXVpcmUiLCJWYWx1ZUhhbmRsZXIiLCJ2YWwiLCJWYWx1ZVJlbmRlciIsIkNhbGxiYWNrSGFuZGxlciIsImNhbGxiYWNrIiwiUmFkaW9IYW5kbGVyIiwiJGNoZWNrZWQiLCJmaWx0ZXIiLCJsZW5ndGgiLCJDaGVja2JveEhhbmRsZXIiLCJUZXh0SGFuZGxlciIsIlNlbGVjdEhhbmRsZXIiLCJDYWxsYmFja1JlbmRlciIsIkF0dHJpYnV0ZVJlbmRlciIsImF0dHJpYnV0ZSIsImF0dHIiLCJIdG1sUmVuZGVyIiwiaHRtbCIsIlJhZGlvUmVuZGVyIiwiQ2hlY2tib3hSZW5kZXIiLCJUZXh0UmVuZGVyIiwiU2VsZWN0UmVuZGVyIiwiQ29tcG9zaXRlQmluZGVyIiwiYmluZGVycyIsImFkZCIsImJpbmRlciIsInB1c2giLCJmb3JFYWNoIiwic3luY1ZpZXciLCJzeW5jTW9kZWwiLCJIYW5kbGVyIiwiUmVuZGVyIiwiQmluZGVyRmFjdG9yeSIsIkNhbGxiYWNrQmluZGVyIiwiQXR0cmlidXRlQmluZGVyIiwiVmFsdWVCaW5kZXIiLCJIdG1sQmluZGVyIiwiUmFkaW9CaW5kZXIiLCJDaGVja2JveEJpbmRlciIsIlRleHRCaW5kZXIiLCJTZWxlY3RCaW5kZXIiLCJyZXNvbHZlQmluZGVyIiwicHJlcGFyZU9wdGlvbiIsIm9wdGlvbiIsIkFycmF5IiwiaXNBcnJheSIsIm1hcCIsInNlbGVjdG9yIiwiZmluZCIsImV4cGFuZEJpbmRlciIsImJ1aWxkIiwib3B0aW9ucyIsImJpbmRpbmdzIiwiaSIsIkZ1bmN0aW9uIiwicHJvdG90eXBlIiwiYXBwbHkiXSwibWFwcGluZ3MiOiI7O0FBQUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQUs7QUFDTDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLG1DQUEyQiwwQkFBMEIsRUFBRTtBQUN2RCx5Q0FBaUMsZUFBZTtBQUNoRDtBQUNBO0FBQ0E7O0FBRUE7QUFDQSw4REFBc0QsK0RBQStEOztBQUVySDtBQUNBOztBQUVBO0FBQ0E7Ozs7Ozs7QUM3REEsTUFBTUEsY0FBTixDQUFvQjtBQUNsQkMsY0FBWUMsT0FBWixFQUFxQkMsTUFBckIsRUFBNEI7QUFDMUIsU0FBS0QsT0FBTCxHQUFlQSxPQUFmO0FBQ0EsU0FBS0MsTUFBTCxHQUFjQSxNQUFkO0FBQ0Q7O0FBRURDLFNBQU07QUFDSixRQUFHLEtBQUtGLE9BQVIsRUFBZ0I7QUFDZCxXQUFLQSxPQUFMLENBQWFFLElBQWI7QUFDRDtBQUNELFFBQUcsS0FBS0QsTUFBUixFQUFlO0FBQ2IsV0FBS0EsTUFBTCxDQUFZQyxJQUFaO0FBQ0Q7O0FBRUQsV0FBTyxJQUFQO0FBQ0Q7O0FBRURDLFdBQVE7QUFDTixRQUFHLEtBQUtILE9BQVIsRUFBZ0I7QUFDZCxXQUFLQSxPQUFMLENBQWFHLE1BQWI7QUFDRDtBQUNELFFBQUcsS0FBS0YsTUFBUixFQUFlO0FBQ2IsV0FBS0EsTUFBTCxDQUFZRSxNQUFaO0FBQ0Q7O0FBRUQsV0FBTyxJQUFQO0FBQ0Q7QUExQmlCLENBMkJuQjs7QUFFREMsT0FBT0MsT0FBUCxHQUFpQlAsY0FBakIsQzs7Ozs7O0FDN0JBLE1BQU1RLGNBQU4sQ0FBb0I7QUFDbEJQLGNBQVlRLEtBQVosRUFBbUJDLElBQW5CLEVBQXlCQyxHQUF6QixFQUE2QjtBQUMzQixTQUFLRixLQUFMLEdBQWFBLEtBQWI7QUFDQSxTQUFLQyxJQUFMLEdBQVlBLElBQVo7QUFDQSxTQUFLQyxHQUFMLEdBQVdBLEdBQVg7QUFDRDs7QUFFRFAsU0FBTTtBQUNKLFNBQUtLLEtBQUwsQ0FBV0csRUFBWCxDQUFjLFlBQVksS0FBS0YsSUFBL0IsRUFBcUMsS0FBS0csSUFBTCxDQUFVVCxJQUFWLENBQWUsSUFBZixDQUFyQzs7QUFFQSxXQUFPLElBQVA7QUFDRDs7QUFFREMsV0FBUTtBQUNOLFNBQUtJLEtBQUwsQ0FBV0ssR0FBWCxDQUFlLFlBQVksS0FBS0osSUFBaEMsRUFBc0MsS0FBS0csSUFBTCxDQUFVVCxJQUFWLENBQWUsSUFBZixDQUF0Qzs7QUFFQSxXQUFPLElBQVA7QUFDRDs7QUFFRFcsVUFBUUMsS0FBUixFQUFjO0FBQ1osV0FBT0EsS0FBUDtBQUNEOztBQUVESCxTQUFNO0FBQ0osUUFBSUcsUUFBUSxLQUFLUCxLQUFMLENBQVdRLEdBQVgsQ0FBZSxLQUFLUCxJQUFwQixDQUFaO0FBQ0FNLFlBQVEsS0FBS0QsT0FBTCxDQUFhQyxLQUFiLENBQVI7QUFDQSxTQUFLYixNQUFMLENBQVlhLEtBQVo7O0FBRUEsV0FBTyxJQUFQO0FBQ0Q7O0FBRURiLFNBQU9hLEtBQVAsRUFBYSxDQUNaO0FBaENpQixDQWlDbkI7O0FBRURWLE9BQU9DLE9BQVAsR0FBaUJDLGNBQWpCLEM7Ozs7OztBQ25DQSxNQUFNVSxlQUFOLENBQXFCO0FBQ25CakIsY0FBWVEsS0FBWixFQUFtQkMsSUFBbkIsRUFBeUJDLEdBQXpCLEVBQThCUSxLQUE5QixFQUFvQztBQUNsQyxTQUFLVixLQUFMLEdBQWFBLEtBQWI7QUFDQSxTQUFLQyxJQUFMLEdBQVlBLElBQVo7QUFDQSxTQUFLQyxHQUFMLEdBQVdBLEdBQVg7QUFDQSxTQUFLUSxLQUFMLEdBQWFBLEtBQWI7QUFDRDs7QUFFRGYsU0FBTTtBQUNKLFNBQUtPLEdBQUwsQ0FBU0MsRUFBVCxDQUFZLEtBQUtPLEtBQWpCLEVBQXdCLEtBQUtOLElBQUwsQ0FBVVQsSUFBVixDQUFlLElBQWYsQ0FBeEI7O0FBRUEsV0FBTyxJQUFQO0FBQ0Q7O0FBRURDLFdBQVE7QUFDTixTQUFLTSxHQUFMLENBQVNHLEdBQVQsQ0FBYSxLQUFLSyxLQUFsQixFQUF5QixLQUFLTixJQUFMLENBQVVULElBQVYsQ0FBZSxJQUFmLENBQXpCOztBQUVBLFdBQU8sSUFBUDtBQUNEOztBQUVEVyxVQUFRQyxLQUFSLEVBQWM7QUFDWixXQUFPQSxLQUFQO0FBQ0Q7O0FBRURILE9BQUtNLEtBQUwsRUFBVztBQUNULFFBQUlILFFBQVEsS0FBS0ksTUFBTCxDQUFZRCxLQUFaLENBQVo7QUFDQUgsWUFBUSxLQUFLRCxPQUFMLENBQWFDLEtBQWIsQ0FBUjs7QUFFQSxTQUFLUCxLQUFMLENBQVdZLEdBQVgsQ0FBZSxLQUFLWCxJQUFwQixFQUEwQk0sS0FBMUI7O0FBRUEsV0FBTyxJQUFQO0FBQ0Q7O0FBRURJLFNBQU9ELEtBQVAsRUFBYSxDQUNaO0FBbENrQixDQW1DcEI7O0FBRURiLE9BQU9DLE9BQVAsR0FBaUJXLGVBQWpCLEM7Ozs7OztBQ3JDQSxNQUFNQSxrQkFBa0IsbUJBQUFJLENBQVEsQ0FBUixDQUF4Qjs7QUFFQSxNQUFNQyxZQUFOLFNBQTJCTCxlQUEzQixDQUEwQztBQUN4Q2pCLGNBQVlRLEtBQVosRUFBbUJDLElBQW5CLEVBQXlCQyxHQUF6QixFQUE4QlEsUUFBUSxRQUF0QyxFQUErQztBQUM3QyxVQUFNVixLQUFOLEVBQWFDLElBQWIsRUFBbUJDLEdBQW5CLEVBQXdCUSxLQUF4QjtBQUNEOztBQUVEQyxTQUFPRCxLQUFQLEVBQWE7QUFDWCxXQUFPLEtBQUtSLEdBQUwsQ0FBU2EsR0FBVCxFQUFQO0FBQ0Q7QUFQdUMsQ0FRekM7O0FBRURsQixPQUFPQyxPQUFQLEdBQWlCZ0IsWUFBakIsQzs7Ozs7O0FDWkEsTUFBTWYsaUJBQWlCLG1CQUFBYyxDQUFRLENBQVIsQ0FBdkI7O0FBRUEsTUFBTUcsV0FBTixTQUEwQmpCLGNBQTFCLENBQXdDO0FBQ3RDTCxTQUFPYSxLQUFQLEVBQWE7QUFDWCxTQUFLTCxHQUFMLENBQVNhLEdBQVQsQ0FBYVIsS0FBYjtBQUNEO0FBSHFDLENBSXZDOztBQUVEVixPQUFPQyxPQUFQLEdBQWlCa0IsV0FBakIsQzs7Ozs7O0FDUkEsTUFBTVAsa0JBQWtCLG1CQUFBSSxDQUFRLENBQVIsQ0FBeEI7O0FBRUEsTUFBTUksZUFBTixTQUE4QlIsZUFBOUIsQ0FBNkM7QUFDM0NqQixjQUFZUSxLQUFaLEVBQW1CQyxJQUFuQixFQUF5QkMsR0FBekIsRUFBOEJRLEtBQTlCLEVBQXFDUSxRQUFyQyxFQUE4QztBQUM1QyxVQUFNbEIsS0FBTixFQUFhQyxJQUFiLEVBQW1CQyxHQUFuQixFQUF3QlEsS0FBeEI7QUFDQSxTQUFLQyxNQUFMLEdBQWNPLFFBQWQ7QUFDRDtBQUowQyxDQUs1Qzs7QUFFRHJCLE9BQU9DLE9BQVAsR0FBaUJtQixlQUFqQixDOzs7Ozs7QUNUQSxNQUFNUixrQkFBa0IsbUJBQUFJLENBQVEsQ0FBUixDQUF4Qjs7QUFFQSxNQUFNTSxZQUFOLFNBQTJCVixlQUEzQixDQUEwQztBQUN4Q2pCLGNBQVlRLEtBQVosRUFBbUJDLElBQW5CLEVBQXlCQyxHQUF6QixFQUE4QlEsUUFBUSxRQUF0QyxFQUErQztBQUM3QyxVQUFNVixLQUFOLEVBQWFDLElBQWIsRUFBbUJDLEdBQW5CLEVBQXdCUSxLQUF4QjtBQUNEOztBQUVEQyxTQUFPRCxLQUFQLEVBQWE7QUFDWCxVQUFNVSxXQUFXLEtBQUtsQixHQUFMLENBQVNtQixNQUFULENBQWdCLFVBQWhCLENBQWpCO0FBQ0EsV0FBT0QsU0FBU0UsTUFBVCxHQUFpQkYsU0FBU0wsR0FBVCxFQUFqQixHQUFrQyxJQUF6QztBQUNEO0FBUnVDLENBU3pDOztBQUVEbEIsT0FBT0MsT0FBUCxHQUFpQnFCLFlBQWpCLEM7Ozs7OztBQ2JBLE1BQU1WLGtCQUFrQixtQkFBQUksQ0FBUSxDQUFSLENBQXhCOztBQUVBLE1BQU1VLGVBQU4sU0FBOEJkLGVBQTlCLENBQTZDO0FBQzNDakIsY0FBWVEsS0FBWixFQUFtQkMsSUFBbkIsRUFBeUJDLEdBQXpCLEVBQThCUSxRQUFRLFFBQXRDLEVBQStDO0FBQzdDLFVBQU1WLEtBQU4sRUFBYUMsSUFBYixFQUFtQkMsR0FBbkIsRUFBd0JRLEtBQXhCO0FBQ0Q7O0FBRURDLFNBQU9ELEtBQVAsRUFBYTtBQUNYLFdBQU8sS0FBS1IsR0FBTCxDQUFTRCxJQUFULENBQWMsU0FBZCxJQUEwQixLQUFLQyxHQUFMLENBQVNhLEdBQVQsRUFBMUIsR0FBMkMsSUFBbEQ7QUFDRDtBQVAwQyxDQVE1Qzs7QUFFRGxCLE9BQU9DLE9BQVAsR0FBaUJ5QixlQUFqQixDOzs7Ozs7QUNaQSxNQUFNVCxlQUFlLG1CQUFBRCxDQUFRLENBQVIsQ0FBckI7O0FBRUEsTUFBTVcsV0FBTixTQUEwQlYsWUFBMUIsQ0FBc0MsRUFDckM7O0FBRURqQixPQUFPQyxPQUFQLEdBQWlCMEIsV0FBakIsQzs7Ozs7O0FDTEEsTUFBTVYsZUFBZSxtQkFBQUQsQ0FBUSxDQUFSLENBQXJCOztBQUVBLE1BQU1ZLGFBQU4sU0FBNEJYLFlBQTVCLENBQXdDLEVBQ3ZDOztBQUVEakIsT0FBT0MsT0FBUCxHQUFpQjJCLGFBQWpCLEM7Ozs7OztBQ0xBLE1BQU0xQixpQkFBaUIsbUJBQUFjLENBQVEsQ0FBUixDQUF2Qjs7QUFFQSxNQUFNYSxjQUFOLFNBQTZCM0IsY0FBN0IsQ0FBMkM7QUFDekNQLGNBQVlRLEtBQVosRUFBbUJDLElBQW5CLEVBQXlCQyxHQUF6QixFQUE4QmdCLFFBQTlCLEVBQXVDO0FBQ3JDLFVBQU1sQixLQUFOLEVBQWFDLElBQWIsRUFBbUJDLEdBQW5CO0FBQ0EsU0FBS1IsTUFBTCxHQUFjd0IsUUFBZDtBQUNEO0FBSndDLENBSzFDOztBQUVEckIsT0FBT0MsT0FBUCxHQUFpQjRCLGNBQWpCLEM7Ozs7OztBQ1RBLE1BQU0zQixpQkFBaUIsbUJBQUFjLENBQVEsQ0FBUixDQUF2Qjs7QUFFQSxNQUFNYyxlQUFOLFNBQThCNUIsY0FBOUIsQ0FBNEM7QUFDMUNQLGNBQVlRLEtBQVosRUFBbUJDLElBQW5CLEVBQXlCQyxHQUF6QixFQUE4QjBCLFNBQTlCLEVBQXdDO0FBQ3RDLFVBQU01QixLQUFOLEVBQWFDLElBQWIsRUFBbUJDLEdBQW5CO0FBQ0EsU0FBSzBCLFNBQUwsR0FBaUJBLFNBQWpCO0FBQ0Q7O0FBRURsQyxTQUFPYSxLQUFQLEVBQWE7QUFDWCxTQUFLTCxHQUFMLENBQVMyQixJQUFULENBQWMsS0FBS0QsU0FBbkIsRUFBOEJyQixLQUE5QjtBQUNEO0FBUnlDLENBUzNDOztBQUVEVixPQUFPQyxPQUFQLEdBQWlCNkIsZUFBakIsQzs7Ozs7O0FDYkEsTUFBTTVCLGlCQUFpQixtQkFBQWMsQ0FBUSxDQUFSLENBQXZCOztBQUVBLE1BQU1pQixVQUFOLFNBQXlCL0IsY0FBekIsQ0FBdUM7QUFDckNMLFNBQU9hLEtBQVAsRUFBYTtBQUNYLFNBQUtMLEdBQUwsQ0FBUzZCLElBQVQsQ0FBY3hCLEtBQWQ7QUFDRDtBQUhvQyxDQUl0Qzs7QUFFRFYsT0FBT0MsT0FBUCxHQUFpQmdDLFVBQWpCLEM7Ozs7OztBQ1JBLE1BQU0vQixpQkFBaUIsbUJBQUFjLENBQVEsQ0FBUixDQUF2Qjs7QUFFQSxNQUFNbUIsV0FBTixTQUEwQmpDLGNBQTFCLENBQXdDO0FBQ3RDTCxTQUFPYSxLQUFQLEVBQWE7QUFDWCxRQUFHQSxVQUFVLElBQWIsRUFBa0I7QUFDaEIsV0FBS0wsR0FBTCxDQUFTRCxJQUFULENBQWMsU0FBZCxFQUF5QixLQUF6QjtBQUNBO0FBQ0Q7QUFDRCxTQUFLQyxHQUFMLENBQVNtQixNQUFULENBQWdCLGFBQWFkLEtBQWIsR0FBcUIsSUFBckMsRUFBMkNOLElBQTNDLENBQWdELFNBQWhELEVBQTJELElBQTNEO0FBQ0Q7QUFQcUMsQ0FRdkM7O0FBRURKLE9BQU9DLE9BQVAsR0FBaUJrQyxXQUFqQixDOzs7Ozs7QUNaQSxNQUFNakMsaUJBQWlCLG1CQUFBYyxDQUFRLENBQVIsQ0FBdkI7O0FBRUEsTUFBTW9CLGNBQU4sU0FBNkJsQyxjQUE3QixDQUEyQztBQUN6Q0wsU0FBT2EsS0FBUCxFQUFhO0FBQ1gsU0FBS0wsR0FBTCxDQUFTRCxJQUFULENBQWMsU0FBZCxFQUF5Qk0sVUFBVSxJQUFuQztBQUNEO0FBSHdDLENBSTFDOztBQUVEVixPQUFPQyxPQUFQLEdBQWlCbUMsY0FBakIsQzs7Ozs7O0FDUkEsTUFBTWpCLGNBQWMsbUJBQUFILENBQVEsQ0FBUixDQUFwQjs7QUFFQSxNQUFNcUIsVUFBTixTQUF5QmxCLFdBQXpCLENBQW9DLEVBQ25DOztBQUVEbkIsT0FBT0MsT0FBUCxHQUFpQm9DLFVBQWpCLEM7Ozs7OztBQ0xBLE1BQU1sQixjQUFjLG1CQUFBSCxDQUFRLENBQVIsQ0FBcEI7O0FBRUEsTUFBTXNCLFlBQU4sU0FBMkJuQixXQUEzQixDQUFzQyxFQUNyQzs7QUFFRG5CLE9BQU9DLE9BQVAsR0FBaUJxQyxZQUFqQixDOzs7Ozs7QUNMQSxNQUFNQyxlQUFOLENBQXFCO0FBQ25CNUMsY0FBWTZDLE9BQVosRUFBb0I7QUFDbEIsU0FBS0EsT0FBTCxHQUFlQSxPQUFmO0FBQ0Q7O0FBRURDLE1BQUlDLE1BQUosRUFBVztBQUNULFNBQUtGLE9BQUwsQ0FBYUcsSUFBYixDQUFrQkQsTUFBbEI7QUFDRDs7QUFFRDVDLFNBQU07QUFDSixTQUFLMEMsT0FBTCxDQUFhSSxPQUFiLENBQXFCRixVQUFVQSxPQUFPNUMsSUFBUCxFQUEvQjs7QUFFQSxXQUFPLElBQVA7QUFDRDs7QUFFREMsV0FBUTtBQUNOLFNBQUt5QyxPQUFMLENBQWFJLE9BQWIsQ0FBcUJGLFVBQVVBLE9BQU8zQyxNQUFQLEVBQS9COztBQUVBLFdBQU8sSUFBUDtBQUNEOztBQUVEOEMsYUFBVTtBQUNSLFNBQUtMLE9BQUwsQ0FDR2hCLE1BREgsQ0FDVWtCLFVBQVVBLE9BQU83QyxNQUFQLElBQWlCLE9BQU82QyxPQUFPN0MsTUFBZCxJQUF3QixRQUQ3RCxFQUVHK0MsT0FGSCxDQUVXRixVQUFVQSxPQUFPN0MsTUFBUCxDQUFjVSxJQUFkLEVBRnJCOztBQUlBLFdBQU8sSUFBUDtBQUNEOztBQUVEdUMsY0FBVztBQUNULFNBQUtOLE9BQUwsQ0FDR2hCLE1BREgsQ0FDVWtCLFVBQVVBLE9BQU85QyxPQUFQLElBQWtCLE9BQU84QyxPQUFPOUMsT0FBZCxJQUF5QixRQUQvRCxFQUVHZ0QsT0FGSCxDQUVXRixVQUFVQSxPQUFPOUMsT0FBUCxDQUFlVyxJQUFmLEVBRnJCOztBQUlBLFdBQU8sSUFBUDtBQUNEO0FBbkNrQixDQW9DcEI7O0FBRURQLE9BQU9DLE9BQVAsR0FBaUJzQyxlQUFqQixDOzs7Ozs7QUN0Q0F2QyxPQUFPQyxPQUFQLEdBQWlCO0FBQ2Y4QyxXQUFTO0FBQ1AzQixxQkFBaUIsbUJBQUFKLENBQVEsQ0FBUixDQURWO0FBRVBDLGtCQUFjLG1CQUFBRCxDQUFRLENBQVIsQ0FGUDtBQUdQTSxrQkFBYyxtQkFBQU4sQ0FBUSxDQUFSLENBSFA7QUFJUFUscUJBQWlCLG1CQUFBVixDQUFRLENBQVIsQ0FKVjtBQUtQVyxpQkFBYSxtQkFBQVgsQ0FBUSxDQUFSLENBTE47QUFNUFksbUJBQWUsbUJBQUFaLENBQVEsQ0FBUjtBQU5SLEdBRE07QUFTZmdDLFVBQVE7QUFDTm5CLG9CQUFnQixtQkFBQWIsQ0FBUSxFQUFSLENBRFY7QUFFTmMscUJBQWlCLG1CQUFBZCxDQUFRLEVBQVIsQ0FGWDtBQUdORyxpQkFBYSxtQkFBQUgsQ0FBUSxDQUFSLENBSFA7QUFJTmlCLGdCQUFZLG1CQUFBakIsQ0FBUSxFQUFSLENBSk47QUFLTm1CLGlCQUFhLG1CQUFBbkIsQ0FBUSxFQUFSLENBTFA7QUFNTm9CLG9CQUFnQixtQkFBQXBCLENBQVEsRUFBUixDQU5WO0FBT05xQixnQkFBWSxtQkFBQXJCLENBQVEsRUFBUixDQVBOO0FBUU5zQixrQkFBYyxtQkFBQXRCLENBQVEsRUFBUjtBQVJSLEdBVE87QUFtQmZpQyxpQkFBZSxtQkFBQWpDLENBQVEsRUFBUixDQW5CQTtBQW9CZnVCLG1CQUFpQixtQkFBQXZCLENBQVEsRUFBUixDQXBCRjtBQXFCZmtDLGtCQUFnQixtQkFBQWxDLENBQVEsRUFBUixDQXJCRDtBQXNCZm1DLG1CQUFpQixtQkFBQW5DLENBQVEsRUFBUixDQXRCRjtBQXVCZm9DLGVBQWEsbUJBQUFwQyxDQUFRLEVBQVIsQ0F2QkU7QUF3QmZxQyxjQUFZLG1CQUFBckMsQ0FBUSxFQUFSLENBeEJHO0FBeUJmc0MsZUFBYSxtQkFBQXRDLENBQVEsRUFBUixDQXpCRTtBQTBCZnVDLGtCQUFnQixtQkFBQXZDLENBQVEsRUFBUixDQTFCRDtBQTJCZndDLGNBQVksbUJBQUF4QyxDQUFRLEVBQVIsQ0EzQkc7QUE0QmZ5QyxnQkFBYyxtQkFBQXpDLENBQVEsRUFBUjtBQTVCQyxDQUFqQixDOzs7Ozs7QUNBQSxNQUFNdUIsa0JBQWtCLG1CQUFBdkIsQ0FBUSxFQUFSLENBQXhCO0FBQ0EsTUFBTXFDLGFBQWEsbUJBQUFyQyxDQUFRLEVBQVIsQ0FBbkI7QUFDQSxNQUFNb0MsY0FBYyxtQkFBQXBDLENBQVEsRUFBUixDQUFwQjtBQUNBLE1BQU1zQyxjQUFjLG1CQUFBdEMsQ0FBUSxFQUFSLENBQXBCO0FBQ0EsTUFBTXVDLGlCQUFpQixtQkFBQXZDLENBQVEsRUFBUixDQUF2QjtBQUNBLE1BQU13QyxhQUFhLG1CQUFBeEMsQ0FBUSxFQUFSLENBQW5CO0FBQ0EsTUFBTXlDLGVBQWUsbUJBQUF6QyxDQUFRLEVBQVIsQ0FBckI7O0FBRUEsTUFBTWlDLGFBQU4sQ0FBbUI7QUFDakJ0RCxjQUFZUSxLQUFaLEVBQW1CRSxHQUFuQixFQUF1QjtBQUNyQixTQUFLRixLQUFMLEdBQWFBLEtBQWI7QUFDQSxTQUFLRSxHQUFMLEdBQVdBLEdBQVg7QUFDRDs7QUFFRHFELGdCQUFjckQsR0FBZCxFQUFrQjtBQUNoQixZQUFPQSxJQUFJRCxJQUFKLENBQVMsU0FBVCxDQUFQO0FBQ0UsV0FBSyxPQUFMO0FBQ0UsZ0JBQU9DLElBQUkyQixJQUFKLENBQVMsTUFBVCxDQUFQO0FBQ0UsZUFBSyxPQUFMO0FBQ0UsbUJBQU9zQixXQUFQO0FBQ0E7QUFDRixlQUFLLFVBQUw7QUFDRSxtQkFBT0MsY0FBUDtBQUNBO0FBQ0YsZUFBSyxNQUFMO0FBQ0UsbUJBQU9DLFVBQVA7QUFDQTtBQUNGO0FBQ0UsbUJBQU9KLFdBQVA7QUFYSjtBQWFBO0FBQ0YsV0FBSyxVQUFMO0FBQ0UsZUFBT0ksVUFBUDtBQUNBO0FBQ0YsV0FBSyxRQUFMO0FBQ0UsZUFBT0MsWUFBUDtBQUNBO0FBQ0Y7QUFDRSxlQUFPSixVQUFQO0FBdkJKO0FBeUJEOztBQUVETSxnQkFBY0MsTUFBZCxFQUFxQjtBQUNuQixRQUFHLENBQUNDLE1BQU1DLE9BQU4sQ0FBY0YsTUFBZCxDQUFKLEVBQTBCO0FBQ3hCQSxlQUFTLENBQUNBLE1BQUQsQ0FBVDtBQUNEOztBQUVELFdBQU9BLE9BQU9HLEdBQVAsQ0FBVyxVQUFTSCxNQUFULEVBQWdCO0FBQ2hDLFVBQUcsT0FBT0EsTUFBUCxJQUFpQixRQUFwQixFQUE2QjtBQUMzQkEsaUJBQVM7QUFDUEksb0JBQVVKO0FBREgsU0FBVDtBQUdEO0FBQ0QsVUFBRyxPQUFPQSxPQUFPdkQsR0FBZCxJQUFxQixRQUF4QixFQUFpQztBQUMvQnVELGVBQU92RCxHQUFQLEdBQWEsS0FBS0EsR0FBTCxDQUFTNEQsSUFBVCxDQUFjTCxPQUFPSSxRQUFyQixDQUFiO0FBQ0Q7QUFDRCxVQUFHLE9BQU9KLE9BQU9sQixNQUFkLElBQXdCLFVBQTNCLEVBQXNDO0FBQ3BDa0IsZUFBT2xCLE1BQVAsR0FBZ0IsS0FBS2dCLGFBQUwsQ0FBbUJFLE9BQU92RCxHQUExQixDQUFoQjtBQUNEOztBQUVELGFBQU91RCxNQUFQO0FBQ0QsS0FkaUIsQ0FjaEI5RCxJQWRnQixDQWNYLElBZFcsQ0FBWCxDQUFQO0FBZUQ7O0FBRURvRSxlQUFheEIsTUFBYixFQUFxQmtCLE1BQXJCLEVBQTRCO0FBQzFCLFFBQUcsT0FBT2xCLE9BQU85QyxPQUFkLElBQXlCLFFBQTVCLEVBQXFDO0FBQ25DLFVBQUcsT0FBT2dFLE9BQU8vQyxLQUFkLElBQXVCLFFBQTFCLEVBQW1DO0FBQ2pDNkIsZUFBTzlDLE9BQVAsQ0FBZWlCLEtBQWYsR0FBdUIrQyxPQUFPL0MsS0FBOUI7QUFDRDtBQUNELFVBQUcsT0FBTytDLE9BQU85QyxNQUFkLElBQXdCLFVBQTNCLEVBQXNDO0FBQ3BDNEIsZUFBTzlDLE9BQVAsQ0FBZWEsT0FBZixHQUF5Qm1ELE9BQU85QyxNQUFoQztBQUNEO0FBQ0Y7QUFDRCxRQUFHLE9BQU80QixPQUFPN0MsTUFBZCxJQUF3QixRQUEzQixFQUFvQztBQUNsQyxVQUFHLE9BQU8rRCxPQUFPN0IsU0FBZCxJQUEyQixRQUE5QixFQUF1QztBQUNyQ1csZUFBTzdDLE1BQVAsQ0FBY2tDLFNBQWQsR0FBMEI2QixPQUFPN0IsU0FBakM7QUFDRDtBQUNELFVBQUcsT0FBTzZCLE9BQU8vRCxNQUFkLElBQXdCLFVBQTNCLEVBQXNDO0FBQ3BDNkMsZUFBTzdDLE1BQVAsQ0FBY1ksT0FBZCxHQUF3Qm1ELE9BQU8vRCxNQUEvQjtBQUNEO0FBQ0Y7QUFDRjs7QUFFRHNFLFFBQU1DLE9BQU4sRUFBYztBQUNaLFFBQUlDLFdBQVcsRUFBZjtBQUNBLFNBQUksSUFBSWpFLElBQVIsSUFBZ0JnRSxPQUFoQixFQUF3QjtBQUN0QixVQUFJUixTQUFTLEtBQUtELGFBQUwsQ0FBbUJTLFFBQVFoRSxJQUFSLENBQW5CLENBQWI7O0FBRUEsV0FBSSxJQUFJa0UsQ0FBUixJQUFhVixNQUFiLEVBQW9CO0FBQ2xCLFlBQUlsQixTQUFTLEtBQUs2QixTQUFTQyxTQUFULENBQW1CMUUsSUFBbkIsQ0FBd0IyRSxLQUF4QixDQUNoQmIsT0FBT1UsQ0FBUCxFQUFVNUIsTUFETSxFQUVoQixDQUFDLElBQUQsRUFBTyxLQUFLdkMsS0FBWixFQUFtQkMsSUFBbkIsRUFBeUJ3RCxPQUFPVSxDQUFQLEVBQVVqRSxHQUFuQyxDQUZnQixDQUFMLEdBQWI7QUFJQSxhQUFLNkQsWUFBTCxDQUFrQnhCLE1BQWxCLEVBQTBCa0IsT0FBT1UsQ0FBUCxDQUExQjs7QUFFQUQsaUJBQVMxQixJQUFULENBQWNELE1BQWQ7QUFDRDtBQUNGOztBQUVELFdBQU8sSUFBSUgsZUFBSixDQUFvQjhCLFFBQXBCLENBQVA7QUFDRDtBQTVGZ0IsQ0E2RmxCOztBQUVEckUsT0FBT0MsT0FBUCxHQUFpQmdELGFBQWpCLEM7Ozs7OztBQ3ZHQSxNQUFNdkQsaUJBQWlCLG1CQUFBc0IsQ0FBUSxDQUFSLENBQXZCO0FBQ0EsTUFBTUksa0JBQWtCLG1CQUFBSixDQUFRLENBQVIsQ0FBeEI7QUFDQSxNQUFNYSxpQkFBaUIsbUJBQUFiLENBQVEsRUFBUixDQUF2Qjs7QUFFQSxNQUFNa0MsY0FBTixTQUE2QnhELGNBQTdCLENBQTJDO0FBQ3pDQyxjQUFZUSxLQUFaLEVBQW1CQyxJQUFuQixFQUF5QkMsR0FBekIsRUFBOEJRLEtBQTlCLEVBQXFDQyxNQUFyQyxFQUE2Q2pCLE1BQTdDLEVBQW9EO0FBQ2xELFVBQ0VpQixTQUFRLElBQUlNLGVBQUosQ0FBb0JqQixLQUFwQixFQUEyQkMsSUFBM0IsRUFBaUNDLEdBQWpDLEVBQXNDUSxLQUF0QyxFQUE2Q0MsTUFBN0MsQ0FBUixHQUErRCxJQURqRSxFQUVFakIsU0FBUSxJQUFJZ0MsY0FBSixDQUFtQjFCLEtBQW5CLEVBQTBCQyxJQUExQixFQUFnQ0MsR0FBaEMsRUFBcUNSLE1BQXJDLENBQVIsR0FBdUQsSUFGekQ7QUFJRDtBQU53QyxDQU8xQzs7QUFFREcsT0FBT0MsT0FBUCxHQUFpQmlELGNBQWpCLEM7Ozs7OztBQ2JBLE1BQU14RCxpQkFBaUIsbUJBQUFzQixDQUFRLENBQVIsQ0FBdkI7QUFDQSxNQUFNYyxrQkFBa0IsbUJBQUFkLENBQVEsRUFBUixDQUF4Qjs7QUFFQSxNQUFNbUMsZUFBTixTQUE4QnpELGNBQTlCLENBQTRDO0FBQzFDQyxjQUFZUSxLQUFaLEVBQW1CQyxJQUFuQixFQUF5QkMsR0FBekIsRUFBOEIwQixTQUE5QixFQUF3QztBQUN0QyxVQUNFLElBREYsRUFFRSxJQUFJRCxlQUFKLENBQW9CM0IsS0FBcEIsRUFBMkJDLElBQTNCLEVBQWlDQyxHQUFqQyxFQUFzQzBCLFNBQXRDLENBRkY7QUFJRDtBQU55QyxDQU8zQzs7QUFFRC9CLE9BQU9DLE9BQVAsR0FBaUJrRCxlQUFqQixDOzs7Ozs7QUNaQSxNQUFNekQsaUJBQWlCLG1CQUFBc0IsQ0FBUSxDQUFSLENBQXZCO0FBQ0EsTUFBTUMsZUFBZSxtQkFBQUQsQ0FBUSxDQUFSLENBQXJCO0FBQ0EsTUFBTUcsY0FBYyxtQkFBQUgsQ0FBUSxDQUFSLENBQXBCOztBQUVBLE1BQU1vQyxXQUFOLFNBQTBCMUQsY0FBMUIsQ0FBd0M7QUFDdENDLGNBQVlRLEtBQVosRUFBbUJDLElBQW5CLEVBQXlCQyxHQUF6QixFQUE4QlEsUUFBUSxRQUF0QyxFQUErQztBQUM3QyxVQUNFLElBQUlJLFlBQUosQ0FBaUJkLEtBQWpCLEVBQXdCQyxJQUF4QixFQUE4QkMsR0FBOUIsRUFBbUNRLEtBQW5DLENBREYsRUFFRSxJQUFJTSxXQUFKLENBQWdCaEIsS0FBaEIsRUFBdUJDLElBQXZCLEVBQTZCQyxHQUE3QixDQUZGO0FBSUQ7QUFOcUMsQ0FPdkM7O0FBRURMLE9BQU9DLE9BQVAsR0FBaUJtRCxXQUFqQixDOzs7Ozs7QUNiQSxNQUFNMUQsaUJBQWlCLG1CQUFBc0IsQ0FBUSxDQUFSLENBQXZCO0FBQ0EsTUFBTWlCLGFBQWEsbUJBQUFqQixDQUFRLEVBQVIsQ0FBbkI7O0FBRUEsTUFBTXFDLFVBQU4sU0FBeUIzRCxjQUF6QixDQUF1QztBQUNyQ0MsY0FBWVEsS0FBWixFQUFtQkMsSUFBbkIsRUFBeUJDLEdBQXpCLEVBQTZCO0FBQzNCLFVBQ0UsSUFERixFQUVFLElBQUk0QixVQUFKLENBQWU5QixLQUFmLEVBQXNCQyxJQUF0QixFQUE0QkMsR0FBNUIsQ0FGRjtBQUlEO0FBTm9DLENBT3RDOztBQUVETCxPQUFPQyxPQUFQLEdBQWlCb0QsVUFBakIsQzs7Ozs7O0FDWkEsTUFBTTNELGlCQUFpQixtQkFBQXNCLENBQVEsQ0FBUixDQUF2QjtBQUNBLE1BQU1NLGVBQWUsbUJBQUFOLENBQVEsQ0FBUixDQUFyQjtBQUNBLE1BQU1tQixjQUFjLG1CQUFBbkIsQ0FBUSxFQUFSLENBQXBCOztBQUVBLE1BQU1zQyxXQUFOLFNBQTBCNUQsY0FBMUIsQ0FBd0M7QUFDdENDLGNBQVlRLEtBQVosRUFBbUJDLElBQW5CLEVBQXlCQyxHQUF6QixFQUE4QlEsUUFBUSxRQUF0QyxFQUErQztBQUM3QyxVQUNFLElBQUlTLFlBQUosQ0FBaUJuQixLQUFqQixFQUF3QkMsSUFBeEIsRUFBOEJDLEdBQTlCLEVBQW1DUSxLQUFuQyxDQURGLEVBRUUsSUFBSXNCLFdBQUosQ0FBZ0JoQyxLQUFoQixFQUF1QkMsSUFBdkIsRUFBNkJDLEdBQTdCLENBRkY7QUFJRDtBQU5xQyxDQU92Qzs7QUFFREwsT0FBT0MsT0FBUCxHQUFpQnFELFdBQWpCLEM7Ozs7OztBQ2JBLE1BQU01RCxpQkFBaUIsbUJBQUFzQixDQUFRLENBQVIsQ0FBdkI7QUFDQSxNQUFNVSxrQkFBa0IsbUJBQUFWLENBQVEsQ0FBUixDQUF4QjtBQUNBLE1BQU1vQixpQkFBaUIsbUJBQUFwQixDQUFRLEVBQVIsQ0FBdkI7O0FBRUEsTUFBTXVDLGNBQU4sU0FBNkI3RCxjQUE3QixDQUEyQztBQUN6Q0MsY0FBWVEsS0FBWixFQUFtQkMsSUFBbkIsRUFBeUJDLEdBQXpCLEVBQThCUSxRQUFRLFFBQXRDLEVBQStDO0FBQzdDLFVBQ0UsSUFBSWEsZUFBSixDQUFvQnZCLEtBQXBCLEVBQTJCQyxJQUEzQixFQUFpQ0MsR0FBakMsRUFBc0NRLEtBQXRDLENBREYsRUFFRSxJQUFJdUIsY0FBSixDQUFtQmpDLEtBQW5CLEVBQTBCQyxJQUExQixFQUFnQ0MsR0FBaEMsQ0FGRjtBQUlEO0FBTndDLENBTzFDOztBQUVETCxPQUFPQyxPQUFQLEdBQWlCc0QsY0FBakIsQzs7Ozs7O0FDYkEsTUFBTTdELGlCQUFpQixtQkFBQXNCLENBQVEsQ0FBUixDQUF2QjtBQUNBLE1BQU1XLGNBQWMsbUJBQUFYLENBQVEsQ0FBUixDQUFwQjtBQUNBLE1BQU1xQixhQUFhLG1CQUFBckIsQ0FBUSxFQUFSLENBQW5COztBQUVBLE1BQU13QyxVQUFOLFNBQXlCOUQsY0FBekIsQ0FBdUM7QUFDckNDLGNBQVlRLEtBQVosRUFBbUJDLElBQW5CLEVBQXlCQyxHQUF6QixFQUE4QlEsUUFBUSxRQUF0QyxFQUErQztBQUM3QyxVQUNFLElBQUljLFdBQUosQ0FBZ0J4QixLQUFoQixFQUF1QkMsSUFBdkIsRUFBNkJDLEdBQTdCLEVBQWtDUSxLQUFsQyxDQURGLEVBRUUsSUFBSXdCLFVBQUosQ0FBZWxDLEtBQWYsRUFBc0JDLElBQXRCLEVBQTRCQyxHQUE1QixDQUZGO0FBSUQ7QUFOb0MsQ0FPdEM7O0FBRURMLE9BQU9DLE9BQVAsR0FBaUJ1RCxVQUFqQixDOzs7Ozs7QUNiQSxNQUFNOUQsaUJBQWlCLG1CQUFBc0IsQ0FBUSxDQUFSLENBQXZCO0FBQ0EsTUFBTVksZ0JBQWdCLG1CQUFBWixDQUFRLENBQVIsQ0FBdEI7QUFDQSxNQUFNc0IsZUFBZSxtQkFBQXRCLENBQVEsRUFBUixDQUFyQjs7QUFFQSxNQUFNeUMsWUFBTixTQUEyQi9ELGNBQTNCLENBQXlDO0FBQ3ZDQyxjQUFZUSxLQUFaLEVBQW1CQyxJQUFuQixFQUF5QkMsR0FBekIsRUFBOEJRLFFBQVEsUUFBdEMsRUFBK0M7QUFDN0MsVUFDRSxJQUFJZSxhQUFKLENBQWtCekIsS0FBbEIsRUFBeUJDLElBQXpCLEVBQStCQyxHQUEvQixFQUFvQ1EsS0FBcEMsQ0FERixFQUVFLElBQUl5QixZQUFKLENBQWlCbkMsS0FBakIsRUFBd0JDLElBQXhCLEVBQThCQyxHQUE5QixDQUZGO0FBSUQ7QUFOc0MsQ0FPeEM7O0FBRURMLE9BQU9DLE9BQVAsR0FBaUJ3RCxZQUFqQixDIiwiZmlsZSI6ImJpbmRlci5qcyIsInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKSB7XG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG4gXHRcdH1cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGk6IG1vZHVsZUlkLFxuIFx0XHRcdGw6IGZhbHNlLFxuIFx0XHRcdGV4cG9ydHM6IHt9XG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmwgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwge1xuIFx0XHRcdFx0Y29uZmlndXJhYmxlOiBmYWxzZSxcbiBcdFx0XHRcdGVudW1lcmFibGU6IHRydWUsXG4gXHRcdFx0XHRnZXQ6IGdldHRlclxuIFx0XHRcdH0pO1xuIFx0XHR9XG4gXHR9O1xuXG4gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuIFx0XHRyZXR1cm4gZ2V0dGVyO1xuIFx0fTtcblxuIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKF9fd2VicGFja19yZXF1aXJlX18ucyA9IDE4KTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyB3ZWJwYWNrL2Jvb3RzdHJhcCBiYmQzYWFkYzNlZDRjMGUzMTZhMCIsImNsYXNzIEFic3RyYWN0QmluZGVye1xuICBjb25zdHJ1Y3RvcihoYW5kbGVyLCByZW5kZXIpe1xuICAgIHRoaXMuaGFuZGxlciA9IGhhbmRsZXI7XG4gICAgdGhpcy5yZW5kZXIgPSByZW5kZXI7XG4gIH1cblxuICBiaW5kKCl7XG4gICAgaWYodGhpcy5oYW5kbGVyKXtcbiAgICAgIHRoaXMuaGFuZGxlci5iaW5kKCk7XG4gICAgfVxuICAgIGlmKHRoaXMucmVuZGVyKXtcbiAgICAgIHRoaXMucmVuZGVyLmJpbmQoKTtcbiAgICB9XG5cbiAgICByZXR1cm4gdGhpcztcbiAgfVxuXG4gIHVuYmluZCgpe1xuICAgIGlmKHRoaXMuaGFuZGxlcil7XG4gICAgICB0aGlzLmhhbmRsZXIudW5iaW5kKCk7XG4gICAgfVxuICAgIGlmKHRoaXMucmVuZGVyKXtcbiAgICAgIHRoaXMucmVuZGVyLnVuYmluZCgpO1xuICAgIH1cblxuICAgIHJldHVybiB0aGlzO1xuICB9XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IEFic3RyYWN0QmluZGVyO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL0Fic3RyYWN0QmluZGVyLmpzIiwiY2xhc3MgQWJzdHJhY3RSZW5kZXJ7XG4gIGNvbnN0cnVjdG9yKG1vZGVsLCBwcm9wLCAkZWwpe1xuICAgIHRoaXMubW9kZWwgPSBtb2RlbDtcbiAgICB0aGlzLnByb3AgPSBwcm9wO1xuICAgIHRoaXMuJGVsID0gJGVsO1xuICB9XG5cbiAgYmluZCgpe1xuICAgIHRoaXMubW9kZWwub24oJ2NoYW5nZTonICsgdGhpcy5wcm9wLCB0aGlzLnN5bmMuYmluZCh0aGlzKSk7XG5cbiAgICByZXR1cm4gdGhpcztcbiAgfVxuXG4gIHVuYmluZCgpe1xuICAgIHRoaXMubW9kZWwub2ZmKCdjaGFuZ2U6JyArIHRoaXMucHJvcCwgdGhpcy5zeW5jLmJpbmQodGhpcykpO1xuXG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cblxuICBwcmVwYXJlKHZhbHVlKXtcbiAgICByZXR1cm4gdmFsdWU7XG4gIH1cblxuICBzeW5jKCl7XG4gICAgbGV0IHZhbHVlID0gdGhpcy5tb2RlbC5nZXQodGhpcy5wcm9wKTtcbiAgICB2YWx1ZSA9IHRoaXMucHJlcGFyZSh2YWx1ZSk7XG4gICAgdGhpcy5yZW5kZXIodmFsdWUpO1xuXG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cblxuICByZW5kZXIodmFsdWUpe1xuICB9XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IEFic3RyYWN0UmVuZGVyO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL1JlbmRlci9BYnN0cmFjdFJlbmRlci5qcyIsImNsYXNzIEFic3RyYWN0SGFuZGxlcntcbiAgY29uc3RydWN0b3IobW9kZWwsIHByb3AsICRlbCwgZXZlbnQpe1xuICAgIHRoaXMubW9kZWwgPSBtb2RlbDtcbiAgICB0aGlzLnByb3AgPSBwcm9wO1xuICAgIHRoaXMuJGVsID0gJGVsO1xuICAgIHRoaXMuZXZlbnQgPSBldmVudDtcbiAgfVxuXG4gIGJpbmQoKXtcbiAgICB0aGlzLiRlbC5vbih0aGlzLmV2ZW50LCB0aGlzLnN5bmMuYmluZCh0aGlzKSk7XG5cbiAgICByZXR1cm4gdGhpcztcbiAgfVxuXG4gIHVuYmluZCgpe1xuICAgIHRoaXMuJGVsLm9mZih0aGlzLmV2ZW50LCB0aGlzLnN5bmMuYmluZCh0aGlzKSk7XG5cbiAgICByZXR1cm4gdGhpcztcbiAgfVxuXG4gIHByZXBhcmUodmFsdWUpe1xuICAgIHJldHVybiB2YWx1ZTtcbiAgfVxuXG4gIHN5bmMoZXZlbnQpe1xuICAgIGxldCB2YWx1ZSA9IHRoaXMuaGFuZGxlKGV2ZW50KTtcbiAgICB2YWx1ZSA9IHRoaXMucHJlcGFyZSh2YWx1ZSk7XG5cbiAgICB0aGlzLm1vZGVsLnNldCh0aGlzLnByb3AsIHZhbHVlKTtcblxuICAgIHJldHVybiB0aGlzO1xuICB9XG5cbiAgaGFuZGxlKGV2ZW50KXtcbiAgfVxufTtcblxubW9kdWxlLmV4cG9ydHMgPSBBYnN0cmFjdEhhbmRsZXI7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvSGFuZGxlci9BYnN0cmFjdEhhbmRsZXIuanMiLCJjb25zdCBBYnN0cmFjdEhhbmRsZXIgPSByZXF1aXJlKCcuL0Fic3RyYWN0SGFuZGxlcicpO1xuXG5jbGFzcyBWYWx1ZUhhbmRsZXIgZXh0ZW5kcyBBYnN0cmFjdEhhbmRsZXJ7XG4gIGNvbnN0cnVjdG9yKG1vZGVsLCBwcm9wLCAkZWwsIGV2ZW50ID0gJ2NoYW5nZScpe1xuICAgIHN1cGVyKG1vZGVsLCBwcm9wLCAkZWwsIGV2ZW50KTtcbiAgfVxuXG4gIGhhbmRsZShldmVudCl7XG4gICAgcmV0dXJuIHRoaXMuJGVsLnZhbCgpO1xuICB9XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IFZhbHVlSGFuZGxlcjtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9IYW5kbGVyL1ZhbHVlSGFuZGxlci5qcyIsImNvbnN0IEFic3RyYWN0UmVuZGVyID0gcmVxdWlyZSgnLi9BYnN0cmFjdFJlbmRlcicpO1xuXG5jbGFzcyBWYWx1ZVJlbmRlciBleHRlbmRzIEFic3RyYWN0UmVuZGVye1xuICByZW5kZXIodmFsdWUpe1xuICAgIHRoaXMuJGVsLnZhbCh2YWx1ZSk7XG4gIH1cbn07XG5cbm1vZHVsZS5leHBvcnRzID0gVmFsdWVSZW5kZXI7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvUmVuZGVyL1ZhbHVlUmVuZGVyLmpzIiwiY29uc3QgQWJzdHJhY3RIYW5kbGVyID0gcmVxdWlyZSgnLi9BYnN0cmFjdEhhbmRsZXInKTtcblxuY2xhc3MgQ2FsbGJhY2tIYW5kbGVyIGV4dGVuZHMgQWJzdHJhY3RIYW5kbGVye1xuICBjb25zdHJ1Y3Rvcihtb2RlbCwgcHJvcCwgJGVsLCBldmVudCwgY2FsbGJhY2spe1xuICAgIHN1cGVyKG1vZGVsLCBwcm9wLCAkZWwsIGV2ZW50KTtcbiAgICB0aGlzLmhhbmRsZSA9IGNhbGxiYWNrO1xuICB9XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IENhbGxiYWNrSGFuZGxlcjtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9IYW5kbGVyL0NhbGxiYWNrSGFuZGxlci5qcyIsImNvbnN0IEFic3RyYWN0SGFuZGxlciA9IHJlcXVpcmUoJy4vQWJzdHJhY3RIYW5kbGVyJyk7XG5cbmNsYXNzIFJhZGlvSGFuZGxlciBleHRlbmRzIEFic3RyYWN0SGFuZGxlcntcbiAgY29uc3RydWN0b3IobW9kZWwsIHByb3AsICRlbCwgZXZlbnQgPSAnY2hhbmdlJyl7XG4gICAgc3VwZXIobW9kZWwsIHByb3AsICRlbCwgZXZlbnQpO1xuICB9XG5cbiAgaGFuZGxlKGV2ZW50KXtcbiAgICBjb25zdCAkY2hlY2tlZCA9IHRoaXMuJGVsLmZpbHRlcignOmNoZWNrZWQnKTtcbiAgICByZXR1cm4gJGNoZWNrZWQubGVuZ3RoPyAkY2hlY2tlZC52YWwoKSA6IG51bGw7XG4gIH1cbn07XG5cbm1vZHVsZS5leHBvcnRzID0gUmFkaW9IYW5kbGVyO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL0hhbmRsZXIvUmFkaW9IYW5kbGVyLmpzIiwiY29uc3QgQWJzdHJhY3RIYW5kbGVyID0gcmVxdWlyZSgnLi9BYnN0cmFjdEhhbmRsZXInKTtcblxuY2xhc3MgQ2hlY2tib3hIYW5kbGVyIGV4dGVuZHMgQWJzdHJhY3RIYW5kbGVye1xuICBjb25zdHJ1Y3Rvcihtb2RlbCwgcHJvcCwgJGVsLCBldmVudCA9ICdjaGFuZ2UnKXtcbiAgICBzdXBlcihtb2RlbCwgcHJvcCwgJGVsLCBldmVudCk7XG4gIH1cblxuICBoYW5kbGUoZXZlbnQpe1xuICAgIHJldHVybiB0aGlzLiRlbC5wcm9wKCdjaGVja2VkJyk/IHRoaXMuJGVsLnZhbCgpIDogbnVsbDtcbiAgfVxufTtcblxubW9kdWxlLmV4cG9ydHMgPSBDaGVja2JveEhhbmRsZXI7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvSGFuZGxlci9DaGVja2JveEhhbmRsZXIuanMiLCJjb25zdCBWYWx1ZUhhbmRsZXIgPSByZXF1aXJlKCcuL1ZhbHVlSGFuZGxlcicpO1xuXG5jbGFzcyBUZXh0SGFuZGxlciBleHRlbmRzIFZhbHVlSGFuZGxlcntcbn07XG5cbm1vZHVsZS5leHBvcnRzID0gVGV4dEhhbmRsZXI7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvSGFuZGxlci9UZXh0SGFuZGxlci5qcyIsImNvbnN0IFZhbHVlSGFuZGxlciA9IHJlcXVpcmUoJy4vVmFsdWVIYW5kbGVyJyk7XG5cbmNsYXNzIFNlbGVjdEhhbmRsZXIgZXh0ZW5kcyBWYWx1ZUhhbmRsZXJ7XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IFNlbGVjdEhhbmRsZXI7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvSGFuZGxlci9TZWxlY3RIYW5kbGVyLmpzIiwiY29uc3QgQWJzdHJhY3RSZW5kZXIgPSByZXF1aXJlKCcuL0Fic3RyYWN0UmVuZGVyJyk7XG5cbmNsYXNzIENhbGxiYWNrUmVuZGVyIGV4dGVuZHMgQWJzdHJhY3RSZW5kZXJ7XG4gIGNvbnN0cnVjdG9yKG1vZGVsLCBwcm9wLCAkZWwsIGNhbGxiYWNrKXtcbiAgICBzdXBlcihtb2RlbCwgcHJvcCwgJGVsKTtcbiAgICB0aGlzLnJlbmRlciA9IGNhbGxiYWNrO1xuICB9XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IENhbGxiYWNrUmVuZGVyO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL1JlbmRlci9DYWxsYmFja1JlbmRlci5qcyIsImNvbnN0IEFic3RyYWN0UmVuZGVyID0gcmVxdWlyZSgnLi9BYnN0cmFjdFJlbmRlcicpO1xuXG5jbGFzcyBBdHRyaWJ1dGVSZW5kZXIgZXh0ZW5kcyBBYnN0cmFjdFJlbmRlcntcbiAgY29uc3RydWN0b3IobW9kZWwsIHByb3AsICRlbCwgYXR0cmlidXRlKXtcbiAgICBzdXBlcihtb2RlbCwgcHJvcCwgJGVsKTtcbiAgICB0aGlzLmF0dHJpYnV0ZSA9IGF0dHJpYnV0ZTtcbiAgfVxuXG4gIHJlbmRlcih2YWx1ZSl7XG4gICAgdGhpcy4kZWwuYXR0cih0aGlzLmF0dHJpYnV0ZSwgdmFsdWUpO1xuICB9XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IEF0dHJpYnV0ZVJlbmRlcjtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9SZW5kZXIvQXR0cmlidXRlUmVuZGVyLmpzIiwiY29uc3QgQWJzdHJhY3RSZW5kZXIgPSByZXF1aXJlKCcuL0Fic3RyYWN0UmVuZGVyJyk7XG5cbmNsYXNzIEh0bWxSZW5kZXIgZXh0ZW5kcyBBYnN0cmFjdFJlbmRlcntcbiAgcmVuZGVyKHZhbHVlKXtcbiAgICB0aGlzLiRlbC5odG1sKHZhbHVlKTtcbiAgfVxufTtcblxubW9kdWxlLmV4cG9ydHMgPSBIdG1sUmVuZGVyO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL1JlbmRlci9IdG1sUmVuZGVyLmpzIiwiY29uc3QgQWJzdHJhY3RSZW5kZXIgPSByZXF1aXJlKCcuL0Fic3RyYWN0UmVuZGVyJyk7XG5cbmNsYXNzIFJhZGlvUmVuZGVyIGV4dGVuZHMgQWJzdHJhY3RSZW5kZXJ7XG4gIHJlbmRlcih2YWx1ZSl7XG4gICAgaWYodmFsdWUgPT09IG51bGwpe1xuICAgICAgdGhpcy4kZWwucHJvcCgnY2hlY2tlZCcsIGZhbHNlKTtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgdGhpcy4kZWwuZmlsdGVyKCdbdmFsdWU9XCInICsgdmFsdWUgKyAnXCJdJykucHJvcCgnY2hlY2tlZCcsIHRydWUpO1xuICB9XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IFJhZGlvUmVuZGVyO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL1JlbmRlci9SYWRpb1JlbmRlci5qcyIsImNvbnN0IEFic3RyYWN0UmVuZGVyID0gcmVxdWlyZSgnLi9BYnN0cmFjdFJlbmRlcicpO1xuXG5jbGFzcyBDaGVja2JveFJlbmRlciBleHRlbmRzIEFic3RyYWN0UmVuZGVye1xuICByZW5kZXIodmFsdWUpe1xuICAgIHRoaXMuJGVsLnByb3AoJ2NoZWNrZWQnLCB2YWx1ZSAhPT0gbnVsbCk7XG4gIH1cbn07XG5cbm1vZHVsZS5leHBvcnRzID0gQ2hlY2tib3hSZW5kZXI7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvUmVuZGVyL0NoZWNrYm94UmVuZGVyLmpzIiwiY29uc3QgVmFsdWVSZW5kZXIgPSByZXF1aXJlKCcuL1ZhbHVlUmVuZGVyJyk7XG5cbmNsYXNzIFRleHRSZW5kZXIgZXh0ZW5kcyBWYWx1ZVJlbmRlcntcbn07XG5cbm1vZHVsZS5leHBvcnRzID0gVGV4dFJlbmRlcjtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9SZW5kZXIvVGV4dFJlbmRlci5qcyIsImNvbnN0IFZhbHVlUmVuZGVyID0gcmVxdWlyZSgnLi9WYWx1ZVJlbmRlcicpO1xuXG5jbGFzcyBTZWxlY3RSZW5kZXIgZXh0ZW5kcyBWYWx1ZVJlbmRlcntcbn07XG5cbm1vZHVsZS5leHBvcnRzID0gU2VsZWN0UmVuZGVyO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL1JlbmRlci9TZWxlY3RSZW5kZXIuanMiLCJjbGFzcyBDb21wb3NpdGVCaW5kZXJ7XG4gIGNvbnN0cnVjdG9yKGJpbmRlcnMpe1xuICAgIHRoaXMuYmluZGVycyA9IGJpbmRlcnM7XG4gIH1cblxuICBhZGQoYmluZGVyKXtcbiAgICB0aGlzLmJpbmRlcnMucHVzaChiaW5kZXIpO1xuICB9XG5cbiAgYmluZCgpe1xuICAgIHRoaXMuYmluZGVycy5mb3JFYWNoKGJpbmRlciA9PiBiaW5kZXIuYmluZCgpKTtcblxuICAgIHJldHVybiB0aGlzO1xuICB9XG5cbiAgdW5iaW5kKCl7XG4gICAgdGhpcy5iaW5kZXJzLmZvckVhY2goYmluZGVyID0+IGJpbmRlci51bmJpbmQoKSk7XG5cbiAgICByZXR1cm4gdGhpcztcbiAgfVxuXG4gIHN5bmNWaWV3KCl7XG4gICAgdGhpcy5iaW5kZXJzXG4gICAgICAuZmlsdGVyKGJpbmRlciA9PiBiaW5kZXIucmVuZGVyICYmIHR5cGVvZiBiaW5kZXIucmVuZGVyID09ICdvYmplY3QnKVxuICAgICAgLmZvckVhY2goYmluZGVyID0+IGJpbmRlci5yZW5kZXIuc3luYygpKTtcblxuICAgIHJldHVybiB0aGlzO1xuICB9XG5cbiAgc3luY01vZGVsKCl7XG4gICAgdGhpcy5iaW5kZXJzXG4gICAgICAuZmlsdGVyKGJpbmRlciA9PiBiaW5kZXIuaGFuZGxlciAmJiB0eXBlb2YgYmluZGVyLmhhbmRsZXIgPT0gJ29iamVjdCcpXG4gICAgICAuZm9yRWFjaChiaW5kZXIgPT4gYmluZGVyLmhhbmRsZXIuc3luYygpKTtcblxuICAgIHJldHVybiB0aGlzO1xuICB9XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IENvbXBvc2l0ZUJpbmRlcjtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9Db21wb3NpdGVCaW5kZXIuanMiLCJtb2R1bGUuZXhwb3J0cyA9IHtcbiAgSGFuZGxlcjoge1xuICAgIENhbGxiYWNrSGFuZGxlcjogcmVxdWlyZSgnLi9IYW5kbGVyL0NhbGxiYWNrSGFuZGxlcicpLFxuICAgIFZhbHVlSGFuZGxlcjogcmVxdWlyZSgnLi9IYW5kbGVyL1ZhbHVlSGFuZGxlcicpLFxuICAgIFJhZGlvSGFuZGxlcjogcmVxdWlyZSgnLi9IYW5kbGVyL1JhZGlvSGFuZGxlcicpLFxuICAgIENoZWNrYm94SGFuZGxlcjogcmVxdWlyZSgnLi9IYW5kbGVyL0NoZWNrYm94SGFuZGxlcicpLFxuICAgIFRleHRIYW5kbGVyOiByZXF1aXJlKCcuL0hhbmRsZXIvVGV4dEhhbmRsZXInKSxcbiAgICBTZWxlY3RIYW5kbGVyOiByZXF1aXJlKCcuL0hhbmRsZXIvU2VsZWN0SGFuZGxlcicpXG4gIH0sXG4gIFJlbmRlcjoge1xuICAgIENhbGxiYWNrUmVuZGVyOiByZXF1aXJlKCcuL1JlbmRlci9DYWxsYmFja1JlbmRlcicpLFxuICAgIEF0dHJpYnV0ZVJlbmRlcjogcmVxdWlyZSgnLi9SZW5kZXIvQXR0cmlidXRlUmVuZGVyJyksXG4gICAgVmFsdWVSZW5kZXI6IHJlcXVpcmUoJy4vUmVuZGVyL1ZhbHVlUmVuZGVyJyksXG4gICAgSHRtbFJlbmRlcjogcmVxdWlyZSgnLi9SZW5kZXIvSHRtbFJlbmRlcicpLFxuICAgIFJhZGlvUmVuZGVyOiByZXF1aXJlKCcuL1JlbmRlci9SYWRpb1JlbmRlcicpLFxuICAgIENoZWNrYm94UmVuZGVyOiByZXF1aXJlKCcuL1JlbmRlci9DaGVja2JveFJlbmRlcicpLFxuICAgIFRleHRSZW5kZXI6IHJlcXVpcmUoJy4vUmVuZGVyL1RleHRSZW5kZXInKSxcbiAgICBTZWxlY3RSZW5kZXI6IHJlcXVpcmUoJy4vUmVuZGVyL1NlbGVjdFJlbmRlcicpXG4gIH0sXG4gIEJpbmRlckZhY3Rvcnk6IHJlcXVpcmUoJy4vQmluZGVyRmFjdG9yeScpLFxuICBDb21wb3NpdGVCaW5kZXI6IHJlcXVpcmUoJy4vQ29tcG9zaXRlQmluZGVyJyksXG4gIENhbGxiYWNrQmluZGVyOiByZXF1aXJlKCcuL0NhbGxiYWNrQmluZGVyJyksXG4gIEF0dHJpYnV0ZUJpbmRlcjogcmVxdWlyZSgnLi9BdHRyaWJ1dGVCaW5kZXInKSxcbiAgVmFsdWVCaW5kZXI6IHJlcXVpcmUoJy4vVmFsdWVCaW5kZXInKSxcbiAgSHRtbEJpbmRlcjogcmVxdWlyZSgnLi9IdG1sQmluZGVyJyksXG4gIFJhZGlvQmluZGVyOiByZXF1aXJlKCcuL1JhZGlvQmluZGVyJyksXG4gIENoZWNrYm94QmluZGVyOiByZXF1aXJlKCcuL0NoZWNrYm94QmluZGVyJyksXG4gIFRleHRCaW5kZXI6IHJlcXVpcmUoJy4vVGV4dEJpbmRlcicpLFxuICBTZWxlY3RCaW5kZXI6IHJlcXVpcmUoJy4vU2VsZWN0QmluZGVyJylcbn07XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvQmluZGVyLmpzIiwiY29uc3QgQ29tcG9zaXRlQmluZGVyID0gcmVxdWlyZSgnLi9Db21wb3NpdGVCaW5kZXInKTtcbmNvbnN0IEh0bWxCaW5kZXIgPSByZXF1aXJlKCcuL0h0bWxCaW5kZXInKTtcbmNvbnN0IFZhbHVlQmluZGVyID0gcmVxdWlyZSgnLi9WYWx1ZUJpbmRlcicpO1xuY29uc3QgUmFkaW9CaW5kZXIgPSByZXF1aXJlKCcuL1JhZGlvQmluZGVyJyk7XG5jb25zdCBDaGVja2JveEJpbmRlciA9IHJlcXVpcmUoJy4vQ2hlY2tib3hCaW5kZXInKTtcbmNvbnN0IFRleHRCaW5kZXIgPSByZXF1aXJlKCcuL1RleHRCaW5kZXInKTtcbmNvbnN0IFNlbGVjdEJpbmRlciA9IHJlcXVpcmUoJy4vU2VsZWN0QmluZGVyJyk7XG5cbmNsYXNzIEJpbmRlckZhY3Rvcnl7XG4gIGNvbnN0cnVjdG9yKG1vZGVsLCAkZWwpe1xuICAgIHRoaXMubW9kZWwgPSBtb2RlbDtcbiAgICB0aGlzLiRlbCA9ICRlbDtcbiAgfVxuXG4gIHJlc29sdmVCaW5kZXIoJGVsKXtcbiAgICBzd2l0Y2goJGVsLnByb3AoJ3RhZ05hbWUnKSl7XG4gICAgICBjYXNlICdJTlBVVCc6XG4gICAgICAgIHN3aXRjaCgkZWwuYXR0cigndHlwZScpKXtcbiAgICAgICAgICBjYXNlICdyYWRpbyc6XG4gICAgICAgICAgICByZXR1cm4gUmFkaW9CaW5kZXI7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgICBjYXNlICdjaGVja2JveCc6XG4gICAgICAgICAgICByZXR1cm4gQ2hlY2tib3hCaW5kZXI7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgICBjYXNlICd0ZXh0JzpcbiAgICAgICAgICAgIHJldHVybiBUZXh0QmluZGVyO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgIHJldHVybiBWYWx1ZUJpbmRlcjtcbiAgICAgICAgfVxuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgJ1RFWFRBUkVBJzpcbiAgICAgICAgcmV0dXJuIFRleHRCaW5kZXI7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSAnU0VMRUNUJzpcbiAgICAgICAgcmV0dXJuIFNlbGVjdEJpbmRlcjtcbiAgICAgICAgYnJlYWs7XG4gICAgICBkZWZhdWx0OlxuICAgICAgICByZXR1cm4gSHRtbEJpbmRlcjtcbiAgICB9XG4gIH1cblxuICBwcmVwYXJlT3B0aW9uKG9wdGlvbil7XG4gICAgaWYoIUFycmF5LmlzQXJyYXkob3B0aW9uKSl7XG4gICAgICBvcHRpb24gPSBbb3B0aW9uXTtcbiAgICB9XG5cbiAgICByZXR1cm4gb3B0aW9uLm1hcChmdW5jdGlvbihvcHRpb24pe1xuICAgICAgaWYodHlwZW9mIG9wdGlvbiA9PSAnc3RyaW5nJyl7XG4gICAgICAgIG9wdGlvbiA9IHtcbiAgICAgICAgICBzZWxlY3Rvcjogb3B0aW9uXG4gICAgICAgIH07XG4gICAgICB9XG4gICAgICBpZih0eXBlb2Ygb3B0aW9uLiRlbCAhPSAnb2JqZWN0Jyl7XG4gICAgICAgIG9wdGlvbi4kZWwgPSB0aGlzLiRlbC5maW5kKG9wdGlvbi5zZWxlY3Rvcik7XG4gICAgICB9XG4gICAgICBpZih0eXBlb2Ygb3B0aW9uLmJpbmRlciAhPSAnZnVuY3Rpb24nKXtcbiAgICAgICAgb3B0aW9uLmJpbmRlciA9IHRoaXMucmVzb2x2ZUJpbmRlcihvcHRpb24uJGVsKTtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIG9wdGlvbjtcbiAgICB9LmJpbmQodGhpcykpO1xuICB9XG5cbiAgZXhwYW5kQmluZGVyKGJpbmRlciwgb3B0aW9uKXtcbiAgICBpZih0eXBlb2YgYmluZGVyLmhhbmRsZXIgPT0gJ29iamVjdCcpe1xuICAgICAgaWYodHlwZW9mIG9wdGlvbi5ldmVudCA9PSAnc3RyaW5nJyl7XG4gICAgICAgIGJpbmRlci5oYW5kbGVyLmV2ZW50ID0gb3B0aW9uLmV2ZW50O1xuICAgICAgfVxuICAgICAgaWYodHlwZW9mIG9wdGlvbi5oYW5kbGUgPT0gJ2Z1bmN0aW9uJyl7XG4gICAgICAgIGJpbmRlci5oYW5kbGVyLnByZXBhcmUgPSBvcHRpb24uaGFuZGxlO1xuICAgICAgfVxuICAgIH1cbiAgICBpZih0eXBlb2YgYmluZGVyLnJlbmRlciA9PSAnb2JqZWN0Jyl7XG4gICAgICBpZih0eXBlb2Ygb3B0aW9uLmF0dHJpYnV0ZSA9PSAnc3RyaW5nJyl7XG4gICAgICAgIGJpbmRlci5yZW5kZXIuYXR0cmlidXRlID0gb3B0aW9uLmF0dHJpYnV0ZTtcbiAgICAgIH1cbiAgICAgIGlmKHR5cGVvZiBvcHRpb24ucmVuZGVyID09ICdmdW5jdGlvbicpe1xuICAgICAgICBiaW5kZXIucmVuZGVyLnByZXBhcmUgPSBvcHRpb24ucmVuZGVyO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIGJ1aWxkKG9wdGlvbnMpe1xuICAgIGxldCBiaW5kaW5ncyA9IFtdO1xuICAgIGZvcih2YXIgcHJvcCBpbiBvcHRpb25zKXtcbiAgICAgIGxldCBvcHRpb24gPSB0aGlzLnByZXBhcmVPcHRpb24ob3B0aW9uc1twcm9wXSk7XG5cbiAgICAgIGZvcih2YXIgaSBpbiBvcHRpb24pe1xuICAgICAgICBsZXQgYmluZGVyID0gbmV3IChGdW5jdGlvbi5wcm90b3R5cGUuYmluZC5hcHBseShcbiAgICAgICAgICBvcHRpb25baV0uYmluZGVyLFxuICAgICAgICAgIFtudWxsLCB0aGlzLm1vZGVsLCBwcm9wLCBvcHRpb25baV0uJGVsXVxuICAgICAgICApKTtcbiAgICAgICAgdGhpcy5leHBhbmRCaW5kZXIoYmluZGVyLCBvcHRpb25baV0pO1xuXG4gICAgICAgIGJpbmRpbmdzLnB1c2goYmluZGVyKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gbmV3IENvbXBvc2l0ZUJpbmRlcihiaW5kaW5ncyk7XG4gIH1cbn07XG5cbm1vZHVsZS5leHBvcnRzID0gQmluZGVyRmFjdG9yeTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9CaW5kZXJGYWN0b3J5LmpzIiwiY29uc3QgQWJzdHJhY3RCaW5kZXIgPSByZXF1aXJlKCcuL0Fic3RyYWN0QmluZGVyJyk7XG5jb25zdCBDYWxsYmFja0hhbmRsZXIgPSByZXF1aXJlKCcuL0hhbmRsZXIvQ2FsbGJhY2tIYW5kbGVyJyk7XG5jb25zdCBDYWxsYmFja1JlbmRlciA9IHJlcXVpcmUoJy4vUmVuZGVyL0NhbGxiYWNrUmVuZGVyJyk7XG5cbmNsYXNzIENhbGxiYWNrQmluZGVyIGV4dGVuZHMgQWJzdHJhY3RCaW5kZXJ7XG4gIGNvbnN0cnVjdG9yKG1vZGVsLCBwcm9wLCAkZWwsIGV2ZW50LCBoYW5kbGUsIHJlbmRlcil7XG4gICAgc3VwZXIoXG4gICAgICBoYW5kbGU/IG5ldyBDYWxsYmFja0hhbmRsZXIobW9kZWwsIHByb3AsICRlbCwgZXZlbnQsIGhhbmRsZSkgOiBudWxsLFxuICAgICAgcmVuZGVyPyBuZXcgQ2FsbGJhY2tSZW5kZXIobW9kZWwsIHByb3AsICRlbCwgcmVuZGVyKSA6IG51bGxcbiAgICApO1xuICB9XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IENhbGxiYWNrQmluZGVyO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL0NhbGxiYWNrQmluZGVyLmpzIiwiY29uc3QgQWJzdHJhY3RCaW5kZXIgPSByZXF1aXJlKCcuL0Fic3RyYWN0QmluZGVyJyk7XG5jb25zdCBBdHRyaWJ1dGVSZW5kZXIgPSByZXF1aXJlKCcuL1JlbmRlci9BdHRyaWJ1dGVSZW5kZXInKTtcblxuY2xhc3MgQXR0cmlidXRlQmluZGVyIGV4dGVuZHMgQWJzdHJhY3RCaW5kZXJ7XG4gIGNvbnN0cnVjdG9yKG1vZGVsLCBwcm9wLCAkZWwsIGF0dHJpYnV0ZSl7XG4gICAgc3VwZXIoXG4gICAgICBudWxsLFxuICAgICAgbmV3IEF0dHJpYnV0ZVJlbmRlcihtb2RlbCwgcHJvcCwgJGVsLCBhdHRyaWJ1dGUpXG4gICAgKTtcbiAgfVxufTtcblxubW9kdWxlLmV4cG9ydHMgPSBBdHRyaWJ1dGVCaW5kZXI7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvQXR0cmlidXRlQmluZGVyLmpzIiwiY29uc3QgQWJzdHJhY3RCaW5kZXIgPSByZXF1aXJlKCcuL0Fic3RyYWN0QmluZGVyJyk7XG5jb25zdCBWYWx1ZUhhbmRsZXIgPSByZXF1aXJlKCcuL0hhbmRsZXIvVmFsdWVIYW5kbGVyJyk7XG5jb25zdCBWYWx1ZVJlbmRlciA9IHJlcXVpcmUoJy4vUmVuZGVyL1ZhbHVlUmVuZGVyJyk7XG5cbmNsYXNzIFZhbHVlQmluZGVyIGV4dGVuZHMgQWJzdHJhY3RCaW5kZXJ7XG4gIGNvbnN0cnVjdG9yKG1vZGVsLCBwcm9wLCAkZWwsIGV2ZW50ID0gJ2NoYW5nZScpe1xuICAgIHN1cGVyKFxuICAgICAgbmV3IFZhbHVlSGFuZGxlcihtb2RlbCwgcHJvcCwgJGVsLCBldmVudCksXG4gICAgICBuZXcgVmFsdWVSZW5kZXIobW9kZWwsIHByb3AsICRlbClcbiAgICApO1xuICB9XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IFZhbHVlQmluZGVyO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL1ZhbHVlQmluZGVyLmpzIiwiY29uc3QgQWJzdHJhY3RCaW5kZXIgPSByZXF1aXJlKCcuL0Fic3RyYWN0QmluZGVyJyk7XG5jb25zdCBIdG1sUmVuZGVyID0gcmVxdWlyZSgnLi9SZW5kZXIvSHRtbFJlbmRlcicpO1xuXG5jbGFzcyBIdG1sQmluZGVyIGV4dGVuZHMgQWJzdHJhY3RCaW5kZXJ7XG4gIGNvbnN0cnVjdG9yKG1vZGVsLCBwcm9wLCAkZWwpe1xuICAgIHN1cGVyKFxuICAgICAgbnVsbCxcbiAgICAgIG5ldyBIdG1sUmVuZGVyKG1vZGVsLCBwcm9wLCAkZWwpXG4gICAgKTtcbiAgfVxufTtcblxubW9kdWxlLmV4cG9ydHMgPSBIdG1sQmluZGVyO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL0h0bWxCaW5kZXIuanMiLCJjb25zdCBBYnN0cmFjdEJpbmRlciA9IHJlcXVpcmUoJy4vQWJzdHJhY3RCaW5kZXInKTtcbmNvbnN0IFJhZGlvSGFuZGxlciA9IHJlcXVpcmUoJy4vSGFuZGxlci9SYWRpb0hhbmRsZXInKTtcbmNvbnN0IFJhZGlvUmVuZGVyID0gcmVxdWlyZSgnLi9SZW5kZXIvUmFkaW9SZW5kZXInKTtcblxuY2xhc3MgUmFkaW9CaW5kZXIgZXh0ZW5kcyBBYnN0cmFjdEJpbmRlcntcbiAgY29uc3RydWN0b3IobW9kZWwsIHByb3AsICRlbCwgZXZlbnQgPSAnY2hhbmdlJyl7XG4gICAgc3VwZXIoXG4gICAgICBuZXcgUmFkaW9IYW5kbGVyKG1vZGVsLCBwcm9wLCAkZWwsIGV2ZW50KSxcbiAgICAgIG5ldyBSYWRpb1JlbmRlcihtb2RlbCwgcHJvcCwgJGVsKVxuICAgICk7XG4gIH1cbn07XG5cbm1vZHVsZS5leHBvcnRzID0gUmFkaW9CaW5kZXI7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvUmFkaW9CaW5kZXIuanMiLCJjb25zdCBBYnN0cmFjdEJpbmRlciA9IHJlcXVpcmUoJy4vQWJzdHJhY3RCaW5kZXInKTtcbmNvbnN0IENoZWNrYm94SGFuZGxlciA9IHJlcXVpcmUoJy4vSGFuZGxlci9DaGVja2JveEhhbmRsZXInKTtcbmNvbnN0IENoZWNrYm94UmVuZGVyID0gcmVxdWlyZSgnLi9SZW5kZXIvQ2hlY2tib3hSZW5kZXInKTtcblxuY2xhc3MgQ2hlY2tib3hCaW5kZXIgZXh0ZW5kcyBBYnN0cmFjdEJpbmRlcntcbiAgY29uc3RydWN0b3IobW9kZWwsIHByb3AsICRlbCwgZXZlbnQgPSAnY2hhbmdlJyl7XG4gICAgc3VwZXIoXG4gICAgICBuZXcgQ2hlY2tib3hIYW5kbGVyKG1vZGVsLCBwcm9wLCAkZWwsIGV2ZW50KSxcbiAgICAgIG5ldyBDaGVja2JveFJlbmRlcihtb2RlbCwgcHJvcCwgJGVsKVxuICAgICk7XG4gIH1cbn07XG5cbm1vZHVsZS5leHBvcnRzID0gQ2hlY2tib3hCaW5kZXI7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvQ2hlY2tib3hCaW5kZXIuanMiLCJjb25zdCBBYnN0cmFjdEJpbmRlciA9IHJlcXVpcmUoJy4vQWJzdHJhY3RCaW5kZXInKTtcbmNvbnN0IFRleHRIYW5kbGVyID0gcmVxdWlyZSgnLi9IYW5kbGVyL1RleHRIYW5kbGVyJyk7XG5jb25zdCBUZXh0UmVuZGVyID0gcmVxdWlyZSgnLi9SZW5kZXIvVGV4dFJlbmRlcicpO1xuXG5jbGFzcyBUZXh0QmluZGVyIGV4dGVuZHMgQWJzdHJhY3RCaW5kZXJ7XG4gIGNvbnN0cnVjdG9yKG1vZGVsLCBwcm9wLCAkZWwsIGV2ZW50ID0gJ2NoYW5nZScpe1xuICAgIHN1cGVyKFxuICAgICAgbmV3IFRleHRIYW5kbGVyKG1vZGVsLCBwcm9wLCAkZWwsIGV2ZW50KSxcbiAgICAgIG5ldyBUZXh0UmVuZGVyKG1vZGVsLCBwcm9wLCAkZWwpXG4gICAgKTtcbiAgfVxufTtcblxubW9kdWxlLmV4cG9ydHMgPSBUZXh0QmluZGVyO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL1RleHRCaW5kZXIuanMiLCJjb25zdCBBYnN0cmFjdEJpbmRlciA9IHJlcXVpcmUoJy4vQWJzdHJhY3RCaW5kZXInKTtcbmNvbnN0IFNlbGVjdEhhbmRsZXIgPSByZXF1aXJlKCcuL0hhbmRsZXIvU2VsZWN0SGFuZGxlcicpO1xuY29uc3QgU2VsZWN0UmVuZGVyID0gcmVxdWlyZSgnLi9SZW5kZXIvU2VsZWN0UmVuZGVyJyk7XG5cbmNsYXNzIFNlbGVjdEJpbmRlciBleHRlbmRzIEFic3RyYWN0QmluZGVye1xuICBjb25zdHJ1Y3Rvcihtb2RlbCwgcHJvcCwgJGVsLCBldmVudCA9ICdjaGFuZ2UnKXtcbiAgICBzdXBlcihcbiAgICAgIG5ldyBTZWxlY3RIYW5kbGVyKG1vZGVsLCBwcm9wLCAkZWwsIGV2ZW50KSxcbiAgICAgIG5ldyBTZWxlY3RSZW5kZXIobW9kZWwsIHByb3AsICRlbClcbiAgICApO1xuICB9XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IFNlbGVjdEJpbmRlcjtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9TZWxlY3RCaW5kZXIuanMiXSwic291cmNlUm9vdCI6IiJ9