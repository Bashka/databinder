const AbstractHandler = require('./AbstractHandler');

class CheckboxHandler extends AbstractHandler{
  constructor(model, prop, $el, event = 'change'){
    super(model, prop, $el, event);
  }

  handle(event){
    return this.$el.prop('checked')? this.$el.val() : null;
  }
};

module.exports = CheckboxHandler;
