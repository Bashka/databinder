const AbstractBinder = require('./AbstractBinder');
const RadioHandler = require('./Handler/RadioHandler');
const RadioRender = require('./Render/RadioRender');

class RadioBinder extends AbstractBinder{
  constructor(model, prop, $el, event = 'change'){
    super(
      new RadioHandler(model, prop, $el, event),
      new RadioRender(model, prop, $el)
    );
  }
};

module.exports = RadioBinder;
