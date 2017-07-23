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
/******/ 	return __webpack_require__(__webpack_require__.s = 24);
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
    if (this.$el.length == 1) {
      return this.$el.prop('checked') ? this.$el.val() : null;
    } else {
      let val = [];
      this.$el.filter(':checked').each(function () {
        val.push($(this).val());
      });
      return val;
    }
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
    if (this.$el.length == 1) {
      this.$el.prop('checked', value !== null);
    } else {
      this.$el.each(function () {
        $(this).prop('checked', value.indexOf($(this).val()) != -1);
      });
    }
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

const AbstractBinder = __webpack_require__(0);
const HtmlRender = __webpack_require__(12);

class HtmlBinder extends AbstractBinder {
  constructor(model, prop, $el) {
    super(null, new HtmlRender(model, prop, $el));
  }
};

module.exports = HtmlBinder;

/***/ }),
/* 19 */
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
/* 20 */
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
/* 21 */
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
/* 22 */
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
/* 23 */
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

/***/ }),
/* 24 */
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
  BinderFactory: __webpack_require__(25),
  CompositeBinder: __webpack_require__(17),
  CallbackBinder: __webpack_require__(26),
  AttributeBinder: __webpack_require__(27),
  ValueBinder: __webpack_require__(19),
  HtmlBinder: __webpack_require__(18),
  RadioBinder: __webpack_require__(20),
  CheckboxBinder: __webpack_require__(21),
  TextBinder: __webpack_require__(22),
  SelectBinder: __webpack_require__(23)
};

