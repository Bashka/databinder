const AbstractRender = require('./AbstractRender');

class RadioRender extends AbstractRender{
  render(value){
    if(value === null){
      this.$el.prop('checked', false);
      return;
    }
    this.$el.filter('[value="' + value + '"]').prop('checked', true);
  }
};

module.exports = RadioRender;
