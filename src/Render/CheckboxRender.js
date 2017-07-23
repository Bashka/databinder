const AbstractRender = require('./AbstractRender');

class CheckboxRender extends AbstractRender{
  render(value){
    if(this.$el.length == 1){
      this.$el.prop('checked', value !== null);
    }
    else{
      this.$el.each(function(){
        $(this).prop('checked', value.indexOf($(this).val()) != -1);
      });
    }
  }
};

module.exports = CheckboxRender;