/***/ }),
/* 25 */
/***/ (function(module, exports, __webpack_require__) {

const CompositeBinder = __webpack_require__(17);
const HtmlBinder = __webpack_require__(18);
const ValueBinder = __webpack_require__(19);
const RadioBinder = __webpack_require__(20);
const CheckboxBinder = __webpack_require__(21);
const TextBinder = __webpack_require__(22);
const SelectBinder = __webpack_require__(23);

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
/* 26 */
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
/* 27 */
/***/ (function(module, exports, __webpack_require__) {

const AbstractBinder = __webpack_require__(0);
const AttributeRender = __webpack_require__(11);

class AttributeBinder extends AbstractBinder {
  constructor(model, prop, $el, attribute) {
    super(null, new AttributeRender(model, prop, $el, attribute));
  }
};

module.exports = AttributeBinder;

/***/ })
/******/ ]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgMTQwYTg2OGE3MzFmYzk1ZDU3NmUiLCJ3ZWJwYWNrOi8vLy4vc3JjL0Fic3RyYWN0QmluZGVyLmpzIiwid2VicGFjazovLy8uL3NyYy9SZW5kZXIvQWJzdHJhY3RSZW5kZXIuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL0hhbmRsZXIvQWJzdHJhY3RIYW5kbGVyLmpzIiwid2VicGFjazovLy8uL3NyYy9IYW5kbGVyL1ZhbHVlSGFuZGxlci5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvUmVuZGVyL1ZhbHVlUmVuZGVyLmpzIiwid2VicGFjazovLy8uL3NyYy9IYW5kbGVyL0NhbGxiYWNrSGFuZGxlci5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvSGFuZGxlci9SYWRpb0hhbmRsZXIuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL0hhbmRsZXIvQ2hlY2tib3hIYW5kbGVyLmpzIiwid2VicGFjazovLy8uL3NyYy9IYW5kbGVyL1RleHRIYW5kbGVyLmpzIiwid2VicGFjazovLy8uL3NyYy9IYW5kbGVyL1NlbGVjdEhhbmRsZXIuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL1JlbmRlci9DYWxsYmFja1JlbmRlci5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvUmVuZGVyL0F0dHJpYnV0ZVJlbmRlci5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvUmVuZGVyL0h0bWxSZW5kZXIuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL1JlbmRlci9SYWRpb1JlbmRlci5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvUmVuZGVyL0NoZWNrYm94UmVuZGVyLmpzIiwid2VicGFjazovLy8uL3NyYy9SZW5kZXIvVGV4dFJlbmRlci5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvUmVuZGVyL1NlbGVjdFJlbmRlci5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvQ29tcG9zaXRlQmluZGVyLmpzIiwid2VicGFjazovLy8uL3NyYy9IdG1sQmluZGVyLmpzIiwid2VicGFjazovLy8uL3NyYy9WYWx1ZUJpbmRlci5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvUmFkaW9CaW5kZXIuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL0NoZWNrYm94QmluZGVyLmpzIiwid2VicGFjazovLy8uL3NyYy9UZXh0QmluZGVyLmpzIiwid2VicGFjazovLy8uL3NyYy9TZWxlY3RCaW5kZXIuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL0JpbmRlci5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvQmluZGVyRmFjdG9yeS5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvQ2FsbGJhY2tCaW5kZXIuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL0F0dHJpYnV0ZUJpbmRlci5qcyJdLCJuYW1lcyI6WyJBYnN0cmFjdEJpbmRlciIsImNvbnN0cnVjdG9yIiwiaGFuZGxlciIsInJlbmRlciIsImJpbmQiLCJ1bmJpbmQiLCJtb2R1bGUiLCJleHBvcnRzIiwiQWJzdHJhY3RSZW5kZXIiLCJtb2RlbCIsInByb3AiLCIkZWwiLCJvbiIsInN5bmMiLCJvZmYiLCJwcmVwYXJlIiwidmFsdWUiLCJnZXQiLCJBYnN0cmFjdEhhbmRsZXIiLCJldmVudCIsImhhbmRsZSIsInNldCIsInJlcXVpcmUiLCJWYWx1ZUhhbmRsZXIiLCJ2YWwiLCJWYWx1ZVJlbmRlciIsIkNhbGxiYWNrSGFuZGxlciIsImNhbGxiYWNrIiwiUmFkaW9IYW5kbGVyIiwiJGNoZWNrZWQiLCJmaWx0ZXIiLCJsZW5ndGgiLCJDaGVja2JveEhhbmRsZXIiLCJlYWNoIiwicHVzaCIsIiQiLCJUZXh0SGFuZGxlciIsIlNlbGVjdEhhbmRsZXIiLCJDYWxsYmFja1JlbmRlciIsIkF0dHJpYnV0ZVJlbmRlciIsImF0dHJpYnV0ZSIsImF0dHIiLCJIdG1sUmVuZGVyIiwiaHRtbCIsIlJhZGlvUmVuZGVyIiwiQ2hlY2tib3hSZW5kZXIiLCJpbmRleE9mIiwiVGV4dFJlbmRlciIsIlNlbGVjdFJlbmRlciIsIkNvbXBvc2l0ZUJpbmRlciIsImJpbmRlcnMiLCJhZGQiLCJiaW5kZXIiLCJmb3JFYWNoIiwic3luY1ZpZXciLCJzeW5jTW9kZWwiLCJIdG1sQmluZGVyIiwiVmFsdWVCaW5kZXIiLCJSYWRpb0JpbmRlciIsIkNoZWNrYm94QmluZGVyIiwiVGV4dEJpbmRlciIsIlNlbGVjdEJpbmRlciIsIkhhbmRsZXIiLCJSZW5kZXIiLCJCaW5kZXJGYWN0b3J5IiwiQ2FsbGJhY2tCaW5kZXIiLCJBdHRyaWJ1dGVCaW5kZXIiLCJyZXNvbHZlQmluZGVyIiwicHJlcGFyZU9wdGlvbiIsIm9wdGlvbiIsIkFycmF5IiwiaXNBcnJheSIsIm1hcCIsInNlbGVjdG9yIiwiZmluZCIsImV4cGFuZEJpbmRlciIsImJ1aWxkIiwib3B0aW9ucyIsImJpbmRpbmdzIiwiaSIsIkZ1bmN0aW9uIiwicHJvdG90eXBlIiwiYXBwbHkiXSwibWFwcGluZ3MiOiI7O0FBQUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQUs7QUFDTDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLG1DQUEyQiwwQkFBMEIsRUFBRTtBQUN2RCx5Q0FBaUMsZUFBZTtBQUNoRDtBQUNBO0FBQ0E7O0FBRUE7QUFDQSw4REFBc0QsK0RBQStEOztBQUVySDtBQUNBOztBQUVBO0FBQ0E7Ozs7Ozs7QUM3REEsTUFBTUEsY0FBTixDQUFvQjtBQUNsQkMsY0FBWUMsT0FBWixFQUFxQkMsTUFBckIsRUFBNEI7QUFDMUIsU0FBS0QsT0FBTCxHQUFlQSxPQUFmO0FBQ0EsU0FBS0MsTUFBTCxHQUFjQSxNQUFkO0FBQ0Q7O0FBRURDLFNBQU07QUFDSixRQUFHLEtBQUtGLE9BQVIsRUFBZ0I7QUFDZCxXQUFLQSxPQUFMLENBQWFFLElBQWI7QUFDRDtBQUNELFFBQUcsS0FBS0QsTUFBUixFQUFlO0FBQ2IsV0FBS0EsTUFBTCxDQUFZQyxJQUFaO0FBQ0Q7O0FBRUQsV0FBTyxJQUFQO0FBQ0Q7O0FBRURDLFdBQVE7QUFDTixRQUFHLEtBQUtILE9BQVIsRUFBZ0I7QUFDZCxXQUFLQSxPQUFMLENBQWFHLE1BQWI7QUFDRDtBQUNELFFBQUcsS0FBS0YsTUFBUixFQUFlO0FBQ2IsV0FBS0EsTUFBTCxDQUFZRSxNQUFaO0FBQ0Q7O0FBRUQsV0FBTyxJQUFQO0FBQ0Q7QUExQmlCLENBMkJuQjs7QUFFREMsT0FBT0MsT0FBUCxHQUFpQlAsY0FBakIsQzs7Ozs7O0FDN0JBLE1BQU1RLGNBQU4sQ0FBb0I7QUFDbEJQLGNBQVlRLEtBQVosRUFBbUJDLElBQW5CLEVBQXlCQyxHQUF6QixFQUE2QjtBQUMzQixTQUFLRixLQUFMLEdBQWFBLEtBQWI7QUFDQSxTQUFLQyxJQUFMLEdBQVlBLElBQVo7QUFDQSxTQUFLQyxHQUFMLEdBQVdBLEdBQVg7QUFDRDs7QUFFRFAsU0FBTTtBQUNKLFNBQUtLLEtBQUwsQ0FBV0csRUFBWCxDQUFjLFlBQVksS0FBS0YsSUFBL0IsRUFBcUMsS0FBS0csSUFBTCxDQUFVVCxJQUFWLENBQWUsSUFBZixDQUFyQzs7QUFFQSxXQUFPLElBQVA7QUFDRDs7QUFFREMsV0FBUTtBQUNOLFNBQUtJLEtBQUwsQ0FBV0ssR0FBWCxDQUFlLFlBQVksS0FBS0osSUFBaEMsRUFBc0MsS0FBS0csSUFBTCxDQUFVVCxJQUFWLENBQWUsSUFBZixDQUF0Qzs7QUFFQSxXQUFPLElBQVA7QUFDRDs7QUFFRFcsVUFBUUMsS0FBUixFQUFjO0FBQ1osV0FBT0EsS0FBUDtBQUNEOztBQUVESCxTQUFNO0FBQ0osUUFBSUcsUUFBUSxLQUFLUCxLQUFMLENBQVdRLEdBQVgsQ0FBZSxLQUFLUCxJQUFwQixDQUFaO0FBQ0FNLFlBQVEsS0FBS0QsT0FBTCxDQUFhQyxLQUFiLENBQVI7QUFDQSxTQUFLYixNQUFMLENBQVlhLEtBQVo7O0FBRUEsV0FBTyxJQUFQO0FBQ0Q7O0FBRURiLFNBQU9hLEtBQVAsRUFBYSxDQUNaO0FBaENpQixDQWlDbkI7O0FBRURWLE9BQU9DLE9BQVAsR0FBaUJDLGNBQWpCLEM7Ozs7OztBQ25DQSxNQUFNVSxlQUFOLENBQXFCO0FBQ25CakIsY0FBWVEsS0FBWixFQUFtQkMsSUFBbkIsRUFBeUJDLEdBQXpCLEVBQThCUSxLQUE5QixFQUFvQztBQUNsQyxTQUFLVixLQUFMLEdBQWFBLEtBQWI7QUFDQSxTQUFLQyxJQUFMLEdBQVlBLElBQVo7QUFDQSxTQUFLQyxHQUFMLEdBQVdBLEdBQVg7QUFDQSxTQUFLUSxLQUFMLEdBQWFBLEtBQWI7QUFDRDs7QUFFRGYsU0FBTTtBQUNKLFNBQUtPLEdBQUwsQ0FBU0MsRUFBVCxDQUFZLEtBQUtPLEtBQWpCLEVBQXdCLEtBQUtOLElBQUwsQ0FBVVQsSUFBVixDQUFlLElBQWYsQ0FBeEI7O0FBRUEsV0FBTyxJQUFQO0FBQ0Q7O0FBRURDLFdBQVE7QUFDTixTQUFLTSxHQUFMLENBQVNHLEdBQVQsQ0FBYSxLQUFLSyxLQUFsQixFQUF5QixLQUFLTixJQUFMLENBQVVULElBQVYsQ0FBZSxJQUFmLENBQXpCOztBQUVBLFdBQU8sSUFBUDtBQUNEOztBQUVEVyxVQUFRQyxLQUFSLEVBQWM7QUFDWixXQUFPQSxLQUFQO0FBQ0Q7O0FBRURILE9BQUtNLEtBQUwsRUFBVztBQUNULFFBQUlILFFBQVEsS0FBS0ksTUFBTCxDQUFZRCxLQUFaLENBQVo7QUFDQUgsWUFBUSxLQUFLRCxPQUFMLENBQWFDLEtBQWIsQ0FBUjs7QUFFQSxTQUFLUCxLQUFMLENBQVdZLEdBQVgsQ0FBZSxLQUFLWCxJQUFwQixFQUEwQk0sS0FBMUI7O0FBRUEsV0FBTyxJQUFQO0FBQ0Q7O0FBRURJLFNBQU9ELEtBQVAsRUFBYSxDQUNaO0FBbENrQixDQW1DcEI7O0FBRURiLE9BQU9DLE9BQVAsR0FBaUJXLGVBQWpCLEM7Ozs7OztBQ3JDQSxNQUFNQSxrQkFBa0IsbUJBQUFJLENBQVEsQ0FBUixDQUF4Qjs7QUFFQSxNQUFNQyxZQUFOLFNBQTJCTCxlQUEzQixDQUEwQztBQUN4Q2pCLGNBQVlRLEtBQVosRUFBbUJDLElBQW5CLEVBQXlCQyxHQUF6QixFQUE4QlEsUUFBUSxRQUF0QyxFQUErQztBQUM3QyxVQUFNVixLQUFOLEVBQWFDLElBQWIsRUFBbUJDLEdBQW5CLEVBQXdCUSxLQUF4QjtBQUNEOztBQUVEQyxTQUFPRCxLQUFQLEVBQWE7QUFDWCxXQUFPLEtBQUtSLEdBQUwsQ0FBU2EsR0FBVCxFQUFQO0FBQ0Q7QUFQdUMsQ0FRekM7O0FBRURsQixPQUFPQyxPQUFQLEdBQWlCZ0IsWUFBakIsQzs7Ozs7O0FDWkEsTUFBTWYsaUJBQWlCLG1CQUFBYyxDQUFRLENBQVIsQ0FBdkI7O0FBRUEsTUFBTUcsV0FBTixTQUEwQmpCLGNBQTFCLENBQXdDO0FBQ3RDTCxTQUFPYSxLQUFQLEVBQWE7QUFDWCxTQUFLTCxHQUFMLENBQVNhLEdBQVQsQ0FBYVIsS0FBYjtBQUNEO0FBSHFDLENBSXZDOztBQUVEVixPQUFPQyxPQUFQLEdBQWlCa0IsV0FBakIsQzs7Ozs7O0FDUkEsTUFBTVAsa0JBQWtCLG1CQUFBSSxDQUFRLENBQVIsQ0FBeEI7O0FBRUEsTUFBTUksZUFBTixTQUE4QlIsZUFBOUIsQ0FBNkM7QUFDM0NqQixjQUFZUSxLQUFaLEVBQW1CQyxJQUFuQixFQUF5QkMsR0FBekIsRUFBOEJRLEtBQTlCLEVBQXFDUSxRQUFyQyxFQUE4QztBQUM1QyxVQUFNbEIsS0FBTixFQUFhQyxJQUFiLEVBQW1CQyxHQUFuQixFQUF3QlEsS0FBeEI7QUFDQSxTQUFLQyxNQUFMLEdBQWNPLFFBQWQ7QUFDRDtBQUowQyxDQUs1Qzs7QUFFRHJCLE9BQU9DLE9BQVAsR0FBaUJtQixlQUFqQixDOzs7Ozs7QUNUQSxNQUFNUixrQkFBa0IsbUJBQUFJLENBQVEsQ0FBUixDQUF4Qjs7QUFFQSxNQUFNTSxZQUFOLFNBQTJCVixlQUEzQixDQUEwQztBQUN4Q2pCLGNBQVlRLEtBQVosRUFBbUJDLElBQW5CLEVBQXlCQyxHQUF6QixFQUE4QlEsUUFBUSxRQUF0QyxFQUErQztBQUM3QyxVQUFNVixLQUFOLEVBQWFDLElBQWIsRUFBbUJDLEdBQW5CLEVBQXdCUSxLQUF4QjtBQUNEOztBQUVEQyxTQUFPRCxLQUFQLEVBQWE7QUFDWCxVQUFNVSxXQUFXLEtBQUtsQixHQUFMLENBQVNtQixNQUFULENBQWdCLFVBQWhCLENBQWpCO0FBQ0EsV0FBT0QsU0FBU0UsTUFBVCxHQUFpQkYsU0FBU0wsR0FBVCxFQUFqQixHQUFrQyxJQUF6QztBQUNEO0FBUnVDLENBU3pDOztBQUVEbEIsT0FBT0MsT0FBUCxHQUFpQnFCLFlBQWpCLEM7Ozs7OztBQ2JBLE1BQU1WLGtCQUFrQixtQkFBQUksQ0FBUSxDQUFSLENBQXhCOztBQUVBLE1BQU1VLGVBQU4sU0FBOEJkLGVBQTlCLENBQTZDO0FBQzNDakIsY0FBWVEsS0FBWixFQUFtQkMsSUFBbkIsRUFBeUJDLEdBQXpCLEVBQThCUSxRQUFRLFFBQXRDLEVBQStDO0FBQzdDLFVBQU1WLEtBQU4sRUFBYUMsSUFBYixFQUFtQkMsR0FBbkIsRUFBd0JRLEtBQXhCO0FBQ0Q7O0FBRURDLFNBQU9ELEtBQVAsRUFBYTtBQUNYLFFBQUcsS0FBS1IsR0FBTCxDQUFTb0IsTUFBVCxJQUFtQixDQUF0QixFQUF3QjtBQUN0QixhQUFPLEtBQUtwQixHQUFMLENBQVNELElBQVQsQ0FBYyxTQUFkLElBQTBCLEtBQUtDLEdBQUwsQ0FBU2EsR0FBVCxFQUExQixHQUEyQyxJQUFsRDtBQUNELEtBRkQsTUFHSTtBQUNGLFVBQUlBLE1BQU0sRUFBVjtBQUNBLFdBQUtiLEdBQUwsQ0FBU21CLE1BQVQsQ0FBZ0IsVUFBaEIsRUFBNEJHLElBQTVCLENBQWlDLFlBQVU7QUFDekNULFlBQUlVLElBQUosQ0FBU0MsRUFBRSxJQUFGLEVBQVFYLEdBQVIsRUFBVDtBQUNELE9BRkQ7QUFHQSxhQUFPQSxHQUFQO0FBQ0Q7QUFDRjtBQWhCMEMsQ0FpQjVDOztBQUVEbEIsT0FBT0MsT0FBUCxHQUFpQnlCLGVBQWpCLEM7Ozs7OztBQ3JCQSxNQUFNVCxlQUFlLG1CQUFBRCxDQUFRLENBQVIsQ0FBckI7O0FBRUEsTUFBTWMsV0FBTixTQUEwQmIsWUFBMUIsQ0FBc0MsRUFDckM7O0FBRURqQixPQUFPQyxPQUFQLEdBQWlCNkIsV0FBakIsQzs7Ozs7O0FDTEEsTUFBTWIsZUFBZSxtQkFBQUQsQ0FBUSxDQUFSLENBQXJCOztBQUVBLE1BQU1lLGFBQU4sU0FBNEJkLFlBQTVCLENBQXdDLEVBQ3ZDOztBQUVEakIsT0FBT0MsT0FBUCxHQUFpQjhCLGFBQWpCLEM7Ozs7OztBQ0xBLE1BQU03QixpQkFBaUIsbUJBQUFjLENBQVEsQ0FBUixDQUF2Qjs7QUFFQSxNQUFNZ0IsY0FBTixTQUE2QjlCLGNBQTdCLENBQTJDO0FBQ3pDUCxjQUFZUSxLQUFaLEVBQW1CQyxJQUFuQixFQUF5QkMsR0FBekIsRUFBOEJnQixRQUE5QixFQUF1QztBQUNyQyxVQUFNbEIsS0FBTixFQUFhQyxJQUFiLEVBQW1CQyxHQUFuQjtBQUNBLFNBQUtSLE1BQUwsR0FBY3dCLFFBQWQ7QUFDRDtBQUp3QyxDQUsxQzs7QUFFRHJCLE9BQU9DLE9BQVAsR0FBaUIrQixjQUFqQixDOzs7Ozs7QUNUQSxNQUFNOUIsaUJBQWlCLG1CQUFBYyxDQUFRLENBQVIsQ0FBdkI7O0FBRUEsTUFBTWlCLGVBQU4sU0FBOEIvQixjQUE5QixDQUE0QztBQUMxQ1AsY0FBWVEsS0FBWixFQUFtQkMsSUFBbkIsRUFBeUJDLEdBQXpCLEVBQThCNkIsU0FBOUIsRUFBd0M7QUFDdEMsVUFBTS9CLEtBQU4sRUFBYUMsSUFBYixFQUFtQkMsR0FBbkI7QUFDQSxTQUFLNkIsU0FBTCxHQUFpQkEsU0FBakI7QUFDRDs7QUFFRHJDLFNBQU9hLEtBQVAsRUFBYTtBQUNYLFNBQUtMLEdBQUwsQ0FBUzhCLElBQVQsQ0FBYyxLQUFLRCxTQUFuQixFQUE4QnhCLEtBQTlCO0FBQ0Q7QUFSeUMsQ0FTM0M7O0FBRURWLE9BQU9DLE9BQVAsR0FBaUJnQyxlQUFqQixDOzs7Ozs7QUNiQSxNQUFNL0IsaUJBQWlCLG1CQUFBYyxDQUFRLENBQVIsQ0FBdkI7O0FBRUEsTUFBTW9CLFVBQU4sU0FBeUJsQyxjQUF6QixDQUF1QztBQUNyQ0wsU0FBT2EsS0FBUCxFQUFhO0FBQ1gsU0FBS0wsR0FBTCxDQUFTZ0MsSUFBVCxDQUFjM0IsS0FBZDtBQUNEO0FBSG9DLENBSXRDOztBQUVEVixPQUFPQyxPQUFQLEdBQWlCbUMsVUFBakIsQzs7Ozs7O0FDUkEsTUFBTWxDLGlCQUFpQixtQkFBQWMsQ0FBUSxDQUFSLENBQXZCOztBQUVBLE1BQU1zQixXQUFOLFNBQTBCcEMsY0FBMUIsQ0FBd0M7QUFDdENMLFNBQU9hLEtBQVAsRUFBYTtBQUNYLFFBQUdBLFVBQVUsSUFBYixFQUFrQjtBQUNoQixXQUFLTCxHQUFMLENBQVNELElBQVQsQ0FBYyxTQUFkLEVBQXlCLEtBQXpCO0FBQ0E7QUFDRDtBQUNELFNBQUtDLEdBQUwsQ0FBU21CLE1BQVQsQ0FBZ0IsYUFBYWQsS0FBYixHQUFxQixJQUFyQyxFQUEyQ04sSUFBM0MsQ0FBZ0QsU0FBaEQsRUFBMkQsSUFBM0Q7QUFDRDtBQVBxQyxDQVF2Qzs7QUFFREosT0FBT0MsT0FBUCxHQUFpQnFDLFdBQWpCLEM7Ozs7OztBQ1pBLE1BQU1wQyxpQkFBaUIsbUJBQUFjLENBQVEsQ0FBUixDQUF2Qjs7QUFFQSxNQUFNdUIsY0FBTixTQUE2QnJDLGNBQTdCLENBQTJDO0FBQ3pDTCxTQUFPYSxLQUFQLEVBQWE7QUFDWCxRQUFHLEtBQUtMLEdBQUwsQ0FBU29CLE1BQVQsSUFBbUIsQ0FBdEIsRUFBd0I7QUFDdEIsV0FBS3BCLEdBQUwsQ0FBU0QsSUFBVCxDQUFjLFNBQWQsRUFBeUJNLFVBQVUsSUFBbkM7QUFDRCxLQUZELE1BR0k7QUFDRixXQUFLTCxHQUFMLENBQVNzQixJQUFULENBQWMsWUFBVTtBQUN0QkUsVUFBRSxJQUFGLEVBQVF6QixJQUFSLENBQWEsU0FBYixFQUF3Qk0sTUFBTThCLE9BQU4sQ0FBY1gsRUFBRSxJQUFGLEVBQVFYLEdBQVIsRUFBZCxLQUFnQyxDQUFDLENBQXpEO0FBQ0QsT0FGRDtBQUdEO0FBQ0Y7QUFWd0MsQ0FXMUM7O0FBRURsQixPQUFPQyxPQUFQLEdBQWlCc0MsY0FBakIsQzs7Ozs7O0FDZkEsTUFBTXBCLGNBQWMsbUJBQUFILENBQVEsQ0FBUixDQUFwQjs7QUFFQSxNQUFNeUIsVUFBTixTQUF5QnRCLFdBQXpCLENBQW9DLEVBQ25DOztBQUVEbkIsT0FBT0MsT0FBUCxHQUFpQndDLFVBQWpCLEM7Ozs7OztBQ0xBLE1BQU10QixjQUFjLG1CQUFBSCxDQUFRLENBQVIsQ0FBcEI7O0FBRUEsTUFBTTBCLFlBQU4sU0FBMkJ2QixXQUEzQixDQUFzQyxFQUNyQzs7QUFFRG5CLE9BQU9DLE9BQVAsR0FBaUJ5QyxZQUFqQixDOzs7Ozs7QUNMQSxNQUFNQyxlQUFOLENBQXFCO0FBQ25CaEQsY0FBWWlELE9BQVosRUFBb0I7QUFDbEIsU0FBS0EsT0FBTCxHQUFlQSxPQUFmO0FBQ0Q7O0FBRURDLE1BQUlDLE1BQUosRUFBVztBQUNULFNBQUtGLE9BQUwsQ0FBYWhCLElBQWIsQ0FBa0JrQixNQUFsQjtBQUNEOztBQUVEaEQsU0FBTTtBQUNKLFNBQUs4QyxPQUFMLENBQWFHLE9BQWIsQ0FBcUJELFVBQVVBLE9BQU9oRCxJQUFQLEVBQS9COztBQUVBLFdBQU8sSUFBUDtBQUNEOztBQUVEQyxXQUFRO0FBQ04sU0FBSzZDLE9BQUwsQ0FBYUcsT0FBYixDQUFxQkQsVUFBVUEsT0FBTy9DLE1BQVAsRUFBL0I7O0FBRUEsV0FBTyxJQUFQO0FBQ0Q7O0FBRURpRCxhQUFVO0FBQ1IsU0FBS0osT0FBTCxDQUNHcEIsTUFESCxDQUNVc0IsVUFBVUEsT0FBT2pELE1BQVAsSUFBaUIsT0FBT2lELE9BQU9qRCxNQUFkLElBQXdCLFFBRDdELEVBRUdrRCxPQUZILENBRVdELFVBQVVBLE9BQU9qRCxNQUFQLENBQWNVLElBQWQsRUFGckI7O0FBSUEsV0FBTyxJQUFQO0FBQ0Q7O0FBRUQwQyxjQUFXO0FBQ1QsU0FBS0wsT0FBTCxDQUNHcEIsTUFESCxDQUNVc0IsVUFBVUEsT0FBT2xELE9BQVAsSUFBa0IsT0FBT2tELE9BQU9sRCxPQUFkLElBQXlCLFFBRC9ELEVBRUdtRCxPQUZILENBRVdELFVBQVVBLE9BQU9sRCxPQUFQLENBQWVXLElBQWYsRUFGckI7O0FBSUEsV0FBTyxJQUFQO0FBQ0Q7QUFuQ2tCLENBb0NwQjs7QUFFRFAsT0FBT0MsT0FBUCxHQUFpQjBDLGVBQWpCLEM7Ozs7OztBQ3RDQSxNQUFNakQsaUJBQWlCLG1CQUFBc0IsQ0FBUSxDQUFSLENBQXZCO0FBQ0EsTUFBTW9CLGFBQWEsbUJBQUFwQixDQUFRLEVBQVIsQ0FBbkI7O0FBRUEsTUFBTWtDLFVBQU4sU0FBeUJ4RCxjQUF6QixDQUF1QztBQUNyQ0MsY0FBWVEsS0FBWixFQUFtQkMsSUFBbkIsRUFBeUJDLEdBQXpCLEVBQTZCO0FBQzNCLFVBQ0UsSUFERixFQUVFLElBQUkrQixVQUFKLENBQWVqQyxLQUFmLEVBQXNCQyxJQUF0QixFQUE0QkMsR0FBNUIsQ0FGRjtBQUlEO0FBTm9DLENBT3RDOztBQUVETCxPQUFPQyxPQUFQLEdBQWlCaUQsVUFBakIsQzs7Ozs7O0FDWkEsTUFBTXhELGlCQUFpQixtQkFBQXNCLENBQVEsQ0FBUixDQUF2QjtBQUNBLE1BQU1DLGVBQWUsbUJBQUFELENBQVEsQ0FBUixDQUFyQjtBQUNBLE1BQU1HLGNBQWMsbUJBQUFILENBQVEsQ0FBUixDQUFwQjs7QUFFQSxNQUFNbUMsV0FBTixTQUEwQnpELGNBQTFCLENBQXdDO0FBQ3RDQyxjQUFZUSxLQUFaLEVBQW1CQyxJQUFuQixFQUF5QkMsR0FBekIsRUFBOEJRLFFBQVEsUUFBdEMsRUFBK0M7QUFDN0MsVUFDRSxJQUFJSSxZQUFKLENBQWlCZCxLQUFqQixFQUF3QkMsSUFBeEIsRUFBOEJDLEdBQTlCLEVBQW1DUSxLQUFuQyxDQURGLEVBRUUsSUFBSU0sV0FBSixDQUFnQmhCLEtBQWhCLEVBQXVCQyxJQUF2QixFQUE2QkMsR0FBN0IsQ0FGRjtBQUlEO0FBTnFDLENBT3ZDOztBQUVETCxPQUFPQyxPQUFQLEdBQWlCa0QsV0FBakIsQzs7Ozs7O0FDYkEsTUFBTXpELGlCQUFpQixtQkFBQXNCLENBQVEsQ0FBUixDQUF2QjtBQUNBLE1BQU1NLGVBQWUsbUJBQUFOLENBQVEsQ0FBUixDQUFyQjtBQUNBLE1BQU1zQixjQUFjLG1CQUFBdEIsQ0FBUSxFQUFSLENBQXBCOztBQUVBLE1BQU1vQyxXQUFOLFNBQTBCMUQsY0FBMUIsQ0FBd0M7QUFDdENDLGNBQVlRLEtBQVosRUFBbUJDLElBQW5CLEVBQXlCQyxHQUF6QixFQUE4QlEsUUFBUSxRQUF0QyxFQUErQztBQUM3QyxVQUNFLElBQUlTLFlBQUosQ0FBaUJuQixLQUFqQixFQUF3QkMsSUFBeEIsRUFBOEJDLEdBQTlCLEVBQW1DUSxLQUFuQyxDQURGLEVBRUUsSUFBSXlCLFdBQUosQ0FBZ0JuQyxLQUFoQixFQUF1QkMsSUFBdkIsRUFBNkJDLEdBQTdCLENBRkY7QUFJRDtBQU5xQyxDQU92Qzs7QUFFREwsT0FBT0MsT0FBUCxHQUFpQm1ELFdBQWpCLEM7Ozs7OztBQ2JBLE1BQU0xRCxpQkFBaUIsbUJBQUFzQixDQUFRLENBQVIsQ0FBdkI7QUFDQSxNQUFNVSxrQkFBa0IsbUJBQUFWLENBQVEsQ0FBUixDQUF4QjtBQUNBLE1BQU11QixpQkFBaUIsbUJBQUF2QixDQUFRLEVBQVIsQ0FBdkI7O0FBRUEsTUFBTXFDLGNBQU4sU0FBNkIzRCxjQUE3QixDQUEyQztBQUN6Q0MsY0FBWVEsS0FBWixFQUFtQkMsSUFBbkIsRUFBeUJDLEdBQXpCLEVBQThCUSxRQUFRLFFBQXRDLEVBQStDO0FBQzdDLFVBQ0UsSUFBSWEsZUFBSixDQUFvQnZCLEtBQXBCLEVBQTJCQyxJQUEzQixFQUFpQ0MsR0FBakMsRUFBc0NRLEtBQXRDLENBREYsRUFFRSxJQUFJMEIsY0FBSixDQUFtQnBDLEtBQW5CLEVBQTBCQyxJQUExQixFQUFnQ0MsR0FBaEMsQ0FGRjtBQUlEO0FBTndDLENBTzFDOztBQUVETCxPQUFPQyxPQUFQLEdBQWlCb0QsY0FBakIsQzs7Ozs7O0FDYkEsTUFBTTNELGlCQUFpQixtQkFBQXNCLENBQVEsQ0FBUixDQUF2QjtBQUNBLE1BQU1jLGNBQWMsbUJBQUFkLENBQVEsQ0FBUixDQUFwQjtBQUNBLE1BQU15QixhQUFhLG1CQUFBekIsQ0FBUSxFQUFSLENBQW5COztBQUVBLE1BQU1zQyxVQUFOLFNBQXlCNUQsY0FBekIsQ0FBdUM7QUFDckNDLGNBQVlRLEtBQVosRUFBbUJDLElBQW5CLEVBQXlCQyxHQUF6QixFQUE4QlEsUUFBUSxRQUF0QyxFQUErQztBQUM3QyxVQUNFLElBQUlpQixXQUFKLENBQWdCM0IsS0FBaEIsRUFBdUJDLElBQXZCLEVBQTZCQyxHQUE3QixFQUFrQ1EsS0FBbEMsQ0FERixFQUVFLElBQUk0QixVQUFKLENBQWV0QyxLQUFmLEVBQXNCQyxJQUF0QixFQUE0QkMsR0FBNUIsQ0FGRjtBQUlEO0FBTm9DLENBT3RDOztBQUVETCxPQUFPQyxPQUFQLEdBQWlCcUQsVUFBakIsQzs7Ozs7O0FDYkEsTUFBTTVELGlCQUFpQixtQkFBQXNCLENBQVEsQ0FBUixDQUF2QjtBQUNBLE1BQU1lLGdCQUFnQixtQkFBQWYsQ0FBUSxDQUFSLENBQXRCO0FBQ0EsTUFBTTBCLGVBQWUsbUJBQUExQixDQUFRLEVBQVIsQ0FBckI7O0FBRUEsTUFBTXVDLFlBQU4sU0FBMkI3RCxjQUEzQixDQUF5QztBQUN2Q0MsY0FBWVEsS0FBWixFQUFtQkMsSUFBbkIsRUFBeUJDLEdBQXpCLEVBQThCUSxRQUFRLFFBQXRDLEVBQStDO0FBQzdDLFVBQ0UsSUFBSWtCLGFBQUosQ0FBa0I1QixLQUFsQixFQUF5QkMsSUFBekIsRUFBK0JDLEdBQS9CLEVBQW9DUSxLQUFwQyxDQURGLEVBRUUsSUFBSTZCLFlBQUosQ0FBaUJ2QyxLQUFqQixFQUF3QkMsSUFBeEIsRUFBOEJDLEdBQTlCLENBRkY7QUFJRDtBQU5zQyxDQU94Qzs7QUFFREwsT0FBT0MsT0FBUCxHQUFpQnNELFlBQWpCLEM7Ozs7OztBQ2JBdkQsT0FBT0MsT0FBUCxHQUFpQjtBQUNmdUQsV0FBUztBQUNQcEMscUJBQWlCLG1CQUFBSixDQUFRLENBQVIsQ0FEVjtBQUVQQyxrQkFBYyxtQkFBQUQsQ0FBUSxDQUFSLENBRlA7QUFHUE0sa0JBQWMsbUJBQUFOLENBQVEsQ0FBUixDQUhQO0FBSVBVLHFCQUFpQixtQkFBQVYsQ0FBUSxDQUFSLENBSlY7QUFLUGMsaUJBQWEsbUJBQUFkLENBQVEsQ0FBUixDQUxOO0FBTVBlLG1CQUFlLG1CQUFBZixDQUFRLENBQVI7QUFOUixHQURNO0FBU2Z5QyxVQUFRO0FBQ056QixvQkFBZ0IsbUJBQUFoQixDQUFRLEVBQVIsQ0FEVjtBQUVOaUIscUJBQWlCLG1CQUFBakIsQ0FBUSxFQUFSLENBRlg7QUFHTkcsaUJBQWEsbUJBQUFILENBQVEsQ0FBUixDQUhQO0FBSU5vQixnQkFBWSxtQkFBQXBCLENBQVEsRUFBUixDQUpOO0FBS05zQixpQkFBYSxtQkFBQXRCLENBQVEsRUFBUixDQUxQO0FBTU51QixvQkFBZ0IsbUJBQUF2QixDQUFRLEVBQVIsQ0FOVjtBQU9OeUIsZ0JBQVksbUJBQUF6QixDQUFRLEVBQVIsQ0FQTjtBQVFOMEIsa0JBQWMsbUJBQUExQixDQUFRLEVBQVI7QUFSUixHQVRPO0FBbUJmMEMsaUJBQWUsbUJBQUExQyxDQUFRLEVBQVIsQ0FuQkE7QUFvQmYyQixtQkFBaUIsbUJBQUEzQixDQUFRLEVBQVIsQ0FwQkY7QUFxQmYyQyxrQkFBZ0IsbUJBQUEzQyxDQUFRLEVBQVIsQ0FyQkQ7QUFzQmY0QyxtQkFBaUIsbUJBQUE1QyxDQUFRLEVBQVIsQ0F0QkY7QUF1QmZtQyxlQUFhLG1CQUFBbkMsQ0FBUSxFQUFSLENBdkJFO0FBd0Jma0MsY0FBWSxtQkFBQWxDLENBQVEsRUFBUixDQXhCRztBQXlCZm9DLGVBQWEsbUJBQUFwQyxDQUFRLEVBQVIsQ0F6QkU7QUEwQmZxQyxrQkFBZ0IsbUJBQUFyQyxDQUFRLEVBQVIsQ0ExQkQ7QUEyQmZzQyxjQUFZLG1CQUFBdEMsQ0FBUSxFQUFSLENBM0JHO0FBNEJmdUMsZ0JBQWMsbUJBQUF2QyxDQUFRLEVBQVI7QUE1QkMsQ0FBakIsQzs7Ozs7O0FDQUEsTUFBTTJCLGtCQUFrQixtQkFBQTNCLENBQVEsRUFBUixDQUF4QjtBQUNBLE1BQU1rQyxhQUFhLG1CQUFBbEMsQ0FBUSxFQUFSLENBQW5CO0FBQ0EsTUFBTW1DLGNBQWMsbUJBQUFuQyxDQUFRLEVBQVIsQ0FBcEI7QUFDQSxNQUFNb0MsY0FBYyxtQkFBQXBDLENBQVEsRUFBUixDQUFwQjtBQUNBLE1BQU1xQyxpQkFBaUIsbUJBQUFyQyxDQUFRLEVBQVIsQ0FBdkI7QUFDQSxNQUFNc0MsYUFBYSxtQkFBQXRDLENBQVEsRUFBUixDQUFuQjtBQUNBLE1BQU11QyxlQUFlLG1CQUFBdkMsQ0FBUSxFQUFSLENBQXJCOztBQUVBLE1BQU0wQyxhQUFOLENBQW1CO0FBQ2pCL0QsY0FBWVEsS0FBWixFQUFtQkUsR0FBbkIsRUFBdUI7QUFDckIsU0FBS0YsS0FBTCxHQUFhQSxLQUFiO0FBQ0EsU0FBS0UsR0FBTCxHQUFXQSxHQUFYO0FBQ0Q7O0FBRUR3RCxnQkFBY3hELEdBQWQsRUFBa0I7QUFDaEIsWUFBT0EsSUFBSUQsSUFBSixDQUFTLFNBQVQsQ0FBUDtBQUNFLFdBQUssT0FBTDtBQUNFLGdCQUFPQyxJQUFJOEIsSUFBSixDQUFTLE1BQVQsQ0FBUDtBQUNFLGVBQUssT0FBTDtBQUNFLG1CQUFPaUIsV0FBUDtBQUNBO0FBQ0YsZUFBSyxVQUFMO0FBQ0UsbUJBQU9DLGNBQVA7QUFDQTtBQUNGLGVBQUssTUFBTDtBQUNFLG1CQUFPQyxVQUFQO0FBQ0E7QUFDRjtBQUNFLG1CQUFPSCxXQUFQO0FBWEo7QUFhQTtBQUNGLFdBQUssVUFBTDtBQUNFLGVBQU9HLFVBQVA7QUFDQTtBQUNGLFdBQUssUUFBTDtBQUNFLGVBQU9DLFlBQVA7QUFDQTtBQUNGO0FBQ0UsZUFBT0wsVUFBUDtBQXZCSjtBQXlCRDs7QUFFRFksZ0JBQWNDLE1BQWQsRUFBcUI7QUFDbkIsUUFBRyxDQUFDQyxNQUFNQyxPQUFOLENBQWNGLE1BQWQsQ0FBSixFQUEwQjtBQUN4QkEsZUFBUyxDQUFDQSxNQUFELENBQVQ7QUFDRDs7QUFFRCxXQUFPQSxPQUFPRyxHQUFQLENBQVcsVUFBU0gsTUFBVCxFQUFnQjtBQUNoQyxVQUFHLE9BQU9BLE1BQVAsSUFBaUIsUUFBcEIsRUFBNkI7QUFDM0JBLGlCQUFTO0FBQ1BJLG9CQUFVSjtBQURILFNBQVQ7QUFHRDtBQUNELFVBQUcsT0FBT0EsT0FBTzFELEdBQWQsSUFBcUIsUUFBeEIsRUFBaUM7QUFDL0IwRCxlQUFPMUQsR0FBUCxHQUFhLEtBQUtBLEdBQUwsQ0FBUytELElBQVQsQ0FBY0wsT0FBT0ksUUFBckIsQ0FBYjtBQUNEO0FBQ0QsVUFBRyxPQUFPSixPQUFPakIsTUFBZCxJQUF3QixVQUEzQixFQUFzQztBQUNwQ2lCLGVBQU9qQixNQUFQLEdBQWdCLEtBQUtlLGFBQUwsQ0FBbUJFLE9BQU8xRCxHQUExQixDQUFoQjtBQUNEOztBQUVELGFBQU8wRCxNQUFQO0FBQ0QsS0FkaUIsQ0FjaEJqRSxJQWRnQixDQWNYLElBZFcsQ0FBWCxDQUFQO0FBZUQ7O0FBRUR1RSxlQUFhdkIsTUFBYixFQUFxQmlCLE1BQXJCLEVBQTRCO0FBQzFCLFFBQUcsT0FBT2pCLE9BQU9sRCxPQUFkLElBQXlCLFFBQTVCLEVBQXFDO0FBQ25DLFVBQUcsT0FBT21FLE9BQU9sRCxLQUFkLElBQXVCLFFBQTFCLEVBQW1DO0FBQ2pDaUMsZUFBT2xELE9BQVAsQ0FBZWlCLEtBQWYsR0FBdUJrRCxPQUFPbEQsS0FBOUI7QUFDRDtBQUNELFVBQUcsT0FBT2tELE9BQU9qRCxNQUFkLElBQXdCLFVBQTNCLEVBQXNDO0FBQ3BDZ0MsZUFBT2xELE9BQVAsQ0FBZWEsT0FBZixHQUF5QnNELE9BQU9qRCxNQUFoQztBQUNEO0FBQ0Y7QUFDRCxRQUFHLE9BQU9nQyxPQUFPakQsTUFBZCxJQUF3QixRQUEzQixFQUFvQztBQUNsQyxVQUFHLE9BQU9rRSxPQUFPN0IsU0FBZCxJQUEyQixRQUE5QixFQUF1QztBQUNyQ1ksZUFBT2pELE1BQVAsQ0FBY3FDLFNBQWQsR0FBMEI2QixPQUFPN0IsU0FBakM7QUFDRDtBQUNELFVBQUcsT0FBTzZCLE9BQU9sRSxNQUFkLElBQXdCLFVBQTNCLEVBQXNDO0FBQ3BDaUQsZUFBT2pELE1BQVAsQ0FBY1ksT0FBZCxHQUF3QnNELE9BQU9sRSxNQUEvQjtBQUNEO0FBQ0Y7QUFDRjs7QUFFRHlFLFFBQU1DLE9BQU4sRUFBYztBQUNaLFFBQUlDLFdBQVcsRUFBZjtBQUNBLFNBQUksSUFBSXBFLElBQVIsSUFBZ0JtRSxPQUFoQixFQUF3QjtBQUN0QixVQUFJUixTQUFTLEtBQUtELGFBQUwsQ0FBbUJTLFFBQVFuRSxJQUFSLENBQW5CLENBQWI7O0FBRUEsV0FBSSxJQUFJcUUsQ0FBUixJQUFhVixNQUFiLEVBQW9CO0FBQ2xCLFlBQUlqQixTQUFTLEtBQUs0QixTQUFTQyxTQUFULENBQW1CN0UsSUFBbkIsQ0FBd0I4RSxLQUF4QixDQUNoQmIsT0FBT1UsQ0FBUCxFQUFVM0IsTUFETSxFQUVoQixDQUFDLElBQUQsRUFBTyxLQUFLM0MsS0FBWixFQUFtQkMsSUFBbkIsRUFBeUIyRCxPQUFPVSxDQUFQLEVBQVVwRSxHQUFuQyxDQUZnQixDQUFMLEdBQWI7QUFJQSxhQUFLZ0UsWUFBTCxDQUFrQnZCLE1BQWxCLEVBQTBCaUIsT0FBT1UsQ0FBUCxDQUExQjs7QUFFQUQsaUJBQVM1QyxJQUFULENBQWNrQixNQUFkO0FBQ0Q7QUFDRjs7QUFFRCxXQUFPLElBQUlILGVBQUosQ0FBb0I2QixRQUFwQixDQUFQO0FBQ0Q7QUE1RmdCLENBNkZsQjs7QUFFRHhFLE9BQU9DLE9BQVAsR0FBaUJ5RCxhQUFqQixDOzs7Ozs7QUN2R0EsTUFBTWhFLGlCQUFpQixtQkFBQXNCLENBQVEsQ0FBUixDQUF2QjtBQUNBLE1BQU1JLGtCQUFrQixtQkFBQUosQ0FBUSxDQUFSLENBQXhCO0FBQ0EsTUFBTWdCLGlCQUFpQixtQkFBQWhCLENBQVEsRUFBUixDQUF2Qjs7QUFFQSxNQUFNMkMsY0FBTixTQUE2QmpFLGNBQTdCLENBQTJDO0FBQ3pDQyxjQUFZUSxLQUFaLEVBQW1CQyxJQUFuQixFQUF5QkMsR0FBekIsRUFBOEJRLEtBQTlCLEVBQXFDQyxNQUFyQyxFQUE2Q2pCLE1BQTdDLEVBQW9EO0FBQ2xELFVBQ0VpQixTQUFRLElBQUlNLGVBQUosQ0FBb0JqQixLQUFwQixFQUEyQkMsSUFBM0IsRUFBaUNDLEdBQWpDLEVBQXNDUSxLQUF0QyxFQUE2Q0MsTUFBN0MsQ0FBUixHQUErRCxJQURqRSxFQUVFakIsU0FBUSxJQUFJbUMsY0FBSixDQUFtQjdCLEtBQW5CLEVBQTBCQyxJQUExQixFQUFnQ0MsR0FBaEMsRUFBcUNSLE1BQXJDLENBQVIsR0FBdUQsSUFGekQ7QUFJRDtBQU53QyxDQU8xQzs7QUFFREcsT0FBT0MsT0FBUCxHQUFpQjBELGNBQWpCLEM7Ozs7OztBQ2JBLE1BQU1qRSxpQkFBaUIsbUJBQUFzQixDQUFRLENBQVIsQ0FBdkI7QUFDQSxNQUFNaUIsa0JBQWtCLG1CQUFBakIsQ0FBUSxFQUFSLENBQXhCOztBQUVBLE1BQU00QyxlQUFOLFNBQThCbEUsY0FBOUIsQ0FBNEM7QUFDMUNDLGNBQVlRLEtBQVosRUFBbUJDLElBQW5CLEVBQXlCQyxHQUF6QixFQUE4QjZCLFNBQTlCLEVBQXdDO0FBQ3RDLFVBQ0UsSUFERixFQUVFLElBQUlELGVBQUosQ0FBb0I5QixLQUFwQixFQUEyQkMsSUFBM0IsRUFBaUNDLEdBQWpDLEVBQXNDNkIsU0FBdEMsQ0FGRjtBQUlEO0FBTnlDLENBTzNDOztBQUVEbEMsT0FBT0MsT0FBUCxHQUFpQjJELGVBQWpCLEMiLCJmaWxlIjoiYmluZGVyLmpzIiwic291cmNlc0NvbnRlbnQiOlsiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcbiBcdFx0fVxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0aTogbW9kdWxlSWQsXG4gXHRcdFx0bDogZmFsc2UsXG4gXHRcdFx0ZXhwb3J0czoge31cbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gZGVmaW5lIGdldHRlciBmdW5jdGlvbiBmb3IgaGFybW9ueSBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBuYW1lLCBnZXR0ZXIpIHtcbiBcdFx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBuYW1lKSkge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBuYW1lLCB7XG4gXHRcdFx0XHRjb25maWd1cmFibGU6IGZhbHNlLFxuIFx0XHRcdFx0ZW51bWVyYWJsZTogdHJ1ZSxcbiBcdFx0XHRcdGdldDogZ2V0dGVyXG4gXHRcdFx0fSk7XG4gXHRcdH1cbiBcdH07XG5cbiBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbiBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4gXHRcdHJldHVybiBnZXR0ZXI7XG4gXHR9O1xuXG4gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oX193ZWJwYWNrX3JlcXVpcmVfXy5zID0gMjQpO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIHdlYnBhY2svYm9vdHN0cmFwIDE0MGE4NjhhNzMxZmM5NWQ1NzZlIiwiY2xhc3MgQWJzdHJhY3RCaW5kZXJ7XG4gIGNvbnN0cnVjdG9yKGhhbmRsZXIsIHJlbmRlcil7XG4gICAgdGhpcy5oYW5kbGVyID0gaGFuZGxlcjtcbiAgICB0aGlzLnJlbmRlciA9IHJlbmRlcjtcbiAgfVxuXG4gIGJpbmQoKXtcbiAgICBpZih0aGlzLmhhbmRsZXIpe1xuICAgICAgdGhpcy5oYW5kbGVyLmJpbmQoKTtcbiAgICB9XG4gICAgaWYodGhpcy5yZW5kZXIpe1xuICAgICAgdGhpcy5yZW5kZXIuYmluZCgpO1xuICAgIH1cblxuICAgIHJldHVybiB0aGlzO1xuICB9XG5cbiAgdW5iaW5kKCl7XG4gICAgaWYodGhpcy5oYW5kbGVyKXtcbiAgICAgIHRoaXMuaGFuZGxlci51bmJpbmQoKTtcbiAgICB9XG4gICAgaWYodGhpcy5yZW5kZXIpe1xuICAgICAgdGhpcy5yZW5kZXIudW5iaW5kKCk7XG4gICAgfVxuXG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cbn07XG5cbm1vZHVsZS5leHBvcnRzID0gQWJzdHJhY3RCaW5kZXI7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvQWJzdHJhY3RCaW5kZXIuanMiLCJjbGFzcyBBYnN0cmFjdFJlbmRlcntcbiAgY29uc3RydWN0b3IobW9kZWwsIHByb3AsICRlbCl7XG4gICAgdGhpcy5tb2RlbCA9IG1vZGVsO1xuICAgIHRoaXMucHJvcCA9IHByb3A7XG4gICAgdGhpcy4kZWwgPSAkZWw7XG4gIH1cblxuICBiaW5kKCl7XG4gICAgdGhpcy5tb2RlbC5vbignY2hhbmdlOicgKyB0aGlzLnByb3AsIHRoaXMuc3luYy5iaW5kKHRoaXMpKTtcblxuICAgIHJldHVybiB0aGlzO1xuICB9XG5cbiAgdW5iaW5kKCl7XG4gICAgdGhpcy5tb2RlbC5vZmYoJ2NoYW5nZTonICsgdGhpcy5wcm9wLCB0aGlzLnN5bmMuYmluZCh0aGlzKSk7XG5cbiAgICByZXR1cm4gdGhpcztcbiAgfVxuXG4gIHByZXBhcmUodmFsdWUpe1xuICAgIHJldHVybiB2YWx1ZTtcbiAgfVxuXG4gIHN5bmMoKXtcbiAgICBsZXQgdmFsdWUgPSB0aGlzLm1vZGVsLmdldCh0aGlzLnByb3ApO1xuICAgIHZhbHVlID0gdGhpcy5wcmVwYXJlKHZhbHVlKTtcbiAgICB0aGlzLnJlbmRlcih2YWx1ZSk7XG5cbiAgICByZXR1cm4gdGhpcztcbiAgfVxuXG4gIHJlbmRlcih2YWx1ZSl7XG4gIH1cbn07XG5cbm1vZHVsZS5leHBvcnRzID0gQWJzdHJhY3RSZW5kZXI7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvUmVuZGVyL0Fic3RyYWN0UmVuZGVyLmpzIiwiY2xhc3MgQWJzdHJhY3RIYW5kbGVye1xuICBjb25zdHJ1Y3Rvcihtb2RlbCwgcHJvcCwgJGVsLCBldmVudCl7XG4gICAgdGhpcy5tb2RlbCA9IG1vZGVsO1xuICAgIHRoaXMucHJvcCA9IHByb3A7XG4gICAgdGhpcy4kZWwgPSAkZWw7XG4gICAgdGhpcy5ldmVudCA9IGV2ZW50O1xuICB9XG5cbiAgYmluZCgpe1xuICAgIHRoaXMuJGVsLm9uKHRoaXMuZXZlbnQsIHRoaXMuc3luYy5iaW5kKHRoaXMpKTtcblxuICAgIHJldHVybiB0aGlzO1xuICB9XG5cbiAgdW5iaW5kKCl7XG4gICAgdGhpcy4kZWwub2ZmKHRoaXMuZXZlbnQsIHRoaXMuc3luYy5iaW5kKHRoaXMpKTtcblxuICAgIHJldHVybiB0aGlzO1xuICB9XG5cbiAgcHJlcGFyZSh2YWx1ZSl7XG4gICAgcmV0dXJuIHZhbHVlO1xuICB9XG5cbiAgc3luYyhldmVudCl7XG4gICAgbGV0IHZhbHVlID0gdGhpcy5oYW5kbGUoZXZlbnQpO1xuICAgIHZhbHVlID0gdGhpcy5wcmVwYXJlKHZhbHVlKTtcblxuICAgIHRoaXMubW9kZWwuc2V0KHRoaXMucHJvcCwgdmFsdWUpO1xuXG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cblxuICBoYW5kbGUoZXZlbnQpe1xuICB9XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IEFic3RyYWN0SGFuZGxlcjtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9IYW5kbGVyL0Fic3RyYWN0SGFuZGxlci5qcyIsImNvbnN0IEFic3RyYWN0SGFuZGxlciA9IHJlcXVpcmUoJy4vQWJzdHJhY3RIYW5kbGVyJyk7XG5cbmNsYXNzIFZhbHVlSGFuZGxlciBleHRlbmRzIEFic3RyYWN0SGFuZGxlcntcbiAgY29uc3RydWN0b3IobW9kZWwsIHByb3AsICRlbCwgZXZlbnQgPSAnY2hhbmdlJyl7XG4gICAgc3VwZXIobW9kZWwsIHByb3AsICRlbCwgZXZlbnQpO1xuICB9XG5cbiAgaGFuZGxlKGV2ZW50KXtcbiAgICByZXR1cm4gdGhpcy4kZWwudmFsKCk7XG4gIH1cbn07XG5cbm1vZHVsZS5leHBvcnRzID0gVmFsdWVIYW5kbGVyO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL0hhbmRsZXIvVmFsdWVIYW5kbGVyLmpzIiwiY29uc3QgQWJzdHJhY3RSZW5kZXIgPSByZXF1aXJlKCcuL0Fic3RyYWN0UmVuZGVyJyk7XG5cbmNsYXNzIFZhbHVlUmVuZGVyIGV4dGVuZHMgQWJzdHJhY3RSZW5kZXJ7XG4gIHJlbmRlcih2YWx1ZSl7XG4gICAgdGhpcy4kZWwudmFsKHZhbHVlKTtcbiAgfVxufTtcblxubW9kdWxlLmV4cG9ydHMgPSBWYWx1ZVJlbmRlcjtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9SZW5kZXIvVmFsdWVSZW5kZXIuanMiLCJjb25zdCBBYnN0cmFjdEhhbmRsZXIgPSByZXF1aXJlKCcuL0Fic3RyYWN0SGFuZGxlcicpO1xuXG5jbGFzcyBDYWxsYmFja0hhbmRsZXIgZXh0ZW5kcyBBYnN0cmFjdEhhbmRsZXJ7XG4gIGNvbnN0cnVjdG9yKG1vZGVsLCBwcm9wLCAkZWwsIGV2ZW50LCBjYWxsYmFjayl7XG4gICAgc3VwZXIobW9kZWwsIHByb3AsICRlbCwgZXZlbnQpO1xuICAgIHRoaXMuaGFuZGxlID0gY2FsbGJhY2s7XG4gIH1cbn07XG5cbm1vZHVsZS5leHBvcnRzID0gQ2FsbGJhY2tIYW5kbGVyO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL0hhbmRsZXIvQ2FsbGJhY2tIYW5kbGVyLmpzIiwiY29uc3QgQWJzdHJhY3RIYW5kbGVyID0gcmVxdWlyZSgnLi9BYnN0cmFjdEhhbmRsZXInKTtcblxuY2xhc3MgUmFkaW9IYW5kbGVyIGV4dGVuZHMgQWJzdHJhY3RIYW5kbGVye1xuICBjb25zdHJ1Y3Rvcihtb2RlbCwgcHJvcCwgJGVsLCBldmVudCA9ICdjaGFuZ2UnKXtcbiAgICBzdXBlcihtb2RlbCwgcHJvcCwgJGVsLCBldmVudCk7XG4gIH1cblxuICBoYW5kbGUoZXZlbnQpe1xuICAgIGNvbnN0ICRjaGVja2VkID0gdGhpcy4kZWwuZmlsdGVyKCc6Y2hlY2tlZCcpO1xuICAgIHJldHVybiAkY2hlY2tlZC5sZW5ndGg/ICRjaGVja2VkLnZhbCgpIDogbnVsbDtcbiAgfVxufTtcblxubW9kdWxlLmV4cG9ydHMgPSBSYWRpb0hhbmRsZXI7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvSGFuZGxlci9SYWRpb0hhbmRsZXIuanMiLCJjb25zdCBBYnN0cmFjdEhhbmRsZXIgPSByZXF1aXJlKCcuL0Fic3RyYWN0SGFuZGxlcicpO1xuXG5jbGFzcyBDaGVja2JveEhhbmRsZXIgZXh0ZW5kcyBBYnN0cmFjdEhhbmRsZXJ7XG4gIGNvbnN0cnVjdG9yKG1vZGVsLCBwcm9wLCAkZWwsIGV2ZW50ID0gJ2NoYW5nZScpe1xuICAgIHN1cGVyKG1vZGVsLCBwcm9wLCAkZWwsIGV2ZW50KTtcbiAgfVxuXG4gIGhhbmRsZShldmVudCl7XG4gICAgaWYodGhpcy4kZWwubGVuZ3RoID09IDEpe1xuICAgICAgcmV0dXJuIHRoaXMuJGVsLnByb3AoJ2NoZWNrZWQnKT8gdGhpcy4kZWwudmFsKCkgOiBudWxsO1xuICAgIH1cbiAgICBlbHNle1xuICAgICAgbGV0IHZhbCA9IFtdO1xuICAgICAgdGhpcy4kZWwuZmlsdGVyKCc6Y2hlY2tlZCcpLmVhY2goZnVuY3Rpb24oKXtcbiAgICAgICAgdmFsLnB1c2goJCh0aGlzKS52YWwoKSk7XG4gICAgICB9KTtcbiAgICAgIHJldHVybiB2YWw7XG4gICAgfVxuICB9XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IENoZWNrYm94SGFuZGxlcjtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9IYW5kbGVyL0NoZWNrYm94SGFuZGxlci5qcyIsImNvbnN0IFZhbHVlSGFuZGxlciA9IHJlcXVpcmUoJy4vVmFsdWVIYW5kbGVyJyk7XG5cbmNsYXNzIFRleHRIYW5kbGVyIGV4dGVuZHMgVmFsdWVIYW5kbGVye1xufTtcblxubW9kdWxlLmV4cG9ydHMgPSBUZXh0SGFuZGxlcjtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9IYW5kbGVyL1RleHRIYW5kbGVyLmpzIiwiY29uc3QgVmFsdWVIYW5kbGVyID0gcmVxdWlyZSgnLi9WYWx1ZUhhbmRsZXInKTtcblxuY2xhc3MgU2VsZWN0SGFuZGxlciBleHRlbmRzIFZhbHVlSGFuZGxlcntcbn07XG5cbm1vZHVsZS5leHBvcnRzID0gU2VsZWN0SGFuZGxlcjtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9IYW5kbGVyL1NlbGVjdEhhbmRsZXIuanMiLCJjb25zdCBBYnN0cmFjdFJlbmRlciA9IHJlcXVpcmUoJy4vQWJzdHJhY3RSZW5kZXInKTtcblxuY2xhc3MgQ2FsbGJhY2tSZW5kZXIgZXh0ZW5kcyBBYnN0cmFjdFJlbmRlcntcbiAgY29uc3RydWN0b3IobW9kZWwsIHByb3AsICRlbCwgY2FsbGJhY2spe1xuICAgIHN1cGVyKG1vZGVsLCBwcm9wLCAkZWwpO1xuICAgIHRoaXMucmVuZGVyID0gY2FsbGJhY2s7XG4gIH1cbn07XG5cbm1vZHVsZS5leHBvcnRzID0gQ2FsbGJhY2tSZW5kZXI7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvUmVuZGVyL0NhbGxiYWNrUmVuZGVyLmpzIiwiY29uc3QgQWJzdHJhY3RSZW5kZXIgPSByZXF1aXJlKCcuL0Fic3RyYWN0UmVuZGVyJyk7XG5cbmNsYXNzIEF0dHJpYnV0ZVJlbmRlciBleHRlbmRzIEFic3RyYWN0UmVuZGVye1xuICBjb25zdHJ1Y3Rvcihtb2RlbCwgcHJvcCwgJGVsLCBhdHRyaWJ1dGUpe1xuICAgIHN1cGVyKG1vZGVsLCBwcm9wLCAkZWwpO1xuICAgIHRoaXMuYXR0cmlidXRlID0gYXR0cmlidXRlO1xuICB9XG5cbiAgcmVuZGVyKHZhbHVlKXtcbiAgICB0aGlzLiRlbC5hdHRyKHRoaXMuYXR0cmlidXRlLCB2YWx1ZSk7XG4gIH1cbn07XG5cbm1vZHVsZS5leHBvcnRzID0gQXR0cmlidXRlUmVuZGVyO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL1JlbmRlci9BdHRyaWJ1dGVSZW5kZXIuanMiLCJjb25zdCBBYnN0cmFjdFJlbmRlciA9IHJlcXVpcmUoJy4vQWJzdHJhY3RSZW5kZXInKTtcblxuY2xhc3MgSHRtbFJlbmRlciBleHRlbmRzIEFic3RyYWN0UmVuZGVye1xuICByZW5kZXIodmFsdWUpe1xuICAgIHRoaXMuJGVsLmh0bWwodmFsdWUpO1xuICB9XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IEh0bWxSZW5kZXI7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvUmVuZGVyL0h0bWxSZW5kZXIuanMiLCJjb25zdCBBYnN0cmFjdFJlbmRlciA9IHJlcXVpcmUoJy4vQWJzdHJhY3RSZW5kZXInKTtcblxuY2xhc3MgUmFkaW9SZW5kZXIgZXh0ZW5kcyBBYnN0cmFjdFJlbmRlcntcbiAgcmVuZGVyKHZhbHVlKXtcbiAgICBpZih2YWx1ZSA9PT0gbnVsbCl7XG4gICAgICB0aGlzLiRlbC5wcm9wKCdjaGVja2VkJywgZmFsc2UpO1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICB0aGlzLiRlbC5maWx0ZXIoJ1t2YWx1ZT1cIicgKyB2YWx1ZSArICdcIl0nKS5wcm9wKCdjaGVja2VkJywgdHJ1ZSk7XG4gIH1cbn07XG5cbm1vZHVsZS5leHBvcnRzID0gUmFkaW9SZW5kZXI7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvUmVuZGVyL1JhZGlvUmVuZGVyLmpzIiwiY29uc3QgQWJzdHJhY3RSZW5kZXIgPSByZXF1aXJlKCcuL0Fic3RyYWN0UmVuZGVyJyk7XG5cbmNsYXNzIENoZWNrYm94UmVuZGVyIGV4dGVuZHMgQWJzdHJhY3RSZW5kZXJ7XG4gIHJlbmRlcih2YWx1ZSl7XG4gICAgaWYodGhpcy4kZWwubGVuZ3RoID09IDEpe1xuICAgICAgdGhpcy4kZWwucHJvcCgnY2hlY2tlZCcsIHZhbHVlICE9PSBudWxsKTtcbiAgICB9XG4gICAgZWxzZXtcbiAgICAgIHRoaXMuJGVsLmVhY2goZnVuY3Rpb24oKXtcbiAgICAgICAgJCh0aGlzKS5wcm9wKCdjaGVja2VkJywgdmFsdWUuaW5kZXhPZigkKHRoaXMpLnZhbCgpKSAhPSAtMSk7XG4gICAgICB9KTtcbiAgICB9XG4gIH1cbn07XG5cbm1vZHVsZS5leHBvcnRzID0gQ2hlY2tib3hSZW5kZXI7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvUmVuZGVyL0NoZWNrYm94UmVuZGVyLmpzIiwiY29uc3QgVmFsdWVSZW5kZXIgPSByZXF1aXJlKCcuL1ZhbHVlUmVuZGVyJyk7XG5cbmNsYXNzIFRleHRSZW5kZXIgZXh0ZW5kcyBWYWx1ZVJlbmRlcntcbn07XG5cbm1vZHVsZS5leHBvcnRzID0gVGV4dFJlbmRlcjtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9SZW5kZXIvVGV4dFJlbmRlci5qcyIsImNvbnN0IFZhbHVlUmVuZGVyID0gcmVxdWlyZSgnLi9WYWx1ZVJlbmRlcicpO1xuXG5jbGFzcyBTZWxlY3RSZW5kZXIgZXh0ZW5kcyBWYWx1ZVJlbmRlcntcbn07XG5cbm1vZHVsZS5leHBvcnRzID0gU2VsZWN0UmVuZGVyO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL1JlbmRlci9TZWxlY3RSZW5kZXIuanMiLCJjbGFzcyBDb21wb3NpdGVCaW5kZXJ7XG4gIGNvbnN0cnVjdG9yKGJpbmRlcnMpe1xuICAgIHRoaXMuYmluZGVycyA9IGJpbmRlcnM7XG4gIH1cblxuICBhZGQoYmluZGVyKXtcbiAgICB0aGlzLmJpbmRlcnMucHVzaChiaW5kZXIpO1xuICB9XG5cbiAgYmluZCgpe1xuICAgIHRoaXMuYmluZGVycy5mb3JFYWNoKGJpbmRlciA9PiBiaW5kZXIuYmluZCgpKTtcblxuICAgIHJldHVybiB0aGlzO1xuICB9XG5cbiAgdW5iaW5kKCl7XG4gICAgdGhpcy5iaW5kZXJzLmZvckVhY2goYmluZGVyID0+IGJpbmRlci51bmJpbmQoKSk7XG5cbiAgICByZXR1cm4gdGhpcztcbiAgfVxuXG4gIHN5bmNWaWV3KCl7XG4gICAgdGhpcy5iaW5kZXJzXG4gICAgICAuZmlsdGVyKGJpbmRlciA9PiBiaW5kZXIucmVuZGVyICYmIHR5cGVvZiBiaW5kZXIucmVuZGVyID09ICdvYmplY3QnKVxuICAgICAgLmZvckVhY2goYmluZGVyID0+IGJpbmRlci5yZW5kZXIuc3luYygpKTtcblxuICAgIHJldHVybiB0aGlzO1xuICB9XG5cbiAgc3luY01vZGVsKCl7XG4gICAgdGhpcy5iaW5kZXJzXG4gICAgICAuZmlsdGVyKGJpbmRlciA9PiBiaW5kZXIuaGFuZGxlciAmJiB0eXBlb2YgYmluZGVyLmhhbmRsZXIgPT0gJ29iamVjdCcpXG4gICAgICAuZm9yRWFjaChiaW5kZXIgPT4gYmluZGVyLmhhbmRsZXIuc3luYygpKTtcblxuICAgIHJldHVybiB0aGlzO1xuICB9XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IENvbXBvc2l0ZUJpbmRlcjtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9Db21wb3NpdGVCaW5kZXIuanMiLCJjb25zdCBBYnN0cmFjdEJpbmRlciA9IHJlcXVpcmUoJy4vQWJzdHJhY3RCaW5kZXInKTtcbmNvbnN0IEh0bWxSZW5kZXIgPSByZXF1aXJlKCcuL1JlbmRlci9IdG1sUmVuZGVyJyk7XG5cbmNsYXNzIEh0bWxCaW5kZXIgZXh0ZW5kcyBBYnN0cmFjdEJpbmRlcntcbiAgY29uc3RydWN0b3IobW9kZWwsIHByb3AsICRlbCl7XG4gICAgc3VwZXIoXG4gICAgICBudWxsLFxuICAgICAgbmV3IEh0bWxSZW5kZXIobW9kZWwsIHByb3AsICRlbClcbiAgICApO1xuICB9XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IEh0bWxCaW5kZXI7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvSHRtbEJpbmRlci5qcyIsImNvbnN0IEFic3RyYWN0QmluZGVyID0gcmVxdWlyZSgnLi9BYnN0cmFjdEJpbmRlcicpO1xuY29uc3QgVmFsdWVIYW5kbGVyID0gcmVxdWlyZSgnLi9IYW5kbGVyL1ZhbHVlSGFuZGxlcicpO1xuY29uc3QgVmFsdWVSZW5kZXIgPSByZXF1aXJlKCcuL1JlbmRlci9WYWx1ZVJlbmRlcicpO1xuXG5jbGFzcyBWYWx1ZUJpbmRlciBleHRlbmRzIEFic3RyYWN0QmluZGVye1xuICBjb25zdHJ1Y3Rvcihtb2RlbCwgcHJvcCwgJGVsLCBldmVudCA9ICdjaGFuZ2UnKXtcbiAgICBzdXBlcihcbiAgICAgIG5ldyBWYWx1ZUhhbmRsZXIobW9kZWwsIHByb3AsICRlbCwgZXZlbnQpLFxuICAgICAgbmV3IFZhbHVlUmVuZGVyKG1vZGVsLCBwcm9wLCAkZWwpXG4gICAgKTtcbiAgfVxufTtcblxubW9kdWxlLmV4cG9ydHMgPSBWYWx1ZUJpbmRlcjtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9WYWx1ZUJpbmRlci5qcyIsImNvbnN0IEFic3RyYWN0QmluZGVyID0gcmVxdWlyZSgnLi9BYnN0cmFjdEJpbmRlcicpO1xuY29uc3QgUmFkaW9IYW5kbGVyID0gcmVxdWlyZSgnLi9IYW5kbGVyL1JhZGlvSGFuZGxlcicpO1xuY29uc3QgUmFkaW9SZW5kZXIgPSByZXF1aXJlKCcuL1JlbmRlci9SYWRpb1JlbmRlcicpO1xuXG5jbGFzcyBSYWRpb0JpbmRlciBleHRlbmRzIEFic3RyYWN0QmluZGVye1xuICBjb25zdHJ1Y3Rvcihtb2RlbCwgcHJvcCwgJGVsLCBldmVudCA9ICdjaGFuZ2UnKXtcbiAgICBzdXBlcihcbiAgICAgIG5ldyBSYWRpb0hhbmRsZXIobW9kZWwsIHByb3AsICRlbCwgZXZlbnQpLFxuICAgICAgbmV3IFJhZGlvUmVuZGVyKG1vZGVsLCBwcm9wLCAkZWwpXG4gICAgKTtcbiAgfVxufTtcblxubW9kdWxlLmV4cG9ydHMgPSBSYWRpb0JpbmRlcjtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9SYWRpb0JpbmRlci5qcyIsImNvbnN0IEFic3RyYWN0QmluZGVyID0gcmVxdWlyZSgnLi9BYnN0cmFjdEJpbmRlcicpO1xuY29uc3QgQ2hlY2tib3hIYW5kbGVyID0gcmVxdWlyZSgnLi9IYW5kbGVyL0NoZWNrYm94SGFuZGxlcicpO1xuY29uc3QgQ2hlY2tib3hSZW5kZXIgPSByZXF1aXJlKCcuL1JlbmRlci9DaGVja2JveFJlbmRlcicpO1xuXG5jbGFzcyBDaGVja2JveEJpbmRlciBleHRlbmRzIEFic3RyYWN0QmluZGVye1xuICBjb25zdHJ1Y3Rvcihtb2RlbCwgcHJvcCwgJGVsLCBldmVudCA9ICdjaGFuZ2UnKXtcbiAgICBzdXBlcihcbiAgICAgIG5ldyBDaGVja2JveEhhbmRsZXIobW9kZWwsIHByb3AsICRlbCwgZXZlbnQpLFxuICAgICAgbmV3IENoZWNrYm94UmVuZGVyKG1vZGVsLCBwcm9wLCAkZWwpXG4gICAgKTtcbiAgfVxufTtcblxubW9kdWxlLmV4cG9ydHMgPSBDaGVja2JveEJpbmRlcjtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9DaGVja2JveEJpbmRlci5qcyIsImNvbnN0IEFic3RyYWN0QmluZGVyID0gcmVxdWlyZSgnLi9BYnN0cmFjdEJpbmRlcicpO1xuY29uc3QgVGV4dEhhbmRsZXIgPSByZXF1aXJlKCcuL0hhbmRsZXIvVGV4dEhhbmRsZXInKTtcbmNvbnN0IFRleHRSZW5kZXIgPSByZXF1aXJlKCcuL1JlbmRlci9UZXh0UmVuZGVyJyk7XG5cbmNsYXNzIFRleHRCaW5kZXIgZXh0ZW5kcyBBYnN0cmFjdEJpbmRlcntcbiAgY29uc3RydWN0b3IobW9kZWwsIHByb3AsICRlbCwgZXZlbnQgPSAnY2hhbmdlJyl7XG4gICAgc3VwZXIoXG4gICAgICBuZXcgVGV4dEhhbmRsZXIobW9kZWwsIHByb3AsICRlbCwgZXZlbnQpLFxuICAgICAgbmV3IFRleHRSZW5kZXIobW9kZWwsIHByb3AsICRlbClcbiAgICApO1xuICB9XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IFRleHRCaW5kZXI7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvVGV4dEJpbmRlci5qcyIsImNvbnN0IEFic3RyYWN0QmluZGVyID0gcmVxdWlyZSgnLi9BYnN0cmFjdEJpbmRlcicpO1xuY29uc3QgU2VsZWN0SGFuZGxlciA9IHJlcXVpcmUoJy4vSGFuZGxlci9TZWxlY3RIYW5kbGVyJyk7XG5jb25zdCBTZWxlY3RSZW5kZXIgPSByZXF1aXJlKCcuL1JlbmRlci9TZWxlY3RSZW5kZXInKTtcblxuY2xhc3MgU2VsZWN0QmluZGVyIGV4dGVuZHMgQWJzdHJhY3RCaW5kZXJ7XG4gIGNvbnN0cnVjdG9yKG1vZGVsLCBwcm9wLCAkZWwsIGV2ZW50ID0gJ2NoYW5nZScpe1xuICAgIHN1cGVyKFxuICAgICAgbmV3IFNlbGVjdEhhbmRsZXIobW9kZWwsIHByb3AsICRlbCwgZXZlbnQpLFxuICAgICAgbmV3IFNlbGVjdFJlbmRlcihtb2RlbCwgcHJvcCwgJGVsKVxuICAgICk7XG4gIH1cbn07XG5cbm1vZHVsZS5leHBvcnRzID0gU2VsZWN0QmluZGVyO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL1NlbGVjdEJpbmRlci5qcyIsIm1vZHVsZS5leHBvcnRzID0ge1xuICBIYW5kbGVyOiB7XG4gICAgQ2FsbGJhY2tIYW5kbGVyOiByZXF1aXJlKCcuL0hhbmRsZXIvQ2FsbGJhY2tIYW5kbGVyJyksXG4gICAgVmFsdWVIYW5kbGVyOiByZXF1aXJlKCcuL0hhbmRsZXIvVmFsdWVIYW5kbGVyJyksXG4gICAgUmFkaW9IYW5kbGVyOiByZXF1aXJlKCcuL0hhbmRsZXIvUmFkaW9IYW5kbGVyJyksXG4gICAgQ2hlY2tib3hIYW5kbGVyOiByZXF1aXJlKCcuL0hhbmRsZXIvQ2hlY2tib3hIYW5kbGVyJyksXG4gICAgVGV4dEhhbmRsZXI6IHJlcXVpcmUoJy4vSGFuZGxlci9UZXh0SGFuZGxlcicpLFxuICAgIFNlbGVjdEhhbmRsZXI6IHJlcXVpcmUoJy4vSGFuZGxlci9TZWxlY3RIYW5kbGVyJylcbiAgfSxcbiAgUmVuZGVyOiB7XG4gICAgQ2FsbGJhY2tSZW5kZXI6IHJlcXVpcmUoJy4vUmVuZGVyL0NhbGxiYWNrUmVuZGVyJyksXG4gICAgQXR0cmlidXRlUmVuZGVyOiByZXF1aXJlKCcuL1JlbmRlci9BdHRyaWJ1dGVSZW5kZXInKSxcbiAgICBWYWx1ZVJlbmRlcjogcmVxdWlyZSgnLi9SZW5kZXIvVmFsdWVSZW5kZXInKSxcbiAgICBIdG1sUmVuZGVyOiByZXF1aXJlKCcuL1JlbmRlci9IdG1sUmVuZGVyJyksXG4gICAgUmFkaW9SZW5kZXI6IHJlcXVpcmUoJy4vUmVuZGVyL1JhZGlvUmVuZGVyJyksXG4gICAgQ2hlY2tib3hSZW5kZXI6IHJlcXVpcmUoJy4vUmVuZGVyL0NoZWNrYm94UmVuZGVyJyksXG4gICAgVGV4dFJlbmRlcjogcmVxdWlyZSgnLi9SZW5kZXIvVGV4dFJlbmRlcicpLFxuICAgIFNlbGVjdFJlbmRlcjogcmVxdWlyZSgnLi9SZW5kZXIvU2VsZWN0UmVuZGVyJylcbiAgfSxcbiAgQmluZGVyRmFjdG9yeTogcmVxdWlyZSgnLi9CaW5kZXJGYWN0b3J5JyksXG4gIENvbXBvc2l0ZUJpbmRlcjogcmVxdWlyZSgnLi9Db21wb3NpdGVCaW5kZXInKSxcbiAgQ2FsbGJhY2tCaW5kZXI6IHJlcXVpcmUoJy4vQ2FsbGJhY2tCaW5kZXInKSxcbiAgQXR0cmlidXRlQmluZGVyOiByZXF1aXJlKCcuL0F0dHJpYnV0ZUJpbmRlcicpLFxuICBWYWx1ZUJpbmRlcjogcmVxdWlyZSgnLi9WYWx1ZUJpbmRlcicpLFxuICBIdG1sQmluZGVyOiByZXF1aXJlKCcuL0h0bWxCaW5kZXInKSxcbiAgUmFkaW9CaW5kZXI6IHJlcXVpcmUoJy4vUmFkaW9CaW5kZXInKSxcbiAgQ2hlY2tib3hCaW5kZXI6IHJlcXVpcmUoJy4vQ2hlY2tib3hCaW5kZXInKSxcbiAgVGV4dEJpbmRlcjogcmVxdWlyZSgnLi9UZXh0QmluZGVyJyksXG4gIFNlbGVjdEJpbmRlcjogcmVxdWlyZSgnLi9TZWxlY3RCaW5kZXInKVxufTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9CaW5kZXIuanMiLCJjb25zdCBDb21wb3NpdGVCaW5kZXIgPSByZXF1aXJlKCcuL0NvbXBvc2l0ZUJpbmRlcicpO1xuY29uc3QgSHRtbEJpbmRlciA9IHJlcXVpcmUoJy4vSHRtbEJpbmRlcicpO1xuY29uc3QgVmFsdWVCaW5kZXIgPSByZXF1aXJlKCcuL1ZhbHVlQmluZGVyJyk7XG5jb25zdCBSYWRpb0JpbmRlciA9IHJlcXVpcmUoJy4vUmFkaW9CaW5kZXInKTtcbmNvbnN0IENoZWNrYm94QmluZGVyID0gcmVxdWlyZSgnLi9DaGVja2JveEJpbmRlcicpO1xuY29uc3QgVGV4dEJpbmRlciA9IHJlcXVpcmUoJy4vVGV4dEJpbmRlcicpO1xuY29uc3QgU2VsZWN0QmluZGVyID0gcmVxdWlyZSgnLi9TZWxlY3RCaW5kZXInKTtcblxuY2xhc3MgQmluZGVyRmFjdG9yeXtcbiAgY29uc3RydWN0b3IobW9kZWwsICRlbCl7XG4gICAgdGhpcy5tb2RlbCA9IG1vZGVsO1xuICAgIHRoaXMuJGVsID0gJGVsO1xuICB9XG5cbiAgcmVzb2x2ZUJpbmRlcigkZWwpe1xuICAgIHN3aXRjaCgkZWwucHJvcCgndGFnTmFtZScpKXtcbiAgICAgIGNhc2UgJ0lOUFVUJzpcbiAgICAgICAgc3dpdGNoKCRlbC5hdHRyKCd0eXBlJykpe1xuICAgICAgICAgIGNhc2UgJ3JhZGlvJzpcbiAgICAgICAgICAgIHJldHVybiBSYWRpb0JpbmRlcjtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgIGNhc2UgJ2NoZWNrYm94JzpcbiAgICAgICAgICAgIHJldHVybiBDaGVja2JveEJpbmRlcjtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgIGNhc2UgJ3RleHQnOlxuICAgICAgICAgICAgcmV0dXJuIFRleHRCaW5kZXI7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgcmV0dXJuIFZhbHVlQmluZGVyO1xuICAgICAgICB9XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSAnVEVYVEFSRUEnOlxuICAgICAgICByZXR1cm4gVGV4dEJpbmRlcjtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlICdTRUxFQ1QnOlxuICAgICAgICByZXR1cm4gU2VsZWN0QmluZGVyO1xuICAgICAgICBicmVhaztcbiAgICAgIGRlZmF1bHQ6XG4gICAgICAgIHJldHVybiBIdG1sQmluZGVyO1xuICAgIH1cbiAgfVxuXG4gIHByZXBhcmVPcHRpb24ob3B0aW9uKXtcbiAgICBpZighQXJyYXkuaXNBcnJheShvcHRpb24pKXtcbiAgICAgIG9wdGlvbiA9IFtvcHRpb25dO1xuICAgIH1cblxuICAgIHJldHVybiBvcHRpb24ubWFwKGZ1bmN0aW9uKG9wdGlvbil7XG4gICAgICBpZih0eXBlb2Ygb3B0aW9uID09ICdzdHJpbmcnKXtcbiAgICAgICAgb3B0aW9uID0ge1xuICAgICAgICAgIHNlbGVjdG9yOiBvcHRpb25cbiAgICAgICAgfTtcbiAgICAgIH1cbiAgICAgIGlmKHR5cGVvZiBvcHRpb24uJGVsICE9ICdvYmplY3QnKXtcbiAgICAgICAgb3B0aW9uLiRlbCA9IHRoaXMuJGVsLmZpbmQob3B0aW9uLnNlbGVjdG9yKTtcbiAgICAgIH1cbiAgICAgIGlmKHR5cGVvZiBvcHRpb24uYmluZGVyICE9ICdmdW5jdGlvbicpe1xuICAgICAgICBvcHRpb24uYmluZGVyID0gdGhpcy5yZXNvbHZlQmluZGVyKG9wdGlvbi4kZWwpO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gb3B0aW9uO1xuICAgIH0uYmluZCh0aGlzKSk7XG4gIH1cblxuICBleHBhbmRCaW5kZXIoYmluZGVyLCBvcHRpb24pe1xuICAgIGlmKHR5cGVvZiBiaW5kZXIuaGFuZGxlciA9PSAnb2JqZWN0Jyl7XG4gICAgICBpZih0eXBlb2Ygb3B0aW9uLmV2ZW50ID09ICdzdHJpbmcnKXtcbiAgICAgICAgYmluZGVyLmhhbmRsZXIuZXZlbnQgPSBvcHRpb24uZXZlbnQ7XG4gICAgICB9XG4gICAgICBpZih0eXBlb2Ygb3B0aW9uLmhhbmRsZSA9PSAnZnVuY3Rpb24nKXtcbiAgICAgICAgYmluZGVyLmhhbmRsZXIucHJlcGFyZSA9IG9wdGlvbi5oYW5kbGU7XG4gICAgICB9XG4gICAgfVxuICAgIGlmKHR5cGVvZiBiaW5kZXIucmVuZGVyID09ICdvYmplY3QnKXtcbiAgICAgIGlmKHR5cGVvZiBvcHRpb24uYXR0cmlidXRlID09ICdzdHJpbmcnKXtcbiAgICAgICAgYmluZGVyLnJlbmRlci5hdHRyaWJ1dGUgPSBvcHRpb24uYXR0cmlidXRlO1xuICAgICAgfVxuICAgICAgaWYodHlwZW9mIG9wdGlvbi5yZW5kZXIgPT0gJ2Z1bmN0aW9uJyl7XG4gICAgICAgIGJpbmRlci5yZW5kZXIucHJlcGFyZSA9IG9wdGlvbi5yZW5kZXI7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgYnVpbGQob3B0aW9ucyl7XG4gICAgbGV0IGJpbmRpbmdzID0gW107XG4gICAgZm9yKHZhciBwcm9wIGluIG9wdGlvbnMpe1xuICAgICAgbGV0IG9wdGlvbiA9IHRoaXMucHJlcGFyZU9wdGlvbihvcHRpb25zW3Byb3BdKTtcblxuICAgICAgZm9yKHZhciBpIGluIG9wdGlvbil7XG4gICAgICAgIGxldCBiaW5kZXIgPSBuZXcgKEZ1bmN0aW9uLnByb3RvdHlwZS5iaW5kLmFwcGx5KFxuICAgICAgICAgIG9wdGlvbltpXS5iaW5kZXIsXG4gICAgICAgICAgW251bGwsIHRoaXMubW9kZWwsIHByb3AsIG9wdGlvbltpXS4kZWxdXG4gICAgICAgICkpO1xuICAgICAgICB0aGlzLmV4cGFuZEJpbmRlcihiaW5kZXIsIG9wdGlvbltpXSk7XG5cbiAgICAgICAgYmluZGluZ3MucHVzaChiaW5kZXIpO1xuICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiBuZXcgQ29tcG9zaXRlQmluZGVyKGJpbmRpbmdzKTtcbiAgfVxufTtcblxubW9kdWxlLmV4cG9ydHMgPSBCaW5kZXJGYWN0b3J5O1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL0JpbmRlckZhY3RvcnkuanMiLCJjb25zdCBBYnN0cmFjdEJpbmRlciA9IHJlcXVpcmUoJy4vQWJzdHJhY3RCaW5kZXInKTtcbmNvbnN0IENhbGxiYWNrSGFuZGxlciA9IHJlcXVpcmUoJy4vSGFuZGxlci9DYWxsYmFja0hhbmRsZXInKTtcbmNvbnN0IENhbGxiYWNrUmVuZGVyID0gcmVxdWlyZSgnLi9SZW5kZXIvQ2FsbGJhY2tSZW5kZXInKTtcblxuY2xhc3MgQ2FsbGJhY2tCaW5kZXIgZXh0ZW5kcyBBYnN0cmFjdEJpbmRlcntcbiAgY29uc3RydWN0b3IobW9kZWwsIHByb3AsICRlbCwgZXZlbnQsIGhhbmRsZSwgcmVuZGVyKXtcbiAgICBzdXBlcihcbiAgICAgIGhhbmRsZT8gbmV3IENhbGxiYWNrSGFuZGxlcihtb2RlbCwgcHJvcCwgJGVsLCBldmVudCwgaGFuZGxlKSA6IG51bGwsXG4gICAgICByZW5kZXI/IG5ldyBDYWxsYmFja1JlbmRlcihtb2RlbCwgcHJvcCwgJGVsLCByZW5kZXIpIDogbnVsbFxuICAgICk7XG4gIH1cbn07XG5cbm1vZHVsZS5leHBvcnRzID0gQ2FsbGJhY2tCaW5kZXI7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvQ2FsbGJhY2tCaW5kZXIuanMiLCJjb25zdCBBYnN0cmFjdEJpbmRlciA9IHJlcXVpcmUoJy4vQWJzdHJhY3RCaW5kZXInKTtcbmNvbnN0IEF0dHJpYnV0ZVJlbmRlciA9IHJlcXVpcmUoJy4vUmVuZGVyL0F0dHJpYnV0ZVJlbmRlcicpO1xuXG5jbGFzcyBBdHRyaWJ1dGVCaW5kZXIgZXh0ZW5kcyBBYnN0cmFjdEJpbmRlcntcbiAgY29uc3RydWN0b3IobW9kZWwsIHByb3AsICRlbCwgYXR0cmlidXRlKXtcbiAgICBzdXBlcihcbiAgICAgIG51bGwsXG4gICAgICBuZXcgQXR0cmlidXRlUmVuZGVyKG1vZGVsLCBwcm9wLCAkZWwsIGF0dHJpYnV0ZSlcbiAgICApO1xuICB9XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IEF0dHJpYnV0ZUJpbmRlcjtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9BdHRyaWJ1dGVCaW5kZXIuanMiXSwic291cmNlUm9vdCI6IiJ9