const AbstractBinder = require('./AbstractBinder');
const SelectHandler = require('./Handler/SelectHandler');
const SelectRender = require('./Render/SelectRender');

class SelectBinder extends AbstractBinder{
  constructor(model, prop, $el, event = 'change'){
    super(
      new SelectHandler(model, prop, $el, event),
      new SelectRender(model, prop, $el)
    );
  }
};

module.exports = SelectBinder;
