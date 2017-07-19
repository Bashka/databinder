const AbstractRender = require('./AbstractRender');

class CallbackRender extends AbstractRender{
  constructor(model, prop, $el, callback){
    super(model, prop, $el);
    this.render = callback;
  }
};

module.exports = CallbackRender;
