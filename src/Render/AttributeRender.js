const AbstractRender = require('./AbstractRender');

class AttributeRender extends AbstractRender{
  constructor(model, prop, $el, attribute){
    super(model, prop, $el);
    this.attribute = attribute;
  }

  render(value){
    this.$el.attr(this.attribute, value);
  }
};

module.exports = AttributeRender;
