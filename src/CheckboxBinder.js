const AbstractBinder = require('./AbstractBinder');
const CheckboxHandler = require('./Handler/CheckboxHandler');
const CheckboxRender = require('./Render/CheckboxRender');

class CheckboxBinder extends AbstractBinder{
  constructor(model, prop, $el, event = 'change'){
    super(
      new CheckboxHandler(model, prop, $el, event),
      new CheckboxRender(model, prop, $el)
    );
  }
};

module.exports = CheckboxBinder;
