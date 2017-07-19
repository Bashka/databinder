const AbstractBinder = require('./AbstractBinder');
const AttributeRender = require('./Render/AttributeRender');

class AttributeBinder extends AbstractBinder{
  constructor(model, prop, $el, attribute){
    super(
      null,
      new AttributeRender(model, prop, $el, attribute)
    );
  }
};

module.exports = AttributeBinder;
