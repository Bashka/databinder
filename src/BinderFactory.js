const CompositeBinder = require('./CompositeBinder');
const HtmlBinder = require('./HtmlBinder');
const ValueBinder = require('./ValueBinder');
const RadioBinder = require('./RadioBinder');
const CheckboxBinder = require('./CheckboxBinder');
const TextBinder = require('./TextBinder');
const SelectBinder = require('./SelectBinder');

class BinderFactory{
  constructor(model, $el){
    this.model = model;
    this.$el = $el;
  }

  resolveBinder($el){
    switch($el.prop('tagName')){
      case 'INPUT':
        switch($el.attr('type')){
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

  prepareOption(option){
    if(!Array.isArray(option)){
      option = [option];
    }

    return option.map(function(option){
      if(typeof option == 'string'){
        option = {
          selector: option
        };
      }
      if(typeof option.$el != 'object'){
        option.$el = this.$el.find(option.selector);
      }
      if(typeof option.binder != 'function'){
        option.binder = this.resolveBinder(option.$el);
      }

      return option;
    }.bind(this));
  }

  expandBinder(binder, option){
    if(typeof binder.handler == 'object'){
      if(typeof option.event == 'string'){
        binder.handler.event = option.event;
      }
      if(typeof option.handle == 'function'){
        binder.handler.prepare = option.handle;
      }
    }
    if(typeof binder.render == 'object'){
      if(typeof option.attribute == 'string'){
        binder.render.attribute = option.attribute;
      }
      if(typeof option.render == 'function'){
        binder.render.prepare = option.render;
      }
    }
  }

  build(options){
    let bindings = [];
    for(var prop in options){
      let option = this.prepareOption(options[prop]);

      for(var i in option){
        let binder = new (Function.prototype.bind.apply(
          option[i].binder,
          [null, this.model, prop, option[i].$el]
        ));
        this.expandBinder(binder, option[i]);

        bindings.push(binder);
      }
    }

    return new CompositeBinder(bindings);
  }
};

module.exports = BinderFactory;
