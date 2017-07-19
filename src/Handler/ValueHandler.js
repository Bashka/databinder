const AbstractHandler = require('./AbstractHandler');

class ValueHandler extends AbstractHandler{
  constructor(model, prop, $el, event = 'change'){
    super(model, prop, $el, event);
  }

  handle(event){
    return this.$el.val();
  }
};

module.exports = ValueHandler;
