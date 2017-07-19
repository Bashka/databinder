const AbstractRender = require('./AbstractRender');

class ValueRender extends AbstractRender{
  render(value){
    this.$el.val(value);
  }
};

module.exports = ValueRender;
