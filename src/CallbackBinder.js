const AbstractBinder = require('./AbstractBinder');
const CallbackHandler = require('./Handler/CallbackHandler');
const CallbackRender = require('./Render/CallbackRender');

class CallbackBinder extends AbstractBinder{
  constructor(model, prop, $el, event, handle, render){
    super(
      handle? new CallbackHandler(model, prop, $el, event, handle) : null,
      render? new CallbackRender(model, prop, $el, render) : null
    );
  }
};

module.exports = CallbackBinder;
