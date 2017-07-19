const AbstractHandler = require('./AbstractHandler');

class CallbackHandler extends AbstractHandler{
  constructor(model, prop, $el, event, callback){
    super(model, prop, $el, event);
    this.handle = callback;
  }
};

module.exports = CallbackHandler;
