const AbstractBinder = require('./AbstractBinder');
const HtmlRender = require('./Render/HtmlRender');

class HtmlBinder extends AbstractBinder{
  constructor(model, prop, $el){
    super(
      null,
      new HtmlRender(model, prop, $el)
    );
  }
};

module.exports = HtmlBinder;
