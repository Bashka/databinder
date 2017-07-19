const AbstractRender = require('./AbstractRender');

class CheckboxRender extends AbstractRender{
  render(value){
    this.$el.prop('checked', value !== null);
  }
};

module.exports = CheckboxRender;
