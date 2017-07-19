const AbstractBinder = require('./AbstractBinder');
const ValueHandler = require('./Handler/ValueHandler');
const ValueRender = require('./Render/ValueRender');

class ValueBinder extends AbstractBinder{
  constructor(model, prop, $el, event = 'change'){
    super(
      new ValueHandler(model, prop, $el, event),
      new ValueRender(model, prop, $el)
    );
  }
};

module.exports = ValueBinder;
