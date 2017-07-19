const AbstractBinder = require('./AbstractBinder');
const TextHandler = require('./Handler/TextHandler');
const TextRender = require('./Render/TextRender');

class TextBinder extends AbstractBinder{
  constructor(model, prop, $el, event = 'change'){
    super(
      new TextHandler(model, prop, $el, event),
      new TextRender(model, prop, $el)
    );
  }
};

module.exports = TextBinder;
